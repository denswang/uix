import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <div
      style={{
        padding: 'var(--space-8) 0',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-mono)',
          color: 'var(--color-text-tertiary)',
          marginBottom: 'var(--space-3)',
        }}
      >
        {'// 404'}
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-h2)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-4)',
        }}
      >
        This entry does not exist.
      </h1>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-6)',
          maxWidth: '28rem',
          marginInline: 'auto',
        }}
      >
        The gallery slug may be wrong, or the entry was removed from the CMS.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-mono-lg)',
          color: 'var(--color-accent)',
          borderBottom: '1px solid var(--color-accent)',
          paddingBottom: 2,
        }}
      >
        ← Back to gallery
      </Link>
    </div>
  );
}
