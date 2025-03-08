import { TimeFormValuesProps } from "@/types/time";

export const convertToMs = ({ h, m, s }: TimeFormValuesProps): number => {
  return h * 3600000 + m * 60000 + s * 1000;
};
