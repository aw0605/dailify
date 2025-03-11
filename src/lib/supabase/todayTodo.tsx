"use server";

import { TodoItem } from "@/types/todo";
import { createClientForServer } from "./server";

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

const getTodayTime = async (
  uid: string,
  date: Date,
): Promise<{ goal_time: number | null; actual_time: number | null }> => {
  const supabase = await createClientForServer();

  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from("today_time")
    .select("goal_time, actual_time")
    .eq("uid", uid)
    .eq("date", isoDate)
    .single();

  if (error) {
    console.error("Error fetching time:", error);
    return { goal_time: null, actual_time: null };
  }

  return {
    goal_time: data?.goal_time ?? null,
    actual_time: data?.actual_time ?? null,
  };
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

const getTodayTodos = async (uid: string, date: Date): Promise<TodoItem[]> => {
  const supabase = await createClientForServer();

  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from("today_todos")
    .select("*")
    .eq("uid", uid)
    .eq("date", isoDate);

  if (error) {
    console.error("Error fetching time:", error);
    return [];
  }

  return data || [];
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
  setTodayTime,
  getTodayTime,
  setTodayTodo,
  getTodayTodos,
  editTodayTodo,
  deleteTodayTodo,
  toggleTodayTodo,
};
