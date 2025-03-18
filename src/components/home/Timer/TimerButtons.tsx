import useModalStore from "@/zustand/useModalStore";
import Button from "@/components/common/ui/Button";
import styled, { css } from "styled-components";

interface ButtonGroupProps {
  onStartPause: () => void;
  isRunning: boolean;
  isDisabled: boolean;
}

const ButtonGroup = ({
  onStartPause,
  isRunning,
  isDisabled,
}: ButtonGroupProps) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Container>
      <Button variant="outline" onClick={() => closeModal("timerModal")}>
        취소
      </Button>
      <Button onClick={onStartPause} disabled={isDisabled}>
        {isRunning ? "정지" : "시작"}
      </Button>
    </Container>
  );
};

export default ButtonGroup;

const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    ${theme.mixins.flexBox({})}
    gap: 20px;
    button {
      flex: 1;
    }
  `}
`;
