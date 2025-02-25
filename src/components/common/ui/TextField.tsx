import React, { forwardRef, InputHTMLAttributes } from "react";
import styled, { css, useTheme } from "styled-components";
import Input from "./Input";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMsg?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hasError, helpMsg, ...props }, ref) => {
    const theme = useTheme();
    const labelColor = hasError ? theme.colors.orangeRed : theme.colors.primary;
    return (
      <Container>
        {label ? <h2>{label}</h2> : null}
        <Input ref={ref} aria-invalid={hasError} {...props} />
        {helpMsg ? <p>{helpMsg}</p> : null}
      </Container>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;

const Container = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column", align: "flex-start" })}
    gap: 3px;
    h2 {
      padding-left: 5px;
      ${theme.typography.title({ size: 16 })}
    }
    p {
      padding-left: 5px;
      ${theme.typography.p({ size: 12, color: theme.colors.orangeRed })}
    }
  `};
`;
