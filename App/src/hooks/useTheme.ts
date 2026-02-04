import { useState, useEffect, useCallback } from 'react';
import type { ThemeConfig } from '@/types';

const STORAGE_KEY = 'portfolio-os-theme';

const defaultTheme: ThemeConfig = {
  mode: 'system',
  highContrast: false,
  wallpaper: 'water',
  particleEffect: 'none',
};

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultTheme, ...JSON.parse(stored) } : defaultTheme;
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      if (theme.mode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return theme.mode === 'dark';
    };
    setIsDark(checkDarkMode());
  }, [theme.mode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (theme.mode === 'system') {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme.mode]);

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply dark/light mode
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply high contrast
    if (theme.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Store theme
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }, [theme, isDark]);

  const setTheme = useCallback((newTheme: Partial<ThemeConfig>) => {
    setThemeState(prev => ({ ...prev, ...newTheme }));
  }, []);

  const toggleMode = useCallback(() => {
    setThemeState(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : prev.mode === 'dark' ? 'system' : 'light',
    }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setThemeState(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const setWallpaper = useCallback((wallpaper: string) => {
    setThemeState(prev => ({ ...prev, wallpaper }));
  }, []);

  const setParticleEffect = useCallback((effect: ThemeConfig['particleEffect']) => {
    setThemeState(prev => ({ ...prev, particleEffect: effect }));
  }, []);

  return {
    theme,
    isDark,
    setTheme,
    toggleMode,
    toggleHighContrast,
    setWallpaper,
    setParticleEffect,
  };
}
