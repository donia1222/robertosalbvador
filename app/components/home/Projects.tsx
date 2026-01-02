import { useEffect, useRef, useState } from "react";
import styles from "./Projects.module.css";

const projects = [

  {
    name: "KetoRecipeLab",
    category: "APP",
    description: "Crea recetas únicas Keto & Paleo en segundos con IA.",
    tags: ["React Native", "OpenAI", "Recipe AI"],
    image: "/keto.png",
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

      // Calculate continuous rotation (180° per project)
      const rotation = scrollPercentage * projects.length * 180;

      // Calculate progress within current section
      const sectionProgress = (scrollPercentage * projects.length) % 1;

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
            Apps <span className={styles.highlight}>Nativas</span>
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
              {/* Large decorative number */}
              <div className={styles.cardNumber}>{currentIndex + 1}</div>

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
                  <span className={styles.latestBadge}>ÚLTIMA APP</span>
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
              {/* Large decorative number */}
              <div className={styles.cardNumber}>
                {currentIndex < projects.length - 1 ? currentIndex + 2 : projects.length}
              </div>

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
                  <span className={styles.latestBadge}>ÚLTIMA APP</span>
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

      </div>
    </div>
  );
}
