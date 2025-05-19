import axios from '@/util/apiClient';

const baseUrl = '/admin';

export const getClientEmails = async () => {
  const response = await axios.get(`${baseUrl}/get-client-emails`, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllBookings = async () => {
  const response = await axios.get(`${baseUrl}/all-bookings`, {
    withCredentials: true,
  });
  return response.data;
};

export const getBookingInfo = async (bookingId: string) => {
  const response = await axios.get(`${baseUrl}/booking-info/${bookingId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateBooking = async (
  bookingId: string,
  updateFields: {
    startTime?: string;
    endTime?: string;
    location?: string;
    type?: string;
    paymentStatus?: string;
  },
) => {
  const response = await axios.patch(`${baseUrl}/bookings/${bookingId}`, updateFields, {
    withCredentials: true,
  });
  return response.data;
};

export const addPayment = async (paymentData: {
  bookingId: string;
  amount: number;
  deposit: boolean;
  method: 'stripe' | 'paypal' | 'cash' | 'other';
}) => {
  const response = await axios.post(`${baseUrl}/add-payment`, paymentData, {
    withCredentials: true,
  });
  return response.data;
};

export const addUnavailability = async (data: {
  date: string;
  startTime: string;
  endTime: string;
}) => {
  const response = await axios.post(`${baseUrl}/add-unavailability`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const removeAvailability = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/remove-availability/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export default {
  getClientEmails,
  getAllBookings,
  getBookingInfo,
  updateBooking,
  addPayment,
  addUnavailability,
  removeAvailability,
};
