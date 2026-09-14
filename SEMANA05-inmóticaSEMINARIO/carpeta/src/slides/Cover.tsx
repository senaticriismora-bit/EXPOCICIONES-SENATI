import { motion } from "framer-motion";
import { images } from "../assets/media";

const TEAM = [
  { n: "01", last: "MECHÁN ENEQUE", first: "JUAN ENRIQUE" },
  { n: "02", last: "MORA DAMIAN", first: "CHRISTIAN ALFREDO" },
  { n: "03", last: "MURGA CASTRO", first: "ANDRÉ ALEXANDER" },
  { n: "04", last: "ROMERO CANAQUIRI", first: "ROLIN ROY" },
];

export default function Cover() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={images.heroHouse}
        alt=""
        className="kenburns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,6,10,0.12),rgba(5,6,10,0.7)_64%,#05060a_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/92" />

      <div className="relative flex h-full flex-col px-[5%] py-[4%]">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold tracking-[0.5em] text-cyan-300 sm:text-2xl"
        >
          EQUIPO 4
        </motion.p>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg tracking-[0.5em] text-amber-300 sm:text-2xl"
          >
            INMUEBLE + INFORMÁTICA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.32, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display glow-cyan text-[22vw] leading-[0.8] text-white sm:text-[15vw] lg:text-[12.5vw]"
          >
            INMÓTICA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-2 text-2xl font-light tracking-[0.3em] text-white/80 sm:text-4xl"
          >
            EL HOGAR QUE PIENSA
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.75 }}
            className="mt-6 h-px w-[min(68vw,680px)] origin-center bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="mt-5"
          >
            <p className="text-lg tracking-[0.5em] text-white/50 sm:text-xl">INSTRUCTOR</p>
            <p className="font-display mt-1 text-4xl text-amber-300 sm:text-6xl lg:text-7xl">
              MG. FERNANDO MIGUEL
            </p>
            <p className="font-display text-3xl text-white sm:text-5xl lg:text-6xl">PISFIL ORTIZ</p>
          </motion.div>
        </div>

        <p className="mb-3 text-lg tracking-[0.4em] text-white/55 sm:text-xl">INTEGRANTES</p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.n}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
              className="border-l-2 border-cyan-400/85 pl-4"
            >
              <p className="font-display text-3xl text-cyan-300 sm:text-4xl">{m.n}</p>
              <p className="mt-1 text-lg font-bold leading-tight tracking-wide text-white sm:text-2xl">
                {m.last}
              </p>
              <p className="text-lg tracking-wide text-white/70 sm:text-xl">{m.first}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="hint-bounce mt-4 flex flex-col items-center"
        >
          <p className="text-lg tracking-[0.45em] text-white/70">DESLIZA</p>
          <div className="mt-1 h-6 w-px bg-gradient-to-b from-cyan-300 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
