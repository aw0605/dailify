import useModalStore from "@/zustand/useModalStore";
import formatTime from "@/utils/formatTime";
import styled, { css } from "styled-components";

import { Times } from "@/types/time";

interface TimeProps {
  weeklyTime: Times | null;
}

function Time({ weeklyTime }: TimeProps) {
  const openModal = useModalStore((state) => state.openModal);

  const goal_time = weeklyTime?.goal_time ?? 0;
  const actual_time = weeklyTime?.actual_time ?? 0;

  return (
    <TimesWrapper>
      <TimeContainer>
        <h3>이번주 목표 공부 시간</h3>
        <button
          className="time"
          onClick={() => openModal("weeklyGoalTimeModal")}
        >
          {formatTime(goal_time, true)}
        </button>
      </TimeContainer>
      <TimeContainer>
        <h3>이번주 현재 공부 시간</h3>
        <h2>{formatTime(actual_time)}</h2>
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
