import { motion } from "framer-motion";
import { ExternalLink, Zap } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";
import { ResilientImage } from "../ui/resilient-image";

const CTABanner = () => {
  const { t } = useLanguage();

  return (
    <section
      data-testid="cta-banner"
      className="relative py-24 sm:py-32 bg-warmwhite"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
              <ResilientImage
                src={VILLA.media.sections.cta}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                fallbackClassName="absolute inset-0 w-full h-full bg-charcoal/10"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/5" />
            </div>
            <div className="lg:col-span-5 bg-charcoal text-ivory p-9 sm:p-12 lg:p-14 flex flex-col justify-center">
              <p className="text-overline text-champagne-light mb-5">{t.cta.eyebrow}</p>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] text-ivory font-light leading-[1.1]">
                {t.cta.title}
              </h3>
              <div className="w-12 h-px bg-champagne my-6" />
              <p className="text-ivory/70 text-sm sm:text-base leading-relaxed font-light">
                {t.cta.subtitle}
              </p>

              {VILLA.booking.instantBook && (
                <p className="mt-5 inline-flex items-center gap-2 text-champagne-light text-[11px] uppercase tracking-luxury-wide">
                  <Zap size={12} strokeWidth={1.5} /> {t.contact.channels.instantBook}
                </p>
              )}

              <a
                href={VILLA.booking.airbnb}
                target="_blank"
                rel="noreferrer"
                data-testid="cta-banner-book"
                className="mt-8 inline-flex items-center justify-center gap-2 self-start px-9 py-4 bg-champagne text-charcoal text-[11px] uppercase tracking-luxury-wide font-medium hover:bg-ivory transition-colors"
              >
                {t.cta.cta} <ExternalLink size={13} strokeWidth={1.5} />
              </a>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="cta-banner-enquire"
                className="mt-4 text-[11px] uppercase tracking-luxury text-ivory/60 hover:text-champagne-light transition-colors text-left gold-underline-animate self-start"
              >
                {t.cta.secondary} →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
