import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";
import { ResilientMotionImage } from "../ui/resilient-image";

const SuiteCard = ({ suite, index, total, lang, labels }) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = suite.images?.length ? suite.images : [{ src: suite.img, alt: suite.name }];
  const hasGallery = images.length > 1;
  const currentImage = images[activeImage];

  const showPreviousImage = () => {
    setActiveImage((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const showNextImage = () => {
    setActiveImage((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <article
      className="snap-start shrink-0 w-[82vw] sm:w-[46vw] lg:w-[31%] xl:w-[29%] group"
      data-testid={`suite-card-${index}`}
    >
      <div className="bg-ivory/80 h-full">
        <div className="relative aspect-[3/4] overflow-hidden bg-charcoal/5">
          <AnimatePresence mode="wait" initial={false}>
            <ResilientMotionImage
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt?.[lang] || suite.name[lang]}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              fallbackClassName="absolute inset-0 w-full h-full bg-charcoal/10"
            />
          </AnimatePresence>
          <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/5" />
          <div className="absolute top-5 left-5 text-ivory">
            <span className="font-serif text-[10px] uppercase tracking-luxury-wide bg-charcoal/40 backdrop-blur-sm px-3 py-1.5 border border-ivory/15">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {hasGallery && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label={`${labels.previousImage} ${suite.name[lang]}`}
                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/35 text-ivory backdrop-blur-sm transition-all duration-300 hover:bg-charcoal/60 hover:border-ivory/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label={`${labels.nextImage} ${suite.name[lang]}`}
                className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/35 text-ivory backdrop-blur-sm transition-all duration-300 hover:bg-charcoal/60 hover:border-ivory/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-charcoal/35 px-3 py-2 backdrop-blur-sm">
                {images.map((image, imageIndex) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(imageIndex)}
                    aria-label={`${labels.photo} ${imageIndex + 1} ${labels.of} ${suite.name[lang]}`}
                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory ${
                      imageIndex === activeImage ? "w-6 bg-ivory" : "w-1.5 bg-ivory/55 hover:bg-ivory/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="pt-6 pr-2">
          <p className="text-[11px] uppercase tracking-luxury-wide text-champagne font-medium mb-2">
            {suite.bed[lang]}
          </p>
          <h3 className="font-serif text-3xl text-charcoal font-light">
            {suite.name[lang]}
          </h3>
          <div className="mt-5 border-t border-charcoal/10 pt-5">
            <p className="text-[11px] uppercase tracking-luxury text-charcoal/50 font-medium mb-3">
              {labels.amenities}
            </p>
            <ul className="flex flex-wrap gap-2">
              {suite.amenities[lang].map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-full border border-charcoal/10 bg-warmwhite/70 px-3 py-1.5 text-xs leading-relaxed text-charcoal-muted"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

const Suites = () => {
  const { lang, t } = useLanguage();
  const labels = t.suites;
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ canScrollLeft: false, canScrollRight: true });

  const updateScrollState = () => {
    const node = scrollRef.current;
    if (!node) return;

    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setScrollState({
      canScrollLeft: node.scrollLeft > 8,
      canScrollRight: node.scrollLeft < maxScrollLeft - 8,
    });
  };

  useLayoutEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    node.scrollLeft = 0;
    updateScrollState();
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return undefined;

    updateScrollState();
    node.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollSuites = (direction) => {
    const node = scrollRef.current;
    if (!node) return;

    node.scrollBy({
      left: direction * Math.min(node.clientWidth * 0.85, 760),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="suites"
      data-testid="suites-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-ivory overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12 lg:mb-16"
        >
          <div className="lg:col-span-7">
            <p className="text-overline text-champagne mb-5">{t.suites.eyebrow}</p>
            <h2
              data-testid="suites-title"
              className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-light leading-[1.05] text-charcoal tracking-tight"
            >
              {t.suites.title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-charcoal-muted text-base leading-[1.85] font-light">
              {t.suites.subtitle}
            </p>
            <div className="mt-8 hidden lg:flex justify-end gap-3">
              <button
                type="button"
                onClick={() => scrollSuites(-1)}
                disabled={!scrollState.canScrollLeft}
                aria-label={labels.previousSuite}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-all duration-300 hover:border-champagne hover:text-champagne disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-charcoal/15 disabled:hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollSuites(1)}
                disabled={!scrollState.canScrollRight}
                aria-label={labels.nextSuite}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-all duration-300 hover:border-champagne hover:text-champagne disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-charcoal/15 disabled:hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Horizontal-scroll suite gallery */}
        <div className="overflow-x-hidden">
          <div
            ref={scrollRef}
            className="flex gap-5 sm:gap-7 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth pb-4"
          >
            {VILLA.suites.map((suite, i) => (
              <SuiteCard
                key={suite.name.it}
                suite={suite}
                index={i}
                total={VILLA.suites.length}
                lang={lang}
                labels={labels}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suites;
