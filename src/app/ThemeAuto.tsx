'use client';

import { useEffect } from 'react';
import { applyTheme, getThemeOverride, themeForDate } from './theme';

/**
 * Keeps the theme in sync with the client's local time while the page stays open,
 * so a tab left open across the switch-over hour still flips.
 */
export default function ThemeAuto() {
  useEffect(() => {
    const sync = () => {
      applyTheme(getThemeOverride() ?? themeForDate(new Date()));
    };

    sync();

    const intervalId = window.setInterval(sync, 60_000);
    window.addEventListener('focus', sync);
    document.addEventListener('visibilitychange', sync);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return null;
}
