#!/usr/bin/env node
// Converts every JPG/PNG under public/images to WebP in place and deletes
// the raster original. Camera-exported JPG/PNG at near-lossless quality is
// the main reason the site's images are heavy — WebP at quality 82 looks
// the same in a browser at typically 80-90% less bytes.
//
// Usage:
//   npm run images:optimize
//
// After running, re-run `npm run gallery:build` if the gallery folder
// changed, and update any hardcoded .jpg/.jpeg/.png paths elsewhere
// (this script does NOT rewrite villa.config.js — see the one-off
// extension-rewrite performed alongside it in git history).

import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.resolve(__dirname, "..", "public", "images");
const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const QUALITY = 82;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function main() {
  let converted = 0;
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const file of walk(IMAGES_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (!RASTER_EXTENSIONS.has(ext)) continue;

    const before = statSync(file).size;
    const outPath = file.slice(0, -ext.length) + ".webp";

    await sharp(file).webp({ quality: QUALITY }).toFile(outPath);
    const after = statSync(outPath).size;

    unlinkSync(file);
    converted++;
    beforeTotal += before;
    afterTotal += after;

    console.log(
      `  ${path.relative(IMAGES_DIR, file)} -> ${path.relative(IMAGES_DIR, outPath)} ` +
        `(${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB)`
    );
  }

  console.log(
    `\nConverted ${converted} image(s): ${(beforeTotal / 1024 / 1024).toFixed(1)}MB -> ${(afterTotal / 1024 / 1024).toFixed(1)}MB`
  );
}

main();
