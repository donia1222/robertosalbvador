import { useEffect } from "react";
import { useLanguage } from "~/context";
import type { AppDetail } from "./appsData";
import styles from "./AppModal.module.css";

interface AppModalProps {
  app: AppDetail;
  onClose: () => void;
}

export function AppModal({ app, onClose }: AppModalProps) {
  const { t } = useLanguage();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.closeButton} onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with app icon */}
        <div className={styles.modalHeader}>
          <div className={styles.iconWrapper}>
            <img src={app.icon} alt={app.name} className={styles.icon} />
            <div
              className={styles.iconGlow}
              style={{ backgroundColor: app.color }}
            />
          </div>
          <h2 className={styles.appTitle}>{app.name}</h2>
          <p className={styles.appDescription}>{t(app.descriptionKey)}</p>

          {/* Platform badges */}
          <div className={styles.platforms}>
            {app.platforms.includes("ios") && (
              <div className={styles.platformBadge}>
                <svg className={styles.platformIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                iOS
              </div>
            )}
            {app.platforms.includes("android") && (
              <div className={styles.platformBadge}>
                <svg className={styles.platformIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Android
              </div>
            )}
          </div>
        </div>

        {/* Content sections */}
        <div className={styles.modalBody}>
          {/* Overview */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📋</span>
              {t("makingOf.modal.overview")}
            </h3>
            <p className={styles.sectionText}>{t(app.overviewKey)}</p>
          </section>

          {/* Tech Stack */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>⚙️</span>
              {t("makingOf.modal.techStack")}
            </h3>
            <div className={styles.techGrid}>
              {app.techStack.map((tech) => (
                <div key={tech} className={styles.techBadge}>
                  {tech}
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>✨</span>
              {t("makingOf.modal.features")}
            </h3>
            <ul className={styles.featureList}>
              {app.features.map((featureKey) => (
                <li key={featureKey} className={styles.featureItem}>
                  <span className={styles.featureBullet}>→</span>
                  {t(featureKey)}
                </li>
              ))}
            </ul>
          </section>

          {/* Architecture */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🏗️</span>
              {t(app.architecture.titleKey)}
            </h3>
            <ul className={styles.featureList}>
              {app.architecture.items.map((itemKey) => (
                <li key={itemKey} className={styles.featureItem}>
                  <span className={styles.featureBullet}>→</span>
                  {t(itemKey)}
                </li>
              ))}
            </ul>
          </section>

          {/* Screens */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📱</span>
              {t(app.screens.titleKey)}
            </h3>
            <ul className={styles.featureList}>
              {app.screens.items.map((itemKey) => (
                <li key={itemKey} className={styles.featureItem}>
                  <span className={styles.featureBullet}>→</span>
                  {t(itemKey)}
                </li>
              ))}
            </ul>
          </section>

          {/* Integrations */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🔌</span>
              {t("makingOf.modal.integrations")}
            </h3>
            <div className={styles.integrationGrid}>
              {app.integrations.map((integration) => (
                <div key={integration} className={styles.integrationBadge}>
                  {integration}
                </div>
              ))}
            </div>
          </section>

          {/* Links */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🔗</span>
              {t("makingOf.modal.links")}
            </h3>
            <div className={styles.linksGrid}>
              {app.url && (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  {t("makingOf.modal.website")}
                </a>
              )}
              {app.iosUrl && (
                <a
                  href={app.iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </a>
              )}
              {app.androidUrl && (
                <a
                  href={app.androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <svg className={styles.linkIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Google Play
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
