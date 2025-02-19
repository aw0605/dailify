"use client";

import MainLayout from "@/components/common/layout/MainLayout";
import Button from "@/components/common/ui/Button";
import Input from "@/components/common/ui/Input";
import styled, { useTheme } from "styled-components";

export default function Home() {
  const theme = useTheme();
  return (
    <MainLayout hasSide isVertical>
      <div>
        <StyledButton type="submit" color={theme.colors.darkOrange}>
          버튼 테스트
        </StyledButton>
        <StyledInput
          type="text"
          placeholder="입력하세요."
          focusBorderColor={theme.colors.orangeRed}
        />
      </div>
      <div>사이드 콘텐츠</div>
    </MainLayout>
  );
}

const StyledButton = styled(Button)`
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  width: 200px;
  height: 40px;
`;
