import MixedChart from "./MixedChart";
import styled, { css } from "styled-components";

function WeeklyChart() {
  return (
    <TableWrapper>
      <Title>주간 통계</Title>
      <MixedChart />
    </TableWrapper>
  );
}

export default WeeklyChart;

const TableWrapper = styled.div`
  text-align: left;
`;

const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.typography.title({ size: 18 })}
    margin-bottom: 10px;
  `}
`;
