"use client";

import { useEffect } from "react";
import { applyTheme, getThemeOverride, themeForDate } from "./theme";

const THEME_RECHECK_INTERVAL_MS = 60_000;

export default function ThemeAuto() {
  useEffect(() => {
    const syncThemeWithLocalTime = () => {
      applyTheme(getThemeOverride() ?? themeForDate(new Date()));
    };

    syncThemeWithLocalTime();

    const intervalId = window.setInterval(syncThemeWithLocalTime, THEME_RECHECK_INTERVAL_MS);
    window.addEventListener("focus", syncThemeWithLocalTime);
    document.addEventListener("visibilitychange", syncThemeWithLocalTime);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", syncThemeWithLocalTime);
      document.removeEventListener("visibilitychange", syncThemeWithLocalTime);
    };
  }, []);

  return null;
}
