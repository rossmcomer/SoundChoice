const router = require('express').Router();
import { Request, Response } from 'express';
import { PRODUCTS } from '../assets/PRODUCTS';

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(PRODUCTS);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
