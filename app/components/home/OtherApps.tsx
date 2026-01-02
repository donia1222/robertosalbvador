import { useEffect, useRef, useState } from "react";
import styles from "./OtherApps.module.css";

const otherProjects = [
  {
    name: "BuyVoice",
    category: "Remix",
    description: "Habla y la lista se crea automáticamente. Lista de compras con IA.",
    tags: ["React Native", "OpenAI"],
    image: "/app-icon.png",
    platforms: ["ios", "android"],
    url: "https://www.buyvoice.app",
  },
  {
    name: "Hundezonen",
    category: "APP",
    description: "La app para ti y tu perro. Encuentra zonas para perros cerca de ti.",
    tags: ["React", "Next.js"],
    image: "/hnde.png",
    platforms: ["ios", "android"],
    url: "https://www.hundezonen.ch",
  },

  {
    name: "FoodScan AI",
    category: "APP",
    description: "¡Transforma tu nevera en recetas! Sugerencias de recetas con IA.",
    tags: ["React Native", "OpenAI", "Next.js"],
    image: "/foof.png",
    platforms: ["ios", "android"],
    url: "https://www.foodscan-ai.com",
  },
  {
    name: "DogMentor KI",
    category: "React",
    description: "¡Todo lo que necesitas saber sobre perros!",
    tags: ["React Native"],
    image: "/dog.jpg",
    platforms: ["ios", "android"],
    url: "https://dog-mentor.com",
  },

    {
    name: "KetoRecipeLab",
    category: "APP",
    description: "Create unique recipes Keto & Paleo",
    tags: ["React", "Next.js"],
    image: "/iconoapp.png",
    platforms: ["ios", "android"],
    url: "https://keto-recipe.app",
  },

    {
    name: "Work Ti",
    category: "APP",
    description: "Control de tiempo inteligente para equipos y freelancers.",
    tags: ["React", "Next.js"],
    image: "/workti.png",
    platforms: ["ios", "android"],
    url: "https://www.workti.app",
  },
];

export function OtherApps() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  return (
    <section id="proyectos" ref={sectionRef} className={styles.otherAppsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>📱</span>
            <span className={styles.badgeText}>Portfolio</span>
          </div>
          <h2 className={styles.title}>
            Mis apps <span className={styles.highlight}>publicadas</span>
          </h2>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.animate : ""}`}>
          {otherProjects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.cardImage}>
                <img src={project.image} alt={project.name} />
                <div className={styles.cardOverlay}>
                  <h4 className={styles.cardTitle}>{project.name}</h4>
                  <p className={styles.cardDescription}>{project.description}</p>
                  <div className={styles.platforms}>
                    {project.platforms.includes("ios") && (
                      <span className={styles.platform} title="iOS"></span>
                    )}
                    {project.platforms.includes("android") && (
                      <span className={styles.platform} title="Android"></span>
                    )}
                    {project.platforms.includes("web") && (
                      <span className={styles.platform} title="Web"></span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
