const router = require('express').Router()
import { Request, Response } from 'express';
import { prisma } from '../util/db';

router.get('/unavailable', async (req: Request, res: Response): Promise<Response> => {
    try {
      // Fetch all availability entries where isAvailable is false
      const unavailableDates = await prisma.availability.findMany({
        where: {
          isAvailable: false,
        },
      });
  
      // Return the result
      return res.status(200).json(unavailableDates);
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
      return res.status(500).json({ error: 'Failed to fetch unavailable dates' });
    }
  });
  
  module.exports = router;