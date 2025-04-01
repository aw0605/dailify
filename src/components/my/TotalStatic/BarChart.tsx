import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useMyStore from "@/zustand/useMyStore";
import styled, { css, useTheme } from "styled-components";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  ChartDataLabels,
);

const BarChart = () => {
  const theme = useTheme();

  const totalStat = useMyStore((state) => state.totalStat);

  const data: ChartData<"bar", number[], string> = {
    labels: ["완료", "미완료"],
    datasets: [
      {
        data: [totalStat.completed, totalStat.incompleted],
        backgroundColor: [theme.colors.primary, theme.colors.darkOrange],
        hoverBackgroundColor: [theme.colors.orange, theme.colors.orangeRed],
      },
    ],
  };

  const options = {
    indexAxis: "x" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end" as const,
        align: "end" as const,
        formatter: (value: number) => value,
        font: {
          weight: "bold" as const,
          size: 16,
        },
        clip: true,
        clamp: true as const,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 10,
        },
        max: totalStat.total,
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Wrapper>
      <InfoContainer>
        <h1>종합 달성률</h1>
        <h2>{totalStat.rate}%</h2>
      </InfoContainer>
      <ChartContainer>
        <Bar data={data} options={options} />
      </ChartContainer>
    </Wrapper>
  );
};

export default BarChart;

const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    ${theme.mixins.flexBox({ direction: "column" })};
  `}
`;

const InfoContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    text-align: center;
    margin: 40px 0 30px;
    h1 {
      ${theme.typography.title({ size: 16, color: theme.colors.gray2 })}
      margin-bottom: 10px;
    }
    h2 {
      ${theme.typography.title({ size: 24, color: theme.colors.orange })}
    }
  `}
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;
