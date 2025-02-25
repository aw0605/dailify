import Link from "next/link";
import TextField from "../common/ui/TextField";
import Button from "../common/ui/Button";
import styled, { css } from "styled-components";

function Form() {
  return (
    <form style={{ width: "100%" }}>
      <TextFieldGroup>
        <TextField
          label="아이디"
          name="uid"
          placeholder="아이디를 입력하세요"
          required
        />

        <TextField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
        />

        <TextField
          label="비밀번호 확인"
          name="rePassword"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
      </TextFieldGroup>
      <ButtonGroup>
        <Button>회원가입</Button>
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
