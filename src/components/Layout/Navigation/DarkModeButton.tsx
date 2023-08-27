import { FC, useEffect } from "react";
import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";
import { useThemeStore } from "../../../store/theme.store";

const DarkModeButton: FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  useEffect(() => {
    document.documentElement.classList[theme === "dark" ? "add" : "remove"](
      "dark"
    );
    const backgroundColor = theme === "dark" ? "hsl(0, 0%, 20%)" : "#fff";
    document.documentElement.style.backgroundColor = backgroundColor;
  }, [theme]);

  return (
    <DarkModeToggle
      mode={theme}
      dark="Dark"
      light="Light"
      size="sm"
      inactiveTrackColor="#e2e8f0"
      inactiveTrackColorOnHover="#f8fafc"
      inactiveTrackColorOnActive="#cbd5e1"
      activeTrackColor="#334155"
      activeTrackColorOnHover="#1e293b"
      activeTrackColorOnActive="#0f172a"
      inactiveThumbColor="#1e293b"
      activeThumbColor="#e2e8f0"
      onChange={toggleTheme}
    />
  );
};

export default DarkModeButton;
