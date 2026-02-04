import React from 'react';
import { motion } from 'framer-motion';

export type GradientPreset = 'subtle' | 'vibrant' | 'sunset' | 'ocean' | 'forest';

interface GradientWallpaperProps {
  preset: GradientPreset;
  isActive: boolean;
}

const gradientStyles: Record<GradientPreset, React.CSSProperties> = {
  subtle: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  vibrant: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  sunset: {
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
  },
  ocean: {
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  forest: {
    background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  },
};

export const GradientWallpaper: React.FC<GradientWallpaperProps> = ({ preset, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-0"
      style={gradientStyles[preset]}
    />
  );
};
