const router = require('express').Router();
import { Request, Response } from 'express';

router.get('/', (req: Request, res: Response) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ csrfToken: req.csrfToken() });
});
