"use client";

import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import useWeeklyStore from "@/zustand/useWeeklyStore";
import useCalendarStore from "@/zustand/useCalendarStore";
import Layout from "@/components/common/layout/layout";
import CalendarComponent from "@/components/home/Calendar";
import MonthlyList from "@/components/home/Monthly/MonthlyList";
import Time from "@/components/weekly/Time";
import TodoList from "@/components/weekly/Todo/TodoList";

function Weeklypage() {
  const { userId } = useUser();
  const selectedWeek = useCalendarStore((state) => state.selectedWeek);

  const fetchWeeklyData = useWeeklyStore((state) => state.fetchWeeklyData);

  useEffect(() => {
    if (userId && selectedWeek) {
      fetchWeeklyData(userId, selectedWeek);
    }
  }, [userId, selectedWeek]);

  return (
    <Layout showSide={true}>
      <div className="main">
        <CalendarComponent isWeekly />
        <Time />
        <TodoList />
      </div>
      <div className="side">
        <MonthlyList />
      </div>
    </Layout>
  );
}

export default Weeklypage;
