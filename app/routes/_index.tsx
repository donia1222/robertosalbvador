import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Header, Hero, Services, Projects, OtherApps, Websites, ScrollTextReveal, RainEffect, TechCarousel, Contact, Footer } from "~/components/home";

type Language = "es" | "de";

// Metadatos por idioma
const metadata: Record<Language, { title: string; description: string; keywords: string }> = {
  es: {
    title: "Roberto Salvador | Desarrollador de Apps y Webs Modernas en Suiza | St. Gallen & Liechtenstein",
    description: "Desarrollador freelance especializado en aplicaciones móviles y páginas webs modernas en Suiza. React Native, Next.js, Remix. Servicios en St. Gallen, Liechtenstein y toda Suiza. +5 años de experiencia, 30+ apps desarrolladas.",
    keywords: "desarrollador apps Suiza, desarrollador web St. Gallen, React Native Liechtenstein, páginas web modernas Suiza, desarrollo móvil iOS Android, Next.js developer Switzerland, Remix developer, desarrollador freelance Suiza, app developer St. Gallen, web development Liechtenstein, desarrollador React Native Suiza",
  },
  de: {
    title: "Roberto Salvador | Entwickler für moderne Apps und Websites in der Schweiz | St. Gallen & Liechtenstein",
    description: "Freiberuflicher Entwickler spezialisiert auf mobile Anwendungen und moderne Websites in der Schweiz. React Native, Next.js, Remix. Dienstleistungen in St. Gallen, Liechtenstein und der gesamten Schweiz. +5 Jahre Erfahrung, 30+ entwickelte Apps.",
    keywords: "App Entwickler Schweiz, Web Entwickler St. Gallen, React Native Liechtenstein, moderne Websites Schweiz, Mobile Entwicklung iOS Android, Next.js Entwickler Schweiz, Remix Entwickler, Freelance Entwickler Schweiz, App Entwickler St. Gallen, Web Entwicklung Liechtenstein, React Native Entwickler Schweiz",
  },
};

export const loader: LoaderFunction = async ({ request }) => {
  // Intentar obtener el idioma de las cookies
  const cookieHeader = request.headers.get("Cookie");
  const lang = cookieHeader?.includes("portfolio-language=es") ? "es" : "de";
  return json({ lang });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const lang = (data?.lang || "de") as Language;
  const meta = metadata[lang];

  return [
    { title: meta.title },
    {
      name: "description",
      content: meta.description
    },
    {
      name: "keywords",
      content: meta.keywords
    },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lweb.ch" },
    { property: "og:title", content: meta.title },
    {
      property: "og:description",
      content: meta.description
    },
    { property: "og:image", content: "https://lweb.ch/og-image.jpg" },
    { property: "og:locale", content: lang === "es" ? "es_ES" : "de_CH" },
    { property: "og:locale:alternate", content: lang === "es" ? "de_CH" : "es_ES" },
    { property: "og:locale:alternate", content: "en_US" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: "https://lweb.ch" },
    { name: "twitter:title", content: meta.title },
    {
      name: "twitter:description",
      content: meta.description
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
    { name: "theme-color", content: "#ff6b35" },
  ];
};

export default function Index() {
  return (
    <div>
      <Header />
      <div id="inicio">
        <Hero />
      </div>
      <div id="servicios">
        <Services />
      </div>
      <div id="proyectos">
        <OtherApps />
      </div>
      <Websites />
      <ScrollTextReveal />

      <div id="tech">
        <TechCarousel />
      </div>
      <div id="contacto">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
