import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { CheckCircle, Zap, Globe, Shield, FileImage, Layers, Sparkles, Target } from 'lucide-react'

export const metadata = {
  title: 'WebP Compressor Guide - Best Online WebP Image Compressor | CompressLab',
  description: 'Complete WebP compressor guide. Learn how to compress WebP images, reduce WebP file size, and use the best online WebP compressor tools. Free WebP compression by CompressLab.',
  keywords: ['webp compressor', 'compress webp', 'webp image compressor', 'online webp compressor', 'webp compression', 'CompressLab webp', 'webp file compressor', 'reduce webp file size'],
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
            Complete Image Format Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore the features and advantages of modern image formats. Our professional compression tool supports
            WebP, JPEG, PNG, AVIF and more, helping you choose the perfect format for optimal compression and web performance.
          </p>
        </div>

        {/* Format Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* WebP */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">WebP</h3>
                <p className="text-sm text-green-600 font-medium">Modern Preferred Format</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Modern image format developed by Google with superior compression. Supports both lossy and lossless compression,
              25-35% smaller than JPEG and 26% smaller than PNG files.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Excellent compression ratio</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Transparency support</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Wide modern browser support</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Animation support</span>
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
                <p className="text-sm text-purple-600 font-medium">Next-Gen Format</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Latest image format based on AV1 video codec. Provides better compression than WebP,
              with file sizes up to 50% smaller than JPEG while maintaining superior quality.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Best compression efficiency</span>
              </div>
              <div className="flex items-center text-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>HDR support</span>
              </div>
              <div className="flex items-center text-purple-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Wide color gamut</span>
              </div>
              <div className="flex items-center text-yellow-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Growing browser support</span>
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
                <p className="text-sm text-orange-600 font-medium">Classic Universal Format</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Most widely used image format with good compression and perfect compatibility.
              Ideal for photos and complex images, but doesn&apos;t support transparency.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-orange-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Universal compatibility</span>
              </div>
              <div className="flex items-center text-orange-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Perfect for photos</span>
              </div>
              <div className="flex items-center text-orange-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Moderate file size</span>
              </div>
              <div className="flex items-center text-red-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>No transparency support</span>
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
                <p className="text-sm text-blue-600 font-medium">Lossless Transparency Format</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Lossless format with transparency support, maintaining perfect image quality.
              Ideal for icons, logos, and images requiring transparent backgrounds, but larger file sizes.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Perfect transparency support</span>
              </div>
              <div className="flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Lossless compression</span>
              </div>
              <div className="flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Perfect for icons & logos</span>
              </div>
              <div className="flex items-center text-red-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Larger file sizes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-3">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Format Comparison Table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-bold text-gray-900 text-lg">Feature</th>
                  <th className="text-center py-4 px-6 font-bold text-green-700 text-lg">WebP</th>
                  <th className="text-center py-4 px-6 font-bold text-purple-700 text-lg">AVIF</th>
                  <th className="text-center py-4 px-6 font-bold text-orange-700 text-lg">JPEG</th>
                  <th className="text-center py-4 px-6 font-bold text-blue-700 text-lg">PNG</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold text-gray-700">Compression</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Excellent
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Best
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Good
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Poor
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold text-gray-700">Transparency</td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold">✓</td>
                  <td className="py-4 px-6 text-center text-purple-600 font-bold">✓</td>
                  <td className="py-4 px-6 text-center text-red-600 font-bold">✗</td>
                  <td className="py-4 px-6 text-center text-blue-600 font-bold">✓</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold text-gray-700">Animation</td>
                  <td className="py-4 px-6 text-center text-green-600 font-bold">✓</td>
                  <td className="py-4 px-6 text-center text-purple-600 font-bold">✓</td>
                  <td className="py-4 px-6 text-center text-red-600 font-bold">✗</td>
                  <td className="py-4 px-6 text-center text-yellow-600 font-bold">APNG</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold text-gray-700">Browser Support</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Wide
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Growing
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Universal
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Universal
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold text-gray-700">Best Use Case</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-600">Web Images</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-600">High Quality</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-600">Photos</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-600">Icons/Logos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-3">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Smart Format Selection Guide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
                Web Optimization First Choice
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="font-semibold text-green-800 mb-1">WebP (Recommended)</div>
                  <div className="text-sm text-green-700">Modern browsers + excellent compression + transparency support</div>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="font-semibold text-purple-800 mb-1">AVIF (Future Trend)</div>
                  <div className="text-sm text-purple-700">Best compression efficiency for performance-focused websites</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
                Special Use Cases
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="font-semibold text-orange-800 mb-1">JPEG</div>
                  <div className="text-sm text-orange-700">Photo processing + maximum compatibility + print purposes</div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="font-semibold text-blue-800 mb-1">PNG</div>
                  <div className="text-sm text-blue-700">Icon design + logos + perfect transparency required</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Features */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Professional Compression Tool</h2>
            <p className="text-lg text-gray-600">Supporting all major formats with intelligent compression algorithms and one-click optimization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Compression</h3>
              <p className="text-gray-600 text-sm">Automatically selects optimal compression strategy based on image size, ensuring perfect balance between quality and file size</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Precise Control</h3>
              <p className="text-gray-600 text-sm">Compress to specific file sizes (100KB, 200KB, 300KB) to meet various usage requirements</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Format Conversion</h3>
              <p className="text-gray-600 text-sm">One-click conversion to WebP, AVIF, JPEG, PNG with both lossy and lossless modes</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl shadow-xl border border-blue-200 p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start Optimizing Your Images
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Use our professional tool to choose the perfect format and achieve optimal compression results.
                Supports batch processing of up to 20 images at once.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105"
                >
                  <FileImage className="w-5 h-5 mr-2" />
                  Start Compressing Now
                </Link>
                <Link
                  href="/tutorial"
                  className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg border border-gray-300 hover:border-gray-400 transform hover:scale-105"
                >
                  View Tutorial
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


