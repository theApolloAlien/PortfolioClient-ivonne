"use client";

import * as React from "react";

/* Petals — N randomized SVG petals falling (ds-petal-fall). Generated after
   mount so the random layout never causes an SSR hydration mismatch. */

const PETAL_COLORS = ["var(--blush)", "var(--rose-soft)", "var(--rose-mid)", "#F6D2D6", "var(--rose)"];

type Petal = { left: number; delay: number; dur: number; scale: number; rot: number; color: string };

export function Petals({ count = 14, className = "" }: { count?: number; className?: string }) {
  const [petals, setPetals] = React.useState<Petal[]>([]);

  React.useEffect(() => {
    setPetals(
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: -Math.random() * 18,
        dur: 12 + Math.random() * 13,
        scale: 0.55 + Math.random() * 0.95,
        rot: Math.random() * 360,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
      }))
    );
  }, [count]);

  return (
    <div className={`petals ${className}`} aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}
        >
          <svg viewBox="0 0 20 26" width="18" height="24" style={{ transform: `scale(${p.scale}) rotate(${p.rot}deg)` }}>
            <path d="M10 0 C16 7 17 16 10 26 C3 16 4 7 10 0 Z" fill={p.color} />
          </svg>
        </span>
      ))}
    </div>
  );
}
