// Theme utilities for light/dark mode toggle

export const THEME_STORAGE_KEY = 'blog-theme-preference';

// Helper to safely access localStorage in both client and server
export const getThemePreference = (): 'light' | 'dark' | null => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(THEME_STORAGE_KEY) as 'light' | 'dark' | null;
  }
  return null;
};

// Helper to check if system prefers dark mode
export const systemPrefersDark = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

// Helper to get the initial theme
export const getInitialTheme = (): 'light' | 'dark' => {
  const storedTheme = getThemePreference();
  if (storedTheme) {
    return storedTheme;
  }
  return systemPrefersDark() ? 'dark' : 'light';
};

// Save theme preference to localStorage
export const saveThemePreference = (theme: 'light' | 'dark'): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}; 