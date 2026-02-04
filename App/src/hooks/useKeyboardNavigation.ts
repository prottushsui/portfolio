import { useEffect, useCallback } from 'react';

interface KeyboardNavigationOptions {
  onWindowSwitch?: (direction: 'next' | 'prev') => void;
  onWindowClose?: () => void;
  onWindowMinimize?: () => void;
  onWindowMaximize?: () => void;
  onSearchOpen?: () => void;
  onThemeToggle?: () => void;
  onEscape?: () => void;
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Alt + Tab - Switch windows
    if (e.altKey && e.key === 'Tab') {
      e.preventDefault();
      options.onWindowSwitch?.(e.shiftKey ? 'prev' : 'next');
    }

    // Alt + F4 - Close window
    if (e.altKey && e.key === 'F4') {
      e.preventDefault();
      options.onWindowClose?.();
    }

    // Win/Cmd + M - Minimize window
    if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
      e.preventDefault();
      options.onWindowMinimize?.();
    }

    // Win/Cmd + Up - Maximize window
    if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowUp') {
      e.preventDefault();
      options.onWindowMaximize?.();
    }

    // Win/Cmd + Space - Open search
    if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
      e.preventDefault();
      options.onSearchOpen?.();
    }

    // Win/Cmd + T - Toggle theme
    if ((e.metaKey || e.ctrlKey) && e.key === 't') {
      e.preventDefault();
      options.onThemeToggle?.();
    }

    // Escape - Close modal/menu
    if (e.key === 'Escape') {
      options.onEscape?.();
    }
  }, [options]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [containerRef, isActive]);
}
