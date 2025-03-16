"use server";

import { MonthlyEvent, MonthlyFormValuesProps } from "@/types/monthly";
import { createClientForServer } from "./server";

const setMonthlyEvent = async (
  event: MonthlyFormValuesProps & { uid: string },
) => {
  const supabase = await createClientForServer();

  const isoDate = event.date.toISOString();

  const { data, error } = await supabase.from("monthly_events").insert([
    {
      uid: event.uid,
      title: event.title,
      date: isoDate,
      content: event.content || null,
    },
  ]);

  if (error) throw error;

  return data;
};

const getMonthlyEvents = async (
  uid: string,
  date: Date = new Date(),
): Promise<MonthlyEvent[]> => {
  const supabase = await createClientForServer();

  const endOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  const { data, error } = await supabase
    .from("monthly_events")
    .select("*")
    .eq("uid", uid)
    .gte("date", date.toISOString())
    .lte("date", endOfMonth.toISOString())
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching time:", error);
    return [];
  }

  return data || [];
};

const editMonthlyEvent = async (
  event: Pick<MonthlyEvent, "id" | "date" | "title" | "content">,
) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("monthly_events")
    .update({
      date: event.date,
      title: event.title,
      content: event.content,
    })
    .eq("id", event.id)
    .select();

  if (error) throw error;
  return data;
};

const deleteMonthlyEvent = async (id: string) => {
  const supabase = await createClientForServer();

  const { error } = await supabase.from("monthly_events").delete().eq("id", id);

  if (error) throw error;
};

export {
  setMonthlyEvent,
  getMonthlyEvents,
  editMonthlyEvent,
  deleteMonthlyEvent,
};
