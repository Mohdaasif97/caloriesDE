import styles from '../styles/Home.module.css';

/**
 * SEO-Optimized Footer Component
 * Includes:
 * - Proper semantic HTML structure
 * - Structured data for social profiles (Schema.org)
 * - Accessibility attributes
 * - Mobile-responsive design
 * - Link relationships for SEO (rel="me")
 */
export default function Footer({ includeSchema = true }) {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61588221497294',
      icon: '📘',
      platformName: 'Facebook',
    },
    {
      name: 'Twitter / X',
      url: 'https://x.com/MohdAasif763323',
      icon: '𝕏',
      platformName: 'Twitter',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohd-aasif-44121a261',
      icon: '🔗',
      platformName: 'LinkedIn',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@violent34343',
      icon: '▶️',
      platformName: 'YouTube',
    },
  ];

  // Schema.org Organization + Social Profiles
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kalorienrechner.de',
    url: 'https://www.kalorienrechner9.de',
    logo: 'https://www.kalorienrechner9.de/logo.png',
    description: 'Kostenloser Online-Kalorienrechner für Deutschland. Berechne deinen Grundumsatz, Gesamtumsatz und Makronährstoffe.',
    sameAs: socialLinks.map(link => link.url),
    founder: {
      '@type': 'Person',
      name: 'Mohd Aasif',
      sameAs: [
        'https://www.facebook.com/profile.php?id=61588221497294',
        'https://x.com/MohdAasif763323',
        'https://www.linkedin.com/in/mohd-aasif-44121a261',
        'https://www.youtube.com/@violent34343',
      ],
    },
  };

  return (
    <>
      {/* JSON-LD Schema for Organization and Social Profiles */}
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      )}

      <footer className={styles.footer}>
        <div className={styles.container}>
          {/* Footer Top Section */}
          <div className={styles.footerTop}>
            {/* Brand Section */}
            <div className={styles.footerBrand}>
              <div className={styles.logo} style={{ marginBottom: '10px' }}>
                <span className={styles.logoIcon}>🔥</span>
                <span style={{ color: '#fff', fontWeight: 800 }}>
                  Kalorienrechner
                  <span className={styles.logoAccent}>.de</span>
                </span>
              </div>
              <p>
                Ihr kostenloser Online-Kalorienrechner für Deutschland. Grundumsatz, Gesamtumsatz und Makronährstoffe berechnen.
              </p>

              {/* Social Links Section with SEO optimization */}
              <div style={{ marginTop: '20px' }}>
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '10px',
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Folge uns
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      title={`Besuche Kalorienrechner.de auf ${link.name}`}
                      aria-label={`Folge uns auf ${link.name}`}
                      className={styles.socialLink}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        fontSize: '14px',
                        fontWeight: '500',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>{link.icon}</span>
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className={styles.footerLinks}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#fff' }}>Navigation</h3>
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

            {/* Additional SEO Links */}
            <div
              style={{
                marginTop: '12px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              <span>
                📍 Verfügbar in: Deutschland, Österreich, Schweiz
              </span>
              <span>
                ⚡ Schnelle und sichere Berechnung ohne Datenverkauf
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}