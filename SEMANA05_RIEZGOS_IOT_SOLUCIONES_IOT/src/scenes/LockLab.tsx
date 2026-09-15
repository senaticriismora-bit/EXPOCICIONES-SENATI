import { useState } from "react";
import lockImg from "@/assets/lock.png?inline";
import Icon from "@/components/Icon";
import { BigTitle, Eyebrow } from "@/components/Scene";

const PLAIN = '{"cmd":"unlock","user":"ana","pin":"4821"}';
const CIPHER = "8f3a c40e 91bd 77fe a2c1 0b94 5d6e ff20";

export default function LockLab() {
  const [enc, setEnc] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [state, setState] = useState<"idle" | "open" | "blocked">("idle");

  const accent = enc ? "#34d399" : "#fb3b53";

  const toggle = () => {
    setEnc((e) => !e);
    setCaptured(false);
    setState("idle");
  };

  const replay = () => setState(enc ? "blocked" : "open");

  return (
    <div>
      <Eyebrow color="#fbbf24">05 · Laboratorio 2 · Cerradura inteligente</Eyebrow>
      <BigTitle>
        Te copian la <span className="text-amber-300">señal</span>
        <br />y abren tu puerta.
      </BigTitle>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---------- radio channel ---------- */}
        <div className="glass relative overflow-hidden rounded-3xl p-5">
          <div className="relative flex h-[190px] items-center justify-between sm:h-[210px]">
            {/* phone */}
            <div className="z-10 flex w-20 flex-col items-center gap-1.5 sm:w-24">
              <span className="flex h-16 w-11 items-center justify-center rounded-xl border-2 border-cyan-300/70 bg-cyan-400/10 text-cyan-300 sm:h-20 sm:w-14">
                <Icon name="phone" size={28} />
              </span>
              <span className="font-mono text-[9px] tracking-widest text-white/50 uppercase">App</span>
            </div>

            {/* channel */}
            <div className="absolute inset-x-16 top-1/2 -translate-y-1/2 sm:inset-x-24">
              <div className="relative h-0.5 w-full bg-gradient-to-r from-cyan-400/40 via-white/25 to-amber-300/50">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="absolute -top-3 flex h-6 items-center rounded-md px-1.5 font-mono text-[9px] font-bold whitespace-nowrap"
                    style={{
                      background: accent + "26",
                      border: `1px solid ${accent}99`,
                      color: accent,
                      animation: `flow 3.2s linear ${i * 0.8}s infinite`,
                    }}
                  >
                    {enc ? "8f3a…" : "unlock"}
                  </span>
                ))}
              </div>
              <p
                className="mt-6 text-center font-mono text-[10px] tracking-[0.25em] uppercase"
                style={{ color: accent }}
              >
                {enc ? "AES-256 + TLS ✓" : "sin cifrado ✖"}
              </p>
            </div>

            {/* lock */}
            <div className="z-10 flex w-32 flex-col items-center gap-1.5 sm:w-40">
              <div
                className={`relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl sm:h-40 sm:w-40 ${
                  state === "open" ? "anim-shake" : ""
                }`}
                style={{
                  boxShadow:
                    state === "open"
                      ? "0 0 60px -6px rgba(251,59,83,.85)"
                      : "0 0 50px -14px rgba(251,191,36,.7)",
                }}
              >
                <img
                  src={lockImg}
                  alt="Cerradura inteligente"
                  className="h-full w-full scale-110 object-contain blend-screen"
                  style={{
                    maskImage: "radial-gradient(circle at 50% 50%, #000 52%, transparent 78%)",
                    WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 52%, transparent 78%)",
                  }}
                />
              </div>
              <span
                className="font-display text-sm uppercase"
                style={{ color: state === "open" ? "#fb3b53" : "#34d399" }}
              >
                <Icon
                  name={state === "open" ? "unlock" : "lock"}
                  size={16}
                  className="mr-1.5 inline align-[-3px]"
                />
                {state === "open" ? "Abierta" : "Cerrada"}
              </span>
            </div>

            {/* attacker */}
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center">
              <span
                className="text-rose-400 transition-transform duration-300"
                style={{ transform: captured ? "scale(1.18)" : "scale(1)" }}
              >
                <Icon name="radio" size={32} />
              </span>
              <span className="font-mono text-[9px] tracking-widest text-rose-300/80 uppercase">
                Atacante
              </span>
            </div>
          </div>

          {/* captured payload */}
          <div className="mt-2 rounded-2xl border border-white/10 bg-black/60 p-3.5">
            <p className="font-mono text-[10px] tracking-[0.3em] text-white/45 uppercase">
              Paquete capturado por el atacante
            </p>
            <p
              className="mt-1.5 font-mono text-[11px] break-all sm:text-sm"
              style={{ color: captured ? accent : "#ffffff40" }}
            >
              {captured ? (enc ? CIPHER : PLAIN) : "— sin datos —"}
            </p>
          </div>
        </div>

        {/* ---------- controls ---------- */}
        <div className="glass flex flex-col gap-3 rounded-3xl p-5">
          <button
            onClick={toggle}
            className="flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors duration-300"
            style={{ borderColor: accent + "77", background: accent + "18" }}
          >
            <span className="text-left">
              <span className="font-display block text-[clamp(1rem,2.2vw,1.45rem)] text-white uppercase">
                Cifrado
              </span>
              <span className="font-mono text-[10px] tracking-widest text-white/55 uppercase">
                {enc ? "activado" : "desactivado"}
              </span>
            </span>
            <span
              className="relative h-9 w-16 rounded-full transition-colors duration-300"
              style={{ background: enc ? "#34d39955" : "#ffffff22" }}
            >
              <span
                className="absolute top-1 h-7 w-7 rounded-full transition-all duration-300"
                style={{ left: enc ? "2rem" : "0.25rem", background: accent, boxShadow: `0 0 18px ${accent}` }}
              />
            </span>
          </button>

          <button
            onClick={() => setCaptured(true)}
            className="cursor-pointer rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 font-display text-base tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.02] hover:border-white/40 sm:text-lg"
          >
            <Icon name="radio" size={20} className="mr-2 inline align-[-4px]" />
            Interceptar la señal
          </button>

          <button
            onClick={replay}
            disabled={!captured}
            className="cursor-pointer rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-3.5 font-display text-base tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 sm:text-lg"
          >
            ↩ Reenviar (replay attack)
          </button>

          <div
            className="mt-auto rounded-2xl border p-4 transition-colors duration-500"
            style={{
              borderColor: state === "open" ? "#fb3b5388" : state === "blocked" ? "#34d39988" : "#ffffff1a",
              background: state === "open" ? "#fb3b5320" : state === "blocked" ? "#34d39920" : "#ffffff08",
            }}
          >
            {state === "idle" && (
              <p className="text-base leading-snug font-medium text-white/60 sm:text-lg">
                Intercepta el paquete y reenvíalo. Prueba con el cifrado apagado… y luego encendido.
              </p>
            )}
            {state === "open" && (
              <>
                <p className="font-display text-[clamp(1.2rem,3vw,2rem)] leading-none text-rose-400 uppercase">
                  Puerta abierta
                </p>
                <p className="mt-2 text-base leading-snug font-medium text-white/80 sm:text-lg">
                  El comando viajaba en texto plano: basta copiarlo y repetirlo.
                </p>
              </>
            )}
            {state === "blocked" && (
              <>
                <p className="font-display text-[clamp(1.2rem,3vw,2rem)] leading-none text-emerald-400 uppercase">
                  Ataque rechazado
                </p>
                <p className="mt-2 text-base leading-snug font-medium text-white/80 sm:text-lg">
                  Cifrado + marca de tiempo: el paquete repetido caduca y se descarta.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
