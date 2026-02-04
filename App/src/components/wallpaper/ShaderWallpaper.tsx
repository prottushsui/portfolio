import React, { useMemo } from 'react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

export type ShaderPreset = 'water' | 'aurora' | 'fire' | 'cosmic' | 'minimal';

interface ShaderWallpaperProps {
  preset: ShaderPreset;
  isActive: boolean;
}

const shaderUrls: Record<ShaderPreset, string> = {
  water: 'https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=180&cDistance=2.9&cPolarAngle=120&cameraZoom=1&color1=%23ebedff&color2=%23f3f2f8&color3=%23dbf8ff&envPreset=city&fov=45&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=0.75&positionX=0&positionY=1.8&positionZ=0&reflection=0.05&rotationX=0&rotationY=0&rotationZ=-90&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.5&uFrequency=4.8&uSpeed=0.2&uStrength=3&uTime=0&wireframe=false',
  
  aurora: 'https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=270&cDistance=3.5&cPolarAngle=90&cameraZoom=1&color1=%2300ff88&color2=%2300ffff&color3=%23ff00ff&envPreset=city&fov=45&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=0.75&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=sphere&uAmplitude=2&uDensity=1&uFrequency=2&uSpeed=0.3&uStrength=2&uTime=0&wireframe=false',
  
  fire: 'https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.3&cAzimuthAngle=180&cDistance=3&cPolarAngle=60&cameraZoom=1&color1=%23ff4400&color2=%23ff8800&color3=%23ffcc00&envPreset=city&fov=45&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=0.75&positionX=0&positionY=0&positionZ=0&reflection=0.15&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=plane&uAmplitude=1.5&uDensity=2&uFrequency=3&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false',
  
  cosmic: 'https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%230a0a1a&bgColor2=%23000000&brightness=0.8&cAzimuthAngle=180&cDistance=4&cPolarAngle=45&cameraZoom=0.8&color1=%236600ff&color2=%230033ff&color3=%23ff00cc&envPreset=city&fov=60&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=0.6&positionX=0&positionY=0&positionZ=0&reflection=0.2&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=sphere&uAmplitude=3&uDensity=0.5&uFrequency=1.5&uSpeed=0.1&uStrength=5&uTime=0&wireframe=false',
  
  minimal: 'https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23ffffff&bgColor2=%23f5f5f5&brightness=1&cAzimuthAngle=180&cDistance=5&cPolarAngle=90&cameraZoom=1&color1=%23e0e0e0&color2=%23f0f0f0&color3=%23ffffff&envPreset=city&fov=45&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.05&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=plane&uAmplitude=0&uDensity=1&uFrequency=1&uSpeed=0.1&uStrength=1&uTime=0&wireframe=false',
};

export const ShaderWallpaper: React.FC<ShaderWallpaperProps> = ({ preset, isActive }) => {
  const urlString = useMemo(() => shaderUrls[preset], [preset]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-0">
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <ShaderGradient control="query" urlString={urlString} />
      </ShaderGradientCanvas>
    </div>
  );
};
