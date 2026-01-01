import { useEffect, useRef, useState } from "react";
import styles from "./Projects.module.css";

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

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [flipRotation, setFlipRotation] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the component
      const scrollStart = -rect.top;
      const scrollEnd = containerHeight - windowHeight;
      const scrollPercentage = Math.max(0, Math.min(1, scrollStart / scrollEnd));

      // Determine which project to show
      const projectIndex = Math.min(
        Math.floor(scrollPercentage * projects.length),
        projects.length - 1
      );

      // Calculate smooth rotation within each section (0 to 1)
      const sectionProgress = (scrollPercentage * projects.length) % 1;

      // Simple 180° rotation per project
      const rotation = sectionProgress * 180;

      setCurrentIndex(projectIndex);
      setScrollProgress(sectionProgress);
      setFlipRotation(rotation);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.projectsWrapper}>
      <div className={styles.projectsContainer}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Portfolio</span>
          <h2 className={styles.title}>
            Apps & <span className={styles.highlight}>Proyectos</span>
          </h2>
        </div>

        {/* Flipping Card with Front and Back */}
        <div className={styles.cardPerspective}>
          <div
            className={styles.cardFlip}
            style={{
              transform: `rotateY(${flipRotation}deg)`,
            }}
          >
            {/* FRONT FACE - Current Project */}
            <div className={styles.cardFront}>
              <div className={styles.glassOverlay} />

              <div className={styles.projectImage}>
                <img
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].name}
                  style={{
                    transform: `scale(${1 + scrollProgress * 0.1})`,
                  }}
                />
                <div className={styles.imageOverlay} />
              </div>

              <div className={styles.projectContent}>
                {projects[currentIndex].featured && (
                  <span className={styles.featuredBadge}>FEATURED</span>
                )}

                <span className={styles.category}>{projects[currentIndex].category}</span>
                <h3 className={styles.projectTitle}>{projects[currentIndex].name}</h3>
                <p className={styles.projectDescription}>{projects[currentIndex].description}</p>

                <div className={styles.tags}>
                  {projects[currentIndex].tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.projectFooter}>
                  <a href="#" className={styles.btnView}>
                    Ver Proyecto
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  {projects[currentIndex].platforms.length > 0 && (
                    <div className={styles.platforms}>
                      {projects[currentIndex].platforms.includes("ios") && (
                        <span className={styles.platform} title="iOS">📱</span>
                      )}
                      {projects[currentIndex].platforms.includes("android") && (
                        <span className={styles.platform} title="Android">🤖</span>
                      )}
                      {projects[currentIndex].platforms.includes("web") && (
                        <span className={styles.platform} title="Web">🌐</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* BACK FACE - Next Project */}
            <div className={styles.cardBack}>
              <div className={styles.glassOverlay} />

              <div className={styles.projectImage}>
                <img
                  src={projects[Math.min(currentIndex + 1, projects.length - 1)].image}
                  alt={projects[Math.min(currentIndex + 1, projects.length - 1)].name}
                  style={{
                    transform: `scale(${1 + scrollProgress * 0.1})`,
                  }}
                />
                <div className={styles.imageOverlay} />
              </div>

              <div className={styles.projectContent}>
                {projects[Math.min(currentIndex + 1, projects.length - 1)].featured && (
                  <span className={styles.featuredBadge}>FEATURED</span>
                )}

                <span className={styles.category}>{projects[Math.min(currentIndex + 1, projects.length - 1)].category}</span>
                <h3 className={styles.projectTitle}>{projects[Math.min(currentIndex + 1, projects.length - 1)].name}</h3>
                <p className={styles.projectDescription}>{projects[Math.min(currentIndex + 1, projects.length - 1)].description}</p>

                <div className={styles.tags}>
                  {projects[Math.min(currentIndex + 1, projects.length - 1)].tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.projectFooter}>
                  <a href="#" className={styles.btnView}>
                    Ver Proyecto
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  {projects[Math.min(currentIndex + 1, projects.length - 1)].platforms.length > 0 && (
                    <div className={styles.platforms}>
                      {projects[Math.min(currentIndex + 1, projects.length - 1)].platforms.includes("ios") && (
                        <span className={styles.platform} title="iOS">📱</span>
                      )}
                      {projects[Math.min(currentIndex + 1, projects.length - 1)].platforms.includes("android") && (
                        <span className={styles.platform} title="Android">🤖</span>
                      )}
                      {projects[Math.min(currentIndex + 1, projects.length - 1)].platforms.includes("web") && (
                        <span className={styles.platform} title="Web">🌐</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className={styles.progressIndicator}>
          {projects.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressDot} ${
                index === currentIndex ? styles.active : ""
              } ${index < currentIndex ? styles.completed : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
