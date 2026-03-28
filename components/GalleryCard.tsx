/**
 * UIX — GalleryCard Component
 * Phase 3 · Bauhaus Fusion · v2.0
 *
 * Editorial minimal card: image-first, title + source only.
 * The entire card links to the detail page.
 * No description, tags, or CTA on the grid — those live on the detail page.
 *
 * Gallery Mode:   full-bleed image, clean two-line caption below
 * Blueprint Mode: structural annotations, grid crosshatch overlay
 */

import Link from 'next/link';
import Image from 'next/image';
import styles from './GalleryCard.module.css';

/* ── Types ─────────────────────────────────────────────────────────────────── */
export type GallerySource = 'Framer' | 'Webflow' | 'Awwwards' | 'Siteinspire' | 'Godly' | 'UIX';

export interface GalleryCardProps {
  /** Gallery entry unique ID (Sanity _id) */
  id: string;
  /** Gallery title — max 8 words, architectural voice */
  title: string;
  /** Editorial description — kept for detail page, not shown in grid */
  description?: string;
  /** Tag array — kept for detail page, not shown in grid */
  tags?: string[];
  /** Direct affiliate or tracked URL — kept for detail page */
  affiliateUrl?: string;
  /** Display price — kept for detail page */
  affiliatePrice?: string;
  /** Thumbnail image URL (Sanity CDN) */
  thumbnailUrl: string;
  /** Blueprint Mode annotation — 1 sentence about structural logic */
  blueprintNote?: string;
  /** Origin source of the design */
  source: GallerySource;
  /** Whether this entry has a Playable UI flow */
  isPlayable?: boolean;
  /** Slug for internal detail page */
  slug?: string;
}

/* ── Component ─────────────────────────────────────────────────────────────── */
export default function GalleryCard({
  id,
  title,
  thumbnailUrl,
  blueprintNote,
  source,
  isPlayable = false,
  slug,
}: GalleryCardProps) {

  const href = slug ? `/gallery/${slug}` : '#';

  return (
    <Link
      href={href}
      className={styles.card}
      data-entry-id={id}
      aria-label={`View ${title}`}
    >
      {/* ── Blueprint Mode: Component Boundary Label ──────────────────────── */}
      <span className={styles.blueprintLabel} aria-hidden="true">
        {'// gallery-card'}
      </span>

      {/* ── Thumbnail ─────────────────────────────────────────────────────── */}
      <div className={styles.thumbnailWrap}>
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={styles.thumbnail}
          priority={false}
        />

        {/* ── Playable Badge ──────────────────────────────────────────────── */}
        {isPlayable && (
          <span className={styles.playableBadge} aria-label="Interactive flow available">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <polygon points="2,1 9,5 2,9" fill="currentColor" />
            </svg>
            <span>Playable</span>
          </span>
        )}

        {/* ── Blueprint Mode: Grid Overlay annotation ──────────────────────── */}
        <span className={styles.bpImageAnnotation} aria-hidden="true">
          {'// image · 16:10'}
        </span>
      </div>

      {/* ── Caption ───────────────────────────────────────────────────────── */}
      <div className={styles.caption}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.source}>{source}</span>

        {/* ── Blueprint Mode: Blueprint Note ──────────────────────────────── */}
        {blueprintNote && (
          <span className={styles.bpNote} aria-hidden="true">
            {blueprintNote}
          </span>
        )}
      </div>
    </Link>
  );
}
