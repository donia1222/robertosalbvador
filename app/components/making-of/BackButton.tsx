import { Link } from "@remix-run/react";
import { useLanguage } from "~/context";
import styles from "./BackButton.module.css";

export function BackButton() {
  const { t } = useLanguage();

  return (
    <Link to="/" className={styles.backButton}>
      <div className={styles.iconWrapper}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <span className={styles.text}>{t("makingOf.back")}</span>
      <div className={styles.glow} />
    </Link>
  );
}
