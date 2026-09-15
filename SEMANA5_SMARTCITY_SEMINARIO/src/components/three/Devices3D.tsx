import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ModelKind } from "../../data/content";

const DARK = "#1e293b";
const METAL = "#334155";

function Pole({ h, r = 0.06, color = METAL }: { h: number; r?: number; color?: string }) {
  return (
    <mesh position={[0, h / 2, 0]}>
      <cylinderGeometry args={[r, r * 1.3, h, 10]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.35} />
    </mesh>
  );
}

function Base({ color }: { color: string }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <ringGeometry args={[0.55, 0.65, 32]} />
      <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.6} />
    </mesh>
  );
}

/* ---------- Farola ---------- */
function LightModel({ color, active }: { color: string; active: boolean }) {
  const cone = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (cone.current) cone.current.opacity = (active ? 0.16 : 0.08) + Math.sin(clock.getElapsedTime() * 2) * 0.02;
  });
  return (
    <group>
      <Base color={color} />
      <Pole h={3.4} />
      <mesh position={[0.4, 3.4, 0]}>
        <boxGeometry args={[0.9, 0.08, 0.08]} />
        <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0.8, 3.3, 0]}>
        <boxGeometry args={[0.55, 0.12, 0.3]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[0.8, 1.66, 0]}>
        <coneGeometry args={[1.3, 3.3, 28, 1, true]} />
        <meshBasicMaterial ref={cone} color={color} transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <pointLight position={[0.8, 3, 0]} color={color} intensity={active ? 10 : 4} distance={7} />
    </group>
  );
}

/* ---------- Semáforo ---------- */
function TrafficModel({ color }: { color: string }) {
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);
  const cols = useMemo(() => [new THREE.Color("#ef4444"), new THREE.Color("#facc15"), new THREE.Color("#22c55e")], []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() % 7;
    const on = t < 3.5 ? 2 : t < 4.5 ? 1 : 0;
    mats.current.forEach((m, i) => {
      if (!m || !m.color || !cols[i]) return;
      m.color.copy(cols[i]).multiplyScalar(i === on ? 1.6 : 0.12);
    });
  });
  return (
    <group>
      <Base color={color} />
      <Pole h={3} />
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[0.36, 1.05, 0.36]} />
        <meshStandardMaterial color={DARK} roughness={0.5} />
      </mesh>
      {[3.42, 3.1, 2.78].map((y, i) => (
        <mesh key={i} position={[0, y, 0.19]}>
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshBasicMaterial ref={(el) => { if (el) mats.current[i] = el; }} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Cámara ---------- */
function CameraModel({ color }: { color: string }) {
  const head = useRef<THREE.Group>(null);
  const led = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (head.current) head.current.rotation.y = Math.sin(t * 0.6) * 0.9;
    if (led.current) led.current.opacity = Math.sin(t * 6) > 0 ? 1 : 0.15;
  });
  return (
    <group>
      <Base color={color} />
      <Pole h={3.2} />
      <group ref={head} position={[0, 3.2, 0]}>
        <mesh position={[0, 0, 0.15]} rotation={[0.35, 0, 0]}>
          <boxGeometry args={[0.32, 0.22, 0.5]} />
          <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.1, 0.42]} rotation={[Math.PI / 2 + 0.35, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.12, 0.1, 0.35]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial ref={led} color={color} toneMapped={false} transparent />
        </mesh>
        {/* vision cone */}
        <mesh position={[0, -1.3, 1.0]} rotation={[Math.PI / 2 + 0.35 + Math.PI, 0, 0]}>
          <coneGeometry args={[1.0, 3.0, 4, 1, true]} />
          <meshBasicMaterial color={color} transparent opacity={0.09} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Sensor ambiental ---------- */
function AirModel({ color }: { color: string }) {
  const orbit = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (orbit.current) orbit.current.rotation.y = clock.getElapsedTime() * 0.8;
  });
  return (
    <group>
      <Base color={color} />
      <Pole h={1.7} />
      <mesh position={[0, 1.95, 0]}>
        <boxGeometry args={[0.45, 0.55, 0.45]} />
        <meshStandardMaterial color={DARK} roughness={0.5} />
      </mesh>
      {[0, 0.16, -0.16].map((y, i) => (
        <mesh key={i} position={[0, 1.95 + y, 0.23]}>
          <boxGeometry args={[0.32, 0.05, 0.01]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, 2.4, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
        <meshStandardMaterial color={METAL} />
      </mesh>
      <group ref={orbit} position={[0, 2.1, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos((i / 3) * Math.PI * 2) * 0.8, Math.sin(i) * 0.2, Math.sin((i / 3) * Math.PI * 2) * 0.8]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ---------- Contenedor ---------- */
function BinModel({ color }: { color: string }) {
  const led = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (led.current) led.current.opacity = 0.5 + Math.sin(clock.getElapsedTime() * 3) * 0.5;
  });
  return (
    <group>
      <Base color={color} />
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.36, 0.32, 0.9, 16]} />
        <meshStandardMaterial color="#14532d" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial color="#166534" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.5, 0.35]}>
        <planeGeometry args={[0.12, 0.6]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial ref={led} color={color} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}

/* ---------- Medidor ---------- */
function MeterModel({ color }: { color: string }) {
  const bar = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (bar.current) bar.current.scale.x = 0.4 + (Math.sin(clock.getElapsedTime() * 1.4) + 1) * 0.3;
  });
  return (
    <group>
      <Base color={color} />
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.75, 1.1, 0.35]} />
        <meshStandardMaterial color={DARK} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.75, 0.18]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={bar} position={[-0.2, 0.4, 0.18]}>
        <planeGeometry args={[0.5, 0.08]} />
        <meshBasicMaterial color="#e2e8f0" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.75, 0.19]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.2, 0.012, 8, 32]} />
        <meshBasicMaterial color="#e2e8f0" />
      </mesh>
    </group>
  );
}

/* ---------- Cargador EV ---------- */
function EVModel({ color }: { color: string }) {
  const ring = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (ring.current) ring.current.opacity = 0.3 + (Math.sin(clock.getElapsedTime() * 2.5) + 1) * 0.3;
  });
  return (
    <group>
      <Base color={color} />
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.5, 1.5, 0.3]} />
        <meshStandardMaterial color={DARK} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.15, 0.16]}>
        <planeGeometry args={[0.32, 0.4]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* parked car */}
      <group position={[1.3, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.7, 0.35, 1.5]} />
          <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.28, -0.1]}>
          <boxGeometry args={[0.6, 0.25, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.17, 0]}>
          <ringGeometry args={[0.7, 0.95, 32]} />
          <meshBasicMaterial ref={ring} color={color} toneMapped={false} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* cable */}
      <mesh position={[0.65, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.45, 0.02, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}

/* ---------- Antena 5G ---------- */
function AntennaModel({ color }: { color: string }) {
  const rings = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    rings.current.forEach((m, i) => {
      if (!m) return;
      const p = ((clock.getElapsedTime() * 0.5 + i / 3) % 1);
      m.scale.setScalar(0.4 + p * 3.2);
      const mat = m.material as THREE.MeshBasicMaterial | THREE.MeshBasicMaterial[];
      if (!mat || Array.isArray(mat) || !("opacity" in mat)) return;
      mat.opacity = (1 - p) * 0.8;
    });
  });
  return (
    <group>
      <Base color={color} />
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.9, 0.6, 0.9]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
      <mesh position={[0, 4.1, 0]}>
        <cylinderGeometry args={[0.08, 0.25, 7, 8]} />
        <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.3} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.cos((i / 3) * Math.PI * 2) * 0.3, 6.6, Math.sin((i / 3) * Math.PI * 2) * 0.3]} rotation={[0, -(i / 3) * Math.PI * 2, 0]}>
          <boxGeometry args={[0.15, 1.1, 0.35]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      ))}
      <mesh position={[0, 7.75, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={`r${i}`} ref={(el) => { if (el) rings.current[i] = el; }} position={[0, 7.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.0, 48]} />
          <meshBasicMaterial color={color} toneMapped={false} transparent side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
      <pointLight position={[0, 7.6, 0]} color={color} intensity={8} distance={12} />
    </group>
  );
}

/* ---------- Sensores de parking ---------- */
function ParkingModel() {
  const spots = useMemo(() => {
    const arr: { x: number; z: number; busy: boolean; blink: boolean }[] = [];
    const busyPattern = [true, false, true, true, false, false, true, false, true, true];
    for (let i = 0; i < 5; i++) {
      arr.push({ x: -3 + i * 1.5, z: -0.9, busy: busyPattern[i], blink: i === 1 });
      arr.push({ x: -3 + i * 1.5, z: 1.1, busy: busyPattern[i + 5], blink: i === 3 });
    }
    return arr;
  }, []);
  const blinkers = useRef<(THREE.Mesh | null)[]>([]);
  const cars = useRef<(THREE.Group | null)[]>([]);
  useFrame(({ clock }) => {
    const on = Math.sin(clock.getElapsedTime() * 0.7) > 0;
    blinkers.current.forEach((m, i) => {
      if (!m || !spots[i]?.blink) return;
      const mat = m.material as THREE.MeshBasicMaterial | THREE.MeshBasicMaterial[];
      if (!mat || Array.isArray(mat) || !("color" in mat) || !mat.color) return;
      mat.color.set(on ? "#ef4444" : "#22c55e");
    });
    cars.current.forEach((g, i) => {
      if (!g || !spots[i]?.blink) return;
      const s = THREE.MathUtils.lerp(g.scale.x, on ? 1 : 0.001, 0.1);
      g.scale.setScalar(Math.max(s, 0.001));
    });
  });
  return (
    <group>
      {spots.map((s, i) => (
        <group key={i} position={[s.x, 0, s.z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} ref={(el) => { blinkers.current[i] = el; }}>
            <circleGeometry args={[0.16, 16]} />
            <meshBasicMaterial color={s.busy ? "#ef4444" : "#22c55e"} toneMapped={false} />
          </mesh>
          {(s.busy || s.blink) && (
            <group position={[0, 0.2, 0]} ref={(el) => { cars.current[i] = el; }}>
              <mesh>
                <boxGeometry args={[0.7, 0.35, 1.4]} />
                <meshStandardMaterial color="#111a33" metalness={0.6} roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.27, -0.05]}>
                <boxGeometry args={[0.6, 0.22, 0.75]} />
                <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
}

/* ---------- Dron ---------- */
function DroneModel({ color }: { color: string }) {
  const g = useRef<THREE.Group>(null);
  const rotors = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (g.current) {
      g.current.position.set(Math.cos(t * 0.5) * 2.2, Math.sin(t * 1.5) * 0.3, Math.sin(t * 0.5) * 2.2);
      g.current.rotation.y = -t * 0.5 + Math.PI / 2;
      g.current.rotation.z = Math.sin(t * 0.5) * 0.15;
    }
    rotors.current.forEach((r) => { if (r) r.rotation.y = t * 30; });
  });
  return (
    <group ref={g}>
      <mesh>
        <boxGeometry args={[0.45, 0.14, 0.45]} />
        <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.3} />
      </mesh>
      {[[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([sx, sz], i) => (
        <group key={i}>
          <mesh position={[sx * 0.3, 0, sz * 0.3]} rotation={[0, sx * sz > 0 ? Math.PI / 4 : -Math.PI / 4, 0]}>
            <boxGeometry args={[0.6, 0.05, 0.06]} />
            <meshStandardMaterial color={METAL} />
          </mesh>
          <mesh ref={(el) => { if (el) rotors.current[i] = el; }} position={[sx * 0.52, 0.06, sz * 0.52]}>
            <cylinderGeometry args={[0.26, 0.26, 0.015, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.45} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.1, 0.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[0, -3.6, 0]}>
        <coneGeometry args={[1.3, 7.2, 24, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.07} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function DeviceModel({ kind, color, active }: { kind: ModelKind; color: string; active: boolean }) {
  switch (kind) {
    case "light":
      return <LightModel color={color} active={active} />;
    case "traffic":
      return <TrafficModel color={color} />;
    case "camera":
      return <CameraModel color={color} />;
    case "air":
      return <AirModel color={color} />;
    case "bin":
      return <BinModel color={color} />;
    case "meter":
      return <MeterModel color={color} />;
    case "ev":
      return <EVModel color={color} />;
    case "antenna":
      return <AntennaModel color={color} />;
    case "parking":
      return <ParkingModel />;
    case "drone":
      return <DroneModel color={color} />;
    default:
      return null;
  }
}
