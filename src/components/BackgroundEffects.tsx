import React, { useEffect, useRef } from 'react';
import { Particle, drawHeart, drawSparkle, createBurst } from '../utils/particles';

interface BackgroundEffectsProps {
  burstTrigger?: number; // Increment this to trigger a burst
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ burstTrigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ambientHeartsRef = useRef<
    Array<{
      x: number;
      y: number;
      vy: number;
      vx: number;
      size: number;
      alpha: number;
      color: string;
      rotation: number;
      vRot: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Seed ambient floating hearts
    const AMBIENT_COUNT = Math.min(24, Math.floor(width / 35));
    const colors = ['#F4A6B8', '#FADADD', '#FFE4EC', '#E8C7A0'];

    ambientHeartsRef.current = Array.from({ length: AMBIENT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(0.3 + Math.random() * 0.7),
      vx: (Math.random() - 0.5) * 0.4,
      size: 8 + Math.random() * 12,
      alpha: 0.2 + Math.random() * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
    }));

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min(32, currentTime - lastTime);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw ambient floating hearts
      for (const heart of ambientHeartsRef.current) {
        heart.y += heart.vy * (dt / 16);
        heart.x += heart.vx * (dt / 16);
        heart.rotation += heart.vRot;

        if (heart.y < -30) {
          heart.y = height + 20;
          heart.x = Math.random() * width;
        }
        if (heart.x < -30) heart.x = width + 20;
        if (heart.x > width + 30) heart.x = -20;

        drawHeart(ctx, heart.x, heart.y, heart.size, heart.color, heart.alpha, heart.rotation);
      }

      // 2. Draw burst particles (active during celebration or surprise clicks)
      const activeBurst: Particle[] = [];
      for (const p of particlesRef.current) {
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.vy += 0.15; // gentle gravity
        p.rotation += p.vRot;
        p.alpha -= p.decay * (dt / 16);

        if (p.alpha > 0) {
          if (p.shape === 'heart') {
            drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
          } else if (p.shape === 'sparkle') {
            drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
          } else if (p.shape === 'ribbon') {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 6, p.size, p.size / 3);
            ctx.restore();
          } else {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          activeBurst.push(p);
        }
      }
      particlesRef.current = activeBurst;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Listen for burst trigger
  useEffect(() => {
    if (!burstTrigger || burstTrigger <= 0) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Launch bursts from both sides and center for a cinematic celebration
    const b1 = createBurst(width * 0.2, height * 0.4, 45);
    const b2 = createBurst(width * 0.5, height * 0.35, 60);
    const b3 = createBurst(width * 0.8, height * 0.4, 45);
    particlesRef.current = [...particlesRef.current, ...b1, ...b2, ...b3];
  }, [burstTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
