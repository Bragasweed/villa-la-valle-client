// Re-export from the single villa config. Kept for backwards compatibility
// with existing imports. Edit /app/frontend/src/data/villa.config.js instead.
import { VILLA } from "./villa.config";

export const heroVideos = VILLA.media.heroVideos;
export const galleryImages = VILLA.media.gallery.map((g) => ({
  src: g.src,
  alt: g.alt.en,
  altIt: g.alt.it,
  tall: !!g.tall,
}));
export const sectionImages = VILLA.media.sections;
