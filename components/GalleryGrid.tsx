/**
 * UIX — GalleryGrid Component
 * Phase 4 · Bauhaus Fusion · v1.0
 *
 * Responsive 12-column grid that renders GalleryCard instances.
 * Desktop: 3-col · Tablet: 2-col · Mobile: 1-col
 *
 * Usage:
 *   <GalleryGrid entries={entries} />
 */

import GalleryCard from './GalleryCard';
import { GalleryEntry } from '../lib/types';
import styles from './GalleryGrid.module.css';

interface GalleryGridProps {
  entries: GalleryEntry[];
}

export default function GalleryGrid({ entries }: GalleryGridProps) {
  if (entries.length === 0) {
    return <GalleryGridEmpty />;
  }

  return (
    <section className={styles.section} aria-label="Design gallery">
      {/* ── Blueprint annotation ─────────────────────────────────────────── */}
      <span className={styles.bpLabel} aria-hidden="true">
        {`// gallery-grid · ${entries.length} entries`}
      </span>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <div className={styles.grid} role="list">
        {entries.map((entry) => (
          <div key={entry.id} className={styles.cell} role="listitem">
            <GalleryCard
              id={entry.id}
              title={entry.title}
              description={entry.description}
              tags={entry.tags}
              affiliateUrl={entry.affiliateUrl}
              affiliatePrice={entry.affiliatePrice}
              thumbnailUrl={entry.thumbnailUrl}
              blueprintNote={entry.blueprintNote}
              source={entry.source}
              isPlayable={entry.isPlayable}
              slug={entry.slug}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Empty State ─────────────────────────────────────────────────────────── */
function GalleryGridEmpty() {
  return (
    <section className={styles.section}>
      <div className={styles.empty}>
        <span className={styles.emptyMono}>{'// no entries'}</span>
        <p className={styles.emptyText}>
          Gallery entries will appear here once added to Sanity CMS.
        </p>
      </div>
    </section>
  );
}
