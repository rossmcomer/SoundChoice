import axios from '../util/apiClient'

const baseUrl = '/users'

export const createAccount = async (userData: {
  name: string
  email: string
  phone: string
  password: string
}) => {
  const response = await axios.post(`${baseUrl}/create-account`, userData)
  return response.data
}

export const getUserData = async () => {
    const response = await axios.get(`${baseUrl}/`, {
      withCredentials: true, // No need to send token manually, cookies are sent automatically
    });
    return response.data;
  };
  
  export const updateName = async (name: string) => {
    const response = await axios.patch(
      `${baseUrl}/update-name`,
      { name },
      {
        withCredentials: true, // Send cookies automatically
      }
    );
    return response.data;
  };
  
  export const updateEmail = async (email: string) => {
    const response = await axios.patch(
      `${baseUrl}/update-email`,
      { email },
      {
        withCredentials: true, // Send cookies automatically
      }
    );
    return response.data;
  };
  
  export const updatePhone = async (phone: string) => {
    const response = await axios.patch(
      `${baseUrl}/update-phone`,
      { phone },
      {
        withCredentials: true, // Send cookies automatically
      }
    );
    return response.data;
  };
  
  export const updatePassword = async (currentPassword: string, newPassword: string) => {
    const response = await axios.put(
      `${baseUrl}/modify-password`,
      { currentPassword, newPassword },
      {
        withCredentials: true, // Send cookies automatically
      }
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
}
