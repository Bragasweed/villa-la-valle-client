import { VILLA } from "../../data/villa.config";

const locale = {
  nav: { villa: "Die Villa", suites: "Suiten", experience: "Erlebnis", gallery: "Galerie", location: "Lage", reviews: "Gäste", contact: "Kontakt", book: "Reservieren" },
  hero: { eyebrow: `${VILLA.location.city} · Italien`, titleLine1: "Ein exklusives", titleLine2: "Villa-Erlebnis", titles: [
    { line1: "Mediterrane Villa", line2: "nahe Rom" },
    { line1: "Ein exklusives", line2: "Villa-Erlebnis" },
    { line1: "Ein prestigeträchtiger Rückzugsort", line2: "zwischen Meer, Natur und Privatsphäre" },
  ], subtitle: "Fünf Suiten, ein Salzwasserpool und ein privater, 5.000 m² großer Garten an der Riviera del Circeo – einer der exklusivsten Küsten des Litorale Pontino. Ein Rückzugsort für alle, die wahren Luxus in Ruhe, Licht und kristallklarem Meer erkennen.", ctaExplore: "Verfügbarkeit prüfen", ctaBook: "Auf Airbnb buchen", hint: `${VILLA.capacity.bedrooms} Suiten · bis zu ${VILLA.capacity.guests} Gäste · privater Pool`, scroll: "Zum Entdecken scrollen", priceLabel: "Ab", priceValue: "Auf Anfrage", priceNote: `Mindestens ${VILLA.pricing.minStayNights} Nächte`, listing: "Airbnb-Inserat" },
  overview: { eyebrow: "Das Refugium", title: "Ein privates Anwesen an der Riviera del Circeo", body: "An der Costa del Circeo, zwischen dem geschützten Nationalpark und dem kristallklaren Tyrrhenischen Meer, bietet Villa La Valle einen 360-Grad-Blick über die Bucht, die Altstadt und das Vorgebirge. Das Anwesen ist für Reisende geschaffen, die Eleganz an der Stille, der Luft und der Beständigkeit sorgfältig gesetzten Steins messen.", bodyExtra: "Fünf Suiten, vier Bäder mit Spa-Komfort, zwei Esspavillons im Freien und ein 5.000 m² großer Küstengarten – ganz für Sie allein.", features: [
    { title: "Fünf luxuriöse Suiten", desc: "Vier Schlafzimmer mit Kingsize-Bett und eine weitere Suite, jeweils mit maßgefertigter Bettwäsche, Klimatisierung und Panoramafenstern." },
    { title: "Salzwasserpool 13 × 6 m", desc: "Pool mit Salzelektrolyse, flachem Einstieg, versenkter Lounge und schattiger Poolbar mit WLAN." },
    { title: "Erstklassige Ausstattung", desc: "Yamaha-Flügel, 75-Zoll-OLED-Heimkino, stimmungsvolle Beleuchtung und professionelle italienische Küche." },
    { title: "Exklusive Lage", desc: "Drei Minuten zum Strand, neunzig nach Rom – an einer der renommiertesten Küsten Latiums." },
    { title: "Privatsphäre & Ruhe", desc: "Ein umzäunter 5.000 m² großer Garten mit Sportanlagen, Brunnen und vollkommener Privatsphäre." },
  ], stats: [{ value: String(VILLA.capacity.bedrooms), label: "Suiten" }, { value: String(VILLA.capacity.guests), label: "Gäste" }, { value: VILLA.capacity.poolSizeM, label: "m · Pool" }, { value: "5.000", label: "m² · Garten" }] },
  suites: { eyebrow: "Die Suiten", title: "Fünf Zimmer, ein stiller Luxus", subtitle: "Jede Suite wurde um ihr eigenes Licht gestaltet. Maßgefertigte Bettwäsche, Panoramafenster, schallisolierende Läden und individuelle Klimatisierung – damit jeder Gast seinen eigenen Rhythmus findet.", previousSuite: "Zu den vorherigen Suiten", nextSuite: "Zu den nächsten Suiten", previousImage: "Vorheriges Foto von", nextImage: "Nächstes Foto von", amenities: "Wichtigste Ausstattung", photo: "Foto", of: "von" },
  experience: { eyebrow: "Das Erlebnis", title: "Rituale eines italienischen Sommers", previousPhoto: "Vorheriges Foto", nextPhoto: "Nächstes Foto", photoCountLabel: "Fotos", blocks: [{ title: "Sport & Wellness", desc: "Ein 30 × 15 m großes Fußballfeld, ein Basketballplatz mit Panoramablick, ein Outdoor-Fitnessbereich und ein Behandlungsraum mit Massageliege und Chromotherapie-Bad. Bewegung – und danach vollkommene Ruhe." }, { title: "Essen im Freien", desc: "Zwei Esspavillons im Freien mit Blick auf den Garten, nachts sanft vom Licht des Parks erhellt – der perfekte Ort für ausgedehnte Mittagessen und Abendessen unter dem Sternenhimmel, mit dem Duft der Costa del Circeo in der Luft." }, { title: "Filmische Abende", desc: "Ein Heimkino mit 75-Zoll-OLED-Bildschirm und immersivem Klang, begleitet von einem Yamaha-Flügel in der unteren Lounge. Hier entfalten sich die Abende langsam." }] },
  gallery: { eyebrow: "Galerie", title: "Eine Einladung in Bildern", subtitle: "Jeder Winkel der Villa La Valle wurde mit dem Blick eines Künstlers und der Sorgfalt eines Handwerkers gestaltet. Entdecken Sie unsere Auswahl oder öffnen Sie die vollständige Galerie.", cta: "Erleben Sie es selbst – auf Airbnb buchen", viewAll: "Vollständige Galerie ansehen", close: "Schließen", hideThumbnails: "Miniaturen ausblenden", showThumbnails: "Miniaturen anzeigen", previousImage: "Vorheriges Bild", nextImage: "Nächstes Bild", viewImage: "Bild ansehen", dialogLabel: "Galerie der Villa La Valle" },
  location: { eyebrow: "Die Küste", title: "San Felice Circeo – das Juwel des Litorale Pontino", body: "Drei Minuten vom kristallklaren Meer, zehn von den berühmten Sonnenuntergängen Sabaudias und neunzig vom Flughafen Rom-Fiumicino. Die Pontinischen Inseln schimmern am Horizont, während sich hinter der Villa das Vorgebirge des Circeo erhebt.", mapTitle: "Karte der Villa La Valle" },
  reviews: { eyebrow: "Gäste", title: "Worte unserer Gäste", rating: "5/5 – bei jedem Aufenthalt" },
  cta: { eyebrow: "Exklusives Angebot 2026", title: "Reservieren Sie das gesamte Anwesen", subtitle: "Villa La Valle wird ausschließlich als privates Feriendomizil vermietet. Die Sofortbuchung auf Airbnb ermöglicht eine Bestätigung in wenigen Minuten.", cta: "Auf Airbnb buchen", secondary: "Oder private Anfrage senden" },
  contact: { eyebrow: "Kontakt", title: "Beginnen Sie Ihren Aufenthalt", subtitle: "Für maßgeschneiderte Aufenthalte, Langzeitreservierungen oder private Veranstaltungen schreiben Sie uns direkt. Wir antworten persönlich – meist innerhalb weniger Stunden.", channels: { whatsapp: "WhatsApp", email: "E-Mail", phone: "Anrufen", airbnb: "Auf Airbnb buchen", instantBook: "Sofortbuchung verfügbar" }, form: { name: "Vorname", surname: "Nachname", email: "E-Mail", phone: "Telefon", phoneOptional: "(optional)", dates: "Aufenthaltsdaten", dateFrom: "Von", dateTo: "Bis", selectDate: "Datum wählen", message: "Nachricht", submit: "Anfrage senden", sending: "Wird gesendet…", success: "Vielen Dank! Ihre Nachricht wurde gesendet – wir melden uns in Kürze bei Ihnen.", error: "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.", privacyPrefix: "Ich habe die", privacyLink: "Datenschutzerklärung gelesen und akzeptiere sie" } },
  footer: { tagline: "Eine exklusive Villa an der Riviera del Circeo im Litorale Pontino", privacy: "Datenschutzerklärung", cookiePolicy: "Cookie-Richtlinie", cookiePreferences: "Cookie-Einstellungen", terms: "Bedingungen", rights: "Alle Rechte vorbehalten.", lang: "Sprache", reg: "Reg." },
  cookieBanner: {
    eyebrow: "Datenschutz & Einwilligung",
    title: "Wir gehen respektvoll mit Cookies um",
    description: "Wir verwenden technisch notwendige Cookies für den Betrieb der Website sowie, nur mit Ihrer Einwilligung, Analyse- und Marketing-Cookies (Google Analytics, Google Ads, Meta Pixel), um zu verstehen, wie die Website genutzt wird, und Ihnen relevante Anzeigen zu zeigen. Sie können Ihre Wahl jederzeit annehmen, ablehnen oder anpassen.",
    privacyPolicy: "Datenschutzerklärung",
    cookiePolicy: "Cookie-Richtlinie",
    acceptAll: "Alle akzeptieren",
    rejectAll: "Alle ablehnen",
    customize: "Anpassen",
    customizeTitle: "Cookie-Einstellungen anpassen",
    customizeDescription: "Wählen Sie, welche Cookie-Kategorien aktiviert werden sollen. Notwendige Cookies sind immer aktiv, da sie für den Betrieb der Website erforderlich sind, und erfordern keine Einwilligung.",
    savePreferences: "Einstellungen speichern",
    alwaysActive: "Immer aktiv",
    categories: {
      necessary: { title: "Notwendige Cookies", description: "Erforderlich für den Betrieb der Website: Sicherheit, Sprache und Speicherung Ihrer Cookie-Einstellungen. Keine Einwilligung erforderlich." },
      analytics: { title: "Analyse", description: "Ermöglichen es uns, Besuche und Interaktionen aggregiert mit Google Analytics zu messen, um Inhalte und Nutzererlebnis zu verbessern." },
      marketing: { title: "Marketing", description: "Werden für Remarketing und Kampagnenmessung mit Google Ads und Meta Pixel verwendet, um Ihnen relevantere Anzeigen auf anderen Websites und sozialen Medien zu zeigen." },
    },
  },
  floating: { book: "Auf Airbnb buchen", backToTop: "Nach oben" },
  ui: { languageSelector: "Sprache wählen", menuToggle: "Menü öffnen oder schließen" },
  seo: { homeTitle: "Villa La Valle | Exklusives Villa-Erlebnis", homeDescription: "Villa La Valle: fünf Suiten, Salzwasserpool und privater Garten an der Riviera del Circeo." },
};
export default locale;
