# Project images

Static photography for the site, referenced from [villa.config.js](../../src/data/villa.config.js)
as `/images/...`. Drop files in with the exact names below (`.jpg`, or update the
extension in `villa.config.js` if you use `.png`/`.webp`).

## hero/
Fallback poster shown behind the drone video before it loads (Hero.jsx).
The rotating hero background itself is video — see `/public/videos/hero/`.
- `poster.jpg`

## sections/
One image per content section, plus a scrollable photo set for each of the
three "Esperienza" blocks (Sport & Benessere, Pranzi e Cene all'Aperto,
Serate Cinematografiche) — visitors can swipe/scroll through these on the
site.
- `overview.jpg`, `location.jpg`, `cta.jpg`, `contact.jpg`
- `experience-sport-1.jpg` … `experience-sport-6.jpg`
- `experience-dining-1.jpg` … `experience-dining-6.jpg`
- `experience-cinema-1.jpg` … `experience-cinema-4.jpg`

The photo count shown on the site comes from the array length in
`villa.config.js`, not from what's on disk — add/remove files and update
that array to match (or just ask).

## gallery/
The full lightbox gallery (built for ~100+ photos). Organized as one
subfolder per category — every photo in a folder shares that category's
caption, so there's nothing to type per photo. Just sort your photos into
folders and drop them in, e.g.:

```
gallery/
  piscina/        01.jpg  02.jpg  03.jpg  ...
  giardino/       01.jpg  02.jpg  ...
  salotto/        01.jpg  ...
  suite-1/        01.jpg  02.jpg  ...
  ...
```

Recognized category folder names (edit `CATEGORY_LABELS` in
[`scripts/build-gallery.mjs`](../../scripts/build-gallery.mjs) to add more
or change the wording): `villa-esterno`, `piscina`, `giardino`, `salotto`,
`pranzo-cena`, `cucina`, `ingresso`, `dettagli`, `suite-1` … `suite-5`,
`bagni`, `sport`, `home-cinema`, `tramonto`, `vista-panorama`, `terrazza`,
`notte`. An unlisted folder name still works — it just gets a generic
caption (same text in every language) until a real translation is added.

After adding/removing photos, run:

```
npm run gallery:build
```

This regenerates the `gallery` array in `villa.config.js` automatically —
including which photos are `tall` (portrait) for the masonry layout, read
straight from each image's real pixel dimensions. No manual editing needed.

## suites/suite-1 … suite-5/
Per-suite photo sets used by Suites.jsx.
- `suite-1/`: `main.jpg`, `detail-1.jpg`, `detail-2.jpg`
- `suite-2/`: `main.jpg`, `detail-1.jpg`
- `suite-3/`: `main.jpg`, `detail-1.jpg`
- `suite-4/`: `main.jpg`, `detail-1.jpg`, `detail-2.jpg`
- `suite-5/`: `main.jpg`
