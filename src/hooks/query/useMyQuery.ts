import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyData, setDdayEvent, deleteDdayEvent } from "@/lib/supabase/my";
import { useUserQuery } from "./useUserQuery";
import { v4 as uuidv4 } from "uuid";

import { DdayEvent, DdayFormValuesProps } from "@/types/dday";

const useMyQuery = () => {
  const queryClient = useQueryClient();

  const { userId } = useUserQuery();
  const uid = userId!;

  // 마이 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["myData", uid],
    queryFn: () => getMyData(uid),
    enabled: !!uid,
    staleTime: 60 * 5 * 1000,
  });

  // D-day 이벤트 추가
  const addEvent = useMutation({
    mutationFn: (event: DdayFormValuesProps) => setDdayEvent({ ...event, uid }),
    onMutate: async (event) => {
      await queryClient.cancelQueries({
        queryKey: ["myData", uid],
      });
      const prev = queryClient.getQueryData(["myData", uid]);

      const optimisticEvent = { ...event, id: uuidv4() };

      queryClient.setQueryData(["myData", uid], (old?: any) => {
        if (!old)
          return {
            ddayEvents: [optimisticEvent],
            totalStat: { total: 0, completed: 0, incompleted: 0, rate: 0 },
          };
        return {
          ...old,
          ddayEvents: [...old.ddayEvents, optimisticEvent].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          ),
        };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["myData", uid], context?.prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myData", uid],
      });
    },
  });

  // D-day 이벤트 삭제
  const deleteEvent = useMutation({
    mutationFn: (id: string) => deleteDdayEvent(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["myData", uid],
      });
      const prev = queryClient.getQueryData(["myData", uid]);

      queryClient.setQueryData(["myData", uid], (old?: any) => {
        if (!old) return old;
        return {
          ...old,
          ddayEvents: old.ddayEvents.filter(
            (event: DdayEvent) => event.id !== id,
          ),
        };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["myData", uid], context?.prev);
    },
  });

  return {
    myData: data,
    isLoading,
    addEvent,
    deleteEvent,
  };
};

export default useMyQuery;
