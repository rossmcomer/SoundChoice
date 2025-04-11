import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from '../types';
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
  
const tokenExtractor = (req: Request, res: Response, next: NextFunction): void => {
    const authorization = req.get('authorization');
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7); // Extract the token

        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken; // Verify the token and cast the decoded payload
            req.decodedToken = decodedToken; // Store the decoded token in request for later use
            next(); // Proceed to the next middleware or route handler
        }   catch (error) {
            res.status(401).json({ error: 'Token is invalid or expired' });
            return;
        }
    } else {
        res.status(401).json({ error: 'Token missing or incorrect format' });
        return;
    }
};
  
module.exports = { tokenExtractor }