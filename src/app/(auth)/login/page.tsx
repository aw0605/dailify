"use client";

import Layout from "@/components/common/layout/layout";
import Form from "@/components/login/Form";
import Social from "@/components/signup/Social";
import styled, { css } from "styled-components";

function SignUpPage() {
  return (
    <Layout showNav={false} hasSide={false}>
      <Wrapper>
        <h1>로그인</h1>
        <Form />
        <Social />
      </Wrapper>
    </Layout>
  );
}

export default SignUpPage;

const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 50%;
    max-width: 400px;
    min-width: 300px;
    ${theme.mixins.flexBox({ direction: "column" })}
    gap: 20px;
    h1 {
      ${theme.typography.title({ size: 28, color: theme.colors.primary })}
    }
  `}
`;
