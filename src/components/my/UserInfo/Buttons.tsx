import { useRouter } from "next/navigation";
import { useUserQuery } from "@/hooks/query/useUserQuery";
import Button from "@/components/common/ui/Button";
import styled, { css } from "styled-components";

function Buttons() {
  const router = useRouter();
  const { deleteUser, logout } = useUserQuery();

  const handleDeleteUser = async () => {
    try {
      deleteUser.mutate();
      router.push("/login");
    } catch (error) {
      console.error("회원 탈퇴 중 오류 발생:", error);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Button variant="outline" onClick={logout}>
        로그아웃
      </Button>
      <Button onClick={handleDeleteUser}>탈퇴</Button>
    </Container>
  );
}

export default Buttons;

const Container = styled.div`
  ${({ theme }) => css`
    width: 50%;
    max-width: 350px;
    min-width: 300px;
    margin: 30px 0 50px;
    ${theme.mixins.flexBox({})}
    gap: 20px;
    button {
      flex: 1;
    }
  `}
`;
