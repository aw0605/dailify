import styled, { css, keyframes, useTheme } from "styled-components";

interface LoadingProps {
  size?: string;
  color?: string;
}

export default function Loading({ size = "24px", color }: LoadingProps) {
  const theme = useTheme();

  return (
    <Wrapper $size={size}>
      <Inner $color={color || theme.colors.primary} />
    </Wrapper>
  );
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div<{ $size: string }>`
  ${({ $size }) => css`
    display: inline-block;
    width: ${$size};
    height: ${$size};
  `}
`;

const Inner = styled.div<{ $color: string }>`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid ${({ $color }) => $color};
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
`;
