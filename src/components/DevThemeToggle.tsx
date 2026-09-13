"use client";

import { useSyncExternalStore } from "react";
import Icon from "@/components/Icon";
import {
  applyTheme,
  getThemeBeforeHydration,
  getThemeFromDocumentElement,
  setThemeOverride,
  subscribeTheme,
  type Theme,
} from "@/lib/theme";

export default function DevThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeFromDocumentElement,
    getThemeBeforeHydration,
  );

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setThemeOverride(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-primary p-2 rounded-md hover:bg-primary/10 transition-colors cursor-pointer"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={`[dev] ${theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}
