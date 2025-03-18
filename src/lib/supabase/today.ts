"use server";

import { DdayEvent } from "@/types/dday";
import { createClientForServer } from "./server";
import { TimeProps } from "@/types/time";
import { TodoItem } from "@/types/todo";

interface TodayProps {
  dday: DdayEvent | null;
  todayTime: TimeProps | null;
  todos: TodoItem[];
}

const getTodayData = async (uid: string, date: Date): Promise<TodayProps> => {
  const supabase = await createClientForServer();

  const isoDate = date.toISOString().split("T")[0];

  const { data, error } = await supabase.rpc("get_today_data", {
    uid,
    selected_date: isoDate,
  });

  if (error) {
    console.error("오늘 데이터 불러오는 중 에러 발생!:", error);
    return {
      dday: null,
      todayTime: { goal_time: 0, actual_time: 0 },
      todos: [],
    };
  }

  return data;
};

const setTodayTime = async (
  uid: string,
  date: Date,
  field: "goal_time" | "actual_time",
  value: number,
) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("today_time")
    .upsert(
      { uid, date: date.toISOString(), [field]: value },
      { onConflict: "uid, date" },
    );

  if (error) throw error;
  return data;
};

const setTodayTodo = async (
  todo: Omit<TodoItem, "id" | "completed"> & { uid: string },
) => {
  const supabase = await createClientForServer();

  const isoDate = todo.date.toISOString();

  const { data, error } = await supabase.from("today_todos").insert([
    {
      uid: todo.uid,
      date: isoDate,
      subject: todo.subject,
      title: todo.title,
      content: todo.content || null,
      completed: false,
    },
  ]);

  if (error) throw error;
  return data;
};

const editTodayTodo = async (
  todo: Pick<TodoItem, "id" | "subject" | "title" | "content">,
) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("today_todos")
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

const deleteTodayTodo = async (id: string) => {
  const supabase = await createClientForServer();

  const { error } = await supabase.from("today_todos").delete().eq("id", id);

  if (error) throw error;
};

const toggleTodayTodo = async (id: string, completed: boolean) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("today_todos")
    .update({ completed: !completed })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export {
  getTodayData,
  setTodayTime,
  setTodayTodo,
  editTodayTodo,
  deleteTodayTodo,
  toggleTodayTodo,
};
