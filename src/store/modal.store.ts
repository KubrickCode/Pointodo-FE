import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { ModalStoreType } from "./store.type";

const modalStore: StateCreator<ModalStoreType> = (set) => ({
  modalState: false,
  modalContent: "",
  setModalState: (modalState: boolean, modalContent?: string) =>
    set((state) => ({ ...state, modalState, modalContent })),
});

export const useModalStore = create<ModalStoreType>(
  devtools(modalStore) as unknown as StateCreator<ModalStoreType>
);
