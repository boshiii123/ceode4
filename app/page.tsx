'use client'

import Header from '../components/Header'
import ImageCompressor from '../components/ImageCompressor'
import Footer from '../components/Footer'
import { Upload, Settings, Download, Shield, Zap, Globe, Clock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
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
          "text": "CompressLab is the best free WebP compressor online. Our WebP compressor uses advanced algorithms to compress WebP images while maintaining quality. You can compress WebP files to specific sizes like 100KB, 200KB, or convert WebP to other formats like JPEG and PNG."
        }
      },
      {
        "@type": "Question",
        "name": "How do I compress a WebP image to a specific size like 100KB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply upload your WebP image and click one of our quick compress buttons (100KB, 200KB, 300KB). CompressLab's WebP compressor will automatically adjust the compression settings to achieve your target file size while maintaining the best possible quality."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to compress my WebP images here?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! CompressLab processes all WebP images directly in your browser using client-side technology. Your WebP images are never uploaded to our servers, ensuring complete privacy and security of your files."
        }
      },
      {
        "@type": "Question",
        "name": "Does compressing a WebP image reduce its quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WebP compression is designed to maintain visual quality while reducing file size. Our advanced WebP compressor algorithms ensure minimal quality loss. You can adjust the compression settings to find the perfect balance between file size and image quality for your WebP images."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between WebP and JPG?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WebP is a modern image format that provides 25-35% better compression than JPG while maintaining the same visual quality. WebP also supports transparency (like PNG) and animation, making it more versatile for web use. Our WebP compressor can convert between these formats."
        }
      },
      {
        "@type": "Question",
        "name": "Can I convert WebP to other formats?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! CompressLab's WebP compressor supports converting WebP images to JPEG, PNG, and other formats. You can also convert other formats to WebP for better compression. All conversions maintain high quality while optimizing file size."
        }
      },
      {
        "@type": "Question",
        "name": "What image formats does CompressLab support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CompressLab supports all major image formats including WebP, JPEG, PNG, GIF, AVIF, BMP, and TIFF. You can upload any of these formats and convert them to WebP or other formats while compressing to your desired file size."
        }
      },
      {
        "@type": "Question",
        "name": "Is CompressLab WebP compressor free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! CompressLab's WebP compressor is completely free to use with no limitations on file size, number of WebP images, or compression quality. There are no hidden fees, subscriptions, or watermarks added to your compressed WebP images."
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

        {/* 简化的页面标题区域 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              CompressLab - Free WebP Compressor Online
            </h1>
            <p className="text-lg text-gray-600">
              Best WebP compressor to compress WebP images, reduce file size, and convert WebP to JPEG/PNG formats
            </p>
          </div>
        </div>

        <ImageCompressor />

        {/* How-To Section 使用步骤 - 恢复更多内容 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Use CompressLab WebP Compressor in 3 Simple Steps
            </h2>
            <p className="text-lg text-gray-600">
              Professional WebP compression and format conversion made easy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Upload WebP Images</h3>
              <p className="text-gray-600">
                Drag & drop or click to select WebP images.
                Supports WebP, JPEG, PNG, AVIF, GIF, BMP, TIFF formats.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Compress WebP Files</h3>
              <p className="text-gray-600">
                Use our WebP compressor to compress to 100KB, 200KB, 300KB or convert WebP to JPEG/PNG.
                All WebP compression happens in your browser for privacy.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Download Compressed WebP</h3>
              <p className="text-gray-600">
                Download individual compressed WebP files or use batch download.
                Get perfectly optimized WebP images in seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section 功能特色 - 恢复更多内容 */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose CompressLab WebP Compressor?
              </h2>
              <p className="text-lg text-gray-600">
                Professional WebP compression with advanced features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WebP Size Control</h3>
                <p className="text-gray-600">
                  Compress WebP images to exact file sizes: 100KB, 200KB, 300KB, or any custom size.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WebP Format Conversion</h3>
                <p className="text-gray-600 mb-3">
                  Convert WebP to JPEG, PNG formats or compress WebP files while maintaining quality.
                </p>
                <Link href="/about-webp" className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                  Learn about WebP format →
                </Link>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Protected</h3>
                <p className="text-gray-600 mb-3">
                  All WebP compression happens in your browser. Your WebP images never leave your device.
                </p>
                <Link href="/privacy" className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
                  Learn about our privacy policy →
                </Link>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast WebP Processing</h3>
                <p className="text-gray-600 mb-3">
                  Instant WebP compression with no upload time. Process multiple WebP images simultaneously.
                </p>
                <Link href="/tutorial" className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200">
                  View complete tutorial →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section 常见问题 - 恢复8个问题 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about WebP compression
            </p>
          </div>

          <FAQAccordion />

          {/* CTA Section with Internal Links */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our comprehensive guides and tutorials to master WebP compression
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tutorial" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200">
                Complete Tutorial
              </Link>
              <Link href="/about-webp" className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-xl border border-blue-200 transition-colors duration-200">
                WebP Format Guide
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

// FAQ手风琴组件 - 恢复8个问题
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqData = [
    {
      question: "What is the best WebP compressor online?",
      answer: "CompressLab is the best free WebP compressor online. Our WebP compressor uses advanced algorithms to compress WebP images while maintaining quality. You can compress WebP files to specific sizes like 100KB, 200KB, or convert WebP to other formats like JPEG and PNG."
    },
    {
      question: "How do I compress a WebP image to a specific size like 100KB?",
      answer: "Simply upload your WebP image and click one of our quick compress buttons (100KB, 200KB, 300KB). CompressLab's WebP compressor will automatically adjust the compression settings to achieve your target file size while maintaining the best possible quality."
    },
    {
      question: "Is it safe to compress my WebP images here?",
      answer: "Absolutely! CompressLab processes all WebP images directly in your browser using client-side technology. Your WebP images are never uploaded to our servers, ensuring complete privacy and security of your files."
    },
    {
      question: "Does compressing a WebP image reduce its quality?",
      answer: "WebP compression is designed to maintain visual quality while reducing file size. Our advanced WebP compressor algorithms ensure minimal quality loss. You can adjust the compression settings to find the perfect balance between file size and image quality for your WebP images."
    },
    {
      question: "What is the difference between WebP and JPG?",
      answer: "WebP is a modern image format that provides 25-35% better compression than JPG while maintaining the same visual quality. WebP also supports transparency (like PNG) and animation, making it more versatile for web use. Our WebP compressor can convert between these formats."
    },
    {
      question: "Can I convert WebP to other formats?",
      answer: "Yes! CompressLab's WebP compressor supports converting WebP images to JPEG, PNG, and other formats. You can also convert other formats to WebP for better compression. All conversions maintain high quality while optimizing file size."
    },
    {
      question: "What image formats does CompressLab support?",
      answer: "CompressLab supports all major image formats including WebP, JPEG, PNG, GIF, AVIF, BMP, and TIFF. You can upload any of these formats and convert them to WebP or other formats while compressing to your desired file size."
    },
    {
      question: "Is CompressLab WebP compressor free to use?",
      answer: "Yes! CompressLab's WebP compressor is completely free to use with no limitations on file size, number of WebP images, or compression quality. There are no hidden fees, subscriptions, or watermarks added to your compressed WebP images."
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