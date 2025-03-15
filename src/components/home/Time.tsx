import { useEffect, useState } from "react";
import useModalStore from "@/zustand/useModalStore";
import useCalendarStore from "@/zustand/useCalendarStore";
import useUser from "@/hooks/useUser";
import formatTime from "@/utils/formatTime";
import calcDday from "@/utils/calcDday";
import { getDDay } from "@/lib/supabase/dday";
import { getTodayTime } from "@/lib/supabase/todayTodo";
import GoalTimeModal from "./GoalTimeModal";
import StopWatch from "./StopWatch";
import styled, { css } from "styled-components";

import { DdayEvent } from "@/types/dday";

function Time() {
  const { user, userId } = useUser();
  const { selectedDate } = useCalendarStore();
  const { openModal } = useModalStore();

  const [dday, setDday] = useState<string>("");
  const [goalTime, setGoalTime] = useState<number>(0);
  const [actualTime, setActualTime] = useState<number>(0);

  useEffect(() => {
    const fetchTodayTime = async () => {
      if (!user) return;
      const { goal_time, actual_time } = await getTodayTime(
        userId!,
        selectedDate!,
      );
      const ddayData: DdayEvent = await getDDay(userId!);
      setGoalTime(goal_time!);
      setActualTime(actual_time!);
      setDday(
        `${ddayData.title} ${calcDday(new Date(ddayData.date), selectedDate!)}`,
      );
    };

    fetchTodayTime();
  }, [selectedDate, userId]);

  return (
    <TimesWrapper>
      <div className="d-day">{dday}</div>
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
        <StopWatch actualTime={actualTime} />
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
