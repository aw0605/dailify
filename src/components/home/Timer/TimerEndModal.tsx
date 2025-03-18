import Button from "@/components/common/ui/Button";
import useModalStore from "@/zustand/useModalStore";
import styled, { css } from "styled-components";

function TimerEndModal() {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <TimerEndWrapper>
      <Title>타이머 종료!</Title>
      <Button onClick={() => closeModal("timerEndModal")}>확인</Button>
    </TimerEndWrapper>
  );
}

export default TimerEndModal;

const TimerEndWrapper = styled.div`
  width: 200px;
  text-align: center;
`;

const Title = styled.div`
  ${({ theme }) => css`
    ${theme.typography.title({ size: 24, color: theme.colors.orange })}
    margin-bottom: 20px;
  `}
`;
