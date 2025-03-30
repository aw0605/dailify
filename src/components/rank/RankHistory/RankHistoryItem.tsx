import styled, { css } from "styled-components";

import { RankHistory } from "@/types/rank";

interface RankHistoryItemProps {
  item: RankHistory;
}

function RankHistoryItem({ item }: RankHistoryItemProps) {
  return (
    <ItemWrapper>
      <p>{item.week}</p>
      <p>{item.rank}위</p>
    </ItemWrapper>
  );
}

export default RankHistoryItem;

const ItemWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })}
    ${theme.typography.p({ color: theme.colors.gray2 })}
    margin: 0 10px 12px;
  `}
`;
