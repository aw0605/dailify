import { useShallow } from "zustand/shallow";
import useCalendarStore from "@/zustand/useCalendarStore";
import { formatMonth } from "@/utils/formatDate";
import styled, { css } from "styled-components";

function Header() {
  const {
    selectedMonth: cur,
    prevMonth,
    nextMonth,
  } = useCalendarStore(
    useShallow((state) => ({
      selectedMonth: state.selectedMonth,
      prevMonth: state.prevMonth,
      nextMonth: state.nextMonth,
    })),
  );

  const isCurMonth =
    cur!.getMonth() === new Date().getMonth() &&
    cur!.getFullYear() === new Date().getFullYear();

  return (
    <DateContainer>
      <h1>{formatMonth(cur)}</h1>
      <Buttons>
        <button onClick={prevMonth}>‹</button>
        {!isCurMonth && <button onClick={nextMonth}>›</button>}
      </Buttons>
    </DateContainer>
  );
}

export default Header;

const DateContainer = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "flex-start" })}
    padding: 0 10px;
    h1 {
      ${theme.typography.title({ size: 34 })}
      margin-right: 20px;
    }
  `}
`;

const Buttons = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({})}
    gap: 10px;
    button {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      ${theme.mixins.flexBox({})}
      background-color: ${theme.colors.blueGray};
      ${theme.typography.title({ size: 18 })}
    }
  `}
`;
