import styled, { css } from "styled-components";
import formatTime from "@/utils/formatTime";
import { RankerInfo } from "@/types/rank";

interface RankerItemProps {
  idx: number;
  item: RankerInfo;
}

function RankerItem({ idx, item }: RankerItemProps) {
  return (
    <ItemWrapper>
      <div>
        <p>{idx + 1}위</p>
        <p>{item.nickname}</p>
      </div>

      <p>{formatTime(item.actual_time)}</p>
    </ItemWrapper>
  );
}

export default RankerItem;

const ItemWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })}
    ${theme.typography.title({ size: 16 })}
    > div {
      ${theme.mixins.flexBox({})}
      gap: 10px;
    }
    margin: 0 10px 16px;
  `}
`;
