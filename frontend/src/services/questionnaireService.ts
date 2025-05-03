import axios from '@/util/apiClient';

const baseUrl = '/questionnaire';

export const saveAnswers = async (bookingId: string, answers: Record<string, string>) => {
  const response = await axios.patch(
    `${baseUrl}/${bookingId}`,
    { answers: answers },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export default { saveAnswers };
