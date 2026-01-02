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

import { ThemeProvider, LanguageProvider } from "~/context";
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
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Outlet />
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
