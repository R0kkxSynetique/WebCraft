/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
