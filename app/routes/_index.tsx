import type { MetaFunction } from "@remix-run/node";
import { Header, Hero, Services, Projects, TechCarousel, Contact } from "~/components/home";

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
      <div id="proyectos">
        <Projects />
      </div>
      <div id="tech">
        <TechCarousel />
      </div>
      <div id="contacto">
        <Contact />
      </div>
    </div>
  );
}
