/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/exmpl',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
