import axios from '@/util/apiClient';

const baseUrl = '/products';

// GET all products
export const getProducts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default {
  getProducts,
};
