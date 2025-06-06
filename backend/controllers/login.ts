import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const { JWT_SECRET } = require('../util/config');
import { prisma } from '../util/db';

// Login user
router.post('/', async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // Find user by username (case-insensitive)
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!user) {
      return res.status(403).json({ error: 'User not found.' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: 'Email not verified' });
    }

    // Validate password
    const passwordCorrect = await bcryptjs.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Delete all password reset tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: {
        email: email.toLowerCase(),
      },
    });

    // Create token payload
    const userForToken = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Generate JWT
    const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
