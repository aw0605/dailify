import useModalStore from "@/zustand/useModalStore";
import GoalTimeModal from "./GoalTimeModal";
import StopWatch from "./StopWatch";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import useCalendarStore from "@/zustand/useCalendarStore";
import { getTodayTime } from "@/lib/supabase/todayTodo";
import formatTime from "@/utils/formatTime";

function Time() {
  const { openModal } = useModalStore();
  const [goalTime, setGoalTime] = useState<number>(0);
  const { user, userId } = useUser();
  const { selectedDate } = useCalendarStore();

  useEffect(() => {
    const fetchGolaTime = async () => {
      if (!user) return;
      const time = await getTodayTime(userId!, selectedDate!);
      setGoalTime(time!);
    };

    fetchGolaTime();
  }, [selectedDate, userId]);

  return (
    <TimesWrapper>
      <div className="d-day">수능 D-300</div>
      <TimeContainer>
        <h3>목표 공부 시간</h3>
        <button
          className="time"
          onClick={() => openModal("goalTimeModal", <GoalTimeModal />)}
        >
          {formatTime(goalTime, true)}
        </button>
      </TimeContainer>
      <TimeContainer>
        <h3>현재 공부 시간</h3>
        <StopWatch />
      </TimeContainer>
    </TimesWrapper>
  );
}

export default Time;

const TimesWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-around" })}
    margin: 10px 0 20px;
    div.d-day {
      ${theme.typography.title({ size: 22 })}
    }
  `}
`;

const TimeContainer = styled.div`
  ${({ theme }) => css`
    text-align: center;
    h3 {
      ${theme.typography.title({ size: 16, color: theme.colors.darkOrange })}
      margin-bottom: 8px;
    }
    h2,
    button.time {
      ${theme.typography.title({ size: 22, color: theme.colors.gray2 })}
    }
    button.time {
      background-color: transparent;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  `}
`;
