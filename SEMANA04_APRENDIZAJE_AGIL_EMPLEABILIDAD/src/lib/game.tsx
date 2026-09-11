import { createContext, useContext } from "react";
import type { Sfx } from "./sfx";

export type GameCtx = {
  index: number;
  xp: number;
  addXp: (n: number) => void;
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;
  restart: () => void;
  sfx: Sfx;
  muted: boolean;
  toggleMute: () => void;
  shake: () => void;
};

export const GameContext = createContext<GameCtx | null>(null);

export function useGame(): GameCtx {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame debe usarse dentro de GameContext");
  return ctx;
}

export const LEVELS = [
  { id: "cover", label: "PORTADA", short: "START", icon: "🕹️" },
  { id: "concept", label: "¿QUÉ ES?", short: "NIVEL 1", icon: "🔁" },
  { id: "pillars", label: "POWER-UPS", short: "NIVEL 2", icon: "⚡" },
  { id: "methods", label: "ARSENAL", short: "NIVEL 3", icon: "🛠️" },
  { id: "mission", label: "LA MISIÓN", short: "NIVEL 4", icon: "💻" },
  { id: "victory", label: "VICTORIA", short: "FIN", icon: "🏆" },
] as const;

export const INSTRUCTOR = "FERNANDO MIGUEL PISFIL ORTIZ";

export const TEAM = [
  { n: "01", name: "MECHÁN ENEQUE JUAN ENRIQUE", color: "fire" },
  { n: "02", name: "MORA DAMIAN CHRISTIAN ALFREDO", color: "ice" },
  { n: "03", name: "MURGA CASTRO ANDRÉ ALEXANDER", color: "lemon" },
  { n: "04", name: "ROMERO CANAQUIRI ROLIN ROY", color: "hot" },
] as const;

export type Tone = "fire" | "ice" | "lemon" | "hot" | "amber" | "cream";

export const TONE_HEX: Record<Tone, string> = {
  fire: "#ff6a00",
  ice: "#00e5ff",
  lemon: "#ffe600",
  hot: "#ff2d55",
  amber: "#ffb000",
  cream: "#fff4e0",
};
