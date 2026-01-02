import { useEffect, useRef, useState } from "react";
import styles from "./Services.module.css";
import { useLanguage } from "~/context";

interface Service {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  technologies: string[];
  backgroundImage: string;
}

const services: Service[] = [
  {
    titleKey: "services.mobile.title",
    subtitleKey: "services.mobile.subtitle",
    descriptionKey: "services.mobile.description",
    technologies: ["React Native", "Xcode", "Swift"],
    backgroundImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80", // Mobile phones/apps
  },
  {
    titleKey: "services.web.title",
    subtitleKey: "services.web.subtitle",
    descriptionKey: "services.web.description",
    technologies: ["Next.js", "React", "TypeScript"],
    backgroundImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&q=80", // Code/laptop
  },
  {
    titleKey: "services.ai.title",
    subtitleKey: "services.ai.subtitle",
    descriptionKey: "services.ai.description",
    technologies: ["OpenAI API", "Automation", "Chatbots"],
    backgroundImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80", // AI/technology
  },
  {
    titleKey: "services.consulting.title",
    subtitleKey: "services.consulting.subtitle",
    descriptionKey: "services.consulting.description",
    technologies: ["Architecture", "Optimization", "Scaling"],
    backgroundImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80", // Business/consulting
  },
];

export function Services() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate how far the user has scrolled through the component
      const scrollStart = -rect.top;
      const scrollEnd = containerHeight - windowHeight;
      const scrollPercentage = Math.max(0, Math.min(1, scrollStart / scrollEnd));

      // Determine which service to show based on scroll
      // Each service takes up 1/4 of the scroll range
      const serviceIndex = Math.min(
        Math.floor(scrollPercentage * services.length),
        services.length - 1
      );

      // Calculate progress within current service section
      const sectionProgress = (scrollPercentage * services.length) % 1;

      setCurrentIndex(serviceIndex);
      setScrollProgress(sectionProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.servicesWrapper}>
      <div className={styles.servicesContainer}>
        {/* Particles background */}
        <div className={styles.particles}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Background image with transitions */}
        <div className={styles.backgroundContainer}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`${styles.backgroundImage} ${
                index === currentIndex ? styles.active : ""
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${service.backgroundImage})`,
              }}
            />
          ))}
        </div>

        {/* Content overlay */}
        <div className={styles.contentContainer}>
          {services.map((service, index) => {
            const colorVariant = index % 2 === 0 ? styles.orange : index === 1 ? styles.darkGray : styles.lightGray;
            return (
              <div
                key={index}
                className={`${styles.serviceContent} ${
                  index === currentIndex ? styles.active : ""
                }`}
              >
                <div className={`${styles.serviceCard} ${colorVariant}`}>
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceNumber}>
                    0{index + 1}
                  </span>
                  <h2 className={styles.serviceTitle}>{t(service.titleKey)}</h2>
                </div>

                <h3 className={styles.serviceSubtitle}>{t(service.subtitleKey)}</h3>

                <p className={styles.serviceDescription}>
                  {t(service.descriptionKey)}
                </p>

                <div className={styles.technologies}>
                  {service.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className={styles.progressIndicator}>
          {services.map((_, index) => (
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
