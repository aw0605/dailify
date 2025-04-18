import useForm from "@/hooks/useForm";
import { useUserQuery } from "@/hooks/query/useUserQuery";
import useMyQuery from "@/hooks/query/useMyQuery";
import useModalStore from "@/zustand/useModalStore";
import { validateDday } from "@/utils/validate";
import ModalButtons from "@/components/common/ui/Modal/ModalButtons";
import TextField from "@/components/common/ui/TextField";
import styled, { css } from "styled-components";

function DdayModal() {
  const { userId } = useUserQuery();
  const closeModal = useModalStore((state) => state.closeModal);

  const { addEvent } = useMyQuery();

  const {
    formValues: dday,
    handleChange,
    handleSubmit,
    isAble,
  } = useForm({
    initialValues: { title: "", date: new Date() },
    validate: validateDday,
    onSubmit: async () => {
      if (!userId) return;

      try {
        addEvent.mutate({
          title: dday.title,
          date: dday.date,
        });

        alert("D-day 이벤트를 등록했습니다.");
        closeModal("ddayModal");
      } catch (error) {
        console.error("D-day이벤트 등록 중 에러 발생:", error);
        alert("D-day 이벤트 등록에 실패했습니다.");
      }
    },
  });

  return (
    <ModalWrapper onSubmit={handleSubmit}>
      <Title>D-day</Title>
      <TextFieldContainer>
        <TextField
          label="이벤트"
          name="title"
          value={dday.title}
          onChange={handleChange}
          placeholder="이벤트명을 입력하세요"
          essential={true}
          required
        />
        <TextField
          label="날짜"
          name="date"
          type="date"
          value={dday.date.toISOString().split("T")[0]}
          onChange={handleChange}
          essential={true}
          required
        />
      </TextFieldContainer>

      <ModalButtons modalId="ddayModal" disabled={!isAble} />
    </ModalWrapper>
  );
}

export default DdayModal;

const ModalWrapper = styled.form`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })}
    gap: 32px;
    h1 {
      ${theme.typography.title({ size: 16 })}
    }
  `}
`;

const Title = styled.div`
  ${({ theme }) => css`
    ${theme.typography.title({ size: 24, color: theme.colors.orange })}
  `}
`;

const TextFieldContainer = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })}
    gap: 16px;
    width: 100%;

    > div {
      width: 100%;
    }
  `}
`;
