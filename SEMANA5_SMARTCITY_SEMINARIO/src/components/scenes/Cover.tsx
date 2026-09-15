import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Users, Building2 } from "lucide-react";
import { INSTRUCTOR, TEAM } from "../../data/content";

const title = "SMART CITY";

export default function Cover({ onStart }: { onStart: () => void }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between overflow-hidden p-6 md:p-10">
      {/* soft vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-transparent to-night/90" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25),transparent_60%)]" />

      {/* Top tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center gap-3"
      >
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
          <Building2 className="h-4 w-4" /> Recurso interactivo
        </span>
      </motion.div>

      {/* Title */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-display mb-3 text-base font-semibold uppercase tracking-[0.5em] text-fuchsia-300 md:text-lg"
        >
          ¿Qué hay dentro de una
        </motion.p>
        <h1 className="font-display flex flex-wrap justify-center text-[clamp(3rem,11vw,10rem)] font-black leading-[0.95] tracking-tight">
          {title.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.4 + i * 0.06, duration: 0.7, type: "spring", bounce: 0.35 }}
              className={ch === " " ? "w-[0.35em]" : "text-glow drop-shadow-[0_0_30px_rgba(103,232,249,0.45)]"}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-display mt-4 max-w-4xl text-[clamp(1.1rem,2.4vw,2rem)] font-semibold text-white/90"
        >
          Dispositivos y servicios que dan vida a una ciudad inteligente
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.6, type: "spring" }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="pointer-events-auto font-display group relative mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 px-8 py-4 text-lg font-bold text-night shadow-[0_0_40px_rgba(168,85,247,0.5)] md:px-10 md:py-5 md:text-2xl"
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 blur-xl opacity-60 transition-opacity group-hover:opacity-100" />
          Comenzar el recorrido
          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1.5" strokeWidth={3} />
        </motion.button>
      </div>

      {/* Credits */}
      <div className="relative z-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-auto glass glow-violet rounded-3xl p-5 md:p-6"
        >
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
            <GraduationCap className="h-5 w-5" /> Instructor
          </div>
          <p className="font-display text-xl font-extrabold leading-tight text-white md:text-2xl">
            {INSTRUCTOR.first}
            <br />
            <span className="text-violet-200">{INSTRUCTOR.second}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="pointer-events-auto glass glow-cyan rounded-3xl p-5 md:p-6"
        >
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            <Users className="h-5 w-5" /> Equipo 4 · Integrantes
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.n}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 + i * 0.15, duration: 0.6 }}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <span className="font-display text-glow text-3xl font-black leading-none">{m.n}</span>
                <p className="font-display text-sm font-extrabold leading-snug text-white md:text-[15px]">
                  {m.first}
                  <br />
                  <span className="text-cyan-100/90">{m.second}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
