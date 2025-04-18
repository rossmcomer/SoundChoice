import axios from '@/util/apiClient';

const baseUrl = '/logout';

export const logout = async () => {
  const response = await axios.post(
    baseUrl,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export default { logout };