import { StateCreator, create } from "zustand";
import { UserStoreType } from "./store.type";
import { devtools } from "zustand/middleware";

const userStore: StateCreator<UserStoreType> = (set) => ({
  user: {
    id: "",
    email: "",
    provider: "LOCAL",
    role: "USER",
    selectedBadge: 1,
    iconLink: "",
    createdAt: "",
  },
  isLoggedIn: false,
  setUser: (user) => set((state) => ({ ...state, user })),
  setIsLoggedIn: (isLoggedIn: boolean) =>
    set((state) => ({ ...state, isLoggedIn })),
});

export const useUserStore = create<UserStoreType>(
  devtools(userStore) as unknown as StateCreator<UserStoreType>
);
