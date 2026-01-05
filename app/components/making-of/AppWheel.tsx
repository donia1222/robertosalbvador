import { useEffect, useRef, useState } from "react";
import type { AppDetail } from "./appsData";
import styles from "./AppWheel.module.css";

interface AppWheelProps {
  apps: AppDetail[];
  selectedApp: AppDetail | null;
  onAppClick: (app: AppDetail) => void;
}

export function AppWheel({ apps, selectedApp, onAppClick }: AppWheelProps) {
  const [radius, setRadius] = useState(220);

  // Responsive radius
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth <= 480) {
        setRadius(130);
      } else if (window.innerWidth <= 768) {
        setRadius(150);
      } else {
        setRadius(220);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <div className={styles.wheelContainer}>
      {/* Center display */}
      <div className={styles.centerDisplay}>
        {selectedApp ? (
          <>
            <img
              src={selectedApp.icon}
              alt={selectedApp.name}
              className={styles.centerIcon}
            />
            <h3 className={styles.centerTitle}>{selectedApp.name}</h3>
          </>
        ) : (
          <div className={styles.centerPlaceholder}>
            <div className={styles.placeholderIcon}>📱</div>
            <p className={styles.placeholderText}>Selecciona una app</p>
          </div>
        )}
      </div>

      {/* Rotating wheel */}
      <div className={styles.wheel}>
        {apps.map((app, index) => {
          const anglePerApp = 360 / apps.length;
          const angle = index * anglePerApp;

          const x = Math.sin((angle * Math.PI) / 180) * radius;
          const y = -Math.cos((angle * Math.PI) / 180) * radius;

          const isSelected = selectedApp?.id === app.id;

          return (
            <button
              key={app.id}
              className={`${styles.appItem} ${isSelected ? styles.appItemSelected : ""}`}
              style={{
                '--x': `${x}px`,
                '--y': `${y}px`,
              } as React.CSSProperties}
              onClick={() => onAppClick(app)}
            >
              <img src={app.icon} alt={app.name} className={styles.appIcon} />
            </button>
          );
        })}
      </div>

      {/* Orbit ring */}
      <div className={styles.orbitRing} />
    </div>
  );
}
