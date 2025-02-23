import { create } from "zustand";

interface ModalState {
  modals: { id: string; content: React.ReactNode }[];
  openModal: (id: string, content: React.ReactNode) => void;
  closeModal: (id: string) => void;
}

const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (id, content) =>
    set((state) => ({ modals: [...state.modals, { id, content }] })),
  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    })),
}));

export default useModalStore;
