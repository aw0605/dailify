"use client";

import styled, { css } from "styled-components";
import Navbar, { NAVBAR_HEIGHT } from "./Navbar";

interface LayoutsProps {
  children: React.ReactNode;
  showNav?: boolean;
  hasSide?: boolean;
  showSide?: boolean;
  sideBgColor?: string;
}

export default function Layout({
  children,
  showNav = true,
  hasSide = true,
  showSide = false,
  sideBgColor,
}: LayoutsProps) {
  return (
    <Container>
      {showNav && <Navbar />}
      <Main
        $showNav={showNav}
        $hasSide={hasSide}
        $showSide={showSide}
        $sideBgColor={sideBgColor}
      >
        {children}
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Main = styled.div<{
  $showNav: boolean;
  $hasSide: boolean;
  $showSide: boolean;
  $sideBgColor?: string;
}>`
  ${({ theme, $showNav, $hasSide, $showSide, $sideBgColor }) => css`
    padding-top: ${$showNav ? NAVBAR_HEIGHT : 0};
    min-height: 100vh;
    ${theme.mixins.flexBox({ align: "stretch" })}
    > div.main {
      flex: 2;
      padding: 20px;
    }
    ${$hasSide &&
    `
    > div.side {
      flex: 1;
      min-width: 320px;
      max-width: 400px;
      background: ${$sideBgColor || theme.colors.cultured};
      padding: 20px;
    }
    `}
    ${theme.media.md`
      ${
        $hasSide && $showSide
          ? `
        flex-direction: column;
        align-items: center;
        > div.main {
          width: 100%;
        }
        > div.side {
          width: calc(100% - 40px);
          max-width: initial;
          border-radius: 20px;
          margin-bottom: 20px;
        }
      `
          : `
        > div.side {
          display: none;
        }
      `
      }
    `}
  `}
`;
