import { create } from "zustand";
import { persist } from "zustand/middleware";
import { updateUserInfo } from "@/lib/supabase/my";

import { UserInfo } from "@/types/user";

interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  updateUser: (nickname: string, imageFile: File | null) => Promise<void>;
  clearUser: () => void;
  deleteUser: () => Promise<void>;
}

const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),

      updateUser: async (nickname, imageFile) => {
        try {
          const curUser = get().user;
          if (!curUser) throw new Error("유저 정보가 없습니다.");

          const updatedUser = await updateUserInfo(
            curUser.id,
            nickname,
            imageFile,
          );
          if (!updatedUser) throw new Error("유저 정보 업데이트 실패!");
          set({ user: updatedUser });
        } catch (error) {
          console.error("유저 정보 업데이트 실패:", error);
          alert("유저 정보 업데이트에 실패했습니다.");
          set((state) => ({ user: state.user ? state.user : null }));
        }
      },

      clearUser: () => {
        set({ user: null });
        localStorage.removeItem("user-storage");
      },

      deleteUser: async () => {
        try {
          const res = await fetch("/api/auth/delete", {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("회원 탈퇴 실패");
          }

          set({ user: null });
          localStorage.removeItem("user-storage");
          console.log("회원 탈퇴 성공!");
        } catch (error) {
          console.error("회원 탈퇴 오류", error);
          throw error;
        }
      },
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useUserStore;
