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
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // swcMinify is enabled by default in Next.js 15
}

module.exports = nextConfig 