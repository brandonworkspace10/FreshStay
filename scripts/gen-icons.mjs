import { writeFileSync } from "node:fs";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const RED = "#FF5A5F";

// Red house on transparent (favicon / icon.svg parity), with padding.
const houseSvg = (bg = "none") => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${bg}"/>
  <g transform="translate(6 6) scale(1)">
    <path fill="${RED}" d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-7-7z"/>
  </g>
</svg>`;

const pngBuf = (size, bg) =>
  sharp(Buffer.from(houseSvg(bg))).resize(size, size).png().toBuffer();

// favicon.ico: 16/32/48 on transparent
const icoPngs = await Promise.all([16, 32, 48].map((s) => pngBuf(s, "none")));
const ico = await pngToIco(icoPngs);
writeFileSync(new URL("../app/favicon.ico", import.meta.url), ico);

// apple-icon: 180 on white (iOS wants opaque)
writeFileSync(
  new URL("../app/apple-icon.png", import.meta.url),
  await pngBuf(180, "#ffffff")
);

console.log("wrote app/favicon.ico and app/apple-icon.png");
