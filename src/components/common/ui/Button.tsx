import { forwardRef } from "react";
import styled, { css, useTheme } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  size?: number;
  variant?: "solid" | "outline" | "ghost";
  color?: string;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { leftIcon, size = 16, variant = "solid", color, children, ...props },
    ref,
  ) => {
    const theme = useTheme();
    const btnColor = color || theme.colors.primary;

    return (
      <ButtonWrapper
        ref={ref}
        $size={size}
        $variant={variant}
        $color={btnColor}
        {...props}
      >
        {leftIcon && <span>{leftIcon}</span>}
        <span>{children}</span>
      </ButtonWrapper>
    );
  },
);

Button.displayName = "Button";

export default Button;

const ButtonWrapper = styled.button<{
  $size: number;
  $variant: "solid" | "outline" | "ghost";
  $color: string;
}>`
  ${({ theme, $size, $variant, $color }) => css`
    ${theme.typography.title({ size: $size })}
    ${theme.mixins.flexBox({})}
    gap: 8px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    ${$variant === "solid"
      ? css`
          background-color: ${$color};
          color: #fff;
          border: none;
          &:hover {
            background-color: #fff;
            color: ${$color};
            border: 2px solid ${$color};
          }
        `
      : $variant === "outline"
        ? css`
            background-color: #fff;
            color: ${$color};
            border: 2px solid ${$color};
            &:hover {
              background-color: ${$color};
              color: #fff;
            }
          `
        : css`
            background-color: transparent;
            color: ${$color};
            border: none;
            &:hover {
              background-color: ${$color};
              color: #fff;
            }
          `}
  `}
`;
