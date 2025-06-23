'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Image, Download, Settings } from 'lucide-react'

// Logo组件
const CompressLabLogo = () => (
  <div className="flex items-center space-x-3">
    {/* Logo图标 */}
    <div className="relative">
      <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-sm">
        {/* 六边形背景 */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <polygon
          points="16,2 28,8 28,24 16,30 4,24 4,8"
          fill="url(#logoGradient)"
          className="drop-shadow-sm"
        />
        {/* 压缩箭头 */}
        <g fill="white">
          <polygon points="16,10 12,14 14,14 14,18 18,18 18,14 20,14" />
          <rect x="11" y="20" width="10" height="2" rx="1" />
          <rect x="12" y="22" width="8" height="1.5" rx="0.75" />
        </g>
      </svg>
    </div>

    {/* 品牌名称 */}
    <div className="flex flex-col leading-none">
      <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        CompressLab
      </span>
      <span className="text-xs text-gray-500 font-medium">
        Image Optimizer
      </span>
    </div>
  </div>
)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: Image },
    { name: 'About WebP', href: '/about-webp' },
    { name: 'Tutorial', href: '/tutorial' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo 标志 */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity duration-200">
            <CompressLabLogo />
          </Link>

          {/* Desktop Navigation 桌面导航 */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button 移动端菜单按钮 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation 移动端导航 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 