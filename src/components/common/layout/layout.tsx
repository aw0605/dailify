"use client";

import styled, { css } from "styled-components";
import Navbar, { NAVBAR_HEIGHT } from "./Navbar";
import { usePathname } from "next/navigation";
import ModalContainer from "../ui/Modal/Modal";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <Container $isAuthPage={isAuthPage}>
      <ModalContainer />
      {!isAuthPage && <Navbar />}
      <Main $isAuthPage={isAuthPage}>{children}</Main>
    </Container>
  );
}

const Container = styled.div<{ $isAuthPage: boolean }>`
  width: 100%;
  height: 100%;
`;

const Main = styled.div<{ $isAuthPage: boolean }>`
  ${({ theme, $isAuthPage }) => css`
    padding-top: ${$isAuthPage ? 0 : NAVBAR_HEIGHT};
    min-height: 100vh;
    ${$isAuthPage ? theme.mixins.flexBox({}) : ""}
  `}
`;
