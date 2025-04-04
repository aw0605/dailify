import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTodayTodo,
  editTodayTodo,
  getTodayData,
  setTodayTime,
  setTodayTodo,
  toggleTodayTodo,
} from "@/lib/supabase/today";
import useUser from "../useUser";
import useCalendarStore from "@/zustand/useCalendarStore";
import { v4 as uuidv4 } from "uuid";

import { TodoItem } from "@/types/todo";

const useTodayQuery = () => {
  const queryClient = useQueryClient();

  const { userId } = useUser();
  const selectedDate = useCalendarStore((state) => state.selectedDate);

  const uid = userId!;
  const date = useMemo(
    () => new Date(selectedDate!.toDateString()),
    [selectedDate],
  );

  // 오늘 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["todayData", uid, date],
    queryFn: () => getTodayData(uid, date),
    enabled: !!uid && !!date,
    staleTime: 30 * 1000,
  });

  // 오늘 공부 시간 업데이트
  const updateTodayTime = useMutation({
    mutationFn: (params: {
      field: "goal_time" | "actual_time";
      value: number;
    }) => setTodayTime(uid, date, params.field, params.value),
    onMutate: async ({ field, value }) => {
      await queryClient.cancelQueries({
        queryKey: ["todayData", uid, date],
      });
      const prev = queryClient.getQueriesData({
        queryKey: ["todayData", uid, date],
      });

      queryClient.setQueryData(["todayData", uid, date], (old?: any) => {
        if (!old) return old;
        return {
          ...old,
          todayTime: {
            ...old.todayTime,
            [field]: value,
          },
        };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["todayData", uid, date], context?.prev);
    },
  });

  // 오늘 할 일 추가
  const addTodo = useMutation({
    mutationFn: (todo: Omit<TodoItem, "id" | "completed">) =>
      setTodayTodo({ ...todo, uid }),
    onMutate: async (todo) => {
      await queryClient.cancelQueries({
        queryKey: ["todayData", uid, date],
      });
      const prev = queryClient.getQueriesData({
        queryKey: ["todayData", uid, date],
      });

      const optimisticTodo = { ...todo, id: uuidv4(), completed: false };

      queryClient.setQueryData(["todayData", uid, date], (old?: any) => {
        if (!old)
          return {
            dday: null,
            todayTime: { goal_time: 0, actual_time: 0 },
            todos: [optimisticTodo],
          };
        return { ...old, todos: [...old.todos, optimisticTodo] };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["todayData", uid, date], context?.prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todayData", uid, date],
      });
    },
  });

  // 오늘 할 일 수정
  const updateTodo = useMutation({
    mutationFn: (todo: TodoItem) => editTodayTodo(todo),
    onMutate: async (editTodo) => {
      await queryClient.cancelQueries({
        queryKey: ["todayData", uid, date],
      });
      const prev = queryClient.getQueriesData({
        queryKey: ["todayData", uid, date],
      });

      queryClient.setQueryData(["todayData", uid, date], (old?: any) => {
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
      queryClient.setQueryData(["todayData", uid, date], context?.prev);
    },
  });

  // 오늘 할 일 삭제
  const deleteTodo = useMutation({
    mutationFn: (id: string) => deleteTodayTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["todayData", uid, date],
      });
      const prev = queryClient.getQueriesData({
        queryKey: ["todayData", uid, date],
      });

      queryClient.setQueryData(["todayData", uid, date], (old?: any) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.filter((todo: TodoItem) => todo.id !== id),
        };
      });

      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["todayData", uid, date], context?.prev);
    },
  });

  // 오늘 할 일 완료 토글
  const toggleTodo = useMutation({
    mutationFn: (params: { id: string; completed: boolean }) =>
      toggleTodayTodo(params.id, params.completed),
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({
        queryKey: ["todayData", uid, date],
      });
      const prev = queryClient.getQueriesData({
        queryKey: ["todayData", uid, date],
      });

      queryClient.setQueryData(["todayData", uid, date], (old?: any) => {
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
      queryClient.setQueryData(["todayData", uid, date], context?.prev);
    },
  });

  return {
    todayData: data,
    isLoading,
    updateTodayTime,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
};

export default useTodayQuery;
