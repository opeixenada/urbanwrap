import type { NextConfig } from 'next';

const isGithubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES || false;

let assetPrefix = '';
let basePath = '';

if (isGithubPages) {
  assetPrefix = `/urbanwrap/`;
  basePath = `/urbanwrap`;
}

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
