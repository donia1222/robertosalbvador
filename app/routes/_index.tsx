import type { MetaFunction } from "@remix-run/node";
import { Header, Hero, Services, Projects, OtherApps, Websites, TechCarousel, Contact, Footer } from "~/components/home";

export const meta: MetaFunction = () => {
  return [
    { title: "Roberto Salvador | Desarrollador de Apps y Webs Modernas en Suiza | St. Gallen & Liechtenstein" },
    {
      name: "description",
      content: "Desarrollador freelance especializado en aplicaciones móviles y páginas webs modernas en Suiza. React Native, Next.js, Remix. Servicios en St. Gallen, Liechtenstein y toda Suiza. +5 años de experiencia, 30+ apps desarrolladas."
    },
    {
      name: "keywords",
      content: "desarrollador apps Suiza, desarrollador web St. Gallen, React Native Liechtenstein, páginas web modernas Suiza, desarrollo móvil iOS Android, Next.js developer Switzerland, Remix developer, desarrollador freelance Suiza, app developer St. Gallen, web development Liechtenstein, desarrollador React Native Suiza"
    },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lweb.ch" },
    { property: "og:title", content: "Roberto Salvador | Desarrollador de Apps y Webs Modernas en Suiza" },
    {
      property: "og:description",
      content: "Desarrollador freelance especializado en aplicaciones móviles y páginas webs modernas en Suiza. React Native, Next.js, Remix. Servicios en St. Gallen, Liechtenstein y toda Suiza."
    },
    { property: "og:image", content: "https://lweb.ch/og-image.jpg" },
    { property: "og:locale", content: "es_ES" },
    { property: "og:locale:alternate", content: "de_CH" },
    { property: "og:locale:alternate", content: "en_US" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: "https://lweb.ch" },
    { name: "twitter:title", content: "Roberto Salvador | Desarrollador de Apps y Webs Modernas en Suiza" },
    {
      name: "twitter:description",
      content: "Desarrollador freelance especializado en aplicaciones móviles y páginas webs modernas en Suiza. React Native, Next.js, Remix. Servicios en St. Gallen, Liechtenstein y toda Suiza."
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
    { name: "language", content: "Spanish" },
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
