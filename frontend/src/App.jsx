import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import Navbar from "./components/villa/Navbar";
import Hero from "./components/villa/Hero";
import Overview from "./components/villa/Overview";
import Suites from "./components/villa/Suites";
import Experience from "./components/villa/Experience";
import Gallery from "./components/villa/Gallery";
import Location from "./components/villa/Location";
import Reviews from "./components/villa/Reviews";
import CTABanner from "./components/villa/CTABanner";
import Contacts from "./components/villa/Contacts";
import Footer from "./components/villa/Footer";
import FloatingBook from "./components/villa/FloatingBook";
import CookieBanner from "./components/villa/CookieBanner";
import ScrollToTop from "./components/villa/ScrollToTop";
import BackToTopButton from "./components/villa/BackToTopButton";
import { scrollToElementId } from "./lib/scroll";

const setHomeSeo = (seo) => {
  if (typeof document === "undefined") return;
  document.title = seo.homeTitle;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", seo.homeDescription);
};

const HomePage = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    setHomeSeo(t.seo);
  }, [t.seo]);

  useEffect(() => {
    if (!location.hash) return;

    scrollToElementId(location.hash.slice(1));
  }, [location.hash]);

  return (
    <main>
      <Hero />
      <Overview />
      <Suites />
      <Experience />
      <Gallery />
      <Location />
      <Reviews />
      <CTABanner />
      <Contacts />
    </main>
  );
};

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="App bg-warmwhite text-charcoal font-sans-luxury">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
      {isHome && <FloatingBook />}
      <BackToTopButton />
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CookieConsentProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </CookieConsentProvider>
    </LanguageProvider>
  );
}

export default App;
