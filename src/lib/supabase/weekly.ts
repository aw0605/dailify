"use server";

import { createClientForServer } from "./server";

import { TodoItem } from "@/types/todo";
import { Times } from "@/types/time";

interface WeeklyProps {
  weeklyTime: Times | null;
  todos: TodoItem[];
}

const getWeeklyData = async (uid: string, date: Date): Promise<WeeklyProps> => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase.rpc("get_weekly_data", {
    uid,
    start_date: date,
  });

  if (error || !data) {
    console.error("이번주 데이터 불러오는 중 에러 발생!:", error);
    return {
      weeklyTime: { goal_time: 0, actual_time: 0 },
      todos: [],
    };
  }

  return data;
};

const setWeeklyTime = async (uid: string, date: Date, goalTime: number) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("weekly_time")
    .upsert(
      { uid, start_date: date, goal_time: goalTime },
      { onConflict: "uid, start_date" },
    );

  if (error) throw error;
  return data;
};

const setWeeklyTodo = async (
  todo: Omit<TodoItem, "id" | "completed"> & { uid: string },
) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("weekly_todos")
    .insert([
      {
        uid: todo.uid,
        start_date: todo.date,
        subject: todo.subject,
        title: todo.title,
        content: todo.content || null,
        completed: false,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
};

const editWeeklyTodo = async (
  todo: Pick<TodoItem, "id" | "subject" | "title" | "content">,
) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("weekly_todos")
    .update({
      subject: todo.subject,
      title: todo.title,
      content: todo.content,
    })
    .eq("id", todo.id)
    .select();

  if (error) throw error;
  return data;
};

const deleteWeeklyTodo = async (id: string) => {
  const supabase = await createClientForServer();

  const { error } = await supabase.from("weekly_todos").delete().eq("id", id);

  if (error) throw error;
};

const toggleWeeklyTodo = async (id: string, completed: boolean) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("weekly_todos")
    .update({ completed: !completed })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export {
  getWeeklyData,
  setWeeklyTime,
  setWeeklyTodo,
  editWeeklyTodo,
  deleteWeeklyTodo,
  toggleWeeklyTodo,
};
