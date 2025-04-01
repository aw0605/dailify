import { create } from "zustand";
import { getDashboardData } from "@/lib/supabase/dashboard";

import { StatProps, WeeklyStatProps } from "@/types/dashboard";
import { TodoItem } from "@/types/todo";

interface DashboardState {
  monthlyStat: StatProps;
  weeklyStat: WeeklyStatProps[];
  unfinishedTodos: TodoItem[];
  loading: boolean;
  fetchDashboardData: (uid: string, date: Date) => Promise<void>;
}

const useDashboardStore = create<DashboardState>((set) => ({
  monthlyStat: { total: 0, completed: 0, incompleted: 0, rate: 0 },
  weeklyStat: [],
  unfinishedTodos: [],
  loading: false,

  fetchDashboardData: async (uid, date) => {
    set({ loading: true });
    const data = await getDashboardData(uid, date);
    set({
      monthlyStat: data.monthlyStat || {
        total: 0,
        completed: 0,
        incompleted: 0,
      },
      weeklyStat: data.weeklyStat,
      unfinishedTodos: data.unfinishedTodos,
      loading: false,
    });
  },
}));

export default useDashboardStore;
