import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@remix-run/react";
import styles from "./MakingOfBanner.module.css";
import { useLanguage } from "~/context";

export function MakingOfBanner() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  const handleNavigate = () => {
    setShowOverlay(true);

    // Navigate after overlay animation
    setTimeout(() => {
      navigate("/making-of");
    }, 1200);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current || !contentRef.current || !circlesRef.current) return;

      const banner = bannerRef.current;
      const rect = banner.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcular progreso del scroll (0 cuando no está visible, 1 cuando está centrado)
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      );

      // Parallax para el contenido
      const parallaxY = (scrollProgress - 0.5) * 100;
      contentRef.current.style.transform = `translateY(${parallaxY}px)`;

      // Rotación de los círculos de fondo
      const rotation = scrollProgress * 360;
      circlesRef.current.style.transform = `rotate(${rotation}deg)`;

      // Opacidad basada en visibilidad
      const opacity = Math.max(0, Math.min(1, scrollProgress * 2));
      banner.style.opacity = opacity.toString();

      // Escala del contenido
      const scale = 0.8 + (scrollProgress * 0.2);
      contentRef.current.style.setProperty('--scale', scale.toString());
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecutar una vez al montar

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={bannerRef} className={styles.bannerContainer}>
      {/* Círculos de fondo animados */}
      <div ref={circlesRef} className={styles.backgroundCircles}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>

      {/* Partículas flotantes */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div ref={contentRef} className={styles.content}>
        <div className={styles.glowingOrb}></div>

        <div className={styles.textSection}>
          <div className={styles.tagLine}>
            <span className={styles.tagIcon}>✨</span>
            <span className={styles.tagText}>{t("makingOfBanner.tag")}</span>
            <span className={styles.tagIcon}>✨</span>
          </div>

          <h2 className={styles.mainTitle}>
            {t("apps.makingOf")}
          </h2>

          <p className={styles.subtitle}>
            {t("makingOfBanner.subtitle")}
          </p>
        </div>

        <button onClick={handleNavigate} className={styles.ctaButton}>
          <span className={styles.buttonContent}>
            <span className={styles.cameraIcon}>🎬</span>
            <span className={styles.buttonLabel}>{t("makingOfBanner.button")}</span>
            <span className={styles.arrow}>→</span>
          </span>

          {/* Ondas expansivas al hover */}
          <div className={styles.ripple1}></div>
          <div className={styles.ripple2}></div>
          <div className={styles.ripple3}></div>

          {/* Brillo del botón */}
          <div className={styles.buttonGlow}></div>
        </button>

        {/* Líneas decorativas */}
        <div className={styles.decorativeLines}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
      </div>

      {/* Efecto de luz radial */}
      <div className={styles.radialLight}></div>

      {/* Transition Overlay */}
      {showOverlay && (
        <div className={styles.transitionOverlay}>
          <div className={styles.overlayLoader}>
            <span className={styles.overlayLetter} style={{ animationDelay: '0s' }}>M</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.1s' }}>a</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.2s' }}>k</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.3s' }}>i</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.4s' }}>n</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.5s' }}>g</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.6s' }}>&nbsp;</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.7s' }}>o</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.8s' }}>f</span>
          </div>
        </div>
      )}
    </div>
  );
}
