'use client';

import { useSyncExternalStore } from 'react';
import {
  applyTheme,
  getServerTheme,
  getTheme,
  setThemeOverride,
  subscribeTheme,
  type Theme,
} from './theme';

/**
 * Local development only: lets both themes be checked without changing the clock.
 * The pick lasts until reload; `page.tsx` renders it behind a NODE_ENV check, so it
 * is dropped from production builds.
 */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setThemeOverride(next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-primary p-2 rounded-md hover:bg-primary/10 transition-colors cursor-pointer"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={`[dev] ${theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}`}
    >
      {theme === 'dark' ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
