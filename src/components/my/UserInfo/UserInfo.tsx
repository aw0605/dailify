import Image from "next/image";
import { useUserQuery } from "@/hooks/query/useUserQuery";
import useModalStore from "@/zustand/useModalStore";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Button from "@/components/common/ui/Button";
import styled, { css } from "styled-components";

function UserInfo() {
  const { user } = useUserQuery();
  const openModal = useModalStore((state) => state.openModal);

  return (
    <UserInfoWrapper>
      <ImageContainer>
        <Image
          src={
            user?.image
              ? user.image
              : "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png"
          }
          alt={user?.nickname ? user.nickname : "user"}
          fill
        />
        <Button onClick={() => openModal("editInfoModal", { userInfo: user! })}>
          <HiOutlinePencilAlt />
        </Button>
      </ImageContainer>
      <InfoConatiner>
        <h1>{user?.nickname}</h1>
        <h2>{user?.email}</h2>
      </InfoConatiner>
    </UserInfoWrapper>
  );
}

export default UserInfo;

const UserInfoWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "flex-start" })}
    gap: 30px;
    margin: 0 0 20px 20px;
    ${theme.media.sm`
      ${theme.mixins.flexBox({})}
    `}
  `}
`;

const ImageContainer = styled.div`
  ${({ theme }) => css`
    width: 100px;
    height: 100px;
    position: relative;

    img {
      border-radius: 100%;
      overflow: hidden;
    }

    button {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 30px;
      height: 30px;
      background-color: ${theme.colors.primary};
      border-radius: 50%;
      z-index: 2;
    }
  `}
`;

const InfoConatiner = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column", align: "flex-start" })}
    gap: 10px;
    h1 {
      ${theme.typography.title({})}
    }
    h2 {
      ${theme.typography.title({ size: 18, color: theme.colors.gray2 })}
    }
  `}
`;
