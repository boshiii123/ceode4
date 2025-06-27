import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, FileImage, Zap, RefreshCw, Target, Shield, Globe, Cpu, BarChart3 } from 'lucide-react'

// CompressLab Logo组件（Footer版本）
const CompressorFooterLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <Image
        src="/logo.svg"
        alt="CompressLab Free WebP Compressor Online Logo"
        width={32}
        height={32}
        className="drop-shadow-sm"
      />
    </div>
    <div>
      <div className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        CompressLab
      </div>
      <div className="text-xs text-gray-500 font-medium">Free WebP Compressor • Online Tool • 7 Formats</div>
    </div>
  </div>
)

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 border-t border-gray-200/60 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <CompressorFooterLogo />
            </div>
            <p className="text-gray-600 mb-6 max-w-lg leading-relaxed">
              CompressLab is the best free WebP compressor online.
              Compress WebP images, reduce file size with precise control (100KB, 200KB, 300KB),
              and convert between 7 formats: WebP, AVIF, JPEG, PNG, BMP, GIF, TIFF.
              Free WebP compression with 100% client-side processing for privacy.
            </p>

            {/* Key Features - 更新为V2引擎功能 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Cpu className="w-4 h-4 text-blue-600" />
                </div>
                <span>Smart WebP Analysis</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <span>Precise WebP Control</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <RefreshCw className="w-4 h-4 text-purple-600" />
                </div>
                <span>7-Format Conversion</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <BarChart3 className="w-4 h-4 text-orange-600" />
                </div>
                <span>Live WebP Analytics</span>
              </div>
            </div>

          </div>

          {/* Tools & Features - 更新为WebP + V2功能 */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-6 flex items-center">
              <FileImage className="w-4 h-4 mr-2 text-blue-600" />
              Free WebP Tools
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <Cpu className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  Free WebP Compressor Online
                </Link>
              </li>
              <li>
                <Link href="/" className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <RefreshCw className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  WebP to JPG Converter
                </Link>
              </li>
              <li>
                <Link href="/" className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <Target className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  Reduce WebP File Size
                </Link>
              </li>
              <li>
                <Link href="/" className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <BarChart3 className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                  Batch WebP Compressor
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-6 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-green-600" />
              WebP Guide & Support
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about-webp" className="group flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200">
                  <FileImage className="w-4 h-4 mr-3 text-gray-400 group-hover:text-green-500" />
                  About WebP Format
                </Link>
              </li>
              <li>
                <Link href="/tutorial" className="group flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200">
                  <Target className="w-4 h-4 mr-3 text-gray-400 group-hover:text-green-500" />
                  WebP Compressor Tutorial
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200">
                  <ExternalLink className="w-4 h-4 mr-3 text-gray-400 group-hover:text-green-500" />
                  WebP Compressor Support
                </Link>
              </li>
              <li>
                <a
                  href="https://developers.google.com/speed/webp"
                  className="group flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-4 h-4 mr-3 text-gray-400 group-hover:text-green-500" />
                  WebP Documentation
                  <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Supported Formats - 突出WebP */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="text-center mb-8">
            <h4 className="text-sm font-bold text-gray-900 mb-4">Free WebP Compressor - 7 Supported Formats</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'WebP', color: 'bg-green-100 text-green-700 border-green-200 ring-2 ring-green-300', featured: true },
                { name: 'AVIF', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                { name: 'JPEG', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                { name: 'PNG', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                { name: 'GIF', color: 'bg-pink-100 text-pink-700 border-pink-200' },
                { name: 'BMP', color: 'bg-gray-100 text-gray-700 border-gray-200' },
                { name: 'TIFF', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
              ].map((format) => (
                <span
                  key={format.name}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${format.color} ${format.featured ? 'font-bold' : ''}`}
                >
                  {format.featured && '⭐ '}
                  {format.name}
                  {format.featured && ' (Primary)'}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Free online tool optimized for WebP compression and conversion</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-gray-500 text-sm">
                © 2024 CompressLab Free WebP Compressor. All rights reserved.
              </p>
              <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-400">
                <Shield className="w-3 h-3" />
                <span>Free Tool • Client-Side Processing</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200 flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                WebP Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200 flex items-center">
                <FileImage className="w-3 h-3 mr-1" />
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200 flex items-center">
                <ExternalLink className="w-3 h-3 mr-1" />
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 