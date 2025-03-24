import styled, { css, keyframes, useTheme } from "styled-components";

interface LoadingProps {
  size?: string;
  color?: string;
}

export default function Loading({ size = "24px", color }: LoadingProps) {
  const theme = useTheme();

  return (
    <Wrapper>
      <Inner $size={size} $color={color || theme.colors.primary} />
    </Wrapper>
  );
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100vh;
    ${theme.mixins.flexBox({})}
  `}
`;

const Inner = styled.div<{ $size: string; $color: string }>`
  ${({ $size, $color }) => css`
    display: block;
    width: ${$size};
    height: ${$size};
    border-radius: 50%;
    border: 3px solid ${$color}};
    border-top-color: transparent;
    animation: ${spin} 1s linear infinite;
  `}
`;
