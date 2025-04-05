"use client";

import { useEffect, useState } from "react";
import { getRankData, RankProps } from "@/lib/supabase/rank";
import { useUserQuery } from "@/hooks/query/useUserQuery";
import Layout from "@/components/common/layout/layout";
import UserInfo from "@/components/rank/UserInfo/UserInfo";
import RankHistoryList from "@/components/rank/RankHistory/RankHistoryList";
import TopRankList from "@/components/rank/TopRank/TopRankList";
import styled, { css } from "styled-components";

import { NAVBAR_HEIGHT } from "@/components/common/layout/Navbar";

function RankPage() {
  const { userId } = useUserQuery();
  const [rankData, setRankData] = useState<RankProps | null>(null);

  useEffect(() => {
    const fetchedData = async () => {
      if (!userId) return;
      const data = await getRankData(userId);
      setRankData(data);
    };

    fetchedData();
  }, [userId]);

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
