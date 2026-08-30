import { VILLA } from "../../data/villa.config";

const locale = {
    nav: { villa: "La Villa", suites: "Suite", experience: "Esperienza", gallery: "Galleria", location: "Posizione", reviews: "Ospiti", contact: "Contattaci", book: "Prenota" },
    hero: {
      eyebrow: `${VILLA.location.city} · ${VILLA.location.country.it}`,
      titleLine1: "Un'esperienza esclusiva",
      titleLine2: "in villa di lusso",
      titles: [
        { line1: "Villa mediterranea", line2: "vicino Roma" },
        { line1: "Un'esperienza esclusiva", line2: "in villa di lusso" },
        { line1: "Un rifugio di prestigio", line2: "tra mare, natura e privacy" },
      ],
      subtitle:
        "Cinque suite, una piscina ad acqua salata e un giardino privato di 5.000 m², sulla Riviera del Circeo — uno dei tratti più prestigiosi del Litorale Pontino. Un rifugio per chi riconosce il vero lusso nella quiete, nella luce e nel mare cristallino.",
      ctaExplore: "Verifica Disponibilità",
      ctaBook: "Prenota su Airbnb",
      hint: `${VILLA.capacity.bedrooms} suite · fino a ${VILLA.capacity.guests} ospiti · piscina privata`,
      scroll: "Scorri per scoprire",
      priceLabel: "Da",
      priceValue: VILLA.pricing.fromNightly.it,
      listing: "Annuncio Airbnb",
      priceNote: `Minimo ${VILLA.pricing.minStayNights} notti`,
    },
    overview: {
      eyebrow: "Il Rifugio",
      title: "Una tenuta privata nel cuore della Riviera del Circeo",
      body:
        "Sulla Costa del Circeo, fra il parco nazionale protetto e un mare cristallino del Tirreno, Villa La Valle gode di una vista a 360 gradi sulla baia, sul centro storico e sul promontorio. Una dimora pensata per chi misura la raffinatezza nel silenzio, nella qualità dell'aria, nella pazienza della pietra ben posata.",
      bodyExtra:
        "Cinque suite, quattro bagni con funzioni spa, due pergole esterne e un giardino di 5.000 m² sulla Costa del Circeo — interamente vostri.",
      features: [
        { title: "Cinque suite di lusso", desc: "Quattro camere king e una suite ulteriore, con biancheria su misura, climatizzazione e ampie finestre panoramiche sulla Riviera del Circeo." },
        { title: "Piscina ad acqua salata 13 × 6 m", desc: "Piscina con elettrolisi del sale, ingresso a spiaggia, lounge a sfioro e bar bordo piscina ombreggiato con Wi-Fi." },
        { title: "Dotazioni premium", desc: "Pianoforte Yamaha, home cinema OLED 75'', illuminazione ambient e cucina italiana di costa professionale." },
        { title: "Posizione esclusiva", desc: "Tre minuti dalla spiaggia, novanta da Roma — sulla Costa del Circeo, fra i tratti più prestigiosi del litorale laziale." },
        { title: "Privacy assoluta", desc: "Giardino recintato di 5.000 m² sulla Costa del Circeo, con impianti sportivi, fontana e totale riservatezza." },
      ],
      stats: [
        { value: String(VILLA.capacity.bedrooms), label: "Suite" },
        { value: String(VILLA.capacity.guests), label: "Ospiti" },
        { value: VILLA.capacity.poolSizeM, label: "m · Piscina" },
        { value: "5.000", label: "m² · Giardino" },
      ],
    },
    suites: {
      eyebrow: "Le Suite",
      title: "Cinque stanze, un solo lusso silenzioso",
      subtitle:
        "Ogni suite è stata composta intorno alla propria luce. Biancheria su misura, finestre panoramiche, persiane fonoassorbenti e climatizzazione individuale — perché ogni ospite trovi il proprio ritmo.",
      previousSuite: "Scorri alle suite precedenti", nextSuite: "Scorri alle suite successive", previousImage: "Mostra la foto precedente di", nextImage: "Mostra la foto successiva di", amenities: "Dotazioni principali", photo: "Foto", of: "di",
    },
    experience: {
      eyebrow: "L'Esperienza",
      title: "Riti di un'estate italiana",
      previousPhoto: "Foto precedente", nextPhoto: "Foto successiva", photoCountLabel: "foto",
      blocks: [
        {
          title: "Sport & Benessere",
          desc:
            "Un campo da calcio regolamentare 30 × 15 m, basket panoramico, palestra all'aperto e zona benessere con lettino massaggi e cromoterapia. Muoversi, e poi abbandonarsi alla quiete.",
        },
        {
          title: "Pranzi e Cene all'Aperto",
          desc:
            "Due pergole esterne affacciate sul giardino, illuminate di notte dalla luce soffusa del parco: lo spazio ideale per pranzi lenti e cene sotto le stelle, con il profumo della Costa del Circeo nell'aria.",
        },
        {
          title: "Serate Cinematografiche",
          desc:
            "Home theatre interno con schermo OLED 75'' e impianto sonoro immersivo, accompagnato dal pianoforte Yamaha nella lounge inferiore. Le sere, qui, scorrono lente.",
        },
      ],
    },
    gallery: {
      eyebrow: "Galleria",
      title: "Un invito per immagini",
      subtitle:
        "Ogni angolo di Villa La Valle è stato composto con l'occhio dell'artista e il rigore dell'artigiano. Una selezione curata qui sotto — apri la galleria completa per il portfolio integrale.",
      cta: "Vivila di persona — prenota su Airbnb",
      viewAll: "Esplora la galleria completa",
      close: "Chiudi",
      hideThumbnails: "Nascondi miniature", showThumbnails: "Mostra miniature", previousImage: "Immagine precedente", nextImage: "Immagine successiva", viewImage: "Visualizza immagine", dialogLabel: "Galleria di Villa La Valle",
    },
    location: {
      eyebrow: "Il Litorale",
      title: "San Felice Circeo — il gioiello del Litorale Pontino",
      body:
        "Tre minuti da un mare cristallino, dieci dai celebri tramonti di Sabaudia, novanta da Roma Fiumicino. Le Isole Pontine luccicano all'orizzonte, mentre il promontorio del Circeo si erge nel silenzio dietro la villa — un punto di vista privato su uno dei tratti costieri più prestigiosi d'Italia.",
      mapTitle: "Mappa di Villa La Valle",
    },
    reviews: {
      eyebrow: "Ospiti",
      title: "Le parole di chi ha soggiornato",
      rating: "5/5 — ad ogni soggiorno",
    },
    cta: {
      eyebrow: "Esclusiva 2026",
      title: "Riserva l'intera tenuta",
      subtitle:
        "Villa La Valle è offerta esclusivamente come affitto privato. La Prenotazione Immediata è attiva su Airbnb — il tuo soggiorno può essere confermato in pochi minuti.",
      cta: "Prenota su Airbnb",
      secondary: "Oppure invia una richiesta privata",
    },
    contact: {
      eyebrow: "Contattaci",
      title: "Inizia il tuo soggiorno",
      subtitle:
        "Per soggiorni su misura, prenotazioni di lunga durata o eventi privati, scrivici direttamente. Rispondiamo personalmente — di solito in poche ore.",
      channels: {
        whatsapp: "WhatsApp",
        email: "Email",
        phone: "Chiama",
        airbnb: "Prenota su Airbnb",
        instantBook: "Prenotazione Immediata attiva",
      },
      form: {
        name: "Nome",
        surname: "Cognome",
        email: "Email",
        phone: "Telefono",
        phoneOptional: "(opzionale)",
        dates: "Date del soggiorno",
        dateFrom: "Dal",
        dateTo: "Al",
        selectDate: "Seleziona data",
        message: "Messaggio",
        submit: "Invia richiesta",
        sending: "Invio in corso…",
        success: "Grazie! Il tuo messaggio è stato inviato — ti risponderemo al più presto.",
        error: "Si è verificato un errore nell'invio. Riprova oppure scrivici direttamente.",
        privacyPrefix: "Ho letto e accetto la",
        privacyLink: "Privacy Policy",
      },
    },
    footer: {
      tagline: VILLA.tagline.it,
      privacy: "Privacy Policy",
      cookiePolicy: "Cookie Policy",
      cookiePreferences: "Preferenze Cookie",
      terms: "Termini",
      rights: "Tutti i diritti riservati.",
      lang: "Lingua",
      reg: "Reg.",
    },
    cookieBanner: {
      eyebrow: "Privacy & Consenso",
      title: "Gestiamo i cookie con rispetto",
      description:
        "Usiamo cookie tecnici necessari al funzionamento del sito e, solo con il tuo consenso, cookie di analisi e marketing (Google Analytics, Google Ads, Meta Pixel) per capire come viene usato il sito e mostrarti annunci pertinenti. Puoi accettare, rifiutare o personalizzare la tua scelta in ogni momento.",
      privacyPolicy: "Privacy Policy",
      cookiePolicy: "Cookie Policy",
      acceptAll: "Accetta tutti",
      rejectAll: "Rifiuta tutti",
      customize: "Personalizza",
      customizeTitle: "Personalizza le preferenze cookie",
      customizeDescription:
        "Scegli quali categorie di cookie attivare. I cookie necessari sono sempre attivi perché indispensabili al funzionamento del sito e non richiedono consenso.",
      savePreferences: "Salva preferenze",
      alwaysActive: "Sempre attivo",
      categories: {
        necessary: {
          title: "Cookie necessari",
          description:
            "Indispensabili per il funzionamento del sito: sicurezza, lingua e memorizzazione delle preferenze cookie. Non richiedono consenso.",
        },
        analytics: {
          title: "Analytics",
          description:
            "Ci permettono di misurare in forma aggregata visite e interazioni con Google Analytics, per migliorare contenuti ed esperienza del sito.",
        },
        marketing: {
          title: "Marketing",
          description:
            "Usati per il remarketing e la misurazione delle campagne con Google Ads e Meta Pixel, per mostrarti annunci più pertinenti su altri siti e social.",
        },
      },
    },
    floating: {
      book: "Prenota su Airbnb",
      backToTop: "Torna su",
    },
    ui: { languageSelector: "Seleziona lingua", menuToggle: "Apri o chiudi il menu" },
    seo: { homeTitle: "Villa La Valle | Esperienza esclusiva in villa", homeDescription: "Villa La Valle: cinque suite, piscina ad acqua salata e giardino privato sulla Riviera del Circeo." },
  };

export default locale;
