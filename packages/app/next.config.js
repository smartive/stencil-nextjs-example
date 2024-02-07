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
  webpack: (config) => {
    // Fixes dependency issues with `canvas` and `perf_hooks` of linkedom
    config.resolve.fallback = { canvas: false, perf_hooks: false };

    return config;
  },
};

module.exports = nextConfig;
