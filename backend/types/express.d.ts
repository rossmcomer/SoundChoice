import { Request } from 'express';
import { DecodedToken } from './token';

declare global {
  namespace Express {
    interface Request {
      decodedToken?: DecodedToken; // Define the structure of the decoded token
    }
  }
}