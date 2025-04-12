import useCalendarStore from "@/zustand/useCalendarStore";
import useModalStore from "@/zustand/useModalStore";
import formatTime from "@/utils/formatTime";
import calcDday from "@/utils/calcDday";
import StopWatch from "./StopWatch";
import styled, { css } from "styled-components";

import { Times } from "@/types/time";
import { DdayEvent } from "@/types/dday";

interface TimeProps {
  dday: DdayEvent | null;
  todayTime: Times | null;
}

function Time({ dday, todayTime }: TimeProps) {
  const openModal = useModalStore((state) => state.openModal);
  const selectedDate = useCalendarStore((state) => state.selectedDate);

  const goal_time = todayTime?.goal_time ?? 0;
  const actual_time = todayTime?.actual_time ?? 0;

  const ddayStr = dday
    ? `${dday?.title} ${calcDday(new Date(dday!.date), selectedDate!)}`
    : "D-day";

  return (
    <TimesWrapper>
      <div className="d-day">{ddayStr}</div>
      <TimeContainer>
        <h3>목표 공부 시간</h3>
        <button className="time" onClick={() => openModal("goalTimeModal")}>
          {formatTime(goal_time, true)}
        </button>
      </TimeContainer>
      <TimeContainer>
        <h3>현재 공부 시간</h3>
        <StopWatch actualTime={actual_time} />
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
      ${theme.media.sm`
        display: none;
      `}
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
