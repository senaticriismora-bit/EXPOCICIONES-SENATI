import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { images } from "../assets/media";

const DEVICES = [
  { id: "luces", name: "LUCES", w: 180, color: "#ffb703" },
  { id: "clima", name: "CLIMA", w: 920, color: "#3ee0ff" },
  { id: "cocina", name: "COCINA", w: 640, color: "#ff4d8d" },
  { id: "standby", name: "STANDBY", w: 110, color: "#a78bfa" },
];

export default function Energy() {
  const [on, setOn] = useState<Record<string, boolean>>({
    luces: true,
    clima: true,
    cocina: false,
    standby: true,
  });

  const used = useMemo(
    () => DEVICES.reduce((acc, d) => acc + (on[d.id] ? d.w : 0), 0),
    [on]
  );
  const solar = 740;
  const net = used - solar;
  const saving = net <= 0;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src={images.energy} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#05060a]/78" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,183,3,0.22),transparent_40%)]" />

      <div className="relative flex h-full flex-col justify-between px-[6%] py-[6%]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xl tracking-[0.45em] text-amber-300 sm:text-2xl">GESTIÓN ENERGÉTICA</p>
            <h2 className="font-display mt-1 text-[14vw] leading-[0.85] text-white sm:text-[8vw]">
              AHORRO
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xl tracking-[0.3em] text-white/60">CONSUMO LIVE</p>
            <p className="font-display text-8xl text-white sm:text-9xl">{used}</p>
            <p className="text-3xl text-cyan-300">WATTS</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {DEVICES.map((d) => {
            const active = on[d.id];
            const pct = Math.round((d.w / 920) * 100);
            return (
              <button
                key={d.id}
                onClick={() => setOn((s) => ({ ...s, [d.id]: !s[d.id] }))}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left"
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-5xl text-white sm:text-6xl">{d.name}</p>
                  <p className="font-display text-4xl" style={{ color: active ? d.color : "#666" }}>
                    {active ? `${d.w}W` : "0W"}
                  </p>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: active ? `${pct}%` : "0%" }}
                    className="h-full rounded-full"
                    style={{ background: d.color }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div
          className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-5"
          style={{ background: saving ? "rgba(74,222,128,0.16)" : "rgba(255,77,141,0.16)" }}
        >
          <p className="font-display text-4xl text-white sm:text-5xl">SOLAR {solar}W</p>
          <p className="font-display text-5xl sm:text-6xl" style={{ color: saving ? "#4ade80" : "#ff4d8d" }}>
            {saving ? "EXCEDENTE" : "RED"} {Math.abs(net)}W
          </p>
        </div>
      </div>
    </div>
  );
}
