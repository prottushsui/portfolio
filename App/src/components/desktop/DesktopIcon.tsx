import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
  onClick: () => void;
  onDoubleClick: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  hoverEffect?: 'tilt' | 'shake' | 'scale' | 'none';
  isSelected?: boolean;
}

const GRID_SIZE = 80;

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id: _id,
  title,
  icon,
  position,
  onClick,
  onDoubleClick,
  onPositionChange,
  hoverEffect = 'tilt',
  isSelected = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);
  
  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });

  const snapToGrid = useCallback((value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  }, []);

  const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number; y: number } }) => {
    setIsDragging(false);
    const newX = snapToGrid(x.get() + info.offset.x);
    const newY = snapToGrid(y.get() + info.offset.y);
    x.set(newX);
    y.set(newY);
    onPositionChange({ x: newX, y: newY });
  }, [x, y, onPositionChange, snapToGrid]);

  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'tilt':
        return {
          rotateX: isHovered ? 10 : 0,
          rotateY: isHovered ? -10 : 0,
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0, 0, 0, 0.2)' 
            : '0 4px 6px rgba(0, 0, 0, 0.1)',
        };
      case 'shake':
        return {
          rotate: isHovered ? [0, -5, 5, -5, 5, 0] : 0,
          scale: isHovered ? 1.1 : 1,
        };
      case 'scale':
        return {
          scale: isHovered ? 1.15 : 1,
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={iconRef}
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        x: springX,
        y: springY,
        position: 'absolute',
      }}
      animate={getHoverAnimation()}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer select-none w-20',
        'transition-colors duration-200',
        isSelected && 'bg-primary/20 ring-2 ring-primary/50',
        !isSelected && 'hover:bg-muted/50',
        isDragging && 'cursor-grabbing z-50'
      )}
      role="button"
      tabIndex={0}
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onDoubleClick();
        }
      }}
    >
      <motion.div 
        className="text-4xl filter drop-shadow-md"
        style={{ perspective: 500 }}
      >
        {icon}
      </motion.div>
      <span className="text-xs text-center font-medium text-foreground/90 line-clamp-2 bg-background/80 px-1 rounded">
        {title}
      </span>
    </motion.div>
  );
};
