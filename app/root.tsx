import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Analytics } from "@vercel/analytics/remix"
import { ThemeProvider, LanguageProvider, ColorProvider } from "~/context";
import { PageLoader } from "~/components/PageLoader";
import styles from "~/styles/global.css?url";

// Script para evitar flash de tema incorrecto
const themeScript = `
  (function() {
    const theme = localStorage.getItem('portfolio-theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
`;

// Script para aplicar colores guardados antes del render
const colorScript = `
  (function() {
    const colors = {
      cyan: { primary: '#06b6d4', secondary: '#22d3ee', accent: '#67e8f9' },
      orange: { primary: '#ff6b35', secondary: '#ff8c42', accent: '#ffa366' },
      blue: { primary: '#2563eb', secondary: '#3b82f6', accent: '#60a5fa' },
      green: { primary: '#10b981', secondary: '#34d399', accent: '#6ee7b7' },
      purple: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#c4b5fd' },
      red: { primary: '#ef4444', secondary: '#f87171', accent: '#fca5a5' },
      pink: { primary: '#ec4899', secondary: '#f472b6', accent: '#f9a8d4' }
    };
    const savedColor = localStorage.getItem('portfolio-color') || 'cyan';
    const scheme = colors[savedColor] || colors.cyan;
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

// Script para ocultar contenido hasta que cargue el loader
const loaderScript = `
  (function() {
    document.documentElement.style.setProperty('--initial-display', 'none');
  })();
`;

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/jpg", href: "/favicon.jpg" },
  { rel: "apple-touch-icon", href: "/favicon.jpg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Sora:wght@300;400;500;600;700;800&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: colorScript }} />
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
        <style dangerouslySetInnerHTML={{ __html: `
          #root-content {
            display: var(--initial-display, block);
          }
        ` }} />
      </head>
      <body>
        <div id="root-content">
          {children}
        </div>
        <ScrollRestoration />
        <Analytics/>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ColorProvider>
          <PageLoader />
          <Outlet />
        </ColorProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // Detectar idioma (por defecto alemán)
  const lang = typeof window !== "undefined"
    ? (localStorage.getItem("portfolio-language") || "de")
    : "de";

  const translations = {
    es: {
      oops: "¡Ups!",
      unexpected: "Ha ocurrido un error inesperado.",
      notFound: "La página que buscas no existe.",
      error: "Error",
    },
    de: {
      oops: "Hoppla!",
      unexpected: "Ein unerwarteter Fehler ist aufgetreten.",
      notFound: "Die gesuchte Seite existiert nicht.",
      error: "Fehler",
    },
    en: {
      oops: "Oops!",
      unexpected: "An unexpected error has occurred.",
      notFound: "The page you are looking for does not exist.",
      error: "Error",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.de;

  let message = t.oops;
  let details = t.unexpected;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : t.error;
    details =
      error.status === 404
        ? t.notFound
        : error.statusText || details;
  }

  return (
    <main style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{message}</h1>
      <p>{details}</p>
    </main>
  );
}
