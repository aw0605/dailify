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

const signOut = async () => {
  const supabase = await createClientForServer();
  await supabase.auth.signOut();
};

export {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithKakao,
  signOut,
};
