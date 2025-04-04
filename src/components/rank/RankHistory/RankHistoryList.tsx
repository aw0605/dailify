import RankHistoryItem from "./RankHistoryItem";
import styled, { css } from "styled-components";

import { RankHistory } from "@/types/rank";

function RankHistoryList({ rankHistory }: { rankHistory: RankHistory[] }) {
  return (
    <ListWrapper>
      <h2>이전 순위</h2>
      <div>
        {rankHistory.length > 0 ? (
          rankHistory.map((item) => (
            <RankHistoryItem key={item.id} item={item} />
          ))
        ) : (
          <AlertMsg>이전 순위가 없습니다.</AlertMsg>
        )}
      </div>
    </ListWrapper>
  );
}

export default RankHistoryList;

const ListWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    h2 {
      ${theme.typography.title({ size: 18 })}
      margin: 30px 0 20px 10px;
    }
  `}
`;

const AlertMsg = styled.h1`
  ${({ theme }) => css`
    margin: 20px 0;
    ${theme.mixins.flexBox({})};
    ${theme.typography.title({ size: 24 })}
    ${theme.media.md`
      margin: 50px 0;
    `}
  `}
`;
