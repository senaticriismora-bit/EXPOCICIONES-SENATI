import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MousePointerClick } from "lucide-react";
import { LAYERS } from "../../data/content";
import { BackButton, NextButton, SceneTitle } from "../ui/Controls";

const STACK = [...LAYERS].reverse(); // bottom (dispositivos) -> top (ciudadanos)
const GAP = 70;

export default function Layers({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [active, setActive] = useState(0); // index in STACK
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STACK.length), 3000);
    return () => clearInterval(id);
  }, [manual]);

  const layer = STACK[active];

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col overflow-hidden p-6 md:p-10">
      <div className="absolute inset-0 bg-night/80 backdrop-blur-[3px]" />
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col">
        <SceneTitle kicker="04 · Arquitectura" accent="#a855f7" title={<>Así fluyen los datos: <span className="text-glow">de la calle al ciudadano</span></>} />

        <div className="grid flex-1 grid-cols-1 items-center gap-6 lg:grid-cols-2">
          {/* Isometric stack */}
          <div className="flex items-center justify-center">
            <div className="perspective relative h-[260px] w-[260px] translate-y-16 md:h-[340px] md:w-[340px] md:translate-y-20">
              <motion.div
                className="preserve-3d absolute inset-0"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 58, rotateZ: -38 }}
                transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {STACK.map((l, i) => {
                  const isActive = i === active;
                  return (
                    <motion.button
                      key={l.id}
                      onClick={() => { setActive(i); setManual(true); }}
                      className="pointer-events-auto absolute inset-0 flex items-center justify-center gap-3 rounded-[2rem] border-2"
                      initial={{ z: 0, opacity: 0 }}
                      animate={{
                        z: i * GAP + (isActive ? 36 : 0),
                        opacity: 1,
                        scale: isActive ? 1.04 : 1,
                      }}
                      transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 160, damping: 18 }}
                      style={{
                        borderColor: l.color,
                        background: isActive ? `${l.color}55` : `${l.color}1f`,
                        boxShadow: isActive ? `0 0 70px ${l.color}aa, inset 0 0 40px ${l.color}44` : `0 0 20px ${l.color}33`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <l.icon className="h-10 w-10 md:h-14 md:w-14" style={{ color: isActive ? "#fff" : l.color }} strokeWidth={2} />
                      <span className="font-display text-xl font-black uppercase tracking-wide md:text-3xl" style={{ color: isActive ? "#fff" : l.color }}>
                        {l.name}
                      </span>
                    </motion.button>
                  );
                })}
                {/* data packets going up */}
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-4 w-4 rounded-full bg-white"
                    style={{ boxShadow: "0 0 18px #fff, 0 0 40px #22d3ee", marginLeft: -8 + (i - 1) * 60, marginTop: -8 + (i - 1) * 40 }}
                    animate={{ z: [-10, (STACK.length - 1) * GAP + 60], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Detail */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {[...STACK].reverse().map((l) => {
                const i = STACK.indexOf(l);
                const isActive = i === active;
                return (
                  <motion.button
                    key={l.id}
                    onClick={() => { setActive(i); setManual(true); }}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (STACK.length - 1 - i) * 0.1 }}
                    whileHover={{ x: 6 }}
                    className="pointer-events-auto flex items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors"
                    style={{
                      borderColor: isActive ? l.color : "rgba(255,255,255,0.1)",
                      background: isActive ? `${l.color}22` : "rgba(255,255,255,0.03)",
                      boxShadow: isActive ? `0 0 40px ${l.color}44` : "none",
                    }}
                  >
                    <span className="font-display w-8 text-2xl font-black" style={{ color: l.color }}>{STACK.length - i}</span>
                    <l.icon className="h-7 w-7 shrink-0" style={{ color: l.color }} />
                    <div className="min-w-0">
                      <div className="font-display text-lg font-black text-white md:text-xl">{l.name}</div>
                      <div className="truncate text-sm font-semibold text-white/60 md:text-base">{l.short}</div>
                    </div>
                    {i < STACK.length - 1 && <ArrowUp className="ml-auto h-5 w-5 text-white/30" />}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="glass rounded-3xl p-5"
                style={{ boxShadow: `0 0 60px ${layer.color}33` }}
              >
                <p className="font-display text-xl font-extrabold text-white md:text-2xl">{layer.short}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {layer.items.map((it, i) => (
                    <motion.span
                      key={it}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="font-display rounded-full px-4 py-2 text-sm font-bold md:text-base"
                      style={{ background: `${layer.color}22`, color: layer.color, border: `1px solid ${layer.color}66` }}
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mx-auto mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
          <MousePointerClick className="h-4 w-4" /> Toca una capa
        </motion.p>
      </div>

      <BackButton onClick={onBack} />
      <NextButton label="Conclusión" onClick={onNext} />
    </div>
  );
}
