import type { MetaFunction } from "@remix-run/node";
import { MakingOfPage } from "~/components/making-of/MakingOfPage";

export const meta: MetaFunction = () => {
  return [
    { title: "Making Of - Apps | Roberto Salvador" },
    {
      name: "description",
      content: "Descubre cómo fueron creadas mis aplicaciones móviles. Arquitectura, tecnologías y proceso de desarrollo."
    },
    { property: "og:title", content: "Making Of - Apps | Roberto Salvador" },
    { property: "og:description", content: "Descubre cómo fueron creadas mis aplicaciones móviles" },
    { property: "og:type", content: "website" },
  ];
};

export default function MakingOf() {
  return <MakingOfPage />;
}
