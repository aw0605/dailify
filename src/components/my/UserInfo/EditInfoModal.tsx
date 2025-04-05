import { useState } from "react";
import useForm from "@/hooks/useForm";
import { useUserQuery } from "@/hooks/query/useUserQuery";
import useModalStore from "@/zustand/useModalStore";
import { validateUser } from "@/utils/validate";
import ModalButtons from "@/components/common/ui/Modal/ModalButtons";
import TextField from "@/components/common/ui/TextField";
import ImageField from "./ImageField";
import styled, { css } from "styled-components";

import { UserInfo } from "@/types/user";

function EditInfoModal({ userInfo }: { userInfo: UserInfo }) {
  const { userId, updateUser } = useUserQuery();
  const closeModal = useModalStore((state) => state.closeModal);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    formValues: user,
    handleChange,
    handleSubmit,
    isAble,
  } = useForm({
    initialValues: userInfo,
    validate: validateUser,
    onSubmit: async () => {
      if (!userId) return;

      try {
        updateUser.mutate({ nickname: user.nickname!, imageFile: imageFile });

        alert("프로필이 수정되었습니다.");
        closeModal("editInfoModal");
      } catch (error) {
        console.error("프로필 수정 실패:", error);
        alert("프로필 수정 중 오류가 발생했습니다.");
      }
    },
  });

  return (
    <ModalWrapper onSubmit={handleSubmit}>
      <Title>프로필</Title>
      <TextFieldContainer>
        <ImageField
          initialImage={userInfo.image || null}
          setImageFile={setImageFile}
        />
        <TextField
          label="닉네임"
          name="nickname"
          value={user.nickname}
          onChange={handleChange}
          required
        />
      </TextFieldContainer>
      <ModalButtons modalId="editInfoModal" disabled={!isAble} />
    </ModalWrapper>
  );
}

export default EditInfoModal;

const ModalWrapper = styled.form`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })};
    gap: 24px;
    h1 {
      ${theme.typography.title({ size: 16 })};
    }
  `}
`;

const Title = styled.div`
  ${({ theme }) => css`
    ${theme.typography.title({ size: 24, color: theme.colors.orange })};
  `}
`;

const TextFieldContainer = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })};
    gap: 16px;
    width: 100%;

    > div {
      width: 100%;
    }
  `}
`;
