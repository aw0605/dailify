import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@/types/user";

interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        set({ user: null });
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useUserStore;
