const calcDday = (date: Date | null, cur: Date) => {
  if (!date) return;

  const curDate = new Date(cur);

  date.setHours(0, 0, 0, 0);
  curDate.setHours(0, 0, 0, 0);

  const diff = date.getTime() - curDate.getTime();

  return `D-${Math.ceil(diff / (1000 * 60 * 60 * 24))}`;
};

export default calcDday;
