import axios from '@/util/apiClient';

const baseUrl = `/testimonials`;

// GET all unavailable dates
export const getTestimonials = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default {
  getTestimonials,
};