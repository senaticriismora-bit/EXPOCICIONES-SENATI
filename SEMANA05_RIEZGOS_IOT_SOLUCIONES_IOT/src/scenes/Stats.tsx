import CountUp from "@/components/CountUp";
import Icon from "@/components/Icon";
import { BigTitle, Eyebrow } from "@/components/Scene";

const STATS = [
  {
    to: 32,
    suffix: " mil M",
    label: "Dispositivos IoT conectados en el mundo hacia 2030",
    color: "#22d3ee",
    icon: "globe",
  },
  {
    to: 98,
    suffix: " %",
    label: "Del tráfico IoT viaja sin cifrar dentro de las redes",
    color: "#fbbf24",
    icon: "radio",
  },
  {
    to: 5,
    suffix: " min",
    label: "Tarda un dispositivo nuevo en recibir su primer escaneo",
    color: "#fb3b53",
    icon: "clock",
  },
];

export default function Stats({ active }: { active: boolean }) {
  return (
    <div>
      <Eyebrow>01 · El problema</Eyebrow>
      <BigTitle>
        Cada aparato <span className="text-cyan-300">conectado</span>
        <br />
        es una <span className="text-rose-400">puerta</span> nueva.
      </BigTitle>

      <p className="mt-4 max-w-2xl text-[clamp(1rem,1.9vw,1.45rem)] leading-snug font-medium text-white/60">
        El IoT multiplicó la comodidad… y también la{" "}
        <span className="text-white">superficie de ataque</span>.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="group glass relative overflow-hidden rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-2"
            style={{ boxShadow: `0 24px 60px -30px ${s.color}` }}
          >
            <div
              className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: s.color }}
            />
            <span
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: s.color + "1f", color: s.color }}
            >
              <Icon name={s.icon} size={26} />
            </span>
            <p
              className="font-display mt-3 text-[clamp(2.4rem,5.5vw,4rem)] leading-none"
              style={{ color: s.color, textShadow: `0 0 40px ${s.color}66` }}
            >
              <CountUp to={s.to} run={active} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-base leading-snug font-medium text-white/70 sm:text-lg">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
