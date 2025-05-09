import axios from '../util/apiClient';
const baseUrl = '/stripe';

import type { CheckoutRequestBody, CheckoutSessionResponse } from '@/types'

const checkoutDeposit = async (body: CheckoutRequestBody): Promise<CheckoutSessionResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await axios.post(`${baseUrl}/pay-deposit`, body, {
    headers,
    withCredentials: true,
  });
  return response.data;
};

const checkoutRemainingBalance = async (
  body: CheckoutRequestBody,
): Promise<CheckoutSessionResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await axios.post(`${baseUrl}/pay-remaining`, body, {
    headers,
    withCredentials: true,
  });
  return response.data;
};

export default { checkoutDeposit, checkoutRemainingBalance };
