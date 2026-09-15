import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Heart } from "lucide-react";
import { DEVICES, INSTRUCTOR, LAYERS, SERVICES, TEAM } from "../../data/content";
import { BackButton } from "../ui/Controls";

function Counter({ to, label, color, delay }: { to: number; label: string; color: string; delay: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now() + delay * 1000;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / 1200));
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, delay]);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="glass rounded-3xl px-6 py-5 text-center md:px-10 md:py-7" style={{ boxShadow: `0 0 60px ${color}33` }}>
      <div className="font-display text-6xl font-black md:text-8xl" style={{ color, textShadow: `0 0 30px ${color}88` }}>{v}</div>
      <div className="mt-1 text-sm font-bold uppercase tracking-[0.3em] text-white/70 md:text-base">{label}</div>
    </motion.div>
  );
}

export default function Outro({ onRestart, onBack }: { onRestart: () => void; onBack: () => void }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center overflow-hidden p-6 md:p-10">
      <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/75 to-night/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.2),transparent_60%)]" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-sm font-bold uppercase tracking-[0.5em] text-fuchsia-300 md:text-base">
          05 · Conclusión
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(1.8rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight text-white"
        >
          Una Smart City no es solo tecnología:
          <br />
          <span className="text-glow">son personas viviendo mejor.</span>
        </motion.h2>

        <div className="flex flex-wrap items-stretch justify-center gap-4">
          <Counter to={DEVICES.length} label="dispositivos" color="#a3e635" delay={0.5} />
          <Counter to={SERVICES.length} label="servicios" color="#fbbf24" delay={0.7} />
          <Counter to={LAYERS.length} label="capas" color="#a855f7" delay={0.9} />
          <Counter to={1} label="ciudad conectada" color="#22d3ee" delay={1.1} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="flex flex-col items-center gap-3">
          <p className="font-display flex items-center gap-2 text-3xl font-black text-white md:text-5xl">
            ¡Gracias! <Heart className="h-8 w-8 fill-rose-400 text-rose-400 md:h-10 md:w-10" />
          </p>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/60">Equipo 4 · Instructor: {INSTRUCTOR.first} {INSTRUCTOR.second}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TEAM.map((m, i) => (
              <motion.span
                key={m.n}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + i * 0.1 }}
                className="glass font-display rounded-full px-4 py-2 text-sm font-bold text-white md:text-base"
              >
                <span className="text-glow mr-2">{m.n}</span>
                {m.first} {m.second}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRestart}
          className="pointer-events-auto font-display inline-flex items-center gap-3 rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 text-lg font-extrabold text-white backdrop-blur-md transition hover:bg-white/15 md:text-xl"
        >
          <RotateCcw className="h-6 w-6" strokeWidth={2.5} /> Volver al inicio
        </motion.button>
      </div>

      <BackButton onClick={onBack} />
    </div>
  );
}
