import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { ToastStoreType } from "./store.type";

const toastStore: StateCreator<ToastStoreType> = (set) => ({
  toastState: false,
  toastContent: "",
  setToastState: (toastState: boolean, toastContent: string) =>
    set((state) => ({ ...state, toastState, toastContent })),
});

export const useToastStore = create<ToastStoreType>(
  devtools(toastStore) as unknown as StateCreator<ToastStoreType>
);
