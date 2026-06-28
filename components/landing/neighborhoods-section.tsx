"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Pin = { name: string; x: number; y: number };
type Borough = {
  name: string;
  tier: "fast" | "coverage";
  labelX: number;
  labelY: number;
  pins: Pin[];
};

// Stylized (not geographically exact) layout of NYC service areas.
const boroughs: Borough[] = [
  {
    name: "The Bronx",
    tier: "coverage",
    labelX: 372,
    labelY: 52,
    pins: [{ name: "South Bronx", x: 366, y: 84 }],
  },
  {
    name: "Manhattan",
    tier: "fast",
    labelX: 196,
    labelY: 150,
    pins: [
      { name: "Harlem", x: 262, y: 92 },
      { name: "Upper West Side", x: 244, y: 126 },
      { name: "Upper East Side", x: 282, y: 124 },
      { name: "Midtown", x: 258, y: 156 },
      { name: "Chelsea", x: 246, y: 182 },
      { name: "SoHo", x: 256, y: 206 },
      { name: "Financial District", x: 258, y: 232 },
    ],
  },
  {
    name: "Queens",
    tier: "fast",
    labelX: 470,
    labelY: 150,
    pins: [
      { name: "Astoria", x: 356, y: 168 },
      { name: "Long Island City", x: 332, y: 196 },
      { name: "Jackson Heights", x: 414, y: 194 },
      { name: "Flushing", x: 472, y: 186 },
      { name: "Forest Hills", x: 442, y: 240 },
      { name: "Ridgewood", x: 382, y: 250 },
    ],
  },
  {
    name: "Brooklyn",
    tier: "fast",
    labelX: 300,
    labelY: 356,
    pins: [
      { name: "Greenpoint", x: 322, y: 244 },
      { name: "Williamsburg", x: 312, y: 264 },
      { name: "DUMBO", x: 290, y: 270 },
      { name: "Bushwick", x: 352, y: 270 },
      { name: "Bed-Stuy", x: 332, y: 292 },
      { name: "Park Slope", x: 306, y: 310 },
      { name: "Crown Heights", x: 346, y: 318 },
    ],
  },
  {
    name: "Staten Island",
    tier: "coverage",
    labelX: 138,
    labelY: 348,
    pins: [{ name: "St. George", x: 150, y: 378 }],
  },
];

const FAST = "#FF5A5F";
const COVERAGE = "#13a08c";

const heatBlobs = [
  { x: 256, y: 165, r: 95, tier: "fast" as const },
  { x: 330, y: 285, r: 95, tier: "fast" as const },
  { x: 405, y: 210, r: 105, tier: "fast" as const },
  { x: 366, y: 86, r: 64, tier: "coverage" as const },
  { x: 150, y: 376, r: 58, tier: "coverage" as const },
];

const allNeighborhoods = boroughs.flatMap((b) => b.pins.map((p) => p.name));

export function NeighborhoodsSection() {
  const [active, setActive] = useState<string | null>(null);

  const activePin = boroughs
    .flatMap((b) => b.pins.map((p) => ({ ...p, tier: b.tier })))
    .find((p) => p.name === active);

  return (
    <section
      id="neighborhoods"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            We serve your neighborhood
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            FreshStay crews are based across the city—not a suburban company
            that &ldquo;sometimes comes to Brooklyn.&rdquo; Same-day turnover
            coverage in all five boroughs, with the fastest response in
            Manhattan, Brooklyn, and Queens.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <span className="flex items-center gap-2">
              <span
                className="inline-block size-3 rounded-full"
                style={{ backgroundColor: FAST }}
                aria-hidden="true"
              />
              Fastest response
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block size-3 rounded-full"
                style={{ backgroundColor: COVERAGE }}
                aria-hidden="true"
              />
              Same-day coverage
            </span>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Hover a pin to see the area—or text us your address before you sign
            up and we&apos;ll confirm coverage in minutes.
          </p>
        </div>

        <div className="surface-card overflow-hidden p-3 sm:p-4">
          <svg
            viewBox="0 0 560 440"
            className="h-auto w-full touch-none select-none"
            role="img"
            aria-label="Interactive heat map of FreshStay cleaning coverage across New York City neighborhoods"
          >
            <defs>
              <radialGradient id="heat-fast">
                <stop offset="0%" stopColor={FAST} stopOpacity="0.55" />
                <stop offset="55%" stopColor={FAST} stopOpacity="0.18" />
                <stop offset="100%" stopColor={FAST} stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heat-coverage">
                <stop offset="0%" stopColor={COVERAGE} stopOpacity="0.4" />
                <stop offset="60%" stopColor={COVERAGE} stopOpacity="0.14" />
                <stop offset="100%" stopColor={COVERAGE} stopOpacity="0" />
              </radialGradient>
              <filter id="heat-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
              <pattern
                id="grid"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M28 0H0V28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border/50"
                />
              </pattern>
            </defs>

            {/* Map base */}
            <rect width="560" height="440" rx="14" className="fill-fresh-light/40" />
            <rect width="560" height="440" rx="14" fill="url(#grid)" />

            {/* Heat zones with a gentle idle pulse */}
            <g filter="url(#heat-blur)">
              {heatBlobs.map((b, i) => (
                <motion.circle
                  key={i}
                  cx={b.x}
                  cy={b.y}
                  r={b.r}
                  fill={
                    b.tier === "fast" ? "url(#heat-fast)" : "url(#heat-coverage)"
                  }
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{
                    duration: 4 + i * 0.4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </g>

            {/* Borough labels */}
            {boroughs.map((b) => (
              <text
                key={b.name}
                x={b.labelX}
                y={b.labelY}
                textAnchor="middle"
                className="fill-foreground/70 font-display text-[13px] font-bold uppercase tracking-wide"
              >
                {b.name}
              </text>
            ))}

            {/* Neighborhood pins */}
            {boroughs.flatMap((b) =>
              b.pins.map((p) => {
                const color = b.tier === "fast" ? FAST : COVERAGE;
                const isActive = active === p.name;
                return (
                  <g
                    key={`${b.name}-${p.name}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.name}, ${b.name}`}
                    className="cursor-pointer outline-none"
                    onMouseEnter={() => setActive(p.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(p.name)}
                    onBlur={() => setActive(null)}
                  >
                    {/* Pulsing ring on hover */}
                    {isActive ? (
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r="9"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "center",
                        }}
                        initial={{ scale: 0.6, opacity: 0.6 }}
                        animate={{ scale: 2.1, opacity: 0 }}
                        transition={{
                          duration: 1.1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeOut",
                        }}
                      />
                    ) : null}
                    {/* Soft halo */}
                    <circle cx={p.x} cy={p.y} r="9" fill={color} opacity="0.18" />
                    {/* Pin core — pops bigger on hover */}
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                      }}
                      animate={{ scale: isActive ? 1.9 : 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 16 }}
                    />
                  </g>
                );
              })
            )}

            {/* Hover tooltip */}
            <AnimatePresence>
              {activePin ? (
                <motion.g
                  key={activePin.name}
                  initial={{ opacity: 0, y: 6, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                  pointerEvents="none"
                >
                  <rect
                    x={activePin.x - (activePin.name.length * 7 + 20) / 2}
                    y={activePin.y - 40}
                    width={activePin.name.length * 7 + 20}
                    height="26"
                    rx="7"
                    className="fill-foreground"
                  />
                  <text
                    x={activePin.x}
                    y={activePin.y - 22}
                    textAnchor="middle"
                    className="fill-background text-[13px] font-semibold"
                  >
                    {activePin.name}
                  </text>
                </motion.g>
              ) : null}
            </AnimatePresence>
          </svg>

          {/* Crawlable list of every covered neighborhood (local SEO) */}
          <p className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              Coverage includes:{" "}
            </span>
            {allNeighborhoods.join(" · ")} — and the rest of all five boroughs.
          </p>
        </div>
      </div>
    </section>
  );
}
