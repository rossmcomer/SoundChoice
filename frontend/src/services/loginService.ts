import axios from '@/util/apiClient';

const baseUrl = '/login';

export const login = async (email: string, password: string) => {
  await axios.post(
    baseUrl,
    { email, password },
    {
      withCredentials: true,
    },
  );
};

export default { login };
