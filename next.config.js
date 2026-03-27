'use strict';

// Skip typechecking and ESLint during `next build` (512MB VPS OOM).
// Use `npm run verify` on a dev machine before push. Build uses `next build --no-lint`.
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'uix.sgp1.cdn.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
