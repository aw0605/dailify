import { useShallow } from "zustand/shallow";
import useTodayStore from "@/zustand/useTodayStore";
import useModalStore from "@/zustand/useModalStore";
import Accordion from "@/components/common/ui/Accordion/Accordion";
import AccordionHeader from "@/components/common/ui/Accordion/AccordionHeader";
import TodoModal from "./TodoModal";
import styled, { css, useTheme } from "styled-components";

import { TodoItem } from "@/types/todo";
import Skeleton from "@/components/common/ui/Skeleton";

function TodoList() {
  const theme = useTheme();
  const openModal = useModalStore((state) => state.openModal);

  const { todos, toggleTodo, deleteTodo, loading } = useTodayStore(
    useShallow((state) => ({
      todos: state.todos,
      fetchTodayData: state.fetchTodayData,
      toggleTodo: state.toggleTodo,
      deleteTodo: state.deleteTodo,
      loading: state.loading,
    })),
  );

  if (loading) {
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
                onCheck={() => toggleTodo(todo.id)}
                onEdit={() =>
                  openModal("todoModal", <TodoModal editTodo={todo} />)
                }
                onDelete={() => deleteTodo(todo.id)}
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

export default TodoList;

const AlertMsg = styled.h1`
  ${({ theme }) => css`
    margin-top: 150px;
    ${theme.mixins.flexBox({})};
    ${theme.typography.title({ size: 24 })}
  `}
`;
