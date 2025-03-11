import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import useCalendarStore from "@/zustand/useCalendarStore";
import { getTodayTodos, toggleTodayTodo } from "@/lib/supabase/todayTodo";
import Accordion from "../common/ui/Accordion/Accordion";
import AccordionHeader from "../common/ui/Accordion/AccordionHeader";
import styled, { css, useTheme } from "styled-components";

import { TodoItem } from "@/types/todo";

function TodoList() {
  const theme = useTheme();
  const { user, userId } = useUser();
  const { selectedDate } = useCalendarStore();
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const fetchTodos = async () => {
    if (!user) return;
    const fetchedTodos = await getTodayTodos(userId!, selectedDate!);
    if (fetchedTodos) {
      const sortedTodos = [...fetchedTodos].sort(
        (a, b) => Number(b.completed) - Number(a.completed),
      );
      setTodos(sortedTodos);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await toggleTodayTodo(id, completed);
      fetchTodos();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [userId, selectedDate?.toISOString()]);

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
                onCheck={() => handleToggle(todo.id, todo.completed)}
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

// const handleCheck = (id: string) => {
//   setTodos((prevTodos) =>
//     prevTodos.map((todo) =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo,
//     ),
//   );
// };
