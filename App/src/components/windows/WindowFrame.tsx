import React, { useState, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WindowFrameProps {
  id: string;
  title: string;
  icon: string;
  children: React.ReactNode;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  animationType?: 'spring' | 'fade' | 'scale' | 'none';
  idleFloat?: boolean;
}

const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;

export const WindowFrame: React.FC<WindowFrameProps> = ({
  id: _id,
  title,
  icon,
  children,
  isMaximized,
  isMinimized,
  zIndex,
  initialPosition,
  initialSize,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
  animationType = 'spring',
  idleFloat = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState(initialSize);
  const windowRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleDragStart = useCallback(() => {
    if (isMaximized) return;
    setIsDragging(true);
    onFocus();
  }, [isMaximized, onFocus]);

  const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number; y: number } }) => {
    setIsDragging(false);
    const newX = x.get() + info.offset.x;
    const newY = y.get() + info.offset.y;
    x.set(newX);
    y.set(newY);
    onPositionChange({ x: newX, y: newY });
  }, [x, y, onPositionChange]);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMaximized) return;
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(MIN_WIDTH, startWidth + e.clientX - startX);
      const newHeight = Math.max(MIN_HEIGHT, startHeight + e.clientY - startY);
      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      onSizeChange(size);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isMaximized, size, onSizeChange]);

  const getAnimationProps = () => {
    switch (animationType) {
      case 'spring':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { 
            opacity: isMinimized ? 0 : 1, 
            scale: isMinimized ? 0.8 : 1,
          },
          exit: { opacity: 0, scale: 0.8 },
          transition: { type: 'spring' as const, stiffness: 400, damping: 30 },
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: isMinimized ? 0 : 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 },
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: { 
            opacity: isMinimized ? 0 : 1, 
            scale: isMinimized ? 0.5 : 1,
          },
          exit: { opacity: 0, scale: 0.5 },
          transition: { duration: 0.2 },
        };
      default:
        return {};
    }
  };

  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      {...getAnimationProps()}
      drag={!isMaximized}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseDown={onFocus}
      style={{
        zIndex,
        x: isMaximized ? 0 : springX,
        y: isMaximized ? 0 : springY,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? 'calc(100vh - 80px)' : size.height,
        position: 'absolute',
        top: isMaximized ? 32 : 0,
        left: isMaximized ? 0 : undefined,
      }}
      className={cn(
        'bg-card text-card-foreground rounded-lg shadow-2xl border border-border overflow-hidden flex flex-col',
        isDragging && 'cursor-grabbing',
        idleFloat && !isDragging && 'idle-float'
      )}
    >
      {/* Title Bar */}
      <div 
        className={cn(
          'h-10 bg-muted/50 border-b border-border flex items-center justify-between px-3 select-none',
          !isMaximized && 'cursor-grab'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium truncate max-w-[200px]">{title}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 hover:bg-muted"
            onClick={onMinimize}
            aria-label="Minimize"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 hover:bg-muted"
            onClick={onMaximize}
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? <Square className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 hover:bg-destructive hover:text-destructive-foreground"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.2) 50%)',
          }}
        />
      )}
    </motion.div>
  );
};
