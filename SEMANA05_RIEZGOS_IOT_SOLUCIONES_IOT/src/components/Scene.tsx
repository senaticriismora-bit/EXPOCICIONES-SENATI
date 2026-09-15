import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export type Theme = { color: string; chaos: number };

/** Detects when an element is mostly on screen. */
export function useInView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= threshold),
      { threshold: [0, threshold, 0.9] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Scene({
  children,
  theme,
  onEnter,
  className,
  wide = false,
}: {
  children: ReactNode;
  theme: Theme;
  onEnter: (t: Theme) => void;
  className?: string;
  wide?: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>(0.5);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    if (inView) onEnter(themeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section
      ref={ref}
      className={cn(
        "no-bar relative flex h-full w-full snap-start snap-always overflow-y-auto px-5 py-10 sm:px-10",
        className,
      )}
    >
      <div
        className={cn(
          "reveal relative z-10 m-auto w-full",
          wide ? "max-w-[1500px]" : "max-w-[1180px]",
          inView && "is-in",
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, color = "#22d3ee" }: { children: ReactNode; color?: string }) {
  return (
    <div
      className="mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.3em] uppercase sm:text-xs"
      style={{ borderColor: color + "55", color, background: color + "12" }}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: color }} />
      {children}
    </div>
  );
}

export function BigTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-[clamp(2.1rem,6.4vw,5.4rem)] leading-[0.92] tracking-[-0.02em] text-white uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
}
