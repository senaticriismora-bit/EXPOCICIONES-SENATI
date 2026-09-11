import { motion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/utils/cn";
import { useGame, TONE_HEX, type Tone } from "@/lib/game";

/* ---------------- Pixel Button ---------------- */
type BtnProps = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  tone?: Tone;
  size?: "md" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
  silent?: boolean;
};

const toneBg: Record<Tone, string> = {
  fire: "bg-fire text-black",
  ice: "bg-ice text-black",
  lemon: "bg-lemon text-black",
  hot: "bg-hot text-black",
  amber: "bg-amber text-black",
  cream: "bg-cream text-black",
};

export function PixelButton({
  children,
  onClick,
  tone = "fire",
  size = "md",
  className,
  disabled,
  silent,
}: BtnProps) {
  const { sfx } = useGame();
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => !disabled && !silent && sfx.hover()}
      onClick={(e) => {
        if (disabled) return;
        if (!silent) sfx.click();
        onClick?.(e);
      }}
      className={cn(
        "pixel-btn font-pixel uppercase leading-none tracking-wide select-none",
        toneBg[tone],
        size === "md" && "px-5 py-4 text-sm md:text-base",
        size === "lg" && "px-7 py-5 text-base md:text-xl",
        size === "xl" && "px-9 py-6 text-lg md:text-2xl",
        disabled && "cursor-not-allowed opacity-40 hover:translate-0 hover:shadow-[6px_6px_0_0_#000]",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ---------------- Pixel Panel ---------------- */
type PanelProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  title?: string;
  titleTone?: Tone;
};

export function PixelPanel({
  children,
  tone = "fire",
  className,
  title,
  titleTone,
}: PanelProps) {
  return (
    <div
      className={cn("pixel-box bg-navy/90 backdrop-blur-sm", className)}
      style={{ ["--pb" as string]: TONE_HEX[tone] }}
    >
      {title && (
        <span
          className={cn(
            "absolute -top-5 left-4 z-10 border-4 border-black px-3 py-2 font-pixel text-xs md:text-base text-black",
            toneBg[titleTone ?? tone],
          )}
        >
          {title}
        </span>
      )}
      {children}
    </div>
  );
}

/* ---------------- Tag / chip ---------------- */
export function Tag({
  children,
  tone = "ice",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border-4 border-black px-3 py-2 font-pixel text-xs md:text-base leading-none",
        toneBg[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- Floating +XP text ---------------- */
export function FloatText({ text, tone = "lemon" }: { text: string; tone?: Tone }) {
  return (
    <motion.span
      initial={{ y: 0, opacity: 1, scale: 0.6 }}
      animate={{ y: -90, opacity: 0, scale: 1.3 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 font-pixel text-xl md:text-2xl shadow-pixel"
      style={{ color: TONE_HEX[tone] }}
    >
      {text}
    </motion.span>
  );
}

/* ---------------- Scene wrapper ---------------- */
export function Scene({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "relative min-h-screen w-full overflow-hidden px-4 pb-16 pt-28 md:px-8 md:pt-32",
        className,
      )}
    >
      {children}
    </motion.section>
  );
}

/* ---------------- Level heading ---------------- */
export function LevelTitle({
  kicker,
  title,
  tone = "fire",
  sub,
}: {
  kicker: string;
  title: string;
  tone?: Tone;
  sub?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-6xl text-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-4 inline-block"
      >
        <Tag tone={tone}>{kicker}</Tag>
      </motion.div>
      <motion.h2
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="font-pixel text-[clamp(1.5rem,4.5vw,3.4rem)] leading-[1.3] text-cream shadow-pixel-lg"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-5 max-w-4xl text-xl font-bold text-cream/90 md:text-2xl lg:text-3xl"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
