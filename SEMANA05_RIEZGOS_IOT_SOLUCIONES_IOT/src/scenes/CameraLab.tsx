import { useEffect, useRef, useState } from "react";
import camera from "@/assets/camera.png?inline";
import Icon from "@/components/Icon";
import { BigTitle, Eyebrow } from "@/components/Scene";

type Pw = {
  v: string;
  crack: boolean;
  time: string;
  note: string;
  strength: number;
  color: string;
};

const PWS: Pw[] = [
  { v: "admin", crack: true, time: "0,2 segundos", note: "Clave de fábrica", strength: 4, color: "#fb3b53" },
  { v: "123456", crack: true, time: "0,4 segundos", note: "Top 1 del mundo", strength: 8, color: "#fb3b53" },
  { v: "camara2024", crack: true, time: "6 horas", note: "Palabra + año", strength: 42, color: "#fbbf24" },
  { v: "V7#kq!Lm92@Zr", crack: false, time: "2 000 millones de años", note: "13 caracteres aleatorios", strength: 100, color: "#34d399" },
];

const DICT = [
  "admin", "1234", "root", "password", "12345678", "camera", "admin123",
  "guest", "support", "888888", "ipcam", "user", "system", "default", "qwerty",
];

const rndHash = () =>
  Array.from({ length: 12 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");

export default function CameraLab() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"idle" | "run" | "done">("idle");
  const [lines, setLines] = useState<string[]>([]);
  const [prog, setProg] = useState(0);
  const termRef = useRef<HTMLDivElement | null>(null);
  const pw = PWS[idx];

  useEffect(() => {
    if (phase !== "run") return;
    const steps = pw.crack ? 16 : 24;
    let i = 0;
    const id = setInterval(() => {
      i++;
      const guess = pw.crack
        ? i >= steps
          ? pw.v
          : DICT[Math.floor(Math.random() * DICT.length)] + (Math.random() > 0.6 ? Math.floor(Math.random() * 999) : "")
        : rndHash();
      setLines((l) => [
        ...l.slice(-60),
        pw.crack && i >= steps
          ? `>> ${guess}  ✔ ACCESO CONCEDIDO`
          : `try ${String(i).padStart(3, "0")}  ${guess}  ✖`,
      ]);
      setProg(pw.crack ? Math.min(100, (i / steps) * 100) : Math.min(9, i * 0.4));
      if (i >= steps) {
        clearInterval(id);
        setPhase("done");
      }
    }, 120);
    return () => clearInterval(id);
  }, [phase, pw]);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  const reset = (n: number) => {
    setIdx(n);
    setPhase("idle");
    setLines([]);
    setProg(0);
  };

  const breached = phase === "done" && pw.crack;
  const safe = phase === "done" && !pw.crack;

  return (
    <div>
      <Eyebrow color="#fb3b53">04 · Laboratorio 1 · Cámara IP</Eyebrow>
      <BigTitle>
        Rompe la <span className="text-rose-400">contraseña</span>
      </BigTitle>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        {/* ---------- camera viewport ---------- */}
        <div
          className={`glass relative overflow-hidden rounded-3xl p-4 transition-colors duration-500 ${
            breached ? "anim-shake border-rose-400/70" : safe ? "border-emerald-400/60" : ""
          }`}
          style={{
            boxShadow: breached
              ? "0 0 90px -15px rgba(251,59,83,.7)"
              : safe
                ? "0 0 90px -20px rgba(52,211,153,.6)"
                : "0 30px 80px -40px rgba(34,211,238,.8)",
          }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase">
            <span className="text-white/50">CAM-01 · Puerta principal</span>
            <span className={`flex items-center gap-1.5 ${breached ? "text-rose-400" : "text-emerald-300"}`}>
              <span className={`h-2 w-2 rounded-full ${breached ? "bg-rose-500" : "bg-emerald-400"} anim-blink`} />
              {breached ? "INTRUSO" : "EN VIVO"}
            </span>
          </div>

          <div className="relative mt-2 flex h-[230px] items-center justify-center overflow-hidden rounded-2xl bg-black/60 sm:h-[280px]">
            <img
              src={camera}
              alt="Cámara de seguridad inteligente"
              className="h-full w-auto object-contain blend-screen anim-float"
            />
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.05)_0px,rgba(255,255,255,.05)_1px,transparent_1px,transparent_4px)]" />
            {breached && (
              <div className="absolute inset-0 flex items-center justify-center bg-rose-600/25 backdrop-blur-[1px]">
                <p className="font-display rotate-[-6deg] rounded-xl border-4 border-rose-400 px-4 py-2 text-[clamp(1.1rem,3.4vw,2.2rem)] text-rose-200 uppercase">
                  Acceso total
                </p>
              </div>
            )}
            {safe && (
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-600/20">
                <p className="font-display flex rotate-[-4deg] items-center gap-2 rounded-xl border-4 border-emerald-400 px-4 py-2 text-[clamp(1.1rem,3.4vw,2.2rem)] text-emerald-200 uppercase">
                  <Icon name="shield" size={30} /> Bloqueado
                </p>
              </div>
            )}
          </div>

          {/* strength meter */}
          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-xs tracking-widest text-white/50 uppercase">Fuerza</p>
              <p className="font-display text-lg" style={{ color: pw.color }}>
                {pw.note}
              </p>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pw.strength}%`, background: pw.color, boxShadow: `0 0 18px ${pw.color}` }}
              />
            </div>
          </div>
        </div>

        {/* ---------- attack console ---------- */}
        <div className="glass rounded-3xl p-4 sm:p-5">
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">
            1 · Elige la contraseña de la cámara
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {PWS.map((p, i) => (
              <button
                key={p.v}
                onClick={() => reset(i)}
                className={`cursor-pointer rounded-xl border px-3.5 py-2 font-mono text-sm font-bold transition-all duration-200 sm:text-base ${
                  i === idx
                    ? "scale-105 text-white"
                    : "border-white/15 text-white/55 hover:border-white/40 hover:text-white"
                }`}
                style={i === idx ? { borderColor: p.color, background: p.color + "26" } : undefined}
              >
                {p.v}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setLines([]);
              setProg(0);
              setPhase("run");
            }}
            disabled={phase === "run"}
            className="mt-4 w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-5 py-3.5 font-display text-lg tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60 sm:text-xl"
          >
            {phase === "run" ? "Atacando…" : "▶ Lanzar ataque de fuerza bruta"}
          </button>

          <div
            ref={termRef}
            className="no-bar mt-3 h-[150px] overflow-y-auto rounded-2xl border border-white/10 bg-black/70 p-3 font-mono text-[11px] leading-relaxed sm:text-xs"
          >
            {lines.length === 0 && (
              <p className="text-white/35">
                $ hydra -l admin -P rockyou.txt rtsp://192.168.1.64
                <span className="anim-blink">▌</span>
              </p>
            )}
            {lines.map((l, i) => (
              <p key={i} className={l.includes("✔") ? "font-bold text-emerald-400" : "text-white/45"}>
                {l}
              </p>
            ))}
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-150"
              style={{ width: `${prog}%` }}
            />
          </div>

          <div
            className={`mt-3 rounded-2xl border p-3.5 transition-colors duration-500 ${
              breached
                ? "border-rose-400/50 bg-rose-500/15"
                : safe
                  ? "border-emerald-400/50 bg-emerald-500/15"
                  : "border-white/10 bg-white/5"
            }`}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">
              Tiempo estimado para romperla
            </p>
            <p
              className="font-display text-[clamp(1.2rem,3.2vw,2.2rem)] leading-tight"
              style={{ color: pw.color }}
            >
              {pw.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
