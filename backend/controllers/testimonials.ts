const router = require('express').Router();
import { Request, Response } from 'express';
import { prisma } from '../util/db';

// GET all testimonials
router.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const testimonials = await prisma.testimonial.findMany();

      return res.status(200).json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return res
        .status(500)
        .json({ error: 'Failed to fetch testimonials' });
    }
  },
);

module.exports = router;
