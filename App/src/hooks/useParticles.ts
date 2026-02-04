import { useState, useEffect, useRef, useCallback } from 'react';
import type { ParticleConfig } from '@/types';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

interface UseParticlesReturn {
  particles: Particle[];
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startParticles: () => void;
  stopParticles: () => void;
  isRunning: boolean;
}

export function useParticles(config: ParticleConfig): UseParticlesReturn {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticle = useCallback((canvasWidth: number, canvasHeight: number): Particle => {
    if (config.type === 'none') {
      return {
        id: Math.random(),
        x: 0, y: 0, vx: 0, vy: 0, size: 0, opacity: 0, rotation: 0, rotationSpeed: 0
      };
    }
    const size = Math.random() * config.size + 2;
    return {
      id: Math.random(),
      x: Math.random() * canvasWidth,
      y: config.type === 'snow' ? -size : Math.random() * canvasHeight,
      vx: (Math.random() - 0.5) * config.speed,
      vy: config.type === 'snow' ? Math.random() * config.speed + 1 : 
          config.type === 'leaves' ? Math.random() * config.speed * 0.5 + 0.5 :
          (Math.random() - 0.5) * config.speed,
      size,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    };
  }, [config]);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newParticles: Particle[] = [];
    for (let i = 0; i < config.count; i++) {
      newParticles.push(createParticle(canvas.width, canvas.height));
    }
    particlesRef.current = newParticles;
    setParticles(newParticles);
  }, [config.count, createParticle]);

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = particlesRef.current.map(particle => {
      let newX = particle.x + particle.vx;
      let newY = particle.y + particle.vy;
      let newVx = particle.vx;
      let newVy = particle.vy;

      // Wrap around horizontally
      if (newX < -particle.size) newX = canvas.width + particle.size;
      if (newX > canvas.width + particle.size) newX = -particle.size;

      // Reset vertically for snow/leaves
      if (config.type === 'snow' && newY > canvas.height + particle.size) {
        newY = -particle.size;
        newX = Math.random() * canvas.width;
      }
      if (config.type === 'leaves' && newY > canvas.height + particle.size) {
        newY = -particle.size;
        newX = Math.random() * canvas.width;
      }

      // Wrap vertically for dust
      if (config.type === 'dust') {
        if (newY < -particle.size) newY = canvas.height + particle.size;
        if (newY > canvas.height + particle.size) newY = -particle.size;
      }

      // Add some sway for leaves
      if (config.type === 'leaves') {
        newVx += Math.sin(Date.now() * 0.001 + particle.id) * 0.1;
      }

      return {
        ...particle,
        x: newX,
        y: newY,
        vx: newVx,
        vy: newVy,
        rotation: particle.rotation + particle.rotationSpeed,
      };
    });

    setParticles([...particlesRef.current]);
  }, [config.type]);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.globalAlpha = particle.opacity;

      if (config.type === 'snow') {
        // Draw snowflake
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (config.type === 'leaves') {
        // Draw leaf
        ctx.fillStyle = `hsl(${30 + Math.random() * 60}, 70%, 50%)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.size, particle.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (config.type === 'dust') {
        // Draw dust particle
        ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }, [config.type]);

  const animate = useCallback(() => {
    updateParticles();
    drawParticles();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  const startParticles = useCallback(() => {
    if (config.type === 'none') return;
    initParticles();
    setIsRunning(true);
    animate();
  }, [config.type, initParticles, animate]);

  const stopParticles = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsRunning(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      stopParticles();
    };
  }, [initParticles, stopParticles]);

  useEffect(() => {
    if (isRunning && config.type !== 'none') {
      startParticles();
    } else {
      stopParticles();
    }
    return () => stopParticles();
  }, [config.type, config.count, config.speed, config.size]);

  return {
    particles,
    canvasRef,
    startParticles,
    stopParticles,
    isRunning,
  };
}
