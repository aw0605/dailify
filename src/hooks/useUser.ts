import { useEffect } from "react";
import { getUser } from "@/lib/supabase/auth";
import { useShallow } from "zustand/shallow";
import useUserStore from "@/zustand/useUserStore";

const useUser = () => {
  const { user, setUser, clearUser, deleteUser } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
      clearUser: state.clearUser,
      deleteUser: state.deleteUser,
    })),
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
      }
    };

    fetchUser();
  }, [user]);

  return { user, userId: user?.id ?? null, clearUser, deleteUser };
};

export default useUser;
