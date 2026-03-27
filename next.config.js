/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'uix.sgp1.cdn.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
