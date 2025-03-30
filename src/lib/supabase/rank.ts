"use server";

import { createClientForServer } from "./server";

export interface RankProps {
  top10: [];
  currentRank: number;
  prevRank?: number;
  rankHistory: [];
}

const getRankData = async (uid: string): Promise<RankProps> => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase.rpc("get_rank_data", {
    uid,
  });

  if (error || !data) {
    console.error("랭크 데이터 불러오는 중 에러 발생!:", error);
    return {
      top10: [],
      currentRank: 0,
      rankHistory: [],
      prevRank: undefined,
    };
  }

  const prevRank =
    data.rankHistory.length > 0 ? data.rankHistory[0].rank : undefined;

  console.log("랭크 데이터!!:", { ...data, prevRank });

  return { ...data, prevRank };
};

export { getRankData };
