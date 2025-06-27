import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { CheckCircle, Zap, Globe, Shield, FileImage, Layers, Sparkles, Target, Cpu, BarChart3 } from 'lucide-react'

export const metadata = {
  title: 'Complete Image Format Guide - 7 Formats Supported | CompressLab V2 Engine',
  description: 'Complete guide to 7 image formats: WebP, AVIF, JPEG, PNG, BMP, GIF, TIFF. Learn compression techniques, format conversion, and optimization with CompressLab V2 engine.',
  keywords: ['image formats guide', 'webp avif compression', 'format conversion', 'CompressLab formats', '7 image formats', 'professional image optimization', 'V2 engine'],
}

export default function AboutImageFormats() {
  return (
    <main>
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-xl shadow-blue-500/25">
            <FileImage className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Complete 7-Format Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Master all 7 image formats supported by our V2 engine. From modern WebP and AVIF to professional
            TIFF and BMP formats. Learn compression techniques, conversion strategies, and optimal use cases.
          </p>
        </div>

        {/* V2 Engine Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 mb-16 text-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">🚀 Powered by V2 Engine</h2>
            <p className="text-blue-100">Intelligent processing for all 7 formats with advanced algorithms</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <Cpu className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <p className="text-sm">Smart Analysis</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <Target className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <p className="text-sm">Precise Control</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <Layers className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <p className="text-sm">7 Formats</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <p className="text-sm">Live Analytics</p>
            </div>
          </div>
        </div>

        {/* Format Cards - Updated with all 7 formats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* WebP */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">WebP</h3>
                <p className="text-sm text-green-600 font-medium">Modern Web Standard</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Google's modern format with superior compression. 25-35% smaller than JPEG, supports transparency
              and animation. Perfect for modern web applications.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>35% smaller than JPEG</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Transparency & animation support</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Wide browser support (95%+)</span>
              </div>
            </div>
          </div>

          {/* AVIF */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">AVIF</h3>
                <p className="text-sm text-purple-600 font-medium">Next-Gen Maximum Compression</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Cutting-edge format based on AV1 codec. Up to 50% smaller than JPEG with superior quality.
              Best compression available today.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>50% smaller than JPEG</span>
              </div>
              <div className="flex items-center text-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>HDR & wide color gamut</span>
              </div>
              <div className="flex items-center text-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Growing browser adoption</span>
              </div>
            </div>
          </div>

          {/* JPEG */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">JPEG</h3>
                <p className="text-sm text-orange-600 font-medium">Universal Photo Standard</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              The classic universal format. Perfect for photographs with excellent compatibility across
              all devices and platforms.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-orange-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>100% universal compatibility</span>
              </div>
              <div className="flex items-center text-orange-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Excellent for photographs</span>
              </div>
              <div className="flex items-center text-orange-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Small file sizes</span>
              </div>
            </div>
          </div>

          {/* PNG */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">PNG</h3>
                <p className="text-sm text-blue-600 font-medium">Lossless Transparency</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Lossless format perfect for graphics, logos, and images requiring transparency.
              Maintains perfect quality at larger file sizes.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Perfect transparency support</span>
              </div>
              <div className="flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Lossless quality</span>
              </div>
              <div className="flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Ideal for logos & graphics</span>
              </div>
            </div>
          </div>

          {/* BMP - New Addition */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-500 rounded-2xl flex items-center justify-center mr-4">
                <FileImage className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">BMP</h3>
                <p className="text-sm text-gray-600 font-medium">Raw Bitmap Format</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Uncompressed bitmap format for maximum quality. Used in professional applications
              requiring pixel-perfect accuracy.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Uncompressed quality</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Professional applications</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Windows native support</span>
              </div>
            </div>
          </div>

          {/* GIF - New Addition */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mr-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">GIF</h3>
                <p className="text-sm text-pink-600 font-medium">Animation & Graphics</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Classic animation format with transparency support. Perfect for simple animations,
              graphics, and memes with universal compatibility.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-pink-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Animation support</span>
              </div>
              <div className="flex items-center text-pink-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>256 color palette</span>
              </div>
              <div className="flex items-center text-pink-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Universal animation format</span>
              </div>
            </div>
          </div>

          {/* TIFF - New Addition */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">TIFF</h3>
                <p className="text-sm text-indigo-600 font-medium">Professional Print Quality</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              High-quality format for professional photography and print design. Supports lossless
              compression and multiple pages.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-indigo-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Professional print quality</span>
              </div>
              <div className="flex items-center text-indigo-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Lossless compression</span>
              </div>
              <div className="flex items-center text-indigo-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Multi-page support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Updated Comparison Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-3">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Complete 7-Format Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-3 font-bold text-green-700 text-sm">WebP</th>
                  <th className="text-center py-4 px-3 font-bold text-purple-700 text-sm">AVIF</th>
                  <th className="text-center py-4 px-3 font-bold text-orange-700 text-sm">JPEG</th>
                  <th className="text-center py-4 px-3 font-bold text-blue-700 text-sm">PNG</th>
                  <th className="text-center py-4 px-3 font-bold text-gray-700 text-sm">BMP</th>
                  <th className="text-center py-4 px-3 font-bold text-pink-700 text-sm">GIF</th>
                  <th className="text-center py-4 px-3 font-bold text-indigo-700 text-sm">TIFF</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700">Compression</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Excellent</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Best</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Good</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Lossless</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">None</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">Limited</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">Lossless</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700">Transparency</td>
                  <td className="py-3 px-3 text-center text-green-600">✓</td>
                  <td className="py-3 px-3 text-center text-purple-600">✓</td>
                  <td className="py-3 px-3 text-center text-red-500">✗</td>
                  <td className="py-3 px-3 text-center text-blue-600">✓</td>
                  <td className="py-3 px-3 text-center text-red-500">✗</td>
                  <td className="py-3 px-3 text-center text-pink-600">✓</td>
                  <td className="py-3 px-3 text-center text-indigo-600">✓</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700">Animation</td>
                  <td className="py-3 px-3 text-center text-green-600">✓</td>
                  <td className="py-3 px-3 text-center text-purple-600">✓</td>
                  <td className="py-3 px-3 text-center text-red-500">✗</td>
                  <td className="py-3 px-3 text-center text-red-500">✗</td>
                  <td className="py-3 px-3 text-center text-red-500">✗</td>
                  <td className="py-3 px-3 text-center text-pink-600">✓</td>
                  <td className="py-3 px-3 text-center text-red-500">✗</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700">Browser Support</td>
                  <td className="py-3 px-3 text-center text-green-600">95%+</td>
                  <td className="py-3 px-3 text-center text-yellow-600">Growing</td>
                  <td className="py-3 px-3 text-center text-green-600">100%</td>
                  <td className="py-3 px-3 text-center text-green-600">100%</td>
                  <td className="py-3 px-3 text-center text-yellow-600">Limited</td>
                  <td className="py-3 px-3 text-center text-green-600">100%</td>
                  <td className="py-3 px-3 text-center text-yellow-600">Limited</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-700">Best Use Case</td>
                  <td className="py-3 px-3 text-center text-xs">Web Images</td>
                  <td className="py-3 px-3 text-center text-xs">Max Compression</td>
                  <td className="py-3 px-3 text-center text-xs">Photos</td>
                  <td className="py-3 px-3 text-center text-xs">Graphics</td>
                  <td className="py-3 px-3 text-center text-xs">Raw Quality</td>
                  <td className="py-3 px-3 text-center text-xs">Animations</td>
                  <td className="py-3 px-3 text-center text-xs">Print Design</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage Recommendations */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Format Selection Guide</h2>
            <p className="text-lg text-gray-600">Choose the optimal format for your specific needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="w-6 h-6 mr-3 text-green-600" />
                Web & Digital Use
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-bold text-green-800 mb-2">🥇 WebP - Best Choice</h4>
                  <p className="text-sm text-green-700">35% smaller files, perfect browser support, ideal for all web images</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-bold text-purple-800 mb-2">🚀 AVIF - Maximum Compression</h4>
                  <p className="text-sm text-purple-700">50% size reduction, use with WebP fallback for cutting-edge sites</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-bold text-pink-800 mb-2">🎭 GIF - Simple Animations</h4>
                  <p className="text-sm text-pink-700">Classic choice for memes, simple animations, and graphics</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Professional & Print
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-bold text-indigo-800 mb-2">🎨 TIFF - Print Design</h4>
                  <p className="text-sm text-indigo-700">Professional photography, print design, lossless quality</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-bold text-blue-800 mb-2">🎯 PNG - Graphics & Logos</h4>
                  <p className="text-sm text-blue-700">Perfect transparency, lossless quality, ideal for logos</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2">⚡ BMP - Raw Processing</h4>
                  <p className="text-sm text-gray-700">Uncompressed quality, professional applications, pixel-perfect</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Master All 7 Formats?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience intelligent compression and conversion across all image formats with our V2 engine.
          </p>
          <Link href="/" className="inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-xl mr-4">
            Start Compressing Now
          </Link>
          <Link href="/tutorial" className="inline-flex items-center bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl hover:bg-blue-400 transition-all duration-200 transform hover:scale-105 shadow-xl">
            View Tutorial Guide
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}


