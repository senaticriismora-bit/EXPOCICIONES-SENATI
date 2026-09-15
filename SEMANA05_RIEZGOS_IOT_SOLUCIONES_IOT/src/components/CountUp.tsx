import { useEffect, useRef, useState } from "react";

export default function CountUp({
  to,
  run,
  duration = 1700,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  run: boolean;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [run, to, duration]);

  const text = val.toLocaleString("es-PE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className="tabular-nums">
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
