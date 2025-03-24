"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import useUser from "@/hooks/useUser";
import useCalendarStore from "@/zustand/useCalendarStore";
import useDashboardStore from "@/zustand/useDashboardStore";
import Layout from "@/components/common/layout/layout";
import Header from "@/components/dashboard/Header";
import MonthlyChart from "@/components/dashboard/MonthlyChart/MonthlyChart";
import WeeklyChart from "@/components/dashboard/WeeklyChart/WeeklyChart";
import TodoList from "@/components/dashboard/Todo/TodoList";
import Loading from "@/components/common/ui/Loading";

function DashboardPage() {
  const { userId } = useUser();
  const selectedMonth = useCalendarStore((state) => state.selectedMonth);

  const { fetchDashboardData, loading } = useDashboardStore(
    useShallow((state) => ({
      fetchDashboardData: state.fetchDashboardData,
      loading: state.loading,
    })),
  );

  useEffect(() => {
    if (userId && selectedMonth) {
      fetchDashboardData(userId, selectedMonth);
    }
  }, [userId, selectedMonth]);

  if (loading) {
    return <Loading size="50px" />;
  }

  return (
    <Layout showSide={true}>
      <div className="main">
        <Header />
        <MonthlyChart />
        <WeeklyChart />
      </div>
      <div className="side">
        <TodoList />
      </div>
    </Layout>
  );
}

export default DashboardPage;
