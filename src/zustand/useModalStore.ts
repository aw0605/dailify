import { create } from "zustand";

interface ModalState {
  modals: { id: string; props?: any }[];
  openModal: (id: string, props?: any) => void;
  closeModal: (id: string) => void;
}

const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (id, props) =>
    set((state) => ({ modals: [...state.modals, { id, props }] })),
  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    })),
}));

export default useModalStore;
