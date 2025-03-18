"use client";

import Layout from "@/components/common/layout/layout";
import Header from "@/components/home/Header";
import Time from "@/components/home/Time";
import TodoList from "@/components/home/Todo/TodoList";
import CalendarComponent from "@/components/home/Calendar";
import MonthlyList from "@/components/home/Monthly/MonthlyList";
import useUser from "@/hooks/useUser";
import useCalendarStore from "@/zustand/useCalendarStore";
import useTodayStore from "@/zustand/useTodayStore";
import { useEffect } from "react";

export default function Home() {
  const { userId } = useUser();
  const selectedDate = useCalendarStore((state) => state.selectedDate);

  const fetchTodayData = useTodayStore((state) => state.fetchTodayData);

  useEffect(() => {
    if (userId && selectedDate) {
      fetchTodayData(userId, selectedDate);
    }
  }, [userId, selectedDate]);

  return (
    <Layout showSide={true}>
      <div className="main">
        <Header />
        <Time />
        <TodoList />
      </div>
      <div className="side">
        <CalendarComponent />
        <MonthlyList />
      </div>
    </Layout>
  );
}
