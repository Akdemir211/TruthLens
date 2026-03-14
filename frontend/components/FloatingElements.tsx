'use client';

import { useEffect, useState } from 'react';


export default function FloatingElements() {
  const [mounted, setMounted] = useState(false);
  const [scanY, setScanY] = useState(0);

  useEffect(() => {
    setMounted(true);

    let start: number | null = null;
    let rafId: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      setScanY((elapsed % 10) / 10);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Scan line */}
      <div
        className="absolute inset-x-0 h-[1px]"
        style={{
          top: `${scanY * 100}%`,
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 20%, rgba(167,139,250,0.8) 50%, rgba(139,92,246,0.4) 80%, transparent 100%)',
          boxShadow: '0 0 12px rgba(139,92,246,0.3)',
          opacity: 0.25,
        }}
      />


      {/* Pulse rings */}
      <PulseRings top="35%" left="6%" delay={0} />
      <PulseRings top="65%" right="7%" delay={2} />

      {/* Hexagonal grid nodes */}
      <HexNodes />

      {/* Rising particles */}
      <Particles />

      {/* Corner accent gradients */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-10"
        style={{ background: 'radial-gradient(circle at top right, rgba(124,58,237,0.4), transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-tr-full opacity-10"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(109,40,217,0.4), transparent 70%)' }}
      />
    </div>
  );
}

function PulseRings({ top, left, right, delay }: { top: string; left?: string; right?: string; delay: number }) {
  return (
    <div className="absolute" style={{ top, left, right }}>
      <div className="relative">
        {[40, 70, 100].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-brand-500/10"
            style={{
              width: `${size}px`, height: `${size}px`,
              top: `${-(size - 8) / 2}px`, left: `${-(size - 8) / 2}px`,
              animationName: 'ringPulse',
              animationDuration: '4s',
              animationDelay: `${delay + i * 0.9}s`,
              animationTimingFunction: 'ease-out',
              animationIterationCount: 'infinite',
              animationFillMode: 'both',
            }}
          />
        ))}
        <div className="w-2 h-2 rounded-full bg-brand-500/25 border border-brand-500/30" />
      </div>
    </div>
  );
}

function HexNodes() {
  const nodes = [
    { x: '15%', y: '48%', size: 4, delay: 0 },
    { x: '82%', y: '33%', size: 3, delay: 1.2 },
    { x: '8%', y: '80%', size: 5, delay: 0.6 },
    { x: '88%', y: '72%', size: 3, delay: 2.1 },
    { x: '20%', y: '20%', size: 3, delay: 1.8 },
    { x: '78%', y: '15%', size: 4, delay: 0.3 },
  ];

  return (
    <>
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-brand-500/20"
          style={{
            left: node.x,
            top: node.y,
            width: `${node.size * 2 + 8}px`,
            height: `${node.size * 2 + 8}px`,
            animationName: 'ringPulse',
            animationDuration: '6s',
            animationDelay: `${node.delay}s`,
            animationTimingFunction: 'ease-out',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
          }}
        >
          <div
            className="absolute inset-[3px] rounded-full bg-brand-500/10"
          />
        </div>
      ))}
    </>
  );
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i / 18) * 100 + Math.sin(i) * 5}%`,
    size: 1 + (i % 3),
    duration: 7 + (i % 5) * 1.5,
    delay: (i % 8) * 1.2,
    opacity: 0.08 + (i % 4) * 0.05,
  }));

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: '-8px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `rgba(167, 139, 250, ${p.opacity})`,
            animationName: 'riseUp',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
      ))}
    </>
  );
}
