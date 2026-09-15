import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CityCanvas, { type CameraMode } from "./components/three/CityCanvas";
import Cover from "./components/scenes/Cover";
import WhatIs from "./components/scenes/WhatIs";
import Explorer from "./components/scenes/Explorer";
import Services from "./components/scenes/Services";
import Layers from "./components/scenes/Layers";
import Outro from "./components/scenes/Outro";
import { ProgressBar } from "./components/ui/Controls";

const SCENES = ["cover", "what", "explore", "services", "layers", "outro"] as const;
type Scene = (typeof SCENES)[number];

const cameraFor = (s: Scene): CameraMode => (s === "cover" ? "cover" : s === "explore" ? "explore" : "backdrop");

export default function App() {
  const [scene, setScene] = useState<Scene>("cover");
  const [selected, setSelected] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);

  const go = useCallback((dir: 1 | -1) => {
    setScene((s) => {
      const i = SCENES.indexOf(s);
      const n = Math.min(SCENES.length - 1, Math.max(0, i + dir));
      return SCENES[n];
    });
  }, []);

  const onSelect = useCallback((id: string | null) => {
    setSelected(id);
    if (id) setVisited((v) => (v.includes(id) ? v : [...v, id]));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") go(1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1);
      else if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (scene !== "explore") setSelected(null);
  }, [scene]);

  const progress = (SCENES.indexOf(scene) + 1) / SCENES.length;

  return (
    <div className="relative h-full w-full overflow-hidden bg-night font-body text-white">
      <CityCanvas mode={cameraFor(scene)} selectedId={selected} visited={visited} onSelect={onSelect} />

      <ProgressBar value={progress} />

      <AnimatePresence initial={false}>
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pointer-events-none absolute inset-0 z-10"
        >
          {scene === "cover" && <Cover onStart={() => setScene("what")} />}
          {scene === "what" && <WhatIs onNext={() => setScene("explore")} onBack={() => setScene("cover")} />}
          {scene === "explore" && (
            <Explorer selectedId={selected} visited={visited} onSelect={onSelect} onNext={() => setScene("services")} onBack={() => setScene("what")} />
          )}
          {scene === "services" && <Services onNext={() => setScene("layers")} onBack={() => setScene("explore")} />}
          {scene === "layers" && <Layers onNext={() => setScene("outro")} onBack={() => setScene("services")} />}
          {scene === "outro" && <Outro onRestart={() => setScene("cover")} onBack={() => setScene("layers")} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
