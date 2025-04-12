import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartType,
  ChartData,
  BarController,
  LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import styled, { css, useTheme } from "styled-components";

import { WeeklyStatProps } from "@/types/dashboard";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController,
  LineController,
);

const MixedChart = ({ weeklyStat }: { weeklyStat: WeeklyStatProps[] }) => {
  const theme = useTheme();

  const data: ChartData<ChartType, number[], string> = {
    labels: weeklyStat.map((d) => d.week),
    datasets: [
      {
        type: "line" as ChartType,
        label: "완료된 할 일",
        data: weeklyStat.map((d) => d.completed),
        borderColor: theme.colors.blue,
        backgroundColor: theme.colors.blue,
        fill: false,
      },
      {
        type: "line" as ChartType,
        label: "미완료된 할 일",
        data: weeklyStat.map((d) => d.incompleted),
        borderColor: theme.colors.darkOrange,
        backgroundColor: theme.colors.orangeRed,
        fill: false,
      },
      {
        type: "bar" as ChartType,
        label: "총 할 일",
        data: weeklyStat.map((d) => d.total),
        backgroundColor: theme.colors.primary,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 10,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Wrapper>
      <ChartContainer>
        <Chart type="bar" data={data} options={options} />
      </ChartContainer>
    </Wrapper>
  );
};

export default MixedChart;

const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    ${theme.mixins.flexBox({})};
    gap: 50px;
    ${theme.media.md`
      gap: 30px;
    `}
    ${theme.media.sm`
      gap: 20px;
    `}
  `}
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 300px;
`;
