/**
 * UIX — BlueprintToggle Component
 * Phase 3 · Bauhaus Fusion · v1.0
 *
 * Global mode toggle. Adds/removes `data-mode="blueprint"` on
 * `document.documentElement` — every child element responds via CSS.
 *
 * In Gallery Mode:  label reads "Blueprint" with grid icon (inactive)
 * In Blueprint Mode: label reads "Gallery"  with eye icon (active, blue)
 *
 * Usage (Nav bar):
 *   <BlueprintToggle />
 *
 * Usage (controlled):
 *   <BlueprintToggle isActive={bp} onToggle={setBp} />
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './BlueprintToggle.module.css';

/* ── Props ──────────────────────────────────────────────────────────────── */
export interface BlueprintToggleProps {
  /** External controlled state (optional) */
  isActive?: boolean;
  /** Callback when toggle changes (optional) */
  onToggle?: (active: boolean) => void;
  /** Compact variant — icon only, no label */
  compact?: boolean;
}

/* ── Root attribute constant ────────────────────────────────────────────── */
const BP_ATTR = 'data-mode';
const BP_VALUE = 'blueprint';

/* ── Component ──────────────────────────────────────────────────────────── */
export default function BlueprintToggle({
  isActive: controlledActive,
  onToggle,
  compact = false,
}: BlueprintToggleProps) {

  const [internalActive, setInternalActive] = useState(false);
  const isControlled = controlledActive !== undefined;
  const isActive = isControlled ? controlledActive : internalActive;

  /* Sync the DOM attribute whenever isActive changes */
  useEffect(() => {
    const root = document.documentElement;
    if (isActive) {
      root.setAttribute(BP_ATTR, BP_VALUE);
    } else {
      root.removeAttribute(BP_ATTR);
    }
    return () => {
      /* Cleanup: remove on unmount */
      root.removeAttribute(BP_ATTR);
    };
  }, [isActive]);

  /* Handle toggle */
  const handleToggle = useCallback(() => {
    const next = !isActive;
    if (!isControlled) {
      setInternalActive(next);
    }
    onToggle?.(next);
  }, [isActive, isControlled, onToggle]);

  /* Keyboard: Space / Enter */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <button
      className={styles.toggle}
      data-active={isActive}
      data-compact={compact}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-pressed={isActive}
      aria-label={isActive ? 'Switch to Gallery Mode' : 'Switch to Blueprint Mode'}
      type="button"
    >
      {/* ── Icon ─────────────────────────────────────────────────────────── */}
      <span className={styles.iconWrap} aria-hidden="true">
        {isActive ? <EyeIcon /> : <GridIcon />}
      </span>

      {/* ── Label ────────────────────────────────────────────────────────── */}
      {!compact && (
        <span className={styles.label}>
          {isActive ? 'Gallery' : 'Blueprint'}
        </span>
      )}

      {/* ── Blueprint Mode: debug annotation ─────────────────────────────── */}
      <span className={styles.bpAnnotation} aria-hidden="true">
        {'// mode-toggle'}
      </span>
    </button>
  );
}

/* ── Grid Icon (Gallery Mode state) ─────────────────────────────────────── */
function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      {/* 2×2 grid squares */}
      <rect x="1" y="1" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="1" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="8" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="8" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* ── Eye Icon (Blueprint Mode state) ────────────────────────────────────── */
function EyeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 7C1 7 3 3 7 3C11 3 13 7 13 7C13 7 11 11 7 11C3 11 1 7 1 7Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
