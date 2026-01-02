import { useEffect, useRef, useState } from "react";
import { HiLocationMarker, HiPhone, HiMail, HiDownload } from "react-icons/hi";
import styles from "./Contact.module.css";
import handleDownloadVCard from "~/utils/downloadVCard";

const contactInfo = [
  {
    icon: HiLocationMarker,
    label: "Dirección",
    value: "9475 Sevelen, Schweiz",
    flag: "🇨🇭",
    link: "https://maps.google.com/?q=9475+Sevelen+Switzerland",
  },
  {
    icon: HiPhone,
    label: "Teléfono",
    value: "076 560 86 45",
    link: "tel:+41765608645",
  },
  {
    icon: HiMail,
    label: "E-Mail",
    value: "info@lweb.ch",
    link: "mailto:info@lweb.ch",
  },
];

export function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Magnetic mouse effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Ripple effect on click
  const handleCardClick = (index: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 1000);
  };

  return (
    <section id="contacto" className={styles.contactSection}>
      {/* Animated background */}
      <div className={styles.backgroundPattern}>
        <div className={styles.gridPattern} />
        <div className={styles.movingGradient} />
      </div>

      {/* Floating particles */}
      <div className={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <div className={styles.badgePulse} />
            <span className={styles.badgeIcon}>📬</span>
            <span className={styles.badgeText}>Contáctame</span>
          </div>
          <h2 className={styles.title}>
            ¿Listo para <span className={styles.highlight}>trabajar juntos</span>?
          </h2>
          <p className={styles.subtitle}>
            Estoy disponible para proyectos freelance. No dudes en contactarme para
            discutir tu próxima gran idea.
          </p>
        </div>

        {/* Contact Cards */}
        <div
          ref={containerRef}
          className={styles.cardsGrid}
          onMouseMove={handleMouseMove}
        >
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={styles.contactCard}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={(e) => handleCardClick(index, e)}
              >
                {/* Background glow that follows mouse */}
                <div
                  className={styles.cardGlowFollow}
                  style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 53, 0.15), transparent 40%)`,
                  }}
                />

                {/* Ripple effects */}
                {ripples
                  .filter((r) => activeCard === index)
                  .map((ripple) => (
                    <div
                      key={ripple.id}
                      className={styles.ripple}
                      style={{
                        left: `${ripple.x}px`,
                        top: `${ripple.y}px`,
                      }}
                    />
                  ))}

                {/* Card content */}
                <div className={styles.cardContent}>
                  {/* Icon with pulse effect */}
                  <div className={styles.iconWrapper}>
                    <div className={styles.iconGlow} />
                    <Icon className={styles.icon} />
                    {activeCard === index && (
                      <div className={styles.iconRing} />
                    )}
                  </div>

                  {/* Label and value */}
                  <div className={styles.textContent}>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.value}>
                      {item.value}
                      {item.flag && (
                        <span className={styles.flag}>{item.flag}</span>
                      )}
                    </span>
                  </div>

                  {/* Hover arrow */}
                  <div className={styles.arrow}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 13L13 7M13 7H7M13 7V13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Corner accents */}
                <div className={styles.cornerTopLeft} />
                <div className={styles.cornerBottomRight} />

                {/* Animated border */}
                <div className={styles.animatedBorder} />
              </a>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            {/* Video Background */}
            <div className={styles.ctaVideoContainer}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className={styles.ctaVideo}
              >
                <source src="/copy_7C1BBA34-F73A-4C24-BBCD-896761F89D78.mp4" type="video/mp4" />
              </video>
              <div className={styles.ctaVideoOverlay} />
            </div>

            {/* Content */}
            <div className={styles.ctaContent}>
              <div className={styles.ctaGlow} />
              <h3 className={styles.ctaTitle}>
                ¿Tienes un proyecto en mente?
              </h3>
              <p className={styles.ctaText}>
                Hablemos sobre cómo puedo ayudarte a hacer realidad tu aplicación
              </p>
              <div className={styles.ctaButtons}>
                <button onClick={handleDownloadVCard} className={styles.btnPrimary}>
                  <HiDownload className={styles.btnIcon} />
                  <span>Descargar Tarjeta de Visita</span>
                  <div className={styles.btnShine} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className={styles.floatingElements}>
        <div className={styles.floatingCircle1} />
        <div className={styles.floatingCircle2} />
        <div className={styles.floatingCircle3} />
      </div>
    </section>
  );
}
