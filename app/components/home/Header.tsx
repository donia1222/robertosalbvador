import { Link } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import { HiHome, HiSparkles, HiFolder, HiCubeTransparent, HiMail, HiPhone, HiMenu, HiX } from "react-icons/hi";
import styles from "./Header.module.css";

const navigation = [
  { name: "Inicio", href: "#inicio", icon: HiHome },
  { name: "Servicios", href: "#servicios", icon: HiSparkles },
  { name: "Proyectos", href: "#proyectos", icon: HiFolder },
  { name: "Tech Stack", href: "#tech", icon: HiCubeTransparent },
  { name: "Contacto", href: "#contacto", icon: HiMail },
];

const menuBackgrounds = [
  "/IMG_6521.jpeg", // Inicio
  "/IMG_6490.jpeg", // Servicios
  "/IMG_6523.jpeg", // Proyectos
  "/IMG_6577.jpeg", // Tech Stack
  "/IMG_6514.jpeg", // Contacto
];

export function Header() {
  const [activeSection, setActiveSection] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);
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

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    // Small delay to allow animation before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
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

          {/* Menu hamburger button */}
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <HiMenu className={styles.menuIcon} />
          </button>
        </div>
      </nav>

      {/* Full screen menu modal */}
      <div className={`${styles.menuModal} ${isMenuOpen ? styles.menuModalOpen : ''}`}>
        {/* Background image with overlay */}
        <div className={styles.menuBackground}>
          {menuBackgrounds.map((bg, index) => (
            <img
              key={bg}
              src={bg}
              alt={`Background ${index}`}
              className={`${styles.menuBackgroundImage} ${
                currentBackground === index ? styles.menuBackgroundActive : ''
              }`}
            />
          ))}
          <div className={styles.menuOverlay} />
        </div>

        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Cerrar menú"
        >
          <HiX className={styles.closeIcon} />
        </button>

        {/* Menu content */}
        <div className={styles.menuContent}>
          {/* Logo in menu */}
          <div className={styles.menuLogo}>
            <span className={styles.menuLogoText}>Roberto Salvador</span>
            <span className={styles.menuLogoSubtitle}>React Native Specialist</span>
          </div>

          {/* Navigation links */}
          <nav className={styles.menuNav}>
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.href)}
                  className={`${styles.menuLink} ${activeSection === index ? styles.menuLinkActive : ''}`}
                  style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                >
                  <Icon className={styles.menuLinkIcon} />
                  <span className={styles.menuLinkText}>{item.name}</span>
                  <svg
                    className={styles.menuLinkArrow}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              );
            })}
          </nav>

          {/* Contact info in menu */}
          <div className={styles.menuFooter}>
            <a href="tel:+41765608645" className={styles.menuContactItem}>
              <HiPhone className={styles.menuContactIcon} />
              <span>076 560 86 45</span>
            </a>
            <a href="mailto:info@lweb.ch" className={styles.menuContactItem}>
              <HiMail className={styles.menuContactIcon} />
              <span>info@lweb.ch</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
