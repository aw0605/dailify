"use client";

import { useUserQuery } from "@/hooks/query/useUserQuery";

export default function TestPage() {
  const { user, logout } = useUserQuery();

  if (!user) {
    return <div>로그인된 사용자가 없습니다.</div>;
  }

  return (
    <div>
      <h2>{user?.nickname}</h2>
      <h2>{user?.email}</h2>
      <form action={logout}>
        <button type="submit">로그아웃</button>
      </form>
    </div>
  );
}
