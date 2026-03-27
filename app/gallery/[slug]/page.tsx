/**
 * UIX — Gallery Detail Page
 * Phase 4 · Bauhaus Fusion · v1.0
 *
 * Route: /gallery/[slug]
 *
 * Layout:
 *   - Detail header (title, source, tags, blueprint note)
 *   - PlayableEmbed (if isPlayable) OR full-width thumbnail
 *   - Description + affiliate CTA section
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PlayableEmbed from '../../../components/PlayableEmbed';
import { getEntryBySlug, getAllSlugs } from '../../../sanity/queries';
import { GalleryPageProps } from '../../../lib/types';
import styles from './detail.module.css';

/* ── Static params (for ISR / static export) ─────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ── Dynamic metadata ────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: GalleryPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);
  if (!entry) return { title: 'Not Found · UIX' };

  return {
    title: entry.title,
    description: entry.description,
    openGraph: {
      title: entry.title,
      description: entry.description,
      images: entry.ogImageUrl
        ? [{ url: entry.ogImageUrl, width: 1200, height: 630 }]
        : entry.thumbnailUrl
        ? [{ url: entry.thumbnailUrl, width: 640, height: 400 }]
        : [],
    },
  };
}

/* ── Source color map ────────────────────────────────────────────────────── */
const SOURCE_COLORS: Record<string, string> = {
  Framer:      '#0080FB',
  Webflow:     '#146EF5',
  Awwwards:    '#F5A623',
  Siteinspire: '#FFFFFF',
  Godly:       '#FF4D4D',
  UIX:         '#3D7EF5',
};

/* ── Page Component ──────────────────────────────────────────────────────── */
export default async function GalleryDetailPage({ params }: GalleryPageProps) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);

  if (!entry) notFound();

  const badgeColor = SOURCE_COLORS[entry.source] ?? '#FFFFFF';

  return (
    <article className={styles.page}>

      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <span className={styles.bpBreadcrumbLabel} aria-hidden="true">{'// breadcrumb'}</span>
        <Link href="/" className={styles.breadcrumbLink}>Gallery</Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
        <span className={styles.breadcrumbCurrent}>{entry.title}</span>
      </nav>

      {/* ── Detail Header ─────────────────────────────────────────────── */}
      <header className={styles.header}>
        <span className={styles.bpHeaderLabel} aria-hidden="true">{'// detail-header'}</span>

        {/* Source badge + tags row */}
        <div className={styles.metaRow}>
          <span
            className={styles.sourceBadge}
            style={{ '--badge-color': badgeColor } as React.CSSProperties}
          >
            {entry.source}
          </span>
          {entry.isPlayable && (
            <span className={styles.playableBadge}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <polygon points="2,1 9,5 2,9" fill="currentColor" />
              </svg>
              Playable
            </span>
          )}
          <ul className={styles.tagsList} aria-label="Tags">
            {entry.tags.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        </div>

        {/* Title */}
        <h1 className={styles.title}>
          <span className={styles.bpTypeAnnotation} aria-hidden="true">
            {'// display · 48px / 700 / -0.03em'}
          </span>
          {entry.title}
        </h1>

        {/* Blueprint note */}
        <div className={styles.bpNote} aria-hidden="true">
          <span className={styles.bpMono}>{'// blueprint'}</span>
          <span className={styles.bpNoteText}>{entry.blueprintNote}</span>
        </div>
      </header>

      {/* ── Media: PlayableEmbed or Thumbnail ─────────────────────────── */}
      <section className={styles.mediaSection}>
        <span className={styles.bpMediaLabel} aria-hidden="true">
          {entry.isPlayable ? '// playable-embed' : '// thumbnail · 16/10'}
        </span>

        {entry.isPlayable && entry.embedUrl ? (
          <PlayableEmbed
            title={entry.title}
            embedUrl={entry.embedUrl}
            embedType={entry.embedType ?? 'framer'}
            aspectRatio="16/9"
            blueprintNote={entry.blueprintNote}
            autoLoad={false}
          />
        ) : (
          <div className={styles.thumbnailWrap}>
            <Image
              src={entry.thumbnailUrl}
              alt={entry.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              className={styles.thumbnail}
              priority
              unoptimized={entry.thumbnailUrl.includes('placehold.co')}
            />
          </div>
        )}
      </section>

      {/* ── Description + CTA ─────────────────────────────────────────── */}
      <section className={styles.bodySection}>
        <div className={styles.descriptionCol}>
          <span className={styles.bpBodyLabel} aria-hidden="true">{'// editorial-description'}</span>
          <p className={styles.description}>{entry.description}</p>
        </div>

        <aside className={styles.ctaCol}>
          <span className={styles.bpCtaLabel} aria-hidden="true">{'// affiliate-cta'}</span>

          <div className={styles.ctaCard}>
            {entry.affiliatePrice && (
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Starting at</span>
                <span className={styles.price}>{entry.affiliatePrice}</span>
              </div>
            )}

            <a
              href={entry.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              View on {entry.source}
              <span className={styles.ctaArrow} aria-hidden="true">↗</span>
            </a>

            <Link href="/" className={styles.backLink}>
              ← Back to Gallery
            </Link>
          </div>
        </aside>
      </section>

    </article>
  );
}
