import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserQuery } from "./useUserQuery";
import useCalendarStore from "@/zustand/useCalendarStore";
import { getDashboardData } from "@/lib/supabase/dashboard";

const useDashboardQuery = () => {
  const { userId } = useUserQuery();
  const selectedMonth = useCalendarStore((state) => state.selectedMonth);

  const uid = userId!;
  const date = useMemo(
    () => new Date(selectedMonth!.toDateString()),
    [selectedMonth],
  );

  return useQuery({
    queryKey: ["dashboardData", uid, date],
    queryFn: () => getDashboardData(uid, date),
    enabled: !!uid && !!date,
    staleTime: 60 * 3 * 1000,
  });
};

export default useDashboardQuery;
