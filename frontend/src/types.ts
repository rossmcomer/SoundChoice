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
  addUplights: boolean;
  addedHours: number;
  payment?: Payment[];
  questionnaire?: Questionnaire;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  deposit: boolean;
  method: PaymentMethod;
  transactionId: String;
}

export interface Questionnaire {
  id: string;
  bookingId: string;
  answers: Record<string, any>;
  lastUpdated: string;
}

export interface Availability {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  value: string;
  label: string;
}

export type EventType = 'wedding' | 'corporate' | 'birthday' | 'barBatMitzvah' | 'other';

export type PaymentStatus =
  | 'unpaid'
  | 'depositReceived'
  | 'depositFailed'
  | 'remainingPaymentFailed'
  | 'paidInFull';

export type PaymentMethod = 'stripe' | 'paypal' | 'cash';

export interface ProductItem {
  id: number;
  label: string;
  price: number;
  quantity: number;
}

export interface CheckoutRequestBody {
  products: ProductItem[];
  eventDate: Date;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  addedHours: number;
  addUplights: boolean;
}

export interface CheckoutSessionResponse {
  id: string;
}
