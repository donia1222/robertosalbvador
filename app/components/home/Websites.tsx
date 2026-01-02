import { useEffect, useRef, useState } from "react";
import styles from "./Websites.module.css";
import { useLanguage } from "~/context";

const websites = [
  {
    id: 6,
    title: "HOT & BBQ",
    category: "web",
    framework: "Next.js",
    description: "Die exklusivste Premium-Kollektion von Hot & BBQ Saucen und Gewürzen.",
    imageUrl: "/ff.jpg",
    projectUrl: "https://www.hot-bbq.ch",
    technologies: ["Next.js", "E-Commerce"],
    featured: true,
    size: "large"
  },
  {
    id: 7,
    title: "BeautyStyle",
    category: "web",
    framework: "Remix",
    description: "Moderner Friseursalon mit personalisierten Schönheitsdienstleistungen.",
    imageUrl: "/woman-getting-her-hair-cut-beauty-salon_23-2149167399.jpg",
    projectUrl: "https://beautystyles.vercel.app",
    technologies: ["Remix", "Framer Motion"],
    size: "medium"
  },
  {
    id: 8,
    title: "Crypto Dashboard",
    category: "web",
    framework: "Remix",
    description: "Echtzeit-Preisdaten, Portfolio-Tracking und Marktanalysen.",
    imageUrl: "/crypto-abstract-bg.png",
    projectUrl: "https://remix-crypto.vercel.app",
    technologies: ["Remix", "Web3", "API"],
    featured: true,
    size: "medium"
  },
  
  {
    id: 9,
    title: "WebM Converter",
    category: "web",
    framework: "Next.js",
    description: "Convert your videos to WebM format for better web performance.",
    imageUrl: "/5532919.jpg",
    projectUrl: "https://web-m-video-converter.vercel.app",
    technologies: ["Next.js", "FFmpeg"],
    size: "small"
  },
  {
    id: 10,
    title: "Ushuaia Bar",
    category: "web",
    framework: "Next.js",
    description: "Premium Cocktail, Hookah & Terrace. Luxuriöse Bar-Lounge in Buchs.",
    imageUrl: "/abstract-smoke.png",
    projectUrl: "https://www.ushuaia-bar.ch",
    technologies: ["Next.js", "React"],
    featured: true,
    size: "large"
  },
  {
    id: 11,
    title: "Cantina Tex-Mex",
    category: "web",
    framework: "Remix",
    description: "Restaurant mit Pub-Atmosphäre. Essen kombiniert mit Unterhaltung.",
    imageUrl: "/IMG_2733.jpeg",
    projectUrl: "https://www.cantinatexmex.ch",
    technologies: ["Remix", "React"],
    size: "medium"
  },
  {
    id: 12,
    title: "Flinck Sauber",
    category: "web",
    framework: "Next.js",
    description: "Professionelles Reinigungsunternehmen aus Liechtenstein.",
    imageUrl: "/IMG_2735.jpeg",
    projectUrl: "https://flink-sauber.li",
    technologies: ["Next.js", "React"],
    size: "small"
  },
  {
    id: 13,
    title: "Renovation",
    category: "web",
    framework: "Next.js",
    description: "Professionelles Renovationsunternehmen für moderne Wohnräume.",
    imageUrl: "/interior-design-with-photoframes-blue-couch.jpg",
    projectUrl: "https://renovation-tau.vercel.app",
    technologies: ["Next.js", "React"],
    size: "small"
  },
  {
    id: 14,
    title: "Bouquet Mediterraneo",
    category: "web",
    framework: "Remix",
    description: "Mediterrane Küche und erlesene Weine in stilvollem Ambiente.",
    imageUrl: "/IMG_2734.jpeg",
    projectUrl: "https://www.bouquetmediterraneo.ch",
    technologies: ["Remix", "React"],
    size: "medium"
  },
  {
    id: 15,
    title: "Rrapi Immobilien",
    category: "web",
    framework: "HTML",
    description: "Immobilienagentur spezialisiert auf exklusive Immobilien.",
    imageUrl: "/inmo.png",
    projectUrl: "https://rrapi.ch",
    technologies: ["HTML", "CSS", "PHP"],
    size: "small"
  },
];

const frameworkColors: { [key: string]: { bg: string; border: string; text: string } } = {
  "Next.js": { bg: "rgba(0, 0, 0, 0.8)", border: "rgba(255, 255, 255, 0.3)", text: "#ffffff" },
  "Remix": { bg: "rgba(18, 163, 255, 0.15)", border: "rgba(18, 163, 255, 0.4)", text: "#12a3ff" },
  "HTML": { bg: "rgba(227, 79, 38, 0.15)", border: "rgba(227, 79, 38, 0.4)", text: "#e34f26" },
};

export function Websites() {
  const { t } = useLanguage();
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
    <section ref={sectionRef} className={styles.websitesSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🌐</span>
            <span className={styles.badgeText}>Portfolio Web</span>
          </div>
          <h2 className={styles.title}>
            {t("websites.title.part1")} <span className={styles.highlight}>{t("websites.title.highlight")}</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className={`${styles.bentoGrid} ${isVisible ? styles.animate : ""}`}>
          {websites.map((site, index) => {
            const colors = frameworkColors[site.framework] || frameworkColors["Next.js"];

            return (
              <a
                key={site.id}
                href={site.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.bentoItem} ${styles[site.size]} ${site.featured ? styles.featured : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <div className={styles.bentoImage}>
                  <img src={site.imageUrl} alt={site.title} />
                  <div className={styles.bentoOverlay} />
                </div>

                {/* Glassmorphism Card */}
                <div className={styles.bentoContent}>
                  {/* Framework Badge */}
                  <div
                    className={styles.frameworkBadge}
                    style={{
                      background: colors.bg,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  >
                    {site.framework}
                  </div>

                  {/* Title */}
                  <h3 className={styles.bentoTitle}>{site.title}</h3>

                  {/* Description */}
                  <p className={styles.bentoDescription}>{site.description}</p>

                  {/* Technologies */}
                  <div className={styles.techTags}>
                    {site.technologies.map((tech, i) => (
                      <span key={i} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gradient Border */}
                <div className={styles.gradientBorder} />

                {/* Hover Arrow */}
                <div className={styles.hoverArrow}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Background Decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgBlob1} />
        <div className={styles.bgBlob2} />
      </div>
    </section>
  );
}
