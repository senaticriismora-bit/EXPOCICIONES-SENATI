import type { LucideIcon } from "lucide-react";
import {
  Lightbulb,
  TrafficCone,
  Cctv,
  Wind,
  Trash2,
  Gauge,
  EvCharger,
  RadioTower,
  SquareParking,
  Drone,
  Car,
  Zap,
  Shield,
  Leaf,
  Droplets,
  Landmark,
  HeartPulse,
  Wifi,
  Cpu,
  Cloud,
  Users,
  Smartphone,
  Network,
} from "lucide-react";

export type DemoKind =
  | "light"
  | "traffic"
  | "camera"
  | "air"
  | "bin"
  | "meter"
  | "ev"
  | "antenna"
  | "parking"
  | "drone";

export type ModelKind = DemoKind;

export interface Device {
  id: string;
  name: string;
  tagline: string;
  description: string;
  example: string;
  exampleCity: string;
  services: string[];
  color: string;
  icon: LucideIcon;
  position: [number, number, number];
  model: ModelKind;
  demo: DemoKind;
  stat: { value: string; label: string };
}

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  examples: string[];
  devices: string[];
  color: string;
  icon: LucideIcon;
}

export interface Layer {
  id: string;
  name: string;
  short: string;
  items: string[];
  color: string;
  icon: LucideIcon;
}

export const DEVICES: Device[] = [
  {
    id: "farola",
    name: "Farolas inteligentes",
    tagline: "Luz solo cuando hace falta",
    description:
      "Farolas LED con sensores de movimiento y luz. Se atenúan cuando no hay nadie y avisan si fallan.",
    example: "Reemplazó más de 200.000 farolas por LED conectadas.",
    exampleCity: "Los Ángeles",
    services: ["energia", "seguridad"],
    color: "#fbbf24",
    icon: Lightbulb,
    position: [7.6, 0, 13],
    model: "light",
    demo: "light",
    stat: { value: "-70%", label: "consumo eléctrico" },
  },
  {
    id: "semaforo",
    name: "Semáforos inteligentes",
    tagline: "Tráfico que se adapta en tiempo real",
    description:
      "Cámaras y sensores miden el flujo de vehículos y ajustan los tiempos de cada luz al instante.",
    example: "El sistema Surtrac redujo los tiempos de viaje un 25%.",
    exampleCity: "Pittsburgh",
    services: ["movilidad", "seguridad"],
    color: "#4ade80",
    icon: TrafficCone,
    position: [4.4, 0, 4.4],
    model: "traffic",
    demo: "traffic",
    stat: { value: "-40%", label: "tiempo detenido" },
  },
  {
    id: "camara",
    name: "Cámaras con IA",
    tagline: "Ojos que detectan incidentes",
    description:
      "Reconocen accidentes, aglomeraciones o placas y alertan de inmediato al centro de control.",
    example: "Miles de cámaras conectadas al centro de control C5.",
    exampleCity: "Ciudad de México",
    services: ["seguridad", "movilidad"],
    color: "#f87171",
    icon: Cctv,
    position: [7.6, 0, -7.6],
    model: "camera",
    demo: "camera",
    stat: { value: "24/7", label: "monitoreo continuo" },
  },
  {
    id: "sensor",
    name: "Sensores ambientales",
    tagline: "Miden el aire que respiramos",
    description:
      "Registran CO₂, partículas PM2.5, ruido, temperatura y humedad cada pocos segundos.",
    example: "La red Sentilo integra miles de sensores urbanos.",
    exampleCity: "Barcelona",
    services: ["ambiente", "salud"],
    color: "#a3e635",
    icon: Wind,
    position: [-12, 0, -1],
    model: "air",
    demo: "air",
    stat: { value: "60 s", label: "entre lecturas" },
  },
  {
    id: "contenedor",
    name: "Contenedores inteligentes",
    tagline: "Basura que avisa cuando está llena",
    description:
      "Un sensor ultrasónico mide el nivel de llenado y el camión solo pasa donde hace falta.",
    example: "Sensores en contenedores optimizan las rutas de recogida.",
    exampleCity: "Santander",
    services: ["agua", "ambiente"],
    color: "#34d399",
    icon: Trash2,
    position: [-7.6, 0, 7.6],
    model: "bin",
    demo: "bin",
    stat: { value: "-30%", label: "viajes de camiones" },
  },
  {
    id: "medidor",
    name: "Medidores inteligentes",
    tagline: "Agua y luz en tiempo real",
    description:
      "Envían lecturas automáticas de agua, luz y gas. Detectan fugas y cortes al instante.",
    example: "Más de 30 millones de smart meters instalados.",
    exampleCity: "Reino Unido",
    services: ["energia", "agua"],
    color: "#38bdf8",
    icon: Gauge,
    position: [-7.6, 0, -12],
    model: "meter",
    demo: "meter",
    stat: { value: "15 min", label: "por lectura" },
  },
  {
    id: "cargador",
    name: "Cargadores eléctricos",
    tagline: "Energía limpia para moverse",
    description:
      "Puntos de carga conectados que muestran disponibilidad, precio y reserva desde el móvil.",
    example: "Más de 5.000 puntos de carga públicos en la vía.",
    exampleCity: "Ámsterdam",
    services: ["movilidad", "energia"],
    color: "#2dd4bf",
    icon: EvCharger,
    position: [12, 0, -3],
    model: "ev",
    demo: "ev",
    stat: { value: "0 g", label: "de CO₂ al circular" },
  },
  {
    id: "antena",
    name: "Antenas 5G y redes IoT",
    tagline: "La red que conecta todo",
    description:
      "5G, LoRaWAN y Wi-Fi público transportan los datos de millones de dispositivos sin retrasos.",
    example: "Wi-Fi gratuito en toda la ciudad, incluso en el metro.",
    exampleCity: "Seúl",
    services: ["conectividad"],
    color: "#c084fc",
    icon: RadioTower,
    position: [0, 0, 0],
    model: "antenna",
    demo: "antenna",
    stat: { value: "1 ms", label: "de latencia" },
  },
  {
    id: "parking",
    name: "Sensores de parking",
    tagline: "Encuentra sitio sin dar vueltas",
    description:
      "Detectan si una plaza está libre y lo muestran en la app o en paneles de la calle.",
    example: "SFpark ajusta precios y guía según la ocupación.",
    exampleCity: "San Francisco",
    services: ["movilidad", "ambiente"],
    color: "#60a5fa",
    icon: SquareParking,
    position: [12, 0, 1.5],
    model: "parking",
    demo: "parking",
    stat: { value: "-30%", label: "tráfico buscando sitio" },
  },
  {
    id: "dron",
    name: "Drones urbanos",
    tagline: "Vigilancia y entregas desde el aire",
    description:
      "Inspeccionan puentes, apoyan emergencias y llevan medicinas a donde no llega un coche.",
    example: "Drones de policía patrullan y asisten en emergencias.",
    exampleCity: "Dubái",
    services: ["seguridad", "salud"],
    color: "#f472b6",
    icon: Drone,
    position: [-6, 7, -6],
    model: "drone",
    demo: "drone",
    stat: { value: "3 min", label: "tiempo de respuesta" },
  },
];

export const SERVICES: Service[] = [
  {
    id: "movilidad",
    name: "Movilidad inteligente",
    tagline: "Llegar más rápido y más limpio",
    description: "Transporte, tráfico y parking conectados en una sola red.",
    examples: ["Bus en tiempo real", "Semáforos adaptativos", "Bicis compartidas"],
    devices: ["semaforo", "parking", "cargador", "camara"],
    color: "#60a5fa",
    icon: Car,
  },
  {
    id: "energia",
    name: "Energía inteligente",
    tagline: "Consumir menos, aprovechar mejor",
    description: "Redes eléctricas que se equilibran solas y alumbrado eficiente.",
    examples: ["Smart grid", "Alumbrado LED", "Paneles solares"],
    devices: ["farola", "medidor", "cargador"],
    color: "#fbbf24",
    icon: Zap,
  },
  {
    id: "seguridad",
    name: "Seguridad ciudadana",
    tagline: "Respuesta en minutos, no en horas",
    description: "Videovigilancia con IA y coordinación de emergencias.",
    examples: ["Centro de control", "Botones de pánico", "Alertas automáticas"],
    devices: ["camara", "farola", "dron"],
    color: "#f87171",
    icon: Shield,
  },
  {
    id: "ambiente",
    name: "Medio ambiente",
    tagline: "Aire limpio y ciudad silenciosa",
    description: "Monitoreo constante de contaminación, ruido y clima.",
    examples: ["Alertas de calidad del aire", "Zonas de bajas emisiones", "Riego inteligente"],
    devices: ["sensor", "contenedor", "parking"],
    color: "#a3e635",
    icon: Leaf,
  },
  {
    id: "agua",
    name: "Agua y residuos",
    tagline: "Ni una gota ni un viaje de más",
    description: "Detección de fugas y recogida de basura optimizada.",
    examples: ["Detección de fugas", "Rutas de recogida", "Reciclaje inteligente"],
    devices: ["medidor", "contenedor"],
    color: "#38bdf8",
    icon: Droplets,
  },
  {
    id: "gobierno",
    name: "Gobierno digital",
    tagline: "Trámites en un clic",
    description: "Servicios públicos en línea, datos abiertos y participación.",
    examples: ["App municipal", "Datos abiertos", "Votación ciudadana"],
    devices: ["antena", "camara"],
    color: "#c084fc",
    icon: Landmark,
  },
  {
    id: "salud",
    name: "Salud inteligente",
    tagline: "Cuidar antes de curar",
    description: "Telemedicina, ambulancias conectadas y alertas sanitarias.",
    examples: ["Telemedicina", "Ambulancia con prioridad", "Alertas de calor"],
    devices: ["sensor", "dron", "semaforo"],
    color: "#f472b6",
    icon: HeartPulse,
  },
  {
    id: "conectividad",
    name: "Conectividad",
    tagline: "La base de todo lo demás",
    description: "Wi-Fi público, 5G y fibra que unen dispositivos y personas.",
    examples: ["Wi-Fi gratuito", "Red 5G", "Kioscos digitales"],
    devices: ["antena"],
    color: "#2dd4bf",
    icon: Wifi,
  },
];

export const LAYERS: Layer[] = [
  {
    id: "ciudadanos",
    name: "Ciudadanos",
    short: "Personas que viven mejor",
    items: ["Apps móviles", "Paneles en la calle", "Participación"],
    color: "#f472b6",
    icon: Users,
  },
  {
    id: "servicios",
    name: "Servicios",
    short: "Aplicaciones que actúan",
    items: ["Movilidad", "Energía", "Seguridad", "Ambiente"],
    color: "#fbbf24",
    icon: Smartphone,
  },
  {
    id: "plataforma",
    name: "Plataforma de datos",
    short: "Nube + IA que analiza y decide",
    items: ["Big Data", "Inteligencia artificial", "Gemelo digital"],
    color: "#a855f7",
    icon: Cloud,
  },
  {
    id: "conectividad",
    name: "Conectividad",
    short: "Redes que transportan los datos",
    items: ["5G", "LoRaWAN", "Fibra óptica", "Wi-Fi"],
    color: "#22d3ee",
    icon: Network,
  },
  {
    id: "dispositivos",
    name: "Dispositivos",
    short: "Sensores que captan la ciudad",
    items: ["Sensores IoT", "Cámaras", "Medidores", "Actuadores"],
    color: "#a3e635",
    icon: Cpu,
  },
];

export const TEAM = [
  { n: "01", first: "MECHÁN ENEQUE", second: "JUAN ENRIQUE" },
  { n: "02", first: "MORA DAMIAN", second: "CHRISTIAN ALFREDO" },
  { n: "03", first: "MURGA CASTRO", second: "ANDRÉ ALEXANDER" },
  { n: "04", first: "ROMERO CANAQUIRI", second: "ROLIN ROY" },
];

export const INSTRUCTOR = { first: "MG. FERNANDO MIGUEL", second: "PISFIL ORTIZ" };

export const serviceById = (id: string) => SERVICES.find((s) => s.id === id)!;
export const deviceById = (id: string) => DEVICES.find((d) => d.id === id)!;
