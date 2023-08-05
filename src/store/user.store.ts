import { StateCreator, create } from "zustand";
import { UserStoreType } from "./store.type";
import { devtools } from "zustand/middleware";

const userStore: StateCreator<UserStoreType> = (set) => ({
  user: {
    id: "",
    email: "",
    provider: "LOCAL",
    role: "USER",
    selectedBadge: "",
    createdAt: "",
  },
  setUser: (user) => set((state) => ({ ...state, user })),
});

export const useUserStore = create<UserStoreType>(
  devtools(userStore) as unknown as StateCreator<UserStoreType>
);
