import { create } from "zustand";
import {
  deleteWeeklyTodo,
  editWeeklyTodo,
  getWeeklyData,
  setWeeklyTime,
  setWeeklyTodo,
  toggleWeeklyTodo,
} from "@/lib/supabase/weekly";
import { v4 as uuidv4 } from "uuid";

import { TimeProps } from "@/types/time";
import { TodoItem } from "@/types/todo";

interface WeeklyStoreState {
  weeklyTime: TimeProps;
  todos: TodoItem[];
  loading: boolean;
  fetchWeeklyData: (
    uid: string,
    date: { start: Date; end: Date },
  ) => Promise<void>;
  updateWeeklyTime: (
    uid: string,
    date: Date,
    goalTime: number,
  ) => Promise<void>;
  addTodo: (todo: Omit<TodoItem, "id" | "completed"> & { uid: string }) => void;
  updateTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const useWeeklyStore = create<WeeklyStoreState>((set, get) => ({
  weeklyTime: { goal_time: 0, actual_time: 0 },
  todos: [],
  loading: false,

  fetchWeeklyData: async (uid, date) => {
    set({ loading: true });
    const data = await getWeeklyData(uid, date);
    set({
      weeklyTime: data.weeklyTime || { goal_time: 0, actual_time: 0 },
      todos: data.todos,
      loading: false,
    });
  },

  updateWeeklyTime: async (uid, date, goalTime) => {
    try {
      await setWeeklyTime(uid, date, goalTime);
      set((state) => ({
        weeklyTime: {
          ...state.weeklyTime,
          goal_time: goalTime,
        },
      }));
    } catch (error) {
      console.error("이번주 공부 시간 업데이트 실패:", error);
    }
  },

  addTodo: async (todo) => {
    try {
      await setWeeklyTodo(todo);
      const tempTodo = { id: uuidv4(), completed: false, ...todo };
      set((state) => ({ todos: [...state.todos, tempTodo] }));
    } catch (error) {
      console.error("이번주 할 일 추가 실패:", error);
    }
  },

  updateTodo: async (updatedTodo) => {
    try {
      await editWeeklyTodo(updatedTodo);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      }));
    } catch (error) {
      console.error("이번주 할 일 수정 실패:", error);
    }
  },

  deleteTodo: async (id) => {
    try {
      await deleteWeeklyTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error("이번주 할 일 삭제 실패:", error);
    }
  },

  toggleTodo: async (id) => {
    const prevTodo = get().todos;
    try {
      const targetTodo = prevTodo.find((todo: TodoItem) => todo.id === id);
      if (targetTodo) await toggleWeeklyTodo(id, targetTodo.completed);
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        );
        updatedTodos.sort((a, b) => Number(b.completed) - Number(a.completed));

        return { todos: updatedTodos };
      });
    } catch (error) {
      console.error("이번주 할 일 체크 실패:", error);
    }
  },
}));

export default useWeeklyStore;
