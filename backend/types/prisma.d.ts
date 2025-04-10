import { Prisma } from '@prisma/client';

export type User = Prisma.User;
export type Booking = Prisma.Booking;
export type Payment = Prisma.Payment;
export type Questionnaire = Prisma.Questionnaire;
export type Availability = Prisma.Availability;

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentMethod = 'stripe' | 'paypal';
export type PaymentStatus = 'unpaid' | 'paid' | 'failed';