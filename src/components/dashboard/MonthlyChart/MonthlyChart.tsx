import { StatProps } from "@/types/dashboard";
import PieChart from "./PieChart";
import styled, { css } from "styled-components";

function MonthlyChart({ monthlyStat }: { monthlyStat: StatProps | null }) {
  return (
    <ChartWrapper>
      <Title>이번 달 통계</Title>
      <PieChart monthlyStat={monthlyStat} />
    </ChartWrapper>
  );
}

export default MonthlyChart;

const ChartWrapper = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.typography.title({ size: 24 })}
    margin-bottom: 20px;
  `}
`;
