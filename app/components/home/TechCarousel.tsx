import { useEffect, useState, useRef } from "react";
import styles from "./TechCarousel.module.css";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpo,
  SiOpenai,
  SiSwift,
  SiXcode,
  SiFirebase,
  SiGraphql,
  SiTailwindcss
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { useLanguage } from "~/context";
import { ClaudeCodeBanner } from "./ClaudeCodeBanner";

const technologies = [
  { name: 'React Native', icon: TbBrandReactNative, color: '#61dafb' },
  { name: 'React', icon: SiReact, color: '#61dafb' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Expo', icon: SiExpo, color: '#000020' },
  { name: 'OpenAI', icon: SiOpenai, color: '#412991' },
  { name: 'Swift', icon: SiSwift, color: '#F05138' },
  { name: 'Xcode', icon: SiXcode, color: '#147EFB' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
];

export function TechCarousel() {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isClient) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingPlaceholder} />
      </div>
    );
  }

  // Duplicar array para efecto infinito
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <>
      <section className={styles.carouselSection}>
        {/* Background decorations */}
        <div className={styles.backgroundDecorations}>
          <div className={styles.bgBlob1} />
          <div className={styles.bgBlob2} />
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✨</span>
            <span className={styles.badgeText}>{t("tech.badge")}</span>
          </div>
          <h2 className={styles.title}>
            {t("tech.title.part1")} <span className={styles.highlight}>{t("tech.title.highlight")}</span>
          </h2>
          <p className={styles.subtitle}>
            {t("tech.subtitle")}
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div className={styles.carouselContainer}>
          {/* Gradient Masks */}
          <div className={styles.gradientLeft} />
          <div className={styles.gradientRight} />

          {/* Scrolling Track - Draggable */}
          <div
            ref={containerRef}
            className={`${styles.scrollTrack} ${isDragging ? styles.dragging : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`${styles.techGrid} ${isDragging ? '' : styles.scrolling}`}>
              {duplicatedTech.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className={styles.techItem}
                >
                  <div className={styles.techCard}>
                    {/* Glow effect on hover */}
                    <div className={styles.cardGlow} />

                    {/* Icon */}
                    <div className={styles.techIcon}>
                      <tech.icon style={{ color: tech.color }} />
                    </div>

                    {/* Name */}
                    <span className={styles.techName}>
                      {tech.name}
                    </span>

                    {/* Corner accent */}
                    <div className={styles.cornerAccent} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Claude Code Banner */}
      <ClaudeCodeBanner />
    </>
  );
}
