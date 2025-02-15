export const pxToRem = (px: number | string): string => {
  if (typeof px !== "number") return px;

  return `${px / 16}rem` as const;
};
