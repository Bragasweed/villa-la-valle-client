// =============================================================================
// VILLA LA VALLE — SINGLE SOURCE OF TRUTH
// =============================================================================
// All Airbnb-derived information lives here. Edit ONLY this file to update
// contact details, pricing, amenities, images, links, etc.
// =============================================================================

// All project photography lives under /public/images and drone footage under
// /public/videos — see each folder's README for what file goes where.
const IMG = "/images";
const VID = "/videos";

export const VILLA = {
  // ---------- Identity ----------
  name: "Villa La Valle",
  shortName: "La Valle",
  tagline: {
    it: "Una villa esclusiva sulla Riviera del Circeo, nel Litorale Pontino",
    en: "An exclusive villa on the Riviera del Circeo, Italy's Litorale Pontino",
  },

  // ---------- Location ----------
  location: {
    city: "San Felice Circeo",
    region: "Lazio",
    country: { it: "Italia", en: "Italy" },
    park: "Parco Nazionale del Circeo",
    coordinates: { lat: 41.231, lng: 13.094 },
    // Centered on the street (no house number) and a moderate zoom, so the
    // area reads as "Via La Valle" without pinpointing the exact villa.
    mapEmbed: "https://www.google.com/maps?q=Via+La+Valle,+San+Felice+Circeo,+Italy&z=15&output=embed",
    nearby: {
      it: [
        { title: "Spiaggia", desc: "3 minuti in auto" },
        { title: "Lungomare Sabaudia", desc: "10 minuti — celebri tramonti" },
        { title: "Isole Pontine", desc: "Partenze giornaliere dal porto" },
        { title: "Roma Fiumicino (FCO)", desc: "1h 30m in auto" },
      ],
      en: [
        { title: "Beach", desc: "3 minutes by car" },
        { title: "Sabaudia Seafront", desc: "10 minutes — celebrated sunsets" },
        { title: "Pontine Islands", desc: "Daily departures from the port" },
        { title: "Rome Fiumicino (FCO)", desc: "1h 30m by car" },
      ],
    },
  },

  // ---------- Capacity & rooms ----------
  capacity: {
    guests: 8,
    bedrooms: 5,
    beds: 5,
    bathrooms: 4,
    gardenSqm: 5000,
    poolSizeM: "13 × 6",
    footballPitchM: "30 × 15",
  },

  // ---------- Pricing (display-only; bookings remain on Airbnb) ----------
  pricing: {
    fromNightly: { it: "Su richiesta", en: "On request" },
    currency: "€",
    minStayNights: 7,
    note: {
      it: "Soggiorni esclusivi a partire da 7 notti. Prezzi su richiesta.",
      en: "Exclusive stays from 7 nights. Pricing on request.",
    },
  },

  // ---------- Booking & contact ----------
  booking: {
    airbnb: "https://www.airbnb.it/rooms/1192886917290303378",
    instantBook: true,
    selfCheckIn: true,
  },
  contact: {
    email: "rental@villalavalle.com",
    phone: "+39 300 000 0000",
    phoneE164: "+393000000000",
    whatsapp: "+393000000000",
    whatsappDisplay: "+39 300 000 0000",
    instagram: "https://instagram.com/villalavalle",
    address: "San Felice Circeo · Lazio · Italia",
    registrationId: "IT059011C2FZUI878O",
    host: { name: "Monica", years: 4 },
  },

  // ---------- Media ----------
  media: {
    heroVideos: [`${VID}/hero/video-hero.mp4`],
    // Lighter encode (720p, Main profile, level 3.1) served to narrow
    // viewports — phones were failing to decode the original 1080p/level 4.1
    // file even on fast wifi, unrelated to bandwidth.
    heroVideosMobile: [`${VID}/hero/video-hero-mobile.mp4`],
    // Shown while the hero video loads, and permanently if it ever fails
    // (slow connection, autoplay blocked, network error) — the hero must
    // never render blank.
    heroPoster: `${IMG}/gallery/villa-esterno/01.webp`,
    sections: {
      overview: `${IMG}/sections/overview.webp`,
      cta: `${IMG}/sections/cta.webp`,
      contact: `${IMG}/sections/contact.webp`,
    },
    // Each "Esperienza" block scrolls through its own set of photos.
    // Add or remove entries here to change how many photos appear per block.
    experienceGalleries: {
      sport: [
        `${IMG}/sections/experience-sport-1.webp`,
        `${IMG}/sections/experience-sport-2.webp`,
        `${IMG}/sections/experience-sport-3.webp`,
        `${IMG}/sections/experience-sport-4.webp`,
        `${IMG}/sections/experience-sport-5.webp`,
        `${IMG}/sections/experience-sport-6.webp`,
      ],
      dining: [
        `${IMG}/sections/experience-dining-1.webp`,
        `${IMG}/sections/experience-dining-2.webp`,
        `${IMG}/sections/experience-dining-3.webp`,
        `${IMG}/sections/experience-dining-4.webp`,
        `${IMG}/sections/experience-dining-5.webp`,
        `${IMG}/sections/experience-dining-6.webp`,
      ],
      cinema: [
        `${IMG}/sections/experience-cinema-1.webp`,
        `${IMG}/sections/experience-cinema-2.webp`,
        `${IMG}/sections/experience-cinema-3.webp`,
        `${IMG}/sections/experience-cinema-4.webp`,
      ],
    },
    gallery: [
      { src: `${IMG}/gallery/villa-esterno/01.webp`, alt: { it: "La villa", en: "The villa", es: "La villa", de: "Die Villa" } },
      { src: `${IMG}/gallery/villa-esterno/02.webp`, alt: { it: "La villa", en: "The villa", es: "La villa", de: "Die Villa" } },
      { src: `${IMG}/gallery/villa-esterno/03.webp`, alt: { it: "La villa", en: "The villa", es: "La villa", de: "Die Villa" } },
      { src: `${IMG}/gallery/villa-esterno/04.webp`, alt: { it: "La villa", en: "The villa", es: "La villa", de: "Die Villa" } },
      { src: `${IMG}/gallery/vista-panorama/01.webp`, alt: { it: "Vista panoramica", en: "Panoramic view", es: "Vista panorámica", de: "Panoramablick" } },
      { src: `${IMG}/gallery/ingresso/01.webp`, alt: { it: "Ingresso", en: "Entrance", es: "Entrada", de: "Eingang" } },
      { src: `${IMG}/gallery/giardino/01.webp`, alt: { it: "Giardino sulla Costa del Circeo", en: "Garden on the Costa del Circeo", es: "Jardín en la Costa del Circeo", de: "Garten an der Costa del Circeo" } },
      { src: `${IMG}/gallery/giardino/02.webp`, alt: { it: "Giardino sulla Costa del Circeo", en: "Garden on the Costa del Circeo", es: "Jardín en la Costa del Circeo", de: "Garten an der Costa del Circeo" } },
      { src: `${IMG}/gallery/giardino/03.webp`, alt: { it: "Giardino sulla Costa del Circeo", en: "Garden on the Costa del Circeo", es: "Jardín en la Costa del Circeo", de: "Garten an der Costa del Circeo" } },
      { src: `${IMG}/gallery/giardino/04.webp`, alt: { it: "Giardino sulla Costa del Circeo", en: "Garden on the Costa del Circeo", es: "Jardín en la Costa del Circeo", de: "Garten an der Costa del Circeo" } },
      { src: `${IMG}/gallery/piscina/01.webp`, alt: { it: "Piscina ad acqua salata", en: "Saltwater pool", es: "Piscina de agua salada", de: "Salzwasserpool" } },
      { src: `${IMG}/gallery/piscina/02.webp`, alt: { it: "Piscina ad acqua salata", en: "Saltwater pool", es: "Piscina de agua salada", de: "Salzwasserpool" }, tall: true },
      { src: `${IMG}/gallery/piscina/03.webp`, alt: { it: "Piscina ad acqua salata", en: "Saltwater pool", es: "Piscina de agua salada", de: "Salzwasserpool" }, tall: true },
      { src: `${IMG}/gallery/salotto/01.webp`, alt: { it: "Salotto principale", en: "Main lounge", es: "Salón principal", de: "Hauptwohnzimmer" } },
      { src: `${IMG}/gallery/salotto/02.webp`, alt: { it: "Salotto principale", en: "Main lounge", es: "Salón principal", de: "Hauptwohnzimmer" } },
      { src: `${IMG}/gallery/salotto/03.webp`, alt: { it: "Salotto principale", en: "Main lounge", es: "Salón principal", de: "Hauptwohnzimmer" } },
      { src: `${IMG}/gallery/pranzo-cena/01.webp`, alt: { it: "Pranzo e cena all'aperto", en: "Alfresco dining", es: "Comidas al aire libre", de: "Essen im Freien" } },
      { src: `${IMG}/gallery/pranzo-cena/02.webp`, alt: { it: "Pranzo e cena all'aperto", en: "Alfresco dining", es: "Comidas al aire libre", de: "Essen im Freien" } },
      { src: `${IMG}/gallery/pranzo-cena/03.webp`, alt: { it: "Pranzo e cena all'aperto", en: "Alfresco dining", es: "Comidas al aire libre", de: "Essen im Freien" } },
      { src: `${IMG}/gallery/pranzo-cena/04.webp`, alt: { it: "Pranzo e cena all'aperto", en: "Alfresco dining", es: "Comidas al aire libre", de: "Essen im Freien" } },
      { src: `${IMG}/gallery/pranzo-cena/05.webp`, alt: { it: "Pranzo e cena all'aperto", en: "Alfresco dining", es: "Comidas al aire libre", de: "Essen im Freien" } },
      { src: `${IMG}/gallery/pranzo-cena/06.webp`, alt: { it: "Pranzo e cena all'aperto", en: "Alfresco dining", es: "Comidas al aire libre", de: "Essen im Freien" } },
      { src: `${IMG}/gallery/pranzo-cena/07.webp`, alt: { it: "Pranzo e cena all'aperto", en: "Alfresco dining", es: "Comidas al aire libre", de: "Essen im Freien" } },
      { src: `${IMG}/gallery/cucina/01.webp`, alt: { it: "Cucina", en: "Kitchen", es: "Cocina", de: "Küche" } },
      { src: `${IMG}/gallery/bagni/01.webp`, alt: { it: "Bagno", en: "Bathroom", es: "Baño", de: "Badezimmer" } },
      { src: `${IMG}/gallery/bagni/02.webp`, alt: { it: "Bagno", en: "Bathroom", es: "Baño", de: "Badezimmer" } },
      { src: `${IMG}/gallery/bagni/03.webp`, alt: { it: "Bagno", en: "Bathroom", es: "Baño", de: "Badezimmer" } },
      { src: `${IMG}/gallery/bagni/04.webp`, alt: { it: "Bagno", en: "Bathroom", es: "Baño", de: "Badezimmer" } },
      { src: `${IMG}/gallery/sport/01.webp`, alt: { it: "Area sportiva", en: "Sports area", es: "Zona deportiva", de: "Sportbereich" } },
      { src: `${IMG}/gallery/sport/02.webp`, alt: { it: "Area sportiva", en: "Sports area", es: "Zona deportiva", de: "Sportbereich" } },
      { src: `${IMG}/gallery/sport/03.webp`, alt: { it: "Area sportiva", en: "Sports area", es: "Zona deportiva", de: "Sportbereich" } },
      { src: `${IMG}/gallery/sport/04.webp`, alt: { it: "Area sportiva", en: "Sports area", es: "Zona deportiva", de: "Sportbereich" } },
      { src: `${IMG}/gallery/dettagli/01.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/02.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/03.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/04.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/05.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/06.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/07.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/08.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/09.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/10.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/11.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/12.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" }, tall: true },
      { src: `${IMG}/gallery/dettagli/13.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/dettagli/14.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" }, tall: true },
      { src: `${IMG}/gallery/dettagli/15.webp`, alt: { it: "Dettagli d'arredo", en: "Interior details", es: "Detalles interiores", de: "Einrichtungsdetails" } },
      { src: `${IMG}/gallery/notte/01.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
      { src: `${IMG}/gallery/notte/02.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
      { src: `${IMG}/gallery/notte/03.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
      { src: `${IMG}/gallery/notte/04.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
      { src: `${IMG}/gallery/notte/05.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
      { src: `${IMG}/gallery/notte/06.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
      { src: `${IMG}/gallery/notte/07.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
      { src: `${IMG}/gallery/notte/08.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
      { src: `${IMG}/gallery/notte/09.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
      { src: `${IMG}/gallery/notte/10.webp`, alt: { it: "La villa di notte", en: "The villa by night", es: "La villa de noche", de: "Die Villa bei Nacht" } },
    ],
  },

  // ---------- Suites ----------
  suites: [
    {
      img: `${IMG}/suites/suite-1/main.webp`,
      images: [
        {
          src: `${IMG}/suites/suite-1/main.webp`,
          alt: { it: "Suite I con letto matrimoniale e luce naturale", en: "Suite I with double bed and natural light" },
        },
        {
          src: `${IMG}/suites/suite-1/detail-1.webp`,
          alt: { it: "Dettaglio della Suite I con arredi chiari", en: "Suite I detail with light-toned furnishings" },
        },
        {
          src: `${IMG}/suites/suite-1/detail-2.webp`,
          alt: { it: "Vista alternativa della Suite I", en: "Alternative view of Suite I" },
        },
      ],
      name: { it: "Suite I", en: "Suite I" },
      bed: { it: "Letto matrimoniale", en: "Double bed" },
      amenities: {
        it: ["Letto matrimoniale", "Aria condizionata", "TV", "Tende oscuranti", "Armadio o spazio per abbigliamento", "Grucce", "Biancheria da letto"],
        en: ["Double bed", "Air conditioning", "TV", "Blackout curtains", "Wardrobe or clothing storage", "Hangers", "Bed linens"],
      },
    },
    {
      img: `${IMG}/suites/suite-2/main.webp`,
      images: [
        {
          src: `${IMG}/suites/suite-2/main.webp`,
          alt: { it: "Suite II con letto matrimoniale e pareti luminose", en: "Suite II with double bed and bright walls" },
        },
        {
          src: `${IMG}/suites/suite-2/detail-1.webp`,
          alt: { it: "Vista laterale della Suite II", en: "Side view of Suite II" },
        },
      ],
      name: { it: "Suite II", en: "Suite II" },
      bed: { it: "Letto matrimoniale", en: "Double bed" },
      amenities: {
        it: ["Letto matrimoniale", "Aria condizionata", "TV", "Tende oscuranti", "Biancheria da letto", "Cuscini e coperte aggiuntivi", "Grucce", "Spazio per abbigliamento"],
        en: ["Double bed", "Air conditioning", "TV", "Blackout curtains", "Bed linens", "Extra pillows and blankets", "Hangers", "Clothing storage"],
      },
    },
    {
      img: `${IMG}/suites/suite-3/main.webp`,
      images: [
        {
          src: `${IMG}/suites/suite-3/main.webp`,
          alt: { it: "Suite III con letto matrimoniale e tessuti neutri", en: "Suite III with double bed and neutral textiles" },
        },
        {
          src: `${IMG}/suites/suite-3/detail-1.webp`,
          alt: { it: "Seconda prospettiva della Suite III", en: "Second perspective of Suite III" },
        },
      ],
      name: { it: "Suite III", en: "Suite III" },
      bed: { it: "Letto matrimoniale", en: "Double bed" },
      amenities: {
        it: ["Letto matrimoniale", "Aria condizionata", "TV", "Tende oscuranti", "Biancheria da letto", "Grucce", "Spazio per abbigliamento"],
        en: ["Double bed", "Air conditioning", "TV", "Blackout curtains", "Bed linens", "Hangers", "Clothing storage"],
      },
    },
    {
      img: `${IMG}/suites/suite-4/main.webp`,
      images: [
        {
          src: `${IMG}/suites/suite-4/main.webp`,
          alt: { it: "Suite IV con letto a una piazza e mezza", en: "Suite IV with small double bed" },
        },
        {
          src: `${IMG}/suites/suite-4/detail-1.webp`,
          alt: { it: "Dettaglio arredi della Suite IV", en: "Suite IV furnishing detail" },
        },
        {
          src: `${IMG}/suites/suite-4/detail-2.webp`,
          alt: { it: "Vista alternativa della Suite IV", en: "Alternative view of Suite IV" },
        },
      ],
      name: { it: "Suite IV", en: "Suite IV" },
      bed: { it: "Letto a una piazza e mezza", en: "Small double bed" },
      amenities: {
        it: ["Letto a una piazza e mezza", "Aria condizionata", "TV", "Tende oscuranti", "Biancheria da letto", "Grucce", "Spazio per abbigliamento"],
        en: ["Small double bed", "Air conditioning", "TV", "Blackout curtains", "Bed linens", "Hangers", "Clothing storage"],
      },
    },
    {
      img: `${IMG}/suites/suite-5/main.webp`,
      images: [
        {
          src: `${IMG}/suites/suite-5/main.webp`,
          alt: { it: "Suite V con letto singolo", en: "Suite V with single bed" },
        },
      ],
      name: { it: "Suite V", en: "Suite V" },
      bed: { it: "Letto singolo", en: "Single bed" },
      amenities: {
        it: ["Letto singolo", "Aria condizionata", "TV", "Tende oscuranti", "Biancheria da letto", "Spazio per abbigliamento"],
        en: ["Single bed", "Air conditioning", "TV", "Blackout curtains", "Bed linens", "Clothing storage"],
      },
    },
  ],

  // ---------- Reviews ----------
  reviews: {
    rating: 5.0,
    items: [
      {
        author: "Alessandro & Giulia",
        origin: { it: "Milano, Italia", en: "Milan, Italy" },
        quote: {
          it: "Un luogo che non appare sulle mappe delle vacanze ordinarie. La luce, il silenzio, la piscina all'alba — un soggiorno indimenticabile.",
          en: "A place that does not appear on any map of ordinary holidays. The light, the silence, the pool at dawn — an unforgettable stay.",
        },
      },
      {
        author: "Sophie L.",
        origin: { it: "Parigi, Francia", en: "Paris, France" },
        quote: {
          it: "Siamo arrivati per una settimana e ci siamo sentiti ospiti di una tenuta privata per un'intera stagione. Impeccabile in ogni dettaglio.",
          en: "We arrived for a week and felt as though we had been guests of a private estate for an entire season. Impeccable in every detail.",
        },
      },
      {
        author: "James & Emma",
        origin: { it: "Londra, Regno Unito", en: "London, United Kingdom" },
        quote: {
          it: "L'architettura, il giardino, la vista — ogni fotografia sembrava la copertina di una rivista. Torneremo presto.",
          en: "The architecture, the garden, the view — every photograph looked like a magazine cover. We will return soon.",
        },
      },
    ],
  },
};

export default VILLA;

// Keep factual localized data available for every supported interface language.
const addLocaleFallbacks = (value) => {
  if (!value || typeof value !== "object") return;
  if (Object.prototype.hasOwnProperty.call(value, "en") && Object.prototype.hasOwnProperty.call(value, "it")) {
    if (!Object.prototype.hasOwnProperty.call(value, "de")) value.de = value.en;
    if (!Object.prototype.hasOwnProperty.call(value, "es")) value.es = value.en;
  }
  Object.values(value).forEach(addLocaleFallbacks);
};
addLocaleFallbacks(VILLA);
