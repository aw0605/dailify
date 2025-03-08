"use server";

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
): Promise<number | null> => {
  const supabase = await createClientForServer();

  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from("today_time")
    .select("goal_time")
    .eq("uid", uid)
    .eq("date", isoDate)
    .single();

  if (error) {
    console.error("Error fetching time:", error);
    return null;
  }

  return data?.goal_time ?? null;
};

export { setTodayTime, getTodayTime };
