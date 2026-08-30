import { VILLA } from "../../data/villa.config";

const locale = {
  nav: { villa: "La Villa", suites: "Suites", experience: "Experiencia", gallery: "Galería", location: "Ubicación", reviews: "Huéspedes", contact: "Contáctanos", book: "Reservar" },
  hero: { eyebrow: `${VILLA.location.city} · Italia`, titleLine1: "Una experiencia", titleLine2: "exclusiva en villa", titles: [
    { line1: "Villa mediterránea", line2: "cerca de Roma" },
    { line1: "Una experiencia", line2: "exclusiva en villa" },
    { line1: "Un refugio de prestigio", line2: "entre mar, naturaleza y privacidad" },
  ], subtitle: "Cinco suites, una piscina de agua salada y un jardín privado de 5.000 m² en la Riviera del Circeo, una de las costas más prestigiosas del Litorale Pontino. Un refugio para quienes reconocen el verdadero lujo en la calma, la luz y el mar cristalino.", ctaExplore: "Consultar disponibilidad", ctaBook: "Reserva en Airbnb", hint: `${VILLA.capacity.bedrooms} suites · hasta ${VILLA.capacity.guests} huéspedes · piscina privada`, scroll: "Desliza para descubrir", priceLabel: "Desde", priceValue: "A consultar", priceNote: `Mínimo ${VILLA.pricing.minStayNights} noches`, listing: "Anuncio en Airbnb" },
  overview: { eyebrow: "El Refugio", title: "Una finca privada en la Riviera del Circeo", body: "En la Costa del Circeo, entre el parque nacional protegido y el cristalino mar Tirreno, Villa La Valle ofrece vistas de 360 grados sobre la bahía, el centro histórico y el promontorio. Una finca concebida para viajeros que miden la elegancia en el silencio, la calidad del aire y la paciencia de la piedra bien colocada.", bodyExtra: "Cinco suites, cuatro baños con prestaciones de spa, dos pabellones para comer al aire libre y un jardín costero de 5.000 m², todo exclusivamente para ti.", features: [
    { title: "Cinco suites de lujo", desc: "Cuatro dormitorios con cama king y una suite adicional, con ropa de cama a medida, climatización y ventanas panorámicas." },
    { title: "Piscina salina de 13 × 6 m", desc: "Piscina de electrólisis salina con entrada tipo playa, lounge sumergido y bar sombreado con Wi-Fi." },
    { title: "Servicios premium", desc: "Piano de cola Yamaha, cine OLED de 75 pulgadas, iluminación ambiental y cocina italiana profesional." },
    { title: "Ubicación exclusiva", desc: "A tres minutos de la playa y noventa de Roma, en una de las costas más prestigiosas del Lacio." },
    { title: "Privacidad absoluta", desc: "Jardín costero cerrado de 5.000 m² con instalaciones deportivas, fuente y total privacidad." },
  ], stats: [{ value: String(VILLA.capacity.bedrooms), label: "Suites" }, { value: String(VILLA.capacity.guests), label: "Huéspedes" }, { value: VILLA.capacity.poolSizeM, label: "m · Piscina" }, { value: "5.000", label: "m² · Jardín" }] },
  suites: { eyebrow: "Las Suites", title: "Cinco habitaciones, un lujo sereno", subtitle: "Cada suite ha sido creada alrededor de su propia luz. Ropa de cama a medida, ventanas panorámicas, persianas insonorizadas y climatización individual para que cada huésped encuentre su ritmo.", previousSuite: "Ir a las suites anteriores", nextSuite: "Ir a las suites siguientes", previousImage: "Mostrar foto anterior de", nextImage: "Mostrar foto siguiente de", amenities: "Servicios principales", photo: "Foto", of: "de" },
  experience: { eyebrow: "La Experiencia", title: "Rituales de un verano italiano", previousPhoto: "Foto anterior", nextPhoto: "Foto siguiente", photoCountLabel: "fotos", blocks: [{ title: "Deporte y bienestar", desc: "Campo de fútbol de 30 × 15 m, cancha panorámica de baloncesto, gimnasio al aire libre y sala de tratamientos con camilla de masaje y baño de cromoterapia. Muévete y después entrégate a la calma." }, { title: "Comidas al Aire Libre", desc: "Dos pabellones para comer al aire libre con vistas al jardín, iluminados de noche por la suave luz del parque: el escenario perfecto para almuerzos tranquilos y cenas bajo las estrellas, con el aroma de la Costa del Circeo en el aire." }, { title: "Noches de cine", desc: "Cine interior con pantalla OLED de 75 pulgadas y sonido envolvente, acompañado por un piano de cola Yamaha en el salón inferior. Aquí las noches transcurren despacio." }] },
  gallery: { eyebrow: "Galería", title: "Una invitación en imágenes", subtitle: "Cada rincón de Villa La Valle ha sido creado con la mirada de un artista y el rigor de un artesano. Descubre esta selección o abre la galería completa.", cta: "Vívela en persona: reserva en Airbnb", viewAll: "Explorar la galería completa", close: "Cerrar", hideThumbnails: "Ocultar miniaturas", showThumbnails: "Mostrar miniaturas", previousImage: "Imagen anterior", nextImage: "Imagen siguiente", viewImage: "Ver imagen", dialogLabel: "Galería de Villa La Valle" },
  location: { eyebrow: "La Costa", title: "San Felice Circeo, la joya del Litorale Pontino", body: "A tres minutos de un mar cristalino, diez de los célebres atardeceres de Sabaudia y noventa de Roma Fiumicino. Las islas Pontinas brillan en el horizonte mientras el promontorio del Circeo se alza en silencio tras la villa.", mapTitle: "Mapa de Villa La Valle" },
  reviews: { eyebrow: "Huéspedes", title: "Palabras de quienes se alojaron", rating: "5/5 en cada estancia" },
  cta: { eyebrow: "Una exclusiva de 2026", title: "Reserva toda la finca", subtitle: "Villa La Valle se ofrece exclusivamente como alquiler privado. La Reserva Inmediata está activa en Airbnb y permite confirmar tu estancia en minutos.", cta: "Reserva en Airbnb", secondary: "O envía una consulta privada" },
  contact: { eyebrow: "Contáctanos", title: "Comienza tu estancia", subtitle: "Para estancias a medida, reservas de larga duración o eventos privados, escríbenos directamente. Respondemos personalmente, normalmente en pocas horas.", channels: { whatsapp: "WhatsApp", email: "Correo", phone: "Llamar", airbnb: "Reserva en Airbnb", instantBook: "Reserva Inmediata disponible" }, form: { name: "Nombre", surname: "Apellidos", email: "Correo", phone: "Teléfono", phoneOptional: "(opcional)", dates: "Fechas de la estancia", dateFrom: "Desde", dateTo: "Hasta", selectDate: "Selecciona una fecha", message: "Mensaje", submit: "Enviar solicitud", sending: "Enviando…", success: "¡Gracias! Tu mensaje ha sido enviado — te responderemos en breve.", error: "Ha ocurrido un error al enviar el mensaje. Inténtalo de nuevo o escríbenos directamente.", privacyPrefix: "He leído y acepto la", privacyLink: "Política de privacidad" } },
  footer: { tagline: "Una villa exclusiva en la Riviera del Circeo, en el Litorale Pontino", privacy: "Política de privacidad", cookiePolicy: "Política de cookies", cookiePreferences: "Preferencias de cookies", terms: "Términos", rights: "Todos los derechos reservados.", lang: "Idioma", reg: "Reg." },
  cookieBanner: {
    eyebrow: "Privacidad y consentimiento",
    title: "Gestionamos las cookies con respeto",
    description: "Usamos cookies técnicas necesarias para el funcionamiento del sitio y, solo con tu consentimiento, cookies de análisis y marketing (Google Analytics, Google Ads, Meta Pixel) para entender cómo se usa el sitio y mostrarte anuncios relevantes. Puedes aceptar, rechazar o personalizar tu elección en cualquier momento.",
    privacyPolicy: "Política de privacidad",
    cookiePolicy: "Política de cookies",
    acceptAll: "Aceptar todo",
    rejectAll: "Rechazar todo",
    customize: "Personalizar",
    customizeTitle: "Personalizar preferencias de cookies",
    customizeDescription: "Elige qué categorías de cookies activar. Las cookies necesarias están siempre activas porque son indispensables para el funcionamiento del sitio y no requieren consentimiento.",
    savePreferences: "Guardar preferencias",
    alwaysActive: "Siempre activo",
    categories: {
      necessary: { title: "Cookies necesarias", description: "Indispensables para el funcionamiento del sitio: seguridad, idioma y almacenamiento de tus preferencias de cookies. No requieren consentimiento." },
      analytics: { title: "Analítica", description: "Nos permiten medir visitas e interacciones de forma agregada con Google Analytics, para mejorar el contenido y la experiencia del sitio." },
      marketing: { title: "Marketing", description: "Se usan para remarketing y medición de campañas con Google Ads y Meta Pixel, para mostrarte anuncios más relevantes en otros sitios y redes sociales." },
    },
  },
  floating: { book: "Reserva en Airbnb", backToTop: "Volver arriba" },
  ui: { languageSelector: "Seleccionar idioma", menuToggle: "Abrir o cerrar menú" },
  seo: { homeTitle: "Villa La Valle | Experiencia exclusiva en villa", homeDescription: "Villa La Valle: cinco suites, piscina de agua salada y jardín privado en la Riviera del Circeo." },
};
export default locale;
