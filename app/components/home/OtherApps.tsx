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
    <section ref={sectionRef} className={styles.otherAppsSection}>
      {/* Background Icons */}
      <div className={styles.bgIcons}>
        {/* Apple App Store Icons */}
        <svg className={`${styles.bgIcon} ${styles.icon1}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        <svg className={`${styles.bgIcon} ${styles.icon2}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>

        {/* Google Play Icons */}
        <svg className={`${styles.bgIcon} ${styles.icon3}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
        </svg>
        <svg className={`${styles.bgIcon} ${styles.icon4}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
        </svg>

        {/* React Native Icons */}
        <svg className={`${styles.bgIcon} ${styles.icon5}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,10.11C13.03,10.11 13.87,10.95 13.87,12C13.87,13 13.03,13.85 12,13.85C10.97,13.85 10.13,13 10.13,12C10.13,10.95 10.97,10.11 12,10.11M7.37,20C8,20.38 9.38,19.8 10.97,18.3C9.54,16.88 8.15,15.27 6.89,13.62C6.27,13.72 5.76,13.78 5.37,13.78C4.84,13.78 4.6,13.64 4.5,13.55C4.25,13.33 4.2,12.95 4.2,12.66C4.2,12.11 4.38,11.5 4.68,10.86C5.08,10 5.68,9.23 6.44,8.94C7.29,8.64 8.32,8.89 9.38,9.71C10.08,10.26 10.78,10.92 11.5,11.6C12.18,10.92 12.88,10.26 13.58,9.71C14.64,8.89 15.67,8.64 16.52,8.94C17.28,9.23 17.88,10 18.28,10.86C18.58,11.5 18.76,12.11 18.76,12.66C18.76,12.95 18.71,13.33 18.46,13.55C18.36,13.64 18.12,13.78 17.59,13.78C17.2,13.78 16.69,13.72 16.07,13.62C14.81,15.27 13.42,16.88 11.99,18.3C13.58,19.8 14.96,20.38 15.59,20C16.09,19.66 16.62,18.43 16.84,16.67C16.81,16.67 16.8,16.67 16.77,16.67C15.39,16.67 13.87,17.39 12,18.4C10.13,17.39 8.61,16.67 7.23,16.67C7.2,16.67 7.19,16.67 7.16,16.67C7.38,18.43 7.91,19.66 8.41,20C9.04,20.38 10.42,19.8 12.01,18.3L12,18.3C13.42,16.88 14.81,15.27 16.07,13.62C16.69,13.72 17.2,13.78 17.59,13.78C18.12,13.78 18.36,13.64 18.46,13.55C18.71,13.33 18.76,12.95 18.76,12.66C18.76,12.11 18.58,11.5 18.28,10.86C17.88,10 17.28,9.23 16.52,8.94C15.67,8.64 14.64,8.89 13.58,9.71C12.88,10.26 12.18,10.92 11.5,11.6C10.82,10.92 10.12,10.26 9.42,9.71C8.36,8.89 7.33,8.64 6.48,8.94C5.72,9.23 5.12,10 4.72,10.86C4.42,11.5 4.24,12.11 4.24,12.66C4.24,12.95 4.29,13.33 4.54,13.55C4.64,13.64 4.88,13.78 5.41,13.78C5.8,13.78 6.31,13.72 6.93,13.62C8.19,15.27 9.58,16.88 11.01,18.3C9.42,19.8 8.04,20.38 7.41,20M9.75,12C10.8,13.5 11.9,14.9 13.1,16.2C14.3,14.9 15.4,13.5 16.45,12C15.4,10.5 14.3,9.1 13.1,7.8C11.9,9.1 10.8,10.5 9.75,12Z"/>
        </svg>
        <svg className={`${styles.bgIcon} ${styles.icon6}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,10.11C13.03,10.11 13.87,10.95 13.87,12C13.87,13 13.03,13.85 12,13.85C10.97,13.85 10.13,13 10.13,12C10.13,10.95 10.97,10.11 12,10.11M7.37,20C8,20.38 9.38,19.8 10.97,18.3C9.54,16.88 8.15,15.27 6.89,13.62C6.27,13.72 5.76,13.78 5.37,13.78C4.84,13.78 4.6,13.64 4.5,13.55C4.25,13.33 4.2,12.95 4.2,12.66C4.2,12.11 4.38,11.5 4.68,10.86C5.08,10 5.68,9.23 6.44,8.94C7.29,8.64 8.32,8.89 9.38,9.71C10.08,10.26 10.78,10.92 11.5,11.6C12.18,10.92 12.88,10.26 13.58,9.71C14.64,8.89 15.67,8.64 16.52,8.94C17.28,9.23 17.88,10 18.28,10.86C18.58,11.5 18.76,12.11 18.76,12.66C18.76,12.95 18.71,13.33 18.46,13.55C18.36,13.64 18.12,13.78 17.59,13.78C17.2,13.78 16.69,13.72 16.07,13.62C14.81,15.27 13.42,16.88 11.99,18.3C13.58,19.8 14.96,20.38 15.59,20C16.09,19.66 16.62,18.43 16.84,16.67C16.81,16.67 16.8,16.67 16.77,16.67C15.39,16.67 13.87,17.39 12,18.4C10.13,17.39 8.61,16.67 7.23,16.67C7.2,16.67 7.19,16.67 7.16,16.67C7.38,18.43 7.91,19.66 8.41,20C9.04,20.38 10.42,19.8 12.01,18.3L12,18.3C13.42,16.88 14.81,15.27 16.07,13.62C16.69,13.72 17.2,13.78 17.59,13.78C18.12,13.78 18.36,13.64 18.46,13.55C18.71,13.33 18.76,12.95 18.76,12.66C18.76,12.11 18.58,11.5 18.28,10.86C17.88,10 17.28,9.23 16.52,8.94C15.67,8.64 14.64,8.89 13.58,9.71C12.88,10.26 12.18,10.92 11.5,11.6C10.82,10.92 10.12,10.26 9.42,9.71C8.36,8.89 7.33,8.64 6.48,8.94C5.72,9.23 5.12,10 4.72,10.86C4.42,11.5 4.24,12.11 4.24,12.66C4.24,12.95 4.29,13.33 4.54,13.55C4.64,13.64 4.88,13.78 5.41,13.78C5.8,13.78 6.31,13.72 6.93,13.62C8.19,15.27 9.58,16.88 11.01,18.3C9.42,19.8 8.04,20.38 7.41,20M9.75,12C10.8,13.5 11.9,14.9 13.1,16.2C14.3,14.9 15.4,13.5 16.45,12C15.4,10.5 14.3,9.1 13.1,7.8C11.9,9.1 10.8,10.5 9.75,12Z"/>
        </svg>

        {/* Expo Icons */}
        <svg className={`${styles.bgIcon} ${styles.icon7}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M0,20.0025781 C0,20.5528125 0.44771525,21 1,21 L23,21 C23.5522847,21 24,20.5528125 24,20.0025781 L24,3.9974219 C24,3.4471875 23.5522847,3 23,3 L1,3 C0.44771525,3 0,3.4471875 0,3.9974219 L0,20.0025781 Z M4.5,7 L19.5,7 C20.3284271,7 21,7.67157288 21,8.5 L21,15.5 C21,16.3284271 20.3284271,17 19.5,17 L4.5,17 C3.67157288,17 3,16.3284271 3,15.5 L3,8.5 C3,7.67157288 3.67157288,7 4.5,7 Z"/>
        </svg>
        <svg className={`${styles.bgIcon} ${styles.icon8}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M0,20.0025781 C0,20.5528125 0.44771525,21 1,21 L23,21 C23.5522847,21 24,20.5528125 24,20.0025781 L24,3.9974219 C24,3.4471875 23.5522847,3 23,3 L1,3 C0.44771525,3 0,3.4471875 0,3.9974219 L0,20.0025781 Z M4.5,7 L19.5,7 C20.3284271,7 21,7.67157288 21,8.5 L21,15.5 C21,16.3284271 20.3284271,17 19.5,17 L4.5,17 C3.67157288,17 3,16.3284271 3,15.5 L3,8.5 C3,7.67157288 3.67157288,7 4.5,7 Z"/>
        </svg>
      </div>

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
