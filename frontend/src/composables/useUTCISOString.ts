export const getUTCISOString = (date: Date, time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);

  const localDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0,
    0,
  );

  return localDateTime.toISOString(); // UTC ISO string
};

export default getUTCISOString;
