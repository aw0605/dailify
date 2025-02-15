import { css } from "styled-components";

interface FlexProps {
  direction?: string;
  align?: string;
  justify?: string;
}

export const MIXINS = {
  // flex 배치 설정
  flexBox: ({
    direction = "row",
    align = "center",
    justify = "center",
  }: FlexProps) => css`
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,

  // 가운데 배치
  positionCenter: (type = "absolute") => {
    if (type === "absolute" || type === "fixed")
      return css`
        position: ${type};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `;
    return;
  },
};
