import { Link } from "@remix-run/react";
import { useTheme } from "~/context";
import styles from "./Header.module.css";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Sobre mí", href: "#sobre-mi" },
  { name: "Contacto", href: "#contacto" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>Roberto Salvdor</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.name}>
                <a href={item.href} className={styles.navLink}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
