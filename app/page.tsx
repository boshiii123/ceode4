'use client'

import Header from '../components/Header'
import ImageCompressor from '../components/ImageCompressor'
import Footer from '../components/Footer'
import { Upload, Settings, Download, Shield, Zap, Globe, Clock, CheckCircle, ChevronDown, ChevronUp, Cpu, BarChart3, Target, Layers } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best WebP compressor online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CompressLab is the best free WebP compressor online with V2 engine technology. Our advanced WebP compressor uses intelligent algorithms to compress WebP images while maintaining quality. Supports 7 formats including WebP, AVIF, JPEG, PNG, BMP, GIF, and TIFF."
        }
      },
      {
        "@type": "Question",
        "name": "How do I compress a WebP image to a specific size like 100KB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your WebP image and use our quick compress buttons (100KB, 200KB, 300KB) or custom size targeting. CompressLab's V2 engine automatically analyzes your WebP image and applies intelligent compression to achieve exact file sizes while maintaining optimal quality."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to compress my WebP images here?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! CompressLab processes all WebP images directly in your browser using client-side V2 engine technology. Your WebP images are never uploaded to our servers, ensuring complete privacy and security."
        }
      },
      {
        "@type": "Question",
        "name": "Does compressing a WebP image reduce its quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our V2 engine WebP compressor uses intelligent analysis to maintain visual quality while reducing file size. The advanced algorithms ensure minimal quality loss with smart iteration and content-aware compression for your WebP images."
        }
      },
      {
        "@type": "Question",
        "name": "What makes CompressLab's WebP compressor different?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CompressLab features V2 engine technology with intelligent WebP analysis, precise size control, and support for 7 formats. Our WebP compressor offers parallel processing, real-time analytics, and can compress up to 20 WebP images simultaneously."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert WebP to other formats?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our WebP compressor supports conversion between WebP and 6 other formats: AVIF, JPEG, PNG, BMP, GIF, and TIFF. Convert WebP to JPEG/PNG or vice versa with professional quality using V2 engine technology."
        }
      },
      {
        "@type": "Question",
        "name": "What image formats work with your WebP compressor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CompressLab's WebP compressor supports 7 formats: WebP (primary), AVIF, JPEG, PNG, BMP, GIF, and TIFF. Upload any format and compress/convert to WebP or other formats with V2 engine optimization."
        }
      },
      {
        "@type": "Question",
        "name": "Is CompressLab WebP compressor free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! CompressLab's advanced WebP compressor with V2 engine is completely free. No limitations on WebP file size, number of images (up to 20 at once), or compression quality. No subscriptions or watermarks."
        }
      }
    ]
  }

  return (
    <>
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />

      <main>
        <Header />

        {/* Hero Section - 保持WebP为主，融入智能功能 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Best Free WebP Compressor Online - Compress WebP Images
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Free WebP compressor tool. Compress WebP online, reduce WebP file size, convert WebP to JPG/PNG. No limits, fast compression.
            </p>

            {/* 智能功能特性横幅 */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 mb-6 text-white">
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Cpu className="w-4 h-4 mr-2" />
                  <span>Free WebP Compressor</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  <span>Reduce WebP File Size</span>
                </div>
                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2" />
                  <span>WebP to JPG/PNG</span>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <span>Online WebP Tool</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ImageCompressor />

        {/* How-To Section - 强调WebP + 智能功能 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Compress WebP Online in 3 Smart Steps
            </h2>
            <p className="text-lg text-gray-600">
              Professional WebP compression with intelligent analysis and 7-format support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Smart WebP Upload</h3>
              <p className="text-gray-600">
                Upload WebP images or 6 other formats (AVIF, JPEG, PNG, BMP, GIF, TIFF).
                Smart engine automatically analyzes each WebP file for optimal processing.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Intelligent WebP Processing</h3>
              <p className="text-gray-600">
                Advanced algorithms compress WebP to exact sizes (100KB, 200KB, 300KB) or convert WebP to other formats.
                Smart optimization ensures perfect WebP quality preservation.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Download Optimized WebP</h3>
              <p className="text-gray-600">
                Get compressed WebP images with live analytics showing compression ratios.
                Batch download up to 20 WebP files with performance stats.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section - WebP为主，展示智能功能 */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Advanced WebP Compressor?
              </h2>
              <p className="text-lg text-gray-600">
                Professional WebP compression technology with intelligent features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Precise WebP Control</h3>
                <p className="text-gray-600">
                  Compress WebP to exact sizes with smart algorithms: 100KB, 200KB, 300KB, or any custom size.
                  ±5KB accuracy guaranteed for WebP compression.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WebP + 6 Formats</h3>
                <p className="text-gray-600 mb-3">
                  Convert WebP to AVIF (50% smaller), JPEG, PNG, or compress any format to WebP.
                  Professional format conversion with quality preservation.
                </p>
                <Link href="/about-webp" className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                  Learn about all formats →
                </Link>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart WebP Analysis</h3>
                <p className="text-gray-600 mb-3">
                  Advanced algorithms automatically analyze WebP characteristics and select optimal compression strategy.
                  Content-aware processing for perfect results.
                </p>
                <Link href="/tutorial" className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                  View smart compression tutorial →
                </Link>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live WebP Analytics</h3>
                <p className="text-gray-600 mb-3">
                  Real-time WebP compression statistics: processing time, compression ratios, quality scores.
                  Monitor compression performance for optimal results.
                </p>
                <Link href="/privacy" className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200">
                  Privacy & security →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* WebP Benefits Section - 新增WebP优势说明 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why WebP is the Future of Web Images?
            </h2>
            <p className="text-lg text-gray-600">
              Discover why WebP is becoming the standard for modern websites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">35% Smaller Files</h3>
              <p className="text-gray-600">
                WebP compression reduces file sizes by 25-35% compared to JPEG while maintaining the same visual quality.
                Perfect for faster websites and better user experience.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparency & Animation</h3>
              <p className="text-gray-600">
                Unlike JPEG, WebP supports transparency like PNG and animations like GIF.
                One format for all your web image needs with superior compression.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">95%+ Browser Support</h3>
              <p className="text-gray-600">
                WebP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge.
                Safe to use for production websites with excellent compatibility.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section - 更新为WebP + 智能压缩相关 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              WebP Compressor FAQ
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about smart WebP compression
            </p>
          </div>

          <FAQAccordion />

          {/* CTA Section with Internal Links */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Smart WebP Compression?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start compressing WebP images with intelligent analysis and professional results
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tutorial" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200">
                Smart Compression Tutorial
              </Link>
              <Link href="/about-webp" className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-xl border border-blue-200 transition-colors duration-200">
                Complete Format Guide
              </Link>
              <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-200">
                Get Support
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}

// FAQ手风琴组件 - 更新为WebP + 智能压缩相关
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqData = [
    {
      question: "What is the best WebP compressor online?",
      answer: "CompressLab is the best free WebP compressor online with advanced smart technology. Our professional WebP compressor uses intelligent algorithms to compress WebP images while maintaining quality. Supports 7 formats including WebP, AVIF, JPEG, PNG, BMP, GIF, and TIFF."
    },
    {
      question: "How do I compress a WebP image to a specific size like 100KB?",
      answer: "Upload your WebP image and use our quick compress buttons (100KB, 200KB, 300KB) or custom size targeting. CompressLab's smart algorithms automatically analyze your WebP image and apply intelligent compression to achieve exact file sizes while maintaining optimal quality."
    },
    {
      question: "Is it safe to compress my WebP images here?",
      answer: "Absolutely! CompressLab processes all WebP images directly in your browser using client-side technology. Your WebP images are never uploaded to our servers, ensuring complete privacy and security."
    },
    {
      question: "Does compressing a WebP image reduce its quality?",
      answer: "Our smart WebP compressor uses intelligent analysis to maintain visual quality while reducing file size. The advanced algorithms ensure minimal quality loss with smart iteration and content-aware compression for your WebP images."
    },
    {
      question: "What makes CompressLab's WebP compressor different?",
      answer: "CompressLab features advanced technology with intelligent WebP analysis, precise size control, and support for 7 formats. Our WebP compressor offers parallel processing, real-time analytics, and can compress up to 20 WebP images simultaneously."
    },
    {
      question: "Can I convert WebP to other formats?",
      answer: "Yes! Our WebP compressor supports conversion between WebP and 6 other formats: AVIF, JPEG, PNG, BMP, GIF, and TIFF. Convert WebP to JPEG/PNG or vice versa with professional quality using smart optimization."
    },
    {
      question: "What image formats work with your WebP compressor?",
      answer: "CompressLab's WebP compressor supports 7 formats: WebP (primary), AVIF, JPEG, PNG, BMP, GIF, and TIFF. Upload any format and compress/convert to WebP or other formats with intelligent optimization."
    },
    {
      question: "Is CompressLab WebP compressor free to use?",
      answer: "Yes! CompressLab's advanced WebP compressor is completely free. No limitations on WebP file size, number of images (up to 20 at once), or compression quality. No subscriptions or watermarks."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqData.map((faq, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-all duration-200 hover:bg-gray-50 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                {faq.question}
              </h3>
              <div className="flex-shrink-0">
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
          </button>

          {openIndex === index && (
            <div className="px-6 pb-5">
              <div className="pt-2 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 