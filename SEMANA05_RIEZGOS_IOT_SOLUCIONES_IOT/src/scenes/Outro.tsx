import { BigTitle, Eyebrow } from "@/components/Scene";

const RULES = [
  { n: "01", t: "Cambia la clave", s: "Nada sale de fábrica seguro.", c: "#22d3ee" },
  { n: "02", t: "Actualiza siempre", s: "El parche de hoy evita la noticia de mañana.", c: "#fbbf24" },
  { n: "03", t: "Aísla tu IoT", s: "Red propia, sin puertos abiertos.", c: "#34d399" },
];

const TEAM = ["MECHÁN ENEQUE JUAN ENRIQUE", "MORA DAMIAN CHRISTIAN ALFREDO", "MURGA CASTRO ANDRÉ ALEXANDER", "ROMERO CANAQUIRI ROLIN ROY"];

export default function Outro() {
  return (
    <div className="text-center">
      <Eyebrow color="#34d399">08 · Cierre</Eyebrow>
      <BigTitle className="mx-auto max-w-4xl">
        La seguridad no se compra:
        <br />
        <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
          se configura
        </span>
      </BigTitle>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {RULES.map((r) => (
          <div
            key={r.n}
            className="glass group relative overflow-hidden rounded-3xl p-6 text-left transition-transform duration-500 hover:-translate-y-2"
          >
            <div
              className="absolute -top-14 -left-10 h-36 w-36 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-60"
              style={{ background: r.c }}
            />
            <p className="font-display text-5xl" style={{ color: r.c }}>
              {r.n}
            </p>
            <p className="font-display mt-2 text-[clamp(1.2rem,2.6vw,1.9rem)] leading-none text-white uppercase">
              {r.t}
            </p>
            <p className="mt-2 text-base leading-snug font-medium text-white/65 sm:text-lg">{r.s}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-6 rounded-3xl px-5 py-5">
        <p className="font-mono text-[10px] tracking-[0.34em] text-cyan-300/80 uppercase">
          Instructor · Mg. Fernando Miguel Pisfil Ortiz
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {TEAM.map((m, i) => (
            <p key={m} className="font-display text-sm text-white/80 uppercase sm:text-base">
              <span className="mr-1.5 text-cyan-300/70">0{i + 1}</span>
              {m}
            </p>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
          Equipo 4 · Seguridad en IoT
        </p>
      </div>
    </div>
  );
}
