import { useState } from "react";
import Icon from "@/components/Icon";
import { BigTitle, Eyebrow } from "@/components/Scene";

type Device = {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  risk: string;
  fix: string;
};

const DEVICES: Device[] = [
  {
    id: "cam",
    name: "Cámara de seguridad",
    icon: "camera",
    x: 20,
    y: 18,
    risk: "Su video en vivo queda expuesto en internet con la clave de fábrica.",
    fix: "Cambia usuario y contraseña, apaga UPnP y nunca abras el puerto al exterior.",
  },
  {
    id: "lock",
    name: "Cerradura inteligente",
    icon: "lock",
    x: 47.5,
    y: 70,
    risk: "El atacante graba la señal de apertura y la reenvía (replay attack).",
    fix: "Cifrado AES, comandos con marca de tiempo y verificación en dos pasos.",
  },
  {
    id: "router",
    name: "Router Wi-Fi",
    icon: "wifi",
    x: 74,
    y: 40,
    risk: "Clave débil y firmware viejo: quien entra, controla toda la casa.",
    fix: "WPA3, contraseña larga y una red de invitados solo para el IoT.",
  },
  {
    id: "voice",
    name: "Asistente de voz",
    icon: "mic",
    x: 32,
    y: 47,
    risk: "Escucha continua y grabaciones guardadas en la nube sin control.",
    fix: "Revisa permisos, borra el historial y usa el botón de silencio.",
  },
  {
    id: "tv",
    name: "Smart TV",
    icon: "tv",
    x: 60,
    y: 22,
    risk: "Apps sin actualizar que sirven de puente hacia tus otros equipos.",
    fix: "Actualiza el firmware y desactiva el rastreo de contenido (ACR).",
  },
  {
    id: "sensor",
    name: "Sensor / termostato",
    icon: "thermo",
    x: 84,
    y: 74,
    risk: "Equipo olvidado: el pivote perfecto para moverse por la red interna.",
    fix: "Sepáralo en una VLAN y bloquea su salida directa a internet.",
  },
];

export default function SmartHome() {
  const [sel, setSel] = useState<Device>(DEVICES[0]);

  return (
    <div>
      <Eyebrow>02 · Superficie de ataque</Eyebrow>
      <BigTitle>
        Tu casa tiene <span className="text-amber-300">6 puertas</span>
        <br />
        que nadie vigila.
      </BigTitle>

      <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {/* ---------- interactive house ---------- */}
        <div className="glass relative aspect-[16/10] w-full overflow-hidden rounded-3xl p-2">
          <svg viewBox="0 0 800 500" className="h-full w-full">
            <defs>
              <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.02" />
              </linearGradient>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="#22d3ee" strokeOpacity="0.09" />
              </pattern>
            </defs>
            <rect width="800" height="500" fill="url(#grid)" />
            {/* roof */}
            <path
              d="M120 190 L400 55 L680 190"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3"
              strokeOpacity="0.85"
            />
            <path d="M120 190 L400 55 L680 190 Z" fill="url(#wall)" />
            {/* walls */}
            <rect
              x="150"
              y="190"
              width="500"
              height="250"
              fill="url(#wall)"
              stroke="#22d3ee"
              strokeWidth="2.5"
              strokeOpacity="0.7"
            />
            {/* inner divisions */}
            <path
              d="M150 320 H650 M400 190 V320 M290 320 V440 M520 320 V440"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeOpacity="0.3"
            />
            {/* door */}
            <rect
              x="355"
              y="350"
              width="90"
              height="90"
              rx="4"
              fill="#22d3ee"
              fillOpacity="0.1"
              stroke="#fbbf24"
              strokeWidth="2.5"
              strokeOpacity="0.8"
            />
            {/* windows */}
            <rect
              x="195"
              y="230"
              width="70"
              height="55"
              fill="#22d3ee"
              fillOpacity="0.12"
              stroke="#22d3ee"
              strokeOpacity="0.5"
            />
            <rect
              x="540"
              y="230"
              width="70"
              height="55"
              fill="#22d3ee"
              fillOpacity="0.12"
              stroke="#22d3ee"
              strokeOpacity="0.5"
            />
            {/* ground */}
            <path d="M40 440 H760" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.35" />
            {/* wifi waves from router */}
            <g stroke="#22d3ee" fill="none" strokeWidth="2" opacity="0.55">
              <circle cx="592" cy="200" r="26">
                <animate
                  attributeName="r"
                  values="10;60"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="0s"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
              <circle cx="592" cy="200" r="26">
                <animate
                  attributeName="r"
                  values="10;60"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="1.5s"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="1.5s"
                />
              </circle>
            </g>
          </svg>

          {/* scanning beam */}
          <div
            className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent"
            style={{ animation: "scan 5s linear infinite" }}
          />

          {/* hotspots */}
          {DEVICES.map((d) => {
            const on = sel.id === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSel(d)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${d.x}%`, top: `${d.y}%` }}
                aria-label={d.name}
              >
                <span
                  className="absolute inset-0 rounded-full border-2 border-rose-400"
                  style={{ animation: "pulse-ring 2.2s ease-out infinite" }}
                />
                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 text-xl transition-all duration-300 sm:h-14 sm:w-14 sm:text-2xl ${
                    on
                      ? "scale-115 border-amber-300 bg-amber-300/25 shadow-[0_0_40px_rgba(251,191,36,0.75)]"
                      : "border-white/35 bg-slate-900/70 hover:scale-110 hover:border-cyan-300"
                  }`}
                >
                  <Icon name={d.icon} size={26} />
                </span>
              </button>
            );
          })}

          <span className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.25em] text-white/45 uppercase sm:text-xs">
            ▸ toca un dispositivo
          </span>
        </div>

        {/* ---------- detail panel ---------- */}
        <div key={sel.id} className="glass rounded-3xl p-6" style={{ animation: "rise .5s both" }}>
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-300">
              <Icon name={sel.icon} size={30} />
            </span>
            <p className="font-display text-[clamp(1.1rem,2.4vw,1.75rem)] leading-tight text-white uppercase">
              {sel.name}
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-rose-400/35 bg-rose-500/10 p-4">
            <p className="font-mono text-[10px] tracking-[0.3em] text-rose-300 uppercase">
              <Icon name="alert" size={13} className="mr-1 inline align-[-2px]" /> Riesgo
            </p>
            <p className="mt-1.5 text-lg leading-snug font-medium text-white/90">{sel.risk}</p>
          </div>

          <div className="mt-3 rounded-2xl border border-emerald-400/35 bg-emerald-500/10 p-4">
            <p className="font-mono text-[10px] tracking-[0.3em] text-emerald-300 uppercase">
              <Icon name="check" size={13} className="mr-1 inline align-[-2px]" /> Mitigación
            </p>
            <p className="mt-1.5 text-lg leading-snug font-medium text-white/90">{sel.fix}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
