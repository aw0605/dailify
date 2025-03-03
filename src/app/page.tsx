"use client";

import Layout from "@/components/common/layout/layout";
import Header from "@/components/home/Header";
import Time from "@/components/home/Time";
import TodoList from "@/components/home/TodoList";
import CalendarComponent from "@/components/home/Calendar";
import MonthlyList from "@/components/home/MonthlyList";

export default function Home() {
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
