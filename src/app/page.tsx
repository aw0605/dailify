"use client";

import Layout from "@/components/common/layout/layout";
import Header from "@/components/home/Header";
import Time from "@/components/home/Time";
import TodoList from "@/components/home/Todo/TodoList";
import CalendarComponent from "@/components/home/Calendar";
import MonthlyList from "@/components/home/Monthly/MonthlyList";
import useTodayQuery from "@/hooks/query/useTodayQuery";

export default function Home() {
  const { todayData, isLoading } = useTodayQuery();

  return (
    <Layout showSide={false}>
      <div className="main">
        <Header />
        <Time
          dday={todayData?.dday ?? null}
          todayTime={todayData?.todayTime ?? null}
        />
        <TodoList todos={todayData?.todos ?? []} isLoading={isLoading} />
      </div>
      <div className="side">
        <CalendarComponent />
        <MonthlyList />
      </div>
    </Layout>
  );
}
