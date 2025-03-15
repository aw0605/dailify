"use server";

import { createClientForServer } from "./server";

const getDDay = async (uid: string) => {
  const supabase = await createClientForServer();

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("dday_events")
    .select("*")
    .eq("uid", uid)
    .gte("date", today)
    .order("date", { ascending: true })
    .limit(1)
    .single();

  if (error) throw error;

  return data || null;
};

export { getDDay };
