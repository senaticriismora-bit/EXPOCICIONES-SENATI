import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot } from "@/components/Bot";
import { Particles } from "@/components/Particles";
import { FloatText, LevelTitle, PixelButton, Scene, Tag } from "@/components/ui";
import { TONE_HEX, useGame, type Tone } from "@/lib/game";

const POWERUPS: { icon: string; name: string; desc: string; tone: Tone; stat: string }[] = [
  {
    icon: "⚡",
    name: "ITERACIÓN",
    desc: "Sprints de 1 a 2 semanas con metas pequeñas y claras.",
    tone: "fire",
    stat: "+ VELOCIDAD",
  },
  {
    icon: "🔁",
    name: "FEEDBACK",
    desc: "Retroalimentación rápida y constante: no espero al examen.",
    tone: "ice",
    stat: "+ PRECISIÓN",
  },
  {
    icon: "🤝",
    name: "COLABORACIÓN",
    desc: "Aprendo en equipo, con roles claros y ayuda mutua.",
    tone: "lemon",
    stat: "+ ENERGÍA",
  },
  {
    icon: "🧭",
    name: "ADAPTACIÓN",
    desc: "Si algo falla, cambio el plan sin miedo. El error enseña.",
    tone: "hot",
    stat: "+ DEFENSA",
  },
];

export function Pillars() {
  const { next, addXp, sfx } = useGame();
  const [revealed, setRevealed] = useState<boolean[]>(POWERUPS.map(() => false));
  const revealedRef = useRef<boolean[]>(POWERUPS.map(() => false));
  const [floats, setFloats] = useState<number[]>([]);
  const total = revealed.filter(Boolean).length;
  const all = total === POWERUPS.length;

  const reveal = (i: number) => {
    if (revealedRef.current[i]) return;
    const nextState = [...revealedRef.current];
    nextState[i] = true;
    revealedRef.current = nextState;
    setRevealed(nextState);
    setFloats((f) => [...f, i]);
    addXp(25);
    if (nextState.every(Boolean)) sfx.success();
    else sfx.coin();
  };

  const revealAll = () => {
    POWERUPS.forEach((_, i) => setTimeout(() => reveal(i), i * 250));
  };

  return (
    <Scene className="dots-bg">
      <Particles count={12} />
      <LevelTitle
        kicker="NIVEL 2 · POWER-UPS"
        title="LOS 4 PILARES DEL APRENDIZ ÁGIL"
        tone="lemon"
        sub="Golpea los bloques ❓ para recoger cada power-up."
      />

      {/* contador */}
      <div className="mx-auto mb-10 flex max-w-6xl items-center justify-center gap-4">
        <Tag tone="amber">POWER-UPS</Tag>
        <div className="flex gap-2">
          {POWERUPS.map((p, i) => (
            <motion.span
              key={p.name}
              animate={{ scale: revealed[i] ? [1, 1.5, 1] : 1 }}
              className="flex h-10 w-10 items-center justify-center border-4 border-black text-xl md:h-12 md:w-12 md:text-2xl"
              style={{ background: revealed[i] ? TONE_HEX[p.tone] : "#1a2150" }}
            >
              {revealed[i] ? p.icon : "?"}
            </motion.span>
          ))}
        </div>
        <span className="font-pixel text-lg text-lemon md:text-2xl">
          {total}/{POWERUPS.length}
        </span>
      </div>

      {/* bloques */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {POWERUPS.map((p, i) => {
          const on = revealed[i];
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 200, damping: 14 }}
              className="relative"
            >
              <AnimatePresence>
                {floats.includes(i) && <FloatText key={`f${i}`} text="+25 XP" tone="lemon" />}
              </AnimatePresence>

              <motion.button
                type="button"
                onClick={() => reveal(i)}
                onMouseEnter={() => !on && sfx.hover()}
                whileHover={!on ? { scale: 1.05 } : {}}
                whileTap={!on ? { y: -24 } : {}}
                animate={on ? { rotateY: [0, 90, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="pixel-box block w-full text-left"
                style={{ ["--pb" as string]: on ? TONE_HEX[p.tone] : "#ffb000" }}
              >
                {!on ? (
                  <div className="flex aspect-square flex-col items-center justify-center bg-amber">
                    <span className="font-pixel text-7xl text-black animate-float md:text-8xl">?</span>
                    <span className="mt-4 font-pixel text-xs text-black/70 md:text-sm">¡GOLPEA!</span>
                  </div>
                ) : (
                  <div className="flex aspect-square flex-col items-center justify-center bg-navy p-5 text-center">
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 12 }}
                      className="text-6xl md:text-7xl"
                    >
                      {p.icon}
                    </motion.span>
                    <span
                      className="mt-4 font-pixel text-sm leading-relaxed md:text-base"
                      style={{ color: TONE_HEX[p.tone] }}
                    >
                      {p.name}
                    </span>
                    <span className="mt-3 text-lg font-bold leading-snug text-cream md:text-xl">{p.desc}</span>
                    <span className="mt-4 border-4 border-black px-2 py-1 font-pixel text-[10px] text-black md:text-xs" style={{ background: TONE_HEX[p.tone] }}>
                      {p.stat}
                    </span>
                  </div>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* pie */}
      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center gap-8">
        <AnimatePresence mode="wait">
          {all ? (
            <motion.div
              key="done"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 12 }}
              className="flex flex-col items-center gap-6 md:flex-row"
            >
              <Bot size={160} mood="win" />
              <div className="text-center md:text-left">
                <p className="font-pixel text-xl text-lemon shadow-pixel md:text-3xl">¡POWER-UPS COMPLETOS!</p>
                <p className="mt-3 text-2xl font-bold text-cream md:text-3xl">
                  SENATI BOT ya tiene su equipo ágil. 💪
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PixelButton tone="cream" size="md" onClick={revealAll}>
                REVELAR TODO
              </PixelButton>
            </motion.div>
          )}
        </AnimatePresence>

        {all && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <PixelButton size="xl" tone="fire" onClick={next}>
              SIGUIENTE NIVEL ▶
            </PixelButton>
          </motion.div>
        )}
      </div>
    </Scene>
  );
}
