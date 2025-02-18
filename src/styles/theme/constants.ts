import { css } from "styled-components";
import { pxToRem } from "./utils";
import { media } from "./breakpoints";

// 색상 설정
export const COLORS = {
  primary: "#ffda87",
  orange: "#ffbc25",
  darkOrange: "#ffa426",
  orangeRed: "#ff6d1e",
  blue: "#3c7aee",
  white: "#fff",
  cultured: "#f7f9f9",
  blueGray: "#e6ebee",
  ghostGray: "#fafbfd",
  gray1: "#3e3e3e",
  gray2: "#6e6e6e",
  gray3: "#9e9e9e",
  gray4: "#eee",
};

interface TypograpyProps {
  size?: number;
  color?: string;
  diff?: number;
}

// 타이포그라피 설정
export const TYPOGRAPHY = {
  title: ({ size = 32, color = COLORS.gray1, diff = 4 }: TypograpyProps) => css`
    font-size: ${pxToRem(size)};
    font-weight: bold;
    color: ${color};
    ${media.md`
    font-size: ${pxToRem(size - diff)};
    `}
  `,
  p: ({ size = 16, color = COLORS.gray1, diff = 4 }: TypograpyProps) => css`
    font-size: ${pxToRem(size)};
    color: ${color};
    ${media.md`
    font-size: ${pxToRem(size - diff)};
    `}
  `,
} as const;
