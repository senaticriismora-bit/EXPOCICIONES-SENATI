import { useCallback, useRef, useState } from "react";
import StageCanvas from "@/components/StageCanvas";
import { Scene, type Theme } from "@/components/Scene";
import Cover from "@/scenes/Cover";
import Stats from "@/scenes/Stats";
import SmartHome from "@/scenes/SmartHome";
import Risks from "@/scenes/Risks";
import CameraLab from "@/scenes/CameraLab";
import LockLab from "@/scenes/LockLab";
import Botnet from "@/scenes/Botnet";
import Practices from "@/scenes/Practices";
import Outro from "@/scenes/Outro";

const THEMES: Theme[] = [
  { color: "#22d3ee", chaos: 0.1 }, // cover
  { color: "#38bdf8", chaos: 0.25 }, // stats
  { color: "#fbbf24", chaos: 0.4 }, // smart home
  { color: "#fb3b53", chaos: 0.7 }, // risks
  { color: "#fb3b53", chaos: 1 }, // camera lab
  { color: "#fbbf24", chaos: 0.75 }, // lock lab
  { color: "#a78bfa", chaos: 0.9 }, // botnet
  { color: "#34d399", chaos: 0.25 }, // practices
  { color: "#34d399", chaos: 0.05 }, // outro
];

export default function App() {
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const enter = useCallback(
    (i: number) => (t: Theme) => {
      setTheme(t);
      setActive(i);
    },
    [],
  );

  const onScroll = () => {
    const el = boxRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#04070f]">
      {/* fullscreen reactive canvas */}
      <StageCanvas color={theme.color} chaos={theme.chaos} />

      {/* ambient light that follows the active theme */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${theme.color}1f 0%, transparent 55%), radial-gradient(circle at 80% 90%, ${theme.color}14 0%, transparent 50%)`,
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,7,15,0.85)_100%)]" />

      {/* thin progress indicator (non interactive) */}
      <div className="pointer-events-none fixed top-0 right-0 z-30 h-full w-[3px] bg-white/5">
        <div
          className="w-full transition-[height] duration-200"
          style={{
            height: `${progress * 100}%`,
            background: `linear-gradient(to bottom, ${theme.color}, #ffffff55)`,
            boxShadow: `0 0 14px ${theme.color}`,
          }}
        />
      </div>

      {/* scroll stage */}
      <div ref={boxRef} onScroll={onScroll} className="scrollstage relative z-10">
        <Scene theme={THEMES[0]} onEnter={enter(0)} wide>
          <Cover />
        </Scene>
        <Scene theme={THEMES[1]} onEnter={enter(1)}>
          <Stats active={active === 1} />
        </Scene>
        <Scene theme={THEMES[2]} onEnter={enter(2)} wide>
          <SmartHome />
        </Scene>
        <Scene theme={THEMES[3]} onEnter={enter(3)}>
          <Risks />
        </Scene>
        <Scene theme={THEMES[4]} onEnter={enter(4)} wide>
          <CameraLab />
        </Scene>
        <Scene theme={THEMES[5]} onEnter={enter(5)} wide>
          <LockLab />
        </Scene>
        <Scene theme={THEMES[6]} onEnter={enter(6)} wide>
          <Botnet />
        </Scene>
        <Scene theme={THEMES[7]} onEnter={enter(7)} wide>
          <Practices />
        </Scene>
        <Scene theme={THEMES[8]} onEnter={enter(8)}>
          <Outro />
        </Scene>
      </div>
    </div>
  );
}
