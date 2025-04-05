import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "./useUserQuery";
import {
  deleteMonthlyEvent,
  editMonthlyEvent,
  getMonthlyEvents,
  setMonthlyEvent,
} from "@/lib/supabase/monthly";
import { v4 as uuidv4 } from "uuid";

import { MonthlyEvent } from "@/types/monthly";

const filterAndSortEvents = (events: MonthlyEvent[]) => {
  const today = new Date();
  const endOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  return events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= endOfMonth;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const useMonthlyQuery = () => {
  const queryClient = useQueryClient();

  const { userId } = useUserQuery();
  const uid = userId!;

  // 먼슬리 이벤트 데이터 가져오기
  const { data = [], isLoading } = useQuery<MonthlyEvent[]>({
    queryKey: ["monthlyEvents", uid],
    queryFn: () => getMonthlyEvents(uid),
    enabled: !!uid,
    staleTime: 60 * 3 * 1000,
  });

  // 먼슬리 이벤트 추가
  const addEvent = useMutation({
    mutationFn: (event: Omit<MonthlyEvent, "id">) =>
      setMonthlyEvent({ ...event, uid }),
    onMutate: async (event) => {
      await queryClient.cancelQueries({
        queryKey: ["monthlyEvents", uid],
      });
      const prev = queryClient.getQueryData<MonthlyEvent[]>([
        "monthlyEvents",
        uid,
      ]);

      const optimisticEvent = { ...event, id: uuidv4() };

      queryClient.setQueryData<MonthlyEvent[]>(
        ["monthlyEvents", uid],
        (old = []) => filterAndSortEvents([...old, optimisticEvent]),
      );

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["monthlyEvents", uid], context?.prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["monthlyEvents", uid],
      });
    },
  });

  // 먼슬리 이벤트 수정
  const updateEvent = useMutation({
    mutationFn: (event: MonthlyEvent) => editMonthlyEvent(event),
    onMutate: async (editEvent) => {
      await queryClient.cancelQueries({
        queryKey: ["monthlyEvents", uid],
      });
      const prev = queryClient.getQueryData<MonthlyEvent[]>([
        "monthlyEvents",
        uid,
      ]);

      queryClient.setQueryData<MonthlyEvent[]>(
        ["monthlyEvents", uid],
        (old = []) =>
          filterAndSortEvents(
            old.map((event) => (event.id === editEvent.id ? editEvent : event)),
          ),
      );

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["monthlyEvents", uid], context?.prev);
    },
  });

  // 먼슬리 이벤트 삭제
  const deleteEvent = useMutation({
    mutationFn: (id: string) => deleteMonthlyEvent(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["monthlyEvents", uid],
      });
      const prev = queryClient.getQueryData<MonthlyEvent[]>([
        "monthlyEvents",
        uid,
      ]);

      queryClient.setQueryData<MonthlyEvent[]>(
        ["monthlyEvents", uid],
        (old = []) => old.filter((event) => event.id !== id),
      );

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["monthlyEvents", uid], context?.prev);
    },
  });

  return {
    monthlyEvents: data,
    isLoading,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};

export default useMonthlyQuery;
