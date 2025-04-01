import { NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin";
import { createClientForServer } from "@/lib/supabase/server";

export async function DELETE(request: Request) {
  try {
    const supabase = await createClientForServer();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: "유저가 확인되지 않습니다." },
        { status: 401 },
      );
    }

    const { error } = await adminAuthClient.deleteUser(session.user.id);

    if (error) {
      console.error("회원 탈퇴 오류", error);
      throw error;
    }

    return NextResponse.json({ message: "회원 탈퇴 성공" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
