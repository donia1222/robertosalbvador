import styles from "./Projects.module.css";

const projects = [
  {
    name: "BuyVoice",
    category: "Remix",
    description: "Sprich einfach – und die Liste erstellt sich von selbst. KI-gestützte Einkaufsliste.",
    tags: ["React Native", "OpenAI"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    platforms: ["ios", "android"],
    featured: false,
  },
  {
    name: "Hundezonen",
    category: "APP",
    description: "Die App für dich und deinen Hund. Finde Hundezonen in deiner Nähe.",
    tags: ["React", "Next.js"],
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    platforms: ["ios", "android"],
    featured: true,
  },
  {
    name: "Vix Time",
    category: "APP",
    description: "Intelligente Zeiterfassung für Teams und Freelancer.",
    tags: ["React", "Next.js"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    platforms: ["web"],
    featured: false,
  },
  {
    name: "FoodScan AI",
    category: "APP",
    description: "Transform Your Fridge into Recipes! KI-gestützte Rezeptvorschläge.",
    tags: ["React Native", "OpenAI", "Next.js"],
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
    platforms: ["ios", "android"],
    featured: true,
  },
  {
    name: "DogMentor KI",
    category: "React",
    description: "Everything you need to know about dogs!",
    tags: ["React Native"],
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    platforms: ["ios", "android"],
    featured: false,
  },
];

interface ProjectsProps {
  backgroundImage?: string;
}

export function Projects({ backgroundImage }: ProjectsProps) {
  return (
    <section className={styles.projects}>
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

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
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
                    Projekt ansehen
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
