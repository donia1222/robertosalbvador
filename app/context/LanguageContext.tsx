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
    "apps.makingOf": "Ver cómo se hicieron",

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

    // Making Of Page
    "makingOf.badge": "Making Of",
    "makingOf.title": "Cómo se hicieron",
    "makingOf.subtitle": "las apps",
    "makingOf.description": "Descubre el proceso de desarrollo, arquitectura y tecnologías detrás de cada aplicación",
    "makingOf.viewDetails": "Ver cómo se hizo",
    "makingOf.back": "Volver",

    // Modal
    "makingOf.modal.overview": "Descripción General",
    "makingOf.modal.techStack": "Stack Tecnológico",
    "makingOf.modal.features": "Características Principales",
    "makingOf.modal.integrations": "Integraciones",
    "makingOf.modal.links": "Enlaces",
    "makingOf.modal.website": "Sitio Web",

    // BuyVoice
    "makingOf.buyvoice.description": "Lista de compras inteligente con reconocimiento de voz y IA",
    "makingOf.buyvoice.overview": "BuyVoice es una aplicación de lista de compras que utiliza reconocimiento de voz y GPT-4 para crear listas automáticamente. Solo habla lo que necesitas y la IA organiza tu lista de compras de forma inteligente.",
    "makingOf.buyvoice.features.voice": "Reconocimiento de voz en tiempo real",
    "makingOf.buyvoice.features.ai": "Procesamiento inteligente con GPT-4",
    "makingOf.buyvoice.features.offline": "Modo offline con AsyncStorage",
    "makingOf.buyvoice.features.multilang": "Soporte multiidioma (ES, DE, EN)",
    "makingOf.buyvoice.architecture.title": "Arquitectura",
    "makingOf.buyvoice.architecture.contextApi": "Context API para gestión de estado global",
    "makingOf.buyvoice.architecture.localStorage": "Almacenamiento local para persistencia de datos",
    "makingOf.buyvoice.architecture.aiIntegration": "Integración con OpenAI para procesamiento de voz",
    "makingOf.buyvoice.screens.title": "Pantallas Principales",
    "makingOf.buyvoice.screens.home": "Pantalla principal con entrada de voz",
    "makingOf.buyvoice.screens.lists": "Gestión de listas de compras",
    "makingOf.buyvoice.screens.settings": "Configuración y preferencias",

    // Hundezonen
    "makingOf.hundezonen.description": "Encuentra zonas para perros en Suiza con mapas interactivos",
    "makingOf.hundezonen.overview": "Hundezonen es la aplicación definitiva para dueños de perros en Suiza. Encuentra zonas cercanas donde tu perro puede jugar libremente, con información detallada de cada ubicación y navegación GPS.",
    "makingOf.hundezonen.features.map": "Mapa interactivo con todas las zonas para perros",
    "makingOf.hundezonen.features.gps": "Navegación GPS a zonas cercanas",
    "makingOf.hundezonen.features.filters": "Filtros por tipo de zona y servicios",
    "makingOf.hundezonen.features.offline": "Funcionamiento offline con caché de datos",
    "makingOf.hundezonen.architecture.title": "Arquitectura",
    "makingOf.hundezonen.architecture.maps": "React Native Maps para visualización geográfica",
    "makingOf.hundezonen.architecture.geolocation": "Geolocation API para ubicación en tiempo real",
    "makingOf.hundezonen.architecture.backend": "Backend PHP/MySQL para gestión de zonas",
    "makingOf.hundezonen.screens.title": "Pantallas Principales",
    "makingOf.hundezonen.screens.map": "Vista de mapa con todas las zonas",
    "makingOf.hundezonen.screens.list": "Lista de zonas con filtros",
    "makingOf.hundezonen.screens.details": "Detalles de cada zona para perros",
    "makingOf.hundezonen.screens.favorites": "Zonas favoritas guardadas",

    // FoodScan AI
    "makingOf.foodscan.description": "Escanea alimentos y obtén información nutricional con IA",
    "makingOf.foodscan.overview": "FoodScan AI utiliza la visión por computadora de GPT-4 para analizar alimentos desde la cámara. Obtén información nutricional instantánea, calorías, macros y sugerencias de recetas saludables.",
    "makingOf.foodscan.features.camera": "Escaneo con cámara en tiempo real",
    "makingOf.foodscan.features.nutrition": "Análisis nutricional detallado con GPT-4 Vision",
    "makingOf.foodscan.features.history": "Historial de escaneos y seguimiento diario",
    "makingOf.foodscan.features.multilang": "Disponible en español, alemán e inglés",
    "makingOf.foodscan.architecture.title": "Arquitectura",
    "makingOf.foodscan.architecture.vision": "GPT-4 Vision para reconocimiento de alimentos",
    "makingOf.foodscan.architecture.imageProcessing": "Procesamiento de imágenes con Expo Camera",
    "makingOf.foodscan.architecture.caching": "Sistema de caché para respuestas rápidas",
    "makingOf.foodscan.screens.title": "Pantallas Principales",
    "makingOf.foodscan.screens.camera": "Cámara con detección automática",
    "makingOf.foodscan.screens.analysis": "Análisis nutricional detallado",
    "makingOf.foodscan.screens.history": "Historial de alimentos escaneados",
    "makingOf.foodscan.screens.profile": "Perfil y objetivos nutricionales",

    // DogMentor KI
    "makingOf.dogmentor.description": "Asistente virtual inteligente para entrenamiento canino",
    "makingOf.dogmentor.overview": "DogMentor es tu entrenador canino personal impulsado por IA. Obtén consejos personalizados sobre comportamiento, entrenamiento y salud de tu perro con respuestas contextuales basadas en GPT-4.",
    "makingOf.dogmentor.features.chat": "Chat inteligente con GPT-4",
    "makingOf.dogmentor.features.training": "Guías de entrenamiento personalizadas",
    "makingOf.dogmentor.features.behavior": "Análisis de comportamiento canino",
    "makingOf.dogmentor.features.personalized": "Respuestas adaptadas al perfil de tu perro",
    "makingOf.dogmentor.architecture.title": "Arquitectura",
    "makingOf.dogmentor.architecture.chat": "Sistema de chat con historial contextual",
    "makingOf.dogmentor.architecture.context": "Context API para perfil del perro",
    "makingOf.dogmentor.architecture.prompts": "Prompts especializados para entrenamiento canino",
    "makingOf.dogmentor.screens.title": "Pantallas Principales",
    "makingOf.dogmentor.screens.chat": "Chat con el asistente DogMentor",
    "makingOf.dogmentor.screens.dogProfile": "Perfil del perro (raza, edad, comportamiento)",
    "makingOf.dogmentor.screens.tips": "Consejos y guías de entrenamiento",
    "makingOf.dogmentor.screens.settings": "Configuración y preferencias",

    // KetoRecipeLab
    "makingOf.ketorecipe.description": "Generador de recetas Keto y Paleo con IA",
    "makingOf.ketorecipe.overview": "KetoRecipeLab es una aplicación completa para dietas Keto y Paleo. Genera recetas personalizadas con IA, planifica tus comidas semanales, calcula planes nutricionales y guarda tus favoritas. Con suscripción para funciones premium.",
    "makingOf.ketorecipe.features.aiRecipes": "Generación de recetas con GPT-4",
    "makingOf.ketorecipe.features.mealPlan": "Planificador de comidas semanal",
    "makingOf.ketorecipe.features.nutrition": "Cálculo de plan nutricional personalizado",
    "makingOf.ketorecipe.features.favorites": "Sistema de favoritos y base de datos de recetas",
    "makingOf.ketorecipe.architecture.title": "Arquitectura",
    "makingOf.ketorecipe.architecture.contexts": "4 Context Providers (Language, Favorites, Subscription, DietType)",
    "makingOf.ketorecipe.architecture.services": "Services Layer (MealPlan, NutritionPlan)",
    "makingOf.ketorecipe.architecture.backend": "Backend PHP/MySQL para almacenamiento de recetas",
    "makingOf.ketorecipe.screens.title": "Pantallas Principales",
    "makingOf.ketorecipe.screens.home": "Generador de recetas con IA",
    "makingOf.ketorecipe.screens.explore": "Explorar recetas con filtros",
    "makingOf.ketorecipe.screens.favorites": "Recetas favoritas guardadas",
    "makingOf.ketorecipe.screens.nutrition": "Plan nutricional personalizado",
    "makingOf.ketorecipe.screens.profile": "Perfil y suscripción",

    // Work Ti
    "makingOf.workti.description": "Control de tiempo inteligente para equipos y freelancers",
    "makingOf.workti.overview": "Work Ti es una aplicación de seguimiento de tiempo diseñada para freelancers y equipos. Registra horas trabajadas, gestiona proyectos, genera reportes detallados y exporta datos para facturación.",
    "makingOf.workti.features.tracking": "Seguimiento de tiempo en tiempo real",
    "makingOf.workti.features.reports": "Reportes detallados con gráficos",
    "makingOf.workti.features.projects": "Gestión de múltiples proyectos",
    "makingOf.workti.features.export": "Exportación a CSV para facturación",
    "makingOf.workti.architecture.title": "Arquitectura",
    "makingOf.workti.architecture.timeTracking": "Sistema de cronómetro con precisión de segundos",
    "makingOf.workti.architecture.localStorage": "AsyncStorage para persistencia de datos",
    "makingOf.workti.architecture.charts": "Gráficos interactivos con React Native Charts",
    "makingOf.workti.screens.title": "Pantallas Principales",
    "makingOf.workti.screens.timer": "Cronómetro de seguimiento",
    "makingOf.workti.screens.projects": "Lista de proyectos activos",
    "makingOf.workti.screens.reports": "Reportes y estadísticas",
    "makingOf.workti.screens.settings": "Configuración y exportación",

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
    "apps.makingOf": "Siehe wie sie gemacht wurden",

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

    // Making Of Page
    "makingOf.badge": "Making Of",
    "makingOf.title": "Wie entstanden",
    "makingOf.subtitle": "die Apps",
    "makingOf.description": "Entdecken Sie den Entwicklungsprozess, die Architektur und die Technologien hinter jeder Anwendung",
    "makingOf.viewDetails": "Siehe wie es gemacht wurde",
    "makingOf.back": "Zurück",

    // Modal
    "makingOf.modal.overview": "Übersicht",
    "makingOf.modal.techStack": "Technologie-Stack",
    "makingOf.modal.features": "Hauptfunktionen",
    "makingOf.modal.integrations": "Integrationen",
    "makingOf.modal.links": "Links",
    "makingOf.modal.website": "Website",

    // BuyVoice
    "makingOf.buyvoice.description": "Intelligente Einkaufsliste mit Spracherkennung und KI",
    "makingOf.buyvoice.overview": "BuyVoice ist eine Einkaufslisten-App, die Spracherkennung und GPT-4 verwendet, um Listen automatisch zu erstellen. Sprechen Sie einfach, was Sie brauchen, und die KI organisiert Ihre Einkaufsliste intelligent.",
    "makingOf.buyvoice.features.voice": "Echtzeit-Spracherkennung",
    "makingOf.buyvoice.features.ai": "Intelligente Verarbeitung mit GPT-4",
    "makingOf.buyvoice.features.offline": "Offline-Modus mit AsyncStorage",
    "makingOf.buyvoice.features.multilang": "Mehrsprachig (ES, DE, EN)",
    "makingOf.buyvoice.architecture.title": "Architektur",
    "makingOf.buyvoice.architecture.contextApi": "Context API für globales Zustandsmanagement",
    "makingOf.buyvoice.architecture.localStorage": "Lokale Speicherung für Datenpersistenz",
    "makingOf.buyvoice.architecture.aiIntegration": "OpenAI-Integration für Sprachverarbeitung",
    "makingOf.buyvoice.screens.title": "Hauptbildschirme",
    "makingOf.buyvoice.screens.home": "Hauptbildschirm mit Spracheingabe",
    "makingOf.buyvoice.screens.lists": "Verwaltung von Einkaufslisten",
    "makingOf.buyvoice.screens.settings": "Einstellungen und Präferenzen",

    // Hundezonen
    "makingOf.hundezonen.description": "Finden Sie Hundezonen in der Schweiz mit interaktiven Karten",
    "makingOf.hundezonen.overview": "Hundezonen ist die ultimative App für Hundebesitzer in der Schweiz. Finden Sie nahegelegene Zonen, wo Ihr Hund frei spielen kann, mit detaillierten Informationen zu jedem Standort und GPS-Navigation.",
    "makingOf.hundezonen.features.map": "Interaktive Karte mit allen Hundezonen",
    "makingOf.hundezonen.features.gps": "GPS-Navigation zu nahegelegenen Zonen",
    "makingOf.hundezonen.features.filters": "Filter nach Zonentyp und Diensten",
    "makingOf.hundezonen.features.offline": "Offline-Betrieb mit Daten-Cache",
    "makingOf.hundezonen.architecture.title": "Architektur",
    "makingOf.hundezonen.architecture.maps": "React Native Maps für geografische Visualisierung",
    "makingOf.hundezonen.architecture.geolocation": "Geolocation API für Echtzeit-Standort",
    "makingOf.hundezonen.architecture.backend": "PHP/MySQL Backend für Zonenverwaltung",
    "makingOf.hundezonen.screens.title": "Hauptbildschirme",
    "makingOf.hundezonen.screens.map": "Kartenansicht mit allen Zonen",
    "makingOf.hundezonen.screens.list": "Zonenliste mit Filtern",
    "makingOf.hundezonen.screens.details": "Details jeder Hundezone",
    "makingOf.hundezonen.screens.favorites": "Gespeicherte Lieblingszonen",

    // FoodScan AI
    "makingOf.foodscan.description": "Scannen Sie Lebensmittel und erhalten Sie Nährwertinformationen mit KI",
    "makingOf.foodscan.overview": "FoodScan AI verwendet GPT-4 Computer Vision, um Lebensmittel von der Kamera zu analysieren. Erhalten Sie sofortige Nährwertinformationen, Kalorien, Makros und gesunde Rezeptvorschläge.",
    "makingOf.foodscan.features.camera": "Echtzeit-Kamera-Scan",
    "makingOf.foodscan.features.nutrition": "Detaillierte Nährwertanalyse mit GPT-4 Vision",
    "makingOf.foodscan.features.history": "Scan-Verlauf und tägliche Verfolgung",
    "makingOf.foodscan.features.multilang": "Verfügbar auf Spanisch, Deutsch und Englisch",
    "makingOf.foodscan.architecture.title": "Architektur",
    "makingOf.foodscan.architecture.vision": "GPT-4 Vision für Lebensmittelerkennung",
    "makingOf.foodscan.architecture.imageProcessing": "Bildverarbeitung mit Expo Camera",
    "makingOf.foodscan.architecture.caching": "Cache-System für schnelle Antworten",
    "makingOf.foodscan.screens.title": "Hauptbildschirme",
    "makingOf.foodscan.screens.camera": "Kamera mit automatischer Erkennung",
    "makingOf.foodscan.screens.analysis": "Detaillierte Nährwertanalyse",
    "makingOf.foodscan.screens.history": "Verlauf gescannter Lebensmittel",
    "makingOf.foodscan.screens.profile": "Profil und Ernährungsziele",

    // DogMentor KI
    "makingOf.dogmentor.description": "Intelligenter virtueller Assistent für Hundetraining",
    "makingOf.dogmentor.overview": "DogMentor ist Ihr persönlicher KI-gesteuerter Hundetrainer. Erhalten Sie personalisierte Ratschläge zu Verhalten, Training und Gesundheit Ihres Hundes mit kontextbasierten Antworten von GPT-4.",
    "makingOf.dogmentor.features.chat": "Intelligenter Chat mit GPT-4",
    "makingOf.dogmentor.features.training": "Personalisierte Trainingsanleitungen",
    "makingOf.dogmentor.features.behavior": "Analyse des Hundeverhaltens",
    "makingOf.dogmentor.features.personalized": "Antworten angepasst an das Profil Ihres Hundes",
    "makingOf.dogmentor.architecture.title": "Architektur",
    "makingOf.dogmentor.architecture.chat": "Chat-System mit Kontextverlauf",
    "makingOf.dogmentor.architecture.context": "Context API für Hundeprofil",
    "makingOf.dogmentor.architecture.prompts": "Spezialisierte Prompts für Hundetraining",
    "makingOf.dogmentor.screens.title": "Hauptbildschirme",
    "makingOf.dogmentor.screens.chat": "Chat mit DogMentor Assistent",
    "makingOf.dogmentor.screens.dogProfile": "Hundeprofil (Rasse, Alter, Verhalten)",
    "makingOf.dogmentor.screens.tips": "Tipps und Trainingsanleitungen",
    "makingOf.dogmentor.screens.settings": "Einstellungen und Präferenzen",

    // KetoRecipeLab
    "makingOf.ketorecipe.description": "Keto- und Paleo-Rezeptgenerator mit KI",
    "makingOf.ketorecipe.overview": "KetoRecipeLab ist eine vollständige App für Keto- und Paleo-Diäten. Generieren Sie personalisierte Rezepte mit KI, planen Sie Ihre wöchentlichen Mahlzeiten, berechnen Sie Ernährungspläne und speichern Sie Ihre Favoriten. Mit Abonnement für Premium-Funktionen.",
    "makingOf.ketorecipe.features.aiRecipes": "Rezeptgenerierung mit GPT-4",
    "makingOf.ketorecipe.features.mealPlan": "Wöchentlicher Mahlzeitenplaner",
    "makingOf.ketorecipe.features.nutrition": "Personalisierte Ernährungsplan-Berechnung",
    "makingOf.ketorecipe.features.favorites": "Favoritensystem und Rezeptdatenbank",
    "makingOf.ketorecipe.architecture.title": "Architektur",
    "makingOf.ketorecipe.architecture.contexts": "4 Context Provider (Language, Favorites, Subscription, DietType)",
    "makingOf.ketorecipe.architecture.services": "Services Layer (MealPlan, NutritionPlan)",
    "makingOf.ketorecipe.architecture.backend": "PHP/MySQL Backend für Rezeptspeicherung",
    "makingOf.ketorecipe.screens.title": "Hauptbildschirme",
    "makingOf.ketorecipe.screens.home": "KI-Rezeptgenerator",
    "makingOf.ketorecipe.screens.explore": "Rezepte mit Filtern erkunden",
    "makingOf.ketorecipe.screens.favorites": "Gespeicherte Lieblingsrezepte",
    "makingOf.ketorecipe.screens.nutrition": "Personalisierter Ernährungsplan",
    "makingOf.ketorecipe.screens.profile": "Profil und Abonnement",

    // Work Ti
    "makingOf.workti.description": "Intelligente Zeiterfassung für Teams und Freelancer",
    "makingOf.workti.overview": "Work Ti ist eine Zeiterfassungs-App für Freelancer und Teams. Erfassen Sie gearbeitete Stunden, verwalten Sie Projekte, generieren Sie detaillierte Berichte und exportieren Sie Daten zur Rechnungsstellung.",
    "makingOf.workti.features.tracking": "Echtzeit-Zeiterfassung",
    "makingOf.workti.features.reports": "Detaillierte Berichte mit Grafiken",
    "makingOf.workti.features.projects": "Verwaltung mehrerer Projekte",
    "makingOf.workti.features.export": "Export nach CSV für Rechnungsstellung",
    "makingOf.workti.architecture.title": "Architektur",
    "makingOf.workti.architecture.timeTracking": "Stoppuhr-System mit Sekundengenauigkeit",
    "makingOf.workti.architecture.localStorage": "AsyncStorage für Datenpersistenz",
    "makingOf.workti.architecture.charts": "Interaktive Grafiken mit React Native Charts",
    "makingOf.workti.screens.title": "Hauptbildschirme",
    "makingOf.workti.screens.timer": "Tracking-Stoppuhr",
    "makingOf.workti.screens.projects": "Liste aktiver Projekte",
    "makingOf.workti.screens.reports": "Berichte und Statistiken",
    "makingOf.workti.screens.settings": "Einstellungen und Export",

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
    "apps.makingOf": "See how they were made",

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

    // Making Of Page
    "makingOf.badge": "Making Of",
    "makingOf.title": "How were made",
    "makingOf.subtitle": "the apps",
    "makingOf.description": "Discover the development process, architecture and technologies behind each application",
    "makingOf.viewDetails": "See how it was made",
    "makingOf.back": "Back",

    // Modal
    "makingOf.modal.overview": "Overview",
    "makingOf.modal.techStack": "Tech Stack",
    "makingOf.modal.features": "Key Features",
    "makingOf.modal.integrations": "Integrations",
    "makingOf.modal.links": "Links",
    "makingOf.modal.website": "Website",

    // BuyVoice
    "makingOf.buyvoice.description": "Smart shopping list with voice recognition and AI",
    "makingOf.buyvoice.overview": "BuyVoice is a shopping list app that uses voice recognition and GPT-4 to create lists automatically. Just speak what you need and the AI organizes your shopping list intelligently.",
    "makingOf.buyvoice.features.voice": "Real-time voice recognition",
    "makingOf.buyvoice.features.ai": "Intelligent processing with GPT-4",
    "makingOf.buyvoice.features.offline": "Offline mode with AsyncStorage",
    "makingOf.buyvoice.features.multilang": "Multilingual support (ES, DE, EN)",
    "makingOf.buyvoice.architecture.title": "Architecture",
    "makingOf.buyvoice.architecture.contextApi": "Context API for global state management",
    "makingOf.buyvoice.architecture.localStorage": "Local storage for data persistence",
    "makingOf.buyvoice.architecture.aiIntegration": "OpenAI integration for voice processing",
    "makingOf.buyvoice.screens.title": "Main Screens",
    "makingOf.buyvoice.screens.home": "Home screen with voice input",
    "makingOf.buyvoice.screens.lists": "Shopping list management",
    "makingOf.buyvoice.screens.settings": "Settings and preferences",

    // Hundezonen
    "makingOf.hundezonen.description": "Find dog zones in Switzerland with interactive maps",
    "makingOf.hundezonen.overview": "Hundezonen is the ultimate app for dog owners in Switzerland. Find nearby zones where your dog can play freely, with detailed information for each location and GPS navigation.",
    "makingOf.hundezonen.features.map": "Interactive map with all dog zones",
    "makingOf.hundezonen.features.gps": "GPS navigation to nearby zones",
    "makingOf.hundezonen.features.filters": "Filters by zone type and services",
    "makingOf.hundezonen.features.offline": "Offline operation with data cache",
    "makingOf.hundezonen.architecture.title": "Architecture",
    "makingOf.hundezonen.architecture.maps": "React Native Maps for geographic visualization",
    "makingOf.hundezonen.architecture.geolocation": "Geolocation API for real-time location",
    "makingOf.hundezonen.architecture.backend": "PHP/MySQL backend for zone management",
    "makingOf.hundezonen.screens.title": "Main Screens",
    "makingOf.hundezonen.screens.map": "Map view with all zones",
    "makingOf.hundezonen.screens.list": "Zone list with filters",
    "makingOf.hundezonen.screens.details": "Details of each dog zone",
    "makingOf.hundezonen.screens.favorites": "Saved favorite zones",

    // FoodScan AI
    "makingOf.foodscan.description": "Scan food and get nutritional information with AI",
    "makingOf.foodscan.overview": "FoodScan AI uses GPT-4 computer vision to analyze food from the camera. Get instant nutritional information, calories, macros and healthy recipe suggestions.",
    "makingOf.foodscan.features.camera": "Real-time camera scanning",
    "makingOf.foodscan.features.nutrition": "Detailed nutritional analysis with GPT-4 Vision",
    "makingOf.foodscan.features.history": "Scan history and daily tracking",
    "makingOf.foodscan.features.multilang": "Available in Spanish, German and English",
    "makingOf.foodscan.architecture.title": "Architecture",
    "makingOf.foodscan.architecture.vision": "GPT-4 Vision for food recognition",
    "makingOf.foodscan.architecture.imageProcessing": "Image processing with Expo Camera",
    "makingOf.foodscan.architecture.caching": "Cache system for fast responses",
    "makingOf.foodscan.screens.title": "Main Screens",
    "makingOf.foodscan.screens.camera": "Camera with automatic detection",
    "makingOf.foodscan.screens.analysis": "Detailed nutritional analysis",
    "makingOf.foodscan.screens.history": "Scanned food history",
    "makingOf.foodscan.screens.profile": "Profile and nutrition goals",

    // DogMentor KI
    "makingOf.dogmentor.description": "Intelligent virtual assistant for dog training",
    "makingOf.dogmentor.overview": "DogMentor is your AI-powered personal dog trainer. Get personalized advice on your dog's behavior, training and health with context-based responses from GPT-4.",
    "makingOf.dogmentor.features.chat": "Smart chat with GPT-4",
    "makingOf.dogmentor.features.training": "Personalized training guides",
    "makingOf.dogmentor.features.behavior": "Canine behavior analysis",
    "makingOf.dogmentor.features.personalized": "Responses adapted to your dog's profile",
    "makingOf.dogmentor.architecture.title": "Architecture",
    "makingOf.dogmentor.architecture.chat": "Chat system with contextual history",
    "makingOf.dogmentor.architecture.context": "Context API for dog profile",
    "makingOf.dogmentor.architecture.prompts": "Specialized prompts for dog training",
    "makingOf.dogmentor.screens.title": "Main Screens",
    "makingOf.dogmentor.screens.chat": "Chat with DogMentor assistant",
    "makingOf.dogmentor.screens.dogProfile": "Dog profile (breed, age, behavior)",
    "makingOf.dogmentor.screens.tips": "Tips and training guides",
    "makingOf.dogmentor.screens.settings": "Settings and preferences",

    // KetoRecipeLab
    "makingOf.ketorecipe.description": "Keto and Paleo recipe generator with AI",
    "makingOf.ketorecipe.overview": "KetoRecipeLab is a complete app for Keto and Paleo diets. Generate personalized recipes with AI, plan your weekly meals, calculate nutrition plans and save your favorites. With subscription for premium features.",
    "makingOf.ketorecipe.features.aiRecipes": "Recipe generation with GPT-4",
    "makingOf.ketorecipe.features.mealPlan": "Weekly meal planner",
    "makingOf.ketorecipe.features.nutrition": "Personalized nutrition plan calculation",
    "makingOf.ketorecipe.features.favorites": "Favorites system and recipe database",
    "makingOf.ketorecipe.architecture.title": "Architecture",
    "makingOf.ketorecipe.architecture.contexts": "4 Context Providers (Language, Favorites, Subscription, DietType)",
    "makingOf.ketorecipe.architecture.services": "Services Layer (MealPlan, NutritionPlan)",
    "makingOf.ketorecipe.architecture.backend": "PHP/MySQL backend for recipe storage",
    "makingOf.ketorecipe.screens.title": "Main Screens",
    "makingOf.ketorecipe.screens.home": "AI recipe generator",
    "makingOf.ketorecipe.screens.explore": "Explore recipes with filters",
    "makingOf.ketorecipe.screens.favorites": "Saved favorite recipes",
    "makingOf.ketorecipe.screens.nutrition": "Personalized nutrition plan",
    "makingOf.ketorecipe.screens.profile": "Profile and subscription",

    // Work Ti
    "makingOf.workti.description": "Smart time tracking for teams and freelancers",
    "makingOf.workti.overview": "Work Ti is a time tracking app designed for freelancers and teams. Record worked hours, manage projects, generate detailed reports and export data for billing.",
    "makingOf.workti.features.tracking": "Real-time time tracking",
    "makingOf.workti.features.reports": "Detailed reports with charts",
    "makingOf.workti.features.projects": "Multiple project management",
    "makingOf.workti.features.export": "Export to CSV for billing",
    "makingOf.workti.architecture.title": "Architecture",
    "makingOf.workti.architecture.timeTracking": "Stopwatch system with second precision",
    "makingOf.workti.architecture.localStorage": "AsyncStorage for data persistence",
    "makingOf.workti.architecture.charts": "Interactive charts with React Native Charts",
    "makingOf.workti.screens.title": "Main Screens",
    "makingOf.workti.screens.timer": "Tracking stopwatch",
    "makingOf.workti.screens.projects": "Active project list",
    "makingOf.workti.screens.reports": "Reports and statistics",
    "makingOf.workti.screens.settings": "Settings and export",

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
