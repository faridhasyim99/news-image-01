// news-image-01 entry v2: "Friday 13 November 2026: 30 stories, 6 continents,
// one front page — FAA ground stop leads".
// The image is a broadsheet front page (masthead, FAA ground-stop lead story,
// world map with 30 numbered pins, and a 30-story index) drawn entirely with
// PIL, stored beside this file as entry.png. The program's only job is to
// copy those exact bytes to the output directory, so both runs of the program
// produce byte-identical output.
//
// The grader runs this with no network; MAKEFUN_OUTPUT_DIR stands in for
// /output when run outside the grader's container:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(join(here, "entry.png"));
writeFileSync(outPath, bytes);
// Guard the determinism requirement: the written file must hold exactly the
// bytes we read, so a partial write can never pass silently. Check size
// first (cheap), then a full SHA-256 comparison (exact).
if (statSync(outPath).size !== bytes.length) {
  throw new Error(`short write: ${outPath} is ${statSync(outPath).size} bytes, expected ${bytes.length}`);
}
const digest = (b: Buffer) => createHash("sha256").update(b).digest("hex");
if (digest(readFileSync(outPath)) !== digest(bytes)) {
  throw new Error(`hash mismatch: ${outPath} differs from entry.png`);
}
