"use client";

import MainLayout from "@/components/common/layout/MainLayout";
import Button from "@/components/common/ui/Button";
import Input from "@/components/common/ui/Input";
import Loading from "@/components/common/ui/Loading";
import Skeleton from "@/components/common/ui/Skeleton";
import Accordion from "@/components/common/ui/Accordion/Accordion";
import AccordionHeader from "@/components/common/ui/Accordion/AccordionHeader";
import styled, { useTheme } from "styled-components";

import { TodoItem } from "@/types/todo";

const mockData: TodoItem[] = [
  {
    id: 1,
    type: "today",
    subject: "코테",
    title: "오늘 할 일 오늘 할 일 오늘 할 일 오늘 할 일 오늘 할 일 오늘 할 일 ",
    content: "상세 내용",
  },
  {
    id: 2,
    type: "weekly",
    subject: "코테",
    title: "이번 주 할 일",
    content: "상세 내용",
  },
  {
    id: 3,
    type: "monthly",
    title: "약속",
    date: "2025-02-25",
    content: "상세 내용",
  },
];

export default function Home() {
  const theme = useTheme();

  return (
    <MainLayout hasSide isVertical>
      <div>
        <StyledButton type="submit" color={theme.colors.darkOrange}>
          버튼 테스트
        </StyledButton>
        <StyledInput
          type="text"
          placeholder="입력하세요."
          focusBorderColor={theme.colors.orangeRed}
        />
        <Skeleton width="200px" height="40px" />
        <Loading size="30px" color={theme.colors.gray1} />

        {mockData.map((todo: TodoItem) => (
          <Accordion
            key={todo.id}
            color={theme.colors.gray4}
            header={<AccordionHeader item={todo} />}
            style={{ marginBottom: "10px" }}
          >
            <p>{todo.content}</p>
          </Accordion>
        ))}
      </div>
      <div>사이드 콘텐츠</div>
    </MainLayout>
  );
}

const StyledButton = styled(Button)`
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
`;
