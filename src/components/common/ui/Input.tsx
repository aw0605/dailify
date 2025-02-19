"use client";

import { forwardRef } from "react";
import styled, { css, useTheme } from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: string;
  focusBorderColor?: string;
  size?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ color, focusBorderColor, size = 16, ...props }, ref) => {
    const theme = useTheme();

    return (
      <InputWrapper
        ref={ref}
        $color={color || theme.colors.gray1}
        $focusBorderColor={focusBorderColor || theme.colors.primary}
        $size={size}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;

const InputWrapper = styled.input<{
  $color: string;
  $focusBorderColor: string;
  $size: number;
}>`
  ${({ theme, $color, $focusBorderColor, $size }) => css`
  ${theme.typography.p({ size: $size, color: $color })};
  outline: none;
  padding: 10px 20px;
  border: 2px solid ${theme.colors.gray3};
  border-radius: 10px;
  
    &::placeholder {
      color: ${theme.colors.gray3};
    }

    &:focus {
      border-color: ${$focusBorderColor};
    }
    
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    },
  `}
`;
