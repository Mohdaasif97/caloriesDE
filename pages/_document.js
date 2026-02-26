import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* Charset and Viewport */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Basic SEO */}
        <meta name="description" content="Kostenloser Online-Kalorienrechner für Deutschland. Berechne deinen Grundumsatz, Gesamtumsatz und Makronährstoffe mit der Mifflin-St. Jeor Formel." />
        <meta name="keywords" content="Kalorienrechner, Grundumsatz, Gesamtumsatz, Makronährstoffe, Kalorienbedarf, BMI, Ernährung" />
        
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kalorienrechner.de - Kostenlos & Genau" />
        <meta property="og:description" content="Berechne deinen täglichen Kalorienbedarf, Grundumsatz und Makronährstoffe. Optimiert für Deutschland mit aktuellen Formeln." />
        <meta property="og:url" content="https://kalorienrechner.de" />
        <meta property="og:site_name" content="Kalorienrechner.de" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://kalorienrechner.de/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kalorienrechner.de - Kostenlos & Genau" />
        <meta name="twitter:description" content="Berechne deinen täglichen Kalorienbedarf und Makronährstoffe kostenlos online." />
        <meta name="twitter:image" content="https://kalorienrechner.de/og-image.png" />
        <meta name="twitter:creator" content="@MohdAasif763323" />
        <meta name="twitter:site" content="@MohdAasif763323" />
        
        {/* Social Profile Verification (rel="me") */}
        <link rel="me" href="https://www.facebook.com/profile.php?id=61588221497294" />
        <link rel="me" href="https://x.com/MohdAasif763323" />
        <link rel="me" href="https://www.linkedin.com/in/mohd-aasif-44121a261" />
        <link rel="me" href="https://www.youtube.com/@violent34343" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://kalorienrechner.de" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Preconnect to External Domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://x.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
