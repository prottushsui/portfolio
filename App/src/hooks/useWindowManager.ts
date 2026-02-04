import { useState, useCallback, useRef } from 'react';
import type { WindowState } from '@/types';

interface UseWindowManagerReturn {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, icon: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  getWindowProps: (id: string) => Partial<WindowState> | null;
}

const DEFAULT_WINDOW_SIZE = { width: 800, height: 600 };
const WINDOW_OFFSET = 30;

export function useWindowManager(): UseWindowManagerReturn {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const zIndexCounter = useRef(100);

  const openWindow = useCallback((id: string, title: string, icon: string) => {
    setWindows(prev => {
      const existingWindow = prev.find(w => w.id === id);
      if (existingWindow) {
        // Window already exists, just focus it
        zIndexCounter.current += 1;
        setActiveWindowId(id);
        return prev.map(w =>
          w.id === id
            ? { ...w, isMinimized: false, zIndex: zIndexCounter.current }
            : w
        );
      }

      // Create new window with staggered position
      const openCount = prev.filter(w => w.isOpen && !w.isMinimized).length;
      const newPosition = {
        x: 100 + (openCount * WINDOW_OFFSET) % 200,
        y: 60 + (openCount * WINDOW_OFFSET) % 150,
      };

      zIndexCounter.current += 1;
      setActiveWindowId(id);

      return [
        ...prev,
        {
          id,
          title,
          icon,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: zIndexCounter.current,
          position: newPosition,
          size: DEFAULT_WINDOW_SIZE,
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id && w.isOpen);
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  }, [activeWindowId, windows]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      )
    );
    if (activeWindowId === id) {
      const remaining = windows.filter(w => w.id !== id && w.isOpen && !w.isMinimized);
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  }, [activeWindowId, windows]);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    zIndexCounter.current += 1;
    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, zIndex: zIndexCounter.current, isMinimized: false }
          : w
      )
    );
  }, []);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, position } : w
      )
    );
  }, []);

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, size } : w
      )
    );
  }, []);

  const getWindowProps = useCallback((id: string): Partial<WindowState> | null => {
    const window = windows.find(w => w.id === id);
    if (!window) return null;
    return {
      id: window.id,
      title: window.title,
      icon: window.icon,
      isMaximized: window.isMaximized,
      isMinimized: window.isMinimized,
      zIndex: window.zIndex,
      position: window.position,
      size: window.size,
    };
  }, [windows]);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    getWindowProps,
  };
}
