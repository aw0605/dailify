"use client";

import useWeeklyQuery from "@/hooks/query/useWeeklyQuery";
import Layout from "@/components/common/layout/layout";
import CalendarComponent from "@/components/home/Calendar";
import MonthlyList from "@/components/home/Monthly/MonthlyList";
import Time from "@/components/weekly/Time";
import TodoList from "@/components/weekly/Todo/TodoList";

function Weeklypage() {
  const { weeklyData, isLoading } = useWeeklyQuery();

  return (
    <Layout showSide={true}>
      <div className="main">
        <CalendarComponent isWeekly />
        <Time weeklyTime={weeklyData?.weeklyTime ?? null} />
        <TodoList todos={weeklyData?.todos ?? []} isLoading={isLoading} />
      </div>
      <div className="side">
        <MonthlyList />
      </div>
    </Layout>
  );
}

export default Weeklypage;
