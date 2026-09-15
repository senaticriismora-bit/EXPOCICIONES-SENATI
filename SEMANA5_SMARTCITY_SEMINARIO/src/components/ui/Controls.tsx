import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function NextButton({ label, onClick, delay = 0.6 }: { label: string; onClick: () => void; delay?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="pointer-events-auto font-display group fixed bottom-6 right-6 z-30 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-base font-extrabold text-night shadow-[0_0_35px_rgba(255,255,255,0.35)] md:bottom-8 md:right-8 md:px-8 md:py-4 md:text-xl"
    >
      {label}
      <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1.5" strokeWidth={3} />
    </motion.button>
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ opacity: 1, x: -3 }}
      onClick={onClick}
      className="pointer-events-auto fixed bottom-7 left-6 z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold uppercase tracking-widest text-white/60 backdrop-blur-md transition hover:text-white md:bottom-9 md:left-8"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={3} /> Atrás
    </motion.button>
  );
}

export function SceneTitle({ kicker, title, accent = "cyan" }: { kicker: string; title: ReactNode; accent?: string }) {
  return (
    <div className="pointer-events-none">
      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display mb-2 text-sm font-bold uppercase tracking-[0.45em] md:text-base"
        style={{ color: accent }}
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-[clamp(1.8rem,4.6vw,4rem)] font-black leading-[1.02] tracking-tight text-white"
      >
        {title}
      </motion.h2>
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-1 bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
        animate={{ width: `${value * 100}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </div>
  );
}
