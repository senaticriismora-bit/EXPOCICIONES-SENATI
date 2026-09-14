import { motion } from "framer-motion";
import { images } from "../assets/media";

const WORDS = [
  { t: "CONFORT", c: "#3ee0ff" },
  { t: "AHORRO", c: "#ffb703" },
  { t: "SEGURO", c: "#ff4d8d" },
  { t: "CONTROL", c: "#a78bfa" },
];

export default function Close() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src={images.heroHouse} alt="" className="kenburns absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#05060a]/78" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(62,224,255,0.2),transparent_55%)]" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl tracking-[0.5em] text-cyan-300 sm:text-2xl"
        >
          EQUIPO 4 · INMÓTICA
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display glow-cyan mt-2 text-[16vw] leading-[0.82] text-white sm:text-[10vw]"
        >
          HOGAR VIVO
        </motion.h2>
        <p className="mt-3 text-2xl text-white/75 sm:text-4xl">Siente. Decide. Actúa.</p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {WORDS.map((w, i) => (
            <motion.span
              key={w.t}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="font-display rounded-2xl border px-6 py-4 text-4xl sm:text-5xl"
              style={{ color: w.c, borderColor: `${w.c}66`, background: `${w.c}14` }}
            >
              {w.t}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-14 font-display text-3xl text-white/70 sm:text-4xl"
        >
          MG. FERNANDO MIGUEL PISFIL ORTIZ
        </motion.p>
      </div>
    </div>
  );
}
