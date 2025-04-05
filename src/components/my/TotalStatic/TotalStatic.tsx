import BarChart from "./BarChart";
import styled from "styled-components";

function TotalStatic() {
  return (
    <div>
      <Title>나의 달성률</Title>
      <BarChart />
    </div>
  );
}

export default TotalStatic;

const Title = styled.h1`
  ${({ theme }) => theme.typography.title({ size: 18 })}
`;
