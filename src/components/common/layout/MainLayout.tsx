"use client";

import styled, { css } from "styled-components";
import { NAVBAR_HEIGHT } from "./Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  hasSide?: boolean;
  isVertical?: boolean;
}

export default function MainLayout({
  children,
  hasSide,
  isVertical,
}: MainLayoutProps) {
  return (
    <Container $hasSide={hasSide} $isVertical={isVertical}>
      {children}
    </Container>
  );
}

const Container = styled.div<{ $hasSide?: boolean; $isVertical?: boolean }>`
  ${({ theme, $hasSide, $isVertical }) => css`
    width: 100%;
    min-height: calc(100vh - ${NAVBAR_HEIGHT});
    ${theme.mixins.flexBox({ align: "stretch" })};

    > div:first-child {
      flex: 2;
      padding: 20px;
    }
    > div:last-child {
      flex: 1;
      min-width: 200px;
      max-width: 350px;
      background: ${theme.colors.blueGray};
      padding: 20px;
    }

    ${theme.media.md`
      ${
        $hasSide && $isVertical
          ? `
          flex-direction: column;
          align-items: center;
          div:last-child {
            width: calc(100% - 40px);
            min-width: initial;
            max-width: initial;
            border-radius: 20px;
            margin-bottom: 20px;
          }
      `
          : `
          div:last-child {
            display: none;
          }
      `
      }
    `}
  `}
`;
