export const convertTime = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Date(
    dateObj.getTime() - dateObj.getTimezoneOffset() * 60000,
  ).toISOString();
};
