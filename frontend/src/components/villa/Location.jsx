import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";

const Location = () => {
  const { lang, t } = useLanguage();

  return (
    <section
      id="location"
      data-testid="location-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-charcoal text-ivory overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5"
          >
            <p className="text-overline text-champagne-light mb-5">{t.location.eyebrow}</p>
            <h2
              data-testid="location-title"
              className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.05] text-ivory tracking-tight"
            >
              {t.location.title}
            </h2>
            <div className="w-14 h-px bg-champagne mt-8 mb-8" />
            <p className="text-ivory/70 text-base sm:text-lg leading-[1.9] font-light">
              {t.location.body}
            </p>

            <div className="mt-10 space-y-5">
              {VILLA.location.nearby[lang].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                  className="flex items-start gap-4 pb-5 border-b border-ivory/10"
                  data-testid={`location-highlight-${i}`}
                >
                  <MapPin size={16} strokeWidth={1} className="text-champagne mt-1 shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-serif text-lg text-ivory font-light">{h.title}</h4>
                    <p className="text-ivory/55 text-sm mt-1 font-light">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden border border-ivory/10">
              <iframe
                title={t.location.mapTitle || `${VILLA.name} map`}
                src={VILLA.location.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.55) contrast(0.95) brightness(0.85)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="location-map"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-champagne/20 pointer-events-none" />
            </div>
            <p className="text-center text-ivory/40 text-[10px] uppercase tracking-luxury mt-5">
              {VILLA.location.city} · {VILLA.location.park}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
