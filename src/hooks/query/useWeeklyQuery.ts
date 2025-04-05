import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "./useUserQuery";
import useCalendarStore from "@/zustand/useCalendarStore";
import {
  getWeeklyData,
  setWeeklyTime,
  setWeeklyTodo,
  editWeeklyTodo,
  deleteWeeklyTodo,
  toggleWeeklyTodo,
} from "@/lib/supabase/weekly";
import { v4 as uuidv4 } from "uuid";

import { TodoItem } from "@/types/todo";

const useWeeklyQuery = () => {
  const queryClient = useQueryClient();

  const { userId } = useUserQuery();
  const selectedWeek = useCalendarStore((state) => state.selectedWeek);

  const uid = userId!;
  const date = useMemo(
    () => new Date(selectedWeek!.start.toDateString()),
    [selectedWeek],
  );

  // 이번주 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["weeklyData", uid, date],
    queryFn: () => getWeeklyData(uid, date),
    enabled: !!uid && !!date,
    staleTime: 30 * 1000,
  });

  // 이번주 공부 시간 업데이트
  const updateWeeklyTime = useMutation({
    mutationFn: (goalTime: number) => setWeeklyTime(uid, date, goalTime),
    onMutate: async (goalTime) => {
      await queryClient.cancelQueries({ queryKey: ["weeklyData", uid, date] });
      const prev = queryClient.getQueryData(["weeklyData", uid, date]);

      queryClient.setQueryData(["weeklyData", uid, date], (old?: any) => {
        if (!old) return old;
        return {
          ...old,
          weeklyTime: {
            ...old.weeklyTime,
            goal_time: goalTime,
          },
        };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["weeklyData", uid, date], context?.prev);
    },
  });

  // 이번주 할 일 추가
  const addTodo = useMutation({
    mutationFn: (todo: Omit<TodoItem, "id" | "completed">) =>
      setWeeklyTodo({ ...todo, uid }),
    onMutate: async (todo) => {
      await queryClient.cancelQueries({
        queryKey: ["weeklyData", uid, date],
      });
      const prev = queryClient.getQueryData(["weeklyData", uid, date]);

      const optimisticTodo = { ...todo, id: uuidv4(), completed: false };

      queryClient.setQueryData(["weeklyData", uid, date], (old?: any) => {
        if (!old)
          return {
            weeklyTime: { goal_time: 0, actual_time: 0 },
            todos: [optimisticTodo],
          };
        return { ...old, todos: [...old.todos, optimisticTodo] };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["weeklyData", uid, date], context?.prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["weeklyData", uid, date],
      });
    },
  });

  // 이번주 할 일 수정
  const updateTodo = useMutation({
    mutationFn: (todo: TodoItem) => editWeeklyTodo(todo),
    onMutate: async (editTodo) => {
      await queryClient.cancelQueries({
        queryKey: ["weeklyData", uid, date],
      });
      const prev = queryClient.getQueryData(["weeklyData", uid, date]);

      queryClient.setQueryData(["weeklyData", uid, date], (old?: any) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.map((todo: TodoItem) =>
            todo.id === editTodo.id ? editTodo : todo,
          ),
        };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["weeklyData", uid, date], context?.prev);
    },
  });

  // 이번주 할 일 삭제
  const deleteTodo = useMutation({
    mutationFn: (id: string) => deleteWeeklyTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["weeklyData", uid, date],
      });
      const prev = queryClient.getQueryData(["weeklyData", uid, date]);

      queryClient.setQueryData(["weeklyData", uid, date], (old?: any) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.filter((todo: TodoItem) => todo.id !== id),
        };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["weeklyData", uid, date], context?.prev);
    },
  });

  // 이번주 할 일 완료 토글
  const toggleTodo = useMutation({
    mutationFn: (params: { id: string; completed: boolean }) =>
      toggleWeeklyTodo(params.id, params.completed),
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({
        queryKey: ["weeklyData", uid, date],
      });
      const prev = queryClient.getQueryData(["weeklyData", uid, date]);

      queryClient.setQueryData(["weeklyData", uid, date], (old?: any) => {
        if (!old) return old;

        const updatedTodos = old.todos.map((todo: TodoItem) =>
          todo.id === id ? { ...todo, completed: !completed } : todo,
        );

        updatedTodos.sort(
          (a: TodoItem, b: TodoItem) =>
            Number(b.completed) - Number(a.completed),
        );

        return { ...old, todos: updatedTodos };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["weeklyData", uid, date], context?.prev);
    },
  });

  return {
    weeklyData: data,
    isLoading,
    updateWeeklyTime,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
};

export default useWeeklyQuery;
