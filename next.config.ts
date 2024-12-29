import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/download/storage/v1/b/usc-pro-uscweb-live-media/**',
      },
    ],
  },
};

module.exports = nextConfig;
