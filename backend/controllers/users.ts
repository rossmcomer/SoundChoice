const router = require('express').Router();
import { Request, Response } from 'express';
import { User } from '../types';
import { prisma } from '../util/db';
import bcryptjs from 'bcryptjs';
const { tokenExtractor } = require('../util/middleware');

// Email regex to validate format
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone regex to validate format
const phonePatternRegex = /^\d{3}-\d{3}-\d{4}$/;

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
        return res.status(409).json({ error: 'Email is already in use' }); // Notify user of conflict
      }

      // Hash the password before saving
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Create a new user
      const newUser: User = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          phone,
          password: hashedPassword,
        },
      });
      console.log('New user successfully created');
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
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

// Modify existing user name
router.patch(
  '/update-name',
  tokenExtractor,
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.decodedToken?.userId;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating name:', error);
      return res.status(500).json({ error: 'Failed to update name' });
    }
  },
);

// Modify existing user email
router.patch(
  '/update-email',
  tokenExtractor,
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.decodedToken?.userId;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists && emailExists.id !== userId) {
        return res.status(409).json({ error: 'Email is already in use' });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { email },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating email:', error);
      return res.status(500).json({ error: 'Failed to update email' });
    }
  },
);

// Modify existing phone number
router.patch(
  '/update-phone',
  tokenExtractor,
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.decodedToken?.userId;
    const { phone } = req.body;

    if (!phone || !phonePatternRegex.test(phone)) {
      return res
        .status(400)
        .json({ error: 'Invalid or missing phone number.' });
    }

    try {
      // Check if the user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the user's phone number
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { phone },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Failed to update phone number:', error);
      return res.status(500).json({ error: 'Failed to update phone number' });
    }
  },
);

// PATCH endpoint to allow user to modify existing user password
router.patch(
  '/modify-password',
  tokenExtractor,
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.decodedToken?.userId; // Get the userId from the token
    const { currentPassword, newPassword } = req.body; // Get the current and new passwords from the request body

    // Validate the provided new password (example: minimum 8 characters)
    if (!newPassword || newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 8 characters long' });
    }

    try {
      // Check if the user exists
      const existingUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare current password with the stored hash
      const isPasswordValid = await bcryptjs.compare(
        currentPassword,
        existingUser.password,
      );

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      // Hash the new password
      const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

      // Update the user's password
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedNewPassword, // Set the new hashed password
        },
      });

      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update password' });
    }
  },
);

module.exports = router;
