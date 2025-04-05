import Image from "next/image";
import { useUserQuery } from "@/hooks/query/useUserQuery";
import UserRank, { UserRankProps } from "./UserRank";
import styled, { css } from "styled-components";

function UserInfo({ currentRank, prevRank }: UserRankProps) {
  const { user } = useUserQuery();

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
      </ImageContainer>

      <h1 className="nickname">{user?.nickname}</h1>

      <UserRank currentRank={currentRank} prevRank={prevRank} />
    </UserInfoWrapper>
  );
}

export default UserInfo;

const UserInfoWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    ${theme.mixins.flexBox({ direction: "column" })}

    h1.nickname {
      ${theme.typography.title({ size: 28 })}
      margin-bottom: 24px;
    }
  `}
`;

const ImageContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
`;
