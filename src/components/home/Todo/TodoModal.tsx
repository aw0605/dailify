import useUser from "@/hooks/useUser";
import useForm from "@/hooks/useForm";
import useTodayQuery from "@/hooks/query/useTodayQuery";
import useCalendarStore from "@/zustand/useCalendarStore";
import useModalStore from "@/zustand/useModalStore";
import { validateTodo } from "@/utils/validate";
import { formatDate } from "@/utils/formatDate";
import TextField from "@/components/common/ui/TextField";
import TextareaField from "@/components/common/ui/TextareaField";
import ModalButtons from "@/components/common/ui/Modal/ModalButtons";
import styled, { css } from "styled-components";

import { TodoItem } from "@/types/todo";

function TodoModal({ editTodo }: { editTodo?: TodoItem }) {
  const { user } = useUser();
  const closeModal = useModalStore((state) => state.closeModal);

  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const { formattedDate } = formatDate(selectedDate);

  const { addTodo, updateTodo } = useTodayQuery();

  const isEdit = !!editTodo;

  const {
    formValues: todo,
    handleChange,
    handleSubmit,
    isAble,
  } = useForm({
    initialValues: editTodo || { subject: "", title: "", content: "" },
    validate: validateTodo,
    onSubmit: async () => {
      if (!user) return;

      try {
        if (isEdit) {
          updateTodo.mutate({
            ...editTodo,
            subject: todo.subject,
            title: todo.title,
            content: todo.content,
          });
          alert("할 일이 수정되었습니다.");
        } else {
          addTodo.mutate({
            subject: todo.subject,
            title: todo.title,
            content: todo.content,
            date: selectedDate!,
          });
          alert("할 일이 추가되었습니다.");
        }

        closeModal("todoModal");
      } catch (error) {
        console.error("할 일 저장 실패:", error);
        alert("할 일 저장 중 오류가 발생했습니다.");
      }
    },
  });

  return (
    <ModalWrapper onSubmit={handleSubmit}>
      <Title>Today&apos;s To do</Title>
      <h1>날짜: {formattedDate}</h1>
      <TextFieldContainer>
        <TextField
          label="분류"
          name="subject"
          essential={true}
          placeholder="ex)) 국어, 토익, CS..."
          value={todo.subject}
          onChange={handleChange}
          required
        />
        <TextField
          label="제목"
          name="title"
          essential={true}
          placeholder="제목을 입력하세요"
          value={todo.title}
          onChange={handleChange}
          required
        />
        <TextareaField
          label="내용"
          name="content"
          rows={5}
          placeholder="내용을 입력하세요"
          value={todo.content ?? ""}
          onChange={handleChange}
        />
      </TextFieldContainer>

      <ModalButtons modalId="todoModal" disabled={!isAble} />
    </ModalWrapper>
  );
}

export default TodoModal;

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
