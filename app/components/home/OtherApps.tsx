import styles from "./OtherApps.module.css";

const otherProjects = [
  {
    name: "BuyVoice",
    category: "Remix",
    description: "Habla y la lista se crea automáticamente. Lista de compras con IA.",
    tags: ["React Native", "OpenAI"],
    image: "/app-icon.png",
    platforms: ["ios", "android"],
  },
  {
    name: "Hundezonen",
    category: "APP",
    description: "La app para ti y tu perro. Encuentra zonas para perros cerca de ti.",
    tags: ["React", "Next.js"],
    image: "/hnde.png",
    platforms: ["ios", "android"],
  },

  {
    name: "FoodScan AI",
    category: "APP",
    description: "¡Transforma tu nevera en recetas! Sugerencias de recetas con IA.",
    tags: ["React Native", "OpenAI", "Next.js"],
    image: "/foof.png",
    platforms: ["ios", "android"],
  },
  {
    name: "DogMentor KI",
    category: "React",
    description: "¡Todo lo que necesitas saber sobre perros!",
    tags: ["React Native"],
    image: "/dog.jpg",
    platforms: ["ios", "android"],
  },
  
    {
    name: "Work Ti",
    category: "APP",
    description: "Control de tiempo inteligente para equipos y freelancers.",
    tags: ["React", "Next.js"],
    image: "/workti.png",
    platforms: ["web"],
  },
];

export function OtherApps() {
  return (
    <section className={styles.otherAppsSection}>
      <div className={styles.container}>
     
        <div className={styles.grid}>
          {otherProjects.map((project) => (
            <div key={project.name} className={styles.card}>
              <div className={styles.cardImage}>
                <img src={project.image} alt={project.name} />
                <div className={styles.cardOverlay}>
                  <h4 className={styles.cardTitle}>{project.name}</h4>
                  <p className={styles.cardDescription}>{project.description}</p>
                  <div className={styles.platforms}>
                    {project.platforms.includes("ios") && (
                      <span className={styles.platform} title="iOS">📱</span>
                    )}
                    {project.platforms.includes("android") && (
                      <span className={styles.platform} title="Android">🤖</span>
                    )}
                    {project.platforms.includes("web") && (
                      <span className={styles.platform} title="Web">🌐</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
