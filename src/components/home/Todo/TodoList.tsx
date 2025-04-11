import { memo } from "react";
import useTodayQuery from "@/hooks/query/useTodayQuery";
import useModalStore from "@/zustand/useModalStore";
import Accordion from "@/components/common/ui/Accordion/Accordion";
import AccordionHeader from "@/components/common/ui/Accordion/AccordionHeader";
import Skeleton from "@/components/common/ui/Skeleton";
import styled, { css, useTheme } from "styled-components";

import { TodoItem } from "@/types/todo";

interface TodoListProps {
  todos: TodoItem[] | [];
  isLoading: boolean;
}

function TodoList({ todos, isLoading }: TodoListProps) {
  const theme = useTheme();
  const openModal = useModalStore((state) => state.openModal);

  const { toggleTodo, deleteTodo } = useTodayQuery();

  if (isLoading) {
    return <Skeleton height="45px" radius="10px" />;
  }

  return (
    <>
      {todos.length === 0 ? (
        <AlertMsg>오늘의 할 일이 없습니다.</AlertMsg>
      ) : (
        todos.map((todo: TodoItem) => (
          <Accordion
            key={todo.id}
            color={todo.completed ? theme.colors.primary : theme.colors.gray4}
            header={
              <AccordionHeader
                item={todo}
                onCheck={() =>
                  toggleTodo.mutate({
                    id: todo.id,
                    completed: todo.completed,
                  })
                }
                onEdit={() => openModal("todoModal", { editTodo: todo })}
                onDelete={() => deleteTodo.mutate(todo.id)}
              />
            }
            style={{ marginBottom: "10px" }}
          >
            {todo.content}
          </Accordion>
        ))
      )}
    </>
  );
}

export default memo(TodoList);

const AlertMsg = styled.h1`
  ${({ theme }) => css`
    margin-top: 150px;
    ${theme.mixins.flexBox({})};
    ${theme.typography.title({ size: 24 })}
    ${theme.media.md`
      margin: 100px 0;
    `}
  `}
`;
