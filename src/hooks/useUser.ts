import { useEffect } from "react";
import useUserStore from "@/zustand/useUserStore";
import { getUser } from "@/lib/supabase/auth";
import { useShallow } from "zustand/shallow";

const useUser = () => {
  const { user, setUser, clearUser } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
      clearUser: state.clearUser,
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

  return { user, userId: user?.id ?? null, clearUser };
};

export default useUser;
