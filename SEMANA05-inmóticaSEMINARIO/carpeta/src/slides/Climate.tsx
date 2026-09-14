import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { images } from "../assets/media";

const MODES = [
  { id: "frio", name: "FRÍO", color: "#3ee0ff" },
  { id: "auto", name: "AUTO", color: "#ffffff" },
  { id: "calor", name: "CALOR", color: "#ff7a1a" },
];

export default function Climate() {
  const [temp, setTemp] = useState(22);
  const [mode, setMode] = useState("auto");
  const active = MODES.find((m) => m.id === mode)!;

  const t = Math.min(30, Math.max(16, temp));
  const pct = (t - 16) / 14;
  const angle = pct * 270;
  const r = 118;
  const rad = ((angle - 135) * Math.PI) / 180;
  const cx = 140 + r * Math.cos(rad);
  const cy = 140 + r * Math.sin(rad);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: 8 + ((i * 17) % 84),
        delay: (i % 7) * 0.35,
        size: 6 + (i % 5) * 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src={images.climate} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background:
            mode === "frio"
              ? "linear-gradient(to top, rgba(8,30,50,0.82), rgba(10,20,30,0.45))"
              : mode === "calor"
                ? "linear-gradient(to top, rgba(50,18,8,0.82), rgba(30,16,8,0.4))"
                : "linear-gradient(to top, rgba(8,10,16,0.78), rgba(8,10,16,0.35))",
        }}
      />

      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-8%",
            width: p.size,
            height: p.size,
            background: active.color,
            opacity: 0.35,
            animation: `floaty ${3 + (p.id % 3)}s ${p.delay}s ease-in-out infinite`,
            boxShadow: `0 0 16px ${active.color}`,
          }}
        />
      ))}

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <p className="text-xl tracking-[0.5em] sm:text-2xl" style={{ color: active.color }}>
          CLIMA INTELIGENTE
        </p>
        <h2 className="font-display mt-1 text-[12vw] text-white sm:text-[7vw]">CONFORT</h2>

        <div className="mt-4 flex items-center gap-8 sm:gap-14">
          <button
            onClick={() => setTemp((x) => Math.max(16, x - 1))}
            className="font-display h-20 w-20 rounded-full border border-white/20 bg-white/10 text-6xl text-white sm:h-24 sm:w-24 sm:text-7xl"
          >
            –
          </button>

          <div className="relative h-[280px] w-[280px]">
            <svg viewBox="0 0 280 280" className="h-full w-full">
              <circle cx="140" cy="140" r="118" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="16" />
              <circle
                cx="140"
                cy="140"
                r="118"
                fill="none"
                stroke={active.color}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${pct * 741} 741`}
                transform="rotate(135 140 140)"
              />
              <circle cx={cx} cy={cy} r="12" fill={active.color} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-display text-[7rem] leading-none text-white">{t}°</p>
              <p className="text-2xl tracking-[0.3em]" style={{ color: active.color }}>
                {active.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => setTemp((x) => Math.min(30, x + 1))}
            className="font-display h-20 w-20 rounded-full border border-white/20 bg-white/10 text-6xl text-white sm:h-24 sm:w-24 sm:text-7xl"
          >
            +
          </button>
        </div>

        <div className="mt-8 flex gap-3">
          {MODES.map((m) => (
            <motion.button
              key={m.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setMode(m.id)}
              className="font-display rounded-2xl px-8 py-4 text-4xl"
              style={{
                background: mode === m.id ? m.color : "rgba(0,0,0,0.4)",
                color: mode === m.id ? "#111" : "white",
              }}
            >
              {m.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
