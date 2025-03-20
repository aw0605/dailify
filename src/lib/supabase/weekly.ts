"use server";

import { TodoItem } from "@/types/todo";
import { createClientForServer } from "./server";
import { TimeProps } from "@/types/time";

interface WeeklyProps {
  weeklyTime: TimeProps | null;
  todos: TodoItem[];
}

const getWeeklyData = async (
  uid: string,
  date: { start: Date; end: Date },
): Promise<WeeklyProps> => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase.rpc("get_weekly_data", {
    uid,
    start_date: date.start.toISOString().split("T")[0],
    end_date: date.end.toISOString().split("T")[0],
  });

  if (error) {
    console.error("이번주 데이터 불러오는 중 에러 발생!:", error);
    return {
      weeklyTime: { goal_time: 0, actual_time: 0 },
      todos: [],
    };
  }

  console.log("이번주 데이터!:", data);

  return data;
};

const setWeeklyTime = async (uid: string, date: Date, goalTime: number) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("weekly_time")
    .upsert(
      { uid, start_date: date.toISOString(), goal_time: goalTime },
      { onConflict: "uid, start_date" },
    );

  if (error) throw error;
  return data;
};

const setWeeklyTodo = async (
  todo: Omit<TodoItem, "id" | "completed"> & { uid: string },
) => {
  const supabase = await createClientForServer();

  const isoDate = todo.date.toISOString();

  const { data, error } = await supabase.from("weekly_todos").insert([
    {
      uid: todo.uid,
      start_date: isoDate,
      subject: todo.subject,
      title: todo.title,
      content: todo.content || null,
      completed: false,
    },
  ]);

  if (error) throw error;
  return data;
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
