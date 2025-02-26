import { signInWithGoogle, signInWithKakao } from "@/lib/supabase/actions";
import GoogleIcon from "../../../public/googleIcon.svg";
import KaKaoIcon from "../../../public/kakaoIcon.svg";
import styled, { css } from "styled-components";

function Social() {
  return (
    <div style={{ width: "100%" }}>
      <Title>
        <span>소셜 로그인</span>
      </Title>
      <ButtonGroup>
        <button onClick={signInWithKakao}>
          <KaKaoIcon width="25" height="25" />
        </button>
        <button onClick={signInWithGoogle}>
          <GoogleIcon width="30" height="30" />
        </button>
      </ButtonGroup>
    </div>
  );
}

export default Social;

const Title = styled.div`
  ${({ theme }) => css`
    width: 100%;
    ${theme.mixins.flexBox({})};
    gap: 10px;
    margin-bottom: 15px;
    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 2px;
      background-color: ${theme.colors.gray4};
    }

    span {
      ${theme.typography.title({
        size: 16,
        color: theme.colors.gray2,
      })};
    }
  `}
`;

const ButtonGroup = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({})};
    gap: 50px;
    button {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      overflow: hidden;
    }
    button:first-child {
      background-color: #ffeb3b;
    }
  `}
`;
