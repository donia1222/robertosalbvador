import { useEffect, useRef, useState } from "react";
import { SiReact } from "react-icons/si";
import styles from "./Hero.module.css";

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoShowSecond, setAutoShowSecond] = useState(false);

  // Auto change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoShowSecond((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Scroll effect with glitch
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRect.height;
      const scrolled = -heroRect.top;
      const progress = Math.min(Math.max(scrolled / heroHeight, 0), 1);

      setScrollProgress(progress);

      // Trigger glitch effect at specific scroll points
      if (progress > 0.2 && progress < 0.25 && !isGlitching) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
      if (progress > 0.5 && progress < 0.55 && !isGlitching) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isGlitching]);

  const imageScale = 1 - scrollProgress * 0.3;
  const imageOpacity = 1 - scrollProgress * 0.8;
  const cardRotate = scrollProgress * 180;

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      style={{
        opacity: 1 - scrollProgress * 0.5,
        transform: `translateY(${scrollProgress * 100}px)`,
      }}
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
          <div
            className={styles.card}
            style={{
              transform: `rotateY(${cardRotate}deg)`,
              opacity: imageOpacity,
            }}
          >
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
                className={`${styles.profileImage} ${styles.imageDefault} ${
                  isGlitching ? styles.glitch : ""
                }`}
                style={{
                  transform: `scale(${imageScale})`,
                  filter: isGlitching ? "hue-rotate(90deg) saturate(3)" : "none",
                  opacity: (autoShowSecond || isHovering) ? 0 : 1,
                }}
              />
              {/* Hover image */}
              <img
                src="/IMG_6521.jpeg"
                alt="Roberto Salvador"
                className={`${styles.profileImage} ${styles.imageHover} ${
                  isGlitching ? styles.glitch : ""
                }`}
                style={{
                  transform: `scale(${imageScale})`,
                  filter: isGlitching ? "hue-rotate(90deg) saturate(3)" : "none",
                  opacity: (autoShowSecond || isHovering) ? 1 : 0,
                }}
              />
              <div className={styles.imageOverlay} />
              {isGlitching && (
                <>
                  <div className={styles.glitchLayer} style={{ left: "-5px" }} />
                  <div className={styles.glitchLayer} style={{ left: "5px" }} />
                </>
              )}
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Roberto Salvador</h3>
              <p className={styles.cardSubtitle}>
                <SiReact className={styles.reactIcon} />
                React Native Specialist
              </p>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className={styles.content}>
          <div className={styles.greeting}>
            <span className={styles.wave}>👋</span>
            <span>Hola, soy Roberto</span>
          </div>
          <h1 className={styles.title}>
            Creador de <span className={styles.highlight}>Apps Nativas</span>
            <br />
            que destacan
          </h1>
          <p className={styles.description}>
            Desarrollador freelance especializado en <strong>React Native</strong>. Transformo
            ideas en aplicaciones móviles nativas de alto rendimiento para iOS y Android.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>Años de experiencia</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>30+</div>
              <div className={styles.statLabel}>Apps desarrolladas</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Clientes satisfechos</div>
            </div>
          </div>

          <div className={styles.cta}>
            <a href="#proyectos" className={styles.btnPrimary}>
              <span>Ver Proyectos</span>
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
