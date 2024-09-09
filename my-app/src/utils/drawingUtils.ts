export function drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.fillStyle = '#3498db';
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
  }
  
  export function drawLighterSquare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
  }
  
  export function drawSymmetryLine(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
  }

  export function drawOverlappingSquares(ctx: CanvasRenderingContext2D, size: number) {
    // Use an opaque color for both squares
    const color = 'rgb(52, 152, 219)';  // Light blue, fully opaque

    // Set the global composite operation to ensure uniform color
    ctx.globalCompositeOperation = 'source-over';

    // Draw the first square
    ctx.beginPath();
    ctx.rect(-size / 2, -size / 2, size, size);
    ctx.fillStyle = color;
    ctx.fill();

    // Draw the second square rotated 45 degrees
    ctx.save();
    ctx.rotate(Math.PI / 4);
    ctx.beginPath();
    ctx.rect(-size / 2, -size / 2, size, size);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();

    // Reset the global composite operation
    ctx.globalCompositeOperation = 'source-over';
  }

  export function drawDiagonals(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    ctx.moveTo(-size / 2, -size / 2);
    ctx.lineTo(size / 2, size / 2);
    ctx.moveTo(size / 2, -size / 2);
    ctx.lineTo(-size / 2, size / 2);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.stroke();
  }