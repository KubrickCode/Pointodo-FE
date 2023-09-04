import { StateCreator, create } from "zustand";
import { UserStoreType } from "./store.type";
import { devtools } from "zustand/middleware";
import { Provider, Role } from "../entities/user.entity";

const userStore: StateCreator<UserStoreType> = (set) => ({
  user: {
    id: "",
    email: "",
    provider: Provider.LOCAL,
    role: Role.USER,
    selectedBadgeId: 1,
    iconLink: "",
    createdAt: new Date(),
  },
  isLoggedIn: false,
  setUser: (user) => set((state) => ({ ...state, user })),
  setIsLoggedIn: (isLoggedIn: boolean) =>
    set((state) => ({ ...state, isLoggedIn })),
});

export const useUserStore = create<UserStoreType>(
  devtools(userStore) as unknown as StateCreator<UserStoreType>
);
