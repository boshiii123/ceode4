import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { CheckCircle, ArrowRight, FileImage, Download, Settings, Zap, Target, Layers, RefreshCw, Upload, Sparkles, Shield, Clock, Cpu, BarChart3, Gauge } from 'lucide-react'

export const metadata = {
  title: 'Advanced Image Compressor Tutorial - Complete Guide with V2 Engine | CompressLab',
  description: 'Master CompressLab&apos;s advanced V2 engine with intelligent compression, 7-format support, precise size control, and batch processing. Complete tutorial guide.',
  keywords: ['image compressor tutorial', 'V2 engine guide', 'intelligent compression', 'batch image processing', 'format conversion guide', 'CompressLab tutorial', 'webp avif compression'],
}

export default function Tutorial() {
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
            Advanced V2 Engine Tutorial
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Master our revolutionary V2 compression engine featuring intelligent analysis, precise size control,
            and support for 7 image formats. Learn advanced batch processing and format conversion techniques.
          </p>
        </div>

        {/* V2 Engine Features Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 mb-16 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">🚀 V2 Engine Power Features</h2>
            <p className="text-blue-100 text-lg">Advanced algorithms for professional image optimization</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Cpu className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-bold mb-2">Intelligent Analysis</h3>
              <p className="text-sm text-blue-100">Auto-detects optimal compression strategy</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-bold mb-2">Precise Control</h3>
              <p className="text-sm text-blue-100">Compress to exact KB sizes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Layers className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-bold mb-2">7 Formats</h3>
              <p className="text-sm text-blue-100">JPEG, PNG, WebP, AVIF, BMP, GIF, TIFF</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <h3 className="font-bold mb-2">Live Analytics</h3>
              <p className="text-sm text-blue-100">Real-time compression statistics</p>
            </div>
          </div>
        </div>

        {/* Quick Start Steps */}
        <div className="space-y-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
            <p className="text-lg text-gray-600">Master the V2 engine in 3 simple steps</p>
          </div>

          {/* Step 1 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Upload className="w-6 h-6 mr-3 text-blue-600" />
                  Smart Upload & Analysis
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Upload up to 20 images and watch our V2 engine automatically analyze each file&apos;s characteristics,
                  format type, and optimal compression strategy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center text-sm text-blue-700 mb-2">
                      <FileImage className="w-4 h-4 mr-2" />
                      <span className="font-semibold">7 Formats Supported</span>
                    </div>
                    <p className="text-sm text-blue-600">JPEG, PNG, WebP, AVIF, BMP, GIF, TIFF</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center text-sm text-green-700 mb-2">
                      <Shield className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Batch Processing</span>
                    </div>
                    <p className="text-sm text-green-600">Up to 20 images simultaneously</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center text-sm text-purple-700 mb-2">
                      <Cpu className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Auto Detection</span>
                    </div>
                    <p className="text-sm text-purple-600">Intelligent format & size analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-green-600" />
                  Choose Your Advanced Tool
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Select between intelligent compression or professional format conversion with our advanced V2 algorithms.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900">Intelligent Compression</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Smart analysis: Large files (&gt;5MB) → Aggressive compression
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Medium files (2-5MB) → Balanced optimization
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Small files (&lt;2MB) → Quality-preserving compression
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Precise KB targeting: 100KB, 200KB, 300KB, or custom
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3">
                        <RefreshCw className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900">Advanced Format Conversion</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Modern: WebP (25-35% smaller), AVIF (50% smaller)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Professional: TIFF, BMP for print/design
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Lossy/Lossless modes with quality control
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Parallel batch conversion for speed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Download className="w-6 h-6 mr-3 text-purple-600" />
                  Real-time Analytics & Download
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Monitor live compression statistics, processing time, and quality metrics.
                  Download individually or batch export with detailed performance reports.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center text-sm text-purple-700 mb-2">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Live Performance Analytics</span>
                    </div>
                    <p className="text-sm text-purple-600">
                      Compression ratios, processing time, iteration counts, file size comparisons
                    </p>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                    <div className="flex items-center text-sm text-indigo-700 mb-2">
                      <Sparkles className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Smart Download Options</span>
                    </div>
                    <p className="text-sm text-indigo-600">
                      Individual downloads, batch ZIP export, format badges, quality previews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced V2 Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">V2 Engine Advanced Features</h2>
            <p className="text-lg text-gray-600">Professional tools powered by intelligent algorithms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Intelligent Compression */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligent Analysis</h3>
              <p className="text-gray-600 mb-4">
                V2 engine automatically analyzes image characteristics and selects optimal processing strategy.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Content-aware compression algorithms</li>
                <li>• Automatic quality vs size optimization</li>
                <li>• Format-specific processing paths</li>
                <li>• Iterative refinement for precision</li>
              </ul>
            </div>

            {/* Precise Control */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Precise Size Control</h3>
              <p className="text-gray-600 mb-4">
                Hit exact file sizes with our advanced iteration algorithms and size prediction.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Target specific KB sizes (100KB, 200KB, 300KB)</li>
                <li>• Custom size targeting with ±5KB accuracy</li>
                <li>• Smart iteration with quality preservation</li>
                <li>• Dimension control with aspect ratio lock</li>
              </ul>
            </div>

            {/* Format Mastery */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">7-Format Mastery</h3>
              <p className="text-gray-600 mb-4">
                Professional support for all major image formats with specialized processing.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Modern: WebP (35% smaller), AVIF (50% smaller)</li>
                <li>• Classic: JPEG, PNG with smart optimization</li>
                <li>• Professional: TIFF, BMP for print quality</li>
                <li>• Animation: GIF with frame optimization</li>
              </ul>
            </div>

            {/* Parallel Processing */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Parallel Processing</h3>
              <p className="text-gray-600 mb-4">
                Process multiple images simultaneously with intelligent task management.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Multi-threaded compression engine</li>
                <li>• Smart batch processing with priorities</li>
                <li>• Web Worker optimization for speed</li>
                <li>• Real-time progress tracking</li>
              </ul>
            </div>

            {/* Performance Analytics */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Live Analytics</h3>
              <p className="text-gray-600 mb-4">
                Monitor detailed performance metrics and compression statistics in real-time.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Compression ratio tracking</li>
                <li>• Processing time measurement</li>
                <li>• Quality score analysis</li>
                <li>• File size reduction reports</li>
              </ul>
            </div>

            {/* Smart Cache */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gauge className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Performance</h3>
              <p className="text-gray-600 mb-4">
                Intelligent caching and optimization for lightning-fast repeated operations.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Smart caching system</li>
                <li>• Performance monitoring</li>
                <li>• Memory optimization</li>
                <li>• Adaptive processing strategies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">💡 Pro Tips for V2 Engine</h2>
            <p className="text-lg text-gray-600">Master techniques for optimal results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-500" />
                Smart Compression Strategy
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Use WebP for web images (35% smaller than JPEG)</li>
                <li>• Choose AVIF for maximum compression (50% reduction)</li>
                <li>• Keep PNG for images needing transparency</li>
                <li>• Use precise KB targeting for consistent file sizes</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-500" />
                Batch Processing Best Practices
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Group similar-sized images for optimal processing</li>
                <li>• Use format conversion for consistent output</li>
                <li>• Monitor analytics to fine-tune settings</li>
                <li>• Download in batches to save time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience V2 Engine Power?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start compressing with intelligent algorithms, precise control, and professional results.
          </p>
          <Link href="/" className="inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-xl">
            Start Using V2 Engine
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
} 