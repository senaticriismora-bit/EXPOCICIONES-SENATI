import { useMemo } from "react";

const COLORS = ["#ff6a00", "#ffe600", "#00e5ff", "#ff2d55", "#ffb000"];

/** Píxeles flotando hacia arriba (fondo). */
export function Particles({ count = 22 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 12,
        delay: -Math.random() * 14,
        duration: 10 + Math.random() * 10,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 block animate-drift"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 12px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

/** Confeti cayendo (victoria). */
export function Confetti({ count = 60 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        w: 8 + Math.random() * 10,
        h: 8 + Math.random() * 18,
        delay: -Math.random() * 4,
        duration: 2.8 + Math.random() * 2.5,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 block animate-confetti"
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.h,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
