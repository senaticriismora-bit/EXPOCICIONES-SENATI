import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, Move3d, X, Sparkles, Trophy } from "lucide-react";
import { DEVICES, serviceById } from "../../data/content";
import { Demo } from "../demos/Demos";
import { BackButton, NextButton } from "../ui/Controls";

interface Props {
  selectedId: string | null;
  visited: string[];
  onSelect: (id: string | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Explorer({ selectedId, visited, onSelect, onNext, onBack }: Props) {
  const device = DEVICES.find((d) => d.id === selectedId) ?? null;
  const allDone = visited.length >= DEVICES.length;
  const nextDevice = () => {
    const idx = DEVICES.findIndex((d) => d.id === selectedId);
    const unvisited = DEVICES.find((d, i) => i > idx && !visited.includes(d.id)) ?? DEVICES.find((d) => !visited.includes(d.id));
    onSelect((unvisited ?? DEVICES[(idx + 1) % DEVICES.length]).id);
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Header info */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-auto glass absolute left-4 top-4 z-20 max-w-[min(92vw,420px)] rounded-3xl p-5 md:left-8 md:top-8"
        style={{ boxShadow: "0 0 60px rgba(163,230,53,0.15)" }}
      >
        <p className="font-display mb-1 text-xs font-bold uppercase tracking-[0.45em] text-lime-300 md:text-sm">02 · Dispositivos</p>
        <h2 className="font-display text-2xl font-black leading-tight text-white md:text-3xl">
          Toca los puntos <span className="text-glow">brillantes</span> de la ciudad
        </h2>
        <div className="mt-3 flex items-center gap-3">
          <span className="font-display text-3xl font-black text-white">
            {visited.length}
            <span className="text-white/40">/{DEVICES.length}</span>
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 md:text-sm">dispositivos descubiertos</span>
        </div>
        <div className="mt-2 flex gap-1.5">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              onClick={() => onSelect(d.id)}
              title={d.name}
              className="h-2.5 flex-1 rounded-full transition-all hover:scale-y-150"
              style={{ background: visited.includes(d.id) ? d.color : "rgba(255,255,255,0.15)", boxShadow: visited.includes(d.id) ? `0 0 10px ${d.color}` : "none" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Hint */}
      <AnimatePresence>
        {!device && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-night/60 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.25em] text-white/60 backdrop-blur-md md:text-base"
          >
            <Move3d className="h-5 w-5 text-cyan-300" /> Arrastra para girar · Rueda para acercar
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail panel */}
      <AnimatePresence>
        {device && (
          <motion.aside
            key={device.id}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="pointer-events-auto glass absolute bottom-24 right-4 top-4 z-20 flex w-[min(94vw,470px)] flex-col overflow-hidden rounded-3xl md:bottom-28 md:right-6 md:top-6"
            style={{ boxShadow: `0 0 80px ${device.color}33, inset 0 1px 0 rgba(255,255,255,0.1)` }}
          >
            <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: device.color, boxShadow: `0 0 20px ${device.color}` }} />
            <button
              onClick={() => onSelect(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" strokeWidth={3} />
            </button>

            <div className="flex-1 overflow-y-auto p-6 pt-8">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-4">
                <span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: `${device.color}22`, color: device.color, boxShadow: `0 0 30px ${device.color}55` }}
                >
                  <device.icon className="h-9 w-9" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">Dispositivo</p>
                  <h3 className="font-display text-xl font-black leading-tight text-white md:text-2xl">{device.name}</h3>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="font-display mt-5 text-[clamp(1.5rem,2.4vw,2.1rem)] font-extrabold leading-tight"
                style={{ color: device.color }}
              >
                {device.tagline}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-3 text-lg font-medium leading-snug text-white/85">
                {device.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-5 grid grid-cols-[auto_1fr] gap-4">
                <div className="rounded-2xl bg-white/5 px-4 py-3 text-center">
                  <div className="font-display text-3xl font-black" style={{ color: device.color }}>{device.stat.value}</div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-white/60">{device.stat.label}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white/60">
                    <MapPin className="h-3.5 w-3.5" /> Ejemplo real · <span className="text-white">{device.exampleCity}</span>
                  </div>
                  <p className="mt-1 text-[15px] font-semibold leading-snug text-white/90">{device.example}</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }} className="mt-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-white/50">Servicios que habilita</p>
                <div className="flex flex-wrap gap-2">
                  {device.services.map((sid) => {
                    const s = serviceById(sid);
                    if (!s) return null;
                    return (
                      <span key={sid} className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-display text-sm font-bold" style={{ borderColor: `${s.color}88`, color: s.color, background: `${s.color}14` }}>
                        <s.icon className="h-4 w-4" /> {s.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }} className="mt-5 rounded-3xl border border-white/10 bg-night/60 p-4">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: device.color }}>
                  <Sparkles className="h-4 w-4" /> Pruébalo
                </p>
                <Demo kind={device.demo} color={device.color} />
              </motion.div>
            </div>

            <div className="border-t border-white/10 p-4">
              <button
                onClick={nextDevice}
                className="font-display group flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-black text-night transition hover:brightness-110"
                style={{ background: device.color, boxShadow: `0 0 30px ${device.color}66` }}
              >
                Siguiente dispositivo <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* completion toast */}
      <AnimatePresence>
        {allDone && !device && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-3xl bg-gradient-to-br from-lime-300 to-cyan-300 px-8 py-6 text-center text-night shadow-[0_0_60px_rgba(163,230,53,0.6)]"
          >
            <Trophy className="h-12 w-12" />
            <p className="font-display text-2xl font-black md:text-3xl">¡Descubriste los 10 dispositivos!</p>
            <p className="font-semibold">Ahora veamos qué servicios hacen posibles</p>
          </motion.div>
        )}
      </AnimatePresence>

      <BackButton onClick={onBack} />
      <NextButton label={allDone ? "Ver los servicios" : "Ver servicios"} onClick={onNext} />
    </div>
  );
}
