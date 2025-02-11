import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      loaders: {
        '*.css': ['postcss-loader'],
        '*.scss': ['sass-loader'],
      },
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  eslint: {
    dirs: ['src'], // Проверьте только каталог src
  },
};

export default nextConfig;
