import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { ModalStoreType } from "./store.type";

const modalStore: StateCreator<ModalStoreType> = (set) => ({
  modalState: false,
  modalContent: "",
  modalTaskId: 0,
  modalTaskType: "",
  modalBadgeId: 0,
  modaluserId: "",
  setModalState: (
    modalState: boolean,
    modalContent?: string,
    modalTaskId?: number,
    modalTaskType?: string,
    modalBadgeId?: number,
    modaluserId?: string
  ) =>
    set((state) => ({
      ...state,
      modalState,
      modalContent,
      modalTaskId,
      modalTaskType,
      modalBadgeId,
      modaluserId,
    })),
});

export const useModalStore = create<ModalStoreType>(
  devtools(modalStore) as unknown as StateCreator<ModalStoreType>
);
