"use client";

import { lazy, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useShallow } from "zustand/shallow";
import useModalStore from "@/zustand/useModalStore";
import styled, { css } from "styled-components";

const modalComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  todoModal: lazy(() => import("@/components/home/Todo/TodoModal")),
  timerModal: lazy(() => import("@/components/home/Timer/TimerModal")),
  goalTimeModal: lazy(() => import("@/components/home/GoalTimeModal")),
  monthlyModal: lazy(() => import("@/components/home/Monthly/MonthlyModal")),
  ddayModal: lazy(() => import("@/components/my/Dday/DdayModal")),
  editInfoModal: lazy(() => import("@/components/my/UserInfo/EditInfoModal")),
  weeklyTodoModal: lazy(() => import("@/components/weekly/Todo/TodoModal")),
  weeklyGoalTimeModal: lazy(() => import("@/components/weekly/GoalTimeModal")),
  timerEndModal: lazy(() => import("@/components/home/Timer/TimerEndModal")),
};

export default function ModalContainer() {
  const [mounted, setMounted] = useState(false);
  const { modals, closeModal } = useModalStore(
    useShallow((state) => ({
      modals: state.modals,
      closeModal: state.closeModal,
    })),
  );

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modals]);

  return mounted
    ? createPortal(
        <>
          {modals.map(({ id, props }) => {
            const CurrentModal = modalComponents[id];
            if (!CurrentModal) return null;

            const { key, ...restProps } = props || {};

            return (
              <ModalOverlay key={id} onClick={() => closeModal(id)}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                  <CurrentModal {...restProps} />
                </ModalContent>
              </ModalOverlay>
            );
          })}
        </>,
        document.body,
      )
    : null;
}

const ModalOverlay = styled.div`
  ${({ theme }) => css`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    ${theme.mixins.flexBox({})}
  `}
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  max-width: 400px;
  min-width: 280px;
`;
