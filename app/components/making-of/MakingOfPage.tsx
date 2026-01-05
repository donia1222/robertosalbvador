import { useState } from "react";
import { useLanguage } from "~/context";
import { AppWheel } from "./AppWheel";
import { AppModal } from "./AppModal";
import { BackButton } from "./BackButton";
import { appsData, type AppDetail } from "./appsData";
import styles from "./MakingOfPage.module.css";

export function MakingOfPage() {
  const { t } = useLanguage();
  const [selectedApp, setSelectedApp] = useState<AppDetail | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAppClick = (app: AppDetail) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background effects */}
      <div className={styles.backgroundGradient} />
      <div className={styles.particlesContainer}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <BackButton />

      {/* Main content */}
      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🎬</span>
            <span className={styles.badgeText}>{t("makingOf.badge")}</span>
          </div>
          <h1 className={styles.title}>
            {t("makingOf.title")} <span className={styles.highlight}>{t("makingOf.subtitle")}</span>
          </h1>
          <p className={styles.description}>{t("makingOf.description")}</p>
        </div>

        {/* App Wheel */}
        <AppWheel
          apps={appsData}
          selectedApp={selectedApp}
          onAppClick={handleAppClick}
        />
      </div>

      {/* Modal */}
      {showModal && selectedApp && (
        <AppModal app={selectedApp} onClose={handleCloseModal} />
      )}
    </div>
  );
}
