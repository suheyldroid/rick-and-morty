const withNextIntl = require('next-intl/plugin')("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    domains: ['rickandmortyapi.com'],
    unoptimized: true 
  },
};

module.exports = withNextIntl(nextConfig);
