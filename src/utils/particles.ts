/**
 * High-performance lightweight canvas particle system
 * Provides romantic floating hearts/sparkles and burst confetti
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  shape: 'heart' | 'circle' | 'sparkle' | 'ribbon';
  rotation: number;
  vRot: number;
}

export function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.fillStyle = color;

  const topCurveHeight = size * 0.3;
  ctx.beginPath();
  ctx.moveTo(0, topCurveHeight);
  // top left curve
  ctx.bezierCurveTo(
    -size / 2, -size / 2,
    -size, size / 3,
    0, size
  );
  // top right curve
  ctx.bezierCurveTo(
    size, size / 3,
    size / 2, -size / 2,
    0, topCurveHeight
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.fillStyle = color;

  ctx.beginPath();
  // 4-pointed gentle star
  ctx.moveTo(0, -size);
  ctx.quadraticCurveTo(0, 0, size, 0);
  ctx.quadraticCurveTo(0, 0, 0, size);
  ctx.quadraticCurveTo(0, 0, -size, 0);
  ctx.quadraticCurveTo(0, 0, 0, -size);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

const CELEBRATION_COLORS = [
  '#F4A6B8', // Rose pink
  '#C65B7C', // Deep rose
  '#FADADD', // Blush pink
  '#E8C7A0', // Champagne
  '#FFFFFF', // Soft white
  '#FFB6C1', // Light pink
  '#DDA0DD', // Lavender touch
];

export function createBurst(originX: number, originY: number, count: number = 70): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    const color = CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)];
    const shapes: Particle['shape'][] = ['heart', 'heart', 'sparkle', 'ribbon', 'circle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3.5, // slight upward boost
      size: 6 + Math.random() * 12,
      color,
      alpha: 1,
      decay: 0.007 + Math.random() * 0.012,
      shape,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.15,
    });
  }
  return particles;
}
