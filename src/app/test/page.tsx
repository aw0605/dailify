"use client";

import useUser from "@/hooks/useUser";
import { signOut } from "@/lib/supabase/auth";

export default function TestPage() {
  const { user, clearUser } = useUser();

  const handleSignout = async () => {
    await signOut();
    clearUser();
  };

  if (!user) {
    return <div>로그인된 사용자가 없습니다.</div>;
  }

  return (
    <div>
      <h2>{user?.nickname}</h2>
      <h2>{user?.email}</h2>
      <form action={handleSignout}>
        <button type="submit">로그아웃</button>
      </form>
    </div>
  );
}
