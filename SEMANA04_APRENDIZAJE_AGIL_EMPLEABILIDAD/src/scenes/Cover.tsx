import { useEffect } from "react";
import { motion } from "framer-motion";
import cityImg from "@/assets/city-bg.jpg";
import { Bot } from "@/components/Bot";
import { Particles } from "@/components/Particles";
import { PixelButton, PixelPanel, Tag } from "@/components/ui";
import { INSTRUCTOR, TEAM, TONE_HEX, useGame, type Tone } from "@/lib/game";

const LETTERS = ["S", "E", "N", "A", "T", "I"];
const LETTER_TONES: Tone[] = ["fire", "lemon", "ice", "fire", "lemon", "ice"];

function PixelAvatar({ color, variant }: { color: string; variant: number }) {
  return (
    <svg viewBox="0 0 16 16" className="h-20 w-20 md:h-24 md:w-24" shapeRendering="crispEdges">
      <rect x="3" y="3" width="10" height="10" fill={color} />
      <rect x="4" y="6" width="8" height="3" fill="#0b0b14" />
      <rect x="5" y="7" width="2" height="1" fill="#00e5ff" />
      <rect x="9" y="7" width="2" height="1" fill="#00e5ff" />
      <rect x="6" y="10" width="4" height="1" fill="#0b0b14" />
      <rect x="5" y="13" width="6" height="3" fill={color} />
      <rect x="6" y="14" width="4" height="1" fill="#0b0b14" />
      {variant === 0 && (
        <>
          <rect x="7" y="0" width="2" height="3" fill="#0b0b14" />
          <rect x="7" y="0" width="2" height="1" fill="#ffe600" />
        </>
      )}
      {variant === 1 && (
        <>
          <rect x="2" y="5" width="1" height="4" fill="#0b0b14" />
          <rect x="13" y="5" width="1" height="4" fill="#0b0b14" />
          <rect x="3" y="2" width="10" height="1" fill="#0b0b14" />
        </>
      )}
      {variant === 2 && (
        <>
          <rect x="3" y="1" width="10" height="2" fill="#0b0b14" />
          <rect x="1" y="3" width="14" height="1" fill="#0b0b14" />
        </>
      )}
      {variant === 3 && (
        <>
          <rect x="4" y="6" width="3" height="3" fill="none" stroke="#ffe600" strokeWidth="0.7" />
          <rect x="9" y="6" width="3" height="3" fill="none" stroke="#ffe600" strokeWidth="0.7" />
          <rect x="7" y="7" width="2" height="1" fill="#ffe600" />
        </>
      )}
    </svg>
  );
}

export function Cover() {
  const { next, sfx } = useGame();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        sfx.levelUp();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, sfx]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Fondo ciudad pixel */}
      <img
        src={cityImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover pixelated opacity-70"
        draggable={false}
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/70 to-ink" />
      <div className="absolute inset-x-0 bottom-0 h-[38vh] grid-floor opacity-50" />
      <Particles count={26} />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-ice/15 to-transparent animate-scan" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-24 pt-10 text-center md:px-8 md:pt-14">
        {/* SENATI letras */}
        <div className="flex gap-2 md:gap-3">
          {LETTERS.map((l, i) => (
            <motion.span
              key={l + i}
              initial={{ y: -120, opacity: 0, rotate: -20 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 + i * 0.1 }}
              className="pixel-box-sm flex h-14 w-12 items-center justify-center font-pixel text-2xl text-black md:h-20 md:w-16 md:text-4xl"
              style={{
                background: TONE_HEX[LETTER_TONES[i]],
                ["--pb" as string]: "#000",
              }}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4"
        >
          <Tag tone="cream">PRESENTA</Tag>
        </motion.div>

        {/* Título */}
        <h1 className="mt-8 font-pixel leading-[1.3]">
          <motion.span
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 120, damping: 14 }}
            className="block text-[clamp(1.2rem,3.6vw,2.6rem)] text-fire shadow-pixel"
          >
            METODOLOGÍAS DE
          </motion.span>
          <motion.span
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 120, damping: 14 }}
            className="mt-3 block text-[clamp(1.6rem,5.2vw,4.2rem)] text-lemon shadow-pixel-lg"
          >
            <span className="glitch" data-text="APRENDIZAJE ÁGIL">
              APRENDIZAJE ÁGIL
            </span>{" "}
            <span className="inline-block animate-flicker text-ice">⚡</span>
          </motion.span>
        </h1>

        {/* Instructor + Bot */}
        <div className="mt-14 grid w-full max-w-5xl items-center gap-10 md:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <PixelPanel tone="ice" title="INSTRUCTOR" className="p-6 text-left md:p-8">
              <p className="font-pixel text-[clamp(0.95rem,2vw,1.5rem)] leading-[1.6] text-cream">
                🎓 MG. {INSTRUCTOR}
              </p>
            </PixelPanel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, type: "spring", stiffness: 200, damping: 12 }}
            className="relative mx-auto"
          >
            <Bot size={200} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.3, type: "spring", stiffness: 300, damping: 12 }}
              className="pixel-box-sm absolute -right-6 -top-6 bg-cream px-4 py-3 font-pixel text-xs text-black md:text-sm"
              style={{ ["--pb" as string]: "#ffe600" }}
            >
              ¡HOLA! 👋
            </motion.div>
          </motion.div>
        </div>

        {/* Equipo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
          className="mt-16 w-full max-w-6xl"
        >
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <Tag tone="lemon">SELECT PLAYER</Tag>
            <h2 className="font-pixel text-xl text-cream shadow-pixel md:text-3xl">EQUIPO 4 · INTEGRANTES</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.n}
                initial={{ opacity: 0, y: 60, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 2 + i * 0.15, type: "spring", stiffness: 200, damping: 16 }}
                whileHover={{ y: -10, rotate: i % 2 ? 2 : -2 }}
                onMouseEnter={() => sfx.hover()}
                className="pixel-box flex flex-col items-center bg-navy/95 p-5 pt-8"
                style={{ ["--pb" as string]: TONE_HEX[m.color] }}
              >
                <span
                  className="absolute -top-5 left-1/2 -translate-x-1/2 border-4 border-black px-3 py-2 font-pixel text-xs text-black md:text-sm"
                  style={{ background: TONE_HEX[m.color] }}
                >
                  P{i + 1}
                </span>
                <span className="font-pixel text-4xl md:text-5xl" style={{ color: TONE_HEX[m.color] }}>
                  {m.n}
                </span>
                <div className="my-3 animate-float" style={{ animationDelay: `${i * 0.4}s` }}>
                  <PixelAvatar color={TONE_HEX[m.color]} variant={i} />
                </div>
                <p className="min-h-[3.5rem] text-center text-lg font-black leading-tight text-cream md:text-xl">
                  {m.name}
                </p>
                <span className="mt-3 font-pixel text-xs text-ice animate-blink">● READY</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <p className="font-pixel text-lg text-lemon shadow-pixel animate-blink md:text-2xl">PRESS START</p>
          <PixelButton
            size="xl"
            tone="fire"
            onClick={() => {
              sfx.levelUp();
              next();
            }}
          >
            ▶ START
          </PixelButton>
        </motion.div>
      </div>

      {/* Marquee inferior */}
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t-4 border-black bg-fire py-3">
        <div className="flex w-max animate-marquee whitespace-nowrap font-pixel text-sm text-black md:text-base">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="px-4">
              INSERT COIN ● SENATI ● METODOLOGÍAS DE APRENDIZAJE ÁGIL ⚡ ● EQUIPO 4 ● 2026 ● SENATI BOT ●
              INSERT COIN ● SENATI ● METODOLOGÍAS DE APRENDIZAJE ÁGIL ⚡ ● EQUIPO 4 ● 2026 ● SENATI BOT ●
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
