import { useEffect, useState } from 'react';
import styles from './PageLoader.module.css';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Mostrar el contenido principal cuando el componente se monte
    document.documentElement.style.setProperty('--initial-display', 'block');

    // Duración total de la animación (4 segundos)
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Esperar a que termine el fadeout antes de ocultar completamente
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`${styles.pageLoader} ${fadeOut ? styles.fadeOut : ''}`}>
      {/* Imagen de fondo con efecto zoom */}
      <div className={styles.backgroundImage}>
        <img
          src="/15_07_35.png"
          alt="Roberto Salvador"
          className={styles.image}
        />
      </div>

      {/* Overlay con gradiente */}
      <div className={styles.overlay}></div>

      {/* Contenido principal */}
      <div className={styles.content}>
        {/* Nombre con animación de revelado */}
        <h1 className={styles.name}>
          <span className={styles.nameChar} style={{ animationDelay: '0.5s' }}>R</span>
          <span className={styles.nameChar} style={{ animationDelay: '0.6s' }}>o</span>
          <span className={styles.nameChar} style={{ animationDelay: '0.7s' }}>b</span>
          <span className={styles.nameChar} style={{ animationDelay: '0.8s' }}>e</span>
          <span className={styles.nameChar} style={{ animationDelay: '0.9s' }}>r</span>
          <span className={styles.nameChar} style={{ animationDelay: '1.0s' }}>t</span>
          <span className={styles.nameChar} style={{ animationDelay: '1.1s' }}>o</span>
          <span className={styles.nameSpace}> </span>
          <span className={styles.nameChar} style={{ animationDelay: '1.2s' }}>S</span>
          <span className={styles.nameChar} style={{ animationDelay: '1.3s' }}>a</span>
          <span className={styles.nameChar} style={{ animationDelay: '1.4s' }}>l</span>
          <span className={styles.nameChar} style={{ animationDelay: '1.5s' }}>v</span>
          <span className={styles.nameChar} style={{ animationDelay: '1.6s' }}>a</span>
          <span className={styles.nameChar} style={{ animationDelay: '1.7s' }}>d</span>
          <span className={styles.nameChar} style={{ animationDelay: '1.8s' }}>o</span>
          <span className={styles.nameChar} style={{ animationDelay: '1.9s' }}>r</span>
        </h1>

        {/* Línea divisoria animada */}
        <div className={styles.divider}></div>

        {/* Título con animación */}
        <p className={styles.title}>Full-Stack Developer</p>

        {/* Barra de progreso */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>

      {/* Partículas decorativas */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
