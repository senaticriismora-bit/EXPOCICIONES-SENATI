import { useState } from "react";
import HouseScene, { type RoomId } from "../components/HouseScene";

const ROOMS: { id: RoomId; name: string; tag: string }[] = [
  { id: "sala", name: "SALA", tag: "CYAN" },
  { id: "cocina", name: "COCINA", tag: "ÁMBAR" },
  { id: "dormitorio", name: "DORMIR", tag: "VIOLETA" },
  { id: "baño", name: "BAÑO", tag: "TEAL" },
];

export default function House() {
  const [rooms, setRooms] = useState<Record<RoomId, boolean>>({
    sala: true,
    cocina: false,
    dormitorio: true,
    baño: false,
  });
  const [alarm, setAlarm] = useState(false);

  const onToggle = (id: RoomId) => setRooms((r) => ({ ...r, [id]: !r[id] }));
  const allOn = Object.values(rooms).every(Boolean);

  return (
    <div className="absolute inset-0">
      <HouseScene rooms={rooms} alarm={alarm} onToggle={onToggle} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      <div className="pointer-events-none absolute left-[5%] top-[6%]">
        <p className="text-xl tracking-[0.4em] text-cyan-300">CASA VIVA</p>
        <h2 className="font-display mt-1 text-6xl text-white sm:text-8xl">TOCA UNA HABITACIÓN</h2>
      </div>

      <div className="absolute bottom-[6%] left-0 right-0 flex flex-wrap items-end justify-between gap-4 px-[5%]">
        <div className="flex flex-wrap gap-3">
          {ROOMS.map((room) => {
            const on = rooms[room.id];
            return (
              <button
                key={room.id}
                onClick={() => onToggle(room.id)}
                className="rounded-2xl border px-5 py-4 text-left transition"
                style={{
                  borderColor: on ? "rgba(62,224,255,0.8)" : "rgba(255,255,255,0.15)",
                  background: on ? "rgba(62,224,255,0.16)" : "rgba(0,0,0,0.45)",
                }}
              >
                <p className="text-lg tracking-[0.25em] text-white/60">{room.tag}</p>
                <p className="font-display text-4xl text-white">{room.name}</p>
                <p className="text-xl" style={{ color: on ? "#3ee0ff" : "#888" }}>
                  {on ? "ON" : "OFF"}
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              setRooms({
                sala: !allOn,
                cocina: !allOn,
                dormitorio: !allOn,
                baño: !allOn,
              })
            }
            className="rounded-2xl bg-white px-6 py-4 font-display text-3xl text-black"
          >
            {allOn ? "APAGAR" : "ENCENDER"}
          </button>
          <button
            onClick={() => setAlarm((a) => !a)}
            className="rounded-2xl px-6 py-4 font-display text-3xl"
            style={{
              background: alarm ? "#ff3355" : "rgba(255,255,255,0.08)",
              color: alarm ? "white" : "#ff8a9a",
            }}
          >
            {alarm ? "ALARMA" : "SEGURO"}
          </button>
        </div>
      </div>
    </div>
  );
}
