import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, Link } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Analytics } from "@vercel/analytics/remix";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { HiMenu, HiX, HiHome, HiSparkles, HiFolder, HiCubeTransparent, HiMail, HiPhone, HiDownload, HiLocationMarker } from "react-icons/hi";
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiExpo, SiOpenai, SiSwift, SiXcode, SiFirebase, SiGraphql, SiTailwindcss } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
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
    // Contact
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
    "hero.title.highlight": "herausragenden nativen Apps",
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
    // Contact
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
    "error.error": "Fehler"
  }
};
function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("de");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language");
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "de")) {
      setLanguageState(savedLanguage);
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
const pageLoader = "_pageLoader_1jypk_3";
const fadeOut = "_fadeOut_1jypk_15";
const backgroundImage$1 = "_backgroundImage_1jypk_21";
const image = "_image_1jypk_30";
const overlay = "_overlay_1jypk_51";
const content$1 = "_content_1jypk_77";
const name = "_name_1jypk_89";
const nameChar = "_nameChar_1jypk_107";
const nameSpace = "_nameSpace_1jypk_113";
const divider = "_divider_1jypk_132";
const title$6 = "_title_1jypk_156";
const progressBar = "_progressBar_1jypk_181";
const progressFill = "_progressFill_1jypk_192";
const particles$3 = "_particles_1jypk_215";
const particle$3 = "_particle_1jypk_215";
const styles$9 = {
  pageLoader,
  fadeOut,
  backgroundImage: backgroundImage$1,
  image,
  overlay,
  content: content$1,
  name,
  nameChar,
  nameSpace,
  divider,
  title: title$6,
  progressBar,
  progressFill,
  particles: particles$3,
  particle: particle$3
};
function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut2, setFadeOut] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);
  if (!isLoading) return null;
  return /* @__PURE__ */ jsxs("div", { className: `${styles$9.pageLoader} ${fadeOut2 ? styles$9.fadeOut : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: styles$9.backgroundImage, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/15_07_35.png",
        alt: "Roberto Salvador",
        className: styles$9.image
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: styles$9.overlay }),
    /* @__PURE__ */ jsxs("div", { className: styles$9.content, children: [
      /* @__PURE__ */ jsxs("h1", { className: styles$9.name, children: [
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "0.5s" }, children: "R" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "0.6s" }, children: "o" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "0.7s" }, children: "b" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "0.8s" }, children: "e" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "0.9s" }, children: "r" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.0s" }, children: "t" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.1s" }, children: "o" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameSpace, children: " " }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.2s" }, children: "S" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.3s" }, children: "a" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.4s" }, children: "l" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.5s" }, children: "v" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.6s" }, children: "a" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.7s" }, children: "d" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.8s" }, children: "o" }),
        /* @__PURE__ */ jsx("span", { className: styles$9.nameChar, style: { animationDelay: "1.9s" }, children: "r" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$9.divider }),
      /* @__PURE__ */ jsx("p", { className: styles$9.title, children: "Full-Stack Developer" }),
      /* @__PURE__ */ jsx("div", { className: styles$9.progressBar, children: /* @__PURE__ */ jsx("div", { className: styles$9.progressFill }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$9.particles, children: [...Array(20)].map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: styles$9.particle,
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
const styles$8 = "/assets/global-BzwcOZu3.css";
const themeScript = `
  (function() {
    const theme = localStorage.getItem('portfolio-theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
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
  { rel: "stylesheet", href: styles$8 }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "de", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: themeScript } })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Analytics, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(LanguageProvider, { children: /* @__PURE__ */ jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsx(PageLoader, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] }) });
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
const fadeIn = "_fadeIn_1p1s2_1";
const greeting$1 = "_greeting_1p1s2_32";
const title$5 = "_title_1p1s2_44";
const subtitle$2 = "_subtitle_1p1s2_59";
const description$1 = "_description_1p1s2_67";
const cta$1 = "_cta_1p1s2_75";
const home_module = {
  page,
  main,
  hero: hero$1,
  heroContent,
  fadeIn,
  greeting: greeting$1,
  title: title$5,
  subtitle: subtitle$2,
  description: description$1,
  cta: cta$1
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cta: cta$1,
  default: home_module,
  description: description$1,
  fadeIn,
  greeting: greeting$1,
  hero: hero$1,
  heroContent,
  main,
  page,
  subtitle: subtitle$2,
  title: title$5
}, Symbol.toStringTag, { value: "Module" }));
const header$4 = "_header_17ui3_1";
const navbar = "_navbar_17ui3_23";
const borderGlow = "_borderGlow_17ui3_48";
const container$4 = "_container_17ui3_77";
const logo = "_logo_17ui3_88";
const logoContainer = "_logoContainer_17ui3_94";
const logoText = "_logoText_17ui3_100";
const logoSubtitle = "_logoSubtitle_17ui3_113";
const cursor = "_cursor_17ui3_131";
const menuButton = "_menuButton_17ui3_179";
const menuIcon = "_menuIcon_17ui3_198";
const menuModal = "_menuModal_17ui3_205";
const menuModalOpen = "_menuModalOpen_17ui3_214";
const menuBackground = "_menuBackground_17ui3_220";
const menuBackgroundImage = "_menuBackgroundImage_17ui3_226";
const menuBackgroundActive = "_menuBackgroundActive_17ui3_238";
const menuOverlay = "_menuOverlay_17ui3_243";
const closeButton$1 = "_closeButton_17ui3_256";
const closeIcon = "_closeIcon_17ui3_287";
const menuContent = "_menuContent_17ui3_298";
const menuLogo = "_menuLogo_17ui3_311";
const menuLogoText = "_menuLogoText_17ui3_327";
const menuLogoSubtitle = "_menuLogoSubtitle_17ui3_340";
const menuNav = "_menuNav_17ui3_348";
const menuLink = "_menuLink_17ui3_357";
const menuLinkActive = "_menuLinkActive_17ui3_399";
const menuLinkIcon = "_menuLinkIcon_17ui3_404";
const menuLinkText = "_menuLinkText_17ui3_415";
const menuLinkArrow = "_menuLinkArrow_17ui3_419";
const menuFooter = "_menuFooter_17ui3_433";
const menuContactItem = "_menuContactItem_17ui3_449";
const menuContactIcon = "_menuContactIcon_17ui3_475";
const languageSelector$1 = "_languageSelector_17ui3_486";
const languageButton = "_languageButton_17ui3_502";
const languageButtonActive = "_languageButtonActive_17ui3_522";
const transitionOverlay = "_transitionOverlay_17ui3_534";
const devLoader = "_devLoader_17ui3_556";
const devLetter = "_devLetter_17ui3_563";
const styles$7 = {
  header: header$4,
  navbar,
  borderGlow,
  container: container$4,
  logo,
  logoContainer,
  logoText,
  logoSubtitle,
  cursor,
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
  languageSelector: languageSelector$1,
  languageButton,
  languageButtonActive,
  transitionOverlay,
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
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
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
  const handleMenuClick = (href) => {
    setIsMenuOpen(false);
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
  return /* @__PURE__ */ jsxs("header", { className: styles$7.header, children: [
    /* @__PURE__ */ jsxs("nav", { ref: navRef, className: styles$7.navbar, children: [
      /* @__PURE__ */ jsx("div", { className: styles$7.borderGlow }),
      /* @__PURE__ */ jsxs("div", { className: styles$7.container, children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: styles$7.logo, children: /* @__PURE__ */ jsxs("div", { className: styles$7.logoContainer, children: [
          /* @__PURE__ */ jsxs("span", { className: styles$7.logoText, children: [
            displayedText,
            isTyping && /* @__PURE__ */ jsx("span", { className: styles$7.cursor, children: "|" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: styles$7.logoSubtitle, children: [
            displayedSubtitle,
            isTypingSubtitle && /* @__PURE__ */ jsx("span", { className: styles$7.cursor, children: "|" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: styles$7.menuButton,
            onClick: () => setIsMenuOpen(true),
            "aria-label": "Abrir menú",
            children: /* @__PURE__ */ jsx(HiMenu, { className: styles$7.menuIcon })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `${styles$7.menuModal} ${isMenuOpen ? styles$7.menuModalOpen : ""}`, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$7.menuBackground, children: [
        menuBackgrounds.map((bg, index) => /* @__PURE__ */ jsx(
          "img",
          {
            src: bg,
            alt: `Background ${index}`,
            className: `${styles$7.menuBackgroundImage} ${currentBackground === index ? styles$7.menuBackgroundActive : ""}`
          },
          bg
        )),
        /* @__PURE__ */ jsx("div", { className: styles$7.menuOverlay })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: styles$7.closeButton,
          onClick: () => setIsMenuOpen(false),
          "aria-label": "Cerrar menú",
          children: /* @__PURE__ */ jsx(HiX, { className: styles$7.closeIcon })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: styles$7.menuContent, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$7.menuLogo, children: [
          /* @__PURE__ */ jsx("span", { className: styles$7.menuLogoText, children: "Roberto Salvador" }),
          /* @__PURE__ */ jsx("span", { className: styles$7.menuLogoSubtitle, children: "React Native Specialist" })
        ] }),
        /* @__PURE__ */ jsx("nav", { className: styles$7.menuNav, children: navigationKeys.map((item, index) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleMenuClick(item.href),
              className: `${styles$7.menuLink} ${activeSection === index ? styles$7.menuLinkActive : ""}`,
              style: { animationDelay: `${0.2 + index * 0.15}s` },
              children: [
                /* @__PURE__ */ jsx(Icon, { className: styles$7.menuLinkIcon }),
                /* @__PURE__ */ jsx("span", { className: styles$7.menuLinkText, children: t(item.key) }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: styles$7.menuLinkArrow,
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
        /* @__PURE__ */ jsxs("div", { className: styles$7.menuFooter, children: [
          /* @__PURE__ */ jsx("a", { href: "tel:+41765608645", className: styles$7.menuContactItem, children: /* @__PURE__ */ jsx(HiPhone, { className: styles$7.menuContactIcon }) }),
          /* @__PURE__ */ jsx("a", { href: "mailto:info@lweb.ch", className: styles$7.menuContactItem, children: /* @__PURE__ */ jsx(HiMail, { className: styles$7.menuContactIcon }) }),
          /* @__PURE__ */ jsx("button", { onClick: handleDownloadVCard, className: styles$7.menuContactItem, children: /* @__PURE__ */ jsx(HiDownload, { className: styles$7.menuContactIcon }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$7.languageSelector, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setLanguage("es"),
              className: `${styles$7.languageButton} ${language === "es" ? styles$7.languageButtonActive : ""}`,
              children: "Español"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setLanguage("de"),
              className: `${styles$7.languageButton} ${language === "de" ? styles$7.languageButtonActive : ""}`,
              children: "Deutsch"
            }
          )
        ] })
      ] })
    ] }),
    isTransitioning && /* @__PURE__ */ jsx("div", { className: styles$7.transitionOverlay, children: /* @__PURE__ */ jsxs("div", { className: styles$7.devLoader, children: [
      /* @__PURE__ */ jsx("span", { className: styles$7.devLetter, style: { animationDelay: "0s" }, children: "D" }),
      /* @__PURE__ */ jsx("span", { className: styles$7.devLetter, style: { animationDelay: "0.2s" }, children: "E" }),
      /* @__PURE__ */ jsx("span", { className: styles$7.devLetter, style: { animationDelay: "0.4s" }, children: "V" })
    ] }) })
  ] });
}
const hero = "_hero_1c5nv_1";
const particles$2 = "_particles_1c5nv_13";
const particle$2 = "_particle_1c5nv_13";
const heroContainer = "_heroContainer_1c5nv_42";
const cardStack = "_cardStack_1c5nv_54";
const cardBackground = "_cardBackground_1c5nv_64";
const card$1 = "_card_1c5nv_54";
const cardGlow$1 = "_cardGlow_1c5nv_105";
const imageContainer = "_imageContainer_1c5nv_125";
const profileImage = "_profileImage_1c5nv_132";
const imageDefault = "_imageDefault_1c5nv_144";
const imageHover = "_imageHover_1c5nv_148";
const glitch = "_glitch_1c5nv_154";
const glitchLayer = "_glitchLayer_1c5nv_179";
const imageOverlay = "_imageOverlay_1c5nv_201";
const cardContent$1 = "_cardContent_1c5nv_212";
const cardTitle$1 = "_cardTitle_1c5nv_259";
const cardSubtitle = "_cardSubtitle_1c5nv_266";
const reactIcon = "_reactIcon_1c5nv_275";
const content = "_content_1c5nv_291";
const greeting = "_greeting_1c5nv_297";
const wave = "_wave_1c5nv_306";
const title$4 = "_title_1c5nv_320";
const highlight$4 = "_highlight_1c5nv_329";
const description = "_description_1c5nv_365";
const stats = "_stats_1c5nv_379";
const stat = "_stat_1c5nv_379";
const statNumber = "_statNumber_1c5nv_390";
const statLabel = "_statLabel_1c5nv_401";
const cta = "_cta_1c5nv_408";
const btnPrimary$1 = "_btnPrimary_1c5nv_415";
const btnOutline = "_btnOutline_1c5nv_416";
const techIcons = "_techIcons_1c5nv_475";
const techIcon$1 = "_techIcon_1c5nv_475";
const styles$6 = {
  hero,
  particles: particles$2,
  particle: particle$2,
  heroContainer,
  cardStack,
  cardBackground,
  card: card$1,
  cardGlow: cardGlow$1,
  imageContainer,
  profileImage,
  imageDefault,
  imageHover,
  glitch,
  glitchLayer,
  imageOverlay,
  cardContent: cardContent$1,
  cardTitle: cardTitle$1,
  cardSubtitle,
  reactIcon,
  content,
  greeting,
  wave,
  title: title$4,
  highlight: highlight$4,
  description,
  stats,
  stat,
  statNumber,
  statLabel,
  cta,
  btnPrimary: btnPrimary$1,
  btnOutline,
  techIcons,
  techIcon: techIcon$1
};
function Hero() {
  const { t } = useLanguage();
  const cardRef = useRef(null);
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showSecondImage, setShowSecondImage] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSecondImage(true);
    }, 3e3);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroRect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRect.height;
      const scrolled = -heroRect.top;
      const progress = Math.min(Math.max(scrolled / heroHeight, 0), 1);
      setScrollProgress(progress);
      if (progress > 0.2 && progress < 0.25 && !isGlitching) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
      if (progress > 0.5 && progress < 0.55 && !isGlitching) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isGlitching]);
  const imageScale = 1 - scrollProgress * 0.3;
  const imageOpacity = 1 - scrollProgress * 0.8;
  const cardRotate = scrollProgress * 180;
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: heroRef,
      className: styles$6.hero,
      style: {
        opacity: 1 - scrollProgress * 0.5,
        transform: `translateY(${scrollProgress * 100}px)`
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: styles$6.particles, children: Array.from({ length: 30 }).map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: styles$6.particle,
            style: {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsxs("div", { className: styles$6.heroContainer, children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: cardRef,
              className: styles$6.cardStack,
              style: {
                // Si quieres, puedes dejar sólo la perspectiva fija:
                // transform: "perspective(1000px)",
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: styles$6.cardBackground,
                    style: { transform: "translateZ(-40px) scale(0.95)" }
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: styles$6.cardBackground,
                    style: { transform: "translateZ(-80px) scale(0.9)" }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: styles$6.card,
                    style: {
                      transform: `rotateY(${cardRotate}deg)`,
                      opacity: imageOpacity
                    },
                    children: [
                      /* @__PURE__ */ jsx("div", { className: styles$6.cardGlow }),
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: styles$6.imageContainer,
                          onMouseEnter: () => setIsHovering(true),
                          onMouseLeave: () => setIsHovering(false),
                          children: [
                            /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: "/IMG_6490.jpeg",
                                alt: "Roberto Salvador",
                                className: `${styles$6.profileImage} ${styles$6.imageDefault} ${isGlitching ? styles$6.glitch : ""}`,
                                style: {
                                  transform: `scale(${imageScale})`,
                                  filter: isGlitching ? "hue-rotate(90deg) saturate(3)" : "none",
                                  opacity: !showSecondImage || isHovering ? 1 : 0
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: "/IMG_657.jpeg",
                                alt: "Roberto Salvador",
                                className: `${styles$6.profileImage} ${styles$6.imageHover} ${isGlitching ? styles$6.glitch : ""}`,
                                style: {
                                  transform: `scale(${imageScale})`,
                                  filter: isGlitching ? "hue-rotate(90deg) saturate(3)" : "none",
                                  opacity: showSecondImage && !isHovering ? 1 : 0
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx("div", { className: styles$6.imageOverlay }),
                            isGlitching && /* @__PURE__ */ jsxs(Fragment, { children: [
                              /* @__PURE__ */ jsx("div", { className: styles$6.glitchLayer, style: { left: "-5px" } }),
                              /* @__PURE__ */ jsx("div", { className: styles$6.glitchLayer, style: { left: "5px" } })
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: styles$6.cardContent, children: [
                        /* @__PURE__ */ jsx("h3", { className: styles$6.cardTitle, children: "Roberto Salvador" }),
                        /* @__PURE__ */ jsxs("p", { className: styles$6.cardSubtitle, children: [
                          /* @__PURE__ */ jsx(SiReact, { className: styles$6.reactIcon }),
                          "React Native Developer"
                        ] })
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: styles$6.content, children: [
            /* @__PURE__ */ jsxs("div", { className: styles$6.greeting, children: [
              /* @__PURE__ */ jsx("span", { className: styles$6.wave, children: "👋" }),
              /* @__PURE__ */ jsxs("span", { children: [
                t("hero.greeting"),
                " Roberto"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("h1", { className: styles$6.title, children: [
              t("hero.title.part1"),
              " ",
              /* @__PURE__ */ jsx("span", { className: styles$6.highlight, children: t("hero.title.highlight") }),
              t("hero.title.part2") && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("br", {}) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: styles$6.description, children: t("hero.subtitle") }),
            /* @__PURE__ */ jsxs("div", { className: styles$6.stats, children: [
              /* @__PURE__ */ jsxs("div", { className: styles$6.stat, children: [
                /* @__PURE__ */ jsx("div", { className: styles$6.statNumber, children: "5+" }),
                /* @__PURE__ */ jsx("div", { className: styles$6.statLabel, children: t("hero.experience") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: styles$6.stat, children: [
                /* @__PURE__ */ jsx("div", { className: styles$6.statNumber, children: "30+" }),
                /* @__PURE__ */ jsx("div", { className: styles$6.statLabel, children: t("hero.apps") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: styles$6.stat, children: [
                /* @__PURE__ */ jsx("div", { className: styles$6.statNumber, children: "100%" }),
                /* @__PURE__ */ jsx("div", { className: styles$6.statLabel, children: t("hero.satisfaction") })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: styles$6.cta, children: [
              /* @__PURE__ */ jsxs("a", { href: "#proyectos", className: styles$6.btnPrimary, children: [
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
              /* @__PURE__ */ jsx("a", { href: "#contacto", className: styles$6.btnOutline })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$6.techIcons, children: [
          /* @__PURE__ */ jsx("div", { className: styles$6.techIcon, style: { top: "20%", left: "10%" }, children: "React" }),
          /* @__PURE__ */ jsx("div", { className: styles$6.techIcon, style: { top: "60%", left: "15%" }, children: "Native" }),
          /* @__PURE__ */ jsx("div", { className: styles$6.techIcon, style: { top: "30%", right: "15%" }, children: "TypeScript" }),
          /* @__PURE__ */ jsx("div", { className: styles$6.techIcon, style: { bottom: "25%", right: "10%" }, children: "iOS" })
        ] })
      ]
    }
  );
}
const servicesWrapper = "_servicesWrapper_11w01_1";
const servicesContainer = "_servicesContainer_11w01_7";
const particles$1 = "_particles_11w01_20";
const particle$1 = "_particle_11w01_20";
const backgroundContainer = "_backgroundContainer_11w01_50";
const backgroundImage = "_backgroundImage_11w01_59";
const active = "_active_11w01_71";
const contentContainer = "_contentContainer_11w01_76";
const serviceContent = "_serviceContent_11w01_86";
const serviceCard = "_serviceCard_11w01_103";
const orange = "_orange_11w01_138";
const serviceNumber = "_serviceNumber_11w01_145";
const serviceSubtitle = "_serviceSubtitle_11w01_152";
const techBadge = "_techBadge_11w01_156";
const darkGray = "_darkGray_11w01_167";
const lightGray = "_lightGray_11w01_205";
const serviceHeader = "_serviceHeader_11w01_252";
const serviceTitle = "_serviceTitle_11w01_267";
const serviceDescription = "_serviceDescription_11w01_284";
const technologies$1 = "_technologies_11w01_292";
const progressIndicator = "_progressIndicator_11w01_314";
const progressDot = "_progressDot_11w01_325";
const completed = "_completed_11w01_358";
const styles$5 = {
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
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className: styles$5.servicesWrapper, children: /* @__PURE__ */ jsxs("div", { className: styles$5.servicesContainer, children: [
    /* @__PURE__ */ jsx("div", { className: styles$5.particles, children: Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: styles$5.particle,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsx("div", { className: styles$5.backgroundContainer, children: services.map((service, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `${styles$5.backgroundImage} ${index === currentIndex ? styles$5.active : ""}`,
        style: {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${service.backgroundImage})`
        }
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: styles$5.contentContainer, children: services.map((service, index) => {
      const colorVariant = index % 2 === 0 ? styles$5.orange : index === 1 ? styles$5.darkGray : styles$5.lightGray;
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: `${styles$5.serviceContent} ${index === currentIndex ? styles$5.active : ""}`,
          children: /* @__PURE__ */ jsxs("div", { className: `${styles$5.serviceCard} ${colorVariant}`, children: [
            /* @__PURE__ */ jsxs("div", { className: styles$5.serviceHeader, children: [
              /* @__PURE__ */ jsxs("span", { className: styles$5.serviceNumber, children: [
                "0",
                index + 1
              ] }),
              /* @__PURE__ */ jsx("h2", { className: styles$5.serviceTitle, children: t(service.titleKey) })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: styles$5.serviceSubtitle, children: t(service.subtitleKey) }),
            /* @__PURE__ */ jsx("p", { className: styles$5.serviceDescription, children: t(service.descriptionKey) }),
            /* @__PURE__ */ jsx("div", { className: styles$5.technologies, children: service.technologies.map((tech, techIndex) => /* @__PURE__ */ jsx("span", { className: styles$5.techBadge, children: tech }, techIndex)) })
          ] })
        },
        index
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: styles$5.progressIndicator, children: services.map((_, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `${styles$5.progressDot} ${index === currentIndex ? styles$5.active : ""} ${index < currentIndex ? styles$5.completed : ""}`
      },
      index
    )) })
  ] }) });
}
const otherAppsSection = "_otherAppsSection_2alwg_1";
const bgIcons = "_bgIcons_2alwg_12";
const bgIcon = "_bgIcon_2alwg_12";
const icon1 = "_icon1_2alwg_29";
const icon2 = "_icon2_2alwg_35";
const icon3 = "_icon3_2alwg_41";
const icon4 = "_icon4_2alwg_47";
const icon5 = "_icon5_2alwg_53";
const icon6 = "_icon6_2alwg_59";
const icon7 = "_icon7_2alwg_65";
const icon8 = "_icon8_2alwg_71";
const container$3 = "_container_2alwg_117";
const header$3 = "_header_2alwg_125";
const badge$3 = "_badge_2alwg_132";
const badgeIcon$3 = "_badgeIcon_2alwg_144";
const badgeText$3 = "_badgeText_2alwg_148";
const title$3 = "_title_2alwg_157";
const highlight$3 = "_highlight_2alwg_166";
const stackContainer = "_stackContainer_2alwg_174";
const stackItem = "_stackItem_2alwg_182";
const card = "_card_2alwg_222";
const cardImage = "_cardImage_2alwg_246";
const cardOverlay = "_cardOverlay_2alwg_267";
const cardNumber = "_cardNumber_2alwg_294";
const cardTitle = "_cardTitle_2alwg_312";
const cardDescription = "_cardDescription_2alwg_329";
const cardTags = "_cardTags_2alwg_345";
const tag = "_tag_2alwg_358";
const cardFooter = "_cardFooter_2alwg_376";
const viewProject = "_viewProject_2alwg_383";
const platforms = "_platforms_2alwg_396";
const platform = "_platform_2alwg_396";
const styles$4 = {
  otherAppsSection,
  bgIcons,
  bgIcon,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  container: container$3,
  header: header$3,
  badge: badge$3,
  badgeIcon: badgeIcon$3,
  badgeText: badgeText$3,
  title: title$3,
  highlight: highlight$3,
  stackContainer,
  stackItem,
  card,
  cardImage,
  cardOverlay,
  cardNumber,
  cardTitle,
  cardDescription,
  cardTags,
  tag,
  cardFooter,
  viewProject,
  platforms,
  platform
};
const otherProjects = [
  {
    name: "BuyVoice",
    category: "Remix",
    descriptionKey: "apps.buyvoice.description",
    tags: ["React Native", "OpenAI"],
    image: "/app-icon.png",
    platforms: ["ios", "android"],
    url: "https://www.buyvoice.app"
  },
  {
    name: "Hundezonen",
    category: "APP",
    descriptionKey: "apps.hundezonen.description",
    tags: ["React", "Next.js"],
    image: "/hnde.png",
    platforms: ["ios", "android"],
    url: "https://www.hundezonen.ch"
  },
  {
    name: "FoodScan AI",
    category: "APP",
    descriptionKey: "apps.foodscan.description",
    tags: ["React Native", "OpenAI", "Next.js"],
    image: "/foof.png",
    platforms: ["ios", "android"],
    url: "https://www.foodscan-ai.com"
  },
  {
    name: "DogMentor KI",
    category: "React",
    descriptionKey: "apps.dogmentor.description",
    tags: ["React Native"],
    image: "/dog.jpg",
    platforms: ["ios", "android"],
    url: "https://dog-mentor.com"
  },
  {
    name: "KetoRecipeLab",
    category: "APP",
    descriptionKey: "apps.keto.description",
    tags: ["React", "Next.js"],
    image: "/iconoapp.png",
    platforms: ["ios", "android"],
    url: "https://keto-recipe.app"
  },
  {
    name: "Work Ti",
    category: "APP",
    descriptionKey: "apps.workti.description",
    tags: ["React", "Next.js"],
    image: "/workti.png",
    platforms: ["ios", "android"],
    url: "https://www.workti.app"
  }
];
function OtherApps() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: styles$4.otherAppsSection, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$4.bgIcons, children: [
      /* @__PURE__ */ jsx("svg", { className: `${styles$4.bgIcon} ${styles$4.icon1}`, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" }) }),
      /* @__PURE__ */ jsx("svg", { className: `${styles$4.bgIcon} ${styles$4.icon2}`, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" }) }),
      /* @__PURE__ */ jsx("svg", { className: `${styles$4.bgIcon} ${styles$4.icon3}`, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" }) }),
      /* @__PURE__ */ jsx("svg", { className: `${styles$4.bgIcon} ${styles$4.icon4}`, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" }) }),
      /* @__PURE__ */ jsx("svg", { className: `${styles$4.bgIcon} ${styles$4.icon5}`, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12,10.11C13.03,10.11 13.87,10.95 13.87,12C13.87,13 13.03,13.85 12,13.85C10.97,13.85 10.13,13 10.13,12C10.13,10.95 10.97,10.11 12,10.11M7.37,20C8,20.38 9.38,19.8 10.97,18.3C9.54,16.88 8.15,15.27 6.89,13.62C6.27,13.72 5.76,13.78 5.37,13.78C4.84,13.78 4.6,13.64 4.5,13.55C4.25,13.33 4.2,12.95 4.2,12.66C4.2,12.11 4.38,11.5 4.68,10.86C5.08,10 5.68,9.23 6.44,8.94C7.29,8.64 8.32,8.89 9.38,9.71C10.08,10.26 10.78,10.92 11.5,11.6C12.18,10.92 12.88,10.26 13.58,9.71C14.64,8.89 15.67,8.64 16.52,8.94C17.28,9.23 17.88,10 18.28,10.86C18.58,11.5 18.76,12.11 18.76,12.66C18.76,12.95 18.71,13.33 18.46,13.55C18.36,13.64 18.12,13.78 17.59,13.78C17.2,13.78 16.69,13.72 16.07,13.62C14.81,15.27 13.42,16.88 11.99,18.3C13.58,19.8 14.96,20.38 15.59,20C16.09,19.66 16.62,18.43 16.84,16.67C16.81,16.67 16.8,16.67 16.77,16.67C15.39,16.67 13.87,17.39 12,18.4C10.13,17.39 8.61,16.67 7.23,16.67C7.2,16.67 7.19,16.67 7.16,16.67C7.38,18.43 7.91,19.66 8.41,20C9.04,20.38 10.42,19.8 12.01,18.3L12,18.3C13.42,16.88 14.81,15.27 16.07,13.62C16.69,13.72 17.2,13.78 17.59,13.78C18.12,13.78 18.36,13.64 18.46,13.55C18.71,13.33 18.76,12.95 18.76,12.66C18.76,12.11 18.58,11.5 18.28,10.86C17.88,10 17.28,9.23 16.52,8.94C15.67,8.64 14.64,8.89 13.58,9.71C12.88,10.26 12.18,10.92 11.5,11.6C10.82,10.92 10.12,10.26 9.42,9.71C8.36,8.89 7.33,8.64 6.48,8.94C5.72,9.23 5.12,10 4.72,10.86C4.42,11.5 4.24,12.11 4.24,12.66C4.24,12.95 4.29,13.33 4.54,13.55C4.64,13.64 4.88,13.78 5.41,13.78C5.8,13.78 6.31,13.72 6.93,13.62C8.19,15.27 9.58,16.88 11.01,18.3C9.42,19.8 8.04,20.38 7.41,20M9.75,12C10.8,13.5 11.9,14.9 13.1,16.2C14.3,14.9 15.4,13.5 16.45,12C15.4,10.5 14.3,9.1 13.1,7.8C11.9,9.1 10.8,10.5 9.75,12Z" }) }),
      /* @__PURE__ */ jsx("svg", { className: `${styles$4.bgIcon} ${styles$4.icon6}`, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12,10.11C13.03,10.11 13.87,10.95 13.87,12C13.87,13 13.03,13.85 12,13.85C10.97,13.85 10.13,13 10.13,12C10.13,10.95 10.97,10.11 12,10.11M7.37,20C8,20.38 9.38,19.8 10.97,18.3C9.54,16.88 8.15,15.27 6.89,13.62C6.27,13.72 5.76,13.78 5.37,13.78C4.84,13.78 4.6,13.64 4.5,13.55C4.25,13.33 4.2,12.95 4.2,12.66C4.2,12.11 4.38,11.5 4.68,10.86C5.08,10 5.68,9.23 6.44,8.94C7.29,8.64 8.32,8.89 9.38,9.71C10.08,10.26 10.78,10.92 11.5,11.6C12.18,10.92 12.88,10.26 13.58,9.71C14.64,8.89 15.67,8.64 16.52,8.94C17.28,9.23 17.88,10 18.28,10.86C18.58,11.5 18.76,12.11 18.76,12.66C18.76,12.95 18.71,13.33 18.46,13.55C18.36,13.64 18.12,13.78 17.59,13.78C17.2,13.78 16.69,13.72 16.07,13.62C14.81,15.27 13.42,16.88 11.99,18.3C13.58,19.8 14.96,20.38 15.59,20C16.09,19.66 16.62,18.43 16.84,16.67C16.81,16.67 16.8,16.67 16.77,16.67C15.39,16.67 13.87,17.39 12,18.4C10.13,17.39 8.61,16.67 7.23,16.67C7.2,16.67 7.19,16.67 7.16,16.67C7.38,18.43 7.91,19.66 8.41,20C9.04,20.38 10.42,19.8 12.01,18.3L12,18.3C13.42,16.88 14.81,15.27 16.07,13.62C16.69,13.72 17.2,13.78 17.59,13.78C18.12,13.78 18.36,13.64 18.46,13.55C18.71,13.33 18.76,12.95 18.76,12.66C18.76,12.11 18.58,11.5 18.28,10.86C17.88,10 17.28,9.23 16.52,8.94C15.67,8.64 14.64,8.89 13.58,9.71C12.88,10.26 12.18,10.92 11.5,11.6C10.82,10.92 10.12,10.26 9.42,9.71C8.36,8.89 7.33,8.64 6.48,8.94C5.72,9.23 5.12,10 4.72,10.86C4.42,11.5 4.24,12.11 4.24,12.66C4.24,12.95 4.29,13.33 4.54,13.55C4.64,13.64 4.88,13.78 5.41,13.78C5.8,13.78 6.31,13.72 6.93,13.62C8.19,15.27 9.58,16.88 11.01,18.3C9.42,19.8 8.04,20.38 7.41,20M9.75,12C10.8,13.5 11.9,14.9 13.1,16.2C14.3,14.9 15.4,13.5 16.45,12C15.4,10.5 14.3,9.1 13.1,7.8C11.9,9.1 10.8,10.5 9.75,12Z" }) }),
      /* @__PURE__ */ jsx("svg", { className: `${styles$4.bgIcon} ${styles$4.icon7}`, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M0,20.0025781 C0,20.5528125 0.44771525,21 1,21 L23,21 C23.5522847,21 24,20.5528125 24,20.0025781 L24,3.9974219 C24,3.4471875 23.5522847,3 23,3 L1,3 C0.44771525,3 0,3.4471875 0,3.9974219 L0,20.0025781 Z M4.5,7 L19.5,7 C20.3284271,7 21,7.67157288 21,8.5 L21,15.5 C21,16.3284271 20.3284271,17 19.5,17 L4.5,17 C3.67157288,17 3,16.3284271 3,15.5 L3,8.5 C3,7.67157288 3.67157288,7 4.5,7 Z" }) }),
      /* @__PURE__ */ jsx("svg", { className: `${styles$4.bgIcon} ${styles$4.icon8}`, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M0,20.0025781 C0,20.5528125 0.44771525,21 1,21 L23,21 C23.5522847,21 24,20.5528125 24,20.0025781 L24,3.9974219 C24,3.4471875 23.5522847,3 23,3 L1,3 C0.44771525,3 0,3.4471875 0,3.9974219 L0,20.0025781 Z M4.5,7 L19.5,7 C20.3284271,7 21,7.67157288 21,8.5 L21,15.5 C21,16.3284271 20.3284271,17 19.5,17 L4.5,17 C3.67157288,17 3,16.3284271 3,15.5 L3,8.5 C3,7.67157288 3.67157288,7 4.5,7 Z" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$4.container, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$4.header, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$4.badge, children: [
          /* @__PURE__ */ jsx("span", { className: styles$4.badgeIcon, children: "📱" }),
          /* @__PURE__ */ jsx("span", { className: styles$4.badgeText, children: "Portfolio" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: styles$4.title, children: [
          t("apps.title"),
          " ",
          /* @__PURE__ */ jsx("span", { className: styles$4.highlight, children: t("apps.subtitle") })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$4.stackContainer, children: otherProjects.map((project, index) => /* @__PURE__ */ jsx("div", { className: styles$4.stackItem, "data-index": index, children: /* @__PURE__ */ jsx(
        "a",
        {
          href: project.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: styles$4.card,
          children: /* @__PURE__ */ jsxs("div", { className: styles$4.cardImage, children: [
            /* @__PURE__ */ jsx("img", { src: project.image, alt: project.name }),
            /* @__PURE__ */ jsxs("div", { className: styles$4.cardOverlay, children: [
              /* @__PURE__ */ jsx("span", { className: styles$4.cardNumber, children: String(index + 1).padStart(2, "0") }),
              /* @__PURE__ */ jsx("h3", { className: styles$4.cardTitle, children: project.name }),
              /* @__PURE__ */ jsx("p", { className: styles$4.cardDescription, children: t(project.descriptionKey) }),
              /* @__PURE__ */ jsx("div", { className: styles$4.cardTags, children: project.tags.map((tag2) => /* @__PURE__ */ jsx("span", { className: styles$4.tag, children: tag2 }, tag2)) }),
              /* @__PURE__ */ jsxs("div", { className: styles$4.cardFooter, children: [
                /* @__PURE__ */ jsx("span", { className: styles$4.viewProject, children: "Ver Proyecto →" }),
                /* @__PURE__ */ jsxs("div", { className: styles$4.platforms, children: [
                  project.platforms.includes("ios") && /* @__PURE__ */ jsx("span", { className: styles$4.platform, title: "iOS", children: "🍎" }),
                  project.platforms.includes("android") && /* @__PURE__ */ jsx("span", { className: styles$4.platform, title: "Android", children: "🤖" })
                ] })
              ] })
            ] })
          ] })
        }
      ) }, project.name)) })
    ] })
  ] });
}
const websitesSection = "_websitesSection_1b1ke_1";
const container$2 = "_container_1b1ke_27";
const header$2 = "_header_1b1ke_35";
const badge$2 = "_badge_1b1ke_40";
const badgeIcon$2 = "_badgeIcon_1b1ke_52";
const badgeText$2 = "_badgeText_1b1ke_56";
const title$2 = "_title_1b1ke_65";
const highlight$2 = "_highlight_1b1ke_74";
const bentoGrid = "_bentoGrid_1b1ke_82";
const large = "_large_1b1ke_90";
const medium = "_medium_1b1ke_95";
const small = "_small_1b1ke_100";
const bentoItem = "_bentoItem_1b1ke_106";
const animate = "_animate_1b1ke_123";
const morphIn = "_morphIn_1b1ke_1";
const hoveredGrid = "_hoveredGrid_1b1ke_152";
const pulseGlow = "_pulseGlow_1b1ke_1";
const featured = "_featured_1b1ke_196";
const bentoImage = "_bentoImage_1b1ke_201";
const bentoOverlay = "_bentoOverlay_1b1ke_218";
const bentoContent = "_bentoContent_1b1ke_240";
const frameworkBadge = "_frameworkBadge_1b1ke_249";
const bentoTitle = "_bentoTitle_1b1ke_269";
const bentoDescription = "_bentoDescription_1b1ke_287";
const techTags = "_techTags_1b1ke_309";
const techTag = "_techTag_1b1ke_309";
const gradientBorder = "_gradientBorder_1b1ke_336";
const hoverArrow = "_hoverArrow_1b1ke_352";
const bgDecoration = "_bgDecoration_1b1ke_378";
const bgBlob1$1 = "_bgBlob1_1b1ke_385";
const float = "_float_1b1ke_1";
const bgBlob2$1 = "_bgBlob2_1b1ke_397";
const styles$3 = {
  websitesSection,
  container: container$2,
  header: header$2,
  badge: badge$2,
  badgeIcon: badgeIcon$2,
  badgeText: badgeText$2,
  title: title$2,
  highlight: highlight$2,
  bentoGrid,
  large,
  medium,
  small,
  bentoItem,
  animate,
  morphIn,
  hoveredGrid,
  pulseGlow,
  featured,
  bentoImage,
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
  const sectionRef = useRef(null);
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
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: styles$3.websitesSection, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: styles$3.container,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: [
          /* @__PURE__ */ jsxs("div", { className: styles$3.header, children: [
            /* @__PURE__ */ jsxs("div", { className: styles$3.badge, children: [
              /* @__PURE__ */ jsx("span", { className: styles$3.badgeIcon, children: "🌐" }),
              /* @__PURE__ */ jsx("span", { className: styles$3.badgeText, children: "Portfolio Web" })
            ] }),
            /* @__PURE__ */ jsxs("h2", { className: styles$3.title, children: [
              t("websites.title.part1"),
              " ",
              /* @__PURE__ */ jsx("span", { className: styles$3.highlight, children: t("websites.title.highlight") })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `${styles$3.bentoGrid} ${isVisible ? styles$3.animate : ""} ${isHovered ? styles$3.hoveredGrid : ""}`, children: websites.map((site, index) => {
            const colors = frameworkColors[site.framework] || frameworkColors["Next.js"];
            return /* @__PURE__ */ jsxs(
              "a",
              {
                href: site.projectUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: `${styles$3.bentoItem} ${styles$3[site.size]} ${site.featured ? styles$3.featured : ""}`,
                style: { animationDelay: `${index * 0.1}s` },
                children: [
                  /* @__PURE__ */ jsxs("div", { className: styles$3.bentoImage, children: [
                    /* @__PURE__ */ jsx("img", { src: site.imageUrl, alt: site.title }),
                    /* @__PURE__ */ jsx("div", { className: styles$3.bentoOverlay })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: styles$3.bentoContent, children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: styles$3.frameworkBadge,
                        style: {
                          background: colors.bg,
                          borderColor: colors.border,
                          color: colors.text
                        },
                        children: site.framework
                      }
                    ),
                    /* @__PURE__ */ jsx("h3", { className: styles$3.bentoTitle, children: site.title }),
                    /* @__PURE__ */ jsx("p", { className: styles$3.bentoDescription, children: site.description }),
                    /* @__PURE__ */ jsx("div", { className: styles$3.techTags, children: site.technologies.map((tech, i) => /* @__PURE__ */ jsx("span", { className: styles$3.techTag, children: tech }, i)) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: styles$3.gradientBorder }),
                  /* @__PURE__ */ jsx("div", { className: styles$3.hoverArrow, children: /* @__PURE__ */ jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M7 17L17 7M17 7H7M17 7V17", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
                ]
              },
              site.id
            );
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: styles$3.bgDecoration, children: [
      /* @__PURE__ */ jsx("div", { className: styles$3.bgBlob1 }),
      /* @__PURE__ */ jsx("div", { className: styles$3.bgBlob2 })
    ] })
  ] });
}
const carouselSection = "_carouselSection_10cvw_1";
const loading = "_loading_10cvw_10";
const loadingPlaceholder = "_loadingPlaceholder_10cvw_16";
const backgroundDecorations = "_backgroundDecorations_10cvw_31";
const bgBlob1 = "_bgBlob1_10cvw_38";
const bgBlob2 = "_bgBlob2_10cvw_49";
const header$1 = "_header_10cvw_61";
const badge$1 = "_badge_10cvw_68";
const badgeIcon$1 = "_badgeIcon_10cvw_80";
const badgeText$1 = "_badgeText_10cvw_84";
const title$1 = "_title_10cvw_93";
const highlight$1 = "_highlight_10cvw_102";
const subtitle$1 = "_subtitle_10cvw_109";
const carouselContainer = "_carouselContainer_10cvw_118";
const gradientLeft = "_gradientLeft_10cvw_123";
const gradientRight = "_gradientRight_10cvw_124";
const scrollTrack = "_scrollTrack_10cvw_144";
const dragging = "_dragging_10cvw_157";
const techGrid = "_techGrid_10cvw_162";
const scrolling = "_scrolling_10cvw_169";
const techItem = "_techItem_10cvw_187";
const techCard = "_techCard_10cvw_191";
const cardGlow = "_cardGlow_10cvw_213";
const techIcon = "_techIcon_10cvw_228";
const techName = "_techName_10cvw_239";
const cornerAccent = "_cornerAccent_10cvw_251";
const styles$2 = {
  carouselSection,
  loading,
  loadingPlaceholder,
  backgroundDecorations,
  bgBlob1,
  bgBlob2,
  header: header$1,
  badge: badge$1,
  badgeIcon: badgeIcon$1,
  badgeText: badgeText$1,
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
    return /* @__PURE__ */ jsx("div", { className: styles$2.loading, children: /* @__PURE__ */ jsx("div", { className: styles$2.loadingPlaceholder }) });
  }
  const duplicatedTech = [...technologies, ...technologies];
  return /* @__PURE__ */ jsxs("section", { className: styles$2.carouselSection, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$2.backgroundDecorations, children: [
      /* @__PURE__ */ jsx("div", { className: styles$2.bgBlob1 }),
      /* @__PURE__ */ jsx("div", { className: styles$2.bgBlob2 })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$2.header, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$2.badge, children: [
        /* @__PURE__ */ jsx("span", { className: styles$2.badgeIcon, children: "✨" }),
        /* @__PURE__ */ jsx("span", { className: styles$2.badgeText, children: t("tech.badge") })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: styles$2.title, children: [
        t("tech.title.part1"),
        " ",
        /* @__PURE__ */ jsx("span", { className: styles$2.highlight, children: t("tech.title.highlight") })
      ] }),
      /* @__PURE__ */ jsx("p", { className: styles$2.subtitle, children: t("tech.subtitle") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$2.carouselContainer, children: [
      /* @__PURE__ */ jsx("div", { className: styles$2.gradientLeft }),
      /* @__PURE__ */ jsx("div", { className: styles$2.gradientRight }),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: containerRef,
          className: `${styles$2.scrollTrack} ${isDragging ? styles$2.dragging : ""}`,
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseUp,
          onMouseLeave: handleMouseLeave,
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd,
          children: /* @__PURE__ */ jsx("div", { className: `${styles$2.techGrid} ${isDragging ? "" : styles$2.scrolling}`, children: duplicatedTech.map((tech, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: styles$2.techItem,
              children: /* @__PURE__ */ jsxs("div", { className: styles$2.techCard, children: [
                /* @__PURE__ */ jsx("div", { className: styles$2.cardGlow }),
                /* @__PURE__ */ jsx("div", { className: styles$2.techIcon, children: /* @__PURE__ */ jsx(tech.icon, { style: { color: tech.color } }) }),
                /* @__PURE__ */ jsx("span", { className: styles$2.techName, children: tech.name }),
                /* @__PURE__ */ jsx("div", { className: styles$2.cornerAccent })
              ] })
            },
            `${tech.name}-${index}`
          )) })
        }
      )
    ] })
  ] });
}
const contactSection = "_contactSection_lded1_1";
const backgroundPattern = "_backgroundPattern_lded1_14";
const gridPattern = "_gridPattern_lded1_21";
const movingGradient = "_movingGradient_lded1_40";
const particles = "_particles_lded1_67";
const particle = "_particle_lded1_67";
const container$1 = "_container_lded1_96";
const header = "_header_lded1_104";
const badge = "_badge_lded1_121";
const badgePulse = "_badgePulse_lded1_135";
const badgeIcon = "_badgeIcon_lded1_154";
const badgeText = "_badgeText_lded1_169";
const title = "_title_lded1_179";
const highlight = "_highlight_lded1_189";
const subtitle = "_subtitle_lded1_207";
const cardsGrid = "_cardsGrid_lded1_217";
const contactCard = "_contactCard_lded1_225";
const cardGlowFollow = "_cardGlowFollow_lded1_276";
const ripple = "_ripple_lded1_289";
const cardContent = "_cardContent_lded1_312";
const iconWrapper = "_iconWrapper_lded1_321";
const iconGlow = "_iconGlow_lded1_338";
const icon = "_icon_lded1_321";
const iconRing = "_iconRing_lded1_364";
const textContent = "_textContent_lded1_384";
const label = "_label_lded1_390";
const value = "_value_lded1_404";
const flag = "_flag_lded1_419";
const arrow = "_arrow_lded1_433";
const cornerTopLeft = "_cornerTopLeft_lded1_458";
const cornerBottomRight = "_cornerBottomRight_lded1_459";
const animatedBorder = "_animatedBorder_lded1_495";
const ctaSection = "_ctaSection_lded1_527";
const ctaCard = "_ctaCard_lded1_532";
const ctaVideoContainer = "_ctaVideoContainer_lded1_543";
const ctaVideo = "_ctaVideo_lded1_543";
const ctaVideoOverlay = "_ctaVideoOverlay_lded1_562";
const ctaContent = "_ctaContent_lded1_575";
const ctaGlow = "_ctaGlow_lded1_582";
const ctaTitle = "_ctaTitle_lded1_609";
const ctaText = "_ctaText_lded1_619";
const ctaButtons = "_ctaButtons_lded1_630";
const btnPrimary = "_btnPrimary_lded1_637";
const btnShine = "_btnShine_lded1_667";
const btnIcon = "_btnIcon_lded1_698";
const floatingElements = "_floatingElements_lded1_722";
const floatingCircle1 = "_floatingCircle1_lded1_729";
const floatingCircle2 = "_floatingCircle2_lded1_730";
const floatingCircle3 = "_floatingCircle3_lded1_731";
const languageSelector = "_languageSelector_lded1_790";
const langButton = "_langButton_lded1_799";
const langButtonActive = "_langButtonActive_lded1_820";
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
  cardGlowFollow,
  ripple,
  cardContent,
  iconWrapper,
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
  animatedBorder,
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
          /* @__PURE__ */ jsx("span", { className: styles$1.badgeText, children: "Contacto" })
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
            "video",
            {
              autoPlay: true,
              loop: true,
              muted: true,
              playsInline: true,
              className: styles$1.ctaVideo,
              children: /* @__PURE__ */ jsx("source", { src: "/copy_7C1BBA34-F73A-4C24-BBCD-896761F89D78.mp4", type: "video/mp4" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: styles$1.ctaVideoOverlay })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$1.ctaContent, children: [
          /* @__PURE__ */ jsx("div", { className: styles$1.ctaGlow }),
          /* @__PURE__ */ jsx("h3", { className: styles$1.ctaTitle, children: t("contact.cta.title") }),
          /* @__PURE__ */ jsx("p", { className: styles$1.ctaText, children: t("contact.cta.subtitle") }),
          /* @__PURE__ */ jsx("div", { className: styles$1.ctaButtons, children: /* @__PURE__ */ jsxs("button", { onClick: handleDownloadVCard, className: styles$1.btnPrimary, children: [
            /* @__PURE__ */ jsx(HiDownload, { className: styles$1.btnIcon }),
            /* @__PURE__ */ jsx("span", { children: t("contact.cta.button") }),
            /* @__PURE__ */ jsx("div", { className: styles$1.btnShine })
          ] }) })
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
const footer = "_footer_m34db_1";
const container = "_container_m34db_9";
const copyright = "_copyright_m34db_19";
const links = "_links_m34db_26";
const link = "_link_m34db_26";
const modal = "_modal_m34db_64";
const modalContent = "_modalContent_m34db_86";
const closeButton = "_closeButton_m34db_110";
const modalTitle = "_modalTitle_m34db_134";
const modalBody = "_modalBody_m34db_146";
const note = "_note_m34db_181";
const contact = "_contact_m34db_187";
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
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { id: "inicio", children: /* @__PURE__ */ jsx(Hero, {}) }),
    /* @__PURE__ */ jsx("div", { id: "servicios", children: /* @__PURE__ */ jsx(Services, {}) }),
    /* @__PURE__ */ jsx("div", { id: "proyectos", children: /* @__PURE__ */ jsx(OtherApps, {}) }),
    /* @__PURE__ */ jsx(Websites, {}),
    /* @__PURE__ */ jsx("div", { id: "tech", children: /* @__PURE__ */ jsx(TechCarousel, {}) }),
    /* @__PURE__ */ jsx("div", { id: "contacto", children: /* @__PURE__ */ jsx(Contact, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B8IISQVU.js", "imports": ["/assets/components-C5Mjsiww.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-BhZPlYAY.js", "imports": ["/assets/components-C5Mjsiww.js", "/assets/LanguageContext-DKIZiKeH.js"], "css": ["/assets/root-DKGt5bSo.css"] }, "routes/home.module": { "id": "routes/home.module", "parentId": "root", "path": "home/module", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home.module-Cq0dpi_J.js", "imports": [], "css": ["/assets/home-dOusLAbc.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DlV8hVki.js", "imports": ["/assets/components-C5Mjsiww.js", "/assets/LanguageContext-DKIZiKeH.js"], "css": ["/assets/_index-D9OUfpGM.css"] } }, "url": "/assets/manifest-5284b8c1.js", "version": "5284b8c1" };
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
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
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
