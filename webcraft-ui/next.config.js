/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/saves',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig
