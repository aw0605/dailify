"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useModalStore from "@/zustand/useModalStore";
import styled, { css } from "styled-components";

export default function ModalContainer() {
  const [mounted, setMounted] = useState(false);
  const { modals, closeModal } = useModalStore();

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
          {modals.map(({ id, content }) => (
            <ModalOverlay key={id} onClick={() => closeModal(id)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                {content}
              </ModalContent>
            </ModalOverlay>
          ))}
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
`;
