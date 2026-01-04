import { useEffect, useRef, useState } from 'react';
import styles from './ClaudeCodeBanner.module.css';
import { useLanguage } from '~/context';

export function ClaudeCodeBanner() {
  const { t } = useLanguage();
  const bannerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [typedLines, setTypedLines] = useState<number[]>([]);

  // Líneas de código para mostrar
  const codeLines = [
    { text: '$ claude code --optimize', delay: 0, type: 'command' },
    { text: '✓ Loading 4 AI agents...', delay: 300, type: 'success' },
    { text: '✓ Workflow optimized +300%', delay: 600, type: 'success' },
    { text: '✓ Best prices enabled', delay: 900, type: 'success' },
    { text: '→ Ready to build', delay: 1200, type: 'info' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;

      const rect = bannerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Detectar si está visible
      const visible = rect.top < windowHeight && rect.bottom > 0;
      if (visible && !isVisible) {
        setIsVisible(true);
      }

      // Calcular progreso del scroll (0 a 1)
      const start = rect.top - windowHeight;
      const end = rect.bottom;
      const progress = Math.max(0, Math.min(1, 1 - start / (end - start)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  // Animar líneas de código cuando sea visible
  useEffect(() => {
    if (!isVisible) return;

    codeLines.forEach((line, index) => {
      setTimeout(() => {
        setTypedLines(prev => [...prev, index]);
      }, line.delay);
    });
  }, [isVisible]);

  return (
    <div ref={bannerRef} className={styles.bannerContainer}>
      {/* Partículas de fondo que reaccionan al scroll */}
      <div className={styles.particlesLayer}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${scrollProgress * (50 + i * 10)}px)`,
              opacity: scrollProgress,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Capa de fondo con parallax lento */}
      <div
        className={styles.backgroundLayer}
        style={{
          transform: `translateY(${scrollProgress * -30}px)`,
        }}
      >
        <div className={styles.bgGrid} />
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
      </div>

      {/* Contenido principal */}
      <div
        className={styles.contentLayer}
        style={{
          transform: `translateY(${scrollProgress * 20}px)`,
          opacity: Math.max(0.3, 1 - scrollProgress * 0.5),
        }}
      >
        {/* Badge superior */}
        <div className={`${styles.badge} ${isVisible ? styles.badgeVisible : ''}`}>
          <span className={styles.badgeIcon}>⚡</span>
          <span className={styles.badgeText}>
            {t('claudeCode.badge') || 'DESDE 2025'}
          </span>
        </div>

        {/* Terminal simulada */}
        <div className={`${styles.terminal} ${isVisible ? styles.terminalVisible : ''}`}>
          {/* Header de terminal */}
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <span className={styles.dot} style={{ background: '#ff6b35' }} />
              <span className={styles.dot} style={{ background: '#ff8c42' }} />
              <span className={styles.dot} style={{ background: '#ffa366' }} />
            </div>
            <div className={styles.terminalTitle}>
              <img
                src="/Claude_AI_symbol.svg.png"
                alt="Claude AI"
                className={styles.claudeLogo}
              />
              claude-code.ai
            </div>
            <div className={styles.terminalSpacer} />
          </div>

          {/* Contenido de terminal */}
          <div className={styles.terminalBody}>
            {codeLines.map((line, index) => (
              <div
                key={index}
                className={`${styles.codeLine} ${
                  typedLines.includes(index) ? styles.codeLineVisible : ''
                } ${styles[line.type]}`}
              >
                <span className={styles.lineContent}>{line.text}</span>
              </div>
            ))}

            {/* Indicador de procesamiento constante */}
            {isVisible && typedLines.length === codeLines.length && (
              <div className={`${styles.processingLine} ${styles.working}`}>
                <span className={styles.processingText}>
                  <span className={styles.processingIcon}>⚡</span>
                  Working
                  <span className={styles.dots}>
                    <span className={styles.dot1}>.</span>
                    <span className={styles.dot2}>.</span>
                    <span className={styles.dot3}>.</span>
                  </span>
                </span>
                <span className={styles.cursor}>█</span>
              </div>
            )}
          </div>
        </div>

        {/* Texto descriptivo */}
        <div className={`${styles.description} ${isVisible ? styles.descriptionVisible : ''}`}>
          <h3 className={styles.descriptionTitle}>
            {t('claudeCode.title') || 'Mi copiloto: Claude Code'}
          </h3>
          <p className={styles.descriptionText}>
            {t('claudeCode.description') ||
              '4 agentes especializados entrenados para mis requerimientos. Trabajo mucho más rápido y puedo ofrecer precios inmejorables gracias a esta tecnología de vanguardia.'}
          </p>
        </div>

        {/* Stats */}
        <div className={`${styles.stats} ${isVisible ? styles.statsVisible : ''}`}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>4</div>
            <div className={styles.statLabel}>
              {t('claudeCode.agents') || 'Agentes IA'}
            </div>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <div className={styles.statNumber}>3x</div>
            <div className={styles.statLabel}>
              {t('claudeCode.speed') || 'Más rápido'}
            </div>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <div className={`${styles.statNumber} ${styles.checkIcon}`}>
              ✓
            </div>
            <div className={styles.statLabel}>
              {t('claudeCode.prices') || 'Mejores precios'}
            </div>
          </div>
        </div>
      </div>

      {/* Capa frontal con parallax rápido */}
      <div
        className={styles.frontLayer}
        style={{
          transform: `translateY(${scrollProgress * 50}px)`,
        }}
      >
        <div className={styles.floatingCode1}>{'{ AI }'}</div>
        <div className={styles.floatingCode2}>{'<>'}</div>
        <div className={styles.floatingCode3}>{'[ ]'}</div>
      </div>
    </div>
  );
}
