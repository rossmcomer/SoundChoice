import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from '../types';
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const tokenExtractor = (
  req: Request,
  res: Response,
  next: NextFunction
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

module.exports = { tokenExtractor, requireAdmin };
