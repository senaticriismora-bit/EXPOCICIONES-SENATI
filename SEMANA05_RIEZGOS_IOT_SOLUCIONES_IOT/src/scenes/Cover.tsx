import shield from "@/assets/shield.png?inline";

const TEAM = [
  { n: "01", a: "MECHÁN ENEQUE", b: "JUAN ENRIQUE" },
  { n: "02", a: "MORA DAMIAN", b: "CHRISTIAN ALFREDO" },
  { n: "03", a: "MURGA CASTRO", b: "ANDRÉ ALEXANDER" },
  { n: "04", a: "ROMERO CANAQUIRI", b: "ROLIN ROY" },
];

export default function Cover() {
  return (
    <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      {/* ---------- left: title ---------- */}
      <div>
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-[10px] font-bold tracking-[0.35em] text-cyan-300 uppercase sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
          </span>
          Experiencia interactiva
        </div>

        <h1 className="font-display text-[clamp(2.7rem,9vw,7.6rem)] leading-[0.84] tracking-[-0.03em] uppercase">
          <span className="block text-white">Seguridad</span>
          <span className="block text-white/45">en</span>
          <span
            className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 200%", animation: "gradient-shift 7s ease infinite" }}
          >
            IoT
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-[clamp(1rem,2.1vw,1.55rem)] leading-snug font-medium text-white/70">
          Cuando tu <span className="text-cyan-300">cámara</span> y tu{" "}
          <span className="text-amber-300">cerradura</span> se conectan a internet,
          <span className="text-white"> también se conectan a los atacantes.</span>
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2.5 font-mono text-[11px] tracking-widest text-white/50 uppercase sm:text-xs">
          <span className="rounded-lg border border-white/15 px-3 py-1.5">Riesgos</span>
          <span className="rounded-lg border border-white/15 px-3 py-1.5">Laboratorios</span>
          <span className="rounded-lg border border-white/15 px-3 py-1.5">Buenas prácticas</span>
        </div>

        <div className="mt-8 flex items-center gap-3 text-white/45">
          <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
            <span
              className="h-2 w-1 rounded-full bg-cyan-300"
              style={{ animation: "floaty 1.6s ease-in-out infinite" }}
            />
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase sm:text-xs">
            Desliza para explorar
          </span>
        </div>
      </div>

      {/* ---------- right: credits ---------- */}
      <div className="relative">
        <img
          src={shield}
          alt="Escudo de ciberseguridad"
          className="pointer-events-none absolute -top-24 -right-10 w-[380px] max-w-none opacity-50 blend-screen anim-float select-none"
          style={{
            maskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 68%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 68%)",
          }}
        />

        <div className="glass relative rounded-3xl p-5 shadow-[0_30px_90px_-20px_rgba(34,211,238,0.35)] sm:p-7">
          <div className="mb-5">
            <p className="font-mono text-[10px] tracking-[0.34em] text-cyan-300/80 uppercase">
              Instructor
            </p>
            <p className="font-display mt-1.5 text-[clamp(1.05rem,2.2vw,1.7rem)] leading-tight text-white uppercase">
              Mg. Fernando Miguel
              <br />
              Pisfil Ortiz
            </p>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-cyan-400/60 via-white/15 to-transparent" />

          <p className="mt-5 mb-3 font-mono text-[10px] tracking-[0.34em] text-white/50 uppercase">
            Equipo 4 · Integrantes
          </p>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {TEAM.map((m) => (
              <div
                key={m.n}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-400/10"
              >
                <span className="font-display absolute -top-2 -right-1 text-4xl text-white/[0.07] transition-colors group-hover:text-cyan-300/25">
                  {m.n}
                </span>
                <p className="font-display text-[0.95rem] leading-tight text-white uppercase">
                  {m.a}
                </p>
                <p className="text-sm leading-tight font-medium text-cyan-200/80">{m.b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
