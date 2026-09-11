import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Particles } from "@/components/Particles";
import { LevelTitle, PixelButton, PixelPanel, Scene, Tag } from "@/components/ui";
import { TONE_HEX, useGame, type Tone } from "@/lib/game";

type Method = {
  icon: string;
  name: string;
  short: string;
  tagline: string;
  steps: string[];
  tone: Tone;
  stats: { label: string; v: number }[];
};

const METHODS: Method[] = [
  {
    icon: "🏃",
    name: "SCRUM EDUCATIVO",
    short: "SCRUM",
    tagline: "Sprints cortos, backlog de aprendizaje y retrospectiva en equipo.",
    steps: ["Backlog: lista de lo que voy a aprender", "Sprint de 1–2 semanas con meta clara", "Daily de 5 min + retro: ¿qué mejoro?"],
    tone: "fire",
    stats: [
      { label: "VELOCIDAD", v: 80 },
      { label: "EQUIPO", v: 95 },
      { label: "FLEXIBILIDAD", v: 75 },
      { label: "ENFOQUE", v: 85 },
    ],
  },
  {
    icon: "📋",
    name: "KANBAN DE APRENDIZAJE",
    short: "KANBAN",
    tagline: "Tablero visual: Por aprender → Aprendiendo → Dominado.",
    steps: ["Cada tema es una tarjeta visible", "Máximo 2 temas en 'Aprendiendo'", "Mover la tarjeta = avanzar"],
    tone: "ice",
    stats: [
      { label: "VELOCIDAD", v: 70 },
      { label: "EQUIPO", v: 60 },
      { label: "FLEXIBILIDAD", v: 90 },
      { label: "ENFOQUE", v: 95 },
    ],
  },
  {
    icon: "🍬",
    name: "MICROLEARNING",
    short: "MICRO",
    tagline: "Cápsulas de 5 a 10 minutos: una habilidad a la vez.",
    steps: ["Video o reto muy corto", "Práctica inmediata", "Repaso espaciado para no olvidar"],
    tone: "lemon",
    stats: [
      { label: "VELOCIDAD", v: 95 },
      { label: "EQUIPO", v: 40 },
      { label: "FLEXIBILIDAD", v: 85 },
      { label: "ENFOQUE", v: 80 },
    ],
  },
  {
    icon: "🏗️",
    name: "APRENDIZAJE POR PROYECTOS",
    short: "ABP",
    tagline: "Un reto real guía todo lo que aprendo. Aprender haciendo.",
    steps: ["Problema real del taller o la empresa", "Entregables por etapas", "Producto final que funciona"],
    tone: "amber",
    stats: [
      { label: "VELOCIDAD", v: 60 },
      { label: "EQUIPO", v: 90 },
      { label: "FLEXIBILIDAD", v: 70 },
      { label: "ENFOQUE", v: 90 },
    ],
  },
  {
    icon: "💡",
    name: "DESIGN THINKING",
    short: "DESIGN",
    tagline: "Empatizar → Definir → Idear → Prototipar → Probar.",
    steps: ["Entiende al usuario del problema", "Prototipa rápido y barato", "Prueba, aprende y repite"],
    tone: "hot",
    stats: [
      { label: "VELOCIDAD", v: 65 },
      { label: "EQUIPO", v: 85 },
      { label: "FLEXIBILIDAD", v: 95 },
      { label: "ENFOQUE", v: 70 },
    ],
  },
];

export function Methods() {
  const { next, sfx, addXp } = useGame();
  const [sel, setSel] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([0]));
  const m = METHODS[sel];

  const choose = (i: number) => {
    sfx.click();
    setSel(i);
    if (!seen.has(i)) {
      const s = new Set(seen);
      s.add(i);
      setSeen(s);
      addXp(15);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") choose((sel + METHODS.length - 1) % METHODS.length);
      if (e.key === "ArrowDown") choose((sel + 1) % METHODS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel, seen]);

  return (
    <Scene className="dots-bg">
      <Particles count={12} />
      <LevelTitle
        kicker="NIVEL 3 · ARSENAL"
        title="ELIGE TU METODOLOGÍA"
        tone="ice"
        sub="Cada metodología ágil es un arma distinta. Selecciona una para ver sus stats."
      />

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* selector */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
          {METHODS.map((it, i) => {
            const on = i === sel;
            return (
              <motion.button
                key={it.name}
                type="button"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                whileHover={{ x: 8 }}
                onMouseEnter={() => sfx.hover()}
                onClick={() => choose(i)}
                className={cn(
                  "pixel-box-sm flex items-center gap-4 px-4 py-4 text-left transition-colors md:py-5",
                  on ? "text-black" : "bg-navy text-cream",
                )}
                style={{
                  ["--pb" as string]: TONE_HEX[it.tone],
                  background: on ? TONE_HEX[it.tone] : undefined,
                }}
              >
                <span className={cn("text-3xl md:text-4xl", on && "animate-wobble")}>{it.icon}</span>
                <span className="font-pixel text-sm leading-relaxed md:text-base">{it.short}</span>
                {on && <span className="ml-auto font-pixel text-sm animate-blink">◀</span>}
                {seen.has(i) && !on && <span className="ml-auto text-lemon">✔</span>}
              </motion.button>
            );
          })}
        </div>

        {/* ficha */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 1 }}
            transition={{ duration: 0.25 }}
          >
            <PixelPanel tone={m.tone} title="FICHA TÉCNICA" className="p-6 md:p-10">
              <div className="grid gap-8 md:grid-cols-[auto_1fr]">
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex h-36 w-36 items-center justify-center border-4 border-black text-7xl md:h-44 md:w-44 md:text-8xl"
                    style={{ background: TONE_HEX[m.tone] }}
                  >
                    {m.icon}
                  </motion.div>
                  <Tag tone={m.tone}>ARMA {sel + 1}/5</Tag>
                </div>
                <div>
                  <h3
                    className="font-pixel text-[clamp(1rem,2.4vw,1.7rem)] leading-relaxed shadow-pixel"
                    style={{ color: TONE_HEX[m.tone] }}
                  >
                    {m.name}
                  </h3>
                  <p className="mt-4 text-2xl font-black leading-snug text-cream md:text-3xl">{m.tagline}</p>
                  <ul className="mt-6 space-y-3">
                    {m.steps.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.12 }}
                        className="flex items-start gap-3 text-xl font-bold text-cream/90 md:text-2xl"
                      >
                        <span className="mt-1 font-pixel text-sm" style={{ color: TONE_HEX[m.tone] }}>
                          {i + 1}▸
                        </span>
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* stats */}
              <div className="mt-8 grid gap-4 border-t-4 border-black pt-6 md:grid-cols-2">
                {m.stats.map((s, i) => (
                  <div key={s.label}>
                    <div className="mb-2 flex justify-between font-pixel text-xs text-cream md:text-sm">
                      <span>{s.label}</span>
                      <span style={{ color: TONE_HEX[m.tone] }}>{s.v}</span>
                    </div>
                    <div className="h-6 border-4 border-black bg-black">
                      <motion.div
                        className="h-full hp-bar"
                        style={{ background: TONE_HEX[m.tone] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.v}%` }}
                        transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 60, damping: 14 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PixelPanel>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center gap-5">
        <p className="text-xl font-bold text-cream/70 md:text-2xl">
          Exploradas: <span className="text-lemon">{seen.size}/5</span> · Usa ↑ ↓ o haz clic
        </p>
        <PixelButton size="xl" tone="fire" onClick={next}>
          SIGUIENTE NIVEL ▶
        </PixelButton>
      </div>
    </Scene>
  );
}
