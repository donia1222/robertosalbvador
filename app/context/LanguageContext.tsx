import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Language = "es" | "de" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Traducciones
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Header
    "nav.inicio": "Inicio",
    "nav.servicios": "Servicios",
    "nav.proyectos": "Proyectos",
    "nav.tech": "Tech Stack",
    "nav.contacto": "Contacto",
    "header.phone": "Teléfono",
    "header.email": "Email",
    "header.download": "Descargar Contacto",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.title.part1": "Creador de",
    "hero.title.highlight": "Apps Nativas",
    "hero.title.part2": "que destacan",
    "hero.subtitle": "Especializado en React Native y desarrollo Full-Stack. Transformo ideas en aplicaciones móviles y web de alto rendimiento.",
    "hero.experience": "Años de Experiencia",
    "hero.apps": "Apps Desarrolladas",
    "hero.satisfaction": "Satisfacción del Cliente",
    "hero.cta.projects": "Ver Proyectos",
    "hero.cta.contact": "Contactar",

    // Services
    "services.title": "Servicios",
    "services.mobile.title": "Aplicaciones Móviles",
    "services.mobile.subtitle": "iOS & Android",
    "services.mobile.description": "Desarrollo de aplicaciones móviles nativas con React Native, optimizadas para iOS y Android.",
    "services.web.title": "Desarrollo Web",
    "services.web.subtitle": "Moderno & Responsive",
    "services.web.description": "Sitios web modernos y aplicaciones web con Next.js, Remix y las últimas tecnologías.",
    "services.ai.title": "Integración IA",
    "services.ai.subtitle": "ChatGPT & Más",
    "services.ai.description": "Integración de inteligencia artificial en tus aplicaciones con OpenAI, chatbots y automatización.",
    "services.consulting.title": "Consultoría Tech",
    "services.consulting.subtitle": "Soluciones Estratégicas",
    "services.consulting.description": "Asesoramiento técnico especializado en arquitectura, optimización y escalabilidad de proyectos.",

    // OtherApps
    "apps.title": "Mis apps",
    "apps.subtitle": "publicadas",
    "apps.buyvoice.description": "Habla y la lista se crea automáticamente. Lista de compras con IA.",
    "apps.hundezonen.description": "La app para ti y tu perro. Encuentra zonas para perros cerca de ti.",
    "apps.foodscan.description": "¡Transforma tu nevera en recetas! Sugerencias de recetas con IA.",
    "apps.dogmentor.description": "¡Todo lo que necesitas saber sobre perros!",
    "apps.keto.description": "Crea recetas únicas Keto y Paleo",
    "apps.workti.description": "Control de tiempo inteligente para equipos y freelancers.",
    "apps.visit": "Visitar sitio",
    "apps.ios": "iOS",
    "apps.android": "Android",

    // Websites
    "websites.title.part1": "Sitios web",
    "websites.title.highlight": "publicados",
    "websites.subtitle": "Sitios web profesionales desarrollados",
    "websites.visit": "Visitar",

    // TechCarousel
    "tech.badge": "Tech Stack",
    "tech.title.part1": "Tecnologías que",
    "tech.title.highlight": "domino",
    "tech.subtitle": "Herramientas y frameworks que uso para crear experiencias increíbles",

    // Claude Code Banner
    "claudeCode.badge": "DESDE 2025",
    "claudeCode.title": "Mi copiloto: Claude Code",
    "claudeCode.description": "4 agentes especializados entrenados para mis requerimientos. Trabajo mucho más rápido y puedo ofrecer precios inmejorables gracias a esta tecnología de vanguardia.",
    "claudeCode.agents": "Agentes IA",
    "claudeCode.speed": "Más rápido",
    "claudeCode.prices": "Mejores precios",

    // Contact
    "contact.badge": "Contacto",
    "contact.title": "Contacto",
    "contact.location.title": "Dirección",
    "contact.location.address": "Sevelen, Schweiz",
    "contact.location.postal": "9475",
    "contact.phone.title": "Teléfono",
    "contact.email.title": "E-Mail",
    "contact.header.title.part1": "¿Listo para",
    "contact.header.title.highlight": "trabajar juntos",
    "contact.header.title.part2": "?",
    "contact.cta.title": "¿Tienes un proyecto en mente?",
    "contact.cta.subtitle": "Hablemos sobre cómo puedo ayudarte a hacer realidad tu aplicación",
    "contact.cta.button": "Descargar Tarjeta de Visita",
    "contact.cta.github": "Ver GitHub",

    // Footer
    "footer.copyright": "© 2026 Roberto Salvador Schweiz",
    "footer.legal": "Aviso Legal",
    "footer.privacy": "Privacidad",

    // Metadata
    "meta.title": "Roberto Salvador | Desarrollador de Apps y Webs Modernas en Suiza | St. Gallen & Liechtenstein",
    "meta.description": "Desarrollador freelance especializado en aplicaciones móviles y páginas webs modernas en Suiza. React Native, Next.js, Remix. Servicios en St. Gallen, Liechtenstein y toda Suiza. +5 años de experiencia, 30+ apps desarrolladas.",
    "meta.keywords": "desarrollador apps Suiza, desarrollador web St. Gallen, React Native Liechtenstein, páginas web modernas Suiza, desarrollo móvil iOS Android, Next.js developer Switzerland, Remix developer, desarrollador freelance Suiza, app developer St. Gallen, web development Liechtenstein, desarrollador React Native Suiza",

    // Error messages
    "error.oops": "¡Ups!",
    "error.unexpected": "Ha ocurrido un error inesperado.",
    "error.404": "404",
    "error.notFound": "La página que buscas no existe.",
    "error.error": "Error",
  },
  de: {
    // Header
    "nav.inicio": "Start",
    "nav.servicios": "Dienstleistungen",
    "nav.proyectos": "Projekte",
    "nav.tech": "Tech Stack",
    "nav.contacto": "Kontakt",
    "header.phone": "Telefon",
    "header.email": "E-Mail",
    "header.download": "Kontakt herunterladen",

    // Hero
    "hero.greeting": "Hallo, ich bin",
    "hero.title.part1": "Entwickler von",
    "hero.title.highlight": "Mobile Apps",
    "hero.title.part2": "",
    "hero.subtitle": "Spezialisiert auf React Native und Full-Stack-Entwicklung. Ich verwandle Ideen in leistungsstarke mobile und Web-Anwendungen.",
    "hero.experience": "Jahre Erfahrung",
    "hero.apps": "Entwickelte Apps",
    "hero.satisfaction": "Kundenzufriedenheit",
    "hero.cta.projects": "Projekte ansehen",
    "hero.cta.contact": "Kontaktieren",

    // Services
    "services.title": "Dienstleistungen",
    "services.mobile.title": "Mobile Apps",
    "services.mobile.subtitle": "iOS & Android",
    "services.mobile.description": "Entwicklung nativer mobiler Apps mit React Native, optimiert für iOS und Android.",
    "services.web.title": "Webentwicklung",
    "services.web.subtitle": "Modern & Responsive",
    "services.web.description": "Moderne Websites und Webanwendungen mit Next.js, Remix und den neuesten Technologien.",
    "services.ai.title": "KI-Integration",
    "services.ai.subtitle": "ChatGPT & Mehr",
    "services.ai.description": "Integration künstlicher Intelligenz in Ihre Anwendungen mit OpenAI, Chatbots und Automatisierung.",
    "services.consulting.title": "Tech-Beratung",
    "services.consulting.subtitle": "Strategische Lösungen",
    "services.consulting.description": "Spezialisierte technische Beratung in Architektur, Optimierung und Skalierbarkeit von Projekten.",

    // OtherApps
    "apps.title": "Meine Apps",
    "apps.subtitle": "veröffentlicht",
    "apps.buyvoice.description": "Sprechen Sie und die Liste wird automatisch erstellt. Einkaufsliste mit KI.",
    "apps.hundezonen.description": "Die App für Sie und Ihren Hund. Finden Sie Hundezonen in Ihrer Nähe.",
    "apps.foodscan.description": "Verwandeln Sie Ihren Kühlschrank in Rezepte! Rezeptvorschläge mit KI.",
    "apps.dogmentor.description": "Alles, was Sie über Hunde wissen müssen!",
    "apps.keto.description": "Erstellen Sie einzigartige Keto- und Paleo-Rezepte",
    "apps.workti.description": "Intelligente Zeiterfassung für Teams und Freelancer.",
    "apps.visit": "Website besuchen",
    "apps.ios": "iOS",
    "apps.android": "Android",

    // Websites
    "websites.title.part1": "Veröffentlichte",
    "websites.title.highlight": "Websites",
    "websites.subtitle": "Entwickelte professionelle Websites",
    "websites.visit": "Besuchen",

    // TechCarousel
    "tech.badge": "Tech Stack",
    "tech.title.part1": "Technologien, die ich",
    "tech.title.highlight": "beherrsche",
    "tech.subtitle": "Tools und Frameworks, die ich verwende, um unglaubliche Erfahrungen zu schaffen",

    // Claude Code Banner
    "claudeCode.badge": "SEIT 2025",
    "claudeCode.title": "Mein Copilot: Claude Code",
    "claudeCode.description": "4 spezialisierte Agenten, die für meine Anforderungen trainiert wurden. Ich arbeite viel schneller und kann dank dieser Spitzentechnologie unschlagbare Preise anbieten.",
    "claudeCode.agents": "KI-Agenten",
    "claudeCode.speed": "Schneller",
    "claudeCode.prices": "Beste Preise",

    // Contact
    "contact.badge": "Kontakt",
    "contact.title": "Kontakt",
    "contact.location.title": "Adresse",
    "contact.location.address": "Sevelen, Schweiz",
    "contact.location.postal": "9475",
    "contact.phone.title": "Telefon",
    "contact.email.title": "E-Mail",
    "contact.header.title.part1": "Bereit",
    "contact.header.title.highlight": "zusammenzuarbeiten",
    "contact.header.title.part2": "?",
    "contact.cta.title": "Haben Sie ein Projekt im Kopf?",
    "contact.cta.subtitle": "Lassen Sie uns darüber sprechen, wie ich Ihnen helfen kann, Ihre Anwendung zu verwirklichen",
    "contact.cta.button": "Visitenkarte herunterladen",
    "contact.cta.github": "GitHub ansehen",

    // Footer
    "footer.copyright": "© 2026 Roberto Salvador Schweiz",
    "footer.legal": "Impressum",
    "footer.privacy": "Datenschutz",

    // Metadata
    "meta.title": "Roberto Salvador | Entwickler für moderne Apps und Websites in der Schweiz | St. Gallen & Liechtenstein",
    "meta.description": "Freiberuflicher Entwickler spezialisiert auf mobile Anwendungen und moderne Websites in der Schweiz. React Native, Next.js, Remix. Dienstleistungen in St. Gallen, Liechtenstein und der gesamten Schweiz. +5 Jahre Erfahrung, 30+ entwickelte Apps.",
    "meta.keywords": "App Entwickler Schweiz, Web Entwickler St. Gallen, React Native Liechtenstein, moderne Websites Schweiz, Mobile Entwicklung iOS Android, Next.js Entwickler Schweiz, Remix Entwickler, Freelance Entwickler Schweiz, App Entwickler St. Gallen, Web Entwicklung Liechtenstein, React Native Entwickler Schweiz",

    // Error messages
    "error.oops": "Hoppla!",
    "error.unexpected": "Ein unerwarteter Fehler ist aufgetreten.",
    "error.404": "404",
    "error.notFound": "Die gesuchte Seite existiert nicht.",
    "error.error": "Fehler",
  },
  en: {
    // Header
    "nav.inicio": "Home",
    "nav.servicios": "Services",
    "nav.proyectos": "Projects",
    "nav.tech": "Tech Stack",
    "nav.contacto": "Contact",
    "header.phone": "Phone",
    "header.email": "Email",
    "header.download": "Download Contact",

    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.title.part1": "Creator of",
    "hero.title.highlight": "Native Apps", 
    "hero.title.part2": "",
    "hero.subtitle": "Specialized in React Native and Full-Stack development. I transform ideas into high-performance mobile and web applications.",
    "hero.experience": "Years of Experience",
    "hero.apps": "Developed Apps",
    "hero.satisfaction": "Client Satisfaction",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact",

    // Services
    "services.title": "Services",
    "services.mobile.title": "Mobile Applications",
    "services.mobile.subtitle": "iOS & Android",
    "services.mobile.description": "Native mobile app development with React Native, optimized for iOS and Android.",
    "services.web.title": "Web Development",
    "services.web.subtitle": "Modern & Responsive",
    "services.web.description": "Modern websites and web applications with Next.js, Remix and the latest technologies.",
    "services.ai.title": "AI Integration",
    "services.ai.subtitle": "ChatGPT & More",
    "services.ai.description": "Integration of artificial intelligence in your applications with OpenAI, chatbots and automation.",
    "services.consulting.title": "Tech Consulting",
    "services.consulting.subtitle": "Strategic Solutions",
    "services.consulting.description": "Specialized technical consulting in architecture, optimization and scalability of projects.",

    // OtherApps
    "apps.title": "My apps",
    "apps.subtitle": "published",
    "apps.buyvoice.description": "Speak and the list is created automatically. Shopping list with AI.",
    "apps.hundezonen.description": "The app for you and your dog. Find dog zones near you.",
    "apps.foodscan.description": "Transform your fridge into recipes! Recipe suggestions with AI.",
    "apps.dogmentor.description": "Everything you need to know about dogs!",
    "apps.keto.description": "Create unique Keto and Paleo recipes",
    "apps.workti.description": "Smart time tracking for teams and freelancers.",
    "apps.visit": "Visit site",
    "apps.ios": "iOS",
    "apps.android": "Android",

    // Websites
    "websites.title.part1": "Published",
    "websites.title.highlight": "Websites",
    "websites.subtitle": "Professional websites developed",
    "websites.visit": "Visit",

    // TechCarousel
    "tech.badge": "Tech Stack",
    "tech.title.part1": "Technologies I",
    "tech.title.highlight": "master",
    "tech.subtitle": "Tools and frameworks I use to create incredible experiences",

    // Claude Code Banner
    "claudeCode.badge": "SINCE 2025",
    "claudeCode.title": "My copilot: Claude Code",
    "claudeCode.description": "4 specialized agents trained for my requirements. I work much faster and can offer unbeatable prices thanks to this cutting-edge technology.",
    "claudeCode.agents": "AI Agents",
    "claudeCode.speed": "Faster",
    "claudeCode.prices": "Best prices",

    // Contact
    "contact.badge": "Contact",
    "contact.title": "Contact",
    "contact.location.title": "Address",
    "contact.location.address": "Sevelen, Switzerland",
    "contact.location.postal": "9475",
    "contact.phone.title": "Phone",
    "contact.email.title": "Email",
    "contact.header.title.part1": "Ready to",
    "contact.header.title.highlight": "work together",
    "contact.header.title.part2": "?",
    "contact.cta.title": "Have a project in mind?",
    "contact.cta.subtitle": "Let's talk about how I can help you bring your application to life",
    "contact.cta.button": "Download Business Card",
    "contact.cta.github": "View GitHub",

    // Footer
    "footer.copyright": "© 2026 Roberto Salvador Switzerland",
    "footer.legal": "Legal Notice",
    "footer.privacy": "Privacy",

    // Metadata
    "meta.title": "Roberto Salvador | Modern App & Web Developer in Switzerland | St. Gallen & Liechtenstein",
    "meta.description": "Freelance developer specialized in mobile applications and modern websites in Switzerland. React Native, Next.js, Remix. Services in St. Gallen, Liechtenstein and all of Switzerland. +5 years of experience, 30+ developed apps.",
    "meta.keywords": "app developer Switzerland, web developer St. Gallen, React Native Liechtenstein, modern websites Switzerland, mobile development iOS Android, Next.js developer Switzerland, Remix developer, freelance developer Switzerland, app developer St. Gallen, web development Liechtenstein, React Native developer Switzerland",

    // Error messages
    "error.oops": "Oops!",
    "error.unexpected": "An unexpected error has occurred.",
    "error.404": "404",
    "error.notFound": "The page you are looking for does not exist.",
    "error.error": "Error",
  },
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("de");
  const [mounted, setMounted] = useState(false);

  // Solo en cliente: cargar idioma guardado o detectar idioma del navegador
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as Language | null;

    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "de" || savedLanguage === "en")) {
      // Si hay un idioma guardado, usarlo
      setLanguageState(savedLanguage);
    } else {
      // Si no hay idioma guardado, detectar el idioma del navegador
      const browserLang = navigator.language || navigator.languages?.[0] || "en";
      const langCode = browserLang.toLowerCase().split('-')[0]; // Extraer código: "es-ES" → "es"

      // Si el idioma detectado es español, alemán o inglés, usarlo
      // De lo contrario, usar inglés por defecto
      if (langCode === "es" || langCode === "de" || langCode === "en") {
        setLanguageState(langCode as Language);
      } else {
        setLanguageState("en");
      }
    }

    setMounted(true);
  }, []);

  // Aplicar idioma al documento
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-language", language);
      document.documentElement.setAttribute("lang", language);
    }
  }, [language, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
