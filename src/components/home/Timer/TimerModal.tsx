import useForm from "@/hooks/useForm";
import useTimer from "@/hooks/useTimer";
import { validateTime } from "@/utils/validate";
import formatTime from "@/utils/formatTime";
import { convertToMs } from "@/utils/convertToMs";
import TimerInputs from "./TimerInputs";
import TimerButtons from "./TimerButtons";
import styled, { css } from "styled-components";

const TimerModal = () => {
  const {
    formValues: time,
    setFormValues,
    handleChange,
    isAble,
    errors,
  } = useForm({
    initialValues: { h: 0, m: 0, s: 0 },
    validate: validateTime,
    onSubmit: () => {},
  });

  const { timeLeft, isRunning, startTimer, pauseTimer, resumeTimer } = useTimer(
    { onTimerEnd: () => setFormValues({ h: 0, m: 0, s: 0 }) },
  );

  const totalMs = convertToMs(time);

  return (
    <TimerWrapper>
      <Title>타이머</Title>

      <h1>{timeLeft <= 0 ? "시간을 입력하세요" : formatTime(timeLeft)}</h1>

      <TimerInputs
        time={time}
        onChange={handleChange}
        disabled={isRunning || timeLeft > 0}
      />

      {errors.time && <ErrorMsg>{errors.time}</ErrorMsg>}

      <TimerButtons
        onStartPause={() =>
          isRunning
            ? pauseTimer()
            : timeLeft > 0
              ? resumeTimer()
              : startTimer(totalMs)
        }
        isRunning={isRunning}
        isDisabled={!isAble}
      />
    </TimerWrapper>
  );
};

export default TimerModal;

const TimerWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })}
    h1 {
      ${theme.typography.title({ size: 20, color: theme.colors.gray3 })}
      margin: 30px 0;
    }
  `}
`;

const Title = styled.div`
  ${({ theme }) => css`
    ${theme.typography.title({ size: 24, color: theme.colors.orange })}
  `}
`;

const ErrorMsg = styled.p`
  ${({ theme }) => css`
    ${theme.typography.p({ size: 12, color: theme.colors.orangeRed })}
    margin-bottom: 10px;
  `}
`;
