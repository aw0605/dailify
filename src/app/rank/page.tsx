"use client";

import useRankQuery from "@/hooks/query/useRankQuery";
import Layout from "@/components/common/layout/layout";
import UserInfo from "@/components/rank/UserInfo/UserInfo";
import RankHistoryList from "@/components/rank/RankHistory/RankHistoryList";
import TopRankList from "@/components/rank/TopRank/TopRankList";
import Loading from "@/components/common/ui/Loading";
import styled, { css } from "styled-components";

import { NAVBAR_HEIGHT } from "@/components/common/layout/Navbar";

function RankPage() {
  const { data: rankData, isLoading } = useRankQuery();

  if (isLoading) {
    return <Loading size="50px" />;
  }

  return (
    <Layout showSide={true}>
      <MainWrapper className="main">
        <UserInfo
          currentRank={rankData?.currentRank}
          prevRank={rankData?.prevRank}
        />
        <RankHistoryList rankHistory={rankData?.rankHistory ?? []} />
      </MainWrapper>
      <div className="side">
        <TopRankList top10={rankData?.top10 ?? []} />
      </div>
    </Layout>
  );
}

export default RankPage;

const MainWrapper = styled.div`
  ${({ theme }) => css`
    height: calc(100vh - ${NAVBAR_HEIGHT});
    ${theme.mixins.flexBox({ direction: "column" })};
  `}
`;
