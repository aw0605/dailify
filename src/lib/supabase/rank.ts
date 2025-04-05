"use server";

import { RankerInfo, RankHistory } from "@/types/rank";
import { createClientForServer } from "./server";

export interface RankProps {
  top10: RankerInfo[];
  currentRank: number;
  prevRank?: number;
  rankHistory: RankHistory[];
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

  return { ...data, prevRank };
};

export { getRankData };
