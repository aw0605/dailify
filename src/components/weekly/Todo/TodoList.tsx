import { useShallow } from "zustand/shallow";
import useTodayStore from "@/zustand/useTodayStore";
import useModalStore from "@/zustand/useModalStore";
import Button from "@/components/common/ui/Button";
import Accordion from "@/components/common/ui/Accordion/Accordion";
import AccordionHeader from "@/components/common/ui/Accordion/AccordionHeader";
import Skeleton from "@/components/common/ui/Skeleton";
import styled, { css, useTheme } from "styled-components";

import { TodoItem } from "@/types/todo";

const mockTodos = [
  {
    id: "1",
    subject: "운동",
    title: "근력 운동",
    content: "사레레 5kg 10회 - 3세트",
    completed: false,
    date: new Date(),
  },
  {
    id: "2",
    subject: "영어",
    title: "해커스 토익 RC",
    content: "~ S2, 동사구",
    completed: false,
    date: new Date(),
  },
];

function TodoList() {
  const theme = useTheme();
  const openModal = useModalStore((state) => state.openModal);

  return (
    <>
      <Header>
        <h1>Weekly To do</h1>
        <Button
          variant="ghost"
          size={24}
          onClick={() => openModal("todoModal", <div />)}
        >
          +
        </Button>
      </Header>

      {mockTodos.length === 0 ? (
        <AlertMsg>오늘의 할 일이 없습니다.</AlertMsg>
      ) : (
        mockTodos.map((todo: TodoItem) => (
          <Accordion
            key={todo.id}
            color={todo.completed ? theme.colors.primary : theme.colors.gray4}
            header={
              <AccordionHeader
                item={todo}
                onCheck={() => {}}
                onEdit={() => openModal("todoModal", <div></div>)}
                onDelete={() => {}}
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
    margin-top: 150px;
    ${theme.mixins.flexBox({})};
    ${theme.typography.title({ size: 24 })}
  `}
`;
