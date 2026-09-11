import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { LEVELS, useGame } from "@/lib/game";
import botImg from "@/assets/senati-bot.png";

function Counter({ value }: { value: number }) {
  const [d, setD] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.7,
      onUpdate: (v) => setD(Math.round(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);
  return <>{String(d).padStart(4, "0")}</>;
}

export function Hud() {
  const { index, xp, muted, toggleMute, goTo, prev, sfx } = useGame();
  const level = LEVELS[index];
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (xp === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [xp]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="fixed inset-x-0 top-0 z-50 border-b-4 border-black bg-ink/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 md:gap-5 md:px-6">
        {/* Retrato + nivel */}
        <button
          type="button"
          onClick={() => {
            sfx.click();
            prev();
          }}
          className="flex items-center gap-3 border-4 border-black bg-navy px-2 py-1 hover:bg-steel"
          title="Nivel anterior"
        >
          <img src={botImg} alt="" className="h-9 w-9 object-cover pixelated md:h-11 md:w-11" />
          <span className="font-pixel text-[11px] leading-tight text-cream md:text-sm">
            <span className="block text-amber">{level.short}</span>
            <span className="hidden md:block">{level.label}</span>
          </span>
        </button>

        {/* Mapa de niveles */}
        <nav className="flex flex-1 items-center justify-center gap-1.5 md:gap-2">
          {LEVELS.slice(1).map((l, k) => {
            const i = k + 1;
            const active = i === index;
            const passed = i < index;
            return (
              <button
                key={l.id}
                type="button"
                title={l.label}
                onClick={() => goTo(i)}
                className={cn(
                  "flex h-8 items-center justify-center border-4 border-black px-1.5 font-pixel text-[10px] transition-all md:h-11 md:min-w-11 md:text-lg",
                  active && "scale-110 bg-lemon text-black",
                  passed && "bg-fire text-black",
                  !active && !passed && "bg-steel text-cream/60 hover:bg-navy",
                )}
              >
                <span className="md:hidden">{i === 7 ? "★" : i}</span>
                <span className="hidden md:inline">{l.icon}</span>
              </button>
            );
          })}
        </nav>

        {/* XP + mute */}
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className={cn(
              "border-4 border-black bg-navy px-3 py-2 font-pixel text-xs text-lemon transition-transform md:text-base",
              bump && "scale-125 bg-fire text-black",
            )}
          >
            XP <Counter value={xp} />
          </div>
          <button
            type="button"
            onClick={toggleMute}
            className="border-4 border-black bg-navy px-2 py-1.5 text-lg hover:bg-steel md:px-3 md:text-xl"
            title={muted ? "Activar sonido" : "Silenciar"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>
      {/* barra de progreso */}
      <div className="h-2 w-full bg-black">
        <motion.div
          className="h-full bg-linear-to-r from-fire via-lemon to-ice"
          animate={{ width: `${(index / (LEVELS.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </div>
    </motion.header>
  );
}
