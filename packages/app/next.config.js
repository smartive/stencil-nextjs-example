/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // disabled to speed up build time for this example project
    ignoreDuringBuilds: true,
  },
  typescript: {
    // disabled to speed up build time for this example project
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = { canvas: false };
    }
    return config;
  },
};

module.exports = nextConfig;
