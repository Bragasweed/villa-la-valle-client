# Project videos

Drone footage referenced from [villa.config.js](../../src/data/villa.config.js)
as `/videos/...`. Use `.mp4` (H.264), or update the extension in `villa.config.js`
if you use another format.

## hero/
Full-bleed background in the Hero section (Hero.jsx). Plays on loop.
- `video-hero.mp4` — single pre-edited clip (cuts + crossfades already baked in)

Add multiple clips by editing the `heroVideos` array in `villa.config.js` —
the rotation follows the array length automatically.
