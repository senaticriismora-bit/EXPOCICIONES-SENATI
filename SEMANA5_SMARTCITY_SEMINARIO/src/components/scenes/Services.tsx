import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, MousePointerClick } from "lucide-react";
import { SERVICES, deviceById } from "../../data/content";
import { BackButton, NextButton, SceneTitle } from "../ui/Controls";

const images = import.meta.glob("../../assets/services/*.{jpg,jpeg,png}", { eager: true, import: "default" }) as Record<string, string>;
const imageFor = (id: string) => Object.entries(images).find(([k]) => k.includes(`/${id}.`))?.[1];

export default function Services({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = SERVICES.find((s) => s.id === openId) ?? null;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col overflow-hidden p-6 md:p-10">
      <div className="absolute inset-0 bg-night/80 backdrop-blur-[3px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SceneTitle kicker="03 · Servicios" accent="#fbbf24" title={<>Lo que la ciudad <span className="text-glow">hace por ti</span></>} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
            <MousePointerClick className="h-4 w-4" /> Toca un servicio
          </motion.p>
        </div>

        <div className="perspective mt-6 grid flex-1 grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" style={{ gridAutoRows: "minmax(0, 1fr)" }}>
          {SERVICES.map((s, i) => {
            const img = imageFor(s.id);
            return (
              <motion.button
                key={s.id}
                layoutId={`card-${s.id}`}
                initial={{ opacity: 0, rotateY: -70, y: 40 }}
                animate={{ opacity: 1, rotateY: 0, y: 0 }}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.7, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setOpenId(s.id)}
                className="pointer-events-auto group relative min-h-0 overflow-hidden rounded-3xl border border-white/10 text-left no-select"
                style={{ boxShadow: `0 10px 40px -10px ${s.color}55` }}
              >
                {img ? (
                  <img src={img} alt={s.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${s.color}55, #0b1026 70%)` }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-1" style={{ background: s.color, boxShadow: `0 0 16px ${s.color}` }} />
                <div className="relative flex h-full flex-col justify-end p-4 md:p-5">
                  <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl md:h-14 md:w-14" style={{ background: `${s.color}22`, color: s.color, boxShadow: `0 0 24px ${s.color}55` }}>
                    <s.icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.2} />
                  </span>
                  <h3 className="font-display text-base font-black leading-tight text-white md:text-xl">{s.name}</h3>
                  <p className="mt-1 text-sm font-semibold leading-snug md:text-base" style={{ color: s.color }}>{s.tagline}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Expanded service */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto absolute inset-0 z-30 flex items-center justify-center bg-night/70 p-4 backdrop-blur-md md:p-10"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              layoutId={`card-${open.id}`}
              onClick={(e) => e.stopPropagation()}
              className="glass relative grid max-h-full w-full max-w-5xl grid-cols-1 overflow-hidden rounded-[2rem] md:grid-cols-[1.1fr_1fr]"
              style={{ boxShadow: `0 0 120px ${open.color}44` }}
            >
              <div className="relative min-h-[220px] md:min-h-[520px]">
                {imageFor(open.id) ? (
                  <img src={imageFor(open.id)} alt={open.name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${open.color}66, #0b1026 80%)` }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent md:bg-gradient-to-r" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-night/70 backdrop-blur" style={{ color: open.color, boxShadow: `0 0 30px ${open.color}88` }}>
                    <open.icon className="h-9 w-9" strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Servicio</p>
                    <h3 className="font-display text-2xl font-black text-white md:text-3xl">{open.name}</h3>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col gap-5 overflow-y-auto p-6 md:p-8">
                <button onClick={() => setOpenId(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Cerrar">
                  <X className="h-5 w-5" strokeWidth={3} />
                </button>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-display pr-10 text-[clamp(1.5rem,2.6vw,2.4rem)] font-extrabold leading-tight" style={{ color: open.color }}>
                  {open.tagline}
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="text-lg font-medium text-white/85 md:text-xl">
                  {open.description}
                </motion.p>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-white/50">Ejemplos</p>
                  <ul className="flex flex-col gap-2">
                    {open.examples.map((ex, i) => (
                      <motion.li key={ex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 font-display text-base font-bold text-white md:text-lg">
                        <CheckCircle2 className="h-6 w-6 shrink-0" style={{ color: open.color }} /> {ex}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-white/50">Dispositivos que lo hacen posible</p>
                  <div className="flex flex-wrap gap-2">
                    {open.devices.map((did, i) => {
                      const d = deviceById(did);
                      if (!d) return null;
                      return (
                        <motion.span key={did} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 + i * 0.08 }} className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-display text-sm font-bold" style={{ borderColor: `${d.color}88`, color: d.color, background: `${d.color}14` }}>
                          <d.icon className="h-4 w-4" /> {d.name}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BackButton onClick={onBack} />
      <NextButton label="¿Cómo funciona?" onClick={onNext} />
    </div>
  );
}
