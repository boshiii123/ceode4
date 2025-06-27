/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
  },
  compress: true, // 启用压缩
  poweredByHeader: false, // 移除X-Powered-By头
  generateEtags: false, // 禁用ETag生成
  reactStrictMode: true, // 启用严格模式

  // Vercel优化配置
  experimental: {
    optimizePackageImports: ['lucide-react'],
    webpackBuildWorker: true, // 使用worker进程加速构建
  },

  // 性能优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'] // 生产环境移除console，但保留error和warn
    } : false,
  },

  // 输出配置
  output: 'standalone', // 优化Vercel部署

  // 头部配置
  async headers() {
    return [
      {
        source: '/lib/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // 静态资源缓存优化
      {
        source: '/favicon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable',
          },
        ],
      },
      {
        source: '/logo.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable',
          },
        ],
      },
    ]
  },

  // swcMinify is enabled by default in Next.js 15
}

module.exports = nextConfig 