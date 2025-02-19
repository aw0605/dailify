"use client";

import MainLayout from "@/components/common/layout/MainLayout";
import Button from "@/components/common/ui/Button";
import styled, { useTheme } from "styled-components";

export default function Home() {
  const theme = useTheme();
  return (
    <MainLayout hasSide isVertical>
      <div>
        <StyledButton color={theme.colors.darkOrange}>버튼 테스트</StyledButton>
      </div>
      <div>사이드 콘텐츠</div>
    </MainLayout>
  );
}

const StyledButton = styled(Button)`
  width: 200px;
  height: 40px;
`;
