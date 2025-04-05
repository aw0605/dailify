import { calcRankChange } from "@/utils/calcRankChange";
import { FaArrowRightLong } from "react-icons/fa6";
import styled, { css } from "styled-components";

export interface UserRankProps {
  currentRank?: number;
  prevRank?: number;
}

function UserRank({ currentRank, prevRank }: UserRankProps) {
  const { msg, status } = calcRankChange(prevRank, currentRank);

  return (
    <>
      {msg && <RankChange $status={status}>{msg}</RankChange>}

      <RankContainer>
        <div>
          <h3>저번주 순위</h3>
          <h2>{prevRank ? `${prevRank}위` : "순위 없음"}</h2>
        </div>

        <FaArrowRightLong />

        <div className="current">
          <h3>현재 순위</h3>
          <h2>{currentRank}위</h2>
        </div>
      </RankContainer>
    </>
  );
}

export default UserRank;

const RankChange = styled.h2<{ $status: string }>`
  ${({ theme, $status }) => css`
    ${theme.typography.title({
      size: 18,
      color:
        $status === "up"
          ? theme.colors.orangeRed
          : $status === "down"
            ? theme.colors.blue
            : theme.colors.gray3,
    })}
  `}
`;

const RankContainer = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({})}
    gap: 20px;
    margin-top: 16px;

    > div {
      text-align: center;
      ${theme.typography.title({ size: 18, color: theme.colors.gray3 })}
      h3 {
        font-size: ${theme.pxToRem(14)};
        margin-bottom: 10px;
      }
    }

    > div.current {
      color: ${theme.colors.orange};
    }

    svg {
      font-size: 24px;
      color: ${theme.colors.gray3};
    }
  `}
`;
