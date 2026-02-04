import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { WindowFrame } from './WindowFrame';
import type { WindowState } from '@/types';

interface WindowManagerProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onPositionChange: (id: string, pos: { x: number; y: number }) => void;
  onSizeChange: (id: string, size: { width: number; height: number }) => void;
  animationType?: 'spring' | 'fade' | 'scale' | 'none';
  idleFloat?: boolean;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  activeWindowId,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
  animationType = 'spring',
  idleFloat = false,
}) => {
  const openWindows = windows.filter(w => w.isOpen);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {openWindows.map(window => (
          <div key={window.id} className="pointer-events-auto">
            <WindowFrame
              id={window.id}
              title={window.title}
              icon={window.icon}
              isMaximized={window.isMaximized}
              isMinimized={window.isMinimized}
              zIndex={window.zIndex}
              initialPosition={window.position}
              initialSize={window.size}
              onClose={() => onClose(window.id)}
              onMinimize={() => onMinimize(window.id)}
              onMaximize={() => onMaximize(window.id)}
              onFocus={() => onFocus(window.id)}
              onPositionChange={(pos) => onPositionChange(window.id, pos)}
              onSizeChange={(size) => onSizeChange(window.id, size)}
              animationType={animationType}
              idleFloat={idleFloat && activeWindowId !== window.id}
            >
              <div />
            </WindowFrame>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
