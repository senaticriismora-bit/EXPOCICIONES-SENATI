import { cn } from "@/utils/cn";
import botImg from "@/assets/senati-bot.png";
import botWinImg from "@/assets/bot-win.png";

type Props = {
  size?: number;
  mood?: "idle" | "win";
  className?: string;
  float?: boolean;
  glow?: "fire" | "ice";
};

/** SENATI BOT: la imagen tiene fondo negro y se fusiona con `mix-blend-mode: screen`. */
export function Bot({ size = 220, mood = "idle", className, float = true, glow = "ice" }: Props) {
  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <div
        className={cn(
          "absolute inset-[15%] rounded-full blur-3xl animate-pulse",
          glow === "ice" ? "bg-ice/30" : "bg-fire/40",
        )}
      />
      <img
        src={mood === "win" ? botWinImg : botImg}
        alt="SENATI BOT"
        draggable={false}
        className={cn(
          "relative h-full w-full object-contain pixelated blend-screen select-none",
          float && "animate-float",
        )}
        style={{ filter: "drop-shadow(0 0 18px rgba(0,229,255,.45))" }}
      />
    </div>
  );
}
