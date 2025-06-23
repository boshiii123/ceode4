import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { CheckCircle, ArrowRight, FileImage, Download, Settings, Zap, Target, Layers, RefreshCw, Upload, Sparkles, Shield } from 'lucide-react'

export const metadata = {
  title: 'WebP Compressor Tutorial - Complete Guide to WebP Compression | CompressLab',
  description: 'Complete WebP compressor tutorial by CompressLab. Master WebP image compression, format conversion, and batch processing with step-by-step instructions.',
  keywords: ['webp compressor tutorial', 'webp compression guide', 'how to compress webp', 'webp converter guide', 'CompressLab tutorial', 'webp optimization', 'webp image compression'],
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
            Complete Tutorial Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Master our professional image compression tool with this comprehensive guide.
            Learn smart compression, format conversion, and batch processing techniques.
          </p>
        </div>

        {/* Quick Start Steps */}
        <div className="space-y-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
            <p className="text-lg text-gray-600">Get started in 3 simple steps</p>
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
                  Upload Your Images
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Drag and drop up to 20 images or click to browse. Our tool supports all major formats
                  including JPG, PNG, GIF, WebP, AVIF, BMP, and TIFF.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center text-sm text-blue-700 mb-2">
                      <FileImage className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Supported Formats</span>
                    </div>
                    <p className="text-sm text-blue-600">JPG, PNG, GIF, WebP, AVIF, BMP, TIFF</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center text-sm text-green-700 mb-2">
                      <Shield className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Batch Upload</span>
                    </div>
                    <p className="text-sm text-green-600">Up to 20 images at once</p>
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
                  Choose Your Tool
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Select between our smart compression and format conversion tools based on your needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900">Smart Compression</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Quick compress to 100KB, 200KB, 300KB
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Intelligent size-based optimization
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                        Dimension control settings
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3">
                        <RefreshCw className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900">Format Conversion</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Convert to WebP, AVIF, JPEG, PNG
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Lossy and lossless modes
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Batch format conversion
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
                  Download & Review
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Review your optimized images and download individually or in batch.
                  See real-time compression statistics and file size comparisons.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center text-sm text-purple-700 mb-2">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Live Preview & Stats</span>
                  </div>
                  <p className="text-sm text-purple-600">
                    View compression ratios, file size reductions, and format badges in real-time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Features</h2>
            <p className="text-lg text-gray-600">Explore powerful tools for professional image optimization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smart Compression */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Compression</h3>
              <p className="text-gray-600 mb-4">
                Automatically selects optimal compression strategy based on image size and content.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Large files (&gt;5MB): Aggressive compression</li>
                <li>• Medium files (2-5MB): Balanced compression</li>
                <li>• Small files (&lt;2MB): Light compression</li>
              </ul>
            </div>

            {/* Precise Control */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Precise Size Control</h3>
              <p className="text-gray-600 mb-4">
                Compress images to exact file sizes with our advanced algorithms.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• One-click 100KB, 200KB, 300KB</li>
                <li>• Binary search optimization</li>
                <li>• Guaranteed size compliance</li>
              </ul>
            </div>

            {/* Format Conversion */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Format Conversion</h3>
              <p className="text-gray-600 mb-4">
                Convert between modern and legacy formats with quality preservation.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• WebP, AVIF, JPEG, PNG support</li>
                <li>• Lossy and lossless modes</li>
                <li>• Individual or batch conversion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Practices & Guidelines</h2>
            <p className="text-lg text-gray-600">Professional tips for optimal image optimization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Compression Guidelines
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Hero Images</h4>
                  <p className="text-sm text-blue-600">Target: 100-200KB • Use WebP format • High quality setting</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Product Images</h4>
                  <p className="text-sm text-green-600">Target: 50-100KB • Use WebP/AVIF • Medium quality</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Thumbnails</h4>
                  <p className="text-sm text-purple-600">Target: 20-50KB • Use WebP • Lower quality acceptable</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Layers className="w-6 h-6 mr-3 text-green-600" />
                Format Selection
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-2">WebP (Recommended)</h4>
                  <p className="text-sm text-green-600">Best for web • 25-35% smaller than JPEG • Wide browser support</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">AVIF (Next-Gen)</h4>
                  <p className="text-sm text-purple-600">Best compression • 50% smaller than JPEG • Growing support</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">JPEG (Legacy)</h4>
                  <p className="text-sm text-orange-600">Universal support • Good for photos • No transparency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pro Tips & Tricks</h2>
            <p className="text-lg text-gray-600">Advanced techniques for power users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                Batch Processing Efficiency
              </h3>
              <p className="text-gray-600 text-sm">
                Upload all images at once and use the same settings across the batch.
                Our tool processes up to 20 images simultaneously for maximum efficiency.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border border-green-200 rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                Smart Size Targeting
              </h3>
              <p className="text-gray-600 text-sm">
                Use quick compress buttons for common web sizes. Our algorithm guarantees
                the final file size will not exceed your target while maintaining quality.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 border border-purple-200 rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-purple-600" />
                Format Conversion Strategy
              </h3>
              <p className="text-gray-600 text-sm">
                Convert to WebP for modern browsers, keep JPEG fallbacks for compatibility.
                Use lossless mode for graphics with text or sharp edges.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border border-orange-200 rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-orange-600" />
                Performance Optimization
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor compression ratios in real-time. Aim for 60-80% size reduction
                while maintaining visual quality. Use the reset feature to compare results.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl shadow-xl border border-blue-200 p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Optimizing?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Put your knowledge to practice! Start compressing and converting your images
                with our professional tool.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105"
                >
                  <FileImage className="w-5 h-5 mr-2" />
                  Start Compressing Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/about-webp"
                  className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg border border-gray-300 hover:border-gray-400 transform hover:scale-105"
                >
                  Learn About Formats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 