const router = require('express').Router();
import { Request, Response } from 'express';
import { prisma } from '../util/db';

// GET unavailable dates
router.get(
  '/unavailable',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      // Fetch all availability entries
      const unavailableDates = await prisma.availability.findMany({
        orderBy: {
          date: 'asc',
        },
      });

      // Return the result
      return res.status(200).json(unavailableDates);
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
      return res
        .status(500)
        .json({ error: 'Failed to fetch unavailable dates' });
    }
  },
);

// POST to create an unavailable date
router.post('/', async (req: Request, res: Response): Promise<Response> => {
  const { date, startTime, endTime } = req.body;

  if (!date || !startTime || !endTime) {
    return res
      .status(400)
      .json({ error: 'Missing required fields: date, startTime, endTime' });
  }

  try {
    const newUnavailable = await prisma.availability.create({
      data: {
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    return res.status(201).json(newUnavailable);
  } catch (error) {
    console.error('Error creating unavailable date:', error);
    return res.status(500).json({ error: 'Failed to create unavailable date' });
  }
});

module.exports = router;
