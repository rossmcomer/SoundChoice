import axios from '@/util/apiClient';

const baseUrl = `/availability`;

// GET all unavailable dates
export const getUnavailableDates = async () => {
  const response = await axios.get(baseUrl + '/unavailable', {
    withCredentials: true,
  });
  return response.data;
};

export default {
  getUnavailableDates,
};
