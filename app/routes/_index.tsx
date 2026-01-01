import type { MetaFunction } from "@remix-run/node";
import { Header, Hero, Services, Projects } from "~/components/home";

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
      <Hero />
      <Services />
      <Projects />
    </div>
  );
}
