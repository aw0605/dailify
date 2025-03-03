import { IoIosPause, IoIosPlay } from "react-icons/io";
import Button from "@/components/common/ui/Button";
import styled, { css, useTheme } from "styled-components";

function StopWatch() {
  const theme = useTheme();
  return (
    <StopWatchWrapper>
      <h2>00:00:00</h2>
      <Button variant="ghost" size={18} color={theme.colors.primary}>
        <IoIosPlay />
      </Button>
      <Button variant="ghost" size={18} color={theme.colors.primary}>
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
