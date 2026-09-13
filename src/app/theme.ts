export type Theme = 'light' | 'dark';

/** Light theme applies from DAY_START_HOUR until NIGHT_START_HOUR (client local time). */
export const DAY_START_HOUR = 6;
export const NIGHT_START_HOUR = 18;

export const themeForDate = (date: Date): Theme => {
  const hour = date.getHours();
  return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? 'light' : 'dark';
};

export const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

/**
 * In-memory override set by the development-only toggle. It keeps ThemeAuto from
 * reverting the pick on its next tick, and is gone on reload.
 */
let themeOverride: Theme | null = null;

export const getThemeOverride = () => themeOverride;

export const setThemeOverride = (theme: Theme | null) => {
  themeOverride = theme;
};
