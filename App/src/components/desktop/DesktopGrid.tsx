import React, { useState, useCallback } from 'react';
import { DesktopIcon } from './DesktopIcon';
// DesktopGrid component

interface DesktopGridProps {
  icons: Array<{
    id: string;
    title: string;
    icon: string;
    onClick: () => void;
    onDoubleClick: () => void;
  }>;
  hoverEffect?: 'tilt' | 'shake' | 'scale' | 'none';
}

const GRID_COLS = 2;
const CELL_WIDTH = 100;
const CELL_HEIGHT = 100;

export const DesktopGrid: React.FC<DesktopGridProps> = ({
  icons,
  hoverEffect = 'tilt',
}) => {
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    icons.forEach((icon, index) => {
      const col = index % GRID_COLS;
      const row = Math.floor(index / GRID_COLS);
      positions[icon.id] = {
        x: 20 + col * CELL_WIDTH,
        y: 60 + row * CELL_HEIGHT,
      };
    });
    return positions;
  });

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handlePositionChange = useCallback((id: string, pos: { x: number; y: number }) => {
    setIconPositions(prev => ({ ...prev, [id]: pos }));
  }, []);

  const handleIconClick = useCallback((id: string, onClick: () => void) => {
    setSelectedIcon(id);
    onClick();
  }, []);

  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  }, []);

  return (
    <div 
      className="absolute inset-0 p-4"
      onClick={handleDesktopClick}
    >
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          title={icon.title}
          icon={icon.icon}
          position={iconPositions[icon.id] || { x: 0, y: 0 }}
          onClick={() => handleIconClick(icon.id, icon.onClick)}
          onDoubleClick={icon.onDoubleClick}
          onPositionChange={(pos) => handlePositionChange(icon.id, pos)}
          hoverEffect={hoverEffect}
          isSelected={selectedIcon === icon.id}
        />
      ))}
    </div>
  );
};
