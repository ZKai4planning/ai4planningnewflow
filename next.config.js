// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   // API routes will proxy to backend
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/:path*`,
//       },
//     ]
//   },

//   // Image domains for when you add property images etc.
//   images: {
//     domains: ['localhost'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**.ai4planning.com',
//       },
//     ],
//   },
// }

// module.exports = nextConfig


const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/:path*`,
      },
    ]
  },

  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ai4planning.com',
      },
    ],
  },
}

module.exports = nextConfig