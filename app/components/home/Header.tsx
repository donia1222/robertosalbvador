import { Link } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import { HiHome, HiSparkles, HiFolder, HiCubeTransparent, HiMail } from "react-icons/hi";
import styles from "./Header.module.css";

const navigation = [
  { name: "Inicio", href: "#inicio", icon: HiHome },
  { name: "Servicios", href: "#servicios", icon: HiSparkles },
  { name: "Proyectos", href: "#proyectos", icon: HiFolder },
  { name: "Tech Stack", href: "#tech", icon: HiCubeTransparent },
  { name: "Contacto", href: "#contacto", icon: HiMail },
];

export function Header() {
  const [activeSection, setActiveSection] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);
  const fullText = "Roberto Salvador";

  // Typing animation for logo
  useEffect(() => {
    if (isTyping) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [isTyping]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <header className={styles.header}>
      <nav ref={navRef} className={styles.navbar}>
        {/* Animated border glow */}
        <div className={styles.borderGlow} />

        <div className={styles.container}>
          {/* Logo with typing effect */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>
              {displayedText}
              <span className={styles.cursor}>|</span>
            </span>
          </Link>

          {/* Navigation links */}
          <ul className={styles.navList}>
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className={styles.navItem}>
                  <a
                    href={item.href}
                    className={`${styles.navLink} ${activeSection === index ? styles.active : ''}`}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      transform: activeSection === index
                        ? `translate(${mousePos.x}px, ${mousePos.y}px)`
                        : 'translate(0, 0)'
                    }}
                  >
                    <Icon className={styles.navIcon} />
                    <span className={styles.navLinkText}>{item.name}</span>
                    {activeSection === index && (
                      <span className={styles.activeIndicator} />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <a href="#contacto" className={styles.ctaButton}>
            <span className={styles.ctaText}>Contáctame</span>
            <div className={styles.particles}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.particle} />
              ))}
            </div>
          </a>
        </div>

        {/* Sliding active indicator */}
        <div
          className={styles.slidingIndicator}
          style={{
            left: `calc(50% + ${(activeSection - 2) * 140}px)`,
          }}
        />
      </nav>
    </header>
  );
}
