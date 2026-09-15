import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------- Layout constants ---------- */
export const ROADS = [-30, -18, -6, 6, 18, 30];
export const BLOCKS = [-24, -12, 0, 12, 24];
const ROAD_W = 2.4;
const CELL = 2.9;
const BW = 2.2;
const CITY_HALF = 36;

/* Special blocks: plaza (0,0), parking (12,0), park (-12,0) */
const isSpecial = (bx: number, bz: number) =>
  (bx === 0 && bz === 0) || (bx === 12 && bz === 0) || (bx === -12 && bz === 0);

/* Deterministic random */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- Window texture ---------- */
function makeWindowTexture(seed = 7) {
  const rnd = mulberry32(seed);
  const cols = 3;
  const rows = 6;
  const cellW = 16;
  const cellH = 16;
  const canvas = document.createElement("canvas");
  canvas.width = cols * cellW;
  canvas.height = rows * cellH;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const r = rnd();
      if (r < 0.3) {
        ctx.fillStyle = r < 0.2 ? "#ffd27a" : "#8fe3ff";
        ctx.fillRect(x * cellW + 4, y * cellH + 4, cellW - 8, cellH - 8);
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.LinearMipMapLinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const PALETTE = ["#0f172a", "#111a3a", "#161a45", "#0d1b3a", "#1a1640"];

interface BuildingSpec {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  color: string;
  seed: number;
}

function useBuildingSpecs(): BuildingSpec[] {
  return useMemo(() => {
    const rnd = mulberry32(42);
    const specs: BuildingSpec[] = [];
    for (const bx of BLOCKS) {
      for (const bz of BLOCKS) {
        if (isSpecial(bx, bz)) continue;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (rnd() < 0.08) continue; // occasional empty lot
            const x = bx + i * CELL;
            const z = bz + j * CELL;
            const dist = Math.hypot(x, z);
            const falloff = Math.max(0, 1 - dist / 40);
            const outer = Math.abs(bx) === 24 || Math.abs(bz) === 24;
            // low-rise core so devices stay visible; taller skyline on the outer ring
            const tower = outer && rnd() < 0.12 ? 3 + rnd() * 4 : 0;
            const h = outer ? 1.6 + rnd() * 3 + tower : 1.4 + rnd() * 2 + falloff * falloff * 5;
            const w = BW * (0.75 + rnd() * 0.25);
            const d = BW * (0.75 + rnd() * 0.25);
            specs.push({
              x,
              z,
              w,
              d,
              h,
              color: PALETTE[Math.floor(rnd() * PALETTE.length)],
              seed: Math.floor(rnd() * 1000),
            });
          }
        }
      }
    }
    return specs;
  }, []);
}

function Building({ spec, tex }: { spec: BuildingSpec; tex: THREE.Texture }) {
  const materials = useMemo(() => {
    const t = tex.clone();
    // keep whole windows: vertical repeat snapped to 1/6 steps (6 rows per tile)
    t.repeat.set(Math.max(1, Math.round(spec.w / 2.2)), Math.max(1 / 6, Math.round((spec.h / 4.4) * 6) / 6));
    t.offset.set((spec.seed % 3) / 3, (spec.seed % 6) / 6);
    t.needsUpdate = true;
    const side = new THREE.MeshStandardMaterial({
      color: spec.color,
      emissive: new THREE.Color("#ffffff"),
      emissiveMap: t,
      emissiveIntensity: 0.55,
      roughness: 0.6,
      metalness: 0.2,
    });
    const top = new THREE.MeshStandardMaterial({
      color: "#0a0f24",
      roughness: 0.9,
      metalness: 0.1,
    });
    return [side, side, top, top, side, side];
  }, [spec, tex]);

  return (
    <mesh
      position={[spec.x, spec.h / 2, spec.z]}
      material={materials}
      castShadow={false}
      receiveShadow={false}
    >
      <boxGeometry args={[spec.w, spec.h, spec.d]} />
    </mesh>
  );
}

export function Buildings() {
  const specs = useBuildingSpecs();
  const tex = useMemo(() => makeWindowTexture(), []);
  return (
    <group>
      {specs.map((s, i) => (
        <Building key={i} spec={s} tex={tex} />
      ))}
      {/* Roof beacons on tallest towers */}
      {specs
        .filter((s) => s.h > 8)
        .map((s, i) => (
          <mesh key={`b${i}`} position={[s.x, s.h + 0.25, s.z]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color="#fb7185" toneMapped={false} />
          </mesh>
        ))}
    </group>
  );
}

/* ---------- Ground & roads ---------- */
export function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[CITY_HALF * 2 + 40, CITY_HALF * 2 + 40]} />
        <meshStandardMaterial color="#070b1c" roughness={1} />
      </mesh>
      {/* Roads */}
      {ROADS.map((r) => (
        <group key={`r${r}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[r, 0, 0]}>
            <planeGeometry args={[ROAD_W, CITY_HALF * 2]} />
            <meshStandardMaterial color="#121a30" roughness={0.9} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, r]}>
            <planeGeometry args={[CITY_HALF * 2, ROAD_W]} />
            <meshStandardMaterial color="#121a30" roughness={0.9} />
          </mesh>
          {/* neon center lines */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[r, 0.01, 0]}>
            <planeGeometry args={[0.07, CITY_HALF * 2]} />
            <meshBasicMaterial color="#1e6f8a" toneMapped={false} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, r]}>
            <planeGeometry args={[CITY_HALF * 2, 0.07]} />
            <meshBasicMaterial color="#1e6f8a" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- Moving cars ---------- */
interface CarSpec {
  road: number;
  axis: "x" | "z";
  lane: number;
  speed: number;
  offset: number;
  color: string;
}

export function Cars({ count = 26 }: { count?: number }) {
  const specs = useMemo<CarSpec[]>(() => {
    const rnd = mulberry32(99);
    const colors = ["#67e8f9", "#f0abfc", "#fde68a", "#86efac", "#fda4af"];
    return Array.from({ length: count }, () => {
      const dir = rnd() < 0.5 ? 1 : -1;
      return {
        road: ROADS[Math.floor(rnd() * ROADS.length)],
        axis: rnd() < 0.5 ? "x" : "z",
        lane: 0.6 * dir,
        speed: (3 + rnd() * 4) * dir,
        offset: rnd() * CITY_HALF * 2,
        color: colors[Math.floor(rnd() * colors.length)],
      };
    });
  }, [count]);

  const refs = useRef<(THREE.Group | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    specs.forEach((s, i) => {
      const g = refs.current[i];
      if (!g) return;
      const span = CITY_HALF * 2;
      let p = ((s.offset + t * s.speed) % span + span) % span - CITY_HALF;
      if (s.axis === "z") {
        g.position.set(s.road + s.lane, 0.18, p);
        g.rotation.y = s.speed > 0 ? 0 : Math.PI;
      } else {
        g.position.set(p, 0.18, s.road + s.lane);
        g.rotation.y = s.speed > 0 ? Math.PI / 2 : -Math.PI / 2;
      }
    });
  });

  return (
    <group>
      {specs.map((s, i) => (
        <group key={i} ref={(el) => { refs.current[i] = el; }}>
          <mesh>
            <boxGeometry args={[0.42, 0.3, 0.9]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5} />
          </mesh>
          {/* headlights & taillights */}
          <mesh position={[0, 0.02, 0.46]}>
            <boxGeometry args={[0.36, 0.1, 0.05]} />
            <meshBasicMaterial color={s.color} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.02, -0.46]}>
            <boxGeometry args={[0.36, 0.1, 0.05]} />
            <meshBasicMaterial color="#ff3b5c" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- Special blocks ---------- */
export function Park() {
  const trees = useMemo(() => {
    const rnd = mulberry32(5);
    const arr: { x: number; z: number; s: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const x = -12 + (rnd() - 0.5) * 8;
      const z = (rnd() - 0.5) * 8;
      // keep the sensor spot clear
      if (Math.hypot(x + 12, z + 1) < 1.6) continue;
      arr.push({ x, z, s: 0.7 + rnd() * 0.6 });
    }
    return arr;
  }, []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-12, 0.005, 0]}>
        <planeGeometry args={[9.4, 9.4]} />
        <meshStandardMaterial color="#0c2a22" roughness={1} />
      </mesh>
      {/* path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-12, 0.012, 0]}>
        <ringGeometry args={[2.4, 2.9, 40]} />
        <meshBasicMaterial color="#1b3d4d" />
      </mesh>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]} scale={t.s}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.6, 6]} />
            <meshStandardMaterial color="#3b2a1a" />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <coneGeometry args={[0.55, 1.4, 7]} />
            <meshStandardMaterial color="#14532d" emissive="#0b3b1f" emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Plaza() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[9.4, 9.4]} />
        <meshStandardMaterial color="#0f1730" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[3.2, 3.4, 48]} />
        <meshBasicMaterial color="#7c3aed" toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[1.4, 1.5, 48]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>
    </group>
  );
}

export function ParkingLot() {
  const spots = useMemo(() => {
    const arr: [number, number][] = [];
    for (let i = 0; i < 5; i++) {
      arr.push([12 - 3 + i * 1.5, 0.6]);
      arr.push([12 - 3 + i * 1.5, 2.6]);
    }
    return arr;
  }, []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[12, 0.005, 0]}>
        <planeGeometry args={[9.4, 9.4]} />
        <meshStandardMaterial color="#0e1428" roughness={1} />
      </mesh>
      {spots.map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.012, z]}>
          <planeGeometry args={[1.2, 1.8]} />
          <meshBasicMaterial color="#1c2d55" wireframe />
        </mesh>
      ))}
    </group>
  );
}
