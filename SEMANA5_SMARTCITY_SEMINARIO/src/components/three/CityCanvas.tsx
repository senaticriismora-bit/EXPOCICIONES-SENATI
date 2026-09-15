import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Check } from "lucide-react";
import { Buildings, Cars, Ground, Park, ParkingLot, Plaza } from "./City";
import { DeviceModel } from "./Devices3D";
import { DEVICES, type Device } from "../../data/content";

export type CameraMode = "cover" | "explore" | "backdrop";

interface Props {
  mode: CameraMode;
  selectedId: string | null;
  visited: string[];
  onSelect: (id: string | null) => void;
}

function CameraRig({ mode, selected }: { mode: CameraMode; selected: Device | null }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const goal = useRef<{ pos: THREE.Vector3; target: THREE.Vector3 } | null>(null);

  useEffect(() => {
    const dir = camera.position.clone();
    dir.y = 0;
    if (dir.lengthSq() < 0.01) dir.set(1, 0, 1);
    dir.normalize();

    if (mode === "explore" && selected) {
      const lift = selected.model === "antenna" ? 4 : selected.model === "drone" ? 4.5 : 1.3;
      const t = new THREE.Vector3(...selected.position).add(new THREE.Vector3(0, lift, 0));
      const d = camera.position.clone().sub(t);
      d.y = 0;
      if (d.lengthSq() < 0.01) d.set(1, 0, 1);
      d.normalize();
      const dist = selected.model === "antenna" ? 17 : selected.model === "drone" ? 14 : selected.model === "parking" ? 13 : 12.5;
      const pos = t.clone().add(d.multiplyScalar(dist)).add(new THREE.Vector3(0, dist * 0.85, 0));
      goal.current = { pos, target: t };
    } else if (mode === "cover") {
      goal.current = { pos: dir.clone().multiplyScalar(48).setY(28), target: new THREE.Vector3(0, 2, 0) };
    } else if (mode === "explore") {
      goal.current = { pos: dir.clone().multiplyScalar(32).setY(22), target: new THREE.Vector3(0, 0, 0) };
    } else {
      goal.current = { pos: dir.clone().multiplyScalar(60).setY(38), target: new THREE.Vector3(0, 3, 0) };
    }
  }, [mode, selected, camera]);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const cancel = () => { goal.current = null; };
    c.addEventListener("start", cancel);
    return () => c.removeEventListener("start", cancel);
  }, []);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;
    if (goal.current) {
      const k = 1 - Math.exp(-2.4 * Math.min(dt, 0.1));
      camera.position.lerp(goal.current.pos, k);
      c.target.lerp(goal.current.target, k);
      if (camera.position.distanceTo(goal.current.pos) < 0.08) goal.current = null;
    }
    c.update();
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableZoom={mode === "explore"}
      minDistance={6}
      maxDistance={75}
      minPolarAngle={0.25}
      maxPolarAngle={Math.PI / 2 - 0.32}
      autoRotate={mode !== "explore" || !selected}
      autoRotateSpeed={mode === "explore" ? 0.35 : 0.7}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

function Hotspot({
  device,
  active,
  dimmed,
  visited,
  onSelect,
}: {
  device: Device;
  active: boolean;
  dimmed: boolean;
  visited: boolean;
  onSelect: (id: string) => void;
}) {
  const Icon = device.icon;
  const h = device.model === "antenna" ? 9 : device.model === "drone" ? 1.6 : device.model === "parking" ? 2.6 : 4.4;
  const [x, y, z] = device.position;
  return (
    <Html position={[x, y + h, z]} center zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(device.id);
        }}
        className="group relative flex flex-col items-center gap-2 no-select transition-all duration-500"
        style={{
          pointerEvents: "auto",
          opacity: dimmed ? 0.35 : 1,
          transform: `scale(${active ? 1.25 : 1})`,
        }}
        aria-label={device.name}
      >
        <span className="relative flex items-center justify-center">
          <span
            className="absolute inline-flex h-14 w-14 rounded-full animate-pulse-ring"
            style={{ background: device.color, opacity: 0.6 }}
          />
          <span
            className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 bg-night/80 backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
            style={{
              borderColor: device.color,
              boxShadow: `0 0 24px ${device.color}88, inset 0 0 12px ${device.color}33`,
              color: device.color,
            }}
          >
            <Icon className="h-7 w-7" strokeWidth={2.2} />
          </span>
          {visited && (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-night shadow-lg">
              <Check className="h-4 w-4" strokeWidth={3.5} />
            </span>
          )}
        </span>
        <span
          className="font-display whitespace-nowrap rounded-full px-3.5 py-1.5 text-[15px] font-bold uppercase tracking-wide text-white glass transition-all duration-300"
          style={{ borderColor: `${device.color}66`, textShadow: `0 0 12px ${device.color}` }}
        >
          {device.name}
        </span>
      </button>
    </Html>
  );
}

function Scene({ mode, selectedId, visited, onSelect }: Props) {
  const selected = DEVICES.find((d) => d.id === selectedId) ?? null;
  const showHotspots = mode === "explore";

  return (
    <>
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#050816", 40, 125]} />
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#4c5aa8", "#0b0f1e", 0.5]} />
      <directionalLight position={[30, 45, 20]} intensity={1.3} color="#cfe3ff" />
      <pointLight position={[-24, 14, -22]} intensity={140} color="#a855f7" distance={70} />
      <pointLight position={[26, 12, 24]} intensity={120} color="#22d3ee" distance={70} />

      <Stars radius={130} depth={50} count={2600} factor={4} saturation={0.4} fade speed={0.6} />

      <Ground />
      <Buildings />
      <Park />
      <Plaza />
      <ParkingLot />
      <Cars />

      {DEVICES.map((d) => (
        <group
          key={d.id}
          position={d.position}
          onClick={(e) => {
            if (!showHotspots) return;
            e.stopPropagation();
            onSelect(d.id);
          }}
          onPointerOver={() => { if (showHotspots) document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { document.body.style.cursor = "auto"; }}
        >
          <DeviceModel kind={d.model} color={d.color} active={selectedId === d.id} />
        </group>
      ))}

      {showHotspots &&
        DEVICES.map((d) => (
          <Hotspot
            key={d.id}
            device={d}
            active={selectedId === d.id}
            dimmed={!!selectedId && selectedId !== d.id}
            visited={visited.includes(d.id)}
            onSelect={onSelect}
          />
        ))}

      <CameraRig mode={mode} selected={selected} />

      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.55} luminanceSmoothing={0.35} radius={0.7} />
        <Vignette eskil={false} offset={0.12} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export default function CityCanvas(props: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [36, 26, 36], fov: 42, near: 0.5, far: 300 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        canvas.addEventListener("webglcontextlost", (e) => e.preventDefault());
      }}
      onPointerMissed={() => props.mode === "explore" && props.onSelect(null)}
      className="absolute inset-0 z-0"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}
