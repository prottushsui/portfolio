import React, { useEffect, useRef, useCallback } from 'react';

export type ParticleType = 'leaves' | 'snow' | 'dust' | 'stars' | 'none';

interface ParticleWallpaperProps {
  type: ParticleType;
  isActive: boolean;
  density?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export const ParticleWallpaper: React.FC<ParticleWallpaperProps> = ({ 
  type, 
  isActive, 
  density = 50 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);

  const createParticle = useCallback((canvasWidth: number, canvasHeight: number): Particle => {
    if (type === 'none') {
      return {
        x: 0, y: 0, vx: 0, vy: 0, size: 0, opacity: 0, rotation: 0, rotationSpeed: 0
      };
    }
    const size = type === 'stars' ? Math.random() * 2 + 0.5 : Math.random() * 4 + 2;
    return {
      x: Math.random() * canvasWidth,
      y: type === 'snow' || type === 'leaves' ? -size : Math.random() * canvasHeight,
      vx: (Math.random() - 0.5) * (type === 'stars' ? 0.1 : 1),
      vy: type === 'snow' ? Math.random() * 2 + 0.5 :
          type === 'leaves' ? Math.random() * 1 + 0.3 :
          type === 'stars' ? 0 :
          (Math.random() - 0.5) * 0.5,
      size,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    };
  }, [type]);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    particlesRef.current = [];
    for (let i = 0; i < density; i++) {
      particlesRef.current.push(createParticle(canvas.width, canvas.height));
    }
  }, [density, createParticle]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);
    ctx.globalAlpha = particle.opacity;

    if (type === 'none') return;
    
    switch (type) {
      case 'snow':
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;
      
      case 'leaves':
        ctx.fillStyle = `hsl(${30 + Math.sin(Date.now() * 0.001) * 30}, 70%, 50%)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.size, particle.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      
      case 'dust':
        ctx.fillStyle = 'rgba(200, 200, 200, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;
      
      case 'stars':
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        // Add sparkle effect
        if (Math.random() > 0.99) {
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(0, 0, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
    }

    ctx.restore();
  }, [type]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.map(particle => {
      let newX = particle.x + particle.vx;
      let newY = particle.y + particle.vy;

      // Wrap around horizontally
      if (newX < -particle.size) newX = canvas.width + particle.size;
      if (newX > canvas.width + particle.size) newX = -particle.size;

      // Reset vertically for falling particles
      if ((type === 'snow' || type === 'leaves') && newY > canvas.height + particle.size) {
        newY = -particle.size;
        newX = Math.random() * canvas.width;
      }

      // Wrap vertically for dust
      if (type === 'dust') {
        if (newY < -particle.size) newY = canvas.height + particle.size;
        if (newY > canvas.height + particle.size) newY = -particle.size;
      }

      // Add sway for leaves
      if (type === 'leaves') {
        particle.vx += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.02;
      }

      const updatedParticle = {
        ...particle,
        x: newX,
        y: newY,
        rotation: particle.rotation + particle.rotationSpeed,
      };

      drawParticle(ctx, updatedParticle);
      return updatedParticle;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [type, drawParticle]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, animate, initParticles]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: type === 'stars' ? 'screen' : 'normal' }}
    />
  );
};
