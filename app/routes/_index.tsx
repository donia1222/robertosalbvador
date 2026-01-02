import type { MetaFunction } from "@remix-run/node";
import { Header, Hero, Services, Projects, OtherApps, TechCarousel, Contact, Footer } from "~/components/home";

export const meta: MetaFunction = () => {
  return [
    { title: "Roberto Salvador | React Native Specialist" },
    { name: "description", content: "Desarrollador freelance especializado en React Native. Creo aplicaciones móviles nativas de alto rendimiento para iOS y Android." },
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
 
      <OtherApps />
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
