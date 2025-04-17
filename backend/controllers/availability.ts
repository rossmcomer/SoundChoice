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

      return res.status(200).json(unavailableDates);
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
      return res
        .status(500)
        .json({ error: 'Failed to fetch unavailable dates' });
    }
  },
);

module.exports = router;
