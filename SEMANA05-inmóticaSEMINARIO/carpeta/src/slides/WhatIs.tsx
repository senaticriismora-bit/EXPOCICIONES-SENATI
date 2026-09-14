import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "../assets/media";

const CARDS = [
  {
    id: "siente",
    title: "SIENTE",
    hint: "SENSORES",
    color: "#3ee0ff",
    phrase: "Luz · calor · presencia · aire",
  },
  {
    id: "decide",
    title: "DECIDE",
    hint: "CEREBRO",
    color: "#ffb703",
    phrase: "Reglas · horarios · IA local",
  },
  {
    id: "actua",
    title: "ACTÚA",
    hint: "ACTUADORES",
    color: "#ff4d8d",
    phrase: "Luces · clima · locks · energía",
  },
];

export default function WhatIs() {
  const [active, setActive] = useState<string>("siente");
  const current = CARDS.find((c) => c.id === active)!;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src={images.coverGrid} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-[#05060a]/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(62,224,255,0.18),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(255,183,3,0.12),transparent_40%)]" />

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl tracking-[0.5em] text-cyan-300 sm:text-2xl"
        >
          NO ES MAGIA
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display mt-2 text-center text-[14vw] text-white sm:text-[9vw]"
        >
          ES INMÓTICA
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 max-w-5xl text-center text-2xl font-light text-white/75 sm:text-4xl"
        >
          El inmueble se vuelve un sistema vivo
        </motion.p>

        <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map((card, i) => {
            const on = active === card.id;
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                onClick={() => setActive(card.id)}
                className="group relative overflow-hidden rounded-3xl border px-6 py-10 text-left transition-transform duration-300 hover:-translate-y-1"
                style={{
                  borderColor: on ? card.color : "rgba(255,255,255,0.12)",
                  background: on ? `${card.color}18` : "rgba(255,255,255,0.04)",
                  boxShadow: on ? `0 0 40px ${card.color}33` : "none",
                }}
              >
                <p className="text-lg tracking-[0.35em]" style={{ color: card.color }}>
                  {card.hint}
                </p>
                <p className="font-display mt-3 text-7xl text-white sm:text-8xl">{card.title}</p>
                <AnimatePresence mode="wait">
                  {on && (
                    <motion.p
                      key={card.phrase}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-2xl text-white/80"
                    >
                      {card.phrase}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <motion.p
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-2xl tracking-[0.2em] sm:text-3xl"
          style={{ color: current.color }}
        >
          TOCA UN BLOQUE
        </motion.p>
      </div>
    </div>
  );
}
