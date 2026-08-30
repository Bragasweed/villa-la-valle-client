import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Star, ExternalLink } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { VILLA } from "../../data/villa.config";

const MOBILE_BREAKPOINT_QUERY = "(max-width: 767px)";

const Hero = () => {
  const { t } = useLanguage();
  // Phones get the lighter 720p/level-3.1 encode — the original 1080p file
  // was failing to decode on phone hardware even over fast wifi, unrelated
  // to connection speed.
  const [isMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches
  );
  const videos = isMobile && VILLA.media.heroVideosMobile?.length ? VILLA.media.heroVideosMobile : VILLA.media.heroVideos;
  const heroPoster = VILLA.media.heroPoster;
  // If the video ever fails (slow connection, blocked autoplay, network
  // error) the static poster photo stays up instead of a blank background —
  // the hero must never render with nothing behind it.
  const [videoBroken, setVideoBroken] = useState(false);
  const titles = t.hero.titles || [{ line1: t.hero.titleLine1, line2: t.hero.titleLine2 }];
  // Random starting title so the hero doesn't always open on the same line,
  // then rotate on a randomized 5-10s cadence rather than a fixed tick.
  const [titleIndex, setTitleIndex] = useState(() => Math.floor(Math.random() * titles.length));

  useEffect(() => {
    if (titles.length < 2) return;
    const timer = setTimeout(() => {
      setTitleIndex((i) => (i + 1) % titles.length);
    }, 5000 + Math.random() * 5000);
    return () => clearTimeout(timer);
  }, [titleIndex, titles.length]);
  const videoRefA = useRef(null);
  const videoRefB = useRef(null);
  // slots holds which clip index is loaded into layer A / layer B; frontSlot
  // picks which layer is visible. The hidden layer always preloads the next
  // clip so swapping is a crossfade, not a reload — no lag on handoff.
  const [slots, setSlots] = useState(() => [0, videos.length > 1 ? 1 % videos.length : 0]);
  const [frontSlot, setFrontSlot] = useState(0);
  // A single clip loops natively (smooth, no JS round-trip); multiple clips
  // still rotate through `advance` below via the `ended` event.
  const singleClip = videos.length < 2;

  const advance = (endedSlot) => {
    if (videos.length < 2) {
      const ref = endedSlot === 0 ? videoRefA : videoRefB;
      if (ref.current) {
        ref.current.currentTime = 0;
        ref.current.play();
      }
      return;
    }
    const nextSlot = endedSlot === 0 ? 1 : 0;
    (nextSlot === 0 ? videoRefA : videoRefB).current?.play();
    setFrontSlot(nextSlot);
    setSlots((prev) => {
      const updated = [...prev];
      updated[endedSlot] = (prev[nextSlot] + 1) % videos.length;
      return updated;
    });
  };

  useEffect(() => {
    // React's JSX `muted` prop doesn't reliably set the live DOM property in
    // time for Safari's autoplay gate to see it (long-standing React/Safari
    // issue — the `autoplay` HTML attribute alone isn't enough). Set `muted`
    // imperatively and kick off play() ourselves for whichever layer is front.
    if (frontSlot !== 0) return;
    const v = videoRefA.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => {});
  }, [slots[0], frontSlot]);

  useEffect(() => {
    if (frontSlot !== 1) return;
    const v = videoRefB.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => {});
  }, [slots[1], frontSlot]);

  useEffect(() => {
    // iOS Low Power Mode (and some Android data-saver modes) silently block
    // <video autoplay> even when muted+playsInline — no error event fires,
    // the video just sits on its poster frame forever. A play() call made
    // directly inside a user gesture handler is exempt from that block, so
    // retry once on the visitor's first tap/scroll.
    if (videoBroken) return;
    const retryPlay = () => {
      const ref = frontSlot === 0 ? videoRefA : videoRefB;
      ref.current?.play().catch(() => {});
    };
    const events = ["touchstart", "click", "scroll"];
    events.forEach((ev) => window.addEventListener(ev, retryPlay, { once: true, passive: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, retryPlay));
  }, [frontSlot, videoBroken]);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background — rotating drone footage, crossfaded so the handoff is seamless */}
      <div className="absolute inset-0">
        {/* Static fallback photo, always present underneath — visible while the
            video loads and left showing if the video never plays */}
        <img
          src={heroPoster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <video
          ref={videoRefA}
          key={`a-${slots[0]}`}
          src={videos[slots[0]]}
          poster={heroPoster}
          autoPlay={frontSlot === 0}
          muted
          playsInline
          loop={singleClip}
          preload="auto"
          onEnded={() => advance(0)}
          onError={() => setVideoBroken(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000 ease-in-out ${
            !videoBroken && frontSlot === 0 ? "opacity-100" : "opacity-0"
          }`}
        />
        <video
          ref={videoRefB}
          key={`b-${slots[1]}`}
          src={videos[slots[1]]}
          poster={heroPoster}
          autoPlay={frontSlot === 1}
          muted
          playsInline
          loop={singleClip}
          preload="auto"
          onEnded={() => advance(1)}
          onError={() => setVideoBroken(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000 ease-in-out ${
            !videoBroken && frontSlot === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/35 to-charcoal/85" />
        <div className="absolute inset-0 bg-charcoal/5" />
        {/* Top vignette for navbar legibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal/60 to-transparent" />
      </div>

      {/* Top-left rating badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="hidden sm:flex absolute top-24 left-8 lg:left-12 z-10 items-center gap-2 text-ivory/80"
      >
        <Star size={12} className="text-champagne fill-champagne" strokeWidth={1.2} />
        <span className="text-[10px] uppercase tracking-luxury-wide">{t.hero.listing || "Airbnb"}</span>
      </motion.div>

      {/* Right-edge mini stats column */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 z-10 flex-col items-end gap-8 text-ivory/70"
      >
        {t.overview.stats.slice(0, 3).map((s, i) => (
          <div key={i} className="text-right">
            <div className="font-serif text-2xl text-ivory font-light leading-none">{s.value}</div>
            <div className="text-[9px] uppercase tracking-luxury-wide mt-1.5 text-champagne-light">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-overline text-champagne-light mb-7 flex items-center justify-center"
          data-testid="hero-eyebrow"
        >
          <span className="inline-block w-8 sm:w-12 h-px bg-champagne-light/60 align-middle mr-4" />
          {t.hero.eyebrow}
          <span className="inline-block w-8 sm:w-12 h-px bg-champagne-light/60 align-middle ml-4" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="font-serif text-ivory font-light leading-[0.95] tracking-tight"
          data-testid="hero-title"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="block"
            >
              <span className="block text-4xl sm:text-6xl lg:text-7xl xl:text-[6rem]">
                {titles[titleIndex].line1}
              </span>
              <span className="block text-4xl sm:text-6xl lg:text-7xl xl:text-[6rem] italic font-light text-champagne-light mt-1 sm:mt-2">
                {titles[titleIndex].line2}
              </span>
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="w-20 sm:w-24 h-px bg-champagne mx-auto my-8 sm:my-10 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-ivory/85 font-light text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto"
          data-testid="hero-subtitle"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="hero-cta-explore"
            className="group relative px-8 sm:px-10 py-4 border border-ivory/50 text-ivory text-[11px] uppercase tracking-luxury-wide font-medium hover:border-champagne hover:text-champagne transition-all duration-500"
          >
            {t.hero.ctaExplore}
          </button>
          <a
            href={VILLA.booking.airbnb}
            target="_blank"
            rel="noreferrer"
            data-testid="hero-cta-book"
            className="group relative inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 bg-champagne text-charcoal text-[11px] uppercase tracking-luxury-wide font-medium hover:bg-ivory transition-all duration-500"
          >
            {t.hero.ctaBook} <ExternalLink size={13} strokeWidth={1.5} />
          </a>
        </motion.div>

        {/* Hero meta hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.7 }}
          className="text-ivory/55 text-[10px] sm:text-[11px] uppercase tracking-luxury-wide mt-8"
        >
          {t.hero.hint}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-7 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-ivory/50 text-[9px] sm:text-[10px] uppercase tracking-luxury">{t.hero.scroll}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={14} className="text-champagne-light" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
