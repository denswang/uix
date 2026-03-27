/**
 * UIX — GalleryCard Component
 * Phase 3 · Bauhaus Fusion · v1.0
 *
 * The primary unit of the UIX gallery. Displays a curated design entry
 * with full Blueprint Mode support. In Gallery Mode: polished surface.
 * In Blueprint Mode: structural annotations, grid boundaries, spacing labels.
 *
 * Usage:
 *   <GalleryCard
 *     title="Onboarding Flow — SaaS"
 *     description="Grid-led entry architecture..."
 *     tags={['SaaS', 'Onboarding', 'MinimalUI']}
 *     affiliateUrl="https://framer.com/templates/example?via=uix"
 *     affiliatePrice="$59"
 *     thumbnailUrl="/gallery/saas-onboarding.jpg"
 *     blueprintNote="12-column grid with 48px vertical rhythm"
 *     source="Framer"
 *     isPlayable={true}
 *   />
 */

'use client';

import { useState } from 'react';
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
  /** Editorial description — 2–3 sentences in UIX voice */
  description: string;
  /** Tag array — 3–5 items, e.g. ['SaaS', 'Onboarding'] */
  tags: string[];
  /** Direct affiliate or tracked URL */
  affiliateUrl: string;
  /** Display price, e.g. "$59" or "Free" */
  affiliatePrice?: string;
  /** Thumbnail image URL (DO Spaces CDN) */
  thumbnailUrl: string;
  /** Blueprint Mode annotation — 1 sentence about structural logic */
  blueprintNote: string;
  /** Origin source of the design */
  source: GallerySource;
  /** Whether this entry has a Playable UI flow */
  isPlayable?: boolean;
  /** Optional: slug for internal detail page */
  slug?: string;
  /** Optional: custom onClick handler */
  onClick?: () => void;
}

/* ── Source Badge Colors ────────────────────────────────────────────────── */
const SOURCE_COLORS: Record<GallerySource, string> = {
  Framer:      '#1A56DB',
  Webflow:     '#146EF5',
  Awwwards:    '#B45309',
  Siteinspire: '#0F766E',
  Godly:       '#6B21A8',
  UIX:         '#FFFFFF',
};

/* ── Component ─────────────────────────────────────────────────────────────── */
export default function GalleryCard({
  id,
  title,
  description,
  tags,
  affiliateUrl,
  affiliatePrice,
  thumbnailUrl,
  blueprintNote,
  source,
  isPlayable = false,
  slug,
  onClick,
}: GalleryCardProps) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={styles.card}
      data-entry-id={id}
      data-hovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      aria-label={`Gallery entry: ${title}`}
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
          unoptimized={thumbnailUrl.includes('placehold.co')}
        />

        {/* ── Playable Badge ──────────────────────────────────────────────── */}
        {isPlayable && (
          <span className={styles.playableBadge} aria-label="Interactive flow available">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <polygon points="2,1 9,5 2,9" fill="currentColor" />
            </svg>
            <span>Playable</span>
          </span>
        )}

        {/* ── Blueprint Mode: Spacing Annotation ──────────────────────────── */}
        <span className={styles.bpSpacingAnnotation} aria-hidden="true">
          320px
        </span>

        {/* ── Blueprint Mode: Thumbnail Placeholder ───────────────────────── */}
        <div className={styles.bpThumbnailPlaceholder} aria-hidden="true">
          <span className={styles.bpMono}>{'// image'}</span>
          <span className={styles.bpMono}>320 × 200px</span>
        </div>
      </div>

      {/* ── Blueprint Mode: Horizontal Spacing Rule ───────────────────────── */}
      <div className={styles.bpRuleH} aria-hidden="true">
        <span className={styles.bpMono}>24px</span>
      </div>

      {/* ── Card Body ─────────────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ── Header Row: Source Badge + Title ──────────────────────────────── */}
        <div className={styles.headerRow}>
          <span
            className={styles.sourceBadge}
            style={{ '--badge-color': SOURCE_COLORS[source] } as React.CSSProperties}
          >
            {source}
          </span>
          {/* Blueprint Mode: vertical spacing annotation */}
          <span className={styles.bpVertical} aria-hidden="true">16px</span>
        </div>

        <h3 className={styles.title}>
          {title}
          {/* Blueprint Mode: type annotation */}
          <span className={styles.bpTypeAnnotation} aria-hidden="true">
            22px / 600 / 1.3
          </span>
        </h3>

        <p className={styles.description}>{description}</p>

        {/* ── Blueprint Mode: Blueprint Note ──────────────────────────────── */}
        <div className={styles.bpNote} aria-hidden="true">
          <span className={styles.bpMono}>{'// blueprint'}</span>
          <span className={styles.bpNoteText}>{blueprintNote}</span>
        </div>

        {/* ── Tags ──────────────────────────────────────────────────────────── */}
        <ul className={styles.tags} aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              #{tag}
            </li>
          ))}
        </ul>

        {/* ── Footer: CTA ───────────────────────────────────────────────────── */}
        <div className={styles.footer}>
          <a
            href={affiliateUrl}
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={`Get ${title} template${affiliatePrice ? ` for ${affiliatePrice}` : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span>Get Template</span>
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
            {affiliatePrice && (
              <span className={styles.ctaPrice}>{affiliatePrice}</span>
            )}
          </a>

          {/* Blueprint Mode: CTA annotation */}
          <span className={styles.bpCtaAnnotation} aria-hidden="true">
            --color-accent · 44px height
          </span>

          {slug && (
            <Link href={`/gallery/${slug}`} className={styles.detailLink}>
              <span className={styles.bpMono}>View</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
