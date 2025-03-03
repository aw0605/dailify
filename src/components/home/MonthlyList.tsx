import useModalStore from "@/zustand/useModalStore";
import Accordion from "@/components/common/ui/Accordion/Accordion";
import AccordionHeader from "@/components/common/ui/Accordion/AccordionHeader";
import Button from "@/components/common/ui/Button";
import styled, { css, useTheme } from "styled-components";

import { MonthlyItem } from "@/types/monthly";

const mockData: MonthlyItem[] = [
  {
    id: "1",
    title:
      "약속1 약속1 약속1 약속1 약속1 약속1 약속1 약속1 약속1 약속1 약속1 약속1 약속1 약속1 약속1 약속1",
    date: "2025-03-04",
    content: "상세 내용",
  },
  {
    id: "2",
    title: "약속2 약속2 약속2 약속2",
    date: "2025-03-08",
    content: "상세 내용",
  },
  {
    id: "3",
    title: "약속3 약속3",
    date: "2025-03-10",
    // content: "상세 내용",
  },
];

function MonthlyList() {
  const theme = useTheme();
  const { openModal } = useModalStore();
  return (
    <div>
      <Header>
        <h1>Monthly Pinned</h1>
        <Button
          variant="ghost"
          size={20}
          onClick={() => openModal("createMonthlyModal", <div></div>)}
        >
          +
        </Button>
      </Header>
      {mockData.map((event: MonthlyItem) => (
        <Accordion
          key={event.id}
          type="monthly"
          color={theme.colors.white}
          header={<AccordionHeader type="monthly" item={event} />}
          style={{ marginBottom: "10px" }}
        >
          {event.content}
        </Accordion>
      ))}
    </div>
  );
}

export default MonthlyList;

const Header = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })};
    ${theme.typography.title({ size: 18 })};
    padding: 0 10px 10px;

    button {
      width: 20px;
      height: 20px;
    }
  `}
`;
