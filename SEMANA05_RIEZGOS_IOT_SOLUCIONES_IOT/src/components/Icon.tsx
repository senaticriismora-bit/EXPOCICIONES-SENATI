import type { SVGProps } from "react";

const P: Record<string, string> = {
  camera:
    "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  lock: "M5 11h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z M7.5 11V7a4.5 4.5 0 0 1 9 0v4 M12 15v3",
  unlock:
    "M5 11h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z M7.5 11V7a4.5 4.5 0 0 1 8.8-1.3 M12 15v3",
  wifi: "M5 12.6a11 11 0 0 1 14 0 M1.5 9a16 16 0 0 1 21 0 M8.5 16.1a6 6 0 0 1 7 0 M12 20h.01",
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 11v1a7 7 0 0 1-14 0v-1 M12 19v3 M8 22h8",
  tv: "M3 7h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z M17 2l-5 5-5-5",
  thermo: "M14 14.8V4.5a2.5 2.5 0 0 0-5 0v10.3a4.5 4.5 0 1 0 5 0z M12 9v7",
  key: "M20 3l-7.6 7.6 M17.5 5.5l2.5 2.5 M15 8l3 3 M10.5 12.5a5 5 0 1 1-7 7 5 5 0 0 1 7-7z",
  chip: "M5 5h14v14H5z M9.5 9.5h5v5h-5z M9 2v3 M15 2v3 M9 19v3 M15 19v3 M19 9h3 M19 15h3 M2 9h3 M2 15h3",
  globe:
    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2.5 12h19 M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z",
  bug: "M8 8h8v6a4 4 0 0 1-8 0V8z M8 8a4 4 0 0 1 8 0 M3 10h5 M16 10h5 M3.5 17h4.8 M15.7 17h4.8 M4.5 4l3 3 M19.5 4l-3 3",
  eye: "M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  shield: "M12 22s8-4 8-10V5.5L12 2.5 4 5.5V12c0 6 8 10 8 10z M9 12l2 2 4-4",
  phone: "M6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M12 18.5h.01",
  radio:
    "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M4.9 19.1a10 10 0 0 1 0-14.2 M19.1 4.9a10 10 0 0 1 0 14.2 M7.8 16.2a6 6 0 0 1 0-8.4 M16.2 7.8a6 6 0 0 1 0 8.4",
  server:
    "M3 3h18a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M3 14h18a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z M6 6.5h.01 M6 17.5h.01",
  refresh: "M22 4v6h-6 M2 20v-6h6 M20.5 9a8.5 8.5 0 0 0-15-3L2 10 M3.5 15a8.5 8.5 0 0 0 15 3l3.5-4",
  share: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M8.6 13.5l6.8 4 M15.4 6.5l-6.8 4",
  door: "M3 21h18 M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17 M14.5 12h.01",
  trash: "M3 6h18 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6 M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2 M10 11v6 M14 11v6",
  tag: "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z M7 7h.01",
  alert: "M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z M12 9v4.5 M12 17.5h.01",
  check: "M20 6L9 17l-5-5",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6.5V12l3.5 2",
  wall: "M3 4h18v16H3z M3 9.3h18 M3 14.6h18 M8.5 4v5.3 M15.5 9.3v5.3 M8.5 14.6V20",
  brand: "M12 2l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L2.5 8.9 9.1 8z",
  upload: "M12 20V5 M6 11l6-6 6 6 M4 21h16",
};

export default function Icon({
  name,
  size = 24,
  ...rest
}: { name: keyof typeof P | string; size?: number } & SVGProps<SVGSVGElement>) {
  const d = P[name] ?? P.chip;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {d.split(" M").map((seg, i) => (
        <path key={i} d={i === 0 ? seg : "M" + seg} />
      ))}
    </svg>
  );
}
