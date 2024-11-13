const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['rickandmortyapi.com'],
    unoptimized: true 
  },
};

module.exports = withNextIntl(nextConfig);
