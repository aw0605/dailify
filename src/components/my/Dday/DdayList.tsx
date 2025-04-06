import useModalStore from "@/zustand/useModalStore";
import Button from "@/components/common/ui/Button";
import DdayItem from "./DdayItem";
import DdayModal from "./DdayModal";
import styled, { css } from "styled-components";

import { DdayEvent } from "@/types/dday";

function DdayList({ events }: { events: DdayEvent[] }) {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <DdayListWrapper>
      <Header>
        <h1>D-day</h1>
        <Button
          variant="ghost"
          size={20}
          onClick={() => openModal("ddayModal", <DdayModal />)}
        >
          +
        </Button>
      </Header>

      <ul>
        {events.map((item) => (
          <DdayItem key={item.id} item={item} />
        ))}
      </ul>
    </DdayListWrapper>
  );
}

export default DdayList;

const DdayListWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  padding: 0 20px;
`;

const Header = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })};
    ${theme.typography.title({ size: 18 })};
    margin-bottom: 20px;

    button {
      width: 20px;
      height: 20px;
    }
  `}
`;
