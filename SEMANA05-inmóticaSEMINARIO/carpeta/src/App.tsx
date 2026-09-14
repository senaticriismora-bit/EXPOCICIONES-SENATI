import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Cover from "./slides/Cover";
import WhatIs from "./slides/WhatIs";
import House from "./slides/House";
import Lights from "./slides/Lights";
import Climate from "./slides/Climate";
import Security from "./slides/Security";
import Energy from "./slides/Energy";
import System from "./slides/System";
import Close from "./slides/Close";

const SLIDES = [
  Cover,
  WhatIs,
  House,
  Lights,
  Climate,
  Security,
  Energy,
  System,
  Close,
] as const;

export default function App() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const lock = useRef(false);
  const touchY = useRef<number | null>(null);
  const indexRef = useRef(0);
  indexRef.current = index;

  const go = useCallback((next: number, d: number) => {
    if (lock.current) return;
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, next));
    if (clamped === indexRef.current) return;
    lock.current = true;
    setDir(d);
    setIndex(clamped);
    window.setTimeout(() => {
      lock.current = false;
    }, 780);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 28) return;
      if (e.deltaY > 0) go(indexRef.current + 1, 1);
      else go(indexRef.current - 1, -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(indexRef.current + 1, 1);
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(indexRef.current - 1, -1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("canvas")) return;
      touchY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchY.current == null) return;
      const y = e.changedTouches[0]?.clientY ?? touchY.current;
      const dy = touchY.current - y;
      touchY.current = null;
      if (Math.abs(dy) < 60) return;
      if (dy > 0) go(indexRef.current + 1, 1);
      else go(indexRef.current - 1, -1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [go]);

  const Slide = SLIDES[index];

  return (
    <div className="canvas-root grain">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={index}
          className="absolute inset-0"
          custom={dir}
          initial={{ opacity: 0, y: dir > 0 ? 48 : -48, scale: 1.02 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: dir > 0 ? -36 : 36, scale: 0.985 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Slide />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
