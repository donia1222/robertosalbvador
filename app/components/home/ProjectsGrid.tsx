import { useEffect, useRef, useState } from "react";
import styles from "./ProjectsGrid.module.css";

const projects = [
  {
    name: "BuyVoice",
    category: "Remix",
    description: "Habla y la lista se crea automáticamente. Lista de compras con IA.",
    tags: ["React Native", "OpenAI"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    platforms: ["ios", "android"],
    featured: false,
  },
  {
    name: "Hundezonen",
    category: "APP",
    description: "La app para ti y tu perro. Encuentra zonas para perros cerca de ti.",
    tags: ["React", "Next.js"],
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    platforms: ["ios", "android"],
    featured: true,
  },
  {
    name: "Vix Time",
    category: "APP",
    description: "Control de tiempo inteligente para equipos y freelancers.",
    tags: ["React", "Next.js"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    platforms: ["web"],
    featured: false,
  },
  {
    name: "FoodScan AI",
    category: "APP",
    description: "¡Transforma tu nevera en recetas! Sugerencias de recetas con IA.",
    tags: ["React Native", "OpenAI", "Next.js"],
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    platforms: ["ios", "android"],
    featured: true,
  },
  {
    name: "DogMentor KI",
    category: "React",
    description: "¡Todo lo que necesitas saber sobre perros!",
    tags: ["React Native"],
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    platforms: ["ios", "android"],
    featured: false,
  },
  {
    name: "KetoRecipeLab",
    category: "APP",
    description: "Crea recetas únicas Keto & Paleo en segundos con IA.",
    tags: ["React Native", "OpenAI", "Recipe AI"],
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    platforms: ["ios", "android"],
    featured: true,
  },
];

interface ProjectsProps {
  backgroundImage?: string;
}

export function ProjectsGrid({ backgroundImage }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
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
    <section
      ref={sectionRef}
      className={`${styles.projects} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Portfolio</span>
          <h2 className={styles.title}>
            Apps & <span className={styles.highlight}>Proyectos</span>
          </h2>
          <p className={styles.subtitle}>
            Soluciones móviles que transforman ideas en realidad
          </p>
        </div>

        {/* Partículas decorativas y onda de expansión */}
        {isVisible && (
          <>
            <div className={styles.expandWave} />
            <div className={styles.burstParticles}>
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className={styles.burstParticle}
                  style={{
                    "--particle-index": i,
                    "--particle-angle": `${(i / 15) * 360}deg`,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </>
        )}

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={styles.card}
              style={{ "--card-index": index } as React.CSSProperties}
            >
              {project.featured && (
                <span className={styles.featuredBadge}>FEATURED</span>
              )}

              <div className={styles.cardImage}>
                <img src={project.image} alt={project.name} />
                <div className={styles.cardImageOverlay} />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.category}>{project.category}</span>
                  <h3 className={styles.cardTitle}>{project.name}</h3>
                </div>

                <p className={styles.cardDescription}>{project.description}</p>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <a href="#" className={styles.btnView}>
                    Ver Proyecto
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  {project.platforms.length > 0 && (
                    <div className={styles.platforms}>
                      {project.platforms.includes("ios") && (
                        <span className={styles.platform} title="iOS">

                        </span>
                      )}
                      {project.platforms.includes("android") && (
                        <span className={styles.platform} title="Android">
                          🤖
                        </span>
                      )}
                      {project.platforms.includes("web") && (
                        <span className={styles.platform} title="Web">
                          🌐
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
