import axios from '@/util/apiClient';

const baseUrl = '/users';

// Create new account
export const createAccount = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const response = await axios.post(`${baseUrl}/create-account`, userData);
  return response.data;
};

export const getUserData = async () => {
    const response = await axios.get(baseUrl, {
      withCredentials: true,
    });
    return response.data;
};

// PATCH user name
export const updateName = async (name: string) => {
  const response = await axios.patch(
    `${baseUrl}/update-name`,
    { name },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

// PATCH user email
export const updateEmail = async (email: string) => {
  const response = await axios.patch(
    `${baseUrl}/update-email`,
    { email },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

// PATCH user phone
export const updatePhone = async (phone: string) => {
  const response = await axios.patch(
    `${baseUrl}/update-phone`,
    { phone },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

// PATCH user password
export const updatePassword = async (currentPassword: string, newPassword: string) => {
  const response = await axios.put(
    `${baseUrl}/modify-password`,
    { currentPassword, newPassword },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export default {
  createAccount,
  getUserData,
  updateName,
  updateEmail,
  updatePhone,
  updatePassword,
};
