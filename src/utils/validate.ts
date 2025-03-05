import { FormValuesProps } from "@/types/user";
import { TimeFormValuesProps } from "@/types/time";

export interface ValidationErrors {
  email?: string;
  password?: string;
  rePassword?: string;
  time?: string;
}

export const validateLogin = (formValues: {
  email: string;
  password: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }

  if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(formValues.password)) {
    errors.password = "영문자, 숫자 포함 8글자 이상 입력하세요.";
  }

  return errors;
};

export const validateSignup = (
  formValues: FormValuesProps,
): ValidationErrors => {
  const errors: ValidationErrors = validateLogin(formValues);

  if (!formValues.rePassword || formValues.password !== formValues.rePassword) {
    errors.rePassword = "비밀번호가 일치하지 않습니다.";
  }

  return errors;
};

export const validateTime = (
  formValues: TimeFormValuesProps,
): ValidationErrors => {
  const errors: ValidationErrors = {};
  const { h, m, s } = formValues;

  if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) {
    errors.time = "잘못된 시간입니다.";
  }

  return errors;
};
