import type { ReactNode } from "react";
import type { PartArt as Art } from "@/content/parts";

// Hand-built line illustrations, one per part type (see research/image-credits.md).
// Ink outline, rotor-purple fill, and a red accent.

const S = { stroke: "#16121f", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const P = "#5b3fd1";
const R = "#d7261e";
const L = "#c9f23d";

const drawings: Record<Art, ReactNode> = {
  injector: (
    <>
      <rect x="44" y="14" width="32" height="22" rx="4" fill={P} {...S} />
      <path d="M50 14v-6h20v6" {...S} />
      <rect x="48" y="36" width="24" height="44" fill="#fff" {...S} />
      <path d="M48 50h24M48 64h24" {...S} />
      <path d="M52 80l4 18h8l4-18" fill={R} {...S} />
      <path d="M60 98v8M54 104l-4 8M66 104l4 8" {...S} stroke={P} />
    </>
  ),
  pump: (
    <>
      <rect x="40" y="30" width="40" height="60" rx="8" fill={P} {...S} />
      <rect x="34" y="18" width="52" height="14" rx="3" fill="#fff" {...S} />
      <path d="M48 18V8M72 18V8" {...S} />
      <path d="M48 50h24M48 62h24M48 74h24" {...S} stroke="#fff" />
      <path d="M50 90v12h20V90" fill={R} {...S} />
    </>
  ),
  can: (
    <>
      <rect x="40" y="30" width="40" height="78" rx="6" fill={P} {...S} />
      <path d="M46 30l4-10h20l4 10" fill="#fff" {...S} />
      <rect x="54" y="8" width="12" height="12" fill={R} {...S} />
      <path d="M66 14h12" {...S} />
      <rect x="46" y="52" width="28" height="30" fill="#fff" {...S} />
      <path d="M52 62h16M52 72h10" {...S} />
    </>
  ),
  sensor: (
    <>
      <path d="M30 20c20 0 20 30 30 30" {...S} />
      <rect x="54" y="42" width="24" height="16" rx="3" fill="#fff" {...S} />
      <path d="M58 58h16l-2 10H60z" fill={P} {...S} />
      <path d="M62 68v28l4 8 4-8V68" fill={R} {...S} />
      <path d="M62 80h8M62 90h8" {...S} />
    </>
  ),
  plug: (
    <>
      <rect x="52" y="8" width="16" height="14" rx="2" {...S} />
      <path d="M50 22h20v34H50z" fill="#fff" {...S} />
      <path d="M44 56h32v14H44z" fill={P} {...S} />
      <path d="M52 70h16v26H52z" {...S} />
      <path d="M52 76h16M52 84h16M52 92h16" {...S} />
      <path d="M60 96v10M60 106h10v-6" {...S} stroke={R} />
    </>
  ),
  filter: (
    <>
      <rect x="18" y="28" width="84" height="64" rx="6" fill="#fff" {...S} />
      <path d="M30 28v64M42 28v64M54 28v64M66 28v64M78 28v64M90 28v64" {...S} stroke={P} />
      <rect x="18" y="28" width="84" height="64" rx="6" {...S} />
    </>
  ),
  belt: (
    <>
      <path d="M30 60a22 22 0 0 1 22-22h28a18 18 0 0 1 0 36H52a22 22 0 0 1-22-14z" {...S} strokeWidth={10} stroke={P} />
      <path d="M30 60a22 22 0 0 1 22-22h28a18 18 0 0 1 0 36H52a22 22 0 0 1-22-14z" {...S} />
      <circle cx="50" cy="56" r="10" fill="#fff" {...S} />
      <circle cx="82" cy="56" r="7" fill={R} {...S} />
    </>
  ),
  rollers: (
    <>
      {[
        [36, 40], [60, 32], [84, 40], [36, 76], [60, 84], [84, 76],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="11" fill={i % 2 ? P : "#fff"} {...S} />
          <circle cx={x} cy={y} r="4" fill={R} {...S} strokeWidth={2} />
        </g>
      ))}
    </>
  ),
  bell: (
    <>
      <circle cx="60" cy="60" r="44" fill="#fff" {...S} />
      <circle cx="60" cy="60" r="34" fill={P} {...S} />
      <circle cx="60" cy="60" r="12" fill="#fff" {...S} />
      <circle cx="60" cy="60" r="4" fill={R} {...S} />
    </>
  ),
  pads: (
    <>
      <path d="M20 40c20-14 60-14 80 0l-6 22c-16-10-52-10-68 0z" fill={P} {...S} />
      <path d="M20 70c20-14 60-14 80 0l-6 22c-16-10-52-10-68 0z" fill="#fff" {...S} />
      <circle cx="30" cy="44" r="3" fill={R} {...S} strokeWidth={2} />
      <circle cx="30" cy="74" r="3" fill={R} {...S} strokeWidth={2} />
    </>
  ),
  bottle: (
    <>
      <path d="M40 40l8-12h24l8 12v62a6 6 0 0 1-6 6H46a6 6 0 0 1-6-6z" fill={P} {...S} />
      <rect x="50" y="12" width="20" height="16" fill={R} {...S} />
      <rect x="46" y="56" width="28" height="30" fill="#fff" {...S} />
      <path d="M52 66h16M52 76h10" {...S} />
    </>
  ),
  battery: (
    <>
      <rect x="18" y="34" width="84" height="66" rx="4" fill={P} {...S} />
      <rect x="28" y="24" width="16" height="10" fill={R} {...S} />
      <rect x="76" y="24" width="16" height="10" fill="#fff" {...S} />
      <path d="M30 56h12M36 50v12M78 56h12" {...S} stroke="#fff" />
      <path d="M58 64l-6 14h10l-6 14" {...S} stroke={L} />
    </>
  ),
  shock: (
    <>
      <circle cx="60" cy="14" r="7" fill="#fff" {...S} />
      <rect x="50" y="20" width="20" height="26" fill={P} {...S} />
      <path d="M44 48l32 6-32 6 32 6-32 6 32 6-32 6 32 6" {...S} stroke={R} />
      <rect x="54" y="46" width="12" height="52" {...S} />
      <circle cx="60" cy="106" r="7" fill="#fff" {...S} />
    </>
  ),
  piston: (
    <>
      <path d="M30 20h60v40H30z" fill={P} {...S} />
      <path d="M30 30h60M30 38h60" {...S} stroke="#fff" />
      <path d="M44 60l6 28h20l6-28" fill="#fff" {...S} />
      <circle cx="60" cy="96" r="12" fill="#fff" {...S} />
      <circle cx="60" cy="96" r="4" fill={R} {...S} />
    </>
  ),
  bulb: (
    <>
      <path d="M40 54a20 20 0 1 1 40 0c0 10-8 14-8 24H48c0-10-8-14-8-24z" fill="#fff" {...S} />
      <path d="M52 50v18M60 46v22M68 50v18" {...S} stroke={P} />
      <rect x="48" y="78" width="24" height="18" fill={P} {...S} />
      <path d="M52 96v12h16V96" fill={R} {...S} />
    </>
  ),
  regulator: (
    <>
      <rect x="22" y="30" width="76" height="60" rx="4" fill={P} {...S} />
      <path d="M32 30V20M44 30V20M56 30V20M68 30V20M80 30V20M88 30V20" {...S} />
      <rect x="40" y="46" width="40" height="28" fill="#fff" {...S} />
      <path d="M50 60h20" {...S} stroke={R} />
      <path d="M60 90v14" {...S} />
    </>
  ),
};

export function PartArt({ art, className = "" }: { art: Art; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={`size-full ${className}`} aria-hidden="true" focusable="false">
      {drawings[art]}
    </svg>
  );
}
