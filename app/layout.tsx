/**
 * UIX — Root Layout
 * Phase 4 · Bauhaus Fusion · v1.0
 *
 * - Loads Space Grotesk, Inter, JetBrains Mono via next/font
 * - Applies CSS variable bindings for fonts to :root
 * - Dark mode meta
 * - Sticky Nav
 */

import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Nav from '../components/Nav';
import './globals.css';

/* ── Font definitions ────────────────────────────────────────────────────── */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display-loaded',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body-loaded',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-loaded',
  display: 'swap',
});

/* ── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'UIX — Architectural Design Gallery',
    template: '%s · UIX',
  },
  description:
    'A curated gallery of interactive user flows and structural UI design. Toggle Blueprint Mode to see the grids and logic behind the work.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://uix.cx'),
  openGraph: {
    type: 'website',
    siteName: 'UIX',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@uixcx',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
};

/* ── Root Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Sanity CDN */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        {/* Preconnect to DO Spaces CDN */}
        <link rel="preconnect" href="https://uix.sgp1.cdn.digitaloceanspaces.com" />
      </head>
      <body>
        <div className="uix-page">
          <Nav />
          <main className="uix-main" id="main-content">
            {children}
          </main>
          <footer
            style={{
              borderTop: '1px solid var(--color-border)',
              padding: 'var(--space-6) var(--grid-margin)',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-mono)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              UIX · uix.cx · Architectural Design Gallery
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
