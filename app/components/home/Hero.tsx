import { useEffect, useRef, useState } from "react";
import { SiReact } from "react-icons/si";
import styles from "./Hero.module.css";
import { useLanguage } from "~/context";

export function Hero() {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Auto change to second image only once after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSecondImage(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Flash effect when scroll starts
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 50) {
        setHasScrolled(true);
        setShowFlash(true);

        // Multiple flashes
        setTimeout(() => setShowFlash(false), 100);
        setTimeout(() => setShowFlash(true), 200);
        setTimeout(() => setShowFlash(false), 300);
        setTimeout(() => setShowFlash(true), 400);
        setTimeout(() => setShowFlash(false), 500);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
    >
      {/* Particles background */}
      <div className={styles.particles}>
        {Array.from({ length: 30 }).map((_, i) => (
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

      <div className={styles.heroContainer}>
        {/* Card Stack sin efecto de ratón */}
        <div
          ref={cardRef}
          className={styles.cardStack}
          style={{
            // Si quieres, puedes dejar sólo la perspectiva fija:
            // transform: "perspective(1000px)",
          }}
        >
          {/* Background cards for depth effect */}
          <div
            className={styles.cardBackground}
            style={{ transform: "translateZ(-40px) scale(0.95)" }}
          />
          <div
            className={styles.cardBackground}
            style={{ transform: "translateZ(-80px) scale(0.9)" }}
          />

          {/* Main card with photo */}
          <div className={styles.card}>
            <div className={styles.cardGlow} />
            <div
              className={styles.imageContainer}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Default image */}
              <img
                src="/IMG_6490.jpeg"
                alt="Roberto Salvador"
                className={`${styles.profileImage} ${styles.imageDefault}`}
                style={{
                  opacity: (!showSecondImage || isHovering) ? 1 : 0,
                }}
              />

              {/* Second image */}
              <img
                src="/IMG_657.jpeg"
                alt="Roberto Salvador"
                className={`${styles.profileImage} ${styles.imageHover}`}
                style={{
                  opacity: (showSecondImage && !isHovering) ? 1 : 0,
                }}
              />
              <div className={styles.imageOverlay} />

              {/* Flash/Lightning effect */}
              {showFlash && (
                <>
                  <div className={styles.flashOverlay} />
                  <div className={styles.lightning} style={{ left: '20%', animationDelay: '0s' }} />
                  <div className={styles.lightning} style={{ left: '50%', animationDelay: '0.1s' }} />
                  <div className={styles.lightning} style={{ left: '80%', animationDelay: '0.05s' }} />
                </>
              )}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Roberto Salvador</h3>
              <p className={styles.cardSubtitle}>
                <SiReact className={styles.reactIcon} />
                React Native Developer
              </p>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className={styles.content}>
          <div className={styles.greeting}>
            <span className={styles.wave}>👋</span>
            <span>{t("hero.greeting")} Roberto</span>
          </div>
          <h1 className={styles.title}>
            {t("hero.title.part1")} <span className={styles.highlight}>{t("hero.title.highlight")}</span>
            {t("hero.title.part2") && (
              <>
                <br />

              </>
            )}
          </h1>
          <p className={styles.description}>
            {t("hero.subtitle")}
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>{t("hero.experience")}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>30+</div>
              <div className={styles.statLabel}>{t("hero.apps")}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>{t("hero.satisfaction")}</div>
            </div>
          </div>

          <div className={styles.cta}>
            <a href="#proyectos" className={styles.btnPrimary}>
              <span>{t("hero.cta.projects")}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#contacto" className={styles.btnOutline}>

            </a>
          </div>
        </div>
      </div>

      {/* Floating tech icons */}
      <div className={styles.techIcons}>
        <div className={styles.techIcon} style={{ top: "20%", left: "10%" }}>
          React
        </div>
        <div className={styles.techIcon} style={{ top: "60%", left: "15%" }}>
          Native
        </div>
        <div className={styles.techIcon} style={{ top: "30%", right: "15%" }}>
          TypeScript
        </div>
        <div className={styles.techIcon} style={{ bottom: "25%", right: "10%" }}>
          iOS
        </div>
      </div>
    </section>
  );
}
