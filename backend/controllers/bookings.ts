const router = require('express').Router();
import { Request, Response } from 'express';
import { prisma } from '../util/db';
const { tokenExtractor } = require('../util/middleware');

// POST new booking into Bookings table
router.post(
  '/',
  tokenExtractor,
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.decodedToken?.userId;
    const { eventDate, startTime, endTime, type, location } = req.body;

    // Check for missing required fields
    if (!userId || !eventDate || !startTime || !endTime || !location) {
      return res.status(400).json({
        error:
          'Missing required fields: userId, eventDate, startTime, endTime, location',
      });
    }

    try {
      // Create the new booking
      const newBooking = await prisma.booking.create({
        data: {
          userId,
          eventDate: new Date(eventDate),
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          location,
          type,
          paymentStatus: 'unpaid',
        },
      });

      return res.status(201).json(newBooking);
    } catch (error) {
      console.error('Error creating new booking:', error);
      return res.status(500).json({ error: 'Failed to create new booking' });
    }
  },
);

// GET all bookings for a user
router.get(
  '/',
  tokenExtractor,
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.decodedToken?.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User ID not found in token' });
    }

    try {
      const bookings = await prisma.booking.findMany({
        where: {
          userId,
        },
        include: {
          payment: true,
          questionnaire: true,
        },
      });

      return res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings for user:', error);
      return res.status(500).json({ error: 'Failed to fetch user bookings' });
    }
  },
);

// PUT update payment status of a booking
router.put(
  '/update-payment-status',
  tokenExtractor,
  async (req: Request, res: Response): Promise<Response> => {
    const { id, paymentStatus } = req.body;

    // Validate inputs
    if (!id || !['paid', 'unpaid'].includes(paymentStatus)) {
      return res.status(400).json({
        error:
          'Missing or invalid id or payment status. Must be "paid" or "unpaid".',
      });
    }

    try {
      const updatedBooking = await prisma.booking.update({
        where: { id },
        data: { paymentStatus },
      });

      return res.status(200).json(updatedBooking);
    } catch (error) {
      console.error('Error updating payment status:', error);
      return res.status(500).json({ error: 'Failed to update payment status' });
    }
  },
);

module.exports = router;
