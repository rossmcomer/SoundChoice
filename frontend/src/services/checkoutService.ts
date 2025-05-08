import axios from '../util/apiClient';
const baseUrl = '/stripe';

interface CheckoutRequestBody {
  eventType: string;
  addHours: boolean;
  additionalHours: number;
  uplights: boolean;
  total: number;
}

interface CheckoutSessionResponse {
  id: string;
}

const checkoutDeposit = async (body: CheckoutRequestBody): Promise<CheckoutSessionResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await axios.post(`${baseUrl}/pay-deposit`, body, { headers });
  return response.data;
};

const checkoutRemainingBalance = async (
  body: CheckoutRequestBody,
): Promise<CheckoutSessionResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await axios.post(`${baseUrl}/pay-remaining`, body, { headers });
  return response.data;
};

export default { checkoutDeposit, checkoutRemainingBalance };
