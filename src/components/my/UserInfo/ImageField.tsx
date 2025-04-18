import { memo, useCallback, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/ui/Button";
import styled, { css } from "styled-components";

interface ImageFieldProps {
  initialImage: string | null;
  setImageFile: (file: File | null) => void;
}

function ImageField({ initialImage, setImageFile }: ImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(initialImage);

  const handleAdd = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewImage(preview);
    },
    [setImageFile],
  );

  return (
    <Wrapper>
      <ImageHeader>
        <label>프로필 이미지</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <Button type="button" variant="ghost" size={20} onClick={handleAdd}>
          +
        </Button>
      </ImageHeader>
      <PreviewContainer>
        {previewImage ? (
          <Image src={previewImage} alt="user" fill />
        ) : (
          <p>이미지를 선택하세요</p>
        )}
      </PreviewContainer>
    </Wrapper>
  );
}

export default memo(ImageField);

const Wrapper = styled.div`
  width: 100%;
`;

const ImageHeader = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })};
    label {
      padding-left: 5px;
      ${theme.typography.title({ size: 16 })};
    }
    input {
      display: none;
    }
    button {
      width: 30px;
    }
  `}
`;

const PreviewContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 200px;
    ${theme.mixins.flexBox({})}
    border: 2px solid ${theme.colors.gray3};
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    img {
      object-fit: cover;
    }
  `}
`;
