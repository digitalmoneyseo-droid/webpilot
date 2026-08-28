/*
 * Generates the Suchio wordmark SVGs (light + dark) in public/.
 *
 * Letters are real DM Sans outlines, instanced at opsz 40 / wght 500 — the cut
 * the approved mark was designed at. The lens and handle reproduce the approved
 * magnifying-glass geometry; its horizontal position is computed so the visible
 * gap to the "i" equals the visible gap between "h" and "i" (ink-to-ink).
 *
 * Font: scripts/fonts/DMSans-var.ttf — DM Sans [opsz,wght], SIL OFL 1.1
 * (see scripts/fonts/OFL.txt). Usage: bun scripts/generate-wordmark.mjs
 */
import * as fontkit from "fontkit";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Approved mark geometry, in the 240px design frame. Baseline sits at y=202.
const FONT_SIZE = 240;
const BASELINE = 202;
const LETTER_SPACING = -7.2; // -0.03em, the approved tracking
const TEXT = "suchi";

// Lens: circle r55 stroke19 centered at (cx, 140); handle on the 45° diagonal.
const LENS = { cy: 140, r: 55, stroke: 19 };
const LENS_RADIUS_OUTER = LENS.r + LENS.stroke / 2;
const HANDLE = { startDx: 38.89, endDx: 92, endDy: 92 }; // offsets from lens center

const VARIANTS = {
  light: { letters: "#171717", lens: "#0062D1", glass: "#EBF4FF" },
  dark: { letters: "#FFFFFF", lens: "#52AEFF", glass: "rgba(255,255,255,0.12)" },
};

const font = fontkit.openSync(join(root, "scripts/fonts/DMSans-var.ttf"));
const instance = font.getVariation({ opsz: 40, wght: 500 });
const scale = FONT_SIZE / font.unitsPerEm;

const run = instance.layout(TEXT);
const { glyphs, positions } = run;

// Glyph x offsets accumulate advances (kerning applied by layout), then the
// approved tracking is applied per preceding letter.
const letterSpacingUnits = LETTER_SPACING / scale;
const letterX = [];
let cursor = 0;
for (const position of positions) {
  const index = letterX.length;
  letterX.push(cursor + position.xOffset + index * letterSpacingUnits);
  cursor += position.xAdvance;
}

const boxes = glyphs.map((glyph, index) => ({
  x1: (letterX[index] + glyph.bbox.minX) * scale,
  y1: BASELINE - glyph.bbox.maxY * scale,
  x2: (letterX[index] + glyph.bbox.maxX) * scale,
  y2: BASELINE - glyph.bbox.minY * scale,
}));

// Visible gap between "h" and "i" sets the visible gap before the lens.
const gapHI = boxes[4].x1 - boxes[3].x2;
const lensCx = boxes[4].x2 + gapHI + LENS_RADIUS_OUTER;
const handleX1 = lensCx + HANDLE.startDx;
const handleY1 = LENS.cy + HANDLE.startDx;
const handleX2 = lensCx + HANDLE.endDx;
const handleY2 = LENS.cy + HANDLE.endDy;

const ink = {
  x1: Math.min(...boxes.map((box) => box.x1)),
  y1: Math.min(...boxes.map((box) => box.y1), LENS.cy - LENS_RADIUS_OUTER),
  x2: Math.max(...boxes.map((box) => box.x2), handleX2 + LENS.stroke / 2),
  y2: Math.max(...boxes.map((box) => box.y2), handleY2 + LENS.stroke / 2),
};

const padding = 6;
const view = [
  Math.floor(ink.x1 - padding),
  Math.floor(ink.y1 - padding),
  Math.ceil(ink.x2 - ink.x1 + padding * 2),
  Math.ceil(ink.y2 - ink.y1 + padding * 2),
];

const round = (value) => Number(value.toFixed(2));
const letterPaths = glyphs
  .map((glyph, index) => `    <path transform="translate(${round(letterX[index])} 0)" d="${glyph.path.toSVG()}"/>`)
  .join("\n");

for (const [name, colors] of Object.entries(VARIANTS)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view.join(" ")}" width="${view[2]}" height="${view[3]}" fill="none" role="img" aria-label="Suchio">
  <g transform="translate(0 ${BASELINE}) scale(${round(scale)} ${-round(scale)})" fill="${colors.letters}">
${letterPaths}
  </g>
  <circle cx="${round(lensCx)}" cy="${LENS.cy}" r="${LENS.r}" fill="${colors.glass}" stroke="${colors.lens}" stroke-width="${LENS.stroke}"/>
  <line x1="${round(handleX1)}" y1="${round(handleY1)}" x2="${round(handleX2)}" y2="${round(handleY2)}" stroke="${colors.lens}" stroke-width="${LENS.stroke}" stroke-linecap="round"/>
</svg>
`;
  writeFileSync(join(root, `public/suchio-logo-${name}.svg`), svg);
  console.log(`public/suchio-logo-${name}.svg — viewBox ${view.join(" ")}, gap h→i ${round(gapHI)}px`);
}
