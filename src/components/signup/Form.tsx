import { useState } from "react";
import { useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import { signUpWithEmail } from "@/lib/supabase/auth";
import { validateSignup } from "@/utils/validate";
import TextField from "../common/ui/TextField";
import Button from "../common/ui/Button";
import styled, { css } from "styled-components";

import { FormValuesProps } from "@/types/user";

function Form() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const {
    formValues,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    dirty,
    isAble,
  } = useForm<FormValuesProps>({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validate: validateSignup,
    onSubmit: async (formValues) => {
      const { error } = await signUpWithEmail(formValues);
      if (error) {
        if (error.message === "User already registered") {
          setErrorMessage("이미 가입된 이메일입니다.");
        } else {
          console.log("회원가입 중 오류 발생", error.message);
        }
      }
    },
  });

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <TextFieldGroup>
        <TextField
          label="이메일"
          name="email"
          type="email"
          value={formValues.email}
          placeholder="이메일을 입력하세요"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={Boolean(dirty.email) && Boolean(errors.email)}
          helpMsg={dirty.email ? errors.email : ""}
          required
        />

        <TextField
          label="비밀번호"
          name="password"
          type="password"
          value={formValues.password}
          placeholder="비밀번호를 입력하세요"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={Boolean(dirty.password) && Boolean(errors.password)}
          helpMsg={dirty.password ? errors.password : ""}
          autoComplete="off"
          required
        />

        <TextField
          label="비밀번호 확인"
          name="rePassword"
          type="password"
          value={formValues.rePassword}
          placeholder="비밀번호를 입력하세요"
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
          helpMsg={dirty.rePassword ? errors.rePassword : ""}
          autoComplete="off"
          required
        />
      </TextFieldGroup>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
      <ButtonGroup>
        <Button disabled={!isAble} type="submit">
          회원가입
        </Button>
        <Button
          type="button"
          onClick={() => router.push("/login")}
          variant="outline"
        >
          로그인
        </Button>
      </ButtonGroup>
    </form>
  );
}

export default Form;

const TextFieldGroup = styled.div`
  ${({ theme }) => css`
    width: 100%;
    ${theme.mixins.flexBox({ direction: "column", align: "stretch" })};
    gap: 15px;
    margin-bottom: 20px;
  `}
`;

const ButtonGroup = styled.div`
  button {
    height: 40px;
    margin-bottom: 5px;
  }
`;

const ErrorMsg = styled.p`
  ${({ theme }) => css`
    ${theme.typography.p({ size: 12, color: theme.colors.orangeRed })}
    margin-bottom: 10px;
  `}
`;
