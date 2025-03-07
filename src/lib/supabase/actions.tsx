"use server";

import { Provider } from "@supabase/supabase-js";
import { createClientForServer } from "./server";
import { redirect } from "next/navigation";
import { FormValuesProps } from "@/types/user";
import { revalidatePath } from "next/cache";

const signUpWithEmail = async (formValues: FormValuesProps) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase.auth.signUp({
    email: formValues.email,
    password: formValues.password,
  });

  if (error) {
    console.log(error);
    revalidatePath("/signup");
  } else {
    redirect("/");
  }

  return { data, error };
};

const signInWithEmail = async (formValues: FormValuesProps) => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formValues.email,
    password: formValues.password,
  });

  if (error) {
    console.log(error);
    revalidatePath("/login");
  } else {
    redirect("/");
  }

  return { data, error };
};

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClientForServer();

  const auth_callback_url = `${process.env.SITE_URL}/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    console.log(error);
  }

  redirect(data.url as string);
};

const signInWithGoogle = signInWith("google");
const signInWithKakao = signInWith("kakao");

const getUser = async () => {
  const supabase = await createClientForServer();

  const { data: session } = await supabase.auth.getUser();
  if (!session?.user) return null;

  const { data: user, error } = await supabase
    .from("usersinfo")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) {
    console.error("유저 정보 가져오는 중 에러 발생:", error);
    return null;
  }

  return user;
};

const signOut = async () => {
  const supabase = await createClientForServer();
  await supabase.auth.signOut();
  // redirect("/login");
};

export {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithKakao,
  getUser,
  signOut,
};
