import axios from '@/util/apiClient';

const baseUrl = '/questions';

export const saveAnswers = async ({
  questionnaireId,
  answers,
}: {
  questionnaireId: string;
  answers: Record<string, string>;
}) => {
  const response = await axios.patch(
    `${baseUrl}/${questionnaireId}`,
    { answers: answers },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export default { saveAnswers };
