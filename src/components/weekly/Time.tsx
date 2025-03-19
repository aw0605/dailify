import useModalStore from "@/zustand/useModalStore";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import GoalTimeModal from "./GoalTimeModal";
import { getActualTime, getGoalTime } from "@/lib/supabase/weekly";
import useCalendarStore from "@/zustand/useCalendarStore";
import useUser from "@/hooks/useUser";
import formatTime from "@/utils/formatTime";

function Time() {
  const [goalTime, setGoalTime] = useState(0);
  const [actualTime, setActualTime] = useState(0);

  const openModal = useModalStore((state) => state.openModal);
  const { user, userId } = useUser();
  const selectedWeek = useCalendarStore((state) => state.selectedWeek);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const goal = await getGoalTime(userId!, selectedWeek!.start);
      const actual = await getActualTime(userId!, selectedWeek!);
      setGoalTime(goal);
      setActualTime(actual);
    };

    fetchData();
  }, [userId, selectedWeek]);

  return (
    <TimesWrapper>
      <TimeContainer>
        <h3>이번주 목표 공부 시간</h3>
        <button
          className="time"
          onClick={() => openModal("goalTimeModal", <GoalTimeModal />)}
        >
          {formatTime(goalTime, true)}
        </button>
      </TimeContainer>
      <TimeContainer>
        <h3>이번주 현재 공부 시간</h3>
        <h2>{formatTime(actualTime)}</h2>
      </TimeContainer>
    </TimesWrapper>
  );
}

export default Time;

const TimesWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-around" })}
    margin: 20px 0 30px;
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
