import React, { useRef, useEffect, useState } from 'react';
import { transformCross } from '../utils/transformUtils';
import SymmetryButton from './SymmetryButton';
import '../styles/SquareSymmetry.css';

const CANVAS_SIZE = 400; // Increase this value to make the canvas bigger
const SQUARE_SIZE = 100; // You can adjust this as needed

type SymmetryOperation = 'rotate90' | 'rotate180' | 'rotate270' | 'reflectVertical' | 'reflectHorizontal' | 'reflectDiagonal1' | 'reflectDiagonal2';

const SquareSymmetry: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(0);
  const [size, setSize] = useState(100);
  const [reflectVertical, setReflectVertical] = useState(false);
  const [reflectHorizontal, setReflectHorizontal] = useState(false);
  const [reflectDiagonal1, setReflectDiagonal1] = useState(false);
  const [reflectDiagonal2, setReflectDiagonal2] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        transformCross(ctx, size, angle, reflectVertical, reflectHorizontal, reflectDiagonal1, reflectDiagonal2);
      }
    }
  }, [angle, size, reflectVertical, reflectHorizontal, reflectDiagonal1, reflectDiagonal2]);

  const handleReset = () => {
    setAngle(0);
    setSize(100);
    setReflectVertical(false);
    setReflectHorizontal(false);
    setReflectDiagonal1(false);
    setReflectDiagonal2(false);
  };

  const handleSymmetryOperation = (operation: SymmetryOperation) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    switch (operation) {
      case 'rotate90':
      case 'rotate180':
      case 'rotate270':
        transformCross(ctx, SQUARE_SIZE, parseInt(operation.slice(6)));
        break;
      case 'reflectVertical':
        transformCross(ctx, SQUARE_SIZE, 0, true, false, false, false);
        break;
      case 'reflectHorizontal':
        transformCross(ctx, SQUARE_SIZE, 0, false, true, false, false);
        break;
      case 'reflectDiagonal1':
        transformCross(ctx, SQUARE_SIZE, 0, false, false, true, false);
        break;
      case 'reflectDiagonal2':
        transformCross(ctx, SQUARE_SIZE, 0, false, false, false, true);
        break;
    }
  };

  return (
    <div className="square-symmetry">
      <h1 className="title">8-Pointed Star: Islamic Geometric Pattern</h1>
      <h2 className="subtitle">Symmetry Visualizer</h2>
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      <div className="button-container">
        <SymmetryButton onClick={() => handleSymmetryOperation('rotate90')} label="Rotate 90°" />
        <SymmetryButton onClick={() => handleSymmetryOperation('rotate180')} label="Rotate 180°" />
        <SymmetryButton onClick={() => handleSymmetryOperation('rotate270')} label="Rotate 270°" />
        <SymmetryButton onClick={() => handleSymmetryOperation('reflectVertical')} label="Vertical Reflection" />
        <SymmetryButton onClick={() => handleSymmetryOperation('reflectHorizontal')} label="Horizontal Reflection" />
        <SymmetryButton onClick={() => handleSymmetryOperation('reflectDiagonal1')} label="Diagonal Reflection 1 (45°)" />
        <SymmetryButton onClick={() => handleSymmetryOperation('reflectDiagonal2')} label="Diagonal Reflection 2 (-45°)" />
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default SquareSymmetry;