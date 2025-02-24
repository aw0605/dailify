"use client";

import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/common/layout/layout";
import Button from "@/components/common/ui/Button";
import styled, { css } from "styled-components";

function notFound() {
  return (
    <Layout showNav={false} hasSide={false}>
      <Container className="main">
        <div>
          <Image src="/Dailify.svg" alt="Dailify" width={180} height={180} />
        </div>
        <div>
          <h1>Page Not Found</h1>
          <p>페이지를 찾을 수 없습니다.</p>
        </div>
        <Link href="/">
          <StyledButton size={20}>홈으로</StyledButton>
        </Link>
      </Container>
    </Layout>
  );
}

export default notFound;

const Container = styled.div`
  ${({ theme }) => css`
    height: 100vh;
    ${theme.mixins.flexBox({ direction: "column" })}
    > div:first-child {
      width: 180px;
      height: 180px;
    }
    > div:nth-child(2) {
      ${({ theme }) => css`
        margin: 20px 0 40px;
        ${theme.mixins.flexBox({ direction: "column" })}
        gap: 15px;
        h1 {
          ${theme.typography.title({ size: 36, color: theme.colors.orange })}
        }
        p {
          ${theme.typography.p({ size: 18, color: theme.colors.gray2 })}
        }
      `}
    }
  `}
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 50px;
`;
