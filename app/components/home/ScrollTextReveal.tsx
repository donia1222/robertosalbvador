import { useEffect, useState, useRef } from "react";
import styles from "./ScrollTextReveal.module.css";
import { useLanguage } from "~/context";
import { SiNodedotjs, SiOpenai, SiApple, SiAndroid } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaMobileAlt } from "react-icons/fa";

export function ScrollTextReveal() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // Palabras simples
  const words = {
    es: ["INNOVACIÓN", "PASIÓN", "FUTURO"],
    de: ["INNOVATION", "LEIDENSCHAFT", "ZUKUNFT"],
    en: ["INNOVATION", "PASSION", "FUTURE"],
  };

  const currentWords = words[language as keyof typeof words] || words.en;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Progreso: 0 cuando entra, 1 cuando sale
      // Ajuste: empieza antes con un offset
      const offset = windowHeight * 0.3; // Empieza 30% antes
      const progress = Math.max(0, Math.min(1, (-rect.top + offset) / (sectionHeight - windowHeight + offset)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Palabra actual
  const wordIndex = Math.floor(scrollProgress * currentWords.length);
  const currentWord = currentWords[Math.min(wordIndex, currentWords.length - 1)];

  // Colores alternados: naranja y gris
  const colors = ['#ff6b35', '#9ca3af'];
  const currentColor = colors[wordIndex % colors.length];

  // Escala: de 0.3 (pequeño) a 1.2 (grande pero legible)
  // Multiplico por 1.3 para que llegue antes al máximo
  const scale = 0.3 + (scrollProgress * 1.3 * 0.9);
  const opacity = Math.min(1, scrollProgress * 2);

  // Íconos flotantes
  const floatingIcons = [
    { Icon: TbBrandReactNative, position: { top: '15%', left: '10%' }, delay: 0 },
    { Icon: SiNodedotjs, position: { top: '70%', left: '15%' }, delay: 1 },
    { Icon: SiOpenai, position: { top: '25%', right: '12%' }, delay: 2 },
    { Icon: SiApple, position: { top: '60%', right: '18%' }, delay: 3 },
    { Icon: SiAndroid, position: { top: '80%', left: '50%' }, delay: 4 },
    { Icon: FaMobileAlt, position: { top: '40%', left: '25%' }, delay: 5 },
  ];

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Íconos flotantes de fondo */}
      <div className={styles.iconsContainer}>
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={styles.floatingIcon}
            style={{
              ...item.position,
              animationDelay: `${item.delay}s`,
            }}
          >
            <item.Icon />
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <h2
          className={styles.text}
          style={{
            transform: `scale(${scale})`,
            opacity: opacity,
            color: currentColor,
            textShadow: `0 0 20px ${currentColor}80, 0 0 40px ${currentColor}50`,
          }}
        >
          {currentWord}
        </h2>
      </div>
    </section>
  );
}
