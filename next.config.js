/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/mdpgz',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
