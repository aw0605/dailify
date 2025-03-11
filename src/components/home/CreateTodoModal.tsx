import React from "react";
import styled, { css } from "styled-components";
import TextField from "../common/ui/TextField";
import ModalButtons from "../common/ui/Modal/ModalButtons";
import useCalendarStore from "@/zustand/useCalendarStore";
import { formatDate } from "@/utils/formatDate";
import useForm from "@/hooks/useForm";
import { validateTodo } from "@/utils/validate";
import TextareaField from "../common/ui/TextareaField";
import useUser from "@/hooks/useUser";
import { setTodayTodo } from "@/lib/supabase/todayTodo";
import useModalStore from "@/zustand/useModalStore";

function CreateTodoModal() {
  const { user, userId } = useUser();
  const { selectedDate } = useCalendarStore();
  const { formattedDate } = formatDate(selectedDate);
  const { closeModal } = useModalStore();

  const {
    formValues: todo,
    handleChange,
    handleSubmit,
    isAble,
  } = useForm({
    initialValues: { subject: "", title: "", content: "" },
    validate: validateTodo,
    onSubmit: async () => {
      if (!user) return;

      try {
        await setTodayTodo({
          uid: userId!,
          date: selectedDate!,
          subject: todo.subject,
          title: todo.title,
          content: todo.content,
        });

        alert("할 일이 추가되었습니다.");
        closeModal("createTodoModal");
      } catch (error) {
        console.error("할 일 추가 실패:", error);
        alert("할 일 추가 중 오류가 발생했습니다.");
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
          value={todo.content}
          onChange={handleChange}
        />
      </TextFieldContainer>

      <ModalButtons modalId="createTodoModal" disabled={!isAble} />
    </ModalWrapper>
  );
}

export default CreateTodoModal;

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
