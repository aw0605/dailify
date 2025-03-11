import { forwardRef } from "react";
import styled, { css } from "styled-components";
import Textarea from "./Textarea";

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  essential?: boolean;
  hasError?: boolean;
  helpMsg?: React.ReactNode;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    { label, essential = false, hasError, helpMsg, onFocus, onBlur, ...props },
    ref,
  ) => {
    return (
      <Container>
        {label && (
          <label>
            {label}
            {essential && <span>*필수</span>}
          </label>
        )}
        <Textarea
          ref={ref}
          aria-invalid={hasError}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
        {helpMsg && <p>{helpMsg}</p>}
      </Container>
    );
  },
);

TextareaField.displayName = "TextareaField";

export default TextareaField;

const Container = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column", align: "flex-start" })};
    gap: 3px;
    label {
      padding-left: 5px;
      ${theme.typography.title({ size: 16 })};
      span {
        margin-left: 5px;
        ${theme.typography.title({ size: 12, color: theme.colors.orange })};
      }
    }
    p {
      padding-left: 5px;
      ${theme.typography.p({ size: 12, color: theme.colors.orangeRed })};
    }
  `}
`;
