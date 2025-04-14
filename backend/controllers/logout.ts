import { Request, Response } from 'express';
const router = require('express').Router();

router.post('/', async (_req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
