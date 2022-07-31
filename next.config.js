// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    images: { allowFutureImage: true },
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
};

module.exports = nextConfig;
