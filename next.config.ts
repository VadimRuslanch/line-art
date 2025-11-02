import type { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp-admin.lineart-alumo.ru',
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
