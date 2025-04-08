import { useMemo } from "react";
import useMyQuery from "@/hooks/query/useMyQuery";
import { formatDate } from "@/utils/formatDate";
import calcDday from "@/utils/calcDday";
import { HiOutlineTrash } from "react-icons/hi";
import Button from "@/components/common/ui/Button";
import styled, { css, useTheme } from "styled-components";

import { DdayEvent } from "@/types/dday";

interface DdayItemProps {
  item: DdayEvent;
}

function DdayItem({ item }: DdayItemProps) {
  const theme = useTheme();

  const { formattedDate } = useMemo(
    () => formatDate(new Date(item.date)),
    [item.date],
  );

  const { deleteEvent } = useMyQuery();

  return (
    <ItemWrapper>
      <span className="title">{item.title}</span>
      <span className="date">{formattedDate}</span>
      <span className="dday">{calcDday(new Date(item!.date), new Date())}</span>
      <Button
        onClick={() => deleteEvent.mutate(item.id)}
        variant="ghost"
        color={theme.colors.gray2}
        style={{ padding: "0" }}
      >
        <HiOutlineTrash />
      </Button>
    </ItemWrapper>
  );
}

export default DdayItem;

const ItemWrapper = styled.li`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })}
    margin: 0 0 10px 0;

    span {
      flex: 1;
      text-align: center;
    }
    span.title {
      text-align: left;
    }
    span.dday {
      text-align: center;
    }
    button {
      width: 30px;
    }
    ${theme.media.sm`
      span.date {
        display: none;
      }
    `}
  `}
`;
