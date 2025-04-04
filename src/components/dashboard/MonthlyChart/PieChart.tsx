import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useDashboardStore from "@/zustand/useDashboardStore";
import Info from "./Info";
import styled, { css, useTheme } from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const theme = useTheme();
  const monthlyStat = useDashboardStore((state) => state.monthlyStat);

  const data = {
    labels: ["완료", "미완료"],
    datasets: [
      {
        data: [monthlyStat.completed, monthlyStat.incompleted],
        backgroundColor: [theme.colors.primary, theme.colors.darkOrange],
        hoverBackgroundColor: [theme.colors.orange, theme.colors.orangeRed],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      {monthlyStat.total === 0 ? (
        <AlertMsg>등록된 할 일이 없습니다.</AlertMsg>
      ) : (
        <Wrapper>
          <ChartContainer>
            <Pie data={data} options={options} />
          </ChartContainer>
          <Info data={data} total={monthlyStat.total} rate={monthlyStat.rate} />
        </Wrapper>
      )}
    </>
  );
};

export default PieChart;

const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    ${theme.mixins.flexBox({})};
    gap: 100px;
    ${theme.media.md`
  gap: 50px;
  `}
    ${theme.media.sm`
  gap: 20px;
  `}
  `}
`;

const ChartContainer = styled.div`
  ${({ theme }) => css`
    width: 250px;
    height: 250px;
    ${theme.media.md`
  width: 200px;
  height: 200px;
  `}
    ${theme.media.sm`
  width: 150px;
  height: 150px;
  `}
  `}
`;

const AlertMsg = styled.h1`
  ${({ theme }) => css`
    margin: 50px 0;
    ${theme.mixins.flexBox({})};
    ${theme.typography.title({ size: 18 })}
    ${theme.media.md`
      margin: 100px 0;
    `}
  `}
`;
