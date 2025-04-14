const router = require('express').Router();
import { Request, Response } from 'express';
import { User } from '../types';
import { prisma } from '../util/db';
import bcryptjs from 'bcryptjs';
const { tokenExtractor } = require('../util/middleware');

// Email regex to validate format
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Create new user account
router.post(
  '/create-account',
  async (req: Request, res: Response): Promise<Response> => {
    const { email, name, password } = req.body;

    try {
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
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
          password: hashedPassword,
        },
      });

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
          id: userId, // Find user by their unique ID
        },
        include: {
          bookings: {
            // Include bookings associated with the user
            include: {
              payment: true,
            },
          },
          questionnaires: true, // Include questionnaires associated with the user
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

// Modify existing user name or email
router.put(
  '/',
  tokenExtractor,
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.decodedToken?.userId;
    const { email, name } = req.body;

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

      // If an email is provided, validate the format
      if (email) {
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email address' });
        }

        // Check if the new email is already in use by another user
        const emailExists = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (emailExists && emailExists.id !== userId) {
          return res.status(409).json({ error: 'Email is already in use' });
        }
      }

      // Update the user with the new data (email and/or name)
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email: email || existingUser.email, // If no email provided, keep the existing one
          name: name || existingUser.name, // If no name provided, keep the existing one
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update user' });
    }
  },
);

module.exports = router;
