import { drawOverlappingSquares } from './drawingUtils';

// Easing function for smooth animation
function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function transformCross(
  ctx: CanvasRenderingContext2D, 
  size: number, 
  angle: number,
  reflectVertical: boolean = false,
  reflectHorizontal: boolean = false,
  reflectDiagonal1: boolean = false,
  reflectDiagonal2: boolean = false
) {
  const frames = 60;
  let currentFrame = 0;

  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  const centerX = 200;
  const centerY = 200;

  function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.save();
    ctx.translate(centerX, centerY);
    
    if (reflectVertical) {
      ctx.scale(Math.cos(currentFrame / frames * Math.PI), 1);
    } else if (reflectHorizontal) {
      ctx.scale(1, Math.cos(currentFrame / frames * Math.PI));
    } else if (reflectDiagonal1) {
      ctx.rotate(Math.PI / 4);
      ctx.scale(1, Math.cos(currentFrame / frames * Math.PI));
      ctx.rotate(-Math.PI / 4);
    } else if (reflectDiagonal2) {
      ctx.rotate(-Math.PI / 4);
      ctx.scale(Math.cos(currentFrame / frames * Math.PI), 1);
      ctx.rotate(Math.PI / 4);
    } else {
      // Use easing function for smooth rotation
      const progress = currentFrame / frames;
      const easedProgress = easeInOutQuad(progress);
      ctx.rotate(easedProgress * (angle * Math.PI / 180));
    }
    
    drawOverlappingSquares(ctx, size);

    ctx.restore();

    // Draw reflection lines
    ctx.setLineDash([5, 5]); // Dashed lines for reflection
    
    if (reflectVertical) {
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, canvasHeight);
      ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
      ctx.stroke();
    }

    if (reflectHorizontal) {
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvasWidth, centerY);
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
      ctx.stroke();
    }

    if (reflectDiagonal1) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.strokeStyle = 'rgba(255, 165, 0, 0.5)'; // Orange
      ctx.stroke();
    }

    if (reflectDiagonal2) {
      ctx.beginPath();
      ctx.moveTo(canvasWidth, 0);
      ctx.lineTo(0, canvasHeight);
      ctx.strokeStyle = 'rgba(128, 0, 128, 0.5)'; // Purple
      ctx.stroke();
    }

    ctx.setLineDash([]); // Reset to solid lines

    currentFrame++;

    if (currentFrame < frames) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

export function reflectSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  direction: 'horizontal' | 'vertical' | 'diagonal1' | 'diagonal2'
) {
  const frames = 30;
  let currentFrame = 0;

  function animate() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    ctx.translate(x + size / 2, y + size / 2);
    
    switch (direction) {
      case 'horizontal':
        ctx.scale(1 - (currentFrame / frames) * 2, 1);
        break;
      case 'vertical':
        ctx.scale(1, 1 - (currentFrame / frames) * 2);
        break;
      case 'diagonal1':
        ctx.rotate(Math.PI / 4);
        ctx.scale(1, 1 - (currentFrame / frames) * 2);
        ctx.rotate(-Math.PI / 4);
        break;
      case 'diagonal2':
        ctx.rotate(-Math.PI / 4);
        ctx.scale(1 - (currentFrame / frames) * 2, 1);
        ctx.rotate(Math.PI / 4);
        break;
    }
    
    drawOverlappingSquares(ctx, size);
    ctx.restore();

    currentFrame++;

    if (currentFrame <= frames) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

