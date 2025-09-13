import React, { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  onSend: (dataUrl: string) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onSend }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDrawing(true);
    draw(e);
  };

  const handleMouseUp = () => setDrawing(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;
    draw(e);
  };

  const draw = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#111';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleSend = () => {
    const dataUrl = canvasRef.current?.toDataURL() || '';
    onSend(dataUrl);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={320}
        height={180}
        style={{ border: '2px solid #333', background: '#fff', borderRadius: '8px', cursor: 'crosshair' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      <div className="mt-2 flex gap-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleSend}>
          Send Drawing
        </button>
        <button className="px-3 py-1 bg-gray-400 text-white rounded" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;