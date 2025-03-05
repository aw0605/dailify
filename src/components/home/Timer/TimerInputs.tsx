import Input from "@/components/common/ui/Input";
import styled, { css } from "styled-components";

interface TimeInputProps {
  time: { h: number; m: number; s: number };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const TimeInput = ({ time, onChange, disabled }: TimeInputProps) => {
  return (
    <InputContainer>
      <Input
        type="number"
        name="h"
        value={time.h}
        onChange={onChange}
        min={0}
        max={23}
        disabled={disabled}
      />
      h
      <Input
        type="number"
        name="m"
        value={time.m}
        onChange={onChange}
        min={0}
        max={59}
        disabled={disabled}
      />
      m
      <Input
        type="number"
        name="s"
        value={time.s}
        onChange={onChange}
        min={0}
        max={59}
        disabled={disabled}
      />
      s
    </InputContainer>
  );
};

export default TimeInput;

const InputContainer = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({})}
    gap: 10px;
    margin-bottom: 30px;
    font-size: ${theme.pxToRem(18)};

    input {
      width: 50px;
      height: 40px;
      padding: 0;
      text-align: center;
      margin-right: 2px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  `}
`;
