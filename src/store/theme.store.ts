import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ThemeStoreType } from "./store.type";

const themeStore: StateCreator<ThemeStoreType> = (set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
});

export const useThemeStore = create<ThemeStoreType>(
  devtools(
    persist(themeStore, {
      name: "themeStore",
    })
  ) as unknown as StateCreator<ThemeStoreType>
);
