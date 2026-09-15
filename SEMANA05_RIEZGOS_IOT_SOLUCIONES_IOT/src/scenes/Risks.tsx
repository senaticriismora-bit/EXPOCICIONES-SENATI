import { useState } from "react";
import Icon from "@/components/Icon";
import { BigTitle, Eyebrow } from "@/components/Scene";

const RISKS = [
  {
    icon: "key",
    title: "Claves de fábrica",
    front: "admin / admin",
    back: "Miles de cámaras conservan la clave que trae la caja. Es el ataque nº1.",
    fix: "Cámbiala en el primer arranque",
    color: "#fb3b53",
  },
  {
    icon: "chip",
    title: "Firmware viejo",
    front: "Sin parches",
    back: "Fallas publicadas hace años siguen abiertas porque nadie actualiza.",
    fix: "Actualización automática ON",
    color: "#fb923c",
  },
  {
    icon: "radio",
    title: "Sin cifrado",
    front: "Texto plano",
    back: "El video y los comandos viajan legibles: cualquiera en la red los lee.",
    fix: "Exige TLS / AES",
    color: "#fbbf24",
  },
  {
    icon: "globe",
    title: "Expuesto a internet",
    front: "Puerto abierto",
    back: "Buscadores como Shodan indexan tu dispositivo en minutos.",
    fix: "Cero puertos abiertos · VPN",
    color: "#22d3ee",
  },
  {
    icon: "bug",
    title: "Botnets",
    front: "Mirai & cía.",
    back: "Tu cámara ataca a terceros mientras tú ves todo normal.",
    fix: "Segmenta y monitorea",
    color: "#a78bfa",
  },
  {
    icon: "eye",
    title: "Privacidad",
    front: "Tus rutinas",
    back: "Audio, video y horarios guardados en servidores de terceros.",
    fix: "Revisa permisos y borra datos",
    color: "#34d399",
  },
];

export default function Risks() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow color="#fb3b53">03 · Top riesgos</Eyebrow>
          <BigTitle>
            Los <span className="text-rose-400">6 fallos</span> de siempre
          </BigTitle>
        </div>
        <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase sm:text-xs">
          ▸ gira cada tarjeta
        </p>
      </div>

      <div className="persp mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RISKS.map((r, i) => {
          const on = !!flipped[i];
          return (
            <button
              key={r.title}
              onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
              className="persp group h-[210px] cursor-pointer text-left"
            >
              <div
                className="preserve-3d relative h-full w-full transition-transform duration-700"
                style={{ transform: on ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                {/* front */}
                <div
                  className="backface-hidden glass absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl p-5 transition-shadow duration-300"
                  style={{ boxShadow: `0 20px 60px -34px ${r.color}` }}
                >
                  <div
                    className="absolute -top-14 -right-10 h-36 w-36 rounded-full opacity-25 blur-2xl"
                    style={{ background: r.color }}
                  />
                  <span style={{ color: r.color }}>
                    <Icon name={r.icon} size={38} />
                  </span>
                  <div>
                    <p
                      className="font-mono text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: r.color }}
                    >
                      {r.front}
                    </p>
                    <p className="font-display mt-1 text-[clamp(1.2rem,2.6vw,1.9rem)] leading-none text-white uppercase">
                      {r.title}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    click ↻
                  </span>
                </div>

                {/* back */}
                <div
                  className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-3xl border p-5"
                  style={{
                    transform: "rotateY(180deg)",
                    borderColor: r.color + "66",
                    background: `linear-gradient(150deg, ${r.color}22, rgba(4,7,15,.92))`,
                  }}
                >
                  <p className="text-[1.05rem] leading-snug font-semibold text-white sm:text-xl">
                    {r.back}
                  </p>
                  <div
                    className="rounded-xl px-3 py-2 text-sm font-bold"
                    style={{ background: r.color + "26", color: r.color }}
                  >
                    <Icon name="check" size={15} className="mr-1.5 inline align-[-3px]" />
                    {r.fix}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
