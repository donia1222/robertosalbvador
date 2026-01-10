import { useEffect, useRef, useState } from 'react';
import styles from './ClaudeCodeBanner.module.css';
import { useLanguage } from '~/context';

export function ClaudeCodeBanner() {
  const { t } = useLanguage();
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedLines, setTypedLines] = useState<number[]>([]);

  // Líneas de código para mostrar
  const codeLines = [
    { text: '$ claude code --optimize', delay: 0, type: 'command' },
    { text: '✓ Loading AI agents...', delay: 400, type: 'success' },
    { text: '✓ Workflow optimized', delay: 800, type: 'success' },
    { text: '→ Ready to build', delay: 1200, type: 'info' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;

      const rect = bannerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Detectar si está visible
      const visible = rect.top < windowHeight - 100 && rect.bottom > 0;
      if (visible && !isVisible) {
        setIsVisible(true);
      }
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
      {/* Contenido principal */}
      <div className={styles.contentLayer}>
        {/* Badge superior */}
        <div className={`${styles.badge} ${isVisible ? styles.badgeVisible : ''}`}>
          <span className={styles.badgeText}>
            {t('claudeCode.badge') || 'DESDE 2025'}
          </span>
        </div>

        {/* Terminal simulada */}
        <div className={`${styles.terminal} ${isVisible ? styles.terminalVisible : ''}`}>
          {/* Header de terminal */}
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <span className={styles.dot} style={{ background: '#ff5f56' }} />
              <span className={styles.dot} style={{ background: '#ffbd2e' }} />
              <span className={styles.dot} style={{ background: '#27c93f' }} />
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

            {/* Indicador de procesamiento */}
            {isVisible && typedLines.length === codeLines.length && (
              <div className={styles.processingLine}>
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
            <div className={styles.statNumber}>✓</div>
            <div className={styles.statLabel}>
              {t('claudeCode.prices') || 'Mejores precios'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
