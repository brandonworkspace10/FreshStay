import { readFileSync, writeFileSync } from "node:fs";

const geo = JSON.parse(readFileSync(new URL("./boroughs.geojson", import.meta.url)));

const TIER = {
  Manhattan: "fast",
  Brooklyn: "fast",
  Queens: "fast",
  "The Bronx": "coverage",
  Bronx: "coverage",
  "Staten Island": "coverage",
};

// Real neighborhood coordinates [lng, lat]
const NB = {
  Manhattan: [
    ["Harlem", -73.946, 40.811],
    ["Upper West Side", -73.975, 40.787],
    ["Upper East Side", -73.96, 40.773],
    ["Midtown", -73.984, 40.754],
    ["Chelsea", -74.001, 40.746],
    ["SoHo", -74.001, 40.723],
    ["Financial District", -74.011, 40.707],
  ],
  "The Bronx": [["South Bronx", -73.918, 40.812]],
  Queens: [
    ["Astoria", -73.923, 40.764],
    ["Long Island City", -73.949, 40.745],
    ["Jackson Heights", -73.883, 40.755],
    ["Flushing", -73.833, 40.765],
    ["Forest Hills", -73.846, 40.718],
    ["Ridgewood", -73.905, 40.7],
  ],
  Brooklyn: [
    ["Greenpoint", -73.951, 40.73],
    ["Williamsburg", -73.957, 40.708],
    ["DUMBO", -73.989, 40.703],
    ["Bushwick", -73.921, 40.694],
    ["Bed-Stuy", -73.941, 40.687],
    ["Park Slope", -73.978, 40.672],
    ["Crown Heights", -73.944, 40.668],
  ],
  "Staten Island": [["St. George", -74.077, 40.644]],
};

const CENTER_LAT = (40.7 * Math.PI) / 180;
const px = (lng) => lng * Math.cos(CENTER_LAT);
const py = (lat) => lat;

// Collect bounds
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
const polysOf = (g) =>
  g.type === "Polygon" ? [g.coordinates] : g.coordinates; // array of polygons
for (const f of geo.features) {
  for (const poly of polysOf(f.geometry))
    for (const ring of poly)
      for (const [lng, lat] of ring) {
        const X = px(lng), Y = py(lat);
        if (X < minX) minX = X;
        if (X > maxX) maxX = X;
        if (Y < minY) minY = Y;
        if (Y > maxY) maxY = Y;
      }
}

const W = 600;
const PAD = 18;
const scale = (W - 2 * PAD) / (maxX - minX);
const H = Math.round((maxY - minY) * scale + 2 * PAD);
const sx = (lng) => +(PAD + (px(lng) - minX) * scale).toFixed(1);
const sy = (lat) => +(PAD + (maxY - py(lat)) * scale).toFixed(1);

function ringPath(ring) {
  let d = "";
  let prevX = null, prevY = null;
  let kept = 0;
  for (let i = 0; i < ring.length; i++) {
    const X = sx(ring[i][0]);
    const Y = sy(ring[i][1]);
    if (prevX !== null && Math.abs(X - prevX) < 0.7 && Math.abs(Y - prevY) < 0.7)
      continue; // decimate near-duplicate points
    d += (kept === 0 ? "M" : "L") + X + " " + Y;
    prevX = X;
    prevY = Y;
    kept++;
  }
  return kept > 2 ? d + "Z" : "";
}

function boroughPath(g) {
  let d = "";
  for (const poly of polysOf(g)) {
    for (const ring of poly) {
      // skip tiny rings (small islands) to reduce clutter
      let rx0 = Infinity, rx1 = -Infinity, ry0 = Infinity, ry1 = -Infinity;
      for (const [lng, lat] of ring) {
        const X = sx(lng), Y = sy(lat);
        if (X < rx0) rx0 = X;
        if (X > rx1) rx1 = X;
        if (Y < ry0) ry0 = Y;
        if (Y > ry1) ry1 = Y;
      }
      if (Math.hypot(rx1 - rx0, ry1 - ry0) < 6) continue;
      d += ringPath(ring);
    }
  }
  return d;
}

const boroughs = [];
for (const f of geo.features) {
  const name = f.properties.name;
  const d = boroughPath(f.geometry);
  // bbox center for label
  let bx0 = Infinity, bx1 = -Infinity, by0 = Infinity, by1 = -Infinity;
  for (const poly of polysOf(f.geometry))
    for (const ring of poly)
      for (const [lng, lat] of ring) {
        const X = sx(lng), Y = sy(lat);
        if (X < bx0) bx0 = X;
        if (X > bx1) bx1 = X;
        if (Y < by0) by0 = Y;
        if (Y > by1) by1 = Y;
      }
  boroughs.push({
    name,
    tier: TIER[name] ?? "coverage",
    d,
    labelX: +(((bx0 + bx1) / 2)).toFixed(1),
    labelY: +(((by0 + by1) / 2)).toFixed(1),
  });
}

const pins = [];
for (const [borough, list] of Object.entries(NB))
  for (const [name, lng, lat] of list)
    pins.push({
      name,
      borough,
      tier: TIER[borough] ?? "coverage",
      x: sx(lng),
      y: sy(lat),
    });

const out = `// AUTO-GENERATED from NYC borough boundaries (NYC Open Data via click_that_hood).
// Real geography projected to an SVG viewBox. Regenerate with scripts/gen-map.mjs.
export const MAP_WIDTH = ${W};
export const MAP_HEIGHT = ${H};

export type MapBorough = {
  name: string;
  tier: "fast" | "coverage";
  d: string;
  labelX: number;
  labelY: number;
};
export type MapPin = {
  name: string;
  borough: string;
  tier: "fast" | "coverage";
  x: number;
  y: number;
};

export const MAP_BOROUGHS: MapBorough[] = ${JSON.stringify(boroughs)};
export const MAP_PINS: MapPin[] = ${JSON.stringify(pins)};
`;

writeFileSync(
  new URL("./FreshStay/components/landing/nyc-map-data.ts", import.meta.url),
  out
);
console.log(
  `viewBox ${W}x${H} | boroughs ${boroughs.length} | pins ${pins.length} | data ${(out.length / 1024).toFixed(1)}kb`
);
