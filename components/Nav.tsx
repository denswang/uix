/**
 * UIX — Nav Component
 * Phase 4 · Bauhaus Fusion · v1.0
 *
 * Minimal navigation: UIX wordmark (left) + BlueprintToggle (right).
 * No hamburger menus. No mega nav. One row. Full width.
 *
 * Usage (app/layout.tsx):
 *   <Nav />
 */

'use client';

import Link from 'next/link';
import BlueprintToggle from './BlueprintToggle';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <header className={styles.nav} role="banner">
      {/* ── Blueprint annotation ───────────────────────────────────────── */}
      <span className={styles.bpLabel} aria-hidden="true">{'// nav · 64px'}</span>

      <div className={styles.inner}>
        {/* ── Wordmark ───────────────────────────────────────────────────── */}
        <Link href="/" className={styles.wordmark} aria-label="UIX — home">
          <span className={styles.wordmarkText}>UIX</span>
          <span className={styles.wordmarkDot} aria-hidden="true" />
        </Link>

        {/* ── Right controls ─────────────────────────────────────────────── */}
        <div className={styles.controls}>
          {/* Blueprint Mode annotation */}
          <span className={styles.bpControlNote} aria-hidden="true">
            {'// blueprint-toggle'}
          </span>

          <BlueprintToggle />
        </div>
      </div>
    </header>
  );
}
