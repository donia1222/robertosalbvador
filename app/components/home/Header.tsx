import { Link } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import { HiHome, HiSparkles, HiFolder, HiCubeTransparent, HiMail, HiPhone, HiMenu, HiX, HiDownload } from "react-icons/hi";
import styles from "./Header.module.css";
import handleDownloadVCard from "~/utils/downloadVCard";
import { useLanguage, useColor, type ColorScheme } from "~/context";

const navigationKeys = [
  { key: "nav.inicio", href: "#inicio", icon: HiHome },
  { key: "nav.servicios", href: "#servicios", icon: HiSparkles },
  { key: "nav.proyectos", href: "#proyectos", icon: HiFolder },
  { key: "nav.tech", href: "#tech", icon: HiCubeTransparent },
  { key: "nav.contacto", href: "#contacto", icon: HiMail },
];

const menuBackgrounds = [
  "/5_07_29.png", // Inicio
  "/5_07_29.png", // Servicios
  "/5_07_29.png", // Proyectos
  "/15_07_35.png", // Tech Stack
  "/15_07_35.png", // Contacto
];

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { color, setColor, colors } = useColor();
  const [activeSection, setActiveSection] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isTypingSubtitle, setIsTypingSubtitle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const fullText = "Roberto Salvador";
  const fullSubtitle = "Full-Stack Developer";

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
          // Start subtitle typing after a short delay
          setTimeout(() => setIsTypingSubtitle(true), 300);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [isTyping]);

  // Typing animation for subtitle
  useEffect(() => {
    if (isTypingSubtitle) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullSubtitle.length) {
          setDisplayedSubtitle(fullSubtitle.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTypingSubtitle(false);
          clearInterval(typingInterval);
        }
      }, 80);
      return () => clearInterval(typingInterval);
    }
  }, [isTypingSubtitle]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationKeys.map(item => item.href.slice(1));
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

  const handleMenuClick = (href: string, index: number) => {
    setIsMenuOpen(false);
    setActiveSection(index);
    setIsTransitioning(true);

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'auto' });

        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }
    }, 800);
  };

  return (
    <header className={styles.header}>
      <nav ref={navRef} className={styles.navbar}>
        {/* Animated border glow */}
        <div className={styles.borderGlow} />

        <div className={styles.container}>
          {/* Logo with typing effect */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoContainer}>
              <span className={styles.logoText}>
                {displayedText}
                {isTyping && <span className={styles.cursor}>|</span>}
              </span>
              <span className={styles.logoSubtitle}>
                {displayedSubtitle}
                {isTypingSubtitle && <span className={styles.cursor}>|</span>}
              </span>
            </div>
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
            {navigationKeys.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleMenuClick(item.href, index)}
                  className={`${styles.menuLink} ${activeSection === index ? styles.menuLinkActive : ''}`}
                  style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                >
                  <Icon className={styles.menuLinkIcon} />
                  <span className={styles.menuLinkText}>{t(item.key)}</span>
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
            </a>
            <a href="mailto:info@lweb.ch" className={styles.menuContactItem}>
              <HiMail className={styles.menuContactIcon} />
            </a>
            <button onClick={handleDownloadVCard} className={styles.menuContactItem}>
              <HiDownload className={styles.menuContactIcon} />
            </button>
          </div>

          {/* Color selector */}
          <div className={styles.colorSelector}>

            <div className={styles.colorOptions}>
              {(Object.keys(colors) as ColorScheme[]).map((colorKey) => (
                <button
                  key={colorKey}
                  onClick={() => setColor(colorKey)}
                  className={`${styles.colorButton} ${color === colorKey ? styles.colorButtonActive : ''}`}
                  style={{ backgroundColor: colors[colorKey].primary }}
                  aria-label={`Color ${colors[colorKey].name}`}
                  title={colors[colorKey].name}
                />
              ))}
            </div>
          </div>

          {/* Language selector */}
          <div className={styles.languageSelector}>
            <span className={styles.selectorLabel}>Language:</span>
            <div className={styles.languageOptions}>
              <button
                onClick={() => setLanguage('es')}
                className={`${styles.languageButton} ${language === 'es' ? styles.languageButtonActive : ''}`}
              >
                Español
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`${styles.languageButton} ${language === 'de' ? styles.languageButtonActive : ''}`}
              >
                Deutsch
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`${styles.languageButton} ${language === 'en' ? styles.languageButtonActive : ''}`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transition overlay with DEV animation */}
      {isTransitioning && (
        <div className={styles.transitionOverlay}>
          <div className={styles.devLoader}>
            <span className={styles.devLetter} style={{ animationDelay: '0s' }}>D</span>
            <span className={styles.devLetter} style={{ animationDelay: '0.2s' }}>E</span>
            <span className={styles.devLetter} style={{ animationDelay: '0.4s' }}>V</span>
          </div>
        </div>
      )}
    </header>
  );
}
