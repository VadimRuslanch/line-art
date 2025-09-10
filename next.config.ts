import type { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: RuleSetRule) =>
        rule.test && rule.test instanceof RegExp && rule.test.test('.svg'),
    );
    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp-admin.lineart-alumo.ru',
      },
    ],
  },
  eslint: { dirs: ['src'] },
} satisfies NextConfig;

export default nextConfig;
