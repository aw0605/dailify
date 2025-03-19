"use client";

import Layout from "@/components/common/layout/layout";
import CalendarComponent from "@/components/home/Calendar";
import MonthlyList from "@/components/home/Monthly/MonthlyList";
import Time from "@/components/weekly/Time";
import TodoList from "@/components/weekly/Todo/TodoList";

function Weeklypage() {
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
