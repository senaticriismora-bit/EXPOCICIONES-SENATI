import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Radar, Wifi, BrainCircuit, Zap, MousePointerClick } from "lucide-react";
import { BackButton, NextButton, SceneTitle } from "../ui/Controls";

const STEPS = [
  {
    id: "sensar",
    name: "SENSAR",
    icon: Radar,
    color: "#a3e635",
    text: "Sensores y cámaras captan lo que pasa en la calle.",
    example: "Un sensor detecta que el contenedor está lleno.",
  },
  {
    id: "conectar",
    name: "CONECTAR",
    icon: Wifi,
    color: "#22d3ee",
    text: "Redes 5G y LoRaWAN envían los datos en milisegundos.",
    example: "El dato viaja al centro de control de la ciudad.",
  },
  {
    id: "analizar",
    name: "ANALIZAR",
    icon: BrainCircuit,
    color: "#a855f7",
    text: "La plataforma con IA convierte datos en decisiones.",
    example: "El sistema calcula la ruta más corta del camión.",
  },
  {
    id: "actuar",
    name: "ACTUAR",
    icon: Zap,
    color: "#fbbf24",
    text: "Servicios y personas responden al instante.",
    example: "El camión recoge solo los contenedores llenos.",
  },
];

const WORDS = ["mover mejor a la gente", "ahorrar energía", "cuidar el aire", "responder más rápido", "vivir mejor"];

export default function WhatIs({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (manual) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 3500);
    return () => clearInterval(id);
  }, [manual]);

  const step = STEPS[active];

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col overflow-hidden p-6 md:p-10">
      <div className="absolute inset-0 bg-night/75 backdrop-blur-[2px]" />
      <div className="grid-bg absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col">
        <SceneTitle
          kicker="01 · Concepto"
          accent="#22d3ee"
          title={
            <>
              Una Smart City usa tecnología y datos para
              <span className="relative block h-[1.15em] overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 30, rotateX: -60 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -30, rotateX: 60 }}
                    transition={{ duration: 0.5 }}
                    className="text-glow absolute left-0 top-0 whitespace-nowrap"
                  >
                    {WORDS[word]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </>
          }
        />

        {/* Loop diagram */}
        <div className="relative mt-8 flex flex-1 flex-col justify-center gap-8 md:mt-10">
          <div className="relative">
            {/* connector line */}
            <div className="absolute left-[10%] right-[10%] top-1/2 hidden h-1 -translate-y-1/2 rounded-full bg-white/10 md:block">
              <motion.div
                className="absolute -top-[6px] h-4 w-4 rounded-full bg-white shadow-[0_0_20px_#fff]"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -top-[6px] h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_#67e8f9]"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
              />
            </div>

            <div className="relative grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    whileHover={{ scale: 1.04 }}
                    onClick={() => {
                      setActive(i);
                      setManual(true);
                    }}
                    className="pointer-events-auto group flex flex-col items-center gap-3 no-select"
                  >
                    <motion.span
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        boxShadow: isActive ? `0 0 60px ${s.color}99, 0 0 0 6px ${s.color}33` : `0 0 0px ${s.color}00`,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 bg-night md:h-32 md:w-32"
                      style={{ borderColor: s.color, color: s.color }}
                    >
                      {isActive && (
                        <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: s.color, opacity: 0.4 }} />
                      )}
                      <motion.span animate={{ rotate: isActive ? [0, -8, 8, 0] : 0 }} transition={{ duration: 0.6 }}>
                        <Icon className="h-11 w-11 md:h-14 md:w-14" strokeWidth={2} />
                      </motion.span>
                      <span className="font-display absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-night">
                        {i + 1}
                      </span>
                    </motion.span>
                    <span
                      className="font-display text-lg font-black tracking-widest md:text-2xl"
                      style={{ color: isActive ? s.color : "rgba(255,255,255,0.7)" }}
                    >
                      {s.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Active detail */}
          <div className="relative min-h-[150px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="glass mx-auto max-w-5xl rounded-3xl p-6 text-center md:p-8"
                style={{ boxShadow: `0 0 80px ${step.color}33` }}
              >
                <p className="font-display text-[clamp(1.3rem,3vw,2.6rem)] font-extrabold leading-tight text-white">{step.text}</p>
                <p className="mt-3 text-lg font-semibold md:text-2xl" style={{ color: step.color }}>
                  Ejemplo: {step.example}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mx-auto mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/50"
        >
          <MousePointerClick className="h-4 w-4" /> Toca cada paso del ciclo
        </motion.p>
      </div>

      <BackButton onClick={onBack} />
      <NextButton label="Explorar la ciudad" onClick={onNext} />
    </div>
  );
}
