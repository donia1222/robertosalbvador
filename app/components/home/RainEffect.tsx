import { useEffect, useState, useRef } from "react";
import styles from "./RainEffect.module.css";

interface Raindrop {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
}

export function RainEffect() {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Generar gotas de lluvia
    const drops: Raindrop[] = [];
    const numberOfDrops = 100; // Cantidad de gotas

    for (let i = 0; i < numberOfDrops; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100, // Posición horizontal random
        animationDuration: 4 + Math.random() * 3, // Duración entre 4s y 7s (mucho más lenta)
        animationDelay: Math.random() * 4, // Delay random para efecto natural
        opacity: 0.3 + Math.random() * 0.7, // Opacidad variable
      });
    }

    setRaindrops(drops);
  }, []);

  // Observer para detectar cuando el componente es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Se activa cuando el 20% del componente es visible
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
    <section ref={sectionRef} className={styles.rainSection}>
      <div className={styles.rainContainer}>
        {/* Imagen de fondo */}
        <div className={styles.imageContainer}>
          <img
            src="/9d791e4e-c0fb-4f08-a04d-c62b8d7106c5.png"
            alt="Rain effect"
            className={styles.backgroundImage}
          />
          <div className={styles.overlay} />
        </div>

        {/* Gotas de lluvia */}
        <div className={`${styles.rain} ${isVisible ? styles.raining : styles.paused}`}>
          {raindrops.map((drop) => (
            <div
              key={drop.id}
              className={styles.raindrop}
              style={{
                left: `${drop.left}%`,
                animationDuration: `${drop.animationDuration}s`,
                animationDelay: `${drop.animationDelay}s`,
                opacity: drop.opacity,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
