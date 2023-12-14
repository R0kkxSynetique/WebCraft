/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false
}

module.exports = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/saves',
            permanent: true,
          },
        ]
      },
}
