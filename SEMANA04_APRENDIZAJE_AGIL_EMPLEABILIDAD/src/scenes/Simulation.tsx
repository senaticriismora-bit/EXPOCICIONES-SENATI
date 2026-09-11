import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Bot } from "@/components/Bot";
import { Particles } from "@/components/Particles";
import { LevelTitle, PixelButton, PixelPanel, Scene, Tag } from "@/components/ui";
import { useGame } from "@/lib/game";

type Sprint = {
  event?: string;
  meta: string;
  practica: string;
  demo: string;
  feedback: string;
  ajuste: string;
  gain: number;
};

const SPRINTS: Sprint[] = [
  {
    meta: "Pantalla de login de la app",
    practica: "Programo 20 min de código real cada día",
    demo: "¡El login funciona! ✅",
    feedback: "Instructor: “los botones deben verse más claros”",
    ajuste: "Rediseño la interfaz de acceso",
    gain: 25,
  },
  {
    meta: "Registrar y listar pedidos",
    practica: "Pair programming con el Equipo 4",
    demo: "Los pedidos se guardan ✅",
    feedback: "Equipo: “valida los datos antes de guardar”",
    ajuste: "Micro-lección de validación de formularios",
    gain: 25,
  },
  {
    event: "⚠️ IMPREVISTO: ¡EL CLIENTE CAMBIÓ LOS REQUISITOS!",
    meta: "Agregar un carrito de compras",
    practica: "Kanban: una historia de usuario a la vez",
    demo: "Carrito integrado en la app ✅",
    feedback: "Cliente: “¡eso era justo lo que necesitaba!”",
    ajuste: "Actualizo el backlog del producto",
    gain: 25,
  },
  {
    meta: "Pago en línea y despliegue",
    practica: "Pruebas finales y despliegue en la nube",
    demo: "¡App publicada en producción! 🚀",
    feedback: "Todos: “¡lista para entregar!”",
    ajuste: "Retro: aprendí más programando que leyendo",
    gain: 25,
  },
];

const PHASES = [
  { key: "meta", icon: "🎯", label: "META", hint: "¿Qué quiero lograr en este sprint?" },
  { key: "practica", icon: "🛠️", label: "PRÁCTICA", hint: "Manos al código: aprendo haciendo." },
  { key: "demo", icon: "🎤", label: "DEMO", hint: "Muestro algo que ya funciona." },
  { key: "feedback", icon: "💬", label: "FEEDBACK", hint: "Escucho cómo mejorar." },
  { key: "ajuste", icon: "🔁", label: "AJUSTE", hint: "Aplico la mejora y arranca otra vuelta." },
] as const;

export function Simulation() {
  const { next, addXp, sfx, shake } = useGame();
  const [week, setWeek] = useState(0);
  const [agile, setAgile] = useState(0);
  const [trad, setTrad] = useState(0);
  const [tradFail, setTradFail] = useState(false);
  /** 0 = sprint no iniciado · 1..5 = fase revelada · 6 = sprint listo para cerrar */
  const [phase, setPhase] = useState(0);
  const [event, setEvent] = useState<string | null>(null);

  const finished = week >= SPRINTS.length;
  const current = SPRINTS[Math.min(week, SPRINTS.length - 1)];
  const started = phase > 0;
  const sprintComplete = phase > PHASES.length;

  const start = () => {
    if (current.event) {
      setEvent(current.event);
      sfx.fail();
      shake();
      return;
    }
    setPhase(1);
    sfx.click();
  };

  const confirmEvent = () => {
    setEvent(null);
    setPhase(1);
    sfx.coin();
  };

  const advance = () => {
    sfx.click();
    setPhase((p) => p + 1);
  };

  const closeSprint = () => {
    setAgile((v) => Math.min(100, v + current.gain));
    addXp(40);
    const w = week + 1;
    if (w === SPRINTS.length) {
      setTrad(35);
      setTradFail(true);
      sfx.boom();
      shake();
      window.setTimeout(() => sfx.success(), 600);
    } else {
      sfx.coin();
    }
    setWeek(w);
    setPhase(0);
  };

  return (
    <Scene className="dots-bg">
      <Particles count={12} />
      <LevelTitle
        kicker="NIVEL 4 · LA MISIÓN"
        title="4 SPRINTS · APP WEB DE PEDIDOS"
        tone="amber"
        sub="Avanza paso a paso, a tu ritmo, y mira cómo SENATI BOT desarrolla software en modo ágil."
      />

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Progreso */}
        <div className="space-y-8">
          <PixelPanel tone="lemon" title={`SPRINT ${Math.min(week + 1, 4)}/4`} className="p-6 md:p-8">
            <div className="mb-8 grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((w) => (
                <div
                  key={w}
                  className={cn(
                    "border-4 border-black py-3 text-center font-pixel text-xs md:text-sm",
                    w <= week
                      ? "bg-fire text-black"
                      : w === week + 1 && started
                        ? "bg-lemon text-black animate-blink"
                        : "bg-steel text-cream/60",
                  )}
                >
                  S{w}
                </div>
              ))}
            </div>

            {/* Ágil */}
            <div className="mb-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <Tag tone="lemon">SENATI BOT · ÁGIL ⚡</Tag>
                <span className="font-pixel text-lg text-lemon md:text-2xl">{agile}%</span>
              </div>
              <div className="relative h-14 border-4 border-black bg-black">
                <motion.div
                  className="h-full bg-linear-to-r from-fire via-amber to-lemon hp-bar"
                  animate={{ width: `${agile}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 14 }}
                />
                <div className="absolute inset-0 flex items-center justify-around">
                  {SPRINTS.map((_, i) => (
                    <motion.span key={i} animate={{ scale: week > i ? [0, 1.6, 1] : 0 }} className="text-3xl">
                      ✅
                    </motion.span>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-xl font-bold text-cream/85 md:text-2xl">
                {week === 0
                  ? "Listo para el primer sprint."
                  : `${week} demo(s) · ${week} mejora(s) · feedback cada semana`}
              </p>
            </div>

            {/* Tradicional */}
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <Tag tone="hot">TRADICIONAL 📚</Tag>
                <span className="font-pixel text-lg text-hot md:text-2xl">{trad}%</span>
              </div>
              <div className="relative h-14 border-4 border-black bg-black">
                <motion.div className="h-full bg-hot hp-bar" animate={{ width: `${trad}%` }} transition={{ duration: 0.4 }} />
                <div className="absolute inset-0 flex items-center justify-around text-2xl opacity-70">
                  {week < 4
                    ? ["📚", "📚", "📚", "📚"].slice(0, Math.max(1, week + 1)).map((e, i) => <span key={i}>{e}</span>)
                    : null}
                </div>
              </div>
              <p className={cn("mt-3 text-xl font-bold md:text-2xl", tradFail ? "text-hot" : "text-cream/70")}>
                {tradFail
                  ? "💥 ENTREGA FINAL: 35/100 · 0 demos · 1 sorpresa"
                  : "Solo leyendo documentación… sin código, sin feedback."}
              </p>
            </div>
          </PixelPanel>
        </div>

        {/* Detalle del sprint */}
        <div className="space-y-8">
          <PixelPanel
            tone="ice"
            title={finished ? "RESULTADO" : `SPRINT ${week + 1} · PASO ${Math.min(phase, PHASES.length)}/5`}
            className="relative min-h-[460px] p-6 md:p-8"
          >
            {/* Imprevisto con confirmación */}
            <AnimatePresence>
              {event && (
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center stripes-hot p-4 animate-stripes"
                >
                  <div className="border-4 border-black bg-ink px-6 py-8 text-center">
                    <p className="text-6xl md:text-7xl animate-wobble">⚠️</p>
                    <p className="mt-4 font-pixel text-lg leading-relaxed text-hot shadow-pixel md:text-2xl animate-blink">
                      {event}
                    </p>
                    <p className="mt-5 text-2xl font-black text-cream md:text-3xl">
                      Un aprendiz ágil no entra en pánico: revisa el backlog y cambia el plan.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-7 flex justify-center"
                    >
                      <PixelButton size="lg" tone="lemon" onClick={confirmEvent}>
                        🧭 ADAPTAR EL PLAN ▶
                      </PixelButton>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {finished ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center gap-6 text-center"
              >
                <Bot size={180} mood="win" />
                <p className="font-pixel text-2xl text-lemon shadow-pixel md:text-4xl">¡100% LOGRADO!</p>
                <div className="grid w-full grid-cols-2 gap-4 text-xl font-black md:text-2xl">
                  <div className="border-4 border-black bg-fire p-4 text-black">
                    ÁGIL ⚡
                    <br />4 demos · 4 mejoras
                  </div>
                  <div className="border-4 border-black bg-steel p-4 text-hot">
                    TRADICIONAL
                    <br />0 demos · 1 entrega
                  </div>
                </div>
                <p className="text-2xl font-bold text-cream md:text-3xl">
                  “Aprendí más <span className="text-ice">programando</span> que leyendo.” — SENATI BOT
                </p>
              </motion.div>
            ) : (
              <ul className="space-y-4">
                {PHASES.map((ph, i) => {
                  const done = phase >= i + 1;
                  const now = phase === i + 1;
                  const text = current[ph.key];
                  return (
                    <motion.li
                      key={ph.key}
                      animate={{
                        opacity: done ? 1 : 0.6,
                        scale: now ? 1.03 : 1,
                        borderColor: now ? "#ffe600" : "#000000",
                      }}
                      className={cn(
                        "flex items-center gap-4 border-4 p-4 md:p-5",
                        done ? "bg-steel" : "bg-navy",
                      )}
                    >
                      <span className={cn("text-3xl md:text-4xl", now && "animate-wobble")}>{ph.icon}</span>
                      <div className="min-w-0 flex-1">
                        <span className={cn("font-pixel text-[10px] md:text-xs", done ? "text-lemon" : "text-ice")}>
                          {ph.label}
                        </span>
                        <p
                          className={cn(
                            "text-lg font-bold leading-snug md:text-2xl",
                            done ? "text-cream" : "text-cream/70",
                          )}
                        >
                          {text}
                        </p>
                        <AnimatePresence>
                          {now && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 text-base font-bold text-lemon md:text-xl"
                            >
                              💡 {ph.hint}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      {done && !now && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 12 }}
                          className="text-2xl md:text-3xl"
                        >
                          ✅
                        </motion.span>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </PixelPanel>

          {/* Controles */}
          <div className="flex flex-col items-center gap-4">
            {!finished && (
              <>
                {!started && (
                  <PixelButton size="xl" tone="lemon" onClick={start}>
                    ▶ EJECUTAR SPRINT {week + 1}
                  </PixelButton>
                )}
                {started && !sprintComplete && (
                  <PixelButton size="xl" tone="ice" onClick={advance}>
                    {phase < PHASES.length ? `SIGUIENTE PASO ▶ (${phase}/5)` : "TERMINAR SPRINT ✔"}
                  </PixelButton>
                )}
                {sprintComplete && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 13 }}>
                    <PixelButton size="xl" tone="fire" onClick={closeSprint}>
                      {week + 1 === SPRINTS.length ? "🏁 CERRAR PROYECTO" : `✅ SPRINT ${week + 1} LISTO · SIGUIENTE`}
                    </PixelButton>
                  </motion.div>
                )}
                <p className="text-lg font-bold text-cream/70 md:text-xl">
                  {started ? "Lee con calma y pulsa el botón para avanzar." : "Pulsa para iniciar el sprint."}
                </p>
              </>
            )}
            {finished && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 12 }}>
                <PixelButton size="xl" tone="hot" onClick={next}>
                  VER RESULTADOS 🏆 ▶
                </PixelButton>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Scene>
  );
}
