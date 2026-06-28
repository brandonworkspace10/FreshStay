import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const nyc = JSON.parse(
  readFileSync(new URL("./boroughs.geojson", import.meta.url))
);
const njFiles = readdirSync(new URL("./nj/", import.meta.url)).filter((f) =>
  f.endsWith(".json")
);

const TIER = {
  Manhattan: "fast",
  Brooklyn: "fast",
  Queens: "fast",
  "The Bronx": "coverage",
  Bronx: "coverage",
  "Staten Island": "coverage",
};

// Real NYC neighborhood coordinates [lng, lat]
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

const CENTER_LAT = (40.72 * Math.PI) / 180;
const px = (lng) => lng * Math.cos(CENTER_LAT);
const py = (lat) => lat;
const polysOf = (g) => (g.type === "Polygon" ? [g.coordinates] : g.coordinates);

// Load features
const nycFeatures = nyc.features.map((f) => ({
  name: f.properties.name,
  tier: TIER[f.properties.name] ?? "coverage",
  geom: f.geometry,
}));
const njCities = njFiles.map((file) => {
  const ft = JSON.parse(
    readFileSync(new URL("./nj/" + file, import.meta.url))
  ).features[0];
  return {
    name: ft.properties.NAME,
    geom: ft.geometry,
    lon: +ft.properties.INTPTLON,
    lat: +ft.properties.INTPTLAT,
  };
});

// Combined bounds (NYC + NJ)
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
for (const f of [...nycFeatures, ...njCities])
  for (const poly of polysOf(f.geom))
    for (const ring of poly)
      for (const [lng, lat] of ring) {
        const X = px(lng), Y = py(lat);
        if (X < minX) minX = X;
        if (X > maxX) maxX = X;
        if (Y < minY) minY = Y;
        if (Y > maxY) maxY = Y;
      }

const W = 660;
const PAD = 6;
const scale = (W - 2 * PAD) / (maxX - minX);
const H = Math.round((maxY - minY) * scale + 2 * PAD);
const sx = (lng) => +(PAD + (px(lng) - minX) * scale).toFixed(1);
const sy = (lat) => +(PAD + (maxY - py(lat)) * scale).toFixed(1);

function ringPath(ring) {
  let d = "", prevX = null, prevY = null, kept = 0;
  for (const [lng, lat] of ring) {
    const X = sx(lng), Y = sy(lat);
    if (prevX !== null && Math.abs(X - prevX) < 0.6 && Math.abs(Y - prevY) < 0.6)
      continue;
    d += (kept === 0 ? "M" : "L") + X + " " + Y;
    prevX = X;
    prevY = Y;
    kept++;
  }
  return kept > 2 ? d + "Z" : "";
}

function landPath(geom, minDiag) {
  let d = "";
  for (const poly of polysOf(geom))
    for (const ring of poly) {
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const [lng, lat] of ring) {
        const X = sx(lng), Y = sy(lat);
        if (X < x0) x0 = X;
        if (X > x1) x1 = X;
        if (Y < y0) y0 = Y;
        if (Y > y1) y1 = Y;
      }
      if (Math.hypot(x1 - x0, y1 - y0) < minDiag) continue;
      d += ringPath(ring);
    }
  return d;
}

function bboxCenter(geoms) {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const g of geoms)
    for (const poly of polysOf(g))
      for (const ring of poly)
        for (const [lng, lat] of ring) {
          const X = sx(lng), Y = sy(lat);
          if (X < x0) x0 = X;
          if (X > x1) x1 = X;
          if (Y < y0) y0 = Y;
          if (Y > y1) y1 = Y;
        }
  return [+(((x0 + x1) / 2)).toFixed(1), +(((y0 + y1) / 2)).toFixed(1)];
}

// Regions: 5 NYC boroughs + one combined New Jersey
const boroughs = [];
for (const f of nycFeatures) {
  const [labelX, labelY] = bboxCenter([f.geom]);
  boroughs.push({
    name: f.name,
    tier: f.tier,
    d: landPath(f.geom, 6),
    labelX,
    labelY,
  });
}
// New Jersey: merge all city polygons into one land
let njD = "";
for (const c of njCities) njD += landPath(c.geom, 1.5);
const [njLabelX, njLabelY] = bboxCenter(njCities.map((c) => c.geom));
boroughs.push({
  name: "New Jersey",
  tier: "coverage",
  d: njD,
  labelX: njLabelX,
  labelY: njLabelY - 26, // nudge label above the strip
});

// Pins: NYC neighborhoods + NJ cities (at interior points)
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
for (const c of njCities)
  pins.push({
    name: c.name,
    borough: "New Jersey",
    tier: "coverage",
    x: sx(c.lon),
    y: sy(c.lat),
  });

const out = `// AUTO-GENERATED from NYC borough boundaries (NYC Open Data) and nearby
// New Jersey municipal boundaries (US Census via geojson-us-city-boundaries).
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
  `viewBox ${W}x${H} | regions ${boroughs.length} | pins ${pins.length} | ${(out.length / 1024).toFixed(1)}kb`
);
