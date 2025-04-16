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

export const getUserData = async (token: string) => {
    const response = await axios.get(`${baseUrl}/`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  };
  
  export const updateName = async (name: string, token: string) => {
    const response = await axios.patch(
      `${baseUrl}/update-name`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data;
  };
  
  export const updateEmail = async (email: string, token: string) => {
    const response = await axios.patch(
      `${baseUrl}/update-email`,
      { email },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data;
  };
  
  export const updatePhone = async (phone: string, token: string) => {
    const response = await axios.patch(
      `${baseUrl}/update-phone`,
      { phone },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return response.data;
  };
  
  export const updatePassword = async (currentPassword: string, newPassword: string, token: string) => {
    const response = await axios.put(
      `${baseUrl}/modify-password`,
      { currentPassword, newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
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
