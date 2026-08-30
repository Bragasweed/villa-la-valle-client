import { motion } from "framer-motion";
import { BedDouble, Waves, Sparkles, MapPin, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";
import { ResilientImage } from "../ui/resilient-image";

const icons = [BedDouble, Waves, Sparkles, MapPin, ShieldCheck];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease: "easeOut" },
};

const Overview = () => {
  const { t } = useLanguage();

  return (
    <section
      id="villa"
      data-testid="overview-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-warmwhite"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <motion.div {...fadeUp} className="lg:col-span-5">
            <p className="text-overline text-champagne mb-5">{t.overview.eyebrow}</p>
            <h2
              data-testid="overview-title"
              className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-light leading-[1.05] text-charcoal tracking-tight"
            >
              {t.overview.title}
            </h2>
            <div className="luxury-divider mt-8" />
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="lg:col-span-6 lg:col-start-7">
            <p className="text-charcoal-muted text-base sm:text-lg leading-[1.9] font-light">
              {t.overview.body}
            </p>
            <p className="mt-6 text-charcoal text-sm sm:text-base font-light italic leading-relaxed">
              {t.overview.bodyExtra}
            </p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-charcoal/10">
              {t.overview.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                  data-testid={`overview-stat-${i}`}
                >
                  <div className="font-serif text-3xl sm:text-4xl text-charcoal font-light">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-luxury text-charcoal-muted mt-2">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Editorial image with floating caption */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="mt-16 lg:mt-24 relative aspect-[16/10] sm:aspect-[16/8] overflow-hidden"
        >
          <ResilientImage
            src={VILLA.media.sections.overview}
            alt={VILLA.name}
            className="w-full h-full object-cover"
            fallbackClassName="w-full h-full bg-charcoal/10"
            loading="lazy"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10" />
          <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 bg-warmwhite/95 backdrop-blur-sm px-5 py-3 sm:px-7 sm:py-4">
            <p className="text-[10px] uppercase tracking-luxury-wide text-champagne">{VILLA.location.park}</p>
            <p className="font-serif text-charcoal text-base sm:text-lg mt-1">{VILLA.location.city}, {VILLA.location.region}</p>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-charcoal/10">
            {t.overview.features.map((f, i) => {
              const Icon = icons[i] || Sparkles;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                  className="bg-warmwhite p-7 lg:p-9 group hover:bg-ivory transition-colors duration-500"
                  data-testid={`feature-card-${i}`}
                >
                  <Icon size={26} strokeWidth={1} className="text-champagne mb-7 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="font-serif text-xl lg:text-2xl text-charcoal font-light leading-tight mb-3">
                    {f.title}
                  </h3>
                  <p className="text-sm text-charcoal-muted leading-relaxed font-light">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
