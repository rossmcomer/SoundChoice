const router = require('express').Router();
import { Request, Response } from 'express';
import { User } from '../types';
import { prisma } from '../util/db';
const { tokenExtractor, requireAdmin } = require('../util/middleware');

// GET all client e-mails from database
router.get(
    '/get-client-emails',
    tokenExtractor,
    requireAdmin,
    async (req: Request, res: Response): Promise<Response> => {
      try {
        // Fetch all users with role "client" and their emails
        const clients = await prisma.user.findMany({
          where: {
            role: 'client', // Only fetch users with role "client"
          },
          select: {
            email: true, // Select only the email field
          },
        });
  
        // If no clients are found, return an empty array
        if (clients.length === 0) {
          return res.status(200).json([]);
        }
  
        // Extract and return an array of emails
        const clientEmails = clients.map((client: { email: string; }) => client.email);
  
        return res.status(200).json(clientEmails);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve client emails' });
      }
    }
);