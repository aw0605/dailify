"use server";

import { createClientForServer } from "./server";

import { StatProps, WeeklyStatProps } from "@/types/dashboard";
import { TodoItem } from "@/types/todo";

interface DashboardProps {
  monthlyStat: StatProps | null;
  weeklyStat: WeeklyStatProps[];
  unfinishedTodos: TodoItem[];
}

const getDashboardData = async (
  uid: string,
  date: Date,
): Promise<DashboardProps> => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase.rpc("get_dashboard_data", {
    uid,
    selected_month: date,
  });

  if (error) {
    console.error("대시보드 데이터 불러오는 중 에러 발생!:", error);
    return {
      monthlyStat: { total: 0, completed: 0, incompleted: 0, rate: 0 },
      weeklyStat: [],
      unfinishedTodos: [],
    };
  }

  console.log(data);

  return data;
};

export { getDashboardData };
