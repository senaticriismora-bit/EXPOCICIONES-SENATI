import { useState } from "react";
import { motion } from "framer-motion";
import { images } from "../assets/media";

const CAMS = [
  { id: "patio", name: "PATIO", src: images.heroHouse },
  { id: "sala", name: "SALA", src: images.lights },
  { id: "acceso", name: "ACCESO", src: images.security },
  { id: "techo", name: "TECHO", src: images.energy },
];

export default function Security() {
  const [armed, setArmed] = useState(true);
  const [locked, setLocked] = useState(true);
  const [cam, setCam] = useState("acceso");
  const current = CAMS.find((c) => c.id === cam)!;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05060a]">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-[1.35fr_0.9fr]">
        <div className="relative min-h-0">
          <img src={current.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="scanline absolute inset-0" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-cyan-300/10 to-transparent scan-move" />
          <div className="absolute left-6 top-6 flex items-center gap-3">
            <span
              className="h-4 w-4 rounded-full"
              style={{
                background: armed ? "#ff3355" : "#4ade80",
                animation: armed ? "blink 1.1s infinite" : undefined,
              }}
            />
            <p className="font-display text-4xl text-white sm:text-5xl">CAM {current.name}</p>
          </div>
          <p className="absolute bottom-6 left-6 font-display text-3xl text-cyan-300">LIVE · 04 CH</p>
        </div>

        <div className="relative flex flex-col justify-between gap-6 bg-black/50 p-8 lg:p-10">
          <div>
            <p className="text-xl tracking-[0.4em] text-rose-300">PERÍMETRO</p>
            <h2 className="font-display mt-1 text-7xl text-white sm:text-8xl">SEGURO</h2>
          </div>

          <button
            onClick={() => setArmed((v) => !v)}
            className="font-display w-full rounded-3xl py-6 text-6xl transition"
            style={{
              background: armed ? "#ff3355" : "#4ade80",
              color: "#111",
              boxShadow: armed ? "0 0 40px rgba(255,51,85,0.45)" : "0 0 40px rgba(74,222,128,0.35)",
            }}
          >
            {armed ? "ARMADA" : "LISTA"}
          </button>

          <button
            onClick={() => setLocked((v) => !v)}
            className="flex items-center justify-between rounded-3xl border border-white/15 bg-white/5 px-6 py-5"
          >
            <span className="font-display text-5xl text-white">{locked ? "CERRADO" : "ABIERTO"}</span>
            <span className="font-display text-4xl" style={{ color: locked ? "#3ee0ff" : "#ffb703" }}>
              {locked ? "LOCK" : "OPEN"}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            {CAMS.map((c) => (
              <motion.button
                key={c.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCam(c.id)}
                className="overflow-hidden rounded-2xl border"
                style={{ borderColor: cam === c.id ? "#3ee0ff" : "transparent" }}
              >
                <img src={c.src} alt="" className="h-24 w-full object-cover sm:h-28" />
                <p className="font-display bg-black/70 py-2 text-2xl text-white">{c.name}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
