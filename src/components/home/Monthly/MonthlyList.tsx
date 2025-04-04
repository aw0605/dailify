import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import { useShallow } from "zustand/shallow";
import useMonthlyStore from "@/zustand/useMonthlyStore";
import useModalStore from "@/zustand/useModalStore";
import Accordion from "@/components/common/ui/Accordion/Accordion";
import AccordionHeader from "@/components/common/ui/Accordion/AccordionHeader";
import Button from "@/components/common/ui/Button";
import MonthlyModal from "./MonthlyModal";
import styled, { css } from "styled-components";

import { MonthlyEvent } from "@/types/monthly";
import Skeleton from "@/components/common/ui/Skeleton";

function MonthlyList() {
  const { userId } = useUser();
  const openModal = useModalStore((state) => state.openModal);

  const { events, fetchMonthlyEvents, deleteEvent, loading } = useMonthlyStore(
    useShallow((state) => ({
      events: state.events,
      fetchMonthlyEvents: state.fetchMonthlyEvents,
      deleteEvent: state.deleteEvent,
      loading: state.loading,
    })),
  );

  useEffect(() => {
    if (userId) {
      fetchMonthlyEvents(userId);
    }
  }, [userId]);

  if (loading) {
    return <Skeleton height="45px" radius="10px" />;
  }

  return (
    <div>
      <Header>
        <h1>Monthly Pinned</h1>
        <Button
          variant="ghost"
          size={20}
          onClick={() => openModal("monthlyModal", <MonthlyModal />)}
        >
          +
        </Button>
      </Header>

      {events.length === 0 ? (
        <AlertMsg>이번 달 이벤트가 없습니다.</AlertMsg>
      ) : (
        events.map((event: MonthlyEvent) => (
          <Accordion
            key={event.id}
            type="monthly"
            header={
              <AccordionHeader
                type="monthly"
                item={event}
                onEdit={() =>
                  openModal("monthlyModal", <MonthlyModal editEvent={event} />)
                }
                onDelete={() => deleteEvent(event.id)}
              />
            }
            style={{ marginBottom: "10px" }}
          >
            {event.content}
          </Accordion>
        ))
      )}
    </div>
  );
}

export default MonthlyList;

const Header = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })};
    ${theme.typography.title({ size: 18 })};
    padding: 0 10px 10px;

    button {
      width: 20px;
      height: 20px;
    }
  `}
`;

const AlertMsg = styled.h1`
  ${({ theme }) => css`
    margin-top: 50px;
    ${theme.mixins.flexBox({})};
    ${theme.typography.title({ size: 18 })}
    ${theme.media.md`
      margin: 50px 0;
    `}
  `}
`;
