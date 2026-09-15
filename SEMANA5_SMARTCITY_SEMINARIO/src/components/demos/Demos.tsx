import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Car,
  CloudRain,
  Footprints,
  Send,
  Truck,
  User,
  Zap,
  Cctv,
  Lightbulb,
  Gauge,
  Trash2,
  Wind,
  Drone,
  Droplets,
  PlugZap,
  RadioTower,
  MapPin,
} from "lucide-react";
import type { DemoKind } from "../../data/content";

/* ---------- shared ---------- */
function DemoButton({
  children,
  onClick,
  color,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color: string;
  active?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="font-display inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide transition-colors md:text-base"
      style={{
        borderColor: color,
        background: active ? color : "transparent",
        color: active ? "#050816" : color,
        boxShadow: active ? `0 0 24px ${color}88` : "none",
      }}
    >
      {children}
    </motion.button>
  );
}

function Big({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="text-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          className="font-display text-4xl font-black leading-none md:text-5xl"
          style={{ color }}
        >
          {value}
        </motion.div>
      </AnimatePresence>
      <div className="mt-1 text-sm font-semibold uppercase tracking-widest text-white/60">{label}</div>
    </div>
  );
}

/* ---------- 1. Farola ---------- */
function LightDemo({ color }: { color: string }) {
  const [people, setPeople] = useState(false);
  useEffect(() => {
    if (!people) return;
    const t = setTimeout(() => setPeople(false), 3500);
    return () => clearTimeout(t);
  }, [people]);
  const power = people ? 100 : 20;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-40 w-full items-end justify-center overflow-hidden rounded-2xl bg-black/40">
        <motion.div
          animate={{ opacity: people ? 0.9 : 0.25, scaleX: people ? 1 : 0.7 }}
          transition={{ duration: 0.6 }}
          className="absolute top-4 h-48 w-56 origin-top"
          style={{ background: `conic-gradient(from 150deg at 50% 0%, transparent 0deg, ${color} 30deg, transparent 60deg)`, filter: "blur(6px)" }}
        />
        <Lightbulb className="absolute top-3 h-10 w-10" style={{ color, filter: `drop-shadow(0 0 ${people ? 18 : 4}px ${color})` }} />
        <AnimatePresence>
          {people && (
            <motion.div
              initial={{ x: -140, opacity: 0 }}
              animate={{ x: 140, opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3.4, ease: "linear" }}
              className="mb-2 text-white"
            >
              <Footprints className="h-9 w-9" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute bottom-0 h-2 w-full bg-white/10" />
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <Big value={`${power}%`} label="potencia" color={color} />
        <DemoButton color={color} onClick={() => setPeople(true)} active={people}>
          <User className="h-5 w-5" /> Pasa un peatón
        </DemoButton>
      </div>
    </div>
  );
}

/* ---------- 2. Semáforo ---------- */
function TrafficDemo({ color }: { color: string }) {
  const [ns, setNs] = useState(4);
  const [ew, setEw] = useState(4);
  const total = ns + ew;
  const nsGreen = Math.round((ns / total) * 60);
  const ewGreen = 60 - nsGreen;
  const Lane = ({ label, cars, green, onAdd }: { label: string; cars: number; green: number; onAdd: () => void }) => (
    <div className="rounded-2xl bg-black/40 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-display text-lg font-extrabold text-white">{label}</span>
        <button onClick={onAdd} className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white hover:bg-white/20">
          + coches
        </button>
      </div>
      <div className="mb-2 flex h-8 gap-1">
        {Array.from({ length: Math.min(cars, 12) }).map((_, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center">
            <Car className="h-6 w-6 text-white/80" />
          </motion.div>
        ))}
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full" animate={{ width: `${(green / 60) * 100}%` }} style={{ background: color }} />
      </div>
      <div className="mt-1 text-right font-display text-xl font-black" style={{ color }}>
        {green} s en verde
      </div>
    </div>
  );
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Lane label="Av. Norte" cars={ns} green={nsGreen} onAdd={() => setNs((v) => Math.min(v + 2, 14))} />
        <Lane label="Av. Este" cars={ew} green={ewGreen} onAdd={() => setEw((v) => Math.min(v + 2, 14))} />
      </div>
      <div className="flex justify-center">
        <DemoButton color={color} onClick={() => { setNs(4); setEw(4); }}>
          Reiniciar tráfico
        </DemoButton>
      </div>
    </div>
  );
}

/* ---------- 3. Cámara ---------- */
function CameraDemo({ color }: { color: string }) {
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    if (!alert) return;
    const t = setTimeout(() => setAlert(false), 4000);
    return () => clearTimeout(t);
  }, [alert]);
  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50">
        <div className="absolute left-3 top-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" /> REC · Cámara 07
        </div>
        <div className="grid-bg absolute inset-0 opacity-50" />
        <motion.div
          className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent"
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute flex flex-col items-start"
            style={{ top: 50 + i * 38 }}
            animate={{ x: alert && i === 1 ? ["-10%", "45%", "45%"] : ["-15%", "115%"] }}
            transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
          >
            <span className="rounded px-1 text-[10px] font-black uppercase" style={{ background: alert && i === 1 ? "#ef4444" : color, color: "#050816" }}>
              {alert && i === 1 ? "Incidente" : i === 2 ? "Peatón 98%" : "Vehículo 97%"}
            </span>
            <span className="mt-0.5 flex h-8 w-14 items-center justify-center rounded border-2" style={{ borderColor: alert && i === 1 ? "#ef4444" : color }}>
              {i === 2 ? <User className="h-5 w-5 text-white" /> : <Car className="h-5 w-5 text-white" />}
            </span>
          </motion.div>
        ))}
        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-4 bottom-3 flex items-center gap-3 rounded-xl bg-red-500 px-4 py-2 text-night"
            >
              <AlertTriangle className="h-6 w-6" />
              <span className="font-display text-base font-black">Accidente detectado → alerta enviada al C5</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-center">
        <DemoButton color={color} onClick={() => setAlert(true)} active={alert}>
          <Cctv className="h-5 w-5" /> Simular incidente
        </DemoButton>
      </div>
    </div>
  );
}

/* ---------- 4. Aire ---------- */
function AirDemo({ color }: { color: string }) {
  const [target, setTarget] = useState(32);
  const [value, setValue] = useState(32);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => v + (target - v) * 0.15 + (Math.random() - 0.5) * 2), 250);
    return () => clearInterval(id);
  }, [target]);
  const v = Math.max(0, Math.min(150, value));
  const pct = v / 150;
  const col = v < 35 ? "#a3e635" : v < 75 ? "#fbbf24" : "#f87171";
  const label = v < 35 ? "Aire limpio" : v < 75 ? "Moderado" : "Alerta";
  const r = 70;
  const circ = Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width="200" height="115" viewBox="0 0 200 115">
          <path d={`M 30 100 A ${r} ${r} 0 0 1 170 100`} stroke="rgba(255,255,255,0.12)" strokeWidth="16" fill="none" strokeLinecap="round" />
          <motion.path
            d={`M 30 100 A ${r} ${r} 0 0 1 170 100`}
            stroke={col}
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            animate={{ strokeDashoffset: circ * (1 - pct) }}
            transition={{ duration: 0.3 }}
            style={{ filter: `drop-shadow(0 0 10px ${col})` }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <div className="font-display text-4xl font-black" style={{ color: col }}>{Math.round(v)}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-white/60">PM2.5 µg/m³</div>
        </div>
      </div>
      <div className="font-display text-2xl font-black" style={{ color: col }}>{label}</div>
      <div className="flex flex-wrap justify-center gap-2">
        <DemoButton color="#f87171" onClick={() => setTarget(95)} active={target === 95}>
          <Car className="h-5 w-5" /> Tráfico intenso
        </DemoButton>
        <DemoButton color="#38bdf8" onClick={() => setTarget(12)} active={target === 12}>
          <CloudRain className="h-5 w-5" /> Lluvia
        </DemoButton>
        <DemoButton color={color} onClick={() => setTarget(32)} active={target === 32}>
          <Wind className="h-5 w-5" /> Normal
        </DemoButton>
      </div>
    </div>
  );
}

/* ---------- 5. Contenedor ---------- */
function BinDemo({ color }: { color: string }) {
  const [level, setLevel] = useState(35);
  const [truck, setTruck] = useState(false);
  useEffect(() => {
    if (level < 80 || truck) return;
    setTruck(true);
    const t = setTimeout(() => { setLevel(0); setTruck(false); }, 2600);
    return () => clearTimeout(t);
  }, [level, truck]);
  return (
    <div className="flex items-center justify-around gap-4">
      <div className="relative h-44 w-28 overflow-hidden rounded-b-2xl rounded-t-md border-2 border-white/20 bg-black/40">
        <motion.div className="absolute bottom-0 w-full" animate={{ height: `${level}%` }} style={{ background: level >= 80 ? "#f87171" : color }} transition={{ type: "spring", stiffness: 120, damping: 16 }} />
        <div className="absolute inset-x-0 top-2 text-center font-display text-3xl font-black text-white drop-shadow">{level}%</div>
        <Trash2 className="absolute bottom-3 left-1/2 h-8 w-8 -translate-x-1/2 text-night/70" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <AnimatePresence mode="wait">
          {truck ? (
            <motion.div key="t" initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -80, opacity: 0 }} className="flex flex-col items-center text-center">
              <Truck className="h-14 w-14 text-white" />
              <span className="font-display mt-1 text-lg font-black" style={{ color }}>¡Camión en camino!</span>
            </motion.div>
          ) : (
            <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="font-display text-xl font-black text-white">Sensor ultrasónico</div>
              <div className="text-sm font-semibold uppercase tracking-widest text-white/60">avisa al llegar al 80 %</div>
            </motion.div>
          )}
        </AnimatePresence>
        <DemoButton color={color} onClick={() => setLevel((l) => Math.min(100, l + 15))}>
          <Trash2 className="h-5 w-5" /> Tirar basura
        </DemoButton>
      </div>
    </div>
  );
}

/* ---------- 6. Medidor ---------- */
function MeterDemo({ color }: { color: string }) {
  const [leak, setLeak] = useState(false);
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: 16 }, () => 20 + Math.random() * 30));
  useEffect(() => {
    const id = setInterval(() => {
      setBars((b) => [...b.slice(1), leak ? 75 + Math.random() * 20 : 20 + Math.random() * 30]);
    }, 450);
    return () => clearInterval(id);
  }, [leak]);
  const last = bars[bars.length - 1];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-36 items-end gap-1 rounded-2xl bg-black/40 p-3">
        {bars.map((h, i) => (
          <motion.div key={i} className="flex-1 rounded-t" animate={{ height: `${h}%` }} style={{ background: h > 65 ? "#f87171" : color }} transition={{ duration: 0.3 }} />
        ))}
      </div>
      <div className="flex items-center justify-between gap-3">
        <Big value={`${Math.round(last * 3)} L/h`} label="consumo de agua" color={last > 65 ? "#f87171" : color} />
        <AnimatePresence>
          {leak && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2 rounded-full bg-red-500 px-3 py-1.5 font-display text-sm font-black text-night">
              <Droplets className="h-4 w-4" /> ¡Fuga detectada!
            </motion.div>
          )}
        </AnimatePresence>
        <DemoButton color={leak ? "#f87171" : color} onClick={() => setLeak((l) => !l)} active={leak}>
          {leak ? "Reparar fuga" : "Simular fuga"}
        </DemoButton>
      </div>
    </div>
  );
}

/* ---------- 7. EV ---------- */
function EVDemo({ color }: { color: string }) {
  const [charging, setCharging] = useState(false);
  const [pct, setPct] = useState(18);
  useEffect(() => {
    if (!charging) return;
    const id = setInterval(() => setPct((p) => (p >= 100 ? 100 : p + 1)), 60);
    return () => clearInterval(id);
  }, [charging]);
  useEffect(() => { if (pct >= 100) setCharging(false); }, [pct]);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-20 w-64 rounded-2xl border-4 border-white/30 p-1.5">
        <div className="absolute -right-3 top-1/2 h-8 w-2 -translate-y-1/2 rounded-r bg-white/30" />
        <motion.div className="h-full rounded-xl" animate={{ width: `${pct}%` }} style={{ background: color, boxShadow: `0 0 24px ${color}` }} />
        <div className="absolute inset-0 flex items-center justify-center font-display text-3xl font-black text-white drop-shadow">{pct}%</div>
        {charging && <Zap className="absolute -top-5 left-1/2 h-8 w-8 -translate-x-1/2 animate-bounce text-white" />}
      </div>
      <div className="flex w-full items-center justify-around">
        <Big value={`${(pct * 0.6).toFixed(0)} kWh`} label="energía" color={color} />
        <Big value={charging ? `${Math.ceil((100 - pct) * 0.6)} min` : "—"} label="restante" color="#fff" />
      </div>
      <DemoButton color={color} onClick={() => { if (pct >= 100) setPct(18); setCharging((c) => !c); }} active={charging}>
        <PlugZap className="h-5 w-5" /> {charging ? "Desconectar" : pct >= 100 ? "Nuevo coche" : "Conectar coche"}
      </DemoButton>
    </div>
  );
}

/* ---------- 8. Antena ---------- */
function AntennaDemo({ color }: { color: string }) {
  const [packets, setPackets] = useState(0);
  const [burst, setBurst] = useState(0);
  const nodes = [Lightbulb, Cctv, Gauge, Trash2, Wind, Car];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-48 w-48">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: color }}
            animate={{ scale: [0.2, 1.1], opacity: [0.9, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-night" style={{ boxShadow: `0 0 30px ${color}` }}>
          <RadioTower className="h-9 w-9" style={{ color }} />
        </div>
        {nodes.map((Icon, i) => {
          const a = (i / nodes.length) * Math.PI * 2;
          const x = 50 + Math.cos(a) * 42;
          const y = 50 + Math.sin(a) * 42;
          return (
            <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <motion.span
                key={`${i}-${burst}`}
                className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full"
                style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                initial={{ x: -6, y: -6, opacity: 1 }}
                animate={{ x: -6 + (50 - x) * 1.92, y: -6 + (50 - y) * 1.92, opacity: [1, 1, 0] }}
                transition={{ duration: 0.9, delay: i * 0.08 }}
                onAnimationComplete={() => burst > 0 && setPackets((p) => p + 1)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex w-full items-center justify-around">
        <Big value={`${packets}`} label="paquetes recibidos" color={color} />
        <Big value="1 ms" label="latencia" color="#fff" />
      </div>
      <DemoButton color={color} onClick={() => setBurst((b) => b + 1)}>
        <Send className="h-5 w-5" /> Enviar datos
      </DemoButton>
    </div>
  );
}

/* ---------- 9. Parking ---------- */
function ParkingDemo({ color }: { color: string }) {
  const [spots, setSpots] = useState<boolean[]>(() => Array.from({ length: 12 }, (_, i) => [0, 2, 3, 5, 6, 9, 10].includes(i)));
  const free = spots.filter((s) => !s).length;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-6 gap-2">
        {spots.map((busy, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSpots((s) => s.map((v, j) => (j === i ? !v : v)))}
            className="flex h-14 w-12 items-center justify-center rounded-lg border-2"
            style={{ borderColor: busy ? "#f87171" : "#4ade80", background: busy ? "rgba(248,113,113,0.15)" : "rgba(74,222,128,0.12)", boxShadow: busy ? "none" : "0 0 14px rgba(74,222,128,0.4)" }}
          >
            <AnimatePresence mode="wait">
              {busy ? (
                <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Car className="h-7 w-7 text-white" />
                </motion.span>
              ) : (
                <motion.span key="f" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="h-3 w-3 rounded-full bg-green-400" />
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      <div className="flex w-full items-center justify-around">
        <Big value={`${free}`} label="plazas libres" color={free > 0 ? "#4ade80" : "#f87171"} />
        <Big value={free > 0 ? "2 min" : "15 min"} label="tiempo para aparcar" color={color} />
      </div>
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-white/50">Toca una plaza para ocuparla o liberarla</p>
    </div>
  );
}

/* ---------- 10. Dron ---------- */
function DroneDemo({ color }: { color: string }) {
  const [pos, setPos] = useState({ x: 20, y: 70 });
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [eta, setEta] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const send = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const d = Math.hypot(x - pos.x, y - pos.y);
    setEta(Math.max(1, Math.round(d / 12)));
    setTarget({ x, y });
    setPos({ x, y });
  };
  useEffect(() => {
    if (eta <= 0) return;
    const id = setInterval(() => setEta((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [eta]);
  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={ref} onClick={send} className="grid-bg relative h-48 w-full cursor-crosshair overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        {target && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -translate-x-1/2 -translate-y-full text-red-400" style={{ left: `${target.x}%`, top: `${target.y}%` }}>
            <MapPin className="h-8 w-8" />
          </motion.div>
        )}
        <motion.div
          animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          transition={{ duration: Math.max(0.6, eta), ease: "easeInOut" }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <Drone className="h-10 w-10" style={{ color, filter: `drop-shadow(0 0 10px ${color})` }} />
          </motion.div>
        </motion.div>
        <div className="absolute left-3 top-2 text-xs font-bold uppercase tracking-widest text-white/60">Toca el mapa para enviar el dron</div>
      </div>
      <div className="flex w-full items-center justify-around">
        <Big value={eta > 0 ? `${eta} s` : "En sitio"} label={eta > 0 ? "llegada" : "misión"} color={color} />
        <Big value="Emergencia" label="tipo de misión" color="#fff" />
      </div>
    </div>
  );
}

export function Demo({ kind, color }: { kind: DemoKind; color: string }) {
  switch (kind) {
    case "light": return <LightDemo color={color} />;
    case "traffic": return <TrafficDemo color={color} />;
    case "camera": return <CameraDemo color={color} />;
    case "air": return <AirDemo color={color} />;
    case "bin": return <BinDemo color={color} />;
    case "meter": return <MeterDemo color={color} />;
    case "ev": return <EVDemo color={color} />;
    case "antenna": return <AntennaDemo color={color} />;
    case "parking": return <ParkingDemo color={color} />;
    case "drone": return <DroneDemo color={color} />;
    default: return null;
  }
}
