import { useEffect } from "react";
import useStopWatch from "@/hooks/useStopWatch";
import formatTime from "@/utils/formatTime";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import Button from "@/components/common/ui/Button";
import styled, { css, useTheme } from "styled-components";

function StopWatch({ actualTime }: { actualTime: number }) {
  const { elapsedTime, setElapsedTime, startStopWatch, pauseStopWatch } =
    useStopWatch();

  const theme = useTheme();

  useEffect(() => {
    setElapsedTime(actualTime);
  }, [actualTime]);

  return (
    <StopWatchWrapper>
      <h2>{formatTime(elapsedTime)}</h2>
      <Button
        variant="ghost"
        size={18}
        color={theme.colors.primary}
        onClick={startStopWatch}
      >
        <IoIosPlay />
      </Button>
      <Button
        variant="ghost"
        size={18}
        color={theme.colors.primary}
        onClick={pauseStopWatch}
      >
        <IoIosPause />
      </Button>
    </StopWatchWrapper>
  );
}

export default StopWatch;

const StopWatchWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({})}
    gap: 10px;
    button {
      width: 20px;
      padding: 0;
    }
  `}
`;
