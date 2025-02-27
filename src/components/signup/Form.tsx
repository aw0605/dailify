import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { validateSignup } from "@/utils/validate";
import TextField from "../common/ui/TextField";
import Button from "../common/ui/Button";
import styled, { css } from "styled-components";

import { SignupProps } from "@/types/user";

function Form({ onSubmit }: { onSubmit: (formValues: SignupProps) => void }) {
  const [formValues, setFormValues] = useState<SignupProps>({
    email: "",
    password: "",
    rePassword: "",
  });
  const [dirty, setDirty] = useState<Partial<SignupProps>>({});

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  }, []);

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  }, []);

  const errors = useMemo(() => validateSignup(formValues), [formValues]);
  const isAble = Object.keys(errors).length === 0;

  return (
    <form style={{ width: "100%" }}>
      <TextFieldGroup>
        <TextField
          label="이메일"
          name="email"
          type="email"
          value={formValues.email}
          placeholder="이메일을 입력하세요"
          onChange={handleFormValues}
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
          onChange={handleFormValues}
          onBlur={handleBlur}
          hasError={Boolean(dirty.password) && Boolean(errors.password)}
          helpMsg={dirty.password ? errors.password : ""}
          required
        />

        <TextField
          label="비밀번호 확인"
          name="rePassword"
          type="password"
          value={formValues.rePassword}
          placeholder="비밀번호를 입력하세요"
          onChange={handleFormValues}
          onBlur={handleBlur}
          hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
          helpMsg={dirty.rePassword ? errors.rePassword : ""}
          required
        />
      </TextFieldGroup>
      <ButtonGroup>
        <Button
          disabled={!isAble}
          onClick={() => {
            onSubmit(formValues);
          }}
        >
          회원가입
        </Button>
        <Link href="/login">
          <Button variant="outline">로그인</Button>
        </Link>
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
