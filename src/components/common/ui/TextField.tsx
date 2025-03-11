import { forwardRef, InputHTMLAttributes, useState } from "react";
import Input from "./Input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import styled, { css } from "styled-components";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  essential?: boolean;
  hasError?: boolean;
  helpMsg?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      essential = false,
      hasError,
      helpMsg,
      onFocus,
      onBlur,
      type,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <Wrapper>
        {label ? (
          <label>
            {label}
            {essential && <span>*필수</span>}
          </label>
        ) : null}
        <Container>
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
        </Container>
        {helpMsg ? <p>{helpMsg}</p> : null}
      </Wrapper>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;

const Wrapper = styled.div`
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

const Container = styled.div`
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
