import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { scrollToPageTop } from "../../lib/scroll";

const SCROLL_THRESHOLD = 300;

const BackToTopButton = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const updateVisibility = () => {
      frameRef.current = null;
      const shouldBeVisible = window.scrollY > SCROLL_THRESHOLD;

      if (visibleRef.current !== shouldBeVisible) {
        visibleRef.current = shouldBeVisible;
        setVisible(shouldBeVisible);
      }
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scrollToTop = () => scrollToPageTop();

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          data-testid="back-to-top"
          aria-label={t.floating.backToTop}
          className="fixed right-4 bottom-24 sm:right-6 sm:bottom-24 z-40 inline-flex items-center gap-2 rounded-full border border-ivory/40 bg-charcoal/90 px-4 py-3 text-[10px] font-medium uppercase tracking-luxury-wide text-ivory shadow-2xl shadow-charcoal/25 backdrop-blur-md transition-colors duration-300 hover:bg-champagne hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-warmwhite"
        >
          <ArrowUp size={15} strokeWidth={1.6} aria-hidden="true" />
          <span className="hidden sm:inline">{t.floating.backToTop}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
