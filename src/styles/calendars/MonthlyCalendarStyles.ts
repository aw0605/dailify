import styled, { css } from "styled-components";
import Calendar from "react-calendar";

export const StyledCalendar = styled(Calendar)<{ $isWeekly: boolean }>`
  width: 100%;
  background: none;
  border: none;
  line-height: normal;
  ${({ theme }) => theme.typography.p({ size: 12 })}
  margin-bottom: 20px;

  .react-calendar__navigation {
    background-color: transparent;
    margin-bottom: 5px;
    height: auto;
    min-height: 24px;
    position: relative;
  }

  .react-calendar__navigation button:disabled {
    opacity: 0;
  }

  .react-calendar__navigation__label {
    ${({ theme, $isWeekly }) => css`
      ${theme.typography.title({ size: $isWeekly ? 24 : 18 })}
      pointer-events: none;
      position: absolute;
      left: 5px;
    `}
  }

  .react-calendar__navigation__arrow {
    width: 22px;
    min-width: initial;
    height: 22px;
    ${({ theme }) => theme.typography.title({ size: 18 })}
    line-height: 1px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.blueGray};
    position: absolute;
  }

  .react-calendar__navigation__arrow:first-child {
    right: 32px;
  }
  .react-calendar__navigation__arrow:last-child {
    right: 5px;
  }

  .react-calendar__navigation__arrow:enabled:hover,
  .react-calendar__navigation__arrow:enabled:focus {
    background-color: ${({ theme }) => theme.colors.blueGray};
  }

  .react-calendar__viewContainer {
    ${({ theme, $isWeekly }) => css`
      border-radius: 10px;
      padding: 10px 5px;
      background-color: ${theme.colors.white};
      box-shadow: ${$isWeekly ? "none" : "5px 5px 10px rgba(0, 0, 0, 0.1)"};
    `}
  }

  .react-calendar__month-view__weekdays {
    color: ${({ theme }) => theme.colors.orangeRed};
  }

  .react-calendar__month-view__days__day--weekend {
    color: inherit;
  }

  .react-calendar__tile {
    color: ${({ theme }) => theme.colors.gray1};
    ${({ theme }) => theme.mixins.flexBox({})}
    height: 22px;
    abbr {
      position: relative;
      z-index: 1;
    }
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: inherit;
  }

  .react-calendar__tile--now {
    background: inherit;
  }

  .react-calendar__tile--now::before {
    ${({ theme, $isWeekly }) => css`
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${$isWeekly ? "none" : theme.colors.gray4};
    `}
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: none;
  }

  .react-calendar__tile:disabled {
    background-color: inherit;
    color: ${({ theme }) => theme.colors.gray3};
    pointer-events: none;
  }

  .react-calendar__tile--active {
    background: inherit;
  }

  .react-calendar__tile--active::before {
    ${({ theme, $isWeekly }) => css`
      content: "";
      position: absolute;
      width: ${$isWeekly ? "100%" : "20px"};
      height: ${$isWeekly ? "100%" : "20px"};
      border-radius: ${$isWeekly ? 0 : "50%"};
      background: ${theme.colors.primary};
    `}
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: none;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  .active-week {
    position: relative;
    background: ${({ theme }) => theme.colors.primary};
  }

  .active-week.start {
    border-radius: 10px 0 0 10px;
  }

  .active-week.end {
    border-radius: 0 10px 10px 0;
  }
`;
