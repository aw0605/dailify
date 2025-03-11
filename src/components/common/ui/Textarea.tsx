import { forwardRef } from "react";
import styled, { css, useTheme } from "styled-components";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  color?: string;
  focusBorderColor?: string;
  size?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ color, focusBorderColor, size = 14, ...props }, ref) => {
    const theme = useTheme();

    return (
      <TextareaWrapper
        ref={ref}
        $color={color || theme.colors.gray1}
        $focusBorderColor={focusBorderColor || theme.colors.primary}
        $size={size}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;

const TextareaWrapper = styled.textarea<{
  $color: string;
  $focusBorderColor: string;
  $size: number;
}>`
  ${({ theme, $color, $focusBorderColor, $size }) => css`
    ${theme.typography.p({ size: $size, color: $color })};
    width: 100%;
    outline: none;
    padding: 10px 20px;
    border: 2px solid ${theme.colors.gray3};
    border-radius: 10px;
    resize: vertical;
    min-height: 100px;

    &::placeholder {
      color: ${theme.colors.gray3};
    }

    &:focus {
      border-color: ${$focusBorderColor};
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `}
`;
