import { css, CSSObject, SimpleInterpolation } from "styled-components";

export const BREAKPOINTS = {
  sm: "440px",
  md: "834px",
  lg: "1440px",
} as const;

type Breakpoint = "sm" | "md" | "lg";

export const media = Object.keys(BREAKPOINTS).reduce(
  (acc, label) => ({
    ...acc,
    [label]: (
      ...args: [TemplateStringsArray | CSSObject, ...SimpleInterpolation[]]
    ) => css`
      @media (max-width: ${BREAKPOINTS[label as Breakpoint]}) {
        ${css(...args)};
      }
    `,
  }),
  {} as Record<Breakpoint, any>,
);
