import { useState } from "react";
import styles from "./Footer.module.css";
import { useLanguage } from "~/context";

export function Footer() {
  const { t } = useLanguage();
  const [showImpressum, setShowImpressum] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.copyright}>
            {t("footer.copyright")}
          </p>
          <div className={styles.links}>
            <button
              onClick={() => setShowImpressum(true)}
              className={styles.link}
            >
              {t("footer.legal")}
            </button>
            <button
              onClick={() => setShowPrivacy(true)}
              className={styles.link}
            >
              {t("footer.privacy")}
            </button>
          </div>
        </div>
      </footer>

      {/* Impressum Modal */}
      {showImpressum && (
        <div className={styles.modal} onClick={() => setShowImpressum(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setShowImpressum(false)}
            >
              ✕
            </button>
            <h2 className={styles.modalTitle}>{t("footer.legal")}</h2>
            <div className={styles.modalBody}>
              <p><strong>Roberto Salvador</strong></p>
              <p>Chalberweidstrasse 38, 9475 Sevelen, Schweiz</p>
              <p>Teléfono: 081 750 1911</p>
              <p>E-Mail: info@lweb.ch</p>
              <p className={styles.note}>Algunas imágenes provienen de Freepik</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className={styles.modal} onClick={() => setShowPrivacy(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setShowPrivacy(false)}
            >
              ✕
            </button>
            <h2 className={styles.modalTitle}>{t("footer.privacy")}</h2>
            <div className={styles.modalBody}>
              <h3>Declaración de Privacidad de Roberto Salvador</h3>
              <p>
                Nos tomamos muy en serio la protección de sus datos personales. Esta
                declaración de privacidad explica cómo recopilamos, usamos y protegemos
                sus datos personales.
              </p>

              <h4>1. Recopilación de Datos</h4>
              <p>
                Recopilamos datos personales cuando se pone en contacto con nosotros,
                utiliza nuestros servicios o visita nuestro sitio web. Los datos
                recopilados incluyen, entre otros:
              </p>
              <ul>
                <li>Nombre y apellidos</li>
                <li>Información de contacto (correo electrónico, teléfono)</li>
                <li>Dirección IP y datos de uso de nuestro sitio web</li>
              </ul>

              <h4>2. Uso de los Datos</h4>
              <p>
                Utilizamos sus datos para prestar nuestros servicios, comunicarnos con
                usted y mejorar nuestro sitio web. Sus datos nunca se venderán ni se
                compartirán con terceros.
              </p>

              <h4>3. Protección de Datos</h4>
              <p>
                Implementamos medidas técnicas y organizativas para proteger sus datos
                personales contra acceso no autorizado, pérdida o uso indebido. Sin
                embargo, no podemos garantizar una seguridad completa.
              </p>

              <h4>4. Sus Derechos</h4>
              <p>
                Tiene derecho a solicitar información sobre los datos personales
                almacenados, corregirlos o eliminarlos. Para preguntas o solicitudes sobre
                el procesamiento de datos, puede contactarnos en cualquier momento.
              </p>

              <h4>5. Cambios en la Política de Privacidad</h4>
              <p>
                Nos reservamos el derecho de modificar esta política de privacidad en
                cualquier momento. La versión actual está disponible en nuestro sitio web.
              </p>

              <p className={styles.contact}>
                Para preguntas o consultas, contáctenos en:<br />
                <strong>E-Mail: info@lweb.ch</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
