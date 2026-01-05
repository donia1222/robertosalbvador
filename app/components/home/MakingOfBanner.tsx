import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import styles from "./MakingOfBanner.module.css";
import { useLanguage } from "~/context";

export function MakingOfBanner() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleNavigate = () => {
    setShowOverlay(true);

    // Navigate after overlay animation
    setTimeout(() => {
      navigate("/making-of");
    }, 1200);
  };

  return (
    <div className={styles.buttonContainer}>
      <button onClick={handleNavigate} className={styles.btnPrimary}>
        <span>{t("makingOfBanner.button")}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 15L12.5 10L7.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Transition Overlay */}
      {showOverlay && (
        <div className={styles.transitionOverlay}>
          <div className={styles.overlayLoader}>
            <span className={styles.overlayLetter} style={{ animationDelay: '0s' }}>M</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.1s' }}>a</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.2s' }}>k</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.3s' }}>i</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.4s' }}>n</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.5s' }}>g</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.6s' }}>&nbsp;</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.7s' }}>o</span>
            <span className={styles.overlayLetter} style={{ animationDelay: '0.8s' }}>f</span>
          </div>
        </div>
      )}
    </div>
  );
}
