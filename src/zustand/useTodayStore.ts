import { create } from "zustand";
import {
  deleteTodayTodo,
  editTodayTodo,
  getTodayData,
  setTodayTime,
  setTodayTodo,
  toggleTodayTodo,
} from "@/lib/supabase/today";
import { v4 as uuidv4 } from "uuid";

import { DdayEvent } from "@/types/dday";
import { TimeProps } from "@/types/time";
import { TodoItem } from "@/types/todo";

interface TodayStoreState {
  dday: DdayEvent | null;
  todayTime: TimeProps;
  todos: TodoItem[];
  loading: boolean;
  fetchTodayData: (uid: string, date: Date) => Promise<void>;
  updateTodayTime: (
    uid: string,
    date: Date,
    field: "goal_time" | "actual_time",
    value: number,
  ) => Promise<void>;
  addTodo: (todo: Omit<TodoItem, "id" | "completed"> & { uid: string }) => void;
  updateTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const useTodayStore = create<TodayStoreState>((set, get) => ({
  dday: null,
  todayTime: { goal_time: 0, actual_time: 0 },
  todos: [],
  loading: false,

  fetchTodayData: async (uid, date) => {
    set({ loading: true });
    const data = await getTodayData(uid, date);
    set({
      dday: data.dday,
      todayTime: data.todayTime || { goal_time: 0, actual_time: 0 },
      todos: data.todos,
      loading: false,
    });
  },

  updateTodayTime: async (uid, date, field, value) => {
    try {
      await setTodayTime(uid, date, field, value);
      set((state) => ({
        todayTime: {
          ...state.todayTime,
          [field]: value,
        },
      }));
    } catch (error) {
      console.error("오늘 공부 시간 업데이트 실패:", error);
    }
  },

  addTodo: async (todo) => {
    try {
      await setTodayTodo(todo);
      const tempTodo = { id: uuidv4(), completed: false, ...todo };
      set((state) => ({ todos: [...state.todos, tempTodo] }));
    } catch (error) {
      console.error("오늘 할 일 추가 실패:", error);
    }
  },

  updateTodo: async (updatedTodo) => {
    try {
      await editTodayTodo(updatedTodo);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      }));
    } catch (error) {
      console.error("오늘 할 일 수정 실패:", error);
    }
  },

  deleteTodo: async (id) => {
    try {
      await deleteTodayTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error("오늘 할 일 삭제 실패:", error);
    }
  },

  toggleTodo: async (id) => {
    const prevTodo = get().todos;
    try {
      const targetTodo = prevTodo.find((todo: TodoItem) => todo.id === id);
      if (targetTodo) await toggleTodayTodo(id, targetTodo.completed);
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        );
        updatedTodos.sort((a, b) => Number(b.completed) - Number(a.completed));

        return { todos: updatedTodos };
      });
    } catch (error) {
      console.error("오늘 할 일 체크 실패:", error);
    }
  },
}));

export default useTodayStore;
