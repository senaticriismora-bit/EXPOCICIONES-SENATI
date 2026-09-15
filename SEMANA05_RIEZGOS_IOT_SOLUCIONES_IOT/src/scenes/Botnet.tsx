import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { BigTitle, Eyebrow } from "@/components/Scene";

const COLS = 14;
const ROWS = 5;
const N = COLS * ROWS;
const SEED = Math.floor(N / 2) + 2;

export default function Botnet() {
  const [cells, setCells] = useState<number[]>(() => Array(N).fill(0));
  const [mode, setMode] = useState<false | "infect" | "patch">(false);

  useEffect(() => {
    if (!mode) return;
    const id = setInterval(() => {
      setCells((prev) => {
        const next = [...prev];
        if (mode === "infect") {
          prev.forEach((v, i) => {
            if (v !== 1) return;
            const r = Math.floor(i / COLS);
            const c = i % COLS;
            [
              [r - 1, c],
              [r + 1, c],
              [r, c - 1],
              [r, c + 1],
            ].forEach(([nr, nc]) => {
              if (nr < 0 || nc < 0 || nr >= ROWS || nc >= COLS) return;
              const j = nr * COLS + nc;
              if (next[j] === 0 && Math.random() > 0.35) next[j] = 1;
            });
          });
        } else {
          let budget = 7;
          for (let i = 0; i < next.length && budget > 0; i++) {
            if (next[i] === 1) {
              next[i] = 2;
              budget--;
            }
          }
          for (let i = 0; i < next.length; i++) if (next[i] === 0) next[i] = 2;
        }
        return next;
      });
    }, 230);
    return () => clearInterval(id);
  }, [mode]);

  useEffect(() => {
    if (mode === "infect" && !cells.includes(0)) setMode(false);
    if (mode === "patch" && !cells.includes(1)) setMode(false);
  }, [cells, mode]);

  const infected = cells.filter((c) => c === 1).length;
  const patched = cells.filter((c) => c === 2).length;
  const gbps = (infected * 2.6).toFixed(1);
  const attacking = infected > 6;

  const launch = () => {
    const base = Array(N).fill(0);
    base[SEED] = 1;
    setCells(base);
    setMode("infect");
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow color="#a78bfa">06 · Simulación · Botnet</Eyebrow>
          <BigTitle>
            Tu cámara <span className="text-violet-400">ataca</span>
            <br />
            sin que lo sepas
          </BigTitle>
        </div>
        <p className="max-w-sm text-base leading-snug font-medium text-white/55 sm:text-lg">
          Mirai infectó más de <span className="text-white">600 000</span> equipos IoT con solo 62
          claves de fábrica.
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        {/* ---------- device grid ---------- */}
        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div
            className="grid gap-1.5 sm:gap-2"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0,1fr))` }}
          >
            {cells.map((v, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-md transition-all duration-500 sm:rounded-lg"
                style={{
                  background:
                    v === 1 ? "#a78bfa" : v === 2 ? "#34d399" : "rgba(255,255,255,0.09)",
                  boxShadow:
                    v === 1
                      ? "0 0 16px #a78bfa"
                      : v === 2
                        ? "0 0 12px rgba(52,211,153,.7)"
                        : "none",
                  transform: v === 1 ? "scale(1.12)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* DDoS beam */}
          <div className="mt-5 flex items-center gap-3">
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              {attacking && (
                <div
                  className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-violet-400 to-transparent"
                  style={{ animation: "sweep 1.1s linear infinite" }}
                />
              )}
            </div>
            <span
              className="transition-all duration-300"
              style={{
                transform: attacking ? "scale(1.15) rotate(-6deg)" : "scale(1)",
                color: attacking ? "#fb3b53" : "#ffffff80",
              }}
            >
              <Icon name="server" size={34} />
            </span>
          </div>
          <p className="mt-1 text-center font-mono text-[10px] tracking-[0.3em] text-white/45 uppercase">
            {attacking ? `DDoS en curso · ${gbps} Gbps` : "servidor víctima · en calma"}
          </p>
        </div>

        {/* ---------- console ---------- */}
        <div className="glass flex flex-col gap-3 rounded-3xl p-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-violet-400/40 bg-violet-500/10 p-3">
              <p className="font-mono text-[9px] tracking-[0.25em] text-violet-300 uppercase">
                Infectados
              </p>
              <p className="font-display text-[clamp(1.4rem,3.6vw,2.4rem)] leading-none text-violet-300">
                {infected}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-3">
              <p className="font-mono text-[9px] tracking-[0.25em] text-emerald-300 uppercase">
                Protegidos
              </p>
              <p className="font-display text-[clamp(1.4rem,3.6vw,2.4rem)] leading-none text-emerald-300">
                {patched}
              </p>
            </div>
          </div>

          <button
            onClick={launch}
            className="font-display cursor-pointer rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3.5 text-base tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.02] sm:text-lg"
          >
            <Icon name="bug" size={20} className="mr-2 inline align-[-4px]" />
            Lanzar Mirai
          </button>
          <button
            onClick={() => setMode("patch")}
            disabled={infected === 0}
            className="font-display cursor-pointer rounded-2xl border border-emerald-400/60 bg-emerald-500/15 px-4 py-3.5 text-base tracking-wide text-emerald-200 uppercase transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 sm:text-lg"
          >
            <Icon name="shield" size={20} className="mr-2 inline align-[-4px]" />
            Parchear y segmentar
          </button>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-base leading-snug font-medium text-white/70 sm:text-lg">
              Un equipo sin parches contagia a sus vecinos de red. Aislar el IoT en su propia
              <span className="text-emerald-300"> VLAN</span> corta la cadena.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
