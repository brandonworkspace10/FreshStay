"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import {
  MAP_BOROUGHS,
  MAP_HEIGHT,
  MAP_PINS,
  MAP_WIDTH,
} from "@/components/landing/nyc-map-data";

const FAST = "#FF5A5F";
const COVERAGE = "#13a08c";
const color = (tier: "fast" | "coverage") => (tier === "fast" ? FAST : COVERAGE);

const allNeighborhoods = MAP_PINS.map((p) => p.name);

export function NeighborhoodsSection() {
  const [active, setActive] = useState<string | null>(null);
  const [hoverBorough, setHoverBorough] = useState<string | null>(null);
  const activePin = MAP_PINS.find((p) => p.name === active);
  const activeBorough = hoverBorough ?? activePin?.borough ?? null;
  const tipAbove = activePin ? activePin.y > 44 : true;

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
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="h-auto w-full touch-none select-none"
            role="img"
            aria-label="Map of FreshStay cleaning coverage across the five boroughs of New York City"
          >
            <defs>
              <filter id="heat-blur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            {/* Water */}
            <rect
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              rx="14"
              className="fill-fresh-light/40"
            />

            {/* Heat glow under the fastest-response boroughs */}
            <g filter="url(#heat-blur)">
              {MAP_BOROUGHS.filter((b) => b.tier === "fast").map((b) => (
                <path key={`glow-${b.name}`} d={b.d} fill={FAST} opacity="0.22" />
              ))}
            </g>

            {/* Borough land — tints on hover */}
            {MAP_BOROUGHS.map((b) => {
              const isActive = activeBorough === b.name;
              const baseOpacity = b.tier === "fast" ? 0.2 : 0.16;
              return (
                <motion.path
                  key={b.name}
                  d={b.d}
                  fill={color(b.tier)}
                  stroke={isActive ? color(b.tier) : "#ffffff"}
                  strokeLinejoin="round"
                  className="cursor-pointer"
                  animate={{
                    fillOpacity: isActive ? 0.5 : baseOpacity,
                    strokeWidth: isActive ? 2.4 : 1.4,
                  }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoverBorough(b.name)}
                  onMouseLeave={() =>
                    setHoverBorough((cur) => (cur === b.name ? null : cur))
                  }
                />
              );
            })}

            {/* Borough labels */}
            {MAP_BOROUGHS.map((b) => (
              <text
                key={`label-${b.name}`}
                x={b.labelX}
                y={b.labelY}
                textAnchor="middle"
                className="fill-foreground/75 font-display text-[13px] font-bold uppercase tracking-wide"
                style={{ paintOrder: "stroke", stroke: "#ffffff", strokeWidth: 3 }}
              >
                {b.name}
              </text>
            ))}

            {/* Neighborhood pins */}
            {MAP_PINS.map((p) => {
              const c = color(p.tier);
              const isActive = active === p.name;
              return (
                <g
                  key={p.name}
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.name}, ${p.borough}`}
                  className="cursor-pointer outline-none"
                  onMouseEnter={() => setActive(p.name)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(p.name)}
                  onBlur={() => setActive(null)}
                >
                  {isActive ? (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r="7"
                      fill="none"
                      stroke={c}
                      strokeWidth="2"
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      initial={{ scale: 0.6, opacity: 0.6 }}
                      animate={{ scale: 2.3, opacity: 0 }}
                      transition={{
                        duration: 1.1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeOut",
                      }}
                    />
                  ) : null}
                  <circle cx={p.x} cy={p.y} r="7" fill={c} opacity="0.18" />
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r="3.6"
                    fill={c}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    animate={{ scale: isActive ? 1.9 : 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 16 }}
                  />
                </g>
              );
            })}

            {/* Hover tooltip */}
            <AnimatePresence>
              {activePin ? (
                <motion.g
                  key={activePin.name}
                  initial={{ opacity: 0, y: tipAbove ? 6 : -6, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  pointerEvents="none"
                >
                  <rect
                    x={activePin.x - (activePin.name.length * 7 + 20) / 2}
                    y={tipAbove ? activePin.y - 38 : activePin.y + 14}
                    width={activePin.name.length * 7 + 20}
                    height="26"
                    rx="7"
                    className="fill-foreground"
                  />
                  <text
                    x={activePin.x}
                    y={tipAbove ? activePin.y - 20 : activePin.y + 32}
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
