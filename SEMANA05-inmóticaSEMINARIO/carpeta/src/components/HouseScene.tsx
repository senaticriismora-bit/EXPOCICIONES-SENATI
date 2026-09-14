import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, Grid, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type RoomId = "sala" | "cocina" | "dormitorio" | "baño";

type HouseSceneProps = {
  rooms: Record<RoomId, boolean>;
  alarm: boolean;
  onToggle: (id: RoomId) => void;
};

const ROOM_COLOR: Record<RoomId, string> = {
  sala: "#3ee0ff",
  cocina: "#ffb703",
  dormitorio: "#c084fc",
  baño: "#5eead4",
};

function WindowPane({
  position,
  rotation,
  on,
  color,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  on: boolean;
  color: string;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[1.15, 1.05]} />
      <meshStandardMaterial
        color={on ? color : "#0b1220"}
        emissive={on ? color : "#071018"}
        emissiveIntensity={on ? 1.8 : 0.15}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function FurnitureBox({
  position,
  size,
  color,
  roughness = 0.55,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roughness?: number;
}) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={0.08} />
    </mesh>
  );
}

function RoomLight({ on, color, position }: { on: boolean; color: string; position: [number, number, number] }) {
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!light.current) return;
    const pulse = 0.92 + Math.sin(clock.elapsedTime * 2.1) * 0.08;
    light.current.intensity = on ? 7.5 * pulse : 0;
  });
  return <pointLight ref={light} color={color} position={position} distance={6.5} decay={2} />;
}

function Pool() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.emissiveIntensity = 0.55 + Math.sin(clock.elapsedTime * 1.4) * 0.18;
    }
  });
  return (
    <group position={[0, 0, 4.15]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[5.6, 2.1]} />
        <meshStandardMaterial color="#0b1c24" roughness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <planeGeometry args={[4.6, 1.45]} />
        <meshStandardMaterial
          ref={mat}
          color="#147a8c"
          emissive="#3ee0ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
          roughness={0.12}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}

function HitFloor({
  position,
  size,
  id,
  on,
  onToggle,
}: {
  position: [number, number, number];
  size: [number, number];
  id: RoomId;
  on: boolean;
  onToggle: (id: RoomId) => void;
}) {
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(id);
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial
        color={on ? ROOM_COLOR[id] : "#16141a"}
        emissive={on ? ROOM_COLOR[id] : "#000000"}
        emissiveIntensity={on ? 0.28 : 0}
        transparent
        opacity={on ? 0.55 : 0.18}
      />
    </mesh>
  );
}

function Villa({ rooms, alarm, onToggle }: HouseSceneProps) {
  const alarmRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!alarmRef.current) return;
    alarmRef.current.emissiveIntensity = alarm ? 0.6 + Math.sin(clock.elapsedTime * 8) * 0.6 : 0.05;
  });

  const wall = "#d8d2c8";
  const dark = "#1a1714";
  const wood = "#6b4b32";

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[11, 64]} />
        <meshStandardMaterial color="#0b0c10" roughness={0.95} />
      </mesh>

      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[8.4, 0.12, 6.4]} />
        <meshStandardMaterial color="#2a241e" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.13, 0]} receiveShadow>
        <boxGeometry args={[8.15, 0.04, 6.15]} />
        <meshStandardMaterial color={wood} roughness={0.7} />
      </mesh>

      <mesh position={[0, 1.25, -3.08]} castShadow>
        <boxGeometry args={[8.3, 2.5, 0.12]} />
        <meshStandardMaterial color={wall} roughness={0.62} />
      </mesh>
      <mesh position={[-4.14, 1.25, 0]} castShadow>
        <boxGeometry args={[0.12, 2.5, 6.28]} />
        <meshStandardMaterial color={wall} roughness={0.62} />
      </mesh>
      <mesh position={[4.14, 1.25, 0]} castShadow>
        <boxGeometry args={[0.12, 2.5, 6.28]} />
        <meshStandardMaterial color={wall} roughness={0.62} />
      </mesh>
      <mesh position={[-1.7, 1.25, 3.08]} castShadow>
        <boxGeometry args={[4.9, 2.5, 0.12]} />
        <meshStandardMaterial color={wall} roughness={0.62} />
      </mesh>
      <mesh position={[3.05, 1.25, 3.08]} castShadow>
        <boxGeometry args={[2.2, 2.5, 0.12]} />
        <meshStandardMaterial color={wall} roughness={0.62} />
      </mesh>
      <mesh position={[1.7, 1.55, 3.08]} castShadow>
        <boxGeometry args={[0.55, 1.9, 0.1]} />
        <meshStandardMaterial color={dark} roughness={0.4} metalness={0.3} />
      </mesh>

      <mesh position={[1.05, 1.25, -0.55]} castShadow>
        <boxGeometry args={[0.1, 2.5, 5.1]} />
        <meshStandardMaterial color="#cfc8be" roughness={0.7} />
      </mesh>
      <mesh position={[2.6, 1.25, 0.05]} castShadow>
        <boxGeometry args={[3.1, 2.5, 0.1]} />
        <meshStandardMaterial color="#cfc8be" roughness={0.7} />
      </mesh>

      <mesh position={[0, 2.62, 0]}>
        <boxGeometry args={[8.7, 0.08, 6.7]} />
        <meshStandardMaterial
          color="#141820"
          transparent
          opacity={0.22}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
      <mesh position={[0, 2.72, 0]}>
        <boxGeometry args={[8.9, 0.06, 0.16]} />
        <meshStandardMaterial color="#3ee0ff" emissive="#3ee0ff" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 2.72, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6.9, 0.06, 0.16]} />
        <meshStandardMaterial color="#3ee0ff" emissive="#3ee0ff" emissiveIntensity={0.7} />
      </mesh>

      <WindowPane position={[-2.2, 1.45, -3.15]} on={rooms.sala} color={ROOM_COLOR.sala} />
      <WindowPane position={[0.05, 1.45, -3.15]} on={rooms.sala} color={ROOM_COLOR.sala} />
      <WindowPane position={[2.55, 1.45, -3.15]} on={rooms.dormitorio} color={ROOM_COLOR.dormitorio} />
      <WindowPane
        position={[-4.21, 1.45, -1.1]}
        rotation={[0, Math.PI / 2, 0]}
        on={rooms.sala}
        color={ROOM_COLOR.sala}
      />
      <WindowPane
        position={[4.21, 1.45, 1.55]}
        rotation={[0, -Math.PI / 2, 0]}
        on={rooms.cocina}
        color={ROOM_COLOR.cocina}
      />
      <WindowPane
        position={[4.21, 1.45, -1.5]}
        rotation={[0, -Math.PI / 2, 0]}
        on={rooms.baño}
        color={ROOM_COLOR.baño}
      />

      <HitFloor position={[-1.5, 0.18, 0]} size={[5, 5.8]} id="sala" on={rooms.sala} onToggle={onToggle} />
      <HitFloor position={[2.6, 0.18, 1.55]} size={[2.9, 2.8]} id="cocina" on={rooms.cocina} onToggle={onToggle} />
      <HitFloor
        position={[2.05, 0.18, -1.45]}
        size={[1.9, 2.6]}
        id="dormitorio"
        on={rooms.dormitorio}
        onToggle={onToggle}
      />
      <HitFloor position={[3.45, 0.2, -2.2]} size={[1.25, 1.4]} id="baño" on={rooms.baño} onToggle={onToggle} />
      <mesh position={[3.2, 1.15, -1.35]}>
        <boxGeometry args={[1.8, 2.3, 0.08]} />
        <meshStandardMaterial color="#cfc8be" roughness={0.7} />
      </mesh>

      <FurnitureBox position={[-2.35, 0.42, 1.7]} size={[2.3, 0.55, 0.85]} color="#2b3344" />
      <FurnitureBox position={[-2.35, 0.58, 1.7]} size={[2.15, 0.18, 0.72]} color="#3ee0ff" />
      <FurnitureBox position={[-1.1, 0.32, 0.35]} size={[0.9, 0.28, 0.9]} color="#4a3426" />
      <FurnitureBox position={[-3.35, 0.95, -2.35]} size={[1.15, 1.5, 0.12]} color="#111318" />
      {rooms.sala && (
        <mesh position={[-3.28, 0.95, -2.28]}>
          <planeGeometry args={[0.95, 0.7]} />
          <meshStandardMaterial color="#3ee0ff" emissive="#3ee0ff" emissiveIntensity={1.4} />
        </mesh>
      )}

      <FurnitureBox position={[2.7, 0.55, 2.35]} size={[2.4, 0.85, 0.55]} color="#c9c3b8" />
      <FurnitureBox position={[3.55, 0.95, 1.4]} size={[0.55, 1.55, 1.7]} color="#9a9388" />

      <FurnitureBox position={[2.05, 0.38, -1.7]} size={[1.45, 0.4, 1.8]} color="#5c3b2e" />
      <FurnitureBox position={[2.05, 0.55, -1.7]} size={[1.3, 0.16, 1.6]} color="#f2efe8" />
      <FurnitureBox position={[3.5, 0.32, -2.25]} size={[1.05, 0.32, 0.7]} color="#d9d4cc" />

      <mesh position={[3.55, 2.35, -2.55]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          ref={alarmRef}
          color={alarm ? "#ff3355" : "#3ee0ff"}
          emissive={alarm ? "#ff3355" : "#3ee0ff"}
          emissiveIntensity={alarm ? 1.4 : 0.2}
        />
      </mesh>

      <RoomLight on={rooms.sala} color={ROOM_COLOR.sala} position={[-1.4, 2.15, 0.2]} />
      <RoomLight on={rooms.cocina} color={ROOM_COLOR.cocina} position={[2.6, 2.15, 1.5]} />
      <RoomLight on={rooms.dormitorio} color={ROOM_COLOR.dormitorio} position={[2.6, 2.15, -1.5]} />
      <RoomLight on={rooms.baño} color={ROOM_COLOR.baño} position={[3.4, 2.1, -2.3]} />

      <Html position={[-1.4, 2.9, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="font-display whitespace-nowrap text-3xl text-white drop-shadow-[0_0_12px_#3ee0ff]">
          SALA
        </div>
      </Html>
      <Html position={[2.6, 2.9, 1.5]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="font-display whitespace-nowrap text-3xl text-amber-300 drop-shadow-[0_0_12px_#ffb703]">
          COCINA
        </div>
      </Html>
      <Html position={[2.05, 2.9, -1.4]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="font-display whitespace-nowrap text-3xl text-fuchsia-300 drop-shadow-[0_0_12px_#c084fc]">
          DORMIR
        </div>
      </Html>
      <Html position={[3.45, 2.6, -2.2]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="font-display whitespace-nowrap text-2xl text-teal-300">BAÑO</div>
      </Html>

      <Pool />

      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <mesh position={[-5.6, 1.1, 2.2]}>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#3ee0ff" emissive="#3ee0ff" emissiveIntensity={0.8} wireframe />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.45}>
        <mesh position={[5.4, 1.4, -1.6]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#ffb703" emissive="#ffb703" emissiveIntensity={0.7} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function Rig() {
  return <hemisphereLight args={["#3ee0ff", "#08080c", 0.4]} />;
}

export default function HouseScene({ rooms, alarm, onToggle }: HouseSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [8.8, 6.2, 9.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 12, 26]} />
      <ambientLight intensity={0.28} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.25} color="#3ee0ff" />
      <Rig />
      <Grid
        args={[20, 20]}
        cellColor="#102026"
        sectionColor="#1b3d46"
        fadeDistance={22}
        fadeStrength={1.4}
        position={[0, 0.001, 0]}
      />
      <Villa rooms={rooms} alarm={alarm} onToggle={onToggle} />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.45} scale={18} blur={2.4} far={8} />
      <OrbitControls
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.55}
        minDistance={7}
        maxDistance={16}
        maxPolarAngle={Math.PI / 2.15}
        minPolarAngle={0.6}
        target={[0, 0.8, 0]}
      />
    </Canvas>
  );
}
