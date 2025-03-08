import useModalStore from "@/zustand/useModalStore";
import Button from "@/components/common/ui/Button";
import styled, { css } from "styled-components";

interface ButtonGroupProps {
  modalId: string;
  disabled?: boolean;
}

const ModalButtons = ({ modalId, disabled }: ButtonGroupProps) => {
  const { closeModal } = useModalStore();

  return (
    <Container>
      <Button variant="outline" onClick={() => closeModal(modalId)}>
        취소
      </Button>
      <Button type="submit" disabled={disabled}>
        확인
      </Button>
    </Container>
  );
};

export default ModalButtons;

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
