"use client";

import styled, { css } from "styled-components";

const ResponsiveBox = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100vh;
    padding: ${theme.pxToRem(16)};
    text-align: center;
    ${theme.typography.title({
      size: 24,
      color: theme.colors.white,
    })};
    ${theme.mixins.flexBox({ justify: "center" })};

    background-color: ${theme.colors.orange};
    ${theme.media.md`
          color: ${theme.colors.gray1};
          background-color: ${theme.colors.blue};
          
    `}
    ${theme.media.sm`
          background-color: ${theme.colors.primary};
          
    `}
  `}
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.orangeRed};
  ${({ theme }) => theme.media.md`
    color: ${theme.colors.blueGray}
  `}
`;

export default function Home() {
  return (
    <ResponsiveBox>
      메인 페이지<Text>테스트</Text>
    </ResponsiveBox>
  );
}
