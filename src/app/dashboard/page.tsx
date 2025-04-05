"use client";

import useDashboardQuery from "@/hooks/query/useDashboardQuery";
import Layout from "@/components/common/layout/layout";
import Header from "@/components/dashboard/Header";
import MonthlyChart from "@/components/dashboard/MonthlyChart/MonthlyChart";
import WeeklyChart from "@/components/dashboard/WeeklyChart/WeeklyChart";
import TodoList from "@/components/dashboard/Todo/TodoList";
import Loading from "@/components/common/ui/Loading";

function DashboardPage() {
  const { data: dashboardData, isLoading } = useDashboardQuery();

  if (isLoading) {
    return <Loading size="50px" />;
  }

  return (
    <Layout showSide={true}>
      <div className="main">
        <Header />
        <MonthlyChart monthlyStat={dashboardData?.monthlyStat ?? null} />
        <WeeklyChart weeklyStat={dashboardData?.weeklyStat ?? []} />
      </div>
      <div className="side">
        <TodoList todos={dashboardData?.unfinishedTodos ?? []} />
      </div>
    </Layout>
  );
}

export default DashboardPage;
