import { useState } from "react";
import { motion } from "framer-motion";

const NODES = [
  {
    id: "sen",
    kicker: "01",
    title: "SENSORES",
    color: "#3ee0ff",
    items: ["Presencia", "Luz", "Humedad", "Aire"],
  },
  {
    id: "hub",
    kicker: "02",
    title: "CEREBRO",
    color: "#ffb703",
    items: ["Hub", "Reglas", "App", "Nube"],
  },
  {
    id: "act",
    kicker: "03",
    title: "ACTUADORES",
    color: "#ff4d8d",
    items: ["Relés", "Motores", "HVAC", "Locks"],
  },
];

export default function System() {
  const [active, setActive] = useState("hub");
  const node = NODES.find((n) => n.id === active)!;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05060a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(62,224,255,0.16),transparent_42%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path
          d="M120 420 C 360 180, 840 180, 1080 420"
          fill="none"
          stroke="#3ee0ff"
          strokeWidth="3"
          className="arc-dash"
        />
        <path
          d="M120 480 C 360 720, 840 720, 1080 480"
          fill="none"
          stroke="#ffb703"
          strokeWidth="3"
          className="arc-dash"
        />
      </svg>

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <p className="text-xl tracking-[0.5em] text-white/60 sm:text-2xl">ARQUITECTURA</p>
        <h2 className="font-display mt-1 text-[12vw] text-white sm:text-[7.5vw]">CÓMO FLUYE</h2>

        <div className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {NODES.map((n, i) => {
            const on = active === n.id;
            return (
              <motion.button
                key={n.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                onClick={() => setActive(n.id)}
                className="relative rounded-[28px] border px-6 py-10 text-left"
                style={{
                  borderColor: on ? n.color : "rgba(255,255,255,0.12)",
                  background: on ? `${n.color}14` : "rgba(255,255,255,0.03)",
                  boxShadow: on ? `0 0 50px ${n.color}2b` : "none",
                }}
              >
                <p className="font-display text-4xl" style={{ color: n.color }}>
                  {n.kicker}
                </p>
                <p className="font-display mt-2 text-6xl text-white sm:text-7xl">{n.title}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {n.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full px-4 py-2 text-xl"
                      style={{
                        background: on ? n.color : "rgba(255,255,255,0.08)",
                        color: on ? "#111" : "#ddd",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.p
          key={node.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 font-display text-5xl sm:text-6xl"
          style={{ color: node.color }}
        >
          {node.id === "sen" && "CAPTA EL MUNDO REAL"}
          {node.id === "hub" && "TOMA LA DECISIÓN"}
          {node.id === "act" && "MUEVE LA CASA"}
        </motion.p>
      </div>
    </div>
  );
}
