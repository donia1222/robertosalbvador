import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, Link, useNavigate } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Analytics } from "@vercel/analytics/remix";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { HiMenu, HiX, HiHome, HiSparkles, HiFolder, HiCubeTransparent, HiMail, HiPhone, HiDownload, HiLocationMarker } from "react-icons/hi";
import { SiReact, SiNodedotjs, SiOpenai, SiApple, SiAndroid, SiNextdotjs, SiTypescript, SiExpo, SiSwift, SiXcode, SiFirebase, SiGraphql, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaMobileAlt, FaGithub } from "react-icons/fa";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, _loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const ThemeContext = createContext(void 0);
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);
  const toggleTheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme, mounted }, children });
}
const LanguageContext = createContext(void 0);
const translations = {
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
    // Making Of Banner
    "makingOfBanner.tag": "Detrás de Escena",
    "makingOfBanner.subtitle": "Descubre el proceso creativo, herramientas y tecnologías detrás del desarrollo de estas aplicaciones",
    "makingOfBanner.button": "Explora el Proceso",
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
    "error.error": "Error"
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
    // Making Of Banner
    "makingOfBanner.tag": "Hinter den Kulissen",
    "makingOfBanner.subtitle": "Entdecken Sie den kreativen Prozess, die Werkzeuge und Technologien hinter der Entwicklung dieser Anwendungen",
    "makingOfBanner.button": "Erkunden Sie den Prozess",
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
    "error.error": "Fehler"
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
    // Making Of Banner
    "makingOfBanner.tag": "Behind the Scenes",
    "makingOfBanner.subtitle": "Discover the creative process, tools, and technologies behind the development of these applications",
    "makingOfBanner.button": "Explore the Journey",
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
    "error.error": "Error"
  }
};
function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("de");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    var _a;
    const savedLanguage = localStorage.getItem("portfolio-language");
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "de" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    } else {
      const browserLang = navigator.language || ((_a = navigator.languages) == null ? void 0 : _a[0]) || "en";
      const langCode = browserLang.toLowerCase().split("-")[0];
      if (langCode === "es" || langCode === "de" || langCode === "en") {
        setLanguageState(langCode);
      } else {
        setLanguageState("en");
      }
    }
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-language", language);
      document.documentElement.setAttribute("lang", language);
    }
  }, [language, mounted]);
  const setLanguage = (lang) => {
    setLanguageState(lang);
  };
  const t = (key) => {
    return translations[language][key] || key;
  };
  return /* @__PURE__ */ jsx(LanguageContext.Provider, { value: { language, setLanguage, t, mounted }, children });
}
function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === void 0) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
const COLOR_SCHEMES = {
  orange: {
    name: "Orange",
    primary: "#ff6b35",
    secondary: "#ff8c42",
    accent: "#ffa366"
  },
  blue: {
    name: "Blue",
    primary: "#2563eb",
    // Azul vibrante
    secondary: "#3b82f6",
    // Azul medio
    accent: "#60a5fa"
    // Azul claro
  },
  green: {
    name: "Green",
    primary: "#10b981",
    // Verde esmeralda
    secondary: "#34d399",
    // Verde claro
    accent: "#6ee7b7"
    // Verde pastel
  },
  purple: {
    name: "Purple",
    primary: "#8b5cf6",
    // Púrpura vibrante
    secondary: "#a78bfa",
    // Púrpura claro
    accent: "#c4b5fd"
    // Lavanda
  },
  red: {
    name: "Red",
    primary: "#ef4444",
    // Rojo vibrante
    secondary: "#f87171",
    // Rojo cálido
    accent: "#fca5a5"
    // Rojo claro
  },
  cyan: {
    name: "Cyan",
    primary: "#06b6d4",
    // Cyan vibrante
    secondary: "#22d3ee",
    // Cyan brillante
    accent: "#67e8f9"
    // Cyan claro
  },
  pink: {
    name: "Pink",
    primary: "#ec4899",
    // Rosa vibrante
    secondary: "#f472b6",
    // Rosa cálido
    accent: "#f9a8d4"
    // Rosa claro
  }
};
const ColorContext = createContext(void 0);
function ColorProvider({ children }) {
  const [color, setColorState] = useState("orange");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const savedColor = localStorage.getItem("portfolio-color");
    if (savedColor && COLOR_SCHEMES[savedColor]) {
      setColorState(savedColor);
    }
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-color", color);
      const scheme = COLOR_SCHEMES[color];
      document.documentElement.style.setProperty("--color-primary", scheme.primary);
      document.documentElement.style.setProperty("--color-secondary", scheme.secondary);
      document.documentElement.style.setProperty("--color-accent", scheme.accent);
      document.documentElement.style.setProperty(
        "--shadow-glow",
        `0 0 40px ${scheme.primary}66`
      );
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", scheme.primary);
      }
    }
  }, [color, mounted]);
  const setColor = (newColor) => {
    if (COLOR_SCHEMES[newColor]) {
      setColorState(newColor);
    }
  };
  return /* @__PURE__ */ jsx(ColorContext.Provider, { value: { color, setColor, mounted, colors: COLOR_SCHEMES }, children });
}
function useColor() {
  const context = useContext(ColorContext);
  if (context === void 0) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
const pageLoader = "_pageLoader_1kt76_3";
const fadeOut = "_fadeOut_1kt76_15";
const backgroundImage$1 = "_backgroundImage_1kt76_21";
const image = "_image_1kt76_30";
const overlay = "_overlay_1kt76_51";
const content$2 = "_content_1kt76_77";
const name = "_name_1kt76_89";
const nameChar = "_nameChar_1kt76_107";
const nameSpace = "_nameSpace_1kt76_113";
const divider = "_divider_1kt76_132";
const title$7 = "_title_1kt76_156";
const progressBar = "_progressBar_1kt76_181";
const progressFill = "_progressFill_1kt76_192";
const particles$3 = "_particles_1kt76_215";
const particle$4 = "_particle_1kt76_215";
const styles$g = {
  pageLoader,
  fadeOut,
  backgroundImage: backgroundImage$1,
  image,
  overlay,
  content: content$2,
  name,
  nameChar,
  nameSpace,
  divider,
  title: title$7,
  progressBar,
  progressFill,
  particles: particles$3,
  particle: particle$4
};
function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut2, setFadeOut] = useState(false);
  useEffect(() => {
    document.documentElement.style.setProperty("--initial-display", "block");
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);
  if (!isLoading) return null;
  return /* @__PURE__ */ jsxs("div", { className: `${styles$g.pageLoader} ${fadeOut2 ? styles$g.fadeOut : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: styles$g.backgroundImage, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/15_07_35.png",
        alt: "Roberto Salvador",
        className: styles$g.image
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: styles$g.overlay }),
    /* @__PURE__ */ jsxs("div", { className: styles$g.content, children: [
      /* @__PURE__ */ jsxs("h1", { className: styles$g.name, children: [
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "0.5s" }, children: "R" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "0.6s" }, children: "o" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "0.7s" }, children: "b" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "0.8s" }, children: "e" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "0.9s" }, children: "r" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.0s" }, children: "t" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.1s" }, children: "o" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameSpace, children: " " }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.2s" }, children: "S" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.3s" }, children: "a" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.4s" }, children: "l" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.5s" }, children: "v" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.6s" }, children: "a" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.7s" }, children: "d" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.8s" }, children: "o" }),
        /* @__PURE__ */ jsx("span", { className: styles$g.nameChar, style: { animationDelay: "1.9s" }, children: "r" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$g.divider }),
      /* @__PURE__ */ jsx("p", { className: styles$g.title, children: "Full-Stack Developer" }),
      /* @__PURE__ */ jsx("div", { className: styles$g.progressBar, children: /* @__PURE__ */ jsx("div", { className: styles$g.progressFill }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$g.particles, children: [...Array(20)].map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: styles$g.particle,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }
      },
      i
    )) })
  ] });
}
const styles$f = "/assets/global-BzwcOZu3.css";
const themeScript = `
  (function() {
    const theme = localStorage.getItem('portfolio-theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
`;
const colorScript = `
  (function() {
    const colors = {
      orange: { primary: '#ff6b35', secondary: '#ff8c42', accent: '#ffa366' },
      blue: { primary: '#2563eb', secondary: '#3b82f6', accent: '#60a5fa' },
      green: { primary: '#10b981', secondary: '#34d399', accent: '#6ee7b7' },
      purple: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#c4b5fd' },
      red: { primary: '#ef4444', secondary: '#f87171', accent: '#fca5a5' },
      cyan: { primary: '#06b6d4', secondary: '#22d3ee', accent: '#67e8f9' },
      pink: { primary: '#ec4899', secondary: '#f472b6', accent: '#f9a8d4' }
    };
    const savedColor = localStorage.getItem('portfolio-color') || 'orange';
    const scheme = colors[savedColor] || colors.orange;
    document.documentElement.style.setProperty('--color-primary', scheme.primary);
    document.documentElement.style.setProperty('--color-secondary', scheme.secondary);
    document.documentElement.style.setProperty('--color-accent', scheme.accent);
    document.documentElement.style.setProperty('--shadow-glow', '0 0 40px ' + scheme.primary + '66');

    // Actualizar meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', scheme.primary);
    }
  })();
`;
const loaderScript = `
  (function() {
    document.documentElement.style.setProperty('--initial-display', 'none');
  })();
`;
const links$1 = () => [
  { rel: "icon", type: "image/jpg", href: "/favicon.jpg" },
  { rel: "apple-touch-icon", href: "/favicon.jpg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Sora:wght@300;400;500;600;700;800&display=swap"
  },
  { rel: "stylesheet", href: styles$f }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "de", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: themeScript } }),
      /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: colorScript } }),
      /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: loaderScript } }),
      /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
          #root-content {
            display: var(--initial-display, block);
          }
        ` } })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("div", { id: "root-content", children }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Analytics, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(LanguageProvider, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(ColorProvider, { children: [
    /* @__PURE__ */ jsx(PageLoader, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] }) }) });
}
function ErrorBoundary() {
  const error = useRouteError();
  const lang = typeof window !== "undefined" ? localStorage.getItem("portfolio-language") || "de" : "de";
  const translations2 = {
    es: {
      oops: "¡Ups!",
      unexpected: "Ha ocurrido un error inesperado.",
      notFound: "La página que buscas no existe.",
      error: "Error"
    },
    de: {
      oops: "Hoppla!",
      unexpected: "Ein unerwarteter Fehler ist aufgetreten.",
      notFound: "Die gesuchte Seite existiert nicht.",
      error: "Fehler"
    },
    en: {
      oops: "Oops!",
      unexpected: "An unexpected error has occurred.",
      notFound: "The page you are looking for does not exist.",
      error: "Error"
    }
  };
  const t = translations2[lang] || translations2.de;
  let message = t.oops;
  let details = t.unexpected;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : t.error;
    details = error.status === 404 ? t.notFound : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", { style: { padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx("h1", { children: message }),
    /* @__PURE__ */ jsx("p", { children: details })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: App,
  links: links$1
}, Symbol.toStringTag, { value: "Module" }));
const page = "_page_1p1s2_1";
const main = "_main_1p1s2_7";
const hero$1 = "_hero_1p1s2_12";
const heroContent = "_heroContent_1p1s2_26";
const fadeIn$1 = "_fadeIn_1p1s2_1";
const greeting$1 = "_greeting_1p1s2_32";
const title$6 = "_title_1p1s2_44";
const subtitle$2 = "_subtitle_1p1s2_59";
const description$3 = "_description_1p1s2_67";
const cta$1 = "_cta_1p1s2_75";
const home_module = {
  page,
  main,
  hero: hero$1,
  heroContent,
  fadeIn: fadeIn$1,
  greeting: greeting$1,
  title: title$6,
  subtitle: subtitle$2,
  description: description$3,
  cta: cta$1
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cta: cta$1,
  default: home_module,
  description: description$3,
  fadeIn: fadeIn$1,
  greeting: greeting$1,
  hero: hero$1,
  heroContent,
  main,
  page,
  subtitle: subtitle$2,
  title: title$6
}, Symbol.toStringTag, { value: "Module" }));
const wheelContainer = "_wheelContainer_1qnet_2";
const centerDisplay = "_centerDisplay_1qnet_13";
const centerIcon = "_centerIcon_1qnet_33";
const centerTitle = "_centerTitle_1qnet_41";
const centerPlaceholder = "_centerPlaceholder_1qnet_48";
const placeholderIcon = "_placeholderIcon_1qnet_55";
const placeholderText = "_placeholderText_1qnet_60";
const wheel = "_wheel_1qnet_2";
const appItem = "_appItem_1qnet_84";
const appItemSelected = "_appItemSelected_1qnet_121";
const appIcon = "_appIcon_1qnet_126";
const orbitRing = "_orbitRing_1qnet_135";
const styles$e = {
  wheelContainer,
  centerDisplay,
  centerIcon,
  centerTitle,
  centerPlaceholder,
  placeholderIcon,
  placeholderText,
  wheel,
  appItem,
  appItemSelected,
  appIcon,
  orbitRing
};
function AppWheel({ apps, selectedApp, onAppClick }) {
  const [radius, setRadius] = useState(220);
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth <= 480) {
        setRadius(130);
      } else if (window.innerWidth <= 768) {
        setRadius(150);
      } else {
        setRadius(220);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: styles$e.wheelContainer, children: [
    /* @__PURE__ */ jsx("div", { className: styles$e.centerDisplay, children: selectedApp ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: selectedApp.icon,
          alt: selectedApp.name,
          className: styles$e.centerIcon
        }
      ),
      /* @__PURE__ */ jsx("h3", { className: styles$e.centerTitle, children: selectedApp.name })
    ] }) : /* @__PURE__ */ jsxs("div", { className: styles$e.centerPlaceholder, children: [
      /* @__PURE__ */ jsx("div", { className: styles$e.placeholderIcon, children: "📱" }),
      /* @__PURE__ */ jsx("p", { className: styles$e.placeholderText, children: "Selecciona una app" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: styles$e.wheel, children: apps.map((app, index) => {
      const anglePerApp = 360 / apps.length;
      const angle = index * anglePerApp;
      const x = Math.sin(angle * Math.PI / 180) * radius;
      const y = -Math.cos(angle * Math.PI / 180) * radius;
      const isSelected = (selectedApp == null ? void 0 : selectedApp.id) === app.id;
      return /* @__PURE__ */ jsx(
        "button",
        {
          className: `${styles$e.appItem} ${isSelected ? styles$e.appItemSelected : ""}`,
          style: {
            "--x": `${x}px`,
            "--y": `${y}px`
          },
          onClick: () => onAppClick(app),
          children: /* @__PURE__ */ jsx("img", { src: app.icon, alt: app.name, className: styles$e.appIcon })
        },
        app.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: styles$e.orbitRing })
  ] });
}
const modalOverlay = "_modalOverlay_bhg7s_2";
const modalContent$1 = "_modalContent_bhg7s_25";
const closeButton$2 = "_closeButton_bhg7s_72";
const modalHeader = "_modalHeader_bhg7s_104";
const iconWrapper$2 = "_iconWrapper_bhg7s_115";
const icon$2 = "_icon_bhg7s_115";
const iconGlow$1 = "_iconGlow_bhg7s_130";
const appTitle = "_appTitle_bhg7s_151";
const appDescription = "_appDescription_bhg7s_159";
const platforms$1 = "_platforms_bhg7s_167";
const platformBadge = "_platformBadge_bhg7s_174";
const platformIcon$1 = "_platformIcon_bhg7s_187";
const modalBody$1 = "_modalBody_bhg7s_193";
const section$1 = "_section_bhg7s_201";
const sectionTitle = "_sectionTitle_bhg7s_207";
const sectionIcon = "_sectionIcon_bhg7s_217";
const sectionText = "_sectionText_bhg7s_221";
const techGrid$1 = "_techGrid_bhg7s_229";
const techBadge$1 = "_techBadge_bhg7s_235";
const featureList = "_featureList_bhg7s_254";
const featureItem = "_featureItem_bhg7s_263";
const featureBullet = "_featureBullet_bhg7s_272";
const integrationGrid = "_integrationGrid_bhg7s_279";
const integrationBadge = "_integrationBadge_bhg7s_285";
const linksGrid = "_linksGrid_bhg7s_304";
const linkButton = "_linkButton_bhg7s_310";
const linkIcon = "_linkIcon_bhg7s_333";
const styles$d = {
  modalOverlay,
  modalContent: modalContent$1,
  closeButton: closeButton$2,
  modalHeader,
  iconWrapper: iconWrapper$2,
  icon: icon$2,
  iconGlow: iconGlow$1,
  appTitle,
  appDescription,
  platforms: platforms$1,
  platformBadge,
  platformIcon: platformIcon$1,
  modalBody: modalBody$1,
  section: section$1,
  sectionTitle,
  sectionIcon,
  sectionText,
  techGrid: techGrid$1,
  techBadge: techBadge$1,
  featureList,
  featureItem,
  featureBullet,
  integrationGrid,
  integrationBadge,
  linksGrid,
  linkButton,
  linkIcon
};
function AppModal({ app, onClose }) {
  const { t } = useLanguage();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  return /* @__PURE__ */ jsx("div", { className: styles$d.modalOverlay, onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: styles$d.modalContent, onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx("button", { className: styles$d.closeButton, onClick: onClose, children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: styles$d.modalHeader, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$d.iconWrapper, children: [
        /* @__PURE__ */ jsx("img", { src: app.icon, alt: app.name, className: styles$d.icon }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: styles$d.iconGlow,
            style: { backgroundColor: app.color }
          }
        )
      ] }),
      /* @__PURE__ */ jsx("h2", { className: styles$d.appTitle, children: app.name }),
      /* @__PURE__ */ jsx("p", { className: styles$d.appDescription, children: t(app.descriptionKey) }),
      /* @__PURE__ */ jsxs("div", { className: styles$d.platforms, children: [
        app.platforms.includes("ios") && /* @__PURE__ */ jsxs("div", { className: styles$d.platformBadge, children: [
          /* @__PURE__ */ jsx("svg", { className: styles$d.platformIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" }) }),
          "iOS"
        ] }),
        app.platforms.includes("android") && /* @__PURE__ */ jsxs("div", { className: styles$d.platformBadge, children: [
          /* @__PURE__ */ jsx("svg", { className: styles$d.platformIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" }) }),
          "Android"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$d.modalBody, children: [
      /* @__PURE__ */ jsxs("section", { className: styles$d.section, children: [
        /* @__PURE__ */ jsxs("h3", { className: styles$d.sectionTitle, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.sectionIcon, children: "📋" }),
          t("makingOf.modal.overview")
        ] }),
        /* @__PURE__ */ jsx("p", { className: styles$d.sectionText, children: t(app.overviewKey) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: styles$d.section, children: [
        /* @__PURE__ */ jsxs("h3", { className: styles$d.sectionTitle, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.sectionIcon, children: "⚙️" }),
          t("makingOf.modal.techStack")
        ] }),
        /* @__PURE__ */ jsx("div", { className: styles$d.techGrid, children: app.techStack.map((tech) => /* @__PURE__ */ jsx("div", { className: styles$d.techBadge, children: tech }, tech)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: styles$d.section, children: [
        /* @__PURE__ */ jsxs("h3", { className: styles$d.sectionTitle, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.sectionIcon, children: "✨" }),
          t("makingOf.modal.features")
        ] }),
        /* @__PURE__ */ jsx("ul", { className: styles$d.featureList, children: app.features.map((featureKey) => /* @__PURE__ */ jsxs("li", { className: styles$d.featureItem, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.featureBullet, children: "→" }),
          t(featureKey)
        ] }, featureKey)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: styles$d.section, children: [
        /* @__PURE__ */ jsxs("h3", { className: styles$d.sectionTitle, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.sectionIcon, children: "🏗️" }),
          t(app.architecture.titleKey)
        ] }),
        /* @__PURE__ */ jsx("ul", { className: styles$d.featureList, children: app.architecture.items.map((itemKey) => /* @__PURE__ */ jsxs("li", { className: styles$d.featureItem, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.featureBullet, children: "→" }),
          t(itemKey)
        ] }, itemKey)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: styles$d.section, children: [
        /* @__PURE__ */ jsxs("h3", { className: styles$d.sectionTitle, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.sectionIcon, children: "📱" }),
          t(app.screens.titleKey)
        ] }),
        /* @__PURE__ */ jsx("ul", { className: styles$d.featureList, children: app.screens.items.map((itemKey) => /* @__PURE__ */ jsxs("li", { className: styles$d.featureItem, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.featureBullet, children: "→" }),
          t(itemKey)
        ] }, itemKey)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: styles$d.section, children: [
        /* @__PURE__ */ jsxs("h3", { className: styles$d.sectionTitle, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.sectionIcon, children: "🔌" }),
          t("makingOf.modal.integrations")
        ] }),
        /* @__PURE__ */ jsx("div", { className: styles$d.integrationGrid, children: app.integrations.map((integration) => /* @__PURE__ */ jsx("div", { className: styles$d.integrationBadge, children: integration }, integration)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: styles$d.section, children: [
        /* @__PURE__ */ jsxs("h3", { className: styles$d.sectionTitle, children: [
          /* @__PURE__ */ jsx("span", { className: styles$d.sectionIcon, children: "🔗" }),
          t("makingOf.modal.links")
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$d.linksGrid, children: [
          app.url && /* @__PURE__ */ jsxs(
            "a",
            {
              href: app.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: styles$d.linkButton,
              children: [
                /* @__PURE__ */ jsx("svg", { className: styles$d.linkIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" }) }),
                t("makingOf.modal.website")
              ]
            }
          ),
          app.iosUrl && /* @__PURE__ */ jsxs(
            "a",
            {
              href: app.iosUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: styles$d.linkButton,
              children: [
                /* @__PURE__ */ jsx("svg", { className: styles$d.linkIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" }) }),
                "App Store"
              ]
            }
          ),
          app.androidUrl && /* @__PURE__ */ jsxs(
            "a",
            {
              href: app.androidUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: styles$d.linkButton,
              children: [
                /* @__PURE__ */ jsx("svg", { className: styles$d.linkIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" }) }),
                "Google Play"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
const backButton = "_backButton_kj7ee_2";
const iconWrapper$1 = "_iconWrapper_kj7ee_40";
const icon$1 = "_icon_kj7ee_40";
const text$1 = "_text_kj7ee_60";
const glow = "_glow_kj7ee_66";
const styles$c = {
  backButton,
  iconWrapper: iconWrapper$1,
  icon: icon$1,
  text: text$1,
  glow
};
function BackButton() {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxs(Link, { to: "/#apps", className: styles$c.backButton, children: [
    /* @__PURE__ */ jsx("div", { className: styles$c.iconWrapper, children: /* @__PURE__ */ jsx("svg", { className: styles$c.icon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }),
    /* @__PURE__ */ jsx("span", { className: styles$c.text, children: t("makingOf.back") }),
    /* @__PURE__ */ jsx("div", { className: styles$c.glow })
  ] });
}
const appsData = [
  {
    id: "buyvoice",
    name: "BuyVoice",
    descriptionKey: "makingOf.buyvoice.description",
    icon: "/app-icon.png",
    color: "#ff6b35",
    platforms: ["ios", "android"],
    url: "https://www.buyvoice.app",
    iosUrl: "https://apps.apple.com/app/voice-shopping-list/id6505125372",
    androidUrl: "https://play.google.com/store/apps/details?id=com.lwebch.VoiceList",
    overviewKey: "makingOf.buyvoice.overview",
    techStack: ["React Native", "Expo SDK ~54", "OpenAI GPT-4", "AsyncStorage", "TypeScript"],
    features: [
      "makingOf.buyvoice.features.voice",
      "makingOf.buyvoice.features.ai",
      "makingOf.buyvoice.features.offline",
      "makingOf.buyvoice.features.multilang"
    ],
    architecture: {
      titleKey: "makingOf.buyvoice.architecture.title",
      items: [
        "makingOf.buyvoice.architecture.contextApi",
        "makingOf.buyvoice.architecture.localStorage",
        "makingOf.buyvoice.architecture.aiIntegration"
      ]
    },
    screens: {
      titleKey: "makingOf.buyvoice.screens.title",
      items: [
        "makingOf.buyvoice.screens.home",
        "makingOf.buyvoice.screens.lists",
        "makingOf.buyvoice.screens.settings"
      ]
    },
    integrations: ["OpenAI API", "Expo Voice Recognition", "Local Storage"]
  },
  {
    id: "hundezonen",
    name: "Hundezonen",
    descriptionKey: "makingOf.hundezonen.description",
    icon: "/hnde.png",
    color: "#4a90e2",
    platforms: ["ios", "android"],
    url: "https://www.hundezonen.ch",
    iosUrl: "https://apps.apple.com/us/app/hundezonen/id6745336299",
    androidUrl: "https://play.google.com/store/apps/details?id=com.lwebch.HundezonenSchweiz&pli=1",
    overviewKey: "makingOf.hundezonen.overview",
    techStack: ["React Native", "Expo SDK ~54", "React Native Maps", "Geolocation API", "PHP/MySQL Backend"],
    features: [
      "makingOf.hundezonen.features.map",
      "makingOf.hundezonen.features.gps",
      "makingOf.hundezonen.features.filters",
      "makingOf.hundezonen.features.offline"
    ],
    architecture: {
      titleKey: "makingOf.hundezonen.architecture.title",
      items: [
        "makingOf.hundezonen.architecture.maps",
        "makingOf.hundezonen.architecture.geolocation",
        "makingOf.hundezonen.architecture.backend"
      ]
    },
    screens: {
      titleKey: "makingOf.hundezonen.screens.title",
      items: [
        "makingOf.hundezonen.screens.map",
        "makingOf.hundezonen.screens.list",
        "makingOf.hundezonen.screens.details",
        "makingOf.hundezonen.screens.favorites"
      ]
    },
    integrations: ["Google Maps API", "PHP Backend", "MySQL Database", "Geolocation Services"]
  },
  {
    id: "foodscan",
    name: "FoodScan AI",
    descriptionKey: "makingOf.foodscan.description",
    icon: "/foof.png",
    color: "#00c853",
    platforms: ["ios", "android"],
    url: "https://www.foodscan-ai.com",
    iosUrl: "https://apps.apple.com/us/app/foodscan-ai/id6472478688",
    androidUrl: "https://play.google.com/store/apps/details?id=com.lwebch.foodmentoai",
    overviewKey: "makingOf.foodscan.overview",
    techStack: ["React Native", "Expo SDK ~54", "OpenAI GPT-4 Vision", "Camera API", "AsyncStorage"],
    features: [
      "makingOf.foodscan.features.camera",
      "makingOf.foodscan.features.nutrition",
      "makingOf.foodscan.features.history",
      "makingOf.foodscan.features.multilang"
    ],
    architecture: {
      titleKey: "makingOf.foodscan.architecture.title",
      items: [
        "makingOf.foodscan.architecture.vision",
        "makingOf.foodscan.architecture.imageProcessing",
        "makingOf.foodscan.architecture.caching"
      ]
    },
    screens: {
      titleKey: "makingOf.foodscan.screens.title",
      items: [
        "makingOf.foodscan.screens.camera",
        "makingOf.foodscan.screens.analysis",
        "makingOf.foodscan.screens.history",
        "makingOf.foodscan.screens.profile"
      ]
    },
    integrations: ["OpenAI Vision API", "Expo Camera", "Expo Image Picker", "AsyncStorage"]
  },
  {
    id: "dogmentor",
    name: "DogMentor KI",
    descriptionKey: "makingOf.dogmentor.description",
    icon: "/dog.jpg",
    color: "#ff9800",
    platforms: ["ios"],
    url: "https://dog-mentor.com",
    iosUrl: "https://apps.apple.com/us/app/dogmentor/id6467635587",
    overviewKey: "makingOf.dogmentor.overview",
    techStack: ["React Native", "Expo SDK ~54", "OpenAI GPT-4", "Context API", "AsyncStorage"],
    features: [
      "makingOf.dogmentor.features.chat",
      "makingOf.dogmentor.features.training",
      "makingOf.dogmentor.features.behavior",
      "makingOf.dogmentor.features.personalized"
    ],
    architecture: {
      titleKey: "makingOf.dogmentor.architecture.title",
      items: [
        "makingOf.dogmentor.architecture.chat",
        "makingOf.dogmentor.architecture.context",
        "makingOf.dogmentor.architecture.prompts"
      ]
    },
    screens: {
      titleKey: "makingOf.dogmentor.screens.title",
      items: [
        "makingOf.dogmentor.screens.chat",
        "makingOf.dogmentor.screens.dogProfile",
        "makingOf.dogmentor.screens.tips",
        "makingOf.dogmentor.screens.settings"
      ]
    },
    integrations: ["OpenAI Chat API", "AsyncStorage", "Push Notifications"]
  },
  {
    id: "ketorecipe",
    name: "KetoRecipeLab",
    descriptionKey: "makingOf.ketorecipe.description",
    icon: "/iconoapp.png",
    color: "#8e24aa",
    platforms: ["ios"],
    url: "https://keto-recipe.app",
    iosUrl: "https://apps.apple.com/us/app/ketorecipelab/id6757017200",
    overviewKey: "makingOf.ketorecipe.overview",
    techStack: ["React Native", "Expo SDK ~54", "OpenAI GPT-4", "RevenueCat", "PHP/MySQL Backend"],
    features: [
      "makingOf.ketorecipe.features.aiRecipes",
      "makingOf.ketorecipe.features.mealPlan",
      "makingOf.ketorecipe.features.nutrition",
      "makingOf.ketorecipe.features.favorites"
    ],
    architecture: {
      titleKey: "makingOf.ketorecipe.architecture.title",
      items: [
        "makingOf.ketorecipe.architecture.contexts",
        "makingOf.ketorecipe.architecture.services",
        "makingOf.ketorecipe.architecture.backend"
      ]
    },
    screens: {
      titleKey: "makingOf.ketorecipe.screens.title",
      items: [
        "makingOf.ketorecipe.screens.home",
        "makingOf.ketorecipe.screens.explore",
        "makingOf.ketorecipe.screens.favorites",
        "makingOf.ketorecipe.screens.nutrition",
        "makingOf.ketorecipe.screens.profile"
      ]
    },
    integrations: ["OpenAI API", "RevenueCat", "PHP Backend", "MySQL Database", "Image Upload"]
  },
  {
    id: "workti",
    name: "Work Ti",
    descriptionKey: "makingOf.workti.description",
    icon: "/workti.png",
    color: "#1976d2",
    platforms: ["ios"],
    url: "https://www.workti.app",
    iosUrl: "https://apps.apple.com/us/app/vixtime/id6745336262",
    overviewKey: "makingOf.workti.overview",
    techStack: ["React Native", "Expo SDK ~54", "AsyncStorage", "Charts Library", "Date Management"],
    features: [
      "makingOf.workti.features.tracking",
      "makingOf.workti.features.reports",
      "makingOf.workti.features.projects",
      "makingOf.workti.features.export"
    ],
    architecture: {
      titleKey: "makingOf.workti.architecture.title",
      items: [
        "makingOf.workti.architecture.timeTracking",
        "makingOf.workti.architecture.localStorage",
        "makingOf.workti.architecture.charts"
      ]
    },
    screens: {
      titleKey: "makingOf.workti.screens.title",
      items: [
        "makingOf.workti.screens.timer",
        "makingOf.workti.screens.projects",
        "makingOf.workti.screens.reports",
        "makingOf.workti.screens.settings"
      ]
    },
    integrations: ["AsyncStorage", "React Native Charts", "Date-fns", "Export to CSV"]
  }
];
const pageWrapper = "_pageWrapper_1xki8_2";
const backgroundGradient = "_backgroundGradient_1xki8_12";
const particlesContainer = "_particlesContainer_1xki8_27";
const particle$3 = "_particle_1xki8_27";
const contentWrapper = "_contentWrapper_1xki8_58";
const header$5 = "_header_1xki8_70";
const badge$5 = "_badge_1xki8_75";
const badgeIcon$4 = "_badgeIcon_1xki8_90";
const badgeText$5 = "_badgeText_1xki8_94";
const title$5 = "_title_1xki8_99";
const highlight$5 = "_highlight_1xki8_107";
const description$2 = "_description_1xki8_114";
const styles$b = {
  pageWrapper,
  backgroundGradient,
  particlesContainer,
  particle: particle$3,
  contentWrapper,
  header: header$5,
  badge: badge$5,
  badgeIcon: badgeIcon$4,
  badgeText: badgeText$5,
  title: title$5,
  highlight: highlight$5,
  description: description$2
};
function MakingOfPage() {
  const { t } = useLanguage();
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleAppClick = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$b.pageWrapper, children: [
    /* @__PURE__ */ jsx("div", { className: styles$b.backgroundGradient }),
    /* @__PURE__ */ jsx("div", { className: styles$b.particlesContainer, children: [...Array(20)].map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: styles$b.particle,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 10}s`
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsx(BackButton, {}),
    /* @__PURE__ */ jsxs("div", { className: styles$b.contentWrapper, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$b.header, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$b.badge, children: [
          /* @__PURE__ */ jsx("span", { className: styles$b.badgeIcon, children: "🎬" }),
          /* @__PURE__ */ jsx("span", { className: styles$b.badgeText, children: t("makingOf.badge") })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: styles$b.title, children: [
          t("makingOf.title"),
          " ",
          /* @__PURE__ */ jsx("span", { className: styles$b.highlight, children: t("makingOf.subtitle") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: styles$b.description, children: t("makingOf.description") })
      ] }),
      /* @__PURE__ */ jsx(
        AppWheel,
        {
          apps: appsData,
          selectedApp,
          onAppClick: handleAppClick
        }
      )
    ] }),
    showModal && selectedApp && /* @__PURE__ */ jsx(AppModal, { app: selectedApp, onClose: handleCloseModal })
  ] });
}
const meta$1 = () => {
  return [
    { title: "Making Of - Apps | Roberto Salvador" },
    {
      name: "description",
      content: "Descubre cómo fueron creadas mis aplicaciones móviles. Arquitectura, tecnologías y proceso de desarrollo."
    },
    { property: "og:title", content: "Making Of - Apps | Roberto Salvador" },
    { property: "og:description", content: "Descubre cómo fueron creadas mis aplicaciones móviles" },
    { property: "og:type", content: "website" }
  ];
};
function MakingOf() {
  return /* @__PURE__ */ jsx(MakingOfPage, {});
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MakingOf,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const header$4 = "_header_g712t_1";
const navbar = "_navbar_g712t_23";
const borderGlow = "_borderGlow_g712t_48";
const container$4 = "_container_g712t_77";
const logo = "_logo_g712t_88";
const logoContainer = "_logoContainer_g712t_94";
const logoText = "_logoText_g712t_100";
const logoSubtitle = "_logoSubtitle_g712t_113";
const cursor$1 = "_cursor_g712t_131";
const menuButton = "_menuButton_g712t_179";
const menuIcon = "_menuIcon_g712t_198";
const menuModal = "_menuModal_g712t_205";
const menuModalOpen = "_menuModalOpen_g712t_214";
const menuBackground = "_menuBackground_g712t_220";
const menuBackgroundImage = "_menuBackgroundImage_g712t_226";
const menuBackgroundActive = "_menuBackgroundActive_g712t_238";
const menuOverlay = "_menuOverlay_g712t_243";
const closeButton$1 = "_closeButton_g712t_256";
const closeIcon = "_closeIcon_g712t_287";
const menuContent = "_menuContent_g712t_298";
const menuLogo = "_menuLogo_g712t_311";
const menuLogoText = "_menuLogoText_g712t_327";
const menuLogoSubtitle = "_menuLogoSubtitle_g712t_340";
const menuNav = "_menuNav_g712t_348";
const menuLink = "_menuLink_g712t_357";
const menuLinkActive = "_menuLinkActive_g712t_399";
const menuLinkIcon = "_menuLinkIcon_g712t_404";
const menuLinkText = "_menuLinkText_g712t_459";
const menuLinkArrow = "_menuLinkArrow_g712t_510";
const menuFooter = "_menuFooter_g712t_524";
const menuContactItem = "_menuContactItem_g712t_540";
const menuContactIcon = "_menuContactIcon_g712t_566";
const colorSelector = "_colorSelector_g712t_577";
const selectorLabel = "_selectorLabel_g712t_594";
const colorOptions = "_colorOptions_g712t_603";
const colorButton = "_colorButton_g712t_610";
const colorButtonActive = "_colorButtonActive_g712t_636";
const languageSelector$1 = "_languageSelector_g712t_659";
const languageOptions = "_languageOptions_g712t_676";
const languageButton = "_languageButton_g712t_683";
const languageButtonActive = "_languageButtonActive_g712t_703";
const transitionOverlay$1 = "_transitionOverlay_g712t_715";
const devLoader = "_devLoader_g712t_737";
const devLetter = "_devLetter_g712t_744";
const styles$a = {
  header: header$4,
  navbar,
  borderGlow,
  container: container$4,
  logo,
  logoContainer,
  logoText,
  logoSubtitle,
  cursor: cursor$1,
  menuButton,
  menuIcon,
  menuModal,
  menuModalOpen,
  menuBackground,
  menuBackgroundImage,
  menuBackgroundActive,
  menuOverlay,
  closeButton: closeButton$1,
  closeIcon,
  menuContent,
  menuLogo,
  menuLogoText,
  menuLogoSubtitle,
  menuNav,
  menuLink,
  menuLinkActive,
  menuLinkIcon,
  menuLinkText,
  menuLinkArrow,
  menuFooter,
  menuContactItem,
  menuContactIcon,
  colorSelector,
  selectorLabel,
  colorOptions,
  colorButton,
  colorButtonActive,
  languageSelector: languageSelector$1,
  languageOptions,
  languageButton,
  languageButtonActive,
  transitionOverlay: transitionOverlay$1,
  devLoader,
  devLetter
};
const handleDownloadVCard = () => {
  console.log("Iniciando descarga de la tarjeta de visita...");
  const imageUrl = "https://robertosalbvador.vercel.app/IMG_6514.jpeg";
  fetch(imageUrl).then((res) => {
    if (!res.ok) {
      throw new Error(`Error al obtener la imagen: ${res.statusText}`);
    }
    return res.blob();
  }).then((blob) => {
    const reader = new FileReader();
    reader.onloadend = function() {
      const base64data = reader.result.split(",")[1];
      console.log("Imagen convertida a Base64.");
      const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:Roberto Salvador
ORG:Roberto Salvador
ADR:;;Sevelen;St Gallen;;9475;Switzerland
TEL:0765608645
EMAIL:info@lweb.ch
URL:https://lweb.ch
PHOTO;ENCODING=b;TYPE=JPEG:${base64data}
END:VCARD`;
      const vCardBlob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" });
      const link2 = document.createElement("a");
      link2.href = URL.createObjectURL(vCardBlob);
      link2.download = "Roberto_Salvador.vcf";
      document.body.appendChild(link2);
      link2.click();
      document.body.removeChild(link2);
      console.log("Archivo .vcf descargado con imagen.");
    };
    reader.onerror = function(error) {
      console.error("Error al leer la imagen:", error);
      alert("Ocurrió un error al procesar la imagen para la tarjeta de visita.");
    };
    reader.readAsDataURL(blob);
  }).catch((error) => {
    console.error("Error al cargar la imagen:", error);
    alert("Ocurrió un error al descargar la tarjeta de visita. Se descargará sin imagen.");
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:Roberto Salvador
ORG:Roberto Salvador
ADR:;;Chalberweidstrasse 38;Sevelen;;9475;Switzerland
TEL:0765608645
EMAIL:info@lweb.ch
URL:https://lweb.ch
END:VCARD`;
    const vCardBlob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" });
    const link2 = document.createElement("a");
    link2.href = URL.createObjectURL(vCardBlob);
    link2.download = "Roberto_Salvador.vcf";
    document.body.appendChild(link2);
    link2.click();
    document.body.removeChild(link2);
    console.log("Archivo .vcf descargado sin imagen.");
  });
};
const navigationKeys = [
  { key: "nav.inicio", href: "#inicio", icon: HiHome },
  { key: "nav.servicios", href: "#servicios", icon: HiSparkles },
  { key: "nav.proyectos", href: "#proyectos", icon: HiFolder },
  { key: "nav.tech", href: "#tech", icon: HiCubeTransparent },
  { key: "nav.contacto", href: "#contacto", icon: HiMail }
];
const menuBackgrounds = [
  "/5_07_29.png",
  // Inicio
  "/5_07_29.png",
  // Servicios
  "/5_07_29.png",
  // Proyectos
  "/15_07_35.png",
  // Tech Stack
  "/15_07_35.png"
  // Contacto
];
function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { color, setColor, colors } = useColor();
  const [activeSection, setActiveSection] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isTypingSubtitle, setIsTypingSubtitle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navRef = useRef(null);
  const fullText = "Roberto Salvador";
  const fullSubtitle = "Full-Stack Developer";
  useEffect(() => {
    if (isTyping) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          setTimeout(() => setIsTypingSubtitle(true), 300);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [isTyping]);
  useEffect(() => {
    if (isTypingSubtitle) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullSubtitle.length) {
          setDisplayedSubtitle(fullSubtitle.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTypingSubtitle(false);
          clearInterval(typingInterval);
        }
      }, 80);
      return () => clearInterval(typingInterval);
    }
  }, [isTypingSubtitle]);
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationKeys.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section2 = document.getElementById(sections[i]);
        if (section2 && scrollPosition >= section2.offsetTop) {
          setActiveSection(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  const handleMenuClick = (href, index) => {
    setIsMenuOpen(false);
    setActiveSection(index);
    setIsTransitioning(true);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "auto" });
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }
    }, 800);
  };
  return /* @__PURE__ */ jsxs("header", { className: styles$a.header, children: [
    /* @__PURE__ */ jsxs("nav", { ref: navRef, className: styles$a.navbar, children: [
      /* @__PURE__ */ jsx("div", { className: styles$a.borderGlow }),
      /* @__PURE__ */ jsxs("div", { className: styles$a.container, children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: styles$a.logo, children: /* @__PURE__ */ jsxs("div", { className: styles$a.logoContainer, children: [
          /* @__PURE__ */ jsxs("span", { className: styles$a.logoText, children: [
            displayedText,
            isTyping && /* @__PURE__ */ jsx("span", { className: styles$a.cursor, children: "|" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: styles$a.logoSubtitle, children: [
            displayedSubtitle,
            isTypingSubtitle && /* @__PURE__ */ jsx("span", { className: styles$a.cursor, children: "|" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: styles$a.menuButton,
            onClick: () => setIsMenuOpen(true),
            "aria-label": "Abrir menú",
            children: /* @__PURE__ */ jsx(HiMenu, { className: styles$a.menuIcon })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `${styles$a.menuModal} ${isMenuOpen ? styles$a.menuModalOpen : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$a.menuBackground, children: [
        menuBackgrounds.map((bg, index) => /* @__PURE__ */ jsx(
          "img",
          {
            src: bg,
            alt: `Background ${index}`,
            className: `${styles$a.menuBackgroundImage} ${currentBackground === index ? styles$a.menuBackgroundActive : ""}`
          },
          bg
        )),
        /* @__PURE__ */ jsx("div", { className: styles$a.menuOverlay })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: styles$a.closeButton,
          onClick: () => setIsMenuOpen(false),
          "aria-label": "Cerrar menú",
          children: /* @__PURE__ */ jsx(HiX, { className: styles$a.closeIcon })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: styles$a.menuContent, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$a.menuLogo, children: [
          /* @__PURE__ */ jsx("span", { className: styles$a.menuLogoText, children: "Roberto Salvador" }),
          /* @__PURE__ */ jsx("span", { className: styles$a.menuLogoSubtitle, children: "React Native Specialist" })
        ] }),
        /* @__PURE__ */ jsx("nav", { className: styles$a.menuNav, children: navigationKeys.map((item, index) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleMenuClick(item.href, index),
              className: `${styles$a.menuLink} ${activeSection === index ? styles$a.menuLinkActive : ""}`,
              style: { animationDelay: `${0.2 + index * 0.15}s` },
              children: [
                /* @__PURE__ */ jsx(Icon, { className: styles$a.menuLinkIcon }),
                /* @__PURE__ */ jsx("span", { className: styles$a.menuLinkText, children: t(item.key) }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: styles$a.menuLinkArrow,
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M9 18L15 12L9 6",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                )
              ]
            },
            item.key
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: styles$a.menuFooter, children: [
          /* @__PURE__ */ jsx("a", { href: "tel:+41765608645", className: styles$a.menuContactItem, children: /* @__PURE__ */ jsx(HiPhone, { className: styles$a.menuContactIcon }) }),
          /* @__PURE__ */ jsx("a", { href: "mailto:info@lweb.ch", className: styles$a.menuContactItem, children: /* @__PURE__ */ jsx(HiMail, { className: styles$a.menuContactIcon }) }),
          /* @__PURE__ */ jsx("button", { onClick: handleDownloadVCard, className: styles$a.menuContactItem, children: /* @__PURE__ */ jsx(HiDownload, { className: styles$a.menuContactIcon }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$a.colorSelector, children: [
          /* @__PURE__ */ jsx("span", { className: styles$a.selectorLabel, children: "Color:" }),
          /* @__PURE__ */ jsx("div", { className: styles$a.colorOptions, children: Object.keys(colors).map((colorKey) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setColor(colorKey),
              className: `${styles$a.colorButton} ${color === colorKey ? styles$a.colorButtonActive : ""}`,
              style: { backgroundColor: colors[colorKey].primary },
              "aria-label": `Color ${colors[colorKey].name}`,
              title: colors[colorKey].name
            },
            colorKey
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$a.languageSelector, children: [
          /* @__PURE__ */ jsx("span", { className: styles$a.selectorLabel, children: "Language:" }),
          /* @__PURE__ */ jsxs("div", { className: styles$a.languageOptions, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setLanguage("es"),
                className: `${styles$a.languageButton} ${language === "es" ? styles$a.languageButtonActive : ""}`,
                children: "Español"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setLanguage("de"),
                className: `${styles$a.languageButton} ${language === "de" ? styles$a.languageButtonActive : ""}`,
                children: "Deutsch"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setLanguage("en"),
                className: `${styles$a.languageButton} ${language === "en" ? styles$a.languageButtonActive : ""}`,
                children: "English"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    isTransitioning && /* @__PURE__ */ jsx("div", { className: styles$a.transitionOverlay, children: /* @__PURE__ */ jsxs("div", { className: styles$a.devLoader, children: [
      /* @__PURE__ */ jsx("span", { className: styles$a.devLetter, style: { animationDelay: "0s" }, children: "D" }),
      /* @__PURE__ */ jsx("span", { className: styles$a.devLetter, style: { animationDelay: "0.2s" }, children: "E" }),
      /* @__PURE__ */ jsx("span", { className: styles$a.devLetter, style: { animationDelay: "0.4s" }, children: "V" })
    ] }) })
  ] });
}
const hero = "_hero_yh8s2_1";
const particles$2 = "_particles_yh8s2_16";
const particle$2 = "_particle_yh8s2_16";
const heroContainer = "_heroContainer_yh8s2_45";
const cardStack = "_cardStack_yh8s2_57";
const cardBackground = "_cardBackground_yh8s2_67";
const card = "_card_yh8s2_57";
const cardGlow$1 = "_cardGlow_yh8s2_111";
const imageContainer = "_imageContainer_yh8s2_131";
const profileImage = "_profileImage_yh8s2_138";
const imageDefault = "_imageDefault_yh8s2_153";
const imageHover = "_imageHover_yh8s2_157";
const imageOverlay = "_imageOverlay_yh8s2_210";
const flashOverlay = "_flashOverlay_yh8s2_229";
const lightning = "_lightning_yh8s2_247";
const cardContent$2 = "_cardContent_yh8s2_327";
const cardTitle$1 = "_cardTitle_yh8s2_378";
const cardSubtitle = "_cardSubtitle_yh8s2_385";
const reactIcon = "_reactIcon_yh8s2_394";
const content$1 = "_content_yh8s2_410";
const greeting = "_greeting_yh8s2_416";
const wave = "_wave_yh8s2_425";
const title$4 = "_title_yh8s2_439";
const highlight$4 = "_highlight_yh8s2_448";
const description$1 = "_description_yh8s2_484";
const stats$1 = "_stats_yh8s2_498";
const stat$1 = "_stat_yh8s2_498";
const statNumber$1 = "_statNumber_yh8s2_509";
const statLabel$1 = "_statLabel_yh8s2_520";
const cta = "_cta_yh8s2_527";
const btnPrimary$2 = "_btnPrimary_yh8s2_534";
const btnOutline$1 = "_btnOutline_yh8s2_535";
const techIcons = "_techIcons_yh8s2_597";
const techIcon$1 = "_techIcon_yh8s2_597";
const styles$9 = {
  hero,
  particles: particles$2,
  particle: particle$2,
  heroContainer,
  cardStack,
  cardBackground,
  card,
  cardGlow: cardGlow$1,
  imageContainer,
  profileImage,
  imageDefault,
  imageHover,
  imageOverlay,
  flashOverlay,
  lightning,
  cardContent: cardContent$2,
  cardTitle: cardTitle$1,
  cardSubtitle,
  reactIcon,
  content: content$1,
  greeting,
  wave,
  title: title$4,
  highlight: highlight$4,
  description: description$1,
  stats: stats$1,
  stat: stat$1,
  statNumber: statNumber$1,
  statLabel: statLabel$1,
  cta,
  btnPrimary: btnPrimary$2,
  btnOutline: btnOutline$1,
  techIcons,
  techIcon: techIcon$1
};
function Hero() {
  const { t } = useLanguage();
  const cardRef = useRef(null);
  const heroRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 0) {
        setHasScrolled(true);
        setShowSecondImage(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);
  useEffect(() => {
    const triggerFlash = () => {
      setShowFlash(true);
      const flashCount = Math.floor(Math.random() * 2) + 3;
      const flashDuration = 120;
      for (let i = 0; i < flashCount; i++) {
        setTimeout(() => {
          setShowFlash(i % 2 === 0);
        }, i * flashDuration);
      }
      setTimeout(() => {
        triggerFlash();
      }, Math.random() * 5e3 + 5e3);
    };
    const initialTimeout = setTimeout(() => {
      triggerFlash();
    }, 3e3);
    return () => clearTimeout(initialTimeout);
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: heroRef,
      className: styles$9.hero,
      children: [
        /* @__PURE__ */ jsx("div", { className: styles$9.particles, children: Array.from({ length: 30 }).map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: styles$9.particle,
            style: {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsxs("div", { className: styles$9.heroContainer, children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: cardRef,
              className: styles$9.cardStack,
              style: {
                // Si quieres, puedes dejar sólo la perspectiva fija:
                // transform: "perspective(1000px)",
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: styles$9.cardBackground,
                    style: { transform: "translateZ(-40px) scale(0.95)" }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: styles$9.cardBackground,
                    style: { transform: "translateZ(-80px) scale(0.9)" }
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: styles$9.card, children: [
                  /* @__PURE__ */ jsx("div", { className: styles$9.cardGlow }),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: styles$9.imageContainer,
                      onMouseEnter: () => setIsHovering(true),
                      onMouseLeave: () => setIsHovering(false),
                      children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/IMG_657.jpeg",
                            alt: "Roberto Salvador",
                            className: `${styles$9.profileImage} ${styles$9.imageDefault}`,
                            style: {
                              opacity: !showSecondImage || isHovering ? 1 : 0
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/IMG_6490.jpeg",
                            alt: "Roberto Salvador",
                            className: `${styles$9.profileImage} ${styles$9.imageHover}`,
                            style: {
                              opacity: showSecondImage && !isHovering ? 1 : 0
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: styles$9.imageOverlay }),
                        showFlash && /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx("div", { className: styles$9.flashOverlay }),
                          /* @__PURE__ */ jsx("div", { className: styles$9.lightning, style: { left: "20%", animationDelay: "0s" } }),
                          /* @__PURE__ */ jsx("div", { className: styles$9.lightning, style: { left: "50%", animationDelay: "0.1s" } }),
                          /* @__PURE__ */ jsx("div", { className: styles$9.lightning, style: { left: "80%", animationDelay: "0.05s" } })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: styles$9.cardContent, children: [
                    /* @__PURE__ */ jsx("h3", { className: styles$9.cardTitle, children: "Roberto Salvador" }),
                    /* @__PURE__ */ jsxs("p", { className: styles$9.cardSubtitle, children: [
                      /* @__PURE__ */ jsx(SiReact, { className: styles$9.reactIcon }),
                      "React Native Developer"
                    ] })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: styles$9.content, children: [
            /* @__PURE__ */ jsxs("div", { className: styles$9.greeting, children: [
              /* @__PURE__ */ jsx("span", { className: styles$9.wave, children: "👋" }),
              /* @__PURE__ */ jsxs("span", { children: [
                t("hero.greeting"),
                " Roberto"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("h1", { className: styles$9.title, children: [
              t("hero.title.part1"),
              " ",
              /* @__PURE__ */ jsx("span", { className: styles$9.highlight, children: t("hero.title.highlight") }),
              t("hero.title.part2") && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("br", {}) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: styles$9.description, children: t("hero.subtitle") }),
            /* @__PURE__ */ jsxs("div", { className: styles$9.stats, children: [
              /* @__PURE__ */ jsxs("div", { className: styles$9.stat, children: [
                /* @__PURE__ */ jsx("div", { className: styles$9.statNumber, children: "5+" }),
                /* @__PURE__ */ jsx("div", { className: styles$9.statLabel, children: t("hero.experience") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: styles$9.stat, children: [
                /* @__PURE__ */ jsx("div", { className: styles$9.statNumber, children: "30+" }),
                /* @__PURE__ */ jsx("div", { className: styles$9.statLabel, children: t("hero.apps") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: styles$9.stat, children: [
                /* @__PURE__ */ jsx("div", { className: styles$9.statNumber, children: "100%" }),
                /* @__PURE__ */ jsx("div", { className: styles$9.statLabel, children: t("hero.satisfaction") })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: styles$9.cta, children: [
              /* @__PURE__ */ jsxs("a", { href: "#proyectos", className: styles$9.btnPrimary, children: [
                /* @__PURE__ */ jsx("span", { children: t("hero.cta.projects") }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M7.5 15L12.5 10L7.5 5",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("a", { href: "#contacto", className: styles$9.btnOutline })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$9.techIcons, children: [
          /* @__PURE__ */ jsx("div", { className: styles$9.techIcon, style: { top: "20%", left: "10%" }, children: "React" }),
          /* @__PURE__ */ jsx("div", { className: styles$9.techIcon, style: { top: "60%", left: "15%" }, children: "Native" }),
          /* @__PURE__ */ jsx("div", { className: styles$9.techIcon, style: { top: "30%", right: "15%" }, children: "TypeScript" }),
          /* @__PURE__ */ jsx("div", { className: styles$9.techIcon, style: { bottom: "25%", right: "10%" }, children: "iOS" })
        ] })
      ]
    }
  );
}
const servicesWrapper = "_servicesWrapper_1ch7h_1";
const servicesContainer = "_servicesContainer_1ch7h_7";
const particles$1 = "_particles_1ch7h_20";
const particle$1 = "_particle_1ch7h_20";
const backgroundContainer = "_backgroundContainer_1ch7h_50";
const backgroundImage = "_backgroundImage_1ch7h_59";
const active = "_active_1ch7h_71";
const contentContainer = "_contentContainer_1ch7h_76";
const serviceContent = "_serviceContent_1ch7h_86";
const serviceCard = "_serviceCard_1ch7h_103";
const orange = "_orange_1ch7h_138";
const serviceNumber = "_serviceNumber_1ch7h_145";
const serviceSubtitle = "_serviceSubtitle_1ch7h_152";
const techBadge = "_techBadge_1ch7h_156";
const darkGray = "_darkGray_1ch7h_167";
const lightGray = "_lightGray_1ch7h_205";
const serviceHeader = "_serviceHeader_1ch7h_252";
const serviceTitle = "_serviceTitle_1ch7h_267";
const serviceDescription = "_serviceDescription_1ch7h_284";
const technologies$1 = "_technologies_1ch7h_292";
const progressIndicator = "_progressIndicator_1ch7h_314";
const progressDot = "_progressDot_1ch7h_325";
const completed = "_completed_1ch7h_358";
const styles$8 = {
  servicesWrapper,
  servicesContainer,
  particles: particles$1,
  particle: particle$1,
  backgroundContainer,
  backgroundImage,
  active,
  contentContainer,
  serviceContent,
  serviceCard,
  orange,
  serviceNumber,
  serviceSubtitle,
  techBadge,
  darkGray,
  lightGray,
  serviceHeader,
  serviceTitle,
  serviceDescription,
  technologies: technologies$1,
  progressIndicator,
  progressDot,
  completed
};
const services = [
  {
    titleKey: "services.mobile.title",
    subtitleKey: "services.mobile.subtitle",
    descriptionKey: "services.mobile.description",
    technologies: ["React Native", "Xcode", "Swift"],
    backgroundImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80"
    // Mobile phones/apps
  },
  {
    titleKey: "services.web.title",
    subtitleKey: "services.web.subtitle",
    descriptionKey: "services.web.description",
    technologies: ["Next.js", "React", "TypeScript"],
    backgroundImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&q=80"
    // Code/laptop
  },
  {
    titleKey: "services.ai.title",
    subtitleKey: "services.ai.subtitle",
    descriptionKey: "services.ai.description",
    technologies: ["OpenAI API", "Automation", "Chatbots"],
    backgroundImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80"
    // AI/technology
  },
  {
    titleKey: "services.consulting.title",
    subtitleKey: "services.consulting.subtitle",
    descriptionKey: "services.consulting.description",
    technologies: ["Architecture", "Optimization", "Scaling"],
    backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
    // Business/consulting
  }
];
function Services() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container2 = containerRef.current;
      const rect = container2.getBoundingClientRect();
      const containerHeight = container2.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollStart = -rect.top;
      const scrollEnd = containerHeight - windowHeight;
      const scrollPercentage = Math.max(0, Math.min(1, scrollStart / scrollEnd));
      const serviceIndex = Math.min(
        Math.floor(scrollPercentage * services.length),
        services.length - 1
      );
      const sectionProgress = scrollPercentage * services.length % 1;
      setCurrentIndex(serviceIndex);
      setScrollProgress(sectionProgress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className: styles$8.servicesWrapper, children: /* @__PURE__ */ jsxs("div", { className: styles$8.servicesContainer, children: [
    /* @__PURE__ */ jsx("div", { className: styles$8.particles, children: Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: styles$8.particle,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsx("div", { className: styles$8.backgroundContainer, children: services.map((service, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `${styles$8.backgroundImage} ${index === currentIndex ? styles$8.active : ""}`,
        style: {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${service.backgroundImage})`
        }
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: styles$8.contentContainer, children: services.map((service, index) => {
      const colorVariant = index % 2 === 0 ? styles$8.orange : index === 1 ? styles$8.darkGray : styles$8.lightGray;
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: `${styles$8.serviceContent} ${index === currentIndex ? styles$8.active : ""}`,
          children: /* @__PURE__ */ jsxs("div", { className: `${styles$8.serviceCard} ${colorVariant}`, children: [
            /* @__PURE__ */ jsxs("div", { className: styles$8.serviceHeader, children: [
              /* @__PURE__ */ jsxs("span", { className: styles$8.serviceNumber, children: [
                "0",
                index + 1
              ] }),
              /* @__PURE__ */ jsx("h2", { className: styles$8.serviceTitle, children: t(service.titleKey) })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: styles$8.serviceSubtitle, children: t(service.subtitleKey) }),
            /* @__PURE__ */ jsx("p", { className: styles$8.serviceDescription, children: t(service.descriptionKey) }),
            /* @__PURE__ */ jsx("div", { className: styles$8.technologies, children: service.technologies.map((tech, techIndex) => /* @__PURE__ */ jsx("span", { className: styles$8.techBadge, children: tech }, techIndex)) })
          ] })
        },
        index
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: styles$8.progressIndicator, children: services.map((_, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `${styles$8.progressDot} ${index === currentIndex ? styles$8.active : ""} ${index < currentIndex ? styles$8.completed : ""}`
      },
      index
    )) })
  ] }) });
}
const otherAppsSection = "_otherAppsSection_z8n8b_1";
const container$3 = "_container_z8n8b_9";
const header$3 = "_header_z8n8b_16";
const badge$4 = "_badge_z8n8b_23";
const badgeIcon$3 = "_badgeIcon_z8n8b_35";
const badgeText$4 = "_badgeText_z8n8b_39";
const title$3 = "_title_z8n8b_48";
const highlight$3 = "_highlight_z8n8b_57";
const stackContainer = "_stackContainer_z8n8b_65";
const stackCard = "_stackCard_z8n8b_73";
const cardLink = "_cardLink_z8n8b_83";
const cardContent$1 = "_cardContent_z8n8b_91";
const cardImageSection = "_cardImageSection_z8n8b_112";
const cardInfo = "_cardInfo_z8n8b_137";
const cardNumber = "_cardNumber_z8n8b_145";
const cardTitle = "_cardTitle_z8n8b_157";
const cardDescription = "_cardDescription_z8n8b_168";
const cardTags = "_cardTags_z8n8b_178";
const tag = "_tag_z8n8b_187";
const platforms = "_platforms_z8n8b_204";
const platformLink = "_platformLink_z8n8b_211";
const platformIcon = "_platformIcon_z8n8b_221";
const styles$7 = {
  otherAppsSection,
  container: container$3,
  header: header$3,
  badge: badge$4,
  badgeIcon: badgeIcon$3,
  badgeText: badgeText$4,
  title: title$3,
  highlight: highlight$3,
  stackContainer,
  stackCard,
  cardLink,
  cardContent: cardContent$1,
  cardImageSection,
  cardInfo,
  cardNumber,
  cardTitle,
  cardDescription,
  cardTags,
  tag,
  platforms,
  platformLink,
  platformIcon
};
const buttonContainer = "_buttonContainer_1dxwp_2";
const btnPrimary$1 = "_btnPrimary_1dxwp_11";
const transitionOverlay = "_transitionOverlay_1dxwp_60";
const overlayLoader = "_overlayLoader_1dxwp_80";
const overlayLetter = "_overlayLetter_1dxwp_89";
const styles$6 = {
  buttonContainer,
  btnPrimary: btnPrimary$1,
  transitionOverlay,
  overlayLoader,
  overlayLetter
};
function MakingOfBanner() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const handleNavigate = () => {
    setShowOverlay(true);
    setTimeout(() => {
      navigate("/making-of");
    }, 1200);
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$6.buttonContainer, children: [
    /* @__PURE__ */ jsxs("button", { onClick: handleNavigate, className: styles$6.btnPrimary, children: [
      /* @__PURE__ */ jsx("span", { children: t("makingOfBanner.button") }),
      /* @__PURE__ */ jsx(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 20 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M7.5 15L12.5 10L7.5 5",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      )
    ] }),
    showOverlay && /* @__PURE__ */ jsx("div", { className: styles$6.transitionOverlay, children: /* @__PURE__ */ jsxs("div", { className: styles$6.overlayLoader, children: [
      /* @__PURE__ */ jsx("span", { className: styles$6.overlayLetter, style: { animationDelay: "0s" }, children: "M" }),
      /* @__PURE__ */ jsx("span", { className: styles$6.overlayLetter, style: { animationDelay: "0.1s" }, children: "a" }),
      /* @__PURE__ */ jsx("span", { className: styles$6.overlayLetter, style: { animationDelay: "0.2s" }, children: "k" }),
      /* @__PURE__ */ jsx("span", { className: styles$6.overlayLetter, style: { animationDelay: "0.3s" }, children: "i" }),
      /* @__PURE__ */ jsx("span", { className: styles$6.overlayLetter, style: { animationDelay: "0.4s" }, children: "n" }),
      /* @__PURE__ */ jsx("span", { className: styles$6.overlayLetter, style: { animationDelay: "0.5s" }, children: "g" }),
      /* @__PURE__ */ jsx("span", { className: styles$6.overlayLetter, style: { animationDelay: "0.6s" }, children: " " }),
      /* @__PURE__ */ jsx("span", { className: styles$6.overlayLetter, style: { animationDelay: "0.7s" }, children: "o" }),
      /* @__PURE__ */ jsx("span", { className: styles$6.overlayLetter, style: { animationDelay: "0.8s" }, children: "f" })
    ] }) })
  ] });
}
const otherProjects = [
  {
    name: "BuyVoice",
    category: "Remix",
    descriptionKey: "apps.buyvoice.description",
    tags: ["React Native", "OpenAI"],
    image: "/app-icon.png",
    platforms: ["ios", "android"],
    url: "https://www.buyvoice.app",
    iosUrl: "https://apps.apple.com/app/voice-shopping-list/id6505125372",
    androidUrl: "https://play.google.com/store/apps/details?id=com.lwebch.VoiceList"
  },
  {
    name: "Hundezonen",
    category: "APP",
    descriptionKey: "apps.hundezonen.description",
    tags: ["React  Native"],
    image: "/hnde.png",
    platforms: ["ios", "android"],
    url: "https://www.hundezonen.ch",
    iosUrl: "https://apps.apple.com/us/app/hundezonen/id6745336299",
    androidUrl: "https://play.google.com/store/apps/details?id=com.lwebch.HundezonenSchweiz&pli=1"
  },
  {
    name: "FoodScan AI",
    category: "APP",
    descriptionKey: "apps.foodscan.description",
    tags: ["React Native", "OpenAI"],
    image: "/foof.png",
    platforms: ["ios", "android"],
    url: "https://www.foodscan-ai.com",
    iosUrl: "https://apps.apple.com/us/app/foodscan-ai/id6472478688",
    androidUrl: "https://play.google.com/store/apps/details?id=com.lwebch.foodmentoai"
  },
  {
    name: "DogMentor KI",
    category: "React",
    descriptionKey: "apps.dogmentor.description",
    tags: ["React Native", "OpenAI"],
    image: "/dog.jpg",
    platforms: ["ios"],
    url: "https://dog-mentor.com",
    iosUrl: "https://apps.apple.com/us/app/dogmentor/id6467635587"
  },
  {
    name: "KetoRecipeLab",
    category: "APP",
    descriptionKey: "apps.keto.description",
    tags: ["React Native", "OpenAI"],
    image: "/iconoapp.png",
    platforms: ["ios"],
    url: "https://keto-recipe.app",
    iosUrl: "https://apps.apple.com/us/app/ketorecipelab/id6757017200"
  },
  {
    name: "Work Ti",
    category: "APP",
    descriptionKey: "apps.workti.description",
    tags: ["React  Native"],
    image: "/workti.png",
    platforms: ["ios"],
    url: "https://www.workti.app",
    iosUrl: "https://apps.apple.com/us/app/vixtime/id6745336262"
  }
];
function OtherApps() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll(`.${styles$7.stackCard}`);
      const section2 = sectionRef.current;
      const sectionTop = section2.offsetTop;
      const scrollPos = window.scrollY;
      cards.forEach((card2, index) => {
        const cardElement = card2;
        const cardTop = sectionTop + index * 100;
        const progress = Math.max(0, Math.min(1, (scrollPos - cardTop) / 400));
        const scale = 0.95 + progress * 0.05;
        const yOffset = index * 20;
        cardElement.style.transform = `translateY(${yOffset}px) scale(${scale})`;
        cardElement.style.zIndex = `${index + 1}`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx("section", { id: "apps", ref: sectionRef, className: styles$7.otherAppsSection, children: /* @__PURE__ */ jsxs("div", { className: styles$7.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$7.header, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$7.badge, children: [
        /* @__PURE__ */ jsx("span", { className: styles$7.badgeIcon, children: "📱" }),
        /* @__PURE__ */ jsx("span", { className: styles$7.badgeText, children: "Portfolio" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: styles$7.title, children: [
        t("apps.title"),
        " ",
        /* @__PURE__ */ jsx("span", { className: styles$7.highlight, children: t("apps.subtitle") })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$7.stackContainer, children: otherProjects.map((project, index) => /* @__PURE__ */ jsx("div", { className: styles$7.stackCard, children: /* @__PURE__ */ jsx(
      "a",
      {
        href: project.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: styles$7.cardLink,
        children: /* @__PURE__ */ jsxs("div", { className: styles$7.cardContent, children: [
          /* @__PURE__ */ jsx("div", { className: styles$7.cardImageSection, children: /* @__PURE__ */ jsx("img", { src: project.image, alt: project.name }) }),
          /* @__PURE__ */ jsxs("div", { className: styles$7.cardInfo, children: [
            /* @__PURE__ */ jsxs("div", { className: styles$7.cardNumber, children: [
              "0",
              index + 1
            ] }),
            /* @__PURE__ */ jsx("h3", { className: styles$7.cardTitle, children: project.name }),
            /* @__PURE__ */ jsx("p", { className: styles$7.cardDescription, children: t(project.descriptionKey) }),
            /* @__PURE__ */ jsx("div", { className: styles$7.cardTags, children: project.tags.map((tag2) => /* @__PURE__ */ jsx("span", { className: styles$7.tag, children: tag2 }, tag2)) }),
            /* @__PURE__ */ jsxs("div", { className: styles$7.platforms, children: [
              project.url && /* @__PURE__ */ jsx(
                "a",
                {
                  href: project.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: styles$7.platformLink,
                  onClick: (e) => e.stopPropagation(),
                  title: "Landing Page",
                  children: /* @__PURE__ */ jsx("svg", { className: styles$7.platformIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" }) })
                }
              ),
              project.platforms.includes("ios") && project.iosUrl && /* @__PURE__ */ jsx(
                "a",
                {
                  href: project.iosUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: styles$7.platformLink,
                  onClick: (e) => e.stopPropagation(),
                  title: "Download on App Store",
                  children: /* @__PURE__ */ jsx("svg", { className: styles$7.platformIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" }) })
                }
              ),
              project.platforms.includes("android") && project.androidUrl && /* @__PURE__ */ jsx(
                "a",
                {
                  href: project.androidUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: styles$7.platformLink,
                  onClick: (e) => e.stopPropagation(),
                  title: "Download on Google Play",
                  children: /* @__PURE__ */ jsx("svg", { className: styles$7.platformIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" }) })
                }
              )
            ] })
          ] })
        ] })
      }
    ) }, project.name)) }),
    /* @__PURE__ */ jsx(MakingOfBanner, {})
  ] }) });
}
const websitesSection = "_websitesSection_72aim_1";
const container$2 = "_container_72aim_27";
const header$2 = "_header_72aim_35";
const badge$3 = "_badge_72aim_40";
const badgeIcon$2 = "_badgeIcon_72aim_52";
const badgeText$3 = "_badgeText_72aim_56";
const title$2 = "_title_72aim_65";
const highlight$2 = "_highlight_72aim_74";
const bentoGrid = "_bentoGrid_72aim_82";
const large = "_large_72aim_90";
const medium = "_medium_72aim_95";
const small = "_small_72aim_100";
const bentoItem = "_bentoItem_72aim_106";
const cardVisible = "_cardVisible_72aim_124";
const cardAppear = "_cardAppear_72aim_1";
const cardHidden = "_cardHidden_72aim_147";
const animate = "_animate_72aim_174";
const morphIn = "_morphIn_72aim_1";
const hoveredGrid = "_hoveredGrid_72aim_203";
const pulseGlow = "_pulseGlow_72aim_1";
const featured = "_featured_72aim_247";
const bentoImage = "_bentoImage_72aim_252";
const bentoVideo = "_bentoVideo_72aim_259";
const bentoOverlay = "_bentoOverlay_72aim_271";
const bentoContent = "_bentoContent_72aim_293";
const frameworkBadge = "_frameworkBadge_72aim_302";
const bentoTitle = "_bentoTitle_72aim_322";
const bentoDescription = "_bentoDescription_72aim_340";
const techTags = "_techTags_72aim_362";
const techTag = "_techTag_72aim_362";
const gradientBorder = "_gradientBorder_72aim_389";
const hoverArrow = "_hoverArrow_72aim_405";
const bgDecoration = "_bgDecoration_72aim_431";
const bgBlob1$1 = "_bgBlob1_72aim_438";
const float = "_float_72aim_1";
const bgBlob2$1 = "_bgBlob2_72aim_450";
const styles$5 = {
  websitesSection,
  container: container$2,
  header: header$2,
  badge: badge$3,
  badgeIcon: badgeIcon$2,
  badgeText: badgeText$3,
  title: title$2,
  highlight: highlight$2,
  bentoGrid,
  large,
  medium,
  small,
  bentoItem,
  cardVisible,
  cardAppear,
  cardHidden,
  animate,
  morphIn,
  hoveredGrid,
  pulseGlow,
  featured,
  bentoImage,
  bentoVideo,
  bentoOverlay,
  bentoContent,
  frameworkBadge,
  bentoTitle,
  bentoDescription,
  techTags,
  techTag,
  gradientBorder,
  hoverArrow,
  bgDecoration,
  bgBlob1: bgBlob1$1,
  float,
  bgBlob2: bgBlob2$1
};
const websites = [
  {
    id: 6,
    title: "HOT & BBQ",
    category: "web",
    framework: "Next.js",
    description: "Die exklusivste Premium-Kollektion von Hot & BBQ Saucen und Gewürzen.",
    imageUrl: "/ff.jpg",
    projectUrl: "https://www.hot-bbq.ch",
    technologies: ["Next.js", "E-Commerce"],
    featured: true,
    size: "large"
  },
  {
    id: 7,
    title: "BeautyStyle",
    category: "web",
    framework: "Remix",
    description: "Moderner Friseursalon mit personalisierten Schönheitsdienstleistungen.",
    imageUrl: "/woman-getting-her-hair-cut-beauty-salon_23-2149167399.jpg",
    projectUrl: "https://beautystyles.vercel.app",
    technologies: ["Remix", "Framer Motion"],
    size: "medium"
  },
  {
    id: 8,
    title: "Crypto Dashboard",
    category: "web",
    framework: "Remix",
    description: "Echtzeit-Preisdaten, Portfolio-Tracking und Marktanalysen.",
    imageUrl: "/crypto-abstract-bg.png",
    projectUrl: "https://remix-crypto.vercel.app",
    technologies: ["Remix", "Web3", "API"],
    featured: true,
    size: "medium"
  },
  {
    id: 9,
    title: "WebM Converter",
    category: "web",
    framework: "Next.js",
    description: "Convert your videos to WebM format for better web performance.",
    imageUrl: "/5532919.jpg",
    projectUrl: "https://web-m-video-converter.vercel.app",
    technologies: ["Next.js", "FFmpeg"],
    size: "small"
  },
  {
    id: 10,
    title: "Ushuaia Bar",
    category: "web",
    framework: "Next.js",
    description: "Premium Cocktail, Hookah & Terrace. Luxuriöse Bar-Lounge in Buchs.",
    imageUrl: "/abstract-smoke.png",
    projectUrl: "https://www.ushuaia-bar.ch",
    technologies: ["Next.js", "React"],
    featured: true,
    size: "large"
  },
  {
    id: 11,
    title: "Cantina Tex-Mex",
    category: "web",
    framework: "Remix",
    description: "Restaurant mit Pub-Atmosphäre. Essen kombiniert mit Unterhaltung.",
    imageUrl: "/IMG_2733.jpeg",
    projectUrl: "https://www.cantinatexmex.ch",
    technologies: ["Remix", "React"],
    size: "medium"
  },
  {
    id: 12,
    title: "Flinck Sauber",
    category: "web",
    framework: "Next.js",
    description: "Professionelles Reinigungsunternehmen aus Liechtenstein.",
    imageUrl: "/IMG_2735.jpeg",
    projectUrl: "https://flink-sauber.li",
    technologies: ["Next.js", "React"],
    size: "small"
  },
  {
    id: 13,
    title: "Renovation",
    category: "web",
    framework: "Next.js",
    description: "Professionelles Renovationsunternehmen für moderne Wohnräume.",
    imageUrl: "/interior-design-with-photoframes-blue-couch.jpg",
    projectUrl: "https://renovation-tau.vercel.app",
    technologies: ["Next.js", "React"],
    size: "small"
  },
  {
    id: 14,
    title: "Bouquet Mediterraneo",
    category: "web",
    framework: "Remix",
    description: "Mediterrane Küche und erlesene Weine in stilvollem Ambiente.",
    imageUrl: "/IMG_2734.jpeg",
    projectUrl: "https://www.bouquetmediterraneo.ch",
    technologies: ["Remix", "React"],
    size: "medium"
  },
  {
    id: 15,
    title: "Rrapi Immobilien",
    category: "web",
    framework: "HTML",
    description: "Immobilienagentur spezialisiert auf exklusive Immobilien.",
    imageUrl: "/inmo.png",
    projectUrl: "https://rrapi.ch",
    technologies: ["HTML", "CSS", "PHP"],
    size: "small"
  }
];
const frameworkColors = {
  "Next.js": { bg: "rgba(0, 0, 0, 0.8)", border: "rgba(255, 255, 255, 0.3)", text: "#ffffff" },
  "Remix": { bg: "rgba(18, 163, 255, 0.15)", border: "rgba(18, 163, 255, 0.4)", text: "#12a3ff" },
  "HTML": { bg: "rgba(227, 79, 38, 0.15)", border: "rgba(227, 79, 38, 0.4)", text: "#e34f26" }
};
function Websites() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cardVisibility, setCardVisibility] = useState(new Array(websites.length).fill(false));
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry2]) => {
        if (entry2.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const newVisibility = [...cardVisibility];
          cardRefs.current.forEach((card2, index) => {
            if (!card2) return;
            const rect = card2.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const isInView = rect.top < windowHeight * 0.85 && rect.bottom > windowHeight * 0.15;
            newVisibility[index] = isInView;
          });
          setCardVisibility(newVisibility);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: styles$5.websitesSection, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: styles$5.container,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: [
          /* @__PURE__ */ jsxs("div", { className: styles$5.header, children: [
            /* @__PURE__ */ jsxs("div", { className: styles$5.badge, children: [
              /* @__PURE__ */ jsx("span", { className: styles$5.badgeIcon, children: "🌐" }),
              /* @__PURE__ */ jsx("span", { className: styles$5.badgeText, children: "Portfolio Web" })
            ] }),
            /* @__PURE__ */ jsxs("h2", { className: styles$5.title, children: [
              t("websites.title.part1"),
              " ",
              /* @__PURE__ */ jsx("span", { className: styles$5.highlight, children: t("websites.title.highlight") })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `${styles$5.bentoGrid} ${isVisible ? styles$5.animate : ""} ${isHovered ? styles$5.hoveredGrid : ""}`, children: websites.map((site, index) => {
            const colors = frameworkColors[site.framework] || frameworkColors["Next.js"];
            return /* @__PURE__ */ jsxs(
              "a",
              {
                ref: (el) => cardRefs.current[index] = el,
                href: site.projectUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: `${styles$5.bentoItem} ${styles$5[site.size]} ${site.featured ? styles$5.featured : ""} ${cardVisibility[index] ? styles$5.cardVisible : styles$5.cardHidden}`,
                style: { animationDelay: `${index * 0.1}s` },
                children: [
                  /* @__PURE__ */ jsxs("div", { className: styles$5.bentoImage, children: [
                    /* @__PURE__ */ jsx("img", { src: site.imageUrl, alt: site.title }),
                    /* @__PURE__ */ jsx("div", { className: styles$5.bentoOverlay })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: styles$5.bentoContent, children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: styles$5.frameworkBadge,
                        style: {
                          background: colors.bg,
                          borderColor: colors.border,
                          color: colors.text
                        },
                        children: site.framework
                      }
                    ),
                    /* @__PURE__ */ jsx("h3", { className: styles$5.bentoTitle, children: site.title }),
                    /* @__PURE__ */ jsx("p", { className: styles$5.bentoDescription, children: site.description }),
                    /* @__PURE__ */ jsx("div", { className: styles$5.techTags, children: site.technologies.map((tech, i) => /* @__PURE__ */ jsx("span", { className: styles$5.techTag, children: tech }, i)) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: styles$5.gradientBorder }),
                  /* @__PURE__ */ jsx("div", { className: styles$5.hoverArrow, children: /* @__PURE__ */ jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M7 17L17 7M17 7H7M17 7V17", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
                ]
              },
              site.id
            );
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: styles$5.bgDecoration, children: [
      /* @__PURE__ */ jsx("div", { className: styles$5.bgBlob1 }),
      /* @__PURE__ */ jsx("div", { className: styles$5.bgBlob2 })
    ] })
  ] });
}
const section = "_section_14uli_1";
const iconsContainer = "_iconsContainer_14uli_8";
const floatingIcon = "_floatingIcon_14uli_15";
const content = "_content_14uli_38";
const text = "_text_14uli_52";
const styles$4 = {
  section,
  iconsContainer,
  floatingIcon,
  content,
  text
};
function ScrollTextReveal() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const { language } = useLanguage();
  const words = {
    es: ["INNOVACIÓN", "PASIÓN", "FUTURO"],
    de: ["INNOVATION", "LEIDENSCHAFT", "ZUKUNFT"],
    en: ["INNOVATION", "PASSION", "FUTURE"]
  };
  const currentWords = words[language] || words.en;
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = sectionRef.current.offsetHeight;
          const windowHeight = window.innerHeight;
          const offset = windowHeight * 0.3;
          const progress = Math.max(0, Math.min(1, (-rect.top + offset) / (sectionHeight - windowHeight + offset)));
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const wordIndex = Math.floor(scrollProgress * currentWords.length);
  const currentWord = currentWords[Math.min(wordIndex, currentWords.length - 1)];
  const primaryColor = typeof window !== "undefined" ? getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim() : "#ff6b35";
  const colors = [primaryColor, "#9ca3af"];
  const currentColor = colors[wordIndex % colors.length];
  const scale = 0.3 + scrollProgress * 1.3 * 0.9;
  const opacity = Math.min(1, scrollProgress * 2);
  const floatingIcons = [
    { Icon: TbBrandReactNative, position: { top: "15%", left: "10%" }, delay: 0 },
    { Icon: SiNodedotjs, position: { top: "70%", left: "15%" }, delay: 1 },
    { Icon: SiOpenai, position: { top: "25%", right: "12%" }, delay: 2 },
    { Icon: SiApple, position: { top: "60%", right: "18%" }, delay: 3 },
    { Icon: SiAndroid, position: { top: "80%", left: "50%" }, delay: 4 },
    { Icon: FaMobileAlt, position: { top: "40%", left: "25%" }, delay: 5 }
  ];
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: styles$4.section, children: [
    /* @__PURE__ */ jsx("div", { className: styles$4.iconsContainer, children: floatingIcons.map((item, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: styles$4.floatingIcon,
        style: {
          ...item.position,
          animationDelay: `${item.delay}s`
        },
        children: /* @__PURE__ */ jsx(item.Icon, {})
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: styles$4.content, children: /* @__PURE__ */ jsx(
      "h2",
      {
        className: styles$4.text,
        style: {
          transform: `scale3d(${scale}, ${scale}, 1)`,
          opacity,
          color: currentColor,
          textShadow: `0 0 20px ${currentColor}80, 0 0 40px ${currentColor}50`
        },
        children: currentWord
      }
    ) })
  ] });
}
const carouselSection = "_carouselSection_y522o_1";
const loading = "_loading_y522o_10";
const loadingPlaceholder = "_loadingPlaceholder_y522o_16";
const backgroundDecorations = "_backgroundDecorations_y522o_31";
const bgBlob1 = "_bgBlob1_y522o_38";
const bgBlob2 = "_bgBlob2_y522o_49";
const header$1 = "_header_y522o_61";
const badge$2 = "_badge_y522o_68";
const badgeIcon$1 = "_badgeIcon_y522o_80";
const badgeText$2 = "_badgeText_y522o_84";
const title$1 = "_title_y522o_93";
const highlight$1 = "_highlight_y522o_102";
const subtitle$1 = "_subtitle_y522o_109";
const carouselContainer = "_carouselContainer_y522o_118";
const gradientLeft = "_gradientLeft_y522o_123";
const gradientRight = "_gradientRight_y522o_124";
const scrollTrack = "_scrollTrack_y522o_144";
const dragging = "_dragging_y522o_157";
const techGrid = "_techGrid_y522o_162";
const scrolling = "_scrolling_y522o_169";
const techItem = "_techItem_y522o_187";
const techCard = "_techCard_y522o_191";
const cardGlow = "_cardGlow_y522o_213";
const techIcon = "_techIcon_y522o_228";
const techName = "_techName_y522o_239";
const cornerAccent = "_cornerAccent_y522o_251";
const styles$3 = {
  carouselSection,
  loading,
  loadingPlaceholder,
  backgroundDecorations,
  bgBlob1,
  bgBlob2,
  header: header$1,
  badge: badge$2,
  badgeIcon: badgeIcon$1,
  badgeText: badgeText$2,
  title: title$1,
  highlight: highlight$1,
  subtitle: subtitle$1,
  carouselContainer,
  gradientLeft,
  gradientRight,
  scrollTrack,
  dragging,
  techGrid,
  scrolling,
  techItem,
  techCard,
  cardGlow,
  techIcon,
  techName,
  cornerAccent
};
const bannerContainer = "_bannerContainer_3jdc2_2";
const contentLayer = "_contentLayer_3jdc2_11";
const badge$1 = "_badge_3jdc2_19";
const badgeVisible = "_badgeVisible_3jdc2_33";
const badgeText$1 = "_badgeText_3jdc2_38";
const terminal = "_terminal_3jdc2_49";
const terminalVisible = "_terminalVisible_3jdc2_62";
const terminalHeader = "_terminalHeader_3jdc2_68";
const terminalDots = "_terminalDots_3jdc2_76";
const dot = "_dot_3jdc2_81";
const terminalTitle = "_terminalTitle_3jdc2_87";
const claudeLogo = "_claudeLogo_3jdc2_99";
const terminalSpacer = "_terminalSpacer_3jdc2_105";
const terminalBody = "_terminalBody_3jdc2_110";
const codeLine = "_codeLine_3jdc2_119";
const codeLineVisible = "_codeLineVisible_3jdc2_128";
const lineContent = "_lineContent_3jdc2_133";
const command = "_command_3jdc2_140";
const success = "_success_3jdc2_145";
const info = "_info_3jdc2_149";
const cursor = "_cursor_3jdc2_153";
const blink = "_blink_3jdc2_1";
const processingLine = "_processingLine_3jdc2_170";
const fadeIn = "_fadeIn_3jdc2_1";
const description = "_description_3jdc2_189";
const descriptionVisible = "_descriptionVisible_3jdc2_197";
const descriptionTitle = "_descriptionTitle_3jdc2_202";
const descriptionText = "_descriptionText_3jdc2_214";
const stats = "_stats_3jdc2_225";
const statsVisible = "_statsVisible_3jdc2_240";
const stat = "_stat_3jdc2_225";
const statNumber = "_statNumber_3jdc2_249";
const statLabel = "_statLabel_3jdc2_261";
const statDivider = "_statDivider_3jdc2_270";
const styles$2 = {
  bannerContainer,
  contentLayer,
  badge: badge$1,
  badgeVisible,
  badgeText: badgeText$1,
  terminal,
  terminalVisible,
  terminalHeader,
  terminalDots,
  dot,
  terminalTitle,
  claudeLogo,
  terminalSpacer,
  terminalBody,
  codeLine,
  codeLineVisible,
  lineContent,
  command,
  success,
  info,
  cursor,
  blink,
  processingLine,
  fadeIn,
  description,
  descriptionVisible,
  descriptionTitle,
  descriptionText,
  stats,
  statsVisible,
  stat,
  statNumber,
  statLabel,
  statDivider
};
function ClaudeCodeBanner() {
  const { t } = useLanguage();
  const bannerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const codeLines = [
    { text: "$ claude code --optimize", delay: 0, type: "command" },
    { text: "✓ Loading AI agents...", delay: 400, type: "success" },
    { text: "✓ Workflow optimized", delay: 800, type: "success" },
    { text: "→ Ready to build", delay: 1200, type: "info" }
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      const rect = bannerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visible = rect.top < windowHeight - 100 && rect.bottom > 0;
      if (visible && !isVisible) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);
  useEffect(() => {
    if (!isVisible) return;
    codeLines.forEach((line, index) => {
      setTimeout(() => {
        setTypedLines((prev) => [...prev, index]);
      }, line.delay);
    });
  }, [isVisible]);
  return /* @__PURE__ */ jsx("div", { ref: bannerRef, className: styles$2.bannerContainer, children: /* @__PURE__ */ jsxs("div", { className: styles$2.contentLayer, children: [
    /* @__PURE__ */ jsx("div", { className: `${styles$2.badge} ${isVisible ? styles$2.badgeVisible : ""}`, children: /* @__PURE__ */ jsx("span", { className: styles$2.badgeText, children: t("claudeCode.badge") || "DESDE 2025" }) }),
    /* @__PURE__ */ jsxs("div", { className: `${styles$2.terminal} ${isVisible ? styles$2.terminalVisible : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$2.terminalHeader, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$2.terminalDots, children: [
          /* @__PURE__ */ jsx("span", { className: styles$2.dot, style: { background: "#ff5f56" } }),
          /* @__PURE__ */ jsx("span", { className: styles$2.dot, style: { background: "#ffbd2e" } }),
          /* @__PURE__ */ jsx("span", { className: styles$2.dot, style: { background: "#27c93f" } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$2.terminalTitle, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/Claude_AI_symbol.svg.png",
              alt: "Claude AI",
              className: styles$2.claudeLogo
            }
          ),
          "claude-code.ai"
        ] }),
        /* @__PURE__ */ jsx("div", { className: styles$2.terminalSpacer })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$2.terminalBody, children: [
        codeLines.map((line, index) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `${styles$2.codeLine} ${typedLines.includes(index) ? styles$2.codeLineVisible : ""} ${styles$2[line.type]}`,
            children: /* @__PURE__ */ jsx("span", { className: styles$2.lineContent, children: line.text })
          },
          index
        )),
        isVisible && typedLines.length === codeLines.length && /* @__PURE__ */ jsx("div", { className: styles$2.processingLine, children: /* @__PURE__ */ jsx("span", { className: styles$2.cursor, children: "█" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `${styles$2.description} ${isVisible ? styles$2.descriptionVisible : ""}`, children: [
      /* @__PURE__ */ jsx("h3", { className: styles$2.descriptionTitle, children: t("claudeCode.title") || "Mi copiloto: Claude Code" }),
      /* @__PURE__ */ jsx("p", { className: styles$2.descriptionText, children: t("claudeCode.description") || "4 agentes especializados entrenados para mis requerimientos. Trabajo mucho más rápido y puedo ofrecer precios inmejorables gracias a esta tecnología de vanguardia." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `${styles$2.stats} ${isVisible ? styles$2.statsVisible : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$2.stat, children: [
        /* @__PURE__ */ jsx("div", { className: styles$2.statNumber, children: "4" }),
        /* @__PURE__ */ jsx("div", { className: styles$2.statLabel, children: t("claudeCode.agents") || "Agentes IA" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$2.statDivider }),
      /* @__PURE__ */ jsxs("div", { className: styles$2.stat, children: [
        /* @__PURE__ */ jsx("div", { className: styles$2.statNumber, children: "3x" }),
        /* @__PURE__ */ jsx("div", { className: styles$2.statLabel, children: t("claudeCode.speed") || "Más rápido" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$2.statDivider }),
      /* @__PURE__ */ jsxs("div", { className: styles$2.stat, children: [
        /* @__PURE__ */ jsx("div", { className: styles$2.statNumber, children: "✓" }),
        /* @__PURE__ */ jsx("div", { className: styles$2.statLabel, children: t("claudeCode.prices") || "Mejores precios" })
      ] })
    ] })
  ] }) });
}
const technologies = [
  { name: "React Native", icon: TbBrandReactNative, color: "#61dafb" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Expo", icon: SiExpo, color: "#000020" },
  { name: "OpenAI", icon: SiOpenai, color: "#412991" },
  { name: "Swift", icon: SiSwift, color: "#F05138" },
  { name: "Xcode", icon: SiXcode, color: "#147EFB" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" }
];
function TechCarousel() {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };
  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  if (!isClient) {
    return /* @__PURE__ */ jsx("div", { className: styles$3.loading, children: /* @__PURE__ */ jsx("div", { className: styles$3.loadingPlaceholder }) });
  }
  const duplicatedTech = [...technologies, ...technologies];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: styles$3.carouselSection, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$3.backgroundDecorations, children: [
        /* @__PURE__ */ jsx("div", { className: styles$3.bgBlob1 }),
        /* @__PURE__ */ jsx("div", { className: styles$3.bgBlob2 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.header, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$3.badge, children: [
          /* @__PURE__ */ jsx("span", { className: styles$3.badgeIcon, children: "✨" }),
          /* @__PURE__ */ jsx("span", { className: styles$3.badgeText, children: t("tech.badge") })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: styles$3.title, children: [
          t("tech.title.part1"),
          " ",
          /* @__PURE__ */ jsx("span", { className: styles$3.highlight, children: t("tech.title.highlight") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: styles$3.subtitle, children: t("tech.subtitle") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.carouselContainer, children: [
        /* @__PURE__ */ jsx("div", { className: styles$3.gradientLeft }),
        /* @__PURE__ */ jsx("div", { className: styles$3.gradientRight }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: containerRef,
            className: `${styles$3.scrollTrack} ${isDragging ? styles$3.dragging : ""}`,
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseLeave,
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            children: /* @__PURE__ */ jsx("div", { className: `${styles$3.techGrid} ${isDragging ? "" : styles$3.scrolling}`, children: duplicatedTech.map((tech, index) => /* @__PURE__ */ jsx(
              "div",
              {
                className: styles$3.techItem,
                children: /* @__PURE__ */ jsxs("div", { className: styles$3.techCard, children: [
                  /* @__PURE__ */ jsx("div", { className: styles$3.cardGlow }),
                  /* @__PURE__ */ jsx("div", { className: styles$3.techIcon, children: /* @__PURE__ */ jsx(tech.icon, { style: { color: tech.color } }) }),
                  /* @__PURE__ */ jsx("span", { className: styles$3.techName, children: tech.name }),
                  /* @__PURE__ */ jsx("div", { className: styles$3.cornerAccent })
                ] })
              },
              `${tech.name}-${index}`
            )) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(ClaudeCodeBanner, {})
  ] });
}
const contactSection = "_contactSection_1xxc6_1";
const backgroundPattern = "_backgroundPattern_1xxc6_14";
const gridPattern = "_gridPattern_1xxc6_21";
const movingGradient = "_movingGradient_1xxc6_40";
const particles = "_particles_1xxc6_67";
const particle = "_particle_1xxc6_67";
const container$1 = "_container_1xxc6_96";
const header = "_header_1xxc6_104";
const badge = "_badge_1xxc6_121";
const badgePulse = "_badgePulse_1xxc6_135";
const badgeIcon = "_badgeIcon_1xxc6_154";
const badgeText = "_badgeText_1xxc6_169";
const title = "_title_1xxc6_179";
const highlight = "_highlight_1xxc6_189";
const subtitle = "_subtitle_1xxc6_207";
const cardsGrid = "_cardsGrid_1xxc6_217";
const contactCard = "_contactCard_1xxc6_225";
const iconWrapper = "_iconWrapper_1xxc6_248";
const animatedBorder = "_animatedBorder_1xxc6_252";
const cardGlowFollow = "_cardGlowFollow_1xxc6_311";
const ripple = "_ripple_1xxc6_324";
const cardContent = "_cardContent_1xxc6_347";
const iconGlow = "_iconGlow_1xxc6_385";
const icon = "_icon_1xxc6_248";
const iconRing = "_iconRing_1xxc6_421";
const textContent = "_textContent_1xxc6_441";
const label = "_label_1xxc6_447";
const value = "_value_1xxc6_461";
const flag = "_flag_1xxc6_476";
const arrow = "_arrow_1xxc6_490";
const cornerTopLeft = "_cornerTopLeft_1xxc6_515";
const cornerBottomRight = "_cornerBottomRight_1xxc6_516";
const ctaSection = "_ctaSection_1xxc6_594";
const ctaCard = "_ctaCard_1xxc6_599";
const ctaVideoContainer = "_ctaVideoContainer_1xxc6_610";
const ctaVideo = "_ctaVideo_1xxc6_610";
const ctaVideoOverlay = "_ctaVideoOverlay_1xxc6_639";
const ctaContent = "_ctaContent_1xxc6_652";
const ctaGlow = "_ctaGlow_1xxc6_659";
const ctaTitle = "_ctaTitle_1xxc6_686";
const ctaText = "_ctaText_1xxc6_696";
const ctaButtons = "_ctaButtons_1xxc6_707";
const btnPrimary = "_btnPrimary_1xxc6_714";
const btnOutline = "_btnOutline_1xxc6_715";
const btnShine = "_btnShine_1xxc6_747";
const btnIcon = "_btnIcon_1xxc6_778";
const floatingElements = "_floatingElements_1xxc6_802";
const floatingCircle1 = "_floatingCircle1_1xxc6_809";
const floatingCircle2 = "_floatingCircle2_1xxc6_810";
const floatingCircle3 = "_floatingCircle3_1xxc6_811";
const languageSelector = "_languageSelector_1xxc6_870";
const langButton = "_langButton_1xxc6_879";
const langButtonActive = "_langButtonActive_1xxc6_900";
const styles$1 = {
  contactSection,
  backgroundPattern,
  gridPattern,
  movingGradient,
  particles,
  particle,
  container: container$1,
  header,
  badge,
  badgePulse,
  badgeIcon,
  badgeText,
  title,
  highlight,
  subtitle,
  cardsGrid,
  contactCard,
  iconWrapper,
  animatedBorder,
  cardGlowFollow,
  ripple,
  cardContent,
  iconGlow,
  icon,
  iconRing,
  textContent,
  label,
  value,
  flag,
  arrow,
  cornerTopLeft,
  cornerBottomRight,
  ctaSection,
  ctaCard,
  ctaVideoContainer,
  ctaVideo,
  ctaVideoOverlay,
  ctaContent,
  ctaGlow,
  ctaTitle,
  ctaText,
  ctaButtons,
  btnPrimary,
  btnOutline,
  btnShine,
  btnIcon,
  floatingElements,
  floatingCircle1,
  floatingCircle2,
  floatingCircle3,
  languageSelector,
  langButton,
  langButtonActive
};
const contactInfo = [
  {
    icon: HiLocationMarker,
    labelKey: "contact.location.title",
    valueKey: "contact.location.address",
    postalKey: "contact.location.postal",
    flag: "🇨🇭",
    link: "https://maps.google.com/?q=9475+Sevelen+Switzerland"
  },
  {
    icon: HiPhone,
    labelKey: "contact.phone.title",
    value: "076 560 86 45",
    link: "tel:+41765608645"
  },
  {
    icon: HiMail,
    labelKey: "contact.email.title",
    value: "info@lweb.ch",
    link: "mailto:info@lweb.ch"
  }
];
function Contact() {
  const { t, language, setLanguage } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };
  const handleCardClick = (index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple2) => ripple2.id !== id));
    }, 1e3);
  };
  return /* @__PURE__ */ jsxs("section", { id: "contacto", className: styles$1.contactSection, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$1.backgroundPattern, children: [
      /* @__PURE__ */ jsx("div", { className: styles$1.gridPattern }),
      /* @__PURE__ */ jsx("div", { className: styles$1.movingGradient })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$1.particles, children: Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: styles$1.particle,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 5}s`
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxs("div", { className: styles$1.container, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$1.header, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$1.badge, children: [
          /* @__PURE__ */ jsx("div", { className: styles$1.badgePulse }),
          /* @__PURE__ */ jsx("span", { className: styles$1.badgeIcon, children: "📬" }),
          /* @__PURE__ */ jsx("span", { className: styles$1.badgeText, children: t("contact.badge") })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: styles$1.title, children: [
          t("contact.header.title.part1"),
          " ",
          /* @__PURE__ */ jsx("span", { className: styles$1.highlight, children: t("contact.header.title.highlight") }),
          t("contact.header.title.part2")
        ] }),
        /* @__PURE__ */ jsx("p", { className: styles$1.subtitle, children: t("contact.cta.subtitle") })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: containerRef,
          className: styles$1.cardsGrid,
          onMouseMove: handleMouseMove,
          children: contactInfo.map((item, index) => {
            const Icon = item.icon;
            return /* @__PURE__ */ jsxs(
              "a",
              {
                href: item.link,
                target: item.link.startsWith("http") ? "_blank" : "_self",
                rel: item.link.startsWith("http") ? "noopener noreferrer" : void 0,
                className: styles$1.contactCard,
                onMouseEnter: () => setActiveCard(index),
                onMouseLeave: () => setActiveCard(null),
                onClick: (e) => handleCardClick(index, e),
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: styles$1.cardGlowFollow,
                      style: {
                        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 53, 0.15), transparent 40%)`
                      }
                    }
                  ),
                  ripples.filter((r) => activeCard === index).map((ripple2) => /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: styles$1.ripple,
                      style: {
                        left: `${ripple2.x}px`,
                        top: `${ripple2.y}px`
                      }
                    },
                    ripple2.id
                  )),
                  /* @__PURE__ */ jsxs("div", { className: styles$1.cardContent, children: [
                    /* @__PURE__ */ jsxs("div", { className: styles$1.iconWrapper, children: [
                      /* @__PURE__ */ jsx("div", { className: styles$1.iconGlow }),
                      /* @__PURE__ */ jsx(Icon, { className: styles$1.icon }),
                      activeCard === index && /* @__PURE__ */ jsx("div", { className: styles$1.iconRing })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: styles$1.textContent, children: [
                      /* @__PURE__ */ jsx("span", { className: styles$1.label, children: t(item.labelKey) }),
                      /* @__PURE__ */ jsxs("span", { className: styles$1.value, children: [
                        item.valueKey ? `${t(item.postalKey)} ${t(item.valueKey)}` : item.value,
                        item.flag && /* @__PURE__ */ jsx("span", { className: styles$1.flag, children: item.flag })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: styles$1.arrow, children: /* @__PURE__ */ jsx(
                      "svg",
                      {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 20 20",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M7 13L13 7M13 7H7M13 7V13",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        )
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: styles$1.cornerTopLeft }),
                  /* @__PURE__ */ jsx("div", { className: styles$1.cornerBottomRight }),
                  /* @__PURE__ */ jsx("div", { className: styles$1.animatedBorder })
                ]
              },
              index
            );
          })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: styles$1.ctaSection, children: /* @__PURE__ */ jsxs("div", { className: styles$1.ctaCard, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$1.ctaVideoContainer, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "IMG_657.jpeg",
              alt: "Background",
              className: styles$1.ctaVideo
            }
          ),
          /* @__PURE__ */ jsx("div", { className: styles$1.ctaVideoOverlay })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$1.ctaContent, children: [
          /* @__PURE__ */ jsx("div", { className: styles$1.ctaGlow }),
          /* @__PURE__ */ jsx("h3", { className: styles$1.ctaTitle, children: t("contact.cta.title") }),
          /* @__PURE__ */ jsx("p", { className: styles$1.ctaText, children: t("contact.cta.subtitle") }),
          /* @__PURE__ */ jsxs("div", { className: styles$1.ctaButtons, children: [
            /* @__PURE__ */ jsxs("button", { onClick: handleDownloadVCard, className: styles$1.btnPrimary, children: [
              /* @__PURE__ */ jsx(HiDownload, { className: styles$1.btnIcon }),
              /* @__PURE__ */ jsx("span", { children: t("contact.cta.button") }),
              /* @__PURE__ */ jsx("div", { className: styles$1.btnShine })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://github.com/donia1222",
                target: "_blank",
                rel: "noopener noreferrer",
                className: styles$1.btnOutline,
                children: [
                  /* @__PURE__ */ jsx(FaGithub, { className: styles$1.btnIcon }),
                  /* @__PURE__ */ jsx("span", { children: t("contact.cta.github") }),
                  /* @__PURE__ */ jsx("div", { className: styles$1.btnShine })
                ]
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: styles$1.languageSelector, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setLanguage("es"),
            className: `${styles$1.langButton} ${language === "es" ? styles$1.langButtonActive : ""}`,
            children: "ES"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setLanguage("de"),
            className: `${styles$1.langButton} ${language === "de" ? styles$1.langButtonActive : ""}`,
            children: "DE"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setLanguage("en"),
            className: `${styles$1.langButton} ${language === "en" ? styles$1.langButtonActive : ""}`,
            children: "EN"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$1.floatingElements, children: [
      /* @__PURE__ */ jsx("div", { className: styles$1.floatingCircle1 }),
      /* @__PURE__ */ jsx("div", { className: styles$1.floatingCircle2 }),
      /* @__PURE__ */ jsx("div", { className: styles$1.floatingCircle3 })
    ] })
  ] });
}
const footer = "_footer_119h2_1";
const container = "_container_119h2_9";
const copyright = "_copyright_119h2_19";
const links = "_links_119h2_26";
const link = "_link_119h2_26";
const modal = "_modal_119h2_64";
const modalContent = "_modalContent_119h2_86";
const closeButton = "_closeButton_119h2_110";
const modalTitle = "_modalTitle_119h2_134";
const modalBody = "_modalBody_119h2_146";
const note = "_note_119h2_181";
const contact = "_contact_119h2_187";
const styles = {
  footer,
  container,
  copyright,
  links,
  link,
  modal,
  modalContent,
  closeButton,
  modalTitle,
  modalBody,
  note,
  contact
};
function Footer() {
  const { t } = useLanguage();
  const [showImpressum, setShowImpressum] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("footer", { className: styles.footer, children: /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
      /* @__PURE__ */ jsx("p", { className: styles.copyright, children: t("footer.copyright") }),
      /* @__PURE__ */ jsxs("div", { className: styles.links, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowImpressum(true),
            className: styles.link,
            children: t("footer.legal")
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowPrivacy(true),
            className: styles.link,
            children: t("footer.privacy")
          }
        )
      ] })
    ] }) }),
    showImpressum && /* @__PURE__ */ jsx("div", { className: styles.modal, onClick: () => setShowImpressum(false), children: /* @__PURE__ */ jsxs("div", { className: styles.modalContent, onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: styles.closeButton,
          onClick: () => setShowImpressum(false),
          children: "✕"
        }
      ),
      /* @__PURE__ */ jsx("h2", { className: styles.modalTitle, children: t("footer.legal") }),
      /* @__PURE__ */ jsxs("div", { className: styles.modalBody, children: [
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Roberto Salvador" }) }),
        /* @__PURE__ */ jsx("p", { children: "Chalberweidstrasse 38, 9475 Sevelen, Schweiz" }),
        /* @__PURE__ */ jsx("p", { children: "Teléfono: 081 750 1911" }),
        /* @__PURE__ */ jsx("p", { children: "E-Mail: info@lweb.ch" }),
        /* @__PURE__ */ jsx("p", { className: styles.note, children: "Algunas imágenes provienen de Freepik" })
      ] })
    ] }) }),
    showPrivacy && /* @__PURE__ */ jsx("div", { className: styles.modal, onClick: () => setShowPrivacy(false), children: /* @__PURE__ */ jsxs("div", { className: styles.modalContent, onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: styles.closeButton,
          onClick: () => setShowPrivacy(false),
          children: "✕"
        }
      ),
      /* @__PURE__ */ jsx("h2", { className: styles.modalTitle, children: t("footer.privacy") }),
      /* @__PURE__ */ jsxs("div", { className: styles.modalBody, children: [
        /* @__PURE__ */ jsx("h3", { children: "Declaración de Privacidad de Roberto Salvador" }),
        /* @__PURE__ */ jsx("p", { children: "Nos tomamos muy en serio la protección de sus datos personales. Esta declaración de privacidad explica cómo recopilamos, usamos y protegemos sus datos personales." }),
        /* @__PURE__ */ jsx("h4", { children: "1. Recopilación de Datos" }),
        /* @__PURE__ */ jsx("p", { children: "Recopilamos datos personales cuando se pone en contacto con nosotros, utiliza nuestros servicios o visita nuestro sitio web. Los datos recopilados incluyen, entre otros:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Nombre y apellidos" }),
          /* @__PURE__ */ jsx("li", { children: "Información de contacto (correo electrónico, teléfono)" }),
          /* @__PURE__ */ jsx("li", { children: "Dirección IP y datos de uso de nuestro sitio web" })
        ] }),
        /* @__PURE__ */ jsx("h4", { children: "2. Uso de los Datos" }),
        /* @__PURE__ */ jsx("p", { children: "Utilizamos sus datos para prestar nuestros servicios, comunicarnos con usted y mejorar nuestro sitio web. Sus datos nunca se venderán ni se compartirán con terceros." }),
        /* @__PURE__ */ jsx("h4", { children: "3. Protección de Datos" }),
        /* @__PURE__ */ jsx("p", { children: "Implementamos medidas técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, pérdida o uso indebido. Sin embargo, no podemos garantizar una seguridad completa." }),
        /* @__PURE__ */ jsx("h4", { children: "4. Sus Derechos" }),
        /* @__PURE__ */ jsx("p", { children: "Tiene derecho a solicitar información sobre los datos personales almacenados, corregirlos o eliminarlos. Para preguntas o solicitudes sobre el procesamiento de datos, puede contactarnos en cualquier momento." }),
        /* @__PURE__ */ jsx("h4", { children: "5. Cambios en la Política de Privacidad" }),
        /* @__PURE__ */ jsx("p", { children: "Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. La versión actual está disponible en nuestro sitio web." }),
        /* @__PURE__ */ jsxs("p", { className: styles.contact, children: [
          "Para preguntas o consultas, contáctenos en:",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("strong", { children: "E-Mail: info@lweb.ch" })
        ] })
      ] })
    ] }) })
  ] });
}
const metadata = {
  es: {
    title: "Roberto Salvador | Desarrollador de Apps y Webs Modernas en Suiza | St. Gallen & Liechtenstein",
    description: "Desarrollador freelance especializado en aplicaciones móviles y páginas webs modernas en Suiza. React Native, Next.js, Remix. Servicios en St. Gallen, Liechtenstein y toda Suiza. +5 años de experiencia, 30+ apps desarrolladas.",
    keywords: "desarrollador apps Suiza, desarrollador web St. Gallen, React Native Liechtenstein, páginas web modernas Suiza, desarrollo móvil iOS Android, Next.js developer Switzerland, Remix developer, desarrollador freelance Suiza, app developer St. Gallen, web development Liechtenstein, desarrollador React Native Suiza"
  },
  de: {
    title: "Roberto Salvador | Entwickler für moderne Apps und Websites in der Schweiz | St. Gallen & Liechtenstein",
    description: "Freiberuflicher Entwickler spezialisiert auf mobile Anwendungen und moderne Websites in der Schweiz. React Native, Next.js, Remix. Dienstleistungen in St. Gallen, Liechtenstein und der gesamten Schweiz. +5 Jahre Erfahrung, 30+ entwickelte Apps.",
    keywords: "App Entwickler Schweiz, Web Entwickler St. Gallen, React Native Liechtenstein, moderne Websites Schweiz, Mobile Entwicklung iOS Android, Next.js Entwickler Schweiz, Remix Entwickler, Freelance Entwickler Schweiz, App Entwickler St. Gallen, Web Entwicklung Liechtenstein, React Native Entwickler Schweiz"
  }
};
const loader = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const lang = (cookieHeader == null ? void 0 : cookieHeader.includes("portfolio-language=es")) ? "es" : "de";
  return json({ lang });
};
const meta = ({ data }) => {
  const lang = (data == null ? void 0 : data.lang) || "de";
  const meta2 = metadata[lang];
  return [
    { title: meta2.title },
    {
      name: "description",
      content: meta2.description
    },
    {
      name: "keywords",
      content: meta2.keywords
    },
    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lweb.ch" },
    { property: "og:title", content: meta2.title },
    {
      property: "og:description",
      content: meta2.description
    },
    { property: "og:image", content: "https://lweb.ch/og-image.jpg" },
    { property: "og:locale", content: lang === "es" ? "es_ES" : "de_CH" },
    { property: "og:locale:alternate", content: lang === "es" ? "de_CH" : "es_ES" },
    { property: "og:locale:alternate", content: "en_US" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: "https://lweb.ch" },
    { name: "twitter:title", content: meta2.title },
    {
      name: "twitter:description",
      content: meta2.description
    },
    { name: "twitter:image", content: "https://lweb.ch/og-image.jpg" },
    // Geo Tags
    { name: "geo.region", content: "CH-SG" },
    { name: "geo.placename", content: "St. Gallen" },
    { name: "geo.position", content: "47.1833;9.5333" },
    { name: "ICBM", content: "47.1833, 9.5333" },
    // Additional SEO
    { name: "author", content: "Roberto Salvador" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: lang === "es" ? "Spanish" : "German" },
    { name: "revisit-after", content: "7 days" },
    { name: "theme-color", content: "#ff6b35" }
    // Será actualizado dinámicamente
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { id: "inicio", children: /* @__PURE__ */ jsx(Hero, {}) }),
    /* @__PURE__ */ jsx("div", { id: "servicios", children: /* @__PURE__ */ jsx(Services, {}) }),
    /* @__PURE__ */ jsx("div", { id: "proyectos", children: /* @__PURE__ */ jsx(OtherApps, {}) }),
    /* @__PURE__ */ jsx(Websites, {}),
    /* @__PURE__ */ jsx(ScrollTextReveal, {}),
    /* @__PURE__ */ jsx("div", { id: "tech", children: /* @__PURE__ */ jsx(TechCarousel, {}) }),
    /* @__PURE__ */ jsx("div", { id: "contacto", children: /* @__PURE__ */ jsx(Contact, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-e64VqO2l.js", "imports": ["/assets/components-QMBqyyBs.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-CiXl4eiT.js", "imports": ["/assets/components-QMBqyyBs.js", "/assets/LanguageContext-CZtteaVp.js", "/assets/ColorContext-COvWmGp2.js"], "css": ["/assets/root-DZzYiTNF.css"] }, "routes/home.module": { "id": "routes/home.module", "parentId": "root", "path": "home/module", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home.module-Cq0dpi_J.js", "imports": [], "css": ["/assets/home-dOusLAbc.css"] }, "routes/making-of": { "id": "routes/making-of", "parentId": "root", "path": "making-of", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/making-of-DSjclT6W.js", "imports": ["/assets/components-QMBqyyBs.js", "/assets/LanguageContext-CZtteaVp.js"], "css": ["/assets/making-of-D5cSVU_A.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DV9-iznA.js", "imports": ["/assets/components-QMBqyyBs.js", "/assets/LanguageContext-CZtteaVp.js", "/assets/ColorContext-COvWmGp2.js"], "css": ["/assets/_index-eLWRk14m.css"] } }, "url": "/assets/manifest-60207ccb.js", "version": "60207ccb" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home.module": {
    id: "routes/home.module",
    parentId: "root",
    path: "home/module",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/making-of": {
    id: "routes/making-of",
    parentId: "root",
    path: "making-of",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
