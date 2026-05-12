export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'classique-theme';

const isTheme = (value: string | null): value is Theme => value === 'light' || value === 'dark';

export const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(storedTheme) ? storedTheme : null;
};

export const getPreferredTheme = (): Theme => {
  const storedTheme = getStoredTheme();

  if (storedTheme) {
    return storedTheme;
  }

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
};

export const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
};

export const storeTheme = (theme: Theme) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
};
