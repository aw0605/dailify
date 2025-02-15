import { media } from "./breakpoints";
import { COLORS, TYPOGRAPHY } from "./constants";
import { MIXINS } from "./mixins";
import { pxToRem } from "./utils";

export const theme = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  mixins: MIXINS,
  media,
  pxToRem,
};
