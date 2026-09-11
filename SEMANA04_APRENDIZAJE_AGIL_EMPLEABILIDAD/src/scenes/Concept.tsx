import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Particles } from "@/components/Particles";
import { LevelTitle, PixelButton, PixelPanel, Tag, Scene } from "@/components/ui";
import { TONE_HEX, useGame, type Tone } from "@/lib/game";

const STEPS: { icon: string; name: string; desc: string; tone: Tone }[] = [
  { icon: "🎯", name: "PLANIFICAR", desc: "Elijo UNA meta pequeña para esta semana.", tone: "fire" },
  { icon: "🛠️", name: "HACER", desc: "Practico de verdad: manos a la obra.", tone: "lemon" },
  { icon: "🎤", name: "DEMOSTRAR", desc: "Muestro lo que logré y recibo feedback.", tone: "ice" },
  { icon: "🔁", name: "MEJORAR", desc: "Ajusto el plan y empiezo otra vuelta.", tone: "hot" },
];

const POS = [
  "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
  "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
];

function Loop() {
  const { sfx } = useGame();
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  useEffect(() => {
    const id = window.setTimeout(() => setActive((a) => (a + 1) % STEPS.length), 3200);
    return () => window.clearTimeout(id);
  }, [active]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative m-12 h-[270px] w-[270px] sm:h-[340px] sm:w-[340px] md:m-14 md:h-[400px] md:w-[400px]">
        {/* anillo giratorio */}
        <div className="absolute inset-4 rounded-full border-8 border-dashed border-ice/70 animate-spin-slow" />
        <div
          className="absolute inset-4 rounded-full opacity-30 blur-2xl transition-colors duration-500"
          style={{ background: TONE_HEX[step.tone] }}
        />
        {/* centro */}
        <div className="absolute inset-[22%] flex flex-col items-center justify-center border-4 border-black bg-navy text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className="flex flex-col items-center"
            >
              <span className="text-6xl md:text-7xl">{step.icon}</span>
              <span className="mt-2 font-pixel text-[10px] md:text-xs" style={{ color: TONE_HEX[step.tone] }}>
                PASO {active + 1}/4
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* nodos */}
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <motion.button
              key={s.name}
              type="button"
              onClick={() => {
                sfx.click();
                setActive(i);
              }}
              animate={{ scale: on ? 1.18 : 1 }}
              whileHover={{ scale: 1.22 }}
              className={cn(
                "pixel-box-sm absolute z-10 flex h-24 w-24 flex-col items-center justify-center text-center transition-colors md:h-32 md:w-32",
                POS[i],
                on ? "text-black" : "bg-navy text-cream",
              )}
              style={{
                ["--pb" as string]: TONE_HEX[s.tone],
                background: on ? TONE_HEX[s.tone] : undefined,
              }}
            >
              <span className="text-2xl md:text-3xl">{s.icon}</span>
              <span className="mt-1 font-pixel text-[10px] leading-tight md:text-xs">{s.name}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-md text-center text-2xl font-black leading-snug md:text-3xl"
          style={{ color: TONE_HEX[step.tone] }}
        >
          {step.desc}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function Versus() {
  const cycle = 6;
  return (
    <div className="space-y-8">
      {/* Tradicional */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <Tag tone="hot">TRADICIONAL</Tag>
          <span className="text-lg font-bold text-cream/80 md:text-xl">Feedback: solo al final 😰</span>
        </div>
        <div className="relative h-12 border-4 border-black bg-black">
          <motion.div
            className="h-full bg-steel hp-bar"
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: cycle, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-around text-2xl">
            {["📚", "📚", "📚", "📚"].map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
          <motion.span
            className="absolute -right-4 -top-5 text-4xl"
            animate={{ scale: [0, 0, 1.6, 1, 1, 0] }}
            transition={{ duration: cycle, times: [0, 0.9, 0.94, 0.97, 0.99, 1], repeat: Infinity }}
          >
            💥
          </motion.span>
        </div>
      </div>

      {/* Ágil */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <Tag tone="lemon">ÁGIL</Tag>
          <span className="text-lg font-bold text-cream/80 md:text-xl">Feedback: cada semana ⚡</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => {
            const start = (i * 1.5) / cycle;
            const end = (i * 1.5 + 1.2) / cycle;
            return (
              <div key={i} className="relative h-12 border-4 border-black bg-black">
                <motion.div
                  className="h-full bg-linear-to-r from-fire to-lemon"
                  animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
                  transition={{ duration: cycle, times: [0, start, end, 0.99, 1], repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-3xl"
                  animate={{ scale: [0, 0, 1.5, 1, 1, 0] }}
                  transition={{ duration: cycle, times: [0, end, end + 0.03, end + 0.06, 0.99, 1], repeat: Infinity }}
                >
                  ✅
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Concept() {
  const { next } = useGame();
  return (
    <Scene className="dots-bg">
      <Particles count={12} />
      <LevelTitle
        kicker="NIVEL 1 · CONCEPTO"
        title="¿QUÉ ES EL APRENDIZAJE ÁGIL?"
        tone="fire"
      />

      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
          className="order-2 lg:order-1"
        >
          <Loop />
        </motion.div>

        <div className="order-1 space-y-10 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PixelPanel tone="lemon" title="DEFINICIÓN" className="p-6 md:p-8">
              <p className="text-2xl font-black leading-snug text-cream md:text-3xl lg:text-4xl">
                Aprender en <span className="text-fire">CICLOS CORTOS</span>: pruebo, recibo{" "}
                <span className="text-ice">FEEDBACK</span> y <span className="text-lemon">MEJORO</span> en
                cada vuelta.
              </p>
              <p className="mt-5 text-xl font-bold text-cream/75 md:text-2xl">
                🧬 Nace del <span className="text-amber">Manifiesto Ágil (2001)</span> del software, aplicado a
                cómo aprendemos.
              </p>
            </PixelPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PixelPanel tone="ice" title="VS" className="p-6 md:p-8">
              <Versus />
            </PixelPanel>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-14 flex justify-center"
      >
        <PixelButton size="xl" tone="fire" onClick={next}>
          SIGUIENTE NIVEL ▶
        </PixelButton>
      </motion.div>
    </Scene>
  );
}
