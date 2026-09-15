import { useEffect, useRef } from "react";

type RGB = { r: number; g: number; b: number };

const hexToRgb = (hex: string): RGB => {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Node = {
  x: number;
  y: number;
  z: number;
  r: number;
  phase: number;
  hot: number; // 0..1 "compromised" glow
};

/**
 * Fullscreen animated 3D node-network canvas.
 * Simulates a mesh of connected IoT devices orbiting in space.
 */
export default function StageCanvas({
  color = "#22d3ee",
  chaos = 0,
}: {
  color?: string;
  chaos?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const target = useRef({ color, chaos });
  target.current = { color, chaos };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // --- build the node cloud (spherical shell) ---
    const COUNT = window.innerWidth < 720 ? 74 : 132;
    const nodes: Node[] = [];
    for (let i = 0; i < COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const rad = 220 + Math.random() * 190;
      nodes.push({
        x: rad * Math.sin(phi) * Math.cos(theta),
        y: rad * Math.sin(phi) * Math.sin(theta) * 0.72,
        z: rad * Math.cos(phi),
        r: 0.7 + Math.random() * 2.1,
        phase: Math.random() * Math.PI * 2,
        hot: 0,
      });
    }

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let cur = hexToRgb(color);
    let curChaos = chaos;
    let ry = 0;
    let rx = 0;
    let raf = 0;
    let t = 0;

    const render = () => {
      t += 0.0055;
      const goal = hexToRgb(target.current.color);
      cur = {
        r: lerp(cur.r, goal.r, 0.04),
        g: lerp(cur.g, goal.g, 0.04),
        b: lerp(cur.b, goal.b, 0.04),
      };
      curChaos = lerp(curChaos, target.current.chaos, 0.03);
      pointer.x = lerp(pointer.x, pointer.tx, 0.045);
      pointer.y = lerp(pointer.y, pointer.ty, 0.045);

      ry += 0.0016 + curChaos * 0.0042;
      rx = Math.sin(t * 0.55) * 0.14;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const focal = 620;
      const yaw = ry + pointer.x * 0.45;
      const pitch = rx + pointer.y * 0.28;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      const proj = nodes.map((n, i) => {
        const jitter = curChaos * 26;
        const jx = Math.sin(t * 3 + n.phase) * jitter;
        const jy = Math.cos(t * 2.4 + n.phase) * jitter;
        let x = n.x + jx;
        let y = n.y + jy;
        let z = n.z;
        // yaw
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        // pitch
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const depth = focal / (focal + z2 + 460);
        return {
          sx: cx + x1 * depth,
          sy: cy + y1 * depth,
          d: depth,
          i,
          r: n.r,
          phase: n.phase,
        };
      });

      // --- links ---
      const maxDist = w < 720 ? 108 : 132;
      ctx.lineWidth = 1;
      for (let i = 0; i < proj.length; i++) {
        const a = proj[i];
        for (let j = i + 1; j < proj.length; j++) {
          const b = proj[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.42 * ((a.d + b.d) / 2);
            ctx.strokeStyle = `rgba(${cur.r | 0},${cur.g | 0},${cur.b | 0},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      // --- nodes ---
      for (const p of proj) {
        const pulse = 0.65 + Math.sin(t * 5 + p.phase) * 0.35;
        const size = p.r * p.d * (1.5 + pulse * 0.7);
        const a = Math.min(1, p.d * 1.15) * (0.45 + pulse * 0.55);
        ctx.fillStyle = `rgba(${cur.r | 0},${cur.g | 0},${cur.b | 0},${a})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();

        if (p.d > 1.05 && pulse > 0.93) {
          ctx.strokeStyle = `rgba(${cur.r | 0},${cur.g | 0},${cur.b | 0},0.32)`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size * 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}
