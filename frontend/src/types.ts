export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'admin';
  createdAt: string;
  bookings?: Booking[];
  questionnaires?: Questionnaire[];
}

export interface Booking {
  id: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  totalAmount: number;
  type: EventType;
  paymentStatus: PaymentStatus;
  payment?: Payment[];
  questionnaire?: Questionnaire;
}

export interface Payment {
  id: string;
  amount: number;
  deposit: boolean;
  method: PaymentMethod;
  transactionId: string;
}

export interface Questionnaire {
  id: string;
  answers: Record<string, any>;
  lastUpdated: string;
}

export interface Availability {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export type EventType =
  | 'wedding'
  | 'corporate'
  | 'birthday'
  | 'barBatMitzvah'
  | 'other';

export type PaymentStatus =
  | 'unpaid'
  | 'depositReceived'
  | 'depositFailed'
  | 'remainingPaymentFailed'
  | 'paidInFull';
export type PaymentMethod = 'stripe' | 'paypal';
