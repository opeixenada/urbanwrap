import type { NextConfig } from 'next';

const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/urbanwrap' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/urbanwrap/' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
