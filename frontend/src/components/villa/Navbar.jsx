import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Menu, X, ExternalLink } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";
import Logo from "./Logo";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Navbar = () => {
  const { lang, setLang, supportedLanguages, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);
  const solidNav = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(!isHome || window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const navItems = [
    { id: "villa", label: t.nav.villa },
    { id: "suites", label: t.nav.suites },
    { id: "experience", label: t.nav.experience },
    { id: "gallery", label: t.nav.gallery },
    { id: "location", label: t.nav.location },
    { id: "reviews", label: t.nav.reviews },
    { id: "contact", label: t.nav.contact },
  ];

  const handleNav = (id) => {
    setMobileOpen(false);

    if (!isHome) {
      window.location.assign(`/#${id}`);
      return;
    }

    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      data-testid="main-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solidNav
          ? "bg-warmwhite/90 backdrop-blur-xl border-b border-charcoal/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        <button
          onClick={() => handleNav("hero")}
          data-testid="nav-logo"
          aria-label={VILLA.name}
          className={`text-left leading-none transition-colors shrink-0 ${
            solidNav ? "text-forest" : "text-ivory"
          }`}
        >
          <Logo className="h-9 sm:h-11 w-auto" aria-hidden="true" />
        </button>

        <nav className="hidden xl:flex items-center gap-9">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              data-testid={`nav-link-${item.id}`}
              className={`text-[12px] uppercase tracking-luxury font-light gold-underline-animate transition-colors ${
                solidNav ? "text-charcoal hover:text-champagne" : "text-ivory hover:text-champagne-light"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <label className="relative">
            <span className="sr-only">{t.ui.languageSelector}</span>
            <select
              value={lang}
              onChange={(event) => setLang(event.target.value)}
              data-testid="lang-selector"
              aria-label={t.ui.languageSelector}
              className={`appearance-none cursor-pointer border bg-transparent pl-3 pr-8 py-1.5 text-[11px] uppercase tracking-luxury-wide font-medium transition-all ${
                solidNav
                  ? "border-forest/30 text-forest hover:border-champagne"
                  : "border-ivory/30 text-ivory hover:border-champagne-light"
              }`}
            >
              {supportedLanguages.map((code) => (
                <option key={code} value={code} className="bg-warmwhite text-charcoal">
                  {code.toUpperCase()}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px]">▾</span>
          </label>

          <a
            href={VILLA.booking.airbnb}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-cta-book"
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2 text-[11px] uppercase tracking-luxury-wide font-medium transition-all duration-500 ${
              solidNav
                ? "bg-charcoal text-ivory hover:bg-champagne hover:text-charcoal"
                : "bg-champagne text-charcoal hover:bg-ivory"
            }`}
          >
            {t.nav.book} <ExternalLink size={12} strokeWidth={1.5} />
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            aria-label={t.ui.menuToggle}
            className={`xl:hidden p-2 ${solidNav ? "text-forest" : "text-ivory"}`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            data-testid="mobile-menu"
            className="xl:hidden bg-warmwhite border-t border-charcoal/5 overflow-hidden"
          >
            <nav className="flex flex-col px-7 py-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  data-testid={`mobile-nav-${item.id}`}
                  className="text-left text-charcoal text-sm uppercase tracking-luxury hover:text-champagne transition-colors py-1"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={VILLA.booking.airbnb}
                target="_blank"
                rel="noreferrer"
                data-testid="mobile-nav-book"
                className="mt-3 inline-flex items-center justify-center gap-2 bg-champagne text-charcoal text-[11px] uppercase tracking-luxury-wide font-medium py-3"
              >
                {t.nav.book} <ExternalLink size={12} strokeWidth={1.5} />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
