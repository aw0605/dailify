import { useQuery } from "@tanstack/react-query";
import { useUserQuery } from "./useUserQuery";
import { getRankData } from "@/lib/supabase/rank";

const useRankQuery = () => {
  const { userId } = useUserQuery();

  const uid = userId!;

  return useQuery({
    queryKey: ["dashboardData", uid],
    queryFn: () => getRankData(uid),
    enabled: !!uid,
  });
};

export default useRankQuery;
