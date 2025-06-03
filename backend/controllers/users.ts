const router = require('express').Router();
import { Request, Response } from 'express';
import { User } from '../types';
import { prisma } from '../util/db';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { sendResetEmail, sendVerificationEmail } from '../util/email';
const {
  tokenExtractor,
  resendVerificationLimiter,
} = require('../util/middleware');
const { DOMAIN_NAME } = require('../util/config');
import { addHours } from 'date-fns';

// Email regex to validate format
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone regex to validate format
const phonePatternRegex = /^(\d{10}|\d{3}-\d{3}-\d{4})$/;

// Create new user account
router.post(
  '/create-account',
  async (req: Request, res: Response): Promise<Response> => {
    const { email, name, phone, password } = req.body;

    try {
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      if (!phone || !phonePatternRegex.test(phone)) {
        return res
          .status(400)
          .json({ error: 'Invalid or missing phone number.' });
      }

      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });

      if (existingUser) {
        if (existingUser.isVerified) {
          // Email already verified, reject signup
          return res.status(409).json({ error: 'Email is already in use' });
        } else {
          // User exists but is not verified
          // Check if token expired
          if (
            existingUser.verificationTokenExpires &&
            existingUser.verificationTokenExpires > new Date()
          ) {
            // Token still valid, ask user to verify or resend email
            return res.status(409).json({
              error: 'Email registered but not verified',
            });
          } else {
            // Token expired

            // Delete the old user, then create new one
            await prisma.user.delete({ where: { id: existingUser.id } });

            // Continue below to create new user as normal
          }
        }
      }

      // Hash the password before saving
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationTokenExpires = addHours(new Date(), 1);

      // Create a new user
      const newUser: User = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          phone: phone.replace(/\D/g, ''),
          password: hashedPassword,
          verificationToken,
          verificationTokenExpires,
          isVerified: false,
        },
      });

      const verificationUrl = `${DOMAIN_NAME}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

      await sendVerificationEmail(email, verificationUrl);

      return res
        .status(201)
        .json({ message: 'Account created. Please verify your email.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  },
);

// Verify email endpoint
router.get('/verify-email', async (req: Request, res: Response) => {
  const { token } = req.query;

  if (typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid token format' });
  }

  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  });

  if (
    !user ||
    !user.verificationTokenExpiry ||
    new Date() > user.verificationTokenExpiry
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid or expired verification token' });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    },
  });

  return res.json({ message: 'Email verified successfully' });
});

// Resend email verification
router.post(
  '/resend-verification',
  resendVerificationLimiter,
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || user.isVerified) {
      return res
        .status(400)
        .json({ error: 'Invalid request or already verified' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = addHours(new Date(), 1);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationTokenExpiry,
      },
    });

    const verificationUrl = `${DOMAIN_NAME}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    await sendVerificationEmail(email, verificationUrl);

    return res.json({ message: 'Verification email resent' });
  },
);

// GET all info about a user and their bookings, payments, questionnaire answers
router.get(
  '/',
  tokenExtractor,
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.decodedToken?.userId;

    try {
      // Fetch the user along with related data from bookings, payments, and questionnaires
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          bookings: {
            include: {
              payment: true,
            },
          },
          questionnaires: true,
        },
      });

      // If the user is not found, return a 404 error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return the user data along with their related information
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve user data' });
    }
  },
);

// Send password reset email
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt: expires,
    },
  });

  const resetLink = `${DOMAIN_NAME}/reset-password?token=${token}`;

  // Send email
  try {
    await sendResetEmail(email, resetLink);
    return res.json({ message: 'Reset link sent' });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ error: 'Failed to send reset email' });
  }
});

// Change password
router.patch('/reset-password', async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  const hashedPassword = await bcryptjs.hash(newPassword, 10);

  await prisma.user.update({
    where: { email: record.email },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return res.json({ message: 'Password updated successfully' });
});

module.exports = router;
