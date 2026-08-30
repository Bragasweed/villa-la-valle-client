import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";

/**
 * Floating "Book on Airbnb" pill that appears after the hero is scrolled past
 * and stays visible until the contact section comes into view.
 */
const FloatingBook = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const contactTop = contact ? contact.getBoundingClientRect().top : Infinity;
      // Show after scrolling past the hero, hide when contact section is visible
      setVisible(heroBottom < 80 && contactTop > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          href={VILLA.booking.airbnb}
          target="_blank"
          rel="noreferrer"
          data-testid="floating-book"
          className="fixed z-40 bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:bottom-6 sm:translate-x-0 inline-flex items-center gap-2 px-6 py-3.5 bg-charcoal text-ivory text-[11px] uppercase tracking-luxury-wide font-medium shadow-2xl shadow-charcoal/30 hover:bg-champagne hover:text-charcoal transition-colors duration-500"
        >
          {t.floating.book} <ExternalLink size={13} strokeWidth={1.5} />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingBook;
