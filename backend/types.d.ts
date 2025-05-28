import { Request } from 'express';
import { Prisma } from '@prisma/client';

// PRISMA Related Types Begin

export type User = Prisma.User;
export type Booking = Prisma.Booking;
export type Payment = Prisma.Payment;
export type Questionnaire = Prisma.Questionnaire;
export type Availability = Prisma.Availability;
export type Testimonial = Prisma.Testimonial;
export type PaymentMethod = Prisma.PaymentMethod;

export type PaymentStatus = Prisma.PaymentStatus;
export type EventType = Prisma.EventType;

// PRISMA Related Types End

// JWT Related Types Begin

export interface DecodedToken {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      decodedToken?: DecodedToken;
    }
  }
}

// JWT Related Types End

export interface Product {
  id: number;
  name: string;
  price: number;
  value: string;
  label: string;
}
