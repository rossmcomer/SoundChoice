const router = require('express').Router();
import { Request, Response } from 'express';
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

// GET info about a specific bookingId
router.get(
    '/booking-info/:bookingId',
    tokenExtractor,
    requireAdmin, // Ensure the user is an admin before proceeding
    async (req: Request, res: Response): Promise<Response> => {
      const { bookingId } = req.params; // Get the bookingId from the URL parameter
  
      try {
        // Fetch the booking using bookingId
        const booking = await prisma.booking.findUnique({
          where: {
            bookingId: bookingId, // Find user by their email
          },
          include: {
            payment: true,
            questionnaire: true,
          },
        });
  
        // If the booking is not found, return a 404 error
        if (!booking) {
          return res.status(404).json({ error: 'Booking not found' });
        }
  
        // Return the booking data along with their related information
        return res.status(200).json(booking);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve booking data' });
      }
    }
  );

// POST to add a new availability entry
router.post(
  '/add-unavailability',
  tokenExtractor,
  requireAdmin, // Ensure the user is an admin before proceeding
  async (req: Request, res: Response): Promise<Response> => {
    const { date, startTime, endTime, isAvailable } = req.body; // Get date and availability status from the request body

    if (!date || typeof isAvailable !== 'boolean') {
      return res.status(400).json({ error: 'Missing date or availability status' });
    }

    try {
      // Create a new availability entry
      const newAvailability = await prisma.availability.create({
        data: {
          date: new Date(date), // Assuming date is provided as a string
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          isAvailable,
        },
      });

      // Return success response with the new entry
      return res.status(201).json(newAvailability);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to add new availability' });
    }
  }
);

  module.exports = router;