const router = require('express').Router();
import { Request, Response } from 'express';
import { prisma } from '../util/db';
const { tokenExtractor, requireAdmin } = require('../util/middleware');
import { v4 as uuidv4 } from 'uuid';

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
      const clientEmails = clients.map(
        (client: { email: string }) => client.email,
      );

      return res.status(200).json(clientEmails);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Failed to retrieve client emails' });
    }
  },
);

// GET all bookings from current date forward
router.get(
  '/all-bookings',
  tokenExtractor,
  requireAdmin, // Ensure the user is an admin before proceeding
  async (req: Request, res: Response): Promise<Response> => {
    try {
      // Fetch simplified booking info from the database
      const bookings = await prisma.booking.findMany({
        orderBy: {
          eventDate: 'asc',
        },
        select: {
          id: true,
          user: {
            select: {
              name: true,
            },
          },
          eventDate: true,
          location: true,
          type: true,
        },
      });

      return res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
  },
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
          id: bookingId, // Find user by their email
        },
        include: {
          payment: true,
          questionnaire: true,
          user: true,
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
  },
);

// PATCH update selected fields of a specific bookingId
router.patch(
  '/bookings/:bookingId',
  tokenExtractor,
  requireAdmin,
  async (req: Request, res: Response): Promise<Response> => {
    const { bookingId } = req.params;
    const { startTime, endTime, location, paymentStatus } = req.body;

    // Build a dynamic update object
    const updateData: any = {};
    if (startTime) updateData.startTime = new Date(startTime);
    if (endTime) updateData.endTime = new Date(endTime);
    if (location) updateData.location = location;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    // Prevent empty update
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: 'No valid fields provided to update' });
    }

    try {
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: updateData,
      });

      return res.status(200).json(updatedBooking);
    } catch (error) {
      console.error('Error updating booking:', error);
      return res.status(500).json({ error: 'Failed to update booking' });
    }
  },
);

// POST /admin/add-payment
router.post(
  '/add-payment',
  tokenExtractor,
  requireAdmin,
  async (req: Request, res: Response): Promise<Response> => {
    const { bookingId, amount, deposit, method } = req.body;

    if (!bookingId || !amount || !method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const transactionId = uuidv4();

      const newPayment = await prisma.payment.create({
        data: {
          bookingId,
          amount,
          deposit,
          method,
          transactionId,
        },
      });

      return res.status(201).json(newPayment);
    } catch (error) {
      console.error('Error adding payment:', error);
      return res.status(500).json({ error: 'Failed to add payment' });
    }
  },
);

// POST to add a new availability entry
router.post(
  '/add-unavailability',
  tokenExtractor,
  requireAdmin,
  async (req: Request, res: Response): Promise<Response> => {
    const { date, startTime, endTime } = req.body; // Get date and availability status from the request body

    if (!date) {
      return res.status(400).json({ error: 'Missing date' });
    }

    try {
      // Create a new availability entry
      const newAvailability = await prisma.availability.create({
        data: {
          date: new Date(date), // Assuming date is provided as a string
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });

      // Return success response with the new entry
      return res.status(201).json(newAvailability);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to add new availability' });
    }
  },
);

// DELETE to remove an availability entry by its ID
router.delete(
  '/remove-availability/:id',
  tokenExtractor,
  requireAdmin, // Ensure the user is an admin before proceeding
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params; // Get the availability entry ID from the URL parameter

    try {
      // Check if the availability entry exists
      const availabilityEntry = await prisma.availability.findUnique({
        where: {
          id: id, // Convert the ID to an integer
        },
      });

      // If the entry doesn't exist, return a 404 error
      if (!availabilityEntry) {
        return res.status(404).json({ error: 'Availability entry not found' });
      }

      // Delete the availability entry
      await prisma.availability.delete({
        where: {
          id: id, // Use the ID from the URL parameter to delete the entry
        },
      });

      // Return success response
      return res
        .status(200)
        .json({ message: 'Availability entry removed successfully' });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Failed to remove availability entry' });
    }
  },
);

// POST to create new testimonial
router.post('/testimonials', 
tokenExtractor,
requireAdmin, async (req: Request, res: Response): Promise<Response> => {
  const { stars, starsLabel, message, author } = req.body;

  if (!stars || !starsLabel || !message || !author) {
    return res
      .status(400)
      .json({ error: 'Missing required fields' });
  }

  try {
    const newTestimonial = await prisma.testimonial.create({
      data: {
        stars,
        starsLabel,
        message,
        author
      },
    });

    return res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Error creating new testimonial:', error);
    return res.status(500).json({ error: 'Failed to create new testimonial' });
  }
});

// DELETE to remove a testimonial by its ID
router.delete(
  '/testimonials/:id',
  tokenExtractor,
  requireAdmin,
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params; // Get the testimonial ID from the URL parameter

    try {
      // Check if the testimonial exists
      const testimonial = await prisma.testimonial.findUnique({
        where: {
          id: id, // Convert the ID to an integer
        },
      });

      // If the entry doesn't exist, return a 404 error
      if (!testimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }

      // Delete the testimonial
      await prisma.testimonial.delete({
        where: {
          id: id,
        },
      });

      // Return success response
      return res
        .status(200)
        .json({ message: 'Testimonial removed successfully' });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Failed to remove testimonial' });
    }
  },
);

module.exports = router;
