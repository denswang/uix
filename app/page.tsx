/**
 * UIX — Homepage (Gallery Index)
 * Phase 4 · Bauhaus Fusion · v1.0
 *
 * Fetches all gallery entries (Sanity → mock data fallback)
 * and renders the GalleryGrid.
 */

import type { Metadata } from 'next';
import GalleryGrid from '../components/GalleryGrid';
import { getAllEntries } from '../sanity/queries';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'UIX — Architectural Design Gallery',
  description:
    'Curated gallery of interactive user flows and structural UI design. Toggle Blueprint Mode to see the grids and logic behind the work.',
};

/* Revalidate every 60 seconds (ISR) — adjust for your publish cadence */
export const revalidate = 60;

export default async function HomePage() {
  const entries = await getAllEntries();

  return (
    <>
      {/* ── Hero Header ─────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <span className={styles.bpHeroLabel} aria-hidden="true">
          {'// hero · 160px height'}
        </span>

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Architectural Design Gallery</p>
          <h1 className={styles.heroTitle}>
            Structure is the design.
          </h1>
          <p className={styles.heroSub}>
            {entries.length} interactive flows and UI systems — toggle Blueprint Mode
            to see the grids and logic behind every entry.
          </p>
        </div>

        {/* ── Blueprint Mode: hero grid annotation ─────────────────────── */}
        <div className={styles.bpHeroGrid} aria-hidden="true">
          <span className={styles.bpMono}>12 columns · 80px margin · 24px gutter</span>
        </div>
      </header>

      {/* ── Gallery Grid ─────────────────────────────────────────────────── */}
      <GalleryGrid entries={entries} />
    </>
  );
}
