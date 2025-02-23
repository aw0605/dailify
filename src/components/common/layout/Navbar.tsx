"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdHomeFilled } from "react-icons/md";
import { LiaCalendarWeekSolid, LiaChartBar } from "react-icons/lia";
import { IoMdTrophy } from "react-icons/io";
import styled, { css } from "styled-components";

export const NAVBAR_HEIGHT = "50px";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Container $isOpen={isMobileMenuOpen}>
      <Menu $isOpen={isMobileMenuOpen}>
        <MenuItem href="/" $active={pathname === "/"}>
          <MdHomeFilled />
          <p>Home</p>
        </MenuItem>
        <MenuItem href="/weekly" $active={pathname === "/weekly"}>
          <LiaCalendarWeekSolid />
          <p>Weekly</p>
        </MenuItem>
        <MenuItem href="/dashboard" $active={pathname === "/dashboard"}>
          <LiaChartBar />
          <p>Dashboard</p>
        </MenuItem>
        <MenuItem href="/rank" $active={pathname === "/rank"}>
          <IoMdTrophy />
          <p>Rank</p>
        </MenuItem>
      </Menu>

      <Top>
        <Hamburger onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
          <Line $isOpen={isMobileMenuOpen} index={1} />
          <Line $isOpen={isMobileMenuOpen} index={2} />
          <Line $isOpen={isMobileMenuOpen} index={3} />
        </Hamburger>
        <User href="/my">
          <div>
            <Image
              src="https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png"
              alt="user"
              fill
            />
          </div>
          <div>
            <p>Ganada</p>
            <p>현재 148373위</p>
          </div>
        </User>
      </Top>
    </Container>
  );
}

const Container = styled.nav<{ $isOpen: boolean }>`
  ${({ theme, $isOpen }) => css`
    width: 100%;
    height: ${NAVBAR_HEIGHT};
    padding: 0 20px;
    ${theme.mixins.flexBox({ justify: "space-between" })};
    background-color: ${theme.colors.primary};

    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    ${theme.media.md`
      height: ${$isOpen ? "100%" : NAVBAR_HEIGHT};
      border: none;
      padding: 0;
      ${theme.mixins.flexBox({ direction: "column-reverse", justify: "flex-start" })};
    `}
  `}
`;

const Menu = styled.div<{ $isOpen: boolean }>`
  ${({ theme, $isOpen }) => css`
    width: 80%;
    ${theme.mixins.flexBox({ justify: "space-between" })};

    ${theme.media.md`
      width: 100%;
      height: calc(100% - ${NAVBAR_HEIGHT});
      background: ${theme.colors.cultured};
      ${theme.mixins.flexBox({ direction: "column" })};
      display: ${$isOpen ? "flex" : "none"};
      gap: 30px;
    `}
  `}
`;

const MenuItem = styled(Link)<{ $active?: boolean }>`
  ${({ theme, $active }) => css`
    width: 25%;
    ${theme.typography.title({ size: 18 })};
    color: ${$active ? theme.colors.darkOrange : theme.colors.gray1};
    ${theme.mixins.flexBox({})};
    gap: 10px;
    transition: 0.3s ease-in-out;

    &:hover {
      color: ${theme.colors.darkOrange};
    }

    ${theme.media.md`
      width: 50%;
      ${theme.mixins.flexBox({})};
      ${theme.typography.title({ size: 24 })};
      color: ${$active ? theme.colors.orange : theme.colors.gray1};
    `}
  `}
`;

const Top = styled.div`
  ${({ theme }) => css`
    ${theme.media.md`
      width: 100%;
      height: ${NAVBAR_HEIGHT};
      ${theme.mixins.flexBox({ justify: "space-between" })};
      padding: 0 20px;
      background-color: ${theme.colors.primary};
    `}
  `}
`;

const Hamburger = styled.button`
  ${({ theme }) => css`
    display: none;
    background-color: transparent;
    border: none;
    cursor: pointer;

    ${theme.media.md`
      ${theme.mixins.flexBox({ direction: "column" })};
      gap: 5px;
    `}

    span {
      width: 25px;
      height: 2px;
      background: ${theme.colors.gray1};
      transition: 0.3s ease-in-out;
    }
  `}
`;

const Line = styled.span<{ $isOpen: boolean; index: number }>`
  ${({ $isOpen, index }) => css`
    ${$isOpen &&
    (index === 1
      ? css`
          transform: translateY(7px) rotate(45deg);
        `
      : index === 2
        ? css`
            opacity: 0;
          `
        : css`
            transform: translateY(-7px) rotate(-45deg);
          `)}
  `}
`;

const User = styled(Link)`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({})};
    gap: 10px;

    div:first-child {
      width: 30px;
      height: 30px;
      position: relative;
    }

    p:first-child {
      ${theme.typography.title({ size: 20 })};
      margin-bottom: 2px;
    }
    p:last-child {
      ${theme.typography.p({ size: 14, color: theme.colors.orangeRed })};
    }

    ${theme.media.sm`
      p {display: none};
    `}
  `}
`;
