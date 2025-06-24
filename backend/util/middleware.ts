import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from '../types';
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
import rateLimit from 'express-rate-limit';

const tokenExtractor = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.token; // Access token from cookies

  if (token) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken; // Verify the token and cast the decoded payload
      req.decodedToken = decodedToken; // Store the decoded token in request for later use
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token is invalid or expired' });
      return;
    }
  } else {
    res.status(401).json({ error: 'Token missing or incorrect format' });
    return;
  }
};

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.decodedToken?.role != 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Rate limiter: Max 3 requests per hour per IP
const resendVerificationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    error: 'Too many verification requests. Please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//CSRF Error Handler
const csrfErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next(err);
};

module.exports = {
  tokenExtractor,
  requireAdmin,
  resendVerificationLimiter,
  csrfErrorHandler,
};
