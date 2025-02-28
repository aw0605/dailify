import { useState } from "react";
import { useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import { signInWithEmail } from "@/lib/supabase/actions";
import { validateLogin } from "@/utils/validate";
import TextField from "@/components/common/ui/TextField";
import Button from "@/components/common/ui/Button";
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
    },
    validate: validateLogin,
    onSubmit: async (formValues) => {
      const { error } = await signInWithEmail(formValues);
      if (error) {
        if (error.message === "Invalid login credentials") {
          setErrorMessage(
            "등록되지 않은 이메일이거나 이메일 또는 비밀번호를 잘못 입력했습니다.",
          );
        } else {
          console.log("로그인 중 오류 발생", error.message);
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
      </TextFieldGroup>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
      <ButtonGroup>
        <Button disabled={!isAble} type="submit">
          로그인
        </Button>
        <Button onClick={() => router.push("/signup")} variant="outline">
          회원가입
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
