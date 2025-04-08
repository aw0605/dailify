import Accordion from "@/components/common/ui/Accordion/Accordion";
import AccordionHeader from "@/components/common/ui/Accordion/AccordionHeader";
import styled, { css } from "styled-components";

import { TodoItem } from "@/types/todo";

function TodoList({ todos }: { todos: TodoItem[] }) {
  return (
    <div>
      <Title>Unfinished To do</Title>

      {todos.length === 0 ? (
        <AlertMsg>미완료된 할 일이 없습니다.</AlertMsg>
      ) : (
        todos.map((unfinishedTodo: TodoItem) => (
          <Accordion
            key={unfinishedTodo.id}
            type="unfinish"
            header={<AccordionHeader type="unfinish" item={unfinishedTodo} />}
            style={{ marginBottom: "10px" }}
          >
            {unfinishedTodo.content}
          </Accordion>
        ))
      )}
    </div>
  );
}

export default TodoList;

const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.typography.title({ size: 18 })}
    padding: 0 10px 10px;
  `}
`;

const AlertMsg = styled.h1`
  ${({ theme }) => css`
    margin-top: 50px;
    ${theme.mixins.flexBox({})};
    ${theme.typography.title({ size: 18 })}
    ${theme.media.md`
      margin: 50px 0;
    `}
  `}
`;
