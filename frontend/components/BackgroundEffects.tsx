'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Nodes for neural network
    interface Node {
      x: number; y: number; vx: number; vy: number; radius: number; alpha: number;
    }

    const nodeCount = Math.min(60, Math.floor((width * height) / 20000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const connectionDist = 200;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Update + draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Pulse effect
        n.alpha += Math.sin(Date.now() * 0.001) * 0.003;
        n.alpha = Math.max(0.05, Math.min(0.6, n.alpha));

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${n.alpha})`;
        ctx.fill();

        // Outer glow ring on some nodes
        if (n.radius > 2) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(167, 139, 250, ${n.alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, `rgba(124, 58, 237, ${alpha})`);
            grad.addColorStop(0.5, `rgba(167, 139, 250, ${alpha * 1.5})`);
            grad.addColorStop(1, `rgba(124, 58, 237, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
