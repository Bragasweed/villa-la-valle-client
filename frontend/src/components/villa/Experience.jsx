import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";
import { ResilientImage } from "../ui/resilient-image";

const galleries = [
  VILLA.media.experienceGalleries.sport,
  VILLA.media.experienceGalleries.dining,
  VILLA.media.experienceGalleries.cinema,
];

const ExperienceGallery = ({ images, alt, labels }) => {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({ canPrev: false, canNext: images.length > 1 });

  const updateScrollState = () => {
    const node = scrollRef.current;
    if (!node) return;
    setScrollState({
      canPrev: node.scrollLeft > 4,
      canNext: node.scrollLeft < node.scrollWidth - node.clientWidth - 4,
    });
  };

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

  const scrollByOne = (direction) => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth, behavior: "smooth" });
  };

  const hasMultiple = images.length > 1;

  return (
    <div className="relative group/gallery">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {images.map((src, idx) => (
          <div
            key={src}
            className="relative shrink-0 w-full aspect-[4/3] snap-start overflow-hidden"
          >
            <ResilientImage
              src={src}
              alt={`${alt} ${idx + 1}`}
              className="w-full h-full object-cover"
              fallbackClassName="w-full h-full bg-charcoal/10"
              loading="lazy"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/5" />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <>
          <div className="absolute top-4 right-4 z-10 bg-charcoal/40 backdrop-blur-sm px-3 py-1.5 border border-ivory/15 pointer-events-none">
            <span className="font-serif text-[10px] uppercase tracking-luxury-wide text-ivory">
              {String(images.length).padStart(2, "0")} {labels.photoCountLabel}
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollByOne(-1)}
            disabled={!scrollState.canPrev}
            aria-label={`${labels.previousPhoto} — ${alt}`}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/35 text-ivory backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-charcoal/60 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByOne(1)}
            disabled={!scrollState.canNext}
            aria-label={`${labels.nextPhoto} — ${alt}`}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/35 text-ivory backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-charcoal/60 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
};

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-warmwhite"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-20 lg:mb-28"
        >
          <p className="text-overline text-champagne mb-5">{t.experience.eyebrow}</p>
          <h2
            data-testid="experience-title"
            className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-light leading-[1.05] text-charcoal tracking-tight"
          >
            {t.experience.title}
          </h2>
          <div className="luxury-divider mx-auto mt-8" />
        </motion.div>

        <div className="space-y-24 lg:space-y-36">
          {t.experience.blocks.map((block, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  reverse ? "lg:[direction:rtl]" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="lg:col-span-7 lg:[direction:ltr]"
                  data-testid={`experience-image-${i}`}
                >
                  <ExperienceGallery images={galleries[i]} alt={block.title} labels={t.experience} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="lg:col-span-5 lg:[direction:ltr]"
                  data-testid={`experience-content-${i}`}
                >
                  <span className="font-serif text-champagne text-4xl sm:text-5xl font-light italic">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-light leading-tight mt-3">
                    {block.title}
                  </h3>
                  <div className="luxury-divider my-7" />
                  <p className="text-charcoal-muted text-base sm:text-lg leading-[1.9] font-light">
                    {block.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
