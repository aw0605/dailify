import React, { forwardRef, InputHTMLAttributes, useState } from "react";
import styled, { css } from "styled-components";
import Input from "./Input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMsg?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hasError, helpMsg, onFocus, onBlur, type, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <Container>
        {label ? <h2>{label}</h2> : null}
        <InputWrapper>
          <Input
            ref={ref}
            aria-invalid={hasError}
            type={isPasswordVisible ? "text" : type}
            onFocus={onFocus}
            onBlur={onBlur}
            {...props}
          />
          {type === "password" && (
            <PasswordToggleButton
              type="button"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </PasswordToggleButton>
          )}
        </InputWrapper>
        {helpMsg ? <p>{helpMsg}</p> : null}
      </Container>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;

const Container = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column", align: "flex-start" })};
    gap: 3px;
    h2 {
      padding-left: 5px;
      ${theme.typography.title({ size: 16 })};
    }
    p {
      padding-left: 5px;
      ${theme.typography.p({ size: 12, color: theme.colors.orangeRed })};
    }
  `}
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.gray3};
  }
`;
