import axios from '../util/apiClient';

const baseUrl = '/admin';

const getClientEmails = async () => {
    const response = await axios.get(`${baseUrl}/get-client-emails`);
    return response.data;
  };
  
  const getAllBookings = async () => {
    const response = await axios.get(`${baseUrl}/all-bookings`);
    return response.data;
  };
  
  const getBookingInfo = async (bookingId: string) => {
    const response = await axios.get(`${baseUrl}/booking-info/${bookingId}`);
    return response.data;
  };
  
  const updateBooking = async (
    bookingId: string,
    updateFields: {
      startTime?: string;
      endTime?: string;
      location?: string;
      type?: string;
      paymentStatus?: string;
    }
  ) => {
    const response = await axios.patch(`${baseUrl}/bookings/${bookingId}`, updateFields);
    return response.data;
  };
  
  const addUnavailability = async (data: {
    date: string;
    startTime: string;
    endTime: string;
  }) => {
    const response = await axios.post(`${baseUrl}/add-unavailability`, data);
    return response.data;
  };
  
  const removeAvailability = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/remove-availability/${id}`);
    return response.data;
  };
  
  export default {
    getClientEmails,
    getAllBookings,
    getBookingInfo,
    updateBooking,
    addUnavailability,
    removeAvailability,
  };