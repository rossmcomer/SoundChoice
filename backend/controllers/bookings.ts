const router = require('express').Router()
import { Request, Response } from 'express';
import { prisma } from '../util/db';
const { tokenExtractor } = require('../util/middleware')

// POST new booking into Bookings table
router.post('/', tokenExtractor, async (req: Request, res: Response): Promise<Response> => {
    const { userId, eventDate, startTime, endTime, location } = req.body;
  
    // Check for missing required fields
    if (!userId || !eventDate || !startTime || !endTime || !location) {
      return res.status(400).json({ error: 'Missing required fields: userId, eventDate, startTime, endTime, location' });
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
          paymentStatus: 'unpaid'
        },
      });
  
      return res.status(201).json(newBooking);
    } catch (error) {
      console.error('Error creating new booking:', error);
      return res.status(500).json({ error: 'Failed to create new booking' });
    }
});

// GET all bookings for a user
router.get('/user/:userId', tokenExtractor, async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        payment: true,
        questionnaire: true,
      }
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings for user:', error);
    return res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
});

module.exports = router;