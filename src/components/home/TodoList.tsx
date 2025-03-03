import { useTheme } from "styled-components";
import Accordion from "../common/ui/Accordion/Accordion";
import AccordionHeader from "../common/ui/Accordion/AccordionHeader";
import { TodoItem } from "@/types/todo";

const mockData: TodoItem[] = [
  {
    id: 1,
    subject: "코테",
    title: "오늘 할 일 오늘 할 일 오늘 할 일 오늘 할 일 오늘 할 일 오늘 할 일 ",
    content: "상세 내용",
  },
  {
    id: 2,
    subject: "운동",
    title: "오늘 할 일2",
    content: "상세 내용",
  },
  {
    id: 3,
    subject: "면접",
    title: "오늘 할 일3",
    date: "2025-02-25",
  },
];

function TodoList() {
  const theme = useTheme();

  return (
    <>
      {mockData.map((todo: TodoItem) => (
        <Accordion
          key={todo.id}
          color={theme.colors.gray4}
          header={<AccordionHeader item={todo} />}
          style={{ marginBottom: "10px" }}
        >
          {todo.content}
        </Accordion>
      ))}
    </>
  );
}

export default TodoList;
