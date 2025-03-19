"use server";

import { createClientForServer } from "./server";

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

const getGoalTime = async (userId: string, date: Date) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("weekly_time")
    .select("goal_time")
    .eq("uid", userId)
    .eq("start_date", date.toISOString())
    .maybeSingle();

  if (error) {
    console.error("이번주 목표 시간을 불러오는 중 오류 발생:", error);
    return 0;
  }

  return data?.goal_time || 0;
};

const getActualTime = async (
  userId: string,
  date: { start: Date; end: Date },
) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("today_time")
    .select("actual_time")
    .eq("uid", userId)
    .gte("date", date.start.toISOString())
    .lte("date", date.end.toISOString());

  if (error) {
    console.error("이번주 실제 공부 시간을 불러오는 중 오류 발생:", error);
    return 0;
  }

  return data.reduce((sum, entry) => sum + entry.actual_time, 0);
};

export { setWeeklyTime, getGoalTime, getActualTime };
