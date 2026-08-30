import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Images, LayoutGrid } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";
import { ResilientImage, ResilientMotionImage } from "../ui/resilient-image";

const PREVIEW_COUNT = 6;
const SWIPE_THRESHOLD = 50;

const Gallery = () => {
  const { lang, t } = useLanguage();
  const [lightbox, setLightbox] = useState(null);
  const [direction, setDirection] = useState(0); // -1 prev, +1 next
  const [showThumbs, setShowThumbs] = useState(true);
  const touchStart = useRef(null);
  const thumbStripRef = useRef(null);

  const gallery = VILLA.media.gallery;
  const preview = gallery.slice(0, PREVIEW_COUNT);
  const hasMore = gallery.length > PREVIEW_COUNT;

  const goTo = useCallback(
    (idx, dir) => {
      setDirection(dir);
      setLightbox(idx);
    },
    []
  );

  const next = useCallback(() => {
    setDirection(1);
    setLightbox((i) => (i < gallery.length - 1 ? i + 1 : 0));
  }, [gallery.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setLightbox((i) => (i > 0 ? i - 1 : gallery.length - 1));
  }, [gallery.length]);

  const close = useCallback(() => {
    setLightbox(null);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, prev, next, close]);

  // Scroll active thumbnail into view when it changes
  useEffect(() => {
    if (lightbox === null || !showThumbs || !thumbStripRef.current) return;
    const el = thumbStripRef.current.querySelector(`[data-thumb-index="${lightbox}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [lightbox, showThumbs]);

  const onTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    // Only treat as horizontal swipe if it's predominantly horizontal
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) prev();
      else next();
    }
    touchStart.current = null;
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.985 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.985 }),
  };

  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-ivory"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20"
        >
          <div className="lg:col-span-7">
            <p className="text-overline text-champagne mb-5">{t.gallery.eyebrow}</p>
            <h2
              data-testid="gallery-title"
              className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-light leading-[1.05] text-charcoal tracking-tight"
            >
              {t.gallery.title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-charcoal-muted text-base leading-relaxed font-light">
              {t.gallery.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Preview masonry — first 6 images only */}
        <div className="columns-1 sm:columns-2 lg:columns-3 masonry-grid">
          {preview.map((img, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => goTo(i, 0)}
              data-testid={`gallery-item-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: (i % 6) * 0.07 }}
              className="block w-full overflow-hidden group relative cursor-pointer"
            >
              <div className={`relative overflow-hidden ${img.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <ResilientImage
                  src={img.src}
                  alt={img.alt[lang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  fallbackClassName="w-full h-full bg-charcoal/10"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500 flex items-end justify-start p-6">
                  <span className="text-ivory text-[11px] uppercase tracking-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                    {img.alt[lang]}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* View-all CTA */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-12 lg:mt-14 flex flex-col items-center gap-3"
          >
            <button
              type="button"
              onClick={() => goTo(0, 0)}
              data-testid="gallery-view-all"
              className="group inline-flex items-center gap-3 px-9 py-4 border border-charcoal/30 text-charcoal text-[11px] uppercase tracking-luxury-wide font-medium hover:bg-charcoal hover:text-ivory transition-all duration-500"
            >
              <Images size={14} strokeWidth={1.4} />
              {t.gallery.viewAll}
              <span className="text-charcoal-muted group-hover:text-champagne-light transition-colors">
                {gallery.length}
              </span>
            </button>
          </motion.div>
        )}

        {/* In-gallery Airbnb CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="mt-16 lg:mt-20 relative overflow-hidden"
        >
          <div className="relative bg-charcoal text-ivory grid grid-cols-1 md:grid-cols-2 items-stretch">
            <div className="relative min-h-[220px] md:min-h-0">
              <ResilientImage
                src={VILLA.media.sections.cta}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                fallbackClassName="absolute inset-0 w-full h-full bg-charcoal/40"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 to-charcoal/80" />
            </div>
            <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <p className="text-overline text-champagne-light mb-4">
                {VILLA.pricing.note[lang]}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ivory font-light leading-tight">
                {t.gallery.cta}
              </h3>
              <a
                href={VILLA.booking.airbnb}
                target="_blank"
                rel="noreferrer"
                data-testid="gallery-cta-book"
                className="mt-8 inline-flex items-center gap-2 self-start px-8 py-4 bg-champagne text-charcoal text-[11px] uppercase tracking-luxury-wide font-medium hover:bg-champagne-light transition-colors"
              >
                {t.contact.channels.airbnb} <ExternalLink size={13} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================================
          FULLSCREEN LIGHTBOX — luxury, immersive, effortless
          ============================================================ */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col"
            data-testid="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.dialogLabel || `${VILLA.name} gallery`}
          >
            {/* Subtle radial vignette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 65%)",
              }}
            />

            {/* TOP BAR — brand · counter · controls */}
            <div className="relative z-20 flex items-center justify-between px-5 sm:px-8 lg:px-12 py-5 sm:py-6">
              <span className="font-serif text-ivory/80 text-sm sm:text-base tracking-tight">
                {VILLA.name}
              </span>
              <span
                data-testid="lightbox-counter"
                className="font-serif text-ivory text-base sm:text-lg tabular-nums"
              >
                <span className="text-champagne">
                  {String(lightbox + 1).padStart(2, "0")}
                </span>
                <span className="text-ivory/30 mx-2">/</span>
                <span className="text-ivory/55">
                  {String(gallery.length).padStart(2, "0")}
                </span>
              </span>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setShowThumbs((v) => !v)}
                  data-testid="lightbox-toggle-thumbs"
                  aria-pressed={showThumbs}
                  aria-label={showThumbs ? (t.gallery.hideThumbnails || "Hide thumbnails") : (t.gallery.showThumbnails || "Show thumbnails")}
                  className={`p-2 sm:p-2.5 transition-colors ${
                    showThumbs ? "text-champagne" : "text-ivory/70 hover:text-ivory"
                  }`}
                >
                  <LayoutGrid size={18} strokeWidth={1.4} />
                </button>
                <button
                  type="button"
                  onClick={close}
                  data-testid="lightbox-close"
                  aria-label={t.gallery.close}
                  className="p-2 sm:p-2.5 text-ivory/70 hover:text-champagne transition-colors group"
                >
                  <X size={22} strokeWidth={1.4} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* MAIN — large centered image + caption */}
            <div
              className="relative z-10 flex-1 min-h-0 flex items-center justify-center px-4 sm:px-16 lg:px-24"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Side nav arrows — fixed to image area, not overlapping thumbs */}
              <button
                type="button"
                onClick={prev}
                data-testid="lightbox-prev"
                aria-label={t.gallery.previousImage || "Previous image"}
                className="absolute left-2 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full text-ivory/80 hover:text-charcoal bg-ivory/0 hover:bg-ivory transition-all duration-500 group"
              >
                <ChevronLeft size={28} strokeWidth={1.2} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={next}
                data-testid="lightbox-next"
                aria-label={t.gallery.nextImage || "Next image"}
                className="absolute right-2 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full text-ivory/80 hover:text-charcoal bg-ivory/0 hover:bg-ivory transition-all duration-500 group"
              >
                <ChevronRight size={28} strokeWidth={1.2} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Image + caption stack */}
              <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
                <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <ResilientMotionImage
                      key={lightbox}
                      src={gallery[lightbox].src}
                      alt={gallery[lightbox].alt[lang]}
                      data-testid="lightbox-image"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      draggable={false}
                      className="max-w-full max-h-full object-contain shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
                      fallbackClassName="w-[70vw] max-w-md aspect-[4/3] bg-ivory/10"
                    />
                  </AnimatePresence>
                </div>

                {/* Caption — symmetrical vertical padding between image and thumb strip */}
                <div className="w-full py-5 sm:py-6 flex items-center justify-center">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.figcaption
                      key={`cap-${lightbox}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.45, delay: 0.05 }}
                      data-testid="lightbox-caption"
                      className="px-4 text-center text-ivory/65 text-[11px] sm:text-xs uppercase tracking-luxury-wide leading-tight"
                    >
                      {gallery[lightbox].alt[lang]}
                    </motion.figcaption>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* BOTTOM THUMBNAIL STRIP — visible by default; secondary, with edge fades */}
            <AnimatePresence>
              {showThumbs && (
                <motion.div
                  key="thumbs"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 60, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  data-testid="lightbox-thumbs"
                  className="relative z-20 shrink-0 bg-[#0a0a0a]"
                >
                  {/* Edge fades */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-10"
                    style={{
                      background:
                        "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0) 100%)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-10"
                    style={{
                      background:
                        "linear-gradient(to left, #0a0a0a 0%, rgba(10,10,10,0) 100%)",
                    }}
                  />
                  <div
                    ref={thumbStripRef}
                    className="flex gap-2 sm:gap-2.5 px-5 sm:px-8 lg:px-12 py-3 sm:py-4 overflow-x-auto hide-scrollbar"
                  >
                    {gallery.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        data-thumb-index={i}
                        onClick={() => goTo(i, i > lightbox ? 1 : -1)}
                        aria-label={`${t.gallery.viewImage || "View image"} ${i + 1}`}
                        className={`relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 overflow-hidden transition-all duration-300 ${
                          i === lightbox
                            ? "ring-1 ring-champagne opacity-100"
                            : "opacity-40 hover:opacity-90"
                        }`}
                      >
                        <ResilientImage src={img.src} alt="" className="w-full h-full object-cover" fallbackClassName="w-full h-full bg-ivory/10" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
