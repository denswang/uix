/**
 * UIX — PlayableEmbed Component
 * Phase 3 · Bauhaus Fusion · v1.0
 *
 * Renders an interactive user flow embed within a UIX gallery detail page.
 * Supports two embed types:
 *   - "framer"  → sandboxed Framer prototype iframe
 *   - "figma"   → Figma prototype embed
 *
 * Three modes:
 *   Gallery Mode  → polished framed embed with device chrome
 *   Blueprint Mode → structural wireframe overlay with grid annotations
 *   Fullscreen    → expands to cover viewport, keyboard dismissible (Escape)
 *
 * Usage:
 *   <PlayableEmbed
 *     title="SaaS Onboarding — UIX"
 *     embedUrl="https://framer.com/embed/..."
 *     embedType="framer"
 *     aspectRatio="16/9"
 *     blueprintNote="8-step onboarding with conditional branching — 4-column inner grid"
 *   />
 */

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './PlayableEmbed.module.css';

/* ── Types ──────────────────────────────────────────────────────────────── */
export type EmbedType = 'framer' | 'figma';
export type AspectRatio = '16/9' | '4/3' | '1/1' | '9/16';

export interface PlayableEmbedProps {
  /** Page / flow title — shown in the header bar */
  title: string;
  /** Embed iframe src URL */
  embedUrl: string;
  /** Embed platform */
  embedType: EmbedType;
  /** Aspect ratio of the embed frame */
  aspectRatio?: AspectRatio;
  /** Blueprint Mode annotation for this flow */
  blueprintNote?: string;
  /** If false: shows a poster/CTA instead of loading the iframe immediately */
  autoLoad?: boolean;
  /** Optional thumbnail to show before the user activates the embed */
  posterUrl?: string;
}

/* ── Aspect ratio → CSS value ────────────────────────────────────────────── */
const ASPECT_MAP: Record<AspectRatio, string> = {
  '16/9':  '56.25%',
  '4/3':   '75%',
  '1/1':   '100%',
  '9/16':  '177.78%',
};

/* ── Component ──────────────────────────────────────────────────────────── */
export default function PlayableEmbed({
  title,
  embedUrl,
  embedType,
  aspectRatio = '16/9',
  blueprintNote,
  autoLoad = false,
  posterUrl,
}: PlayableEmbedProps) {

  const [isLoaded, setIsLoaded]       = useState(autoLoad);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef    = useRef<HTMLIFrameElement>(null);

  /* Escape key exits fullscreen */
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFullscreen]);

  /* Lock body scroll in fullscreen */
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  const handleActivate = useCallback(() => setIsLoaded(true), []);
  const handleFullscreen = useCallback(() => setIsFullscreen(v => !v), []);
  const handleIframeLoad = useCallback(() => setIframeReady(true), []);

  const paddingBottom = ASPECT_MAP[aspectRatio];

  return (
    <div
      className={styles.root}
      data-fullscreen={isFullscreen}
      data-loaded={isLoaded}
      ref={containerRef}
      aria-label={`Interactive prototype: ${title}`}
    >
      {/* ── Blueprint Mode: component label ───────────────────────────────── */}
      <span className={styles.bpLabel} aria-hidden="true">{'// playable-embed'}</span>

      {/* ── Header Bar ────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        {/* Device chrome dots */}
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dot} data-color="red" />
          <span className={styles.dot} data-color="yellow" />
          <span className={styles.dot} data-color="green" />
        </div>

        {/* Title + platform badge */}
        <div className={styles.headerCenter}>
          <span className={styles.headerTitle}>{title}</span>
          <span className={styles.platformBadge}>{embedType}</span>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Blueprint Mode annotation */}
          <span className={styles.bpControlNote} aria-hidden="true">44px</span>

          <button
            className={styles.controlBtn}
            onClick={handleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            type="button"
          >
            {isFullscreen ? <CompressIcon /> : <ExpandIcon />}
          </button>
        </div>
      </div>

      {/* ── Embed Area ────────────────────────────────────────────────────── */}
      <div
        className={styles.embedArea}
        style={{ paddingBottom }}
      >
        {/* ── Blueprint Mode: grid overlay ──────────────────────────────── */}
        <div className={styles.bpGridOverlay} aria-hidden="true" />

        {/* ── Blueprint Mode: structural annotations ────────────────────── */}
        {blueprintNote && (
          <div className={styles.bpNoteOverlay} aria-hidden="true">
            <span className={styles.bpMono}>{'// blueprint'}</span>
            <span className={styles.bpNoteText}>{blueprintNote}</span>
          </div>
        )}

        {/* ── Poster / Activate Screen (before load) ────────────────────── */}
        {!isLoaded && (
          <div className={styles.poster}>
            {posterUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posterUrl}
                alt=""
                className={styles.posterImg}
                aria-hidden="true"
              />
            )}
            <button
              className={styles.activateBtn}
              onClick={handleActivate}
              type="button"
              aria-label={`Load interactive prototype: ${title}`}
            >
              <PlayIcon />
              <span>Play Flow</span>
            </button>
            <span className={styles.posterHint}>Interactive prototype — click to load</span>
          </div>
        )}

        {/* ── Iframe ────────────────────────────────────────────────────── */}
        {isLoaded && (
          <>
            {!iframeReady && (
              <div className={styles.loadingState} aria-live="polite">
                <span className={styles.loadingDot} />
                <span className={styles.loadingDot} />
                <span className={styles.loadingDot} />
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className={styles.iframe}
              data-ready={iframeReady}
              title={title}
              allow="fullscreen"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={handleIframeLoad}
            />
          </>
        )}
      </div>

      {/* ── Footer Bar (fullscreen: ESC hint) ────────────────────────────── */}
      {isFullscreen && (
        <div className={styles.escHint} role="status">
          <span className={styles.bpMono}>Press</span>
          <kbd className={styles.kbd}>ESC</kbd>
          <span className={styles.bpMono}>to exit fullscreen</span>
        </div>
      )}
    </div>
  );
}

/* ── SVG Icons ──────────────────────────────────────────────────────────── */
function ExpandIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M7.5 1.5H10.5V4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 10.5H1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 1.5L7 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M1.5 10.5L5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CompressIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M10.5 1.5L7.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7.5 1.5V4.5H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 10.5L4.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4.5 10.5V7.5H1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
      <polygon points="8,6.5 14.5,10 8,13.5" fill="currentColor" />
    </svg>
  );
}
