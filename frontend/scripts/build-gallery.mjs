#!/usr/bin/env node
// Regenerates the `gallery` array in src/data/villa.config.js from whatever
// photos sit in public/images/gallery/<category>/*.{jpg,jpeg,png,webp}.
//
// Usage:
//   npm run gallery:build
//
// How it works:
//   - Each subfolder of public/images/gallery/ is a "category" (e.g. piscina/,
//     giardino/, suite-1/). Every photo in that folder gets the same caption,
//     defined once below in CATEGORY_LABELS.
//   - Orientation (portrait vs landscape -> the `tall` masonry flag) is read
//     from the actual image's pixel dimensions, no manual tagging needed.
//   - Unrecognized folder names still work — they get a generic caption
//     derived from the folder name (same text in all 4 languages) and a
//     warning is printed so a proper translation can be added below.
//
// Just drop photos into category folders and re-run this script any time.

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, "..");
const GALLERY_DIR = path.join(FRONTEND_ROOT, "public", "images", "gallery");
const CONFIG_PATH = path.join(FRONTEND_ROOT, "src", "data", "villa.config.js");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// One caption per category, reused for every photo in that folder.
const CATEGORY_LABELS = {
  "villa-esterno": { it: "La villa", en: "The villa", es: "La villa", de: "Die Villa" },
  piscina: { it: "Piscina ad acqua salata", en: "Saltwater pool", es: "Piscina de agua salada", de: "Salzwasserpool" },
  giardino: { it: "Giardino sulla Costa del Circeo", en: "Garden on the Costa del Circeo", es: "Jardín en la Costa del Circeo", de: "Garten an der Costa del Circeo" },
  salotto: { it: "Salotto principale", en: "Main lounge", es: "Salón principal", de: "Hauptwohnzimmer" },
  "pranzo-cena": { it: "Pranzo e cena all'aperto", en: "Alfresco dining", es: "Comidas al aire libre", de: "Essen im Freien" },
  cucina: { it: "Cucina", en: "Kitchen", es: "Cocina", de: "Küche" },
  ingresso: { it: "Ingresso", en: "Entrance", es: "Entrada", de: "Eingang" },
  dettagli: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" },
  "suite-1": { it: "Suite I", en: "Suite I", es: "Suite I", de: "Suite I" },
  "suite-2": { it: "Suite II", en: "Suite II", es: "Suite II", de: "Suite II" },
  "suite-3": { it: "Suite III", en: "Suite III", es: "Suite III", de: "Suite III" },
  "suite-4": { it: "Suite IV", en: "Suite IV", es: "Suite IV", de: "Suite IV" },
  "suite-5": { it: "Suite V", en: "Suite V", es: "Suite V", de: "Suite V" },
  bagni: { it: "Bagno", en: "Bathroom", es: "Baño", de: "Badezimmer" },
  sport: { it: "Area sportiva", en: "Sports area", es: "Zona deportiva", de: "Sportbereich" },
  "home-cinema": { it: "Home cinema", en: "Home cinema", es: "Cine en casa", de: "Heimkino" },
  tramonto: { it: "Tramonto sulla Costa del Circeo", en: "Sunset on the Costa del Circeo", es: "Atardecer en la Costa del Circeo", de: "Sonnenuntergang an der Costa del Circeo" },
  "vista-panorama": { it: "Vista panoramica", en: "Panoramic view", es: "Vista panorámica", de: "Panoramablick" },
  terrazza: { it: "Terrazza", en: "Terrace", es: "Terraza", de: "Terrasse" },
  notte: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" },
};

const titleCase = (slug) =>
  slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const labelsForCategory = (slug) => {
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  const fallback = titleCase(slug);
  console.warn(`  ! Unknown category "${slug}" — using "${fallback}" for all languages. Add a real translation to CATEGORY_LABELS in scripts/build-gallery.mjs.`);
  return { it: fallback, en: fallback, es: fallback, de: fallback };
};

// Natural sort so "photo-2.jpg" comes before "photo-10.jpg".
const naturalCompare = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

function readDimensions(filePath) {
  const buf = readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".png") {
    if (buf.length >= 24 && buf.toString("ascii", 12, 16) === "IHDR") {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    return null;
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    let offset = 2;
    while (offset < buf.length) {
      if (buf[offset] !== 0xff) { offset++; continue; }
      const marker = buf[offset + 1];
      // SOF0..SOF15 markers (excluding DHT/JPG/DAC) carry the frame dimensions.
      const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSOF) {
        const height = buf.readUInt16BE(offset + 5);
        const width = buf.readUInt16BE(offset + 7);
        return { width, height };
      }
      const segmentLength = buf.readUInt16BE(offset + 2);
      offset += 2 + segmentLength;
    }
    return null;
  }

  if (ext === ".webp") {
    if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null;
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      const width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
      const height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
      return { width, height };
    }
    if (chunk === "VP8 ") {
      const width = buf.readUInt16LE(26) & 0x3fff;
      const height = buf.readUInt16LE(28) & 0x3fff;
      return { width, height };
    }
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      const width = (b & 0x3fff) + 1;
      const height = ((b >> 14) & 0x3fff) + 1;
      return { width, height };
    }
    return null;
  }

  return null;
}

// Editorial order for the gallery: an establishing exterior/panorama, then a
// walk through the grounds and the house, ending on the night mood shots.
// Categories not listed here are appended alphabetically after this list.
const CATEGORY_ORDER = [
  "villa-esterno",
  "vista-panorama",
  "ingresso",
  "giardino",
  "piscina",
  "terrazza",
  "salotto",
  "pranzo-cena",
  "cucina",
  "suite-1",
  "suite-2",
  "suite-3",
  "suite-4",
  "suite-5",
  "bagni",
  "sport",
  "home-cinema",
  "dettagli",
  "tramonto",
  "notte",
];

function collectEntries() {
  const categoryDirs = readdirSync(GALLERY_DIR)
    .filter((name) => statSync(path.join(GALLERY_DIR, name)).isDirectory())
    .sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a);
      const ib = CATEGORY_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return naturalCompare(a, b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });

  if (categoryDirs.length === 0) {
    console.warn(`No category folders found in ${GALLERY_DIR}. Create e.g. piscina/, giardino/, suite-1/ and drop photos in them.`);
  }

  const byCategory = categoryDirs.map((category) => {
    const dir = path.join(GALLERY_DIR, category);
    const files = readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort(naturalCompare);

    const labels = labelsForCategory(category);

    const entries = files.map((file) => {
      const filePath = path.join(dir, file);
      const dims = readDimensions(filePath);
      if (!dims) {
        console.warn(`  ! Could not read dimensions for ${category}/${file} — defaulting to landscape (tall: false).`);
      }
      const tall = !!dims && dims.height > dims.width;
      return {
        src: `/gallery/${category}/${file}`,
        alt: labels,
        tall,
      };
    });

    console.log(`  - ${category}: ${entries.length} photo(s)`);
    return entries;
  });

  // Categories stay grouped together, in CATEGORY_ORDER, rather than being
  // interleaved — all photos of one room/area appear as a contiguous block.
  return byCategory.flat();
}

function formatEntry(entry) {
  const alt = `{ it: ${JSON.stringify(entry.alt.it)}, en: ${JSON.stringify(entry.alt.en)}, es: ${JSON.stringify(entry.alt.es)}, de: ${JSON.stringify(entry.alt.de)} }`;
  const tallPart = entry.tall ? ", tall: true" : "";
  return `      { src: \`\${IMG}${entry.src}\`, alt: ${alt}${tallPart} },`;
}

function main() {
  console.log(`Scanning ${GALLERY_DIR} ...`);
  const entries = collectEntries();

  const arrayBody = entries.length === 0 ? "" : `${entries.map(formatEntry).join("\n")}\n`;
  const newBlock = `    gallery: [\n${arrayBody}    ],`;

  const config = readFileSync(CONFIG_PATH, "utf8");
  const galleryBlockPattern = /( {4}gallery: \[)[\s\S]*?(\n {4}\],)/;
  if (!galleryBlockPattern.test(config)) {
    throw new Error("Could not find the `gallery: [ ... ]` block in villa.config.js — aborting without writing.");
  }
  const updated = config.replace(galleryBlockPattern, newBlock);
  writeFileSync(CONFIG_PATH, updated);

  console.log(`\nDone — wrote ${entries.length} photo(s) into villa.config.js.`);
}

main();
