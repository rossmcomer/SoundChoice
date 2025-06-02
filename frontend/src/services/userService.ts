import axios from '@/util/apiClient';
import { toast } from 'vue3-toastify';

const baseUrl = '/users';

// Create new account
export const createAccount = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${baseUrl}/create-account`, userData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      const errorMessage = error.response.data.error;

      // Display toast based on the error message
      if (errorMessage === 'Email already in use') {
        toast.error('This email is already in use. Please try another one.');
      } else if (errorMessage === 'Email registered but not verified') {
        toast.warning('This email is registered but not verified. Please check your inbox.');
      } else {
        toast.error('An account creation error occurred.');
      }
    } else {
      toast.error('Something went wrong. Please try again later.');
    }
    throw error; // Re-throw the error if needed
  }
};

// Pull user info
export const getUserData = async () => {
  const response = await axios.get(baseUrl, {
    withCredentials: true,
  });
  return response.data;
};

//Handle Forgot Password
export const handleForgotPassword = async (email: string) => {
  try {
    await axios.post(`${baseUrl}/forgot-password`, { email });
  } catch (err: any) {
    console.error(err);
  }
};

//Submit New Password
export const submitNewPassword = async (token: string, newPassword: string) => {
  try {
    await axios.patch(`${baseUrl}/reset-password`, { token, newPassword });
  } catch (err: any) {
    console.error(err);
  }
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
  handleForgotPassword,
  updateName,
  updateEmail,
  updatePhone,
  updatePassword,
};
