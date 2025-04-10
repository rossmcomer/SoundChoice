import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      decodedToken?: { userId: string; email: string }; // Define the structure of the decoded token
    }
  }
}