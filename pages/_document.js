import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://x.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />

        {/* Social Profile Verification */}
        <link rel="me" href="https://www.facebook.com/profile.php?id=61588221497294" />
        <link rel="me" href="https://x.com/MohdAasif763323" />
        <link rel="me" href="https://www.linkedin.com/in/mohd-aasif-44121a261" />
        <link rel="me" href="https://www.youtube.com/@violent34343" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}