// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
};

module.exports = nextConfig;
