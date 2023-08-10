import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { ModalStoreType } from "./store.type";

const modalStore: StateCreator<ModalStoreType> = (set) => ({
  modalState: false,
  modalContent: "",
  modalTaskId: 0,
  modalTaskType: "",
  setModalState: (
    modalState: boolean,
    modalContent?: string,
    modalTaskId?: number,
    modalTaskType?: string
  ) =>
    set((state) => ({
      ...state,
      modalState,
      modalContent,
      modalTaskId,
      modalTaskType,
    })),
});

export const useModalStore = create<ModalStoreType>(
  devtools(modalStore) as unknown as StateCreator<ModalStoreType>
);
