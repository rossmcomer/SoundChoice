import axios from '@/util/apiClient';

const baseUrl = '/csrf-token';

export const fetchCsrfToken = async () => {
  const response = await axios.get(baseUrl, {
    withCredentials: true,
  });
  return response.data.csrfToken;
};

export default { fetchCsrfToken };
