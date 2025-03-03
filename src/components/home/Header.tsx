import useCalendarStore from "@/zustand/useCalendarStore";
import useModalStore from "@/zustand/useModalStore";
import { formatDate } from "@/utils/formatDate";
import { IoAlarmOutline } from "react-icons/io5";
import Button from "@/components/common/ui/Button";
import styled, { css } from "styled-components";

function Header() {
  const { selectedDate: cur, prevDay, nextDay } = useCalendarStore();
  const { formattedDate, weekday } = formatDate(cur);

  const { openModal } = useModalStore();

  const isToday = cur
    ? cur.toDateString() === new Date().toDateString()
    : false;

  return (
    <HeaderWrapper>
      <DateContainer>
        <h1>{formattedDate}</h1>
        <DayRow>
          <h1>{weekday}</h1>
          <Buttons>
            <button onClick={prevDay}>‹</button>
            {!isToday && <button onClick={nextDay}>›</button>}
          </Buttons>
        </DayRow>
      </DateContainer>
      <ButtonContainer>
        <StyledButton
          variant="outline"
          size={22}
          onClick={() => openModal("timerModal", <div></div>)}
        >
          <IoAlarmOutline />
        </StyledButton>
        <StyledButton
          size={22}
          onClick={() => openModal("createTodoModal", <div></div>)}
        >
          +
        </StyledButton>
      </ButtonContainer>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })}
    padding: 0 10px;
    position: relative;
  `}
`;

const DateContainer = styled.div`
  ${({ theme }) => css`
    h1 {
      ${theme.typography.title({ size: 34 })}
    }
  `}
`;

const DayRow = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })}
    margin-top: 10px;
    h1 {
      ${theme.typography.title({ size: 28, color: theme.colors.gray3 })}
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
      border-radius: 20px;
      ${theme.mixins.flexBox({})}
      background-color: ${theme.colors.blueGray};
      ${theme.typography.title({ size: 18 })}
    }
  `}
`;

const ButtonContainer = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({})}
    gap: 10px;
    position: absolute;
    top: 0;
    right: 10px;
  `}
`;

const StyledButton = styled(Button)`
  width: 35px;
  height: 35px;
  padding: 0;
  border-radius: 100%;
`;
