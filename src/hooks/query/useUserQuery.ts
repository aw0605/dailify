import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, signOut } from "@/lib/supabase/auth";
import { updateUserInfo } from "@/lib/supabase/my";

export const useUserQuery = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 60 * 5 * 1000,
  });

  const updateUser = useMutation({
    mutationFn: async ({
      nickname,
      imageFile,
    }: {
      nickname: string;
      imageFile: File | null;
    }) => {
      if (!user) throw new Error("유저 없음");
      return await updateUserInfo(user.id, nickname, imageFile);
    },
    onError: () => {
      alert("유저 정보 업데이트 실패!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/delete", { method: "DELETE" });
      if (!res.ok) throw new Error("삭제 실패");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  const logout = async () => {
    await signOut();
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  return {
    user,
    userId: user?.id ?? null,
    isLoading,
    updateUser,
    deleteUser,
    logout,
  };
};
