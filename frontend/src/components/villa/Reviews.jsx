import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";

const Reviews = () => {
  const { lang, t } = useLanguage();

  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className="relative py-24 sm:py-32 lg:py-40 bg-ivory"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <p className="text-overline text-champagne mb-5">{t.reviews.eyebrow}</p>
          <h2
            data-testid="reviews-title"
            className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-light leading-[1.05] text-charcoal tracking-tight"
          >
            {t.reviews.title}
          </h2>
          <div className="flex flex-col items-center gap-2.5 mt-7">
            <span className="text-charcoal-muted text-[11px] uppercase tracking-luxury">
              {t.reviews.rating}
            </span>
            <div className="flex items-center justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} strokeWidth={1.2} className="text-champagne fill-champagne" />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-charcoal/10">
          {VILLA.reviews.items.map((r, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="bg-ivory p-9 lg:p-11 group hover:bg-warmwhite transition-colors duration-500 flex flex-col"
              data-testid={`review-card-${i}`}
            >
              <Quote size={26} strokeWidth={1} className="text-champagne mb-7" />
              <p className="font-serif text-xl lg:text-[1.5rem] text-charcoal font-light italic leading-[1.45] flex-1">
                &ldquo;{r.quote[lang]}&rdquo;
              </p>
              <div className="mt-8 pt-6 border-t border-charcoal/10">
                <p className="text-charcoal text-xs uppercase tracking-luxury font-medium">
                  {r.author}
                </p>
                <p className="text-charcoal-muted text-xs mt-1 font-light">{r.origin[lang]}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
