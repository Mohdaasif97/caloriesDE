import Head from 'next/head'
import { useState, useCallback } from 'react';
import styles from '../styles/Home.module.css';
import Footer from '../components/Footer';

// PAL activity levels
const PAL_LEVELS = [
  { label: 'Kaum Bewegung (Bürojob, fast nur sitzen)', pal: 1.2 },
  { label: 'Leicht aktiv (1–2× Sport/Woche)', pal: 1.375 },
  { label: 'Mäßig aktiv (3–5× Sport/Woche)', pal: 1.55 },
  { label: 'Sehr aktiv (6–7× intensiver Sport)', pal: 1.725 },
  { label: 'Extrem aktiv (körperl. Arbeit + tägliches Training)', pal: 1.9 },
];

const ZIELE = [
  { label: '🔥 Abnehmen (−500 kcal/Tag)', delta: -500 },
  { label: '⚖️ Gewicht halten (Erhaltungsbedarf)', delta: 0 },
  { label: '💪 Zunehmen / Muskelaufbau (+300 kcal/Tag)', delta: 300 },
];

function calcMifflin(geschlecht, gewicht, groesse, alter) {
  // Mifflin-St. Jeor
  if (geschlecht === 'mann') {
    return 10 * gewicht + 6.25 * groesse - 5 * alter + 5;
  } else {
    return 10 * gewicht + 6.25 * groesse - 5 * alter - 161;
  }
}

export default function Home() {
  const [geschlecht, setGeschlecht] = useState('mann');
  const [alter, setAlter] = useState('');
  const [groesse, setGroesse] = useState('');
  const [gewicht, setGewicht] = useState('');
  const [aktivitaet, setAktivitaet] = useState(1);
  const [ziel, setZiel] = useState(1);
  const [ergebnis, setErgebnis] = useState(null);
  const [error, setError] = useState('');

  const berechnen = useCallback(() => {
    const a = parseFloat(alter);
    const g = parseFloat(groesse);
    const gw = parseFloat(gewicht);

    if (!a || !g || !gw || a < 10 || a > 120 || g < 100 || g > 250 || gw < 30 || gw > 300) {
      setError('Bitte gültige Werte eingeben (Alter: 10–120, Größe: 100–250 cm, Gewicht: 30–300 kg).');
      return;
    }
    setError('');

    const grundumsatz = Math.round(calcMifflin(geschlecht, gw, g, a));
    const palFactor = PAL_LEVELS[aktivitaet].pal;
    const gesamtumsatz = Math.round(grundumsatz * palFactor);
    const zielDelta = ZIELE[ziel].delta;
    const zielKalorien = gesamtumsatz + zielDelta;

    // Macros
    // Protein: 2g/kg body weight for muscle, 1.6 for maintain/lose
    const proteinGPerKg = ziel === 2 ? 2.0 : 1.7;
    const proteinG = Math.round(proteinGPerKg * gw);
    const proteinKcal = proteinG * 4;

    // Fat: 25% of target calories
    const fettKcal = Math.round(zielKalorien * 0.25);
    const fettG = Math.round(fettKcal / 9);

    // Carbs: rest
    const kohlenhydrateKcal = zielKalorien - proteinKcal - fettKcal;
    const kohlenhydrateG = Math.round(kohlenhydrateKcal / 4);

    // BMI
    const bmi = (gw / ((g / 100) * (g / 100))).toFixed(1);
    let bmiLabel = '';
    if (bmi < 18.5) bmiLabel = 'Untergewicht';
    else if (bmi < 25) bmiLabel = 'Normalgewicht ✅';
    else if (bmi < 30) bmiLabel = 'Übergewicht';
    else bmiLabel = 'Adipositas';

    setErgebnis({
      grundumsatz,
      gesamtumsatz,
      zielKalorien,
      proteinG,
      fettG,
      kohlenhydrateG,
      bmi,
      bmiLabel,
      zielDelta,
      palLabel: PAL_LEVELS[aktivitaet].label,
      zielLabel: ZIELE[ziel].label,
    });
  }, [geschlecht, alter, groesse, gewicht, aktivitaet, ziel]);

  const zurueck = () => {
    setErgebnis(null);
    setError('');
  };

  // Schema.org
  const schemaApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Kalorienrechner 2026 – Kalorienbedarf berechnen",
    "description": "Kostenloser Kalorienrechner 2026: Berechnen Sie Ihren täglichen Kalorienbedarf (Grundumsatz & Gesamtumsatz) mit der Mifflin-St. Jeor-Formel. Inklusive Makronährstoffe für Abnehmen, Gewicht halten oder Zunehmen.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "featureList": [
      "Grundumsatz berechnen (Mifflin-St. Jeor)",
      "Gesamtumsatz berechnen mit PAL-Faktoren",
      "Kalorienbedarf für Abnehmen, Halten, Zunehmen",
      "Makronährstoffverteilung (Protein, Fett, Kohlenhydrate)",
      "BMI-Berechnung"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie viele Kalorien brauche ich pro Tag?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der tägliche Kalorienbedarf hängt von Geschlecht, Alter, Größe, Gewicht und Aktivitätslevel ab. Frauen benötigen durchschnittlich 1.800–2.200 kcal/Tag, Männer 2.200–2.800 kcal/Tag. Unser Kalorienrechner berechnet Ihren genauen Bedarf mit der wissenschaftlichen Mifflin-St. Jeor-Formel."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist der Unterschied zwischen Grundumsatz und Gesamtumsatz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Grundumsatz (Basal Metabolic Rate, BMR) ist die Kalorienmenge, die Ihr Körper im absoluten Ruhezustand für lebenswichtige Funktionen verbraucht. Der Gesamtumsatz (Total Daily Energy Expenditure, TDEE) ist der Grundumsatz multipliziert mit einem PAL-Faktor, der Ihre körperliche Aktivität berücksichtigt."
        }
      },
      {
        "@type": "Question",
        "name": "Wie viele Kalorien pro Tag um abzunehmen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Um 1 kg Fett pro Woche abzubauen, benötigen Sie ein tägliches Kaloriendefizit von ca. 1.000 kcal. Empfohlen werden 300–600 kcal Defizit täglich — das entspricht einem Gewichtsverlust von 0,3–0,6 kg pro Woche. Unser Kalorienrechner empfiehlt ein moderates Defizit von 500 kcal täglich."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist die Mifflin-St. Jeor-Formel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Mifflin-St. Jeor-Formel ist die genaueste Methode zur Berechnung des Grundumsatzes. Für Männer: (10 × Gewicht in kg) + (6,25 × Größe in cm) − (5 × Alter) + 5. Für Frauen: (10 × Gewicht in kg) + (6,25 × Größe in cm) − (5 × Alter) − 161."
        }
      },
      {
        "@type": "Question",
        "name": "Wie viel Protein brauche ich pro Tag?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für den Muskelaufbau empfehlen Ernährungsexperten 1,6–2,2 g Protein pro kg Körpergewicht. Bei einem Gewicht von 80 kg sind das 128–176 g Protein täglich. Zum Gewicht halten reichen 1,2–1,6 g/kg aus."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist ein PAL-Faktor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PAL steht für Physical Activity Level (körperliches Aktivitätsniveau). Der PAL-Faktor wird mit dem Grundumsatz multipliziert, um den täglichen Gesamtkalorienverbrauch zu berechnen. Er reicht von 1,2 (kaum Bewegung) bis 1,9 (extrem aktiv). Unser Kalorienrechner berücksichtigt den PAL-Faktor automatisch."
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Kalorienrechner 2026 – Kalorienbedarf berechnen",
    "description": "Kostenloser Kalorienrechner für Deutschland. Grundumsatz & Gesamtumsatz mit der Mifflin-St. Jeor-Formel berechnen. Inklusive Makronährstoffe für Abnehmen, Halten oder Zunehmen.",
    "author": {
      "@type": "Organization",
      "name": "Kalorienrechner.de",
      "url": "https://www.kalorienrechner9.de"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kalorienrechner.de",
      "url": "https://www.kalorienrechner9.de"
    },
    "datePublished": "2026-01-01",
    "dateModified": "2026-02-25",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.kalorienrechner9.de/"
    }
  };

  return (
    <>
      <Head>
        <title>Kalorienrechner 2026 – Kalorienbedarf berechnen (Grundumsatz & kcal)</title>
        <meta name="description" content="✅ Kalorienrechner 2026: Kalorienbedarf & Grundumsatz kostenlos berechnen. Mifflin-St. Jeor-Formel ✓ PAL-Faktoren ✓ Makronährstoffe ✓ Für Abnehmen, Halten & Zunehmen. Jetzt berechnen!" />
        <meta name="keywords" content="kalorienrechner, kalorienbedarf berechnen, kalorien berechnen, grundumsatz berechnen, gesamtumsatz berechnen, kcal rechner, kalorienverbrauch berechnen, täglicher kalorienbedarf, kalorien pro tag, abnehmen kalorien, kalorienbedarf frau, kalorienbedarf mann, mifflin st jeor, pal faktor rechner, makronährstoffe berechnen" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Kalorienrechner.de" />
        <meta name="language" content="de" />
        <link rel="canonical" href="https://www.kalorienrechner9.de/" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

          <meta property="og:title" content="Kalorienrechner 2026 – Kalorienbedarf berechnen" />
          <meta property="og:description" content="Kostenloser Kalorienrechner: Grundumsatz & Gesamtumsatz berechnen. Mit Makronährstoffen für Abnehmen, Gewicht halten & Zunehmen." />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="de_DE" />
          <meta property="og:url" content="https://www.kalorienrechner9.de/" />
          <meta property="og:image" content="https://www.kalorienrechner9.de/og-image.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kalorienrechner 2026 – Grundumsatz & Kalorienbedarf" />
          <meta name="twitter:description" content="Kostenloser Kalorienrechner 2026 für Deutschland. Kalorienbedarf, Grundumsatz und Makronährstoffe sofort berechnen." />

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  onLoad={(e) => { e.currentTarget.rel = 'stylesheet' }}
/>
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</noscript>
      </Head>

      <div className={styles.page}>

        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>🔥</span>
              <span>Kalorienrechner<span className={styles.logoAccent}>.de</span></span>
            </div>
            <nav className={styles.nav}>
              <a href="#rechner">Rechner</a>
              <a href="#ernaehrung">Ernährung</a>
              <a href="#tipps">Tipps</a>
              <a href="#faq">FAQ</a>
            </nav>
          </div>
        </header>

        <main>

          {/* HERO */}
          <section className={styles.hero}>
            <div className={styles.heroInner}>
              <div className={styles.heroText}>
                <div className={styles.heroBadge}>Wissenschaftlich fundiert · Mifflin-St. Jeor-Formel</div>
                <h1 className={styles.h1}>
                  Kalorienrechner 2026<br />
                  <span className={styles.h1Accent}>Kalorienbedarf berechnen</span>
                </h1>
                <p className={styles.heroDesc}>
                  Berechnen Sie Ihren persönlichen <strong>Grundumsatz</strong> und <strong>täglichen Kalorienbedarf</strong> — inklusive Makronährstoffe für Abnehmen, Gewicht halten oder Muskelaufbau. Kostenlos & sofort.
                </p>
                <div className={styles.heroStats}>
                  <div className={styles.heroStat}><span>📐</span> Mifflin-St. Jeor</div>
                  <div className={styles.heroStat}><span>⚡</span> PAL-Faktoren</div>
                  <div className={styles.heroStat}><span>🥩</span> Makronährstoffe</div>
                  <div className={styles.heroStat}><span>📊</span> BMI-Check</div>
                </div>
              </div>
              <div className={styles.heroVisual}>
                <div className={styles.heroPill}>Ø Mann</div>
                <div className={styles.heroCircle}>
                  <span className={styles.heroCircleNum}>2.400</span>
                  <span className={styles.heroCircleLabel}>kcal/Tag</span>
                </div>
                <div className={styles.heroPillBottom}>Ø Frau: ~1.900 kcal</div>
              </div>
            </div>
          </section>

          {/* CALCULATOR */}
          <section id="rechner" className={styles.calcSection}>
            <div className={styles.container}>
              <div className={styles.calcCard}>
                {!ergebnis ? (
                  <>
                    <div className={styles.calcHeader}>
                      <h2>Kalorienrechner – Bedarf berechnen</h2>
                      <p>Geben Sie Ihre persönlichen Daten ein und berechnen Sie Ihren individuellen Kalorienbedarf.</p>
                    </div>

                    {/* Step 1: Personal data */}
                    <div className={styles.stepBlock}>
                      <div className={styles.stepLabel}><span className={styles.stepNum}>1</span> Persönliche Daten</div>

                      {/* Gender toggle */}
                      <div className={styles.genderRow}>
                        <button
                          className={`${styles.genderBtn} ${geschlecht === 'mann' ? styles.genderActive : ''}`}
                          onClick={() => { setGeschlecht('mann'); setErgebnis(null); }}
                        >
                          <span>👨</span> Mann
                        </button>
                        <button
                          className={`${styles.genderBtn} ${geschlecht === 'frau' ? styles.genderActive : ''}`}
                          onClick={() => { setGeschlecht('frau'); setErgebnis(null); }}
                        >
                          <span>👩</span> Frau
                        </button>
                      </div>

                      <div className={styles.inputGrid}>
                        <div className={styles.field}>
                          <label htmlFor="alter" className={styles.label}>Alter</label>
                          <div className={styles.inputWrap}>
                            <input id="alter" type="number" min="10" max="120" placeholder="z.B. 30" className={styles.input}
                              value={alter} onChange={e => { setAlter(e.target.value); setErgebnis(null); }} />
                            <span className={styles.unit}>Jahre</span>
                          </div>
                        </div>
                        <div className={styles.field}>
                          <label htmlFor="groesse" className={styles.label}>Körpergröße</label>
                          <div className={styles.inputWrap}>
                            <input id="groesse" type="number" min="100" max="250" placeholder="z.B. 175" className={styles.input}
                              value={groesse} onChange={e => { setGroesse(e.target.value); setErgebnis(null); }} />
                            <span className={styles.unit}>cm</span>
                          </div>
                        </div>
                        <div className={styles.field}>
                          <label htmlFor="gewicht" className={styles.label}>Körpergewicht</label>
                          <div className={styles.inputWrap}>
                            <input id="gewicht" type="number" min="30" max="300" placeholder="z.B. 75" className={styles.input}
                              value={gewicht} onChange={e => { setGewicht(e.target.value); setErgebnis(null); }} />
                            <span className={styles.unit}>kg</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Activity */}
                    <div className={styles.stepBlock}>
                      <div className={styles.stepLabel}><span className={styles.stepNum}>2</span> Aktivitätslevel (PAL-Faktor)</div>
                      <div className={styles.activityList}>
                        {PAL_LEVELS.map((p, i) => (
                          <label key={i} className={`${styles.activityItem} ${aktivitaet === i ? styles.activityActive : ''}`}>
                            <input type="radio" name="aktivitaet" value={i}
                              checked={aktivitaet === i}
                              onChange={() => { setAktivitaet(i); setErgebnis(null); }} />
                            <span className={styles.activityText}>{p.label}</span>
                            <span className={styles.activityPal}>PAL {p.pal}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Goal */}
                    <div className={styles.stepBlock}>
                      <div className={styles.stepLabel}><span className={styles.stepNum}>3</span> Mein Ziel</div>
                      <div className={styles.goalGrid}>
                        {ZIELE.map((z, i) => (
                          <button key={i}
                            className={`${styles.goalBtn} ${ziel === i ? styles.goalActive : ''}`}
                            onClick={() => { setZiel(i); setErgebnis(null); }}
                          >
                            {z.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {error && <div className={styles.errorMsg}>⚠️ {error}</div>}

                    <button className={styles.btnCalc} onClick={berechnen}>
                      🔥 Kalorienbedarf berechnen
                    </button>
                  </>
                ) : (
                  /* RESULTS */
                  <div className={styles.results}>
                    <div className={styles.resultHeader}>
                      <h2>Ihr persönlicher Kalorienbedarf</h2>
                      <p>{ergebnis.zielLabel} · {ergebnis.palLabel}</p>
                    </div>

                    {/* Main numbers */}
                    <div className={styles.mainResults}>
                      <div className={styles.mainCard}>
                        <span className={styles.mainLabel}>Grundumsatz (BMR)</span>
                        <span className={styles.mainNum}>{ergebnis.grundumsatz.toLocaleString('de-DE')}</span>
                        <span className={styles.mainUnit}>kcal/Tag</span>
                        <span className={styles.mainHint}>Ruhebedarf Ihres Körpers</span>
                      </div>
                      <div className={styles.arrow}>→</div>
                      <div className={styles.mainCard}>
                        <span className={styles.mainLabel}>Gesamtumsatz (TDEE)</span>
                        <span className={styles.mainNum}>{ergebnis.gesamtumsatz.toLocaleString('de-DE')}</span>
                        <span className={styles.mainUnit}>kcal/Tag</span>
                        <span className={styles.mainHint}>inkl. Aktivität</span>
                      </div>
                      <div className={styles.arrow}>→</div>
                      <div className={`${styles.mainCard} ${styles.mainCardHighlight}`}>
                        <span className={styles.mainLabel}>🎯 Zielkalorien</span>
                        <span className={styles.mainNum}>{ergebnis.zielKalorien.toLocaleString('de-DE')}</span>
                        <span className={styles.mainUnit}>kcal/Tag</span>
                        <span className={styles.mainHint}>
                          {ergebnis.zielDelta < 0 ? `${Math.abs(ergebnis.zielDelta)} kcal Defizit` :
                            ergebnis.zielDelta > 0 ? `+${ergebnis.zielDelta} kcal Überschuss` : 'Erhaltungsbedarf'}
                        </span>
                      </div>
                    </div>

                    {/* Macros */}
                    <div className={styles.macroSection}>
                      <h3 className={styles.macroTitle}>Empfohlene Makronährstoffverteilung</h3>
                      <div className={styles.macroGrid}>
                        <div className={`${styles.macroCard} ${styles.macroProtein}`}>
                          <span className={styles.macroIcon}>🥩</span>
                          <span className={styles.macroName}>Protein</span>
                          <span className={styles.macroG}>{ergebnis.proteinG} g</span>
                          <span className={styles.macroKcal}>{ergebnis.proteinG * 4} kcal</span>
                        </div>
                        <div className={`${styles.macroCard} ${styles.macroFett}`}>
                          <span className={styles.macroIcon}>🥑</span>
                          <span className={styles.macroName}>Fett</span>
                          <span className={styles.macroG}>{ergebnis.fettG} g</span>
                          <span className={styles.macroKcal}>{ergebnis.fettG * 9} kcal</span>
                        </div>
                        <div className={`${styles.macroCard} ${styles.macroKarbs}`}>
                          <span className={styles.macroIcon}>🍚</span>
                          <span className={styles.macroName}>Kohlenhydrate</span>
                          <span className={styles.macroG}>{ergebnis.kohlenhydrateG} g</span>
                          <span className={styles.macroKcal}>{ergebnis.kohlenhydrateG * 4} kcal</span>
                        </div>
                      </div>
                    </div>

                    {/* BMI */}
                    <div className={styles.bmiRow}>
                      <span className={styles.bmiLabel}>Ihr BMI:</span>
                      <span className={styles.bmiValue}>{ergebnis.bmi}</span>
                      <span className={styles.bmiStatus}>{ergebnis.bmiLabel}</span>
                    </div>

                    <div className={styles.resultNote}>
                      Diese Werte sind Richtwerte basierend auf der <strong>Mifflin-St. Jeor-Formel</strong>. Individuelle Abweichungen von ±10 % sind möglich. Bei gesundheitlichen Fragen wenden Sie sich an einen Arzt oder Ernährungsberater.
                    </div>

                    <button className={styles.btnReset} onClick={zurueck}>
                      ← Neu berechnen
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SEO Content: How it works */}
          <section className={styles.contentSection}>
            <div className={styles.container}>
              <article className={styles.article}>
                <h2>Kalorienrechner 2026 – So berechnen Sie Ihren Kalorienbedarf</h2>
                <p>
                  Unser kostenloser <strong>Kalorienrechner</strong> ermittelt Ihren individuellen <strong>Kalorienbedarf</strong> auf wissenschaftlicher Basis — präzise, schnell und kostenlos. Ob Sie <strong>abnehmen</strong>, Ihr Gewicht halten oder <strong>Muskeln aufbauen</strong> möchten: Der erste Schritt auf dem Weg zu Ihrem Ziel ist das genaue Wissen über Ihren täglichen Energiebedarf in Kilokalorien (kcal). Unser <strong>Kalorienbedarfsrechner</strong> verwendet die anerkannte <strong>Mifflin-St. Jeor-Formel</strong> kombiniert mit individuellen PAL-Faktoren und liefert Ihnen neben dem reinen <strong>Grundumsatz</strong> und <strong>Gesamtumsatz</strong> auch eine passende <strong>Makronährstoffverteilung</strong> für Protein, Fett und Kohlenhydrate.
                </p>
                <p>
                  Der <strong>Grundumsatz</strong> (englisch: Basal Metabolic Rate, kurz BMR) beschreibt die Kalorienmenge, die Ihr Körper im absoluten Ruhezustand benötigt, um lebenswichtige Funktionen wie Atmung, Herzschlag, Körpertemperatur und Zellregeneration aufrechtzuerhalten. Dieser Wert macht bei den meisten Menschen etwa 60–75 % des gesamten täglichen Kalorienverbrauchs aus. Der <strong>Gesamtumsatz</strong> (Total Daily Energy Expenditure, TDEE) hingegen berücksichtigt zusätzlich Ihre körperliche Aktivität durch den sogenannten PAL-Faktor.
                </p>

                <h2>Die Mifflin-St. Jeor-Formel zur Grundumsatz-Berechnung</h2>
                <p>
                  Unser <strong>Kalorienrechner</strong> verwendet die <strong>Mifflin-St. Jeor-Formel</strong>, die 1990 entwickelt wurde und als genaueste Methode zur Schätzung des Grundumsatzes gilt. Im Vergleich zur älteren Harris-Benedict-Formel weist sie eine deutlich geringere Fehlerquote auf und wird deshalb von Ernährungswissenschaftlern und Ärzten bevorzugt.
                </p>
                <p>
                  Die Formeln lauten:<br />
                  <strong>Männer:</strong> Grundumsatz = (10 × Gewicht in kg) + (6,25 × Größe in cm) − (5 × Alter in Jahren) + 5<br />
                  <strong>Frauen:</strong> Grundumsatz = (10 × Gewicht in kg) + (6,25 × Größe in cm) − (5 × Alter in Jahren) − 161
                </p>
                <p>
                  Ein Beispiel: Eine 30-jährige Frau, 165 cm groß, 65 kg schwer, hat nach Mifflin-St. Jeor einen <strong>Grundumsatz</strong> von: (10 × 65) + (6,25 × 165) − (5 × 30) − 161 = 650 + 1031,25 − 150 − 161 = <strong>1.370 kcal/Tag</strong>.
                </p>

                <h2>PAL-Faktor: Aktivitätslevel beim Kalorienbedarf berücksichtigen</h2>
                <p>
                  Der PAL-Wert (Physical Activity Level) ist ein Multiplikator, der angibt, wie aktiv Sie im Alltag sind. Er wird mit dem Grundumsatz multipliziert, um Ihren <strong>Gesamtkalorienverbrauch</strong> zu ermitteln. Je aktiver Ihr Lebensstil, desto höher der PAL-Faktor — und desto mehr Kalorien benötigt Ihr Körper täglich.
                </p>
                <p>
                  Die PAL-Stufen im Überblick: <strong>1,2</strong> für Menschen mit überwiegend sitzender Tätigkeit ohne Sport; <strong>1,375</strong> für leicht aktive Personen mit 1–2 Sporteinheiten pro Woche; <strong>1,55</strong> für mäßig aktive Menschen mit 3–5 Trainingseinheiten; <strong>1,725</strong> für sehr aktive Sportler mit täglichem intensivem Training; sowie <strong>1,9</strong> für körperlich extrem beanspruchte Personen wie Leistungssportler oder Bauarbeiter.
                </p>
              </article>
            </div>
          </section>

          {/* Kalorien-Tabelle */}
          <section className={styles.tableSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Durchschnittlicher Kalorienbedarf nach Alter und Geschlecht</h2>
              <p>Die folgende Tabelle zeigt den ungefähren täglichen <strong>Kalorienbedarf</strong> für Männer und Frauen in verschiedenen Altersgruppen bei mittlerem Aktivitätslevel (PAL 1,55). Die Angaben dienen als Orientierung — Ihr genauer Bedarf hängt von Größe, Gewicht und Aktivität ab.</p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Altersgruppe</th>
                      <th>Männer (kcal/Tag)</th>
                      <th>Frauen (kcal/Tag)</th>
                      <th>Abnehmen (Frau)</th>
                      <th>Abnehmen (Mann)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['18–25 Jahre', '2.600–2.800 kcal', '2.000–2.200 kcal', '1.500–1.700 kcal', '2.100–2.300 kcal'],
                      ['26–35 Jahre', '2.400–2.700 kcal', '1.900–2.100 kcal', '1.400–1.600 kcal', '1.900–2.200 kcal'],
                      ['36–45 Jahre', '2.300–2.600 kcal', '1.800–2.000 kcal', '1.300–1.500 kcal', '1.800–2.100 kcal'],
                      ['46–55 Jahre', '2.200–2.500 kcal', '1.700–1.900 kcal', '1.200–1.400 kcal', '1.700–2.000 kcal'],
                      ['56–65 Jahre', '2.100–2.400 kcal', '1.600–1.800 kcal', '1.100–1.300 kcal', '1.600–1.900 kcal'],
                      ['65+ Jahre', '1.900–2.200 kcal', '1.500–1.700 kcal', '1.000–1.200 kcal', '1.400–1.700 kcal'],
                    ].map((row, i) => (
                      <tr key={i}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.tableNote}>* Richtwerte bei PAL 1,55 (mäßig aktiv) und durchschnittlicher Körpergröße/-gewicht. Für Ihre genauen Werte nutzen Sie unseren <strong>Kalorienrechner</strong> oben.</p>
            </div>
          </section>

          {/* Lebensmittel Kalorien */}
          <section className={styles.contentSection}>
            <div className={styles.container}>
              <article className={styles.article}>
                <h2 id="ernaehrung">Kalorien in Lebensmitteln – Die wichtigsten Fakten</h2>
                <p>
                  Neben dem Wissen über Ihren persönlichen <strong>Kalorienbedarf</strong> ist es wichtig zu verstehen, wie viele Kalorien in den häufigsten Lebensmitteln stecken. <strong>Kalorien</strong> (genauer: Kilokalorien, kcal) sind die Energieeinheit, die angibt, wie viel Energie ein Lebensmittel Ihrem Körper liefert. Die drei Hauptquellen für Kalorien in der Nahrung sind Protein (4 kcal/g), Kohlenhydrate (4 kcal/g) und Fett (9 kcal/g). Alkohol liefert übrigens 7 kcal/g — ohne nennenswerten Nährwert.
                </p>
                <p>
                  Proteinreiche Lebensmittel wie Hühnchenbrust (165 kcal/100g), Magerquark (67 kcal/100g), Eier (155 kcal/100g) oder Thunfisch (116 kcal/100g) helfen beim Abnehmen, da Protein sehr sättigend ist und den Muskelabbau verhindert. Kohlenhydratquellen wie Haferflocken (370 kcal/100g), Vollkornreis (360 kcal/100g) oder Süßkartoffeln (86 kcal/100g) liefern langanhaltende Energie. Gesunde Fettquellen wie Avocado (160 kcal/100g), Olivenöl (884 kcal/100g) oder Nüsse (550–650 kcal/100g) sind kalorienreich, aber unverzichtbar für Hormonhaushalt und Nährstoffaufnahme.
                </p>

                <h2>Abnehmen mit Kaloriendefizit – So geht es richtig</h2>
                <p>
                  Wer <strong>Gewicht verlieren</strong> möchte, braucht ein <strong>Kaloriendefizit</strong> — das heißt, Sie nehmen weniger Kalorien zu sich als Ihr Körper verbraucht. 1 kg Körperfett entspricht einem Energiegehalt von ca. 7.700 kcal. Um 1 kg Fett pro Woche zu verlieren, bräuchten Sie also täglich ein Defizit von 1.100 kcal — was für die meisten Menschen kaum gesund und nachhaltig umzusetzen ist. Deutlich empfehlenswerter ist ein moderates <strong>Kaloriendefizit von 300–600 kcal täglich</strong>, was einem nachhaltigen Gewichtsverlust von ca. 0,3–0,6 kg pro Woche entspricht.
                </p>
                <p>
                  Unser <strong>Kalorienrechner</strong> empfiehlt beim Ziel „Abnehmen" ein tägliches Defizit von 500 kcal — das entspricht einem wöchentlichen Gewichtsverlust von ca. 0,45 kg, was Ernährungsexperten als gesunde und nachhaltige Rate betrachten. Wichtig dabei: Unterschreiten Sie nie dauerhaft 1.200 kcal (Frauen) bzw. 1.500 kcal (Männer) täglich, da sonst Mangelernährung droht und der Körper in den Hungerstoffwechsel verfällt.
                </p>

                <h2>Kalorienbedarf beim Muskelaufbau erhöhen</h2>
                <p>
                  Muskelaufbau, auch Hypertrophie genannt, erfordert nicht nur regelmäßiges Krafttraining, sondern auch eine ausreichende Kalorienzufuhr. Der Körper kann nur dann effektiv Muskelmasse aufbauen, wenn er mit genug Energie und vor allem mit ausreichend <strong>Protein</strong> versorgt wird. Ein leichter <strong>Kalorienüberschuss von 200–400 kcal täglich</strong> gilt als optimal — so wird vorwiegend Muskelmasse und nicht unerwünschtes Körperfett aufgebaut. Unser <strong>Kalorienrechner</strong> empfiehlt beim Ziel „Zunehmen/Muskelaufbau" einen Überschuss von 300 kcal täglich.
                </p>
                <p>
                  Ebenso wichtig wie die Kalorienmenge ist die <strong>Proteinzufuhr</strong>. Für den Muskelaufbau empfehlen aktuelle Studien eine Proteinzufuhr von <strong>1,6–2,2 g Protein pro kg Körpergewicht</strong> täglich. Bei einem Körpergewicht von 80 kg sind das 128–176 g Protein täglich. Gute Proteinquellen sind mageres Fleisch, Hülsenfrüchte, Milchprodukte, Eier und Proteinpräparate.
                </p>
              </article>
            </div>
          </section>

          {/* Tipps Cards */}
          <section id="tipps" className={styles.tippsSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>10 bewährte Tipps zum Kalorien sparen & Abnehmen</h2>
              <p className={styles.sectionIntro}>
                Nachdem Sie Ihren <strong>Kalorienbedarf</strong> mit unserem <strong>Kalorienrechner</strong> ermittelt haben, helfen diese evidenzbasierten Tipps, Ihr Ziel effektiv zu erreichen.
              </p>
              <div className={styles.tipsGrid}>
                {[
                  { icon: '💧', title: 'Mehr Wasser trinken', text: 'Trinken Sie vor jeder Mahlzeit ein großes Glas Wasser. Studien zeigen, dass dies die Kalorienzufuhr pro Mahlzeit um bis zu 13 % reduzieren kann. Zudem wird Hunger oft mit Durst verwechselt.' },
                  { icon: '🥩', title: 'Protein bei jeder Mahlzeit', text: 'Proteinreiche Lebensmittel sättigen länger und kosten den Körper mehr Energie bei der Verdauung (thermischer Effekt: 20–35 %). Ziel: 25–35 g Protein pro Mahlzeit.' },
                  { icon: '🥦', title: 'Gemüse als Basis', text: 'Füllen Sie mindestens die Hälfte Ihres Tellers mit Gemüse. Gemüse hat eine niedrige Kaloriendichte — viel Volumen, wenig Kalorien — und hält durch den hohen Ballaststoffgehalt lange satt.' },
                  { icon: '🍽️', title: 'Kleine Teller verwenden', text: 'Psychologische Studien belegen: Wer auf kleineren Tellern isst, nimmt automatisch 20–30 % weniger Kalorien zu sich, ohne sich bewusst einzuschränken.' },
                  { icon: '🐌', title: 'Langsam essen', text: 'Das Sättigungsgefühl setzt erst 15–20 Minuten nach dem Essen ein. Wer langsam und bewusst isst, gibt dem Körper Zeit, das Signal zu senden — und isst dadurch deutlich weniger.' },
                  { icon: '📝', title: 'Kalorienzählen mit App', text: 'Wer seinen Kalorienverbrauch trackt, nimmt nachweislich mehr ab. Apps wie MyFitnessPal oder Yazio helfen, die tägliche Kalorienzufuhr im Blick zu behalten.' },
                  { icon: '😴', title: 'Genug schlafen', text: 'Schlafmangel erhöht den Hunger durch steigende Ghrelin-Spiegel und senkt das Sättigungshormon Leptin. Wer 7–9 Stunden schläft, hat nachweislich weniger Heißhunger.' },
                  { icon: '🏃', title: 'Bewegung erhöhen', text: 'Bereits 10.000 Schritte täglich verbrennen zusätzlich 300–500 kcal. Kombinieren Sie Kraft- und Ausdauertraining für optimale Ergebnisse — und erhöhen Sie Ihren PAL-Faktor im Kalorienrechner.' },
                  { icon: '🚫', title: 'Flüssige Kalorien meiden', text: 'Säfte, Limonaden, Alkohol und Milchkaffees enthalten oft 200–500 kcal pro Portion, ohne zu sättigen. Wasser, ungesüßter Tee und schwarzer Kaffee haben quasi keine Kalorien.' },
                  { icon: '⏰', title: 'Intervallfasten (16:8)', text: 'Beim 16:8-Intervallfasten essen Sie alle Mahlzeiten in einem 8-Stunden-Fenster. Viele Menschen essen dabei automatisch weniger Kalorien, ohne aktiv zu zählen.' },
                ].map((t, i) => (
                  <div key={i} className={styles.tipCard}>
                    <span className={styles.tipIcon}>{t.icon}</span>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* More SEO content */}
          <section className={styles.contentSection}>
            <div className={styles.container}>
              <article className={styles.article}>
                <h2>Kalorienrechner für Frauen – Was ist anders?</h2>
                <p>
                  Der <strong>Kalorienbedarf von Frauen</strong> ist aus biologischen Gründen in der Regel niedriger als der von Männern. Dies liegt an einem geringeren Anteil an Muskelmasse (Muskeln verbrauchen mehr Energie als Fettgewebe), einem niedrigeren Körpergewicht und einem etwas langsameren Hormonstoffwechsel. Durchschnittlich benötigen Frauen etwa 1.700–2.200 kcal pro Tag, abhängig von Alter, Größe, Gewicht und Aktivitätslevel.
                </p>
                <p>
                  Besonders wichtig für Frauen: Während der <strong>Schwangerschaft</strong> steigt der Kalorienbedarf im 2. Trimester um ca. 250–300 kcal täglich, im 3. Trimester sogar um 500 kcal. In der <strong>Stillzeit</strong> benötigt der Körper ca. 500 kcal zusätzlich. Unser Kalorienrechner ist für diese Sondersituationen nicht ausgelegt — sprechen Sie hier bitte mit einem Arzt oder einer Hebamme.
                </p>

                <h2>Häufige Fehler beim Kalorien zählen</h2>
                <p>
                  Viele Menschen scheitern beim <strong>Abnehmen mit Kaloriendefizit</strong> nicht, weil die Theorie falsch ist, sondern weil häufige Fehler gemacht werden. Der größte Fehler ist die Unterschätzung der tatsächlich aufgenommenen Kalorien: Studien zeigen, dass Menschen ihren Kalorienverbrauch um 20–50 % unterschätzen. Auch „gesunde" Lebensmittel wie Nüsse, Avocados, Olivenöl oder Dressings enthalten sehr viele Kalorien und werden oft nicht erfasst.
                </p>
                <p>
                  Ein weiterer häufiger Fehler ist die Überschätzung des Kalorienverbrauchs durch Sport. Ein 45-minütiger Jogginglauf verbrennt je nach Tempo und Körpergewicht etwa 400–550 kcal — das entspricht einem normalen Mittagessen. Viele Menschen essen nach dem Sport deutlich mehr, als sie tatsächlich verbrannt haben. Unser <strong>Kalorienrechner</strong> hilft Ihnen, einen realistischen Überblick zu behalten.
                </p>

                <h2>Kalorienrechner für Kinder und Jugendliche</h2>
                <p>
                  Kinder und Jugendliche haben einen anderen <strong>Kalorienbedarf</strong> als Erwachsene, da sie sich noch im Wachstum befinden. Unser Kalorienrechner ist für Personen ab 15 Jahren geeignet. Für Kinder unter 15 Jahren empfehlen wir die Tabellen der Deutschen Gesellschaft für Ernährung (DGE), die spezifische Empfehlungen für verschiedene Altersgruppen bereitstellt. Grundsätzlich gilt: Ein 10-jähriges Kind benötigt ca. 1.600–2.000 kcal täglich, ein 15-jähriger Jugendlicher bereits 2.200–2.800 kcal (abhängig von Aktivität und Geschlecht).
                </p>
              </article>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className={styles.faqSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Häufige Fragen zum Kalorienrechner & Kalorienbedarf</h2>
              <div className={styles.faqList}>
                {[
                  { q: 'Wie viele Kalorien brauche ich pro Tag?', a: 'Der tägliche Kalorienbedarf hängt von Geschlecht, Alter, Größe, Gewicht und Aktivitätslevel ab. Durchschnittlich benötigen Frauen 1.800–2.200 kcal/Tag, Männer 2.200–2.800 kcal/Tag. Unser Kalorienrechner berechnet Ihren individuellen Bedarf in Sekunden — einfach die Daten eingeben und berechnen.' },
                  { q: 'Was ist der Unterschied zwischen kcal und Kalorien?', a: 'Technisch gesehen ist 1 kcal (Kilokalorie) = 1.000 cal (Kalorien). Im Alltag und auf Lebensmittelverpackungen wird "Kalorien" oft synonym mit "Kilokalorien" verwendet. Wenn Ernährungsexperten oder Kalorienrechner von "Kalorien" sprechen, meinen sie stets Kilokalorien (kcal).' },
                  { q: 'Wie viele Kalorien pro Tag um abzunehmen?', a: 'Um abzunehmen, benötigen Sie ein Kaloriendefizit. Empfehlenswert sind 300–600 kcal Defizit täglich — das entspricht 0,3–0,6 kg Gewichtsverlust pro Woche. Unser Kalorienrechner berechnet beim Ziel "Abnehmen" automatisch ein moderates Defizit von 500 kcal unter Ihrem Gesamtumsatz. Gehen Sie nie dauerhaft unter 1.200 kcal (Frauen) bzw. 1.500 kcal (Männer).' },
                  { q: 'Was ist die genaueste Formel für den Grundumsatz?', a: 'Die Mifflin-St. Jeor-Formel (1990) gilt als die genaueste Methode und wird deshalb in unserem Kalorienrechner verwendet. Sie ist präziser als die ältere Harris-Benedict-Formel (1919). Für Frauen: (10 × kg) + (6,25 × cm) − (5 × Alter) − 161. Für Männer: (10 × kg) + (6,25 × cm) − (5 × Alter) + 5.' },
                  { q: 'Wie oft sollte ich meinen Kalorienbedarf neu berechnen?', a: 'Berechnen Sie Ihren Kalorienbedarf neu, wenn sich Ihr Gewicht um mehr als 3–5 kg verändert hat, wenn Sie Ihr Aktivitätslevel deutlich gesteigert oder gesenkt haben, oder alle 3 Monate als regelmäßige Überprüfung. Da sich Grundumsatz und PAL-Faktor mit Gewicht und Lebensstil ändern, empfehlen wir eine regelmäßige Neuberechnung über unseren Kalorienrechner.' },
                  { q: 'Ist Kalorienzählen wirklich notwendig um abzunehmen?', a: 'Kalorienzählen ist nicht zwingend notwendig, aber es ist das effektivste Werkzeug für informierte Ernährungsentscheidungen. Wer seinen Kalorienbedarf kennt und seinen Verbrauch trackt, nimmt nachweislich erfolgreicher ab als ohne Tracking. Alternativen sind Portionskontrolle, das Teller-Modell oder Intervallfasten — diese funktionieren ebenfalls, sind aber oft weniger präzise.' },
                ].map((item, i) => (
                  <details key={i} className={styles.faqItem}>
                    <summary className={styles.faqQ}>{item.q}</summary>
                    <p className={styles.faqA}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

        </main>

        <Footer includeSchema={true} />
      </div>
    </>
  );
}
