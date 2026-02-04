import React, { useMemo } from 'react';
import { ShaderWallpaper, type ShaderPreset } from './ShaderWallpaper';
import { GradientWallpaper, type GradientPreset } from './GradientWallpaper';
import { ParticleWallpaper, type ParticleType } from './ParticleWallpaper';

export type WallpaperType = 'shader' | 'gradient' | 'particle' | 'solid';

interface WallpaperManagerProps {
  type: WallpaperType;
  preset: ShaderPreset | GradientPreset | ParticleType;
  isDark: boolean;
  particleEffect?: ParticleType;
  isMobile?: boolean;
}

export const WallpaperManager: React.FC<WallpaperManagerProps> = ({
  type,
  preset,
  isDark,
  particleEffect = 'none',
  isMobile = false,
}) => {
  // Use gradient fallback for mobile or low-end devices
  const effectiveType = useMemo(() => {
    if (isMobile && type === 'shader') return 'gradient';
    return type;
  }, [type, isMobile]);

  const effectivePreset = useMemo(() => {
    if (isMobile && type === 'shader') return 'subtle' as GradientPreset;
    return preset;
  }, [preset, type, isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base wallpaper */}
      {effectiveType === 'shader' && (
        <ShaderWallpaper preset={effectivePreset as ShaderPreset} isActive={true} />
      )}
      
      {effectiveType === 'gradient' && (
        <GradientWallpaper preset={effectivePreset as GradientPreset} isActive={true} />
      )}
      
      {effectiveType === 'particle' && (
        <ParticleWallpaper type={effectivePreset as ParticleType} isActive={true} density={30} />
      )}
      
      {effectiveType === 'solid' && (
        <div 
          className="absolute inset-0 z-0"
          style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
        />
      )}

      {/* Particle overlay */}
      {particleEffect !== 'none' && (
        <ParticleWallpaper type={particleEffect} isActive={true} density={25} />
      )}
    </div>
  );
};
