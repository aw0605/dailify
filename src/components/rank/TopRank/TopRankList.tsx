import { HiTrophy } from "react-icons/hi2";
import styled, { css } from "styled-components";

import { RankerInfo } from "@/types/rank";
import RankerItem from "./RankerItem";

function TopRankList({ top10 }: { top10: RankerInfo[] }) {
  return (
    <ListWrapper>
      <HiTrophy />
      <h1>Ranking</h1>
      <div>
        {top10.map((item, idx) => (
          <RankerItem key={idx} idx={idx} item={item} />
        ))}
      </div>
    </ListWrapper>
  );
}

export default TopRankList;

const ListWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })}
    svg {
      font-size: ${theme.pxToRem(100)};
      color: ${theme.colors.orange};
    }
    h1 {
      ${theme.typography.title({ size: 24 })}
      margin: 10px 0 30px;
    }
    > div {
      width: 100%;
    }
  `}
`;
