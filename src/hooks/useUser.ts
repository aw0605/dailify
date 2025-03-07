import { useEffect } from "react";
import useUserStore from "@/zustand/useUserStore";
import { getUser } from "@/lib/supabase/actions";

const useUser = () => {
  const { user, setUser, clearUser } = useUserStore();

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
