import { useEffect, useMemo, useRef } from "react";

export type Sfx = {
  click(): void;
  hover(): void;
  coin(): void;
  success(): void;
  fail(): void;
  levelUp(): void;
  boom(): void;
  fanfare(): void;
};

/** Sintetizador 8-bit con Web Audio API (sin archivos externos). */
export function useSfx(muted: boolean): Sfx {
  const ctxRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  return useMemo(() => {
    const getCtx = (): AudioContext | null => {
      if (mutedRef.current) return null;
      try {
        if (!ctxRef.current) {
          const Ctor =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          ctxRef.current = new Ctor();
        }
        if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
        return ctxRef.current;
      } catch {
        return null;
      }
    };

    const tone = (
      freq: number,
      dur: number,
      type: OscillatorType = "square",
      vol = 0.05,
      delay = 0,
      slideTo?: number,
    ) => {
      const c = getCtx();
      if (!c) return;
      const t0 = c.currentTime + delay;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
      gain.gain.setValueAtTime(vol, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.03);
    };

    return {
      click: () => tone(720, 0.07, "square", 0.04),
      hover: () => tone(440, 0.04, "square", 0.02),
      coin: () => {
        tone(988, 0.08, "square", 0.05);
        tone(1319, 0.3, "square", 0.05, 0.08);
      },
      success: () =>
        [523, 659, 784, 1047].forEach((f, i) =>
          tone(f, 0.14, "square", 0.05, i * 0.09),
        ),
      fail: () => {
        tone(220, 0.25, "sawtooth", 0.06, 0, 110);
        tone(160, 0.35, "sawtooth", 0.06, 0.18, 70);
      },
      levelUp: () =>
        [392, 523, 659, 784, 1047, 1319].forEach((f, i) =>
          tone(f, 0.12, "square", 0.045, i * 0.07),
        ),
      boom: () => {
        tone(140, 0.5, "sawtooth", 0.08, 0, 40);
        tone(90, 0.6, "square", 0.06, 0.05, 30);
      },
      fanfare: () =>
        [523, 523, 523, 659, 784, 659, 784, 1047].forEach((f, i) =>
          tone(f, i === 7 ? 0.5 : 0.13, "square", 0.05, i * 0.13),
        ),
    };
  }, []);
}
