export type Theme = "light" | "dark";

export const DAY_START_HOUR = 6;
export const NIGHT_START_HOUR = 18;

export const themeForDate = (date: Date): Theme => {
  const hour = date.getHours();
  return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? "light" : "dark";
};

export const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

let inMemoryThemeOverrideUntilReload: Theme | null = null;

export const getThemeOverride = () => inMemoryThemeOverrideUntilReload;

export const setThemeOverride = (theme: Theme | null) => {
  inMemoryThemeOverrideUntilReload = theme;
};

export const getThemeFromDocumentElement = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export const getThemeBeforeHydration = (): Theme => "dark";

export const subscribeTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};
