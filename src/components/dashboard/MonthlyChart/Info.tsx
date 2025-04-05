import { ChartType, ChartData } from "chart.js";
import styled, { css } from "styled-components";

interface InfoProps {
  data: ChartData<ChartType, number[], string>;
  total: number;
  rate: number;
}

function Info({ data, total, rate }: InfoProps) {
  const backgroundColor = data.datasets[0].backgroundColor as string[];

  return (
    <InfoWrapper>
      <RateContainer>
        <h3>달성률</h3>
        <h2>{rate}%</h2>
      </RateContainer>
      <Total>총합 - {total}개</Total>
      <LegendContainer>
        {data.labels &&
          data.labels.map((label: string, idx: number) => (
            <LegendItem key={idx}>
              <Circle
                style={{
                  backgroundColor: backgroundColor[idx],
                }}
              />
              <span>
                {label} - {data.datasets[0].data[idx]}개
              </span>
            </LegendItem>
          ))}
      </LegendContainer>
    </InfoWrapper>
  );
}

export default Info;

const InfoWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })};
    gap: 20px;
  `}
`;

const RateContainer = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })};
    gap: 10px;
    h3 {
      ${theme.typography.title({ size: 16 })};
    }
    h2 {
      ${theme.typography.title({ size: 32, color: theme.colors.orange })};
    }
  `}
`;

const Total = styled.h2`
  ${({ theme }) => css`
    ${theme.typography.title({ size: 16 })}
  `}
`;

const LegendContainer = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column", align: "flex-start" })}
    gap: 8px;
  `}
`;

const LegendItem = styled.div`
  ${({ theme }) => css`
    ${theme.typography.p({ size: 14, color: theme.colors.gray2 })}
    ${theme.mixins.flexBox({})}
    gap: 8px;
  `}
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;
