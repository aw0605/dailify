import React from "react";
import Button from "../Button";
import useModalStore from "@/zustand/useModalStore";

export default function TodoModal({ id }: { id: string }) {
  const { closeModal } = useModalStore();
  return (
    <div>
      투 두 생성 모달
      <Button onClick={() => closeModal(id)}>닫기</Button>
    </div>
  );
}
