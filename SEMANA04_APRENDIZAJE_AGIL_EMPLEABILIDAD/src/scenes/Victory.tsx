import { useEffect } from "react";
import { motion } from "framer-motion";
import { Bot } from "@/components/Bot";
import { Confetti } from "@/components/Particles";
import { PixelButton, PixelPanel, Scene, Tag } from "@/components/ui";
import { INSTRUCTOR, TEAM, TONE_HEX, useGame } from "@/lib/game";

const KEYS = [
  { icon: "🔁", t: "CICLOS CORTOS", d: "Metas pequeñas, sprints de 1–2 semanas." },
  { icon: "🎤", t: "DEMO + FEEDBACK", d: "Muestra lo aprendido y escucha cada semana." },
  { icon: "🧭", t: "ADAPTA EL PLAN", d: "Si algo falla, cambia. El error también enseña." },
];

export function Victory() {
  const { xp, restart, sfx } = useGame();

  useEffect(() => {
    const t = setTimeout(() => sfx.fanfare(), 300);
    return () => clearTimeout(t);
  }, [sfx]);

  const rank = xp >= 310 ? "S" : xp >= 230 ? "A" : xp >= 150 ? "B" : "C";

  return (
    <Scene className="dots-bg">
      <Confetti />

      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <Bot size={240} mood="win" glow="fire" />
        </motion.div>

        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 14 }}
          className="mt-4 font-pixel text-[clamp(1.8rem,6vw,4.5rem)] leading-[1.3] text-lemon shadow-pixel-lg"
        >
          <span className="glitch" data-text="¡MISIÓN CUMPLIDA!">
            ¡MISIÓN CUMPLIDA!
          </span>
        </motion.h2>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 14 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <div className="pixel-box bg-navy px-8 py-6" style={{ ["--pb" as string]: "#ffe600" }}>
            <span className="block font-pixel text-xs text-amber md:text-sm">XP TOTAL</span>
            <span className="block font-pixel text-4xl text-lemon md:text-6xl">{String(xp).padStart(4, "0")}</span>
          </div>
          <div className="pixel-box bg-navy px-8 py-6" style={{ ["--pb" as string]: "#00e5ff" }}>
            <span className="block font-pixel text-xs text-amber md:text-sm">RANGO</span>
            <span className="block font-pixel text-4xl text-ice md:text-6xl animate-pulse-glow">{rank}</span>
          </div>
          <div className="pixel-box bg-fire px-8 py-6 text-black" style={{ ["--pb" as string]: "#000" }}>
            <span className="block font-pixel text-xs md:text-sm">TÍTULO</span>
            <span className="block font-pixel text-lg md:text-2xl">APRENDIZ ÁGIL</span>
          </div>
        </motion.div>

        {/* Claves */}
        <div className="mt-16 grid w-full gap-8 md:grid-cols-3">
          {KEYS.map((k, i) => (
            <motion.div
              key={k.t}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.2, type: "spring", stiffness: 200, damping: 16 }}
            >
              <PixelPanel tone={(["fire", "ice", "lemon"] as const)[i]} title={`CLAVE ${i + 1}`} className="h-full p-6 pt-8 md:p-8">
                <span className="block text-6xl animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                  {k.icon}
                </span>
                <p className="mt-4 font-pixel text-sm leading-relaxed text-cream md:text-base">{k.t}</p>
                <p className="mt-3 text-xl font-bold text-cream/85 md:text-2xl">{k.d}</p>
              </PixelPanel>
            </motion.div>
          ))}
        </div>

        {/* Créditos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-20 w-full"
        >
          <div className="mb-8 flex items-center justify-center gap-4">
            <Tag tone="cream">CRÉDITOS</Tag>
            <h3 className="font-pixel text-xl text-cream shadow-pixel md:text-3xl">SENATI · EQUIPO 4</h3>
          </div>
          <PixelPanel tone="amber" className="p-6 md:p-10">
            <p className="font-pixel text-xs text-amber md:text-sm">INSTRUCTOR</p>
            <p className="mt-3 text-2xl font-black text-cream md:text-3xl">{INSTRUCTOR}</p>
            <div className="my-8 h-1 w-full bg-black" />
            <p className="font-pixel text-xs text-amber md:text-sm">INTEGRANTES</p>
            <ul className="mt-5 grid gap-4 text-left md:grid-cols-2">
              {TEAM.map((m, i) => (
                <motion.li
                  key={m.n}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9 + i * 0.15 }}
                  className="flex items-center gap-4 border-4 border-black bg-ink/60 p-4"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center border-4 border-black font-pixel text-base text-black"
                    style={{ background: TONE_HEX[m.color] }}
                  >
                    {m.n}
                  </span>
                  <span className="text-xl font-black text-cream md:text-2xl">{m.name}</span>
                </motion.li>
              ))}
            </ul>
          </PixelPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="mt-14 flex flex-col items-center gap-5"
        >
          <p className="font-pixel text-base text-cream/70 animate-blink md:text-xl">GRACIAS POR JUGAR</p>
          <PixelButton size="xl" tone="fire" onClick={restart}>
            ↺ JUGAR DE NUEVO
          </PixelButton>
        </motion.div>
      </div>
    </Scene>
  );
}
