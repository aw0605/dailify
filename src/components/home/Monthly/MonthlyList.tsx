import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import useModalStore from "@/zustand/useModalStore";
import { deleteMonthlyEvent, getMonthlyEvents } from "@/lib/supabase/monthly";
import Accordion from "@/components/common/ui/Accordion/Accordion";
import AccordionHeader from "@/components/common/ui/Accordion/AccordionHeader";
import Button from "@/components/common/ui/Button";
import MonthlyModal from "./MonthlyModal";
import styled, { css } from "styled-components";

import { MonthlyEvent } from "@/types/monthly";

function MonthlyList() {
  const { user, userId } = useUser();
  const { openModal } = useModalStore();

  const [events, setEvnets] = useState<MonthlyEvent[]>([]);

  const fetchEvents = async () => {
    if (!user) return;
    const fetchedEvents = await getMonthlyEvents(userId!);
    if (fetchedEvents) {
      setEvnets(fetchedEvents);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMonthlyEvent(id);
      fetchEvents();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    console.log("이벤트:", events);
  }, [userId]);

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
                onDelete={() => handleDelete(event.id)}
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
  `}
`;
