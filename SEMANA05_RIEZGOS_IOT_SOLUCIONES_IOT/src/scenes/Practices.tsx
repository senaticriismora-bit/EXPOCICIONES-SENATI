import { useMemo, useState } from "react";
import shield from "@/assets/shield.png?inline";
import Icon from "@/components/Icon";
import { BigTitle, Eyebrow } from "@/components/Scene";

const ITEMS = [
  { icon: "key", t: "Cambiar la clave de fábrica", p: 20 },
  { icon: "upload", t: "Firmware siempre actualizado", p: 15 },
  { icon: "wall", t: "Red Wi-Fi aparte solo para IoT", p: 15 },
  { icon: "door", t: "No exponer puertos a internet", p: 14 },
  { icon: "lock", t: "Cifrado WPA3 · TLS · AES", p: 12 },
  { icon: "phone", t: "Doble factor en la app", p: 12 },
  { icon: "trash", t: "Apagar UPnP, Telnet y servicios extra", p: 7 },
  { icon: "tag", t: "Marcas con soporte y permisos revisados", p: 5 },
];

const grade = (s: number) =>
  s >= 90
    ? { label: "Blindado", color: "#34d399" }
    : s >= 60
      ? { label: "Sólido", color: "#22d3ee" }
      : s >= 30
        ? { label: "Mejorable", color: "#fbbf24" }
        : { label: "En riesgo", color: "#fb3b53" };

export default function Practices() {
  const [on, setOn] = useState<boolean[]>(() => ITEMS.map(() => false));
  const score = useMemo(() => ITEMS.reduce((a, it, i) => a + (on[i] ? it.p : 0), 0), [on]);
  const g = grade(score);

  const R = 78;
  const C = 2 * Math.PI * R;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow color="#34d399">07 · Buenas prácticas</Eyebrow>
          <BigTitle>
            Sube tu <span className="text-emerald-400">escudo</span>
          </BigTitle>
        </div>
        <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase sm:text-xs">
          ▸ activa cada medida
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        {/* ---------- checklist ---------- */}
        <div className="grid gap-2.5 sm:grid-cols-2">
          {ITEMS.map((it, i) => (
            <button
              key={it.t}
              onClick={() => setOn((o) => o.map((v, k) => (k === i ? !v : v)))}
              className={`group flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                on[i]
                  ? "border-emerald-400/60 bg-emerald-500/15 shadow-[0_14px_40px_-22px_rgba(52,211,153,.9)]"
                  : "border-white/12 bg-white/[0.04] hover:border-white/35"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ${
                  on[i]
                    ? "scale-110 bg-emerald-400/25 text-emerald-300"
                    : "bg-white/10 text-white/70 group-hover:scale-105"
                }`}
              >
                <Icon name={on[i] ? "check" : it.icon} size={22} />
              </span>
              <span className="flex-1">
                <span className="block text-[0.98rem] leading-tight font-semibold text-white sm:text-lg">
                  {it.t}
                </span>
                <span
                  className={`font-mono text-[10px] tracking-widest uppercase ${
                    on[i] ? "text-emerald-300" : "text-white/40"
                  }`}
                >
                  +{it.p} pts
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* ---------- gauge ---------- */}
        <div className="glass relative flex flex-col items-center justify-center overflow-hidden rounded-3xl p-5">
          <img
            src={shield}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover blend-screen transition-opacity duration-700"
            style={{
              opacity: 0.12 + (score / 100) * 0.45,
              maskImage: "radial-gradient(circle at 50% 50%, #000 35%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 35%, transparent 70%)",
            }}
          />
          <svg viewBox="0 0 200 200" className="relative h-52 w-52 sm:h-60 sm:w-60">
            <circle cx="100" cy="100" r={R} fill="none" stroke="#ffffff18" strokeWidth="16" />
            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={g.color}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (C * score) / 100}
              transform="rotate(-90 100 100)"
              style={{
                transition: "stroke-dashoffset .8s cubic-bezier(.16,1,.3,1), stroke .6s",
                filter: `drop-shadow(0 0 12px ${g.color})`,
              }}
            />
            <text
              x="100"
              y="97"
              textAnchor="middle"
              className="font-display"
              fontSize="52"
              fill="#fff"
            >
              {score}
            </text>
            <text
              x="100"
              y="126"
              textAnchor="middle"
              className="font-mono"
              fontSize="13"
              letterSpacing="3"
              fill="#ffffff80"
            >
              / 100
            </text>
          </svg>

          <p
            className="font-display relative mt-2 text-[clamp(1.4rem,4vw,2.4rem)] leading-none uppercase transition-colors duration-500"
            style={{ color: g.color, textShadow: `0 0 34px ${g.color}88` }}
          >
            {g.label}
          </p>

          <div className="relative mt-3 flex gap-2">
            <button
              onClick={() => setOn(ITEMS.map(() => true))}
              className="cursor-pointer rounded-xl border border-emerald-400/50 bg-emerald-400/15 px-3.5 py-2 font-mono text-[10px] tracking-widest text-emerald-200 uppercase transition-colors hover:bg-emerald-400/30"
            >
              Activar todo
            </button>
            <button
              onClick={() => setOn(ITEMS.map(() => false))}
              className="cursor-pointer rounded-xl border border-white/20 px-3.5 py-2 font-mono text-[10px] tracking-widest text-white/60 uppercase transition-colors hover:bg-white/10"
            >
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
