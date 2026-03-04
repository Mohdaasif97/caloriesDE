import styles from '../styles/Home.module.css';

export default function Footer() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kalorienrechner.de',
    url: 'https://www.kalorienrechner9.de',
    logo: 'https://www.kalorienrechner9.de/logo.png',
    description: 'Kostenloser Online-Kalorienrechner für Deutschland. Berechne deinen Grundumsatz, Gesamtumsatz und Makronährstoffe.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            {/* Brand Section */}
            <div className={styles.footerBrand}>
              <div className={styles.logo} style={{ marginBottom: '10px' }}>
                <span className={styles.logoIcon}>🔥</span>
                <span style={{ color: '#f1f5f9', fontWeight: 800 }}>
                  Kalorienrechner
                  <span className={styles.logoAccent}>.de</span>
                </span>
              </div>
              <p>
                Ihr kostenloser Online-Kalorienrechner für Deutschland. Grundumsatz, Gesamtumsatz und Makronährstoffe berechnen.
              </p>
            </div>

            {/* Navigation Links */}
            <div className={styles.footerLinks}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#f1f5f9' }}>Navigation</h3>
              <a href="#rechner">Kalorienrechner</a>
              <a href="#ernaehrung">Ernährungstipps</a>
              <a href="#tipps">Abnehmen</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p className={styles.footerNote}>
              © {new Date().getFullYear()} Kalorienrechner.de — Alle Angaben ohne Gewähr. Die Berechnung des Kalorienbedarfs dient zur Orientierung. Bei medizinischen Fragen oder Erkrankungen wenden Sie sich an einen Arzt oder Ernährungsberater.
            </p>
            <div style={{ marginTop: '12px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <span>📍 Verfügbar in: Deutschland, Österreich, Schweiz</span>
              <span>⚡ Schnelle und sichere Berechnung ohne Datenverkauf</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}