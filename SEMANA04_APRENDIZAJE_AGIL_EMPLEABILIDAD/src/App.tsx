import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { GameContext, LEVELS, type GameCtx } from "@/lib/game";
import { useSfx } from "@/lib/sfx";
import { Hud } from "@/components/Hud";
import { Cover } from "@/scenes/Cover";
import { Concept } from "@/scenes/Concept";
import { Pillars } from "@/scenes/Pillars";
import { Methods } from "@/scenes/Methods";
import { Simulation } from "@/scenes/Simulation";
import { Victory } from "@/scenes/Victory";

const SCENES = [Cover, Concept, Pillars, Methods, Simulation, Victory];

export default function App() {
  const [index, setIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [muted, setMuted] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [wipe, setWipe] = useState<{ label: string; short: string } | null>(null);
  const [run, setRun] = useState(0); // fuerza remount al reiniciar
  const busy = useRef(false);
  const sfx = useSfx(muted);

  const goTo = useCallback(
    (i: number) => {
      const target = Math.max(0, Math.min(LEVELS.length - 1, i));
      if (target === index || busy.current) return;
      busy.current = true;
      const lvl = LEVELS[target];
      setWipe({ label: lvl.label, short: lvl.short });
      sfx.levelUp();
      window.setTimeout(() => {
        setIndex(target);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }, 480);
      window.setTimeout(() => {
        setWipe(null);
        busy.current = false;
      }, 1100);
    },
    [index, sfx],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const restart = useCallback(() => {
    setXp(0);
    setRun((r) => r + 1);
    goTo(0);
  }, [goTo]);

  const shake = useCallback(() => {
    setShaking(true);
    window.setTimeout(() => setShaking(false), 500);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && index > 0) next();
      if (e.key === "ArrowLeft" && index > 0) prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, next, prev]);

  const ctx = useMemo<GameCtx>(
    () => ({
      index,
      xp,
      addXp: (n) => setXp((v) => v + n),
      next,
      prev,
      goTo,
      restart,
      sfx,
      muted,
      toggleMute: () => setMuted((m) => !m),
      shake,
    }),
    [index, xp, next, prev, goTo, restart, sfx, muted, shake],
  );

  const SceneComp = SCENES[index];

  return (
    <GameContext.Provider value={ctx}>
      <div className="crt relative min-h-screen bg-ink text-cream">
        {index > 0 && <Hud />}

        <div className={cn(shaking && "animate-shake")}>
          <AnimatePresence mode="wait">
            <SceneComp key={`${run}-${index}`} />
          </AnimatePresence>
        </div>

        {/* Transición de nivel */}
        <AnimatePresence>
          {wipe && (
            <motion.div
              key="wipe"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[90] flex items-center justify-center stripes animate-stripes"
            >
              <motion.div
                initial={{ scale: 0.4, rotate: -6 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 14 }}
                className="pixel-box bg-ink px-10 py-8 text-center"
                style={{ ["--pb" as string]: "#ffe600" }}
              >
                <p className="font-pixel text-base text-amber md:text-2xl">{wipe.short}</p>
                <p className="mt-4 font-pixel text-2xl text-cream md:text-5xl">{wipe.label}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameContext.Provider>
  );
}
