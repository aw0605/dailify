import { memo } from "react";
import useWeeklyQuery from "@/hooks/query/useWeeklyQuery";
import useModalStore from "@/zustand/useModalStore";
import Button from "@/components/common/ui/Button";
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

  const { toggleTodo, deleteTodo } = useWeeklyQuery();

  if (isLoading) {
    return <Skeleton height="45px" radius="10px" />;
  }

  return (
    <>
      <Header>
        <h1>Weekly To do</h1>
        <Button
          variant="ghost"
          size={24}
          onClick={() => openModal("weeklyTodoModal")}
        >
          +
        </Button>
      </Header>

      {todos.length === 0 ? (
        <AlertMsg>이번주 할 일이 없습니다.</AlertMsg>
      ) : (
        todos.map((todo: TodoItem) => (
          <Accordion
            key={todo.id}
            color={todo.completed ? theme.colors.primary : theme.colors.gray4}
            header={
              <AccordionHeader
                item={todo}
                onCheck={() =>
                  toggleTodo.mutate({ id: todo.id, completed: todo.completed })
                }
                onEdit={() => openModal("weeklyTodoModal", { editTodo: todo })}
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

const Header = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })};
    ${theme.typography.title({ size: 24 })};
    padding: 0 10px 10px;

    button {
      width: 20px;
      height: 20px;
    }
  `}
`;

const AlertMsg = styled.h1`
  ${({ theme }) => css`
    margin-top: 50px;
    ${theme.mixins.flexBox({})};
    ${theme.typography.title({ size: 24 })}
    ${theme.media.md`
      margin: 100px 0;
    `}
  `}
`;
