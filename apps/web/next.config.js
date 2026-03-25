/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ['@shopee-dashboard/shared'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.shopee.co.id' },
      { protocol: 'https', hostname: '**.shopee.com' },
    ],
  },
}

module.exports = config
