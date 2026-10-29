'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ThemeMode } from '@/types/portfolio';

const THEME_STORAGE_KEY = 'syed_theme_preference';

export const ThemeSwitcher: React.FC = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [mounted, setMounted] = useState<boolean>(false);

  const applyTheme = useCallback((mode: ThemeMode) => {
    const root = document.documentElement;
    let effectiveDark = false;

    if (mode === 'dark') {
      effectiveDark = true;
    } else if (mode === 'light') {
      effectiveDark = false;
    } else {
      // System mode
      effectiveDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (effectiveDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    const initialMode: ThemeMode =
      stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';

    setThemeMode(initialMode);
    applyTheme(initialMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      const current = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null) || 'system';
      if (current === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [applyTheme]);

  const handleSelectMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    applyTheme(mode);
  };

  if (!mounted) {
    // Render static accessible placeholder during SSR
    return (
      <div
        className="theme-switcher-group"
        role="group"
        aria-label="Theme preference controller"
        style={{
          display: 'inline-flex',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '2px',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <button
          type="button"
          disabled
          aria-label="Light theme"
          style={{
            padding: '4px 8px',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-secondary)',
          }}
        >
          Light
        </button>
        <button
          type="button"
          disabled
          aria-label="Dark theme"
          style={{
            padding: '4px 8px',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-secondary)',
          }}
        >
          Dark
        </button>
        <button
          type="button"
          disabled
          aria-label="System theme"
          style={{
            padding: '4px 8px',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-secondary)',
          }}
        >
          System
        </button>
      </div>
    );
  }

  const modes: { mode: ThemeMode; label: string }[] = [
    { mode: 'light', label: 'Light' },
    { mode: 'dark', label: 'Dark' },
    { mode: 'system', label: 'System' },
  ];

  return (
    <div
      className="theme-switcher-group"
      role="group"
      aria-label="Theme mode switcher"
      style={{
        display: 'inline-flex',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '2px',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      {modes.map(({ mode, label }) => {
        const isActive = themeMode === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => handleSelectMode(mode)}
            aria-pressed={isActive}
            style={{
              padding: '4px 10px',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
              fontWeight: isActive ? 600 : 400,
              borderRadius: 'var(--radius-xs)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
              color: isActive ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
              transition: 'all 0.15s ease',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
