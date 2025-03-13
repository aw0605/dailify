import useUser from "@/hooks/useUser";
import useForm from "@/hooks/useForm";
import useModalStore from "@/zustand/useModalStore";
import { editMonthlyEvent, setMonthlyEvent } from "@/lib/supabase/monthly";
import { validateEvent } from "@/utils/validate";
import { convertTime } from "@/utils/convertTime";
import TextField from "@/components/common/ui/TextField";
import TextareaField from "@/components/common/ui/TextareaField";
import ModalButtons from "@/components/common/ui/Modal/ModalButtons";
import styled, { css } from "styled-components";

import { MonthlyEvent } from "@/types/monthly";

function MonthlyModal({ editEvent }: { editEvent?: MonthlyEvent }) {
  const { user, userId } = useUser();
  const { closeModal } = useModalStore();

  const isEdit = !!editEvent;

  const {
    formValues: event,
    handleChange,
    handleSubmit,
    isAble,
  } = useForm({
    initialValues: editEvent || { title: "", date: new Date(), content: "" },
    validate: validateEvent,
    onSubmit: async () => {
      if (!user) return;

      try {
        if (isEdit) {
          await editMonthlyEvent({
            id: editEvent.id,
            date: event.date,
            title: event.title,
            content: event.content,
          });
          alert("이벤트가 수정되었습니다.");
        } else {
          await setMonthlyEvent({
            uid: userId!,
            date: event.date,
            title: event.title,
            content: event.content,
          });
          alert("이벤트가 추가되었습니다.");
        }

        closeModal("monthlyModal");
      } catch (error) {
        console.error("이벤트 저장 실패:", error);
        alert("이벤트 저장 중 오류가 발생했습니다.");
      }
    },
  });

  return (
    <ModalWrapper onSubmit={handleSubmit}>
      <Title>Event</Title>
      <TextFieldContainer>
        <TextField
          label="제목"
          name="title"
          essential={true}
          placeholder="제목을 입력하세요"
          value={event.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="날짜"
          name="date"
          essential={true}
          type="datetime-local"
          value={convertTime(event.date).slice(0, 16)}
          onChange={handleChange}
          required
        />
        <TextareaField
          label="내용"
          name="content"
          rows={5}
          placeholder="내용을 입력하세요"
          value={event.content}
          onChange={handleChange}
        />
      </TextFieldContainer>

      <ModalButtons modalId="monthlyModal" disabled={!isAble} />
    </ModalWrapper>
  );
}

export default MonthlyModal;

const ModalWrapper = styled.form`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })}
    gap: 24px;
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

// event.date instanceof Date
//   ? event.date.toISOString().slice(0, 16)
//   : ""
