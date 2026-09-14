import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { images } from "../assets/media";

const PRESETS = [
  { id: "off", name: "OFF", overlay: "rgba(0,0,0,0.78)", brightness: 0.35, party: false },
  { id: "relax", name: "RELAX", overlay: "rgba(255,140,40,0.42)", brightness: 0.85, party: false },
  { id: "cine", name: "CINE", overlay: "rgba(20,40,120,0.55)", brightness: 0.5, party: false },
  { id: "dia", name: "DÍA", overlay: "rgba(255,244,220,0.12)", brightness: 1.15, party: false },
  { id: "party", name: "FIESTA", overlay: "rgba(255,0,160,0.28)", brightness: 1, party: true },
];

const COLORS = ["#3ee0ff", "#ffb703", "#ff4d8d", "#a78bfa", "#4ade80", "#ffffff"];

export default function Lights() {
  const [preset, setPreset] = useState("relax");
  const [color, setColor] = useState("#ffb703");
  const active = PRESETS.find((p) => p.id === preset)!;

  const overlay = useMemo(() => {
    if (preset === "off" || preset === "dia") return active.overlay;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r},${g},${b},0.4)`;
  }, [preset, color, active.overlay]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={images.lights}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${active.party ? "party-filter" : ""}`}
        style={{ filter: active.party ? undefined : `brightness(${active.brightness})` }}
      />
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: overlay, mixBlendMode: preset === "off" ? "multiply" : "overlay" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80" />

      <div className="relative flex h-full flex-col justify-between px-[6%] py-[6%]">
        <div>
          <p className="text-xl tracking-[0.45em] text-amber-300 sm:text-2xl">ESCENAS DE LUZ</p>
          <h2 className="font-display glow-amber mt-1 text-[16vw] leading-[0.85] text-white sm:text-[9vw]">
            ILUMINAR
          </h2>
          <p className="max-w-3xl text-2xl text-white/80 sm:text-4xl">Un toque. Toda la casa cambia.</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setColor(c);
                  if (preset === "off") setPreset("relax");
                }}
                className="h-14 w-14 rounded-full border-4 transition sm:h-16 sm:w-16"
                style={{
                  background: c,
                  borderColor: color === c ? "white" : "transparent",
                  boxShadow: color === c ? `0 0 24px ${c}` : "none",
                }}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {PRESETS.map((p) => {
              const on = preset === p.id;
              return (
                <motion.button
                  key={p.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setPreset(p.id)}
                  className="font-display rounded-2xl px-7 py-4 text-4xl sm:text-5xl"
                  style={{
                    background: on ? "white" : "rgba(0,0,0,0.45)",
                    color: on ? "#111" : "white",
                  }}
                >
                  {p.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
