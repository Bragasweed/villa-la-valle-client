import { VILLA } from "../../data/villa.config";

const locale = {
    nav: { villa: "The Villa", suites: "Suites", experience: "Experience", gallery: "Gallery", location: "Location", reviews: "Guests", contact: "Contact Us", book: "Reserve" },
    hero: {
      eyebrow: `${VILLA.location.city} · ${VILLA.location.country.en}`,
      titleLine1: "An Exclusive",
      titleLine2: "Villa Experience",
      titles: [
        { line1: "Mediterranean Villa", line2: "near Rome" },
        { line1: "An Exclusive", line2: "Villa Experience" },
        { line1: "A Prestigious Retreat", line2: "Between Sea, Nature and Privacy" },
      ],
      subtitle:
        "Five suites, a saltwater pool and a private 5.000 m² garden, set on the Riviera del Circeo — one of the most prestigious coastlines of the Litorale Pontino. A sanctuary for those who recognise true luxury in stillness, light and crystalline sea.",
      ctaExplore: "Check Availability",
      ctaBook: "Book on Airbnb",
      hint: `${VILLA.capacity.bedrooms} suites · up to ${VILLA.capacity.guests} guests · private pool`,
      scroll: "Scroll to discover",
      priceLabel: "From",
      priceValue: VILLA.pricing.fromNightly.en,
      listing: "Airbnb listing",
      priceNote: `Minimum ${VILLA.pricing.minStayNights} nights`,
    },
    overview: {
      eyebrow: "The Sanctuary",
      title: "A private estate on the Riviera del Circeo",
      body:
        "Set on the Costa del Circeo, between the protected national park and a crystalline Tyrrhenian sea, Villa La Valle commands a 360-degree view over the bay, the historic centre and the promontory. The estate has been imagined for travellers who measure refinement in silence, in the quality of the air, in the patience of well-laid stone.",
      bodyExtra:
        "Five suites, four spa-grade bathrooms, two outdoor dining pavilions and a 5.000 m² coastal garden of the Litorale Pontino — all entirely yours.",
      features: [
        { title: "Five luxury suites", desc: "Four king bedrooms and an additional suite, each with bespoke linens, climate control and panoramic windows over the Riviera del Circeo." },
        { title: "Saltwater pool 13 × 6 m", desc: "An electrolytic-saline pool with beach entry, sunken lounge and a shaded poolside bar with Wi-Fi." },
        { title: "Premium amenities", desc: "Yamaha grand piano, 75-inch OLED home cinema, ambient lighting and a professional Italian coastal kitchen." },
        { title: "Exclusive location", desc: "Three minutes from the beach, ninety from Rome — on the Costa del Circeo, one of Lazio's most prestigious coastlines." },
        { title: "Privacy & seclusion", desc: "A gated 5.000 m² coastal garden with sports facilities, fountain and complete privacy." },
      ],
      stats: [
        { value: String(VILLA.capacity.bedrooms), label: "Suites" },
        { value: String(VILLA.capacity.guests), label: "Guests" },
        { value: VILLA.capacity.poolSizeM, label: "m · Pool" },
        { value: "5.000", label: "m² · Garden" },
      ],
    },
    suites: {
      eyebrow: "The Suites",
      title: "Five rooms, one quiet luxury",
      subtitle:
        "Each suite has been composed around its own light. Bespoke linens, panoramic windows, soundproof shutters and individual climate control — so that every guest finds their own pace.",
      previousSuite: "Scroll to previous suites", nextSuite: "Scroll to next suites", previousImage: "Show previous photo of", nextImage: "Show next photo of", amenities: "Main amenities", photo: "Photo", of: "of",
    },
    experience: {
      eyebrow: "The Experience",
      title: "Rituals of an Italian summer",
      previousPhoto: "Previous photo", nextPhoto: "Next photo", photoCountLabel: "photos",
      blocks: [
        {
          title: "Sport & Wellness",
          desc:
            "A regulation 30 × 15 m football pitch, a panoramic basketball court, an open-air gym and a treatment lounge with massage bed and chromotherapy bath. Move, then surrender to stillness.",
        },
        {
          title: "Alfresco Dining",
          desc:
            "Two outdoor dining pavilions overlooking the garden, softly lit at night by the glow of the surrounding park — the perfect setting for long lunches and dinners under the stars, with the scent of the Costa del Circeo on the air.",
        },
        {
          title: "Cinematic Evenings",
          desc:
            "An interior home theatre with a 75-inch OLED screen and immersive sound system, accompanied by a Yamaha grand piano in the lower lounge. Evenings unfold slowly here.",
        },
      ],
    },
    gallery: {
      eyebrow: "Gallery",
      title: "An invitation in images",
      subtitle:
        "Every corner of Villa La Valle has been composed with the eye of an artist and the rigour of a craftsman. A curated selection below — open the full gallery for the complete portfolio.",
      cta: "See it for yourself — book on Airbnb",
      viewAll: "Explore the full gallery",
      close: "Close",
      hideThumbnails: "Hide thumbnails", showThumbnails: "Show thumbnails", previousImage: "Previous image", nextImage: "Next image", viewImage: "View image", dialogLabel: "Villa La Valle gallery",
    },
    location: {
      eyebrow: "The Coastline",
      title: "San Felice Circeo — the jewel of the Litorale Pontino",
      body:
        "Three minutes from a crystal-clear sea, ten from the celebrated sunsets of Sabaudia, ninety from Rome Fiumicino. The Pontine Islands shimmer on the horizon, while the Circeo promontory rises in the silence behind the villa — a private vantage on Italy's most prestigious coastal park.",
      mapTitle: "Villa La Valle map",
    },
    reviews: {
      eyebrow: "Guests",
      title: "Words from those who stayed",
      rating: "5/5 — across every stay",
    },
    cta: {
      eyebrow: "An Exclusive 2026 Listing",
      title: "Reserve the entire estate",
      subtitle:
        "Villa La Valle is offered exclusively as a private rental. Instant Book is enabled on Airbnb — your stay can be confirmed in minutes.",
      cta: "Book on Airbnb",
      secondary: "Or send a private enquiry",
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Begin your stay",
      subtitle:
        "For tailored stays, long-term reservations or private events, write to us directly. We respond personally — usually within hours.",
      channels: {
        whatsapp: "WhatsApp",
        email: "Email",
        phone: "Call",
        airbnb: "Book on Airbnb",
        instantBook: "Instant Book enabled",
      },
      form: {
        name: "First name",
        surname: "Last name",
        email: "Email",
        phone: "Phone",
        phoneOptional: "(optional)",
        dates: "Stay dates",
        dateFrom: "From",
        dateTo: "To",
        selectDate: "Select date",
        message: "Message",
        submit: "Send enquiry",
        sending: "Sending…",
        success: "Thank you! Your message has been sent — we'll get back to you shortly.",
        error: "Something went wrong sending your message. Please try again or write to us directly.",
        privacyPrefix: "I have read and accept the",
        privacyLink: "Privacy Policy",
      },
    },
    footer: {
      tagline: VILLA.tagline.en,
      privacy: "Privacy Policy",
      cookiePolicy: "Cookie Policy",
      cookiePreferences: "Cookie Preferences",
      terms: "Terms",
      rights: "All rights reserved.",
      lang: "Language",
      reg: "Reg.",
    },
    cookieBanner: {
      eyebrow: "Privacy & Consent",
      title: "We handle cookies with respect",
      description:
        "We use technical cookies required for the site to work and, only with your consent, analytics and marketing cookies (Google Analytics, Google Ads, Meta Pixel) to understand how the site is used and show you relevant ads. You can accept, reject or customize your choice at any time.",
      privacyPolicy: "Privacy Policy",
      cookiePolicy: "Cookie Policy",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      customize: "Customize",
      customizeTitle: "Customize cookie preferences",
      customizeDescription:
        "Choose which cookie categories to enable. Necessary cookies are always active because they are required for the site to work and do not require consent.",
      savePreferences: "Save preferences",
      alwaysActive: "Always active",
      categories: {
        necessary: {
          title: "Necessary cookies",
          description:
            "Required for the site to function: security, language and storing your cookie preferences. No consent needed.",
        },
        analytics: {
          title: "Analytics",
          description:
            "Let us measure visits and interactions in aggregate with Google Analytics, to improve the site's content and experience.",
        },
        marketing: {
          title: "Marketing",
          description:
            "Used for remarketing and campaign measurement with Google Ads and Meta Pixel, to show you more relevant ads on other sites and social media.",
        },
      },
    },
    floating: {
      book: "Book on Airbnb",
      backToTop: "Back to Top",
    },
    ui: { languageSelector: "Select language", menuToggle: "Toggle menu" },
    seo: { homeTitle: "Villa La Valle | Exclusive Villa Experience", homeDescription: "Villa La Valle: five suites, saltwater pool and private garden on the Riviera del Circeo." },
  };

export default locale;
