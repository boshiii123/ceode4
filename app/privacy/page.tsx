import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Shield, Lock, Eye, FileText, Globe, Users, Settings, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy - WebP Compressor Data Protection | CompressLab',
  description: 'CompressLab WebP compressor privacy policy. Learn how we protect your data with 100% client-side WebP image compression. Your images never leave your device.',
  keywords: ['webp compressor privacy', 'client-side compression', 'secure webp processing', 'image compression privacy', 'CompressLab privacy', 'webp data protection'],
}

export default function Privacy() {
  return (
    <main>
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl mb-6 shadow-xl shadow-green-500/25">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your privacy is our top priority. Learn how we protect your data and ensure complete security
            when using our professional image compression tool.
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <Lock className="w-4 h-4 mr-2 text-green-600" />
            <span className="text-sm font-medium text-green-700">Client-Side Processing - Your Images Never Leave Your Device</span>
          </div>
        </div>

        {/* Key Privacy Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">100% Client-Side Processing</h3>
            <p className="text-gray-600">All image compression happens in your browser. Your images never leave your device or get uploaded to our servers.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">No Data Collection</h3>
            <p className="text-gray-600">We don&apos;t collect, store, or analyze your personal images. What you process stays completely private.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Secure by Design</h3>
            <p className="text-gray-600">Our architecture ensures maximum security and privacy through client-side processing technology.</p>
          </div>
        </div>

        {/* Detailed Privacy Information */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-3">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Detailed Privacy Information</h2>
              <p className="text-gray-600 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-12">
            {/* Information We Collect */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Information We Collect</h3>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Image Processing Data
                </h4>
                <p className="text-blue-700 mb-3">
                  <strong>What we DON&apos;T collect:</strong> Your images are processed entirely in your browser using JavaScript.
                  We never receive, store, or have access to your image files.
                </p>
                <p className="text-blue-700">
                  <strong>What we may collect:</strong> Anonymous usage statistics (page views, feature usage) to improve our service,
                  but this contains no personal information or image data.
                </p>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <Settings className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">How We Use Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-bold text-green-800 mb-3">Service Improvement</h4>
                  <ul className="text-green-700 space-y-2">
                    <li>• Analyze website performance and user experience</li>
                    <li>• Optimize compression algorithms and features</li>
                    <li>• Monitor service reliability and uptime</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-bold text-green-800 mb-3">Technical Operations</h4>
                  <ul className="text-green-700 space-y-2">
                    <li>• Maintain and improve website functionality</li>
                    <li>• Respond to user feedback and support requests</li>
                    <li>• Ensure security and prevent abuse</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  <Lock className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Data Security & Privacy</h3>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-purple-800 mb-3">Client-Side Processing</h4>
                    <p className="text-purple-700">
                      All image compression and format conversion happens directly in your browser using WebAssembly and JavaScript.
                      Your images never leave your device, ensuring maximum privacy and security.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-800 mb-3">Security Measures</h4>
                    <p className="text-purple-700">
                      We implement industry-standard security measures including HTTPS encryption,
                      secure hosting, and regular security audits to protect any information we do collect.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
                  <Globe className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Cookies & Tracking</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h4 className="font-bold text-orange-800 mb-3">Essential Cookies</h4>
                  <p className="text-orange-700">
                    We use essential cookies to improve your experience (remembering your settings, ensuring proper functionality).
                    These cookies don&apos;t track personal information.
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h4 className="font-bold text-orange-800 mb-3">Analytics</h4>
                  <p className="text-orange-700">
                    We may use privacy-focused analytics services to understand website usage patterns.
                    These services don&apos;t have access to your images or personal data.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Third-Party Services</h3>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <p className="text-indigo-700 mb-4">Our website may use third-party services for:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">Website Analytics</h4>
                    <p className="text-sm text-indigo-600">Performance monitoring and usage statistics</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">Content Delivery</h4>
                    <p className="text-sm text-indigo-600">Fast and reliable website hosting</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-800 mb-2">Security Services</h4>
                    <p className="text-sm text-indigo-600">Protection against threats and abuse</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Your Rights</h3>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <p className="text-emerald-700 mb-4">You have the right to:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-emerald-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                      Access any personal information we may have
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                      Request correction of inaccurate information
                    </li>
                  </ul>
                  <ul className="space-y-2 text-emerald-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                      Request deletion of your personal information
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                      Opt out of non-essential cookies and tracking
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact & Changes */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this privacy policy or our data practices, please contact us:
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Contact Support
                  </Link>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Policy Changes</h3>
                  <p className="text-gray-600 mb-4">
                    We may update this privacy policy from time to time. We will notify users of any material changes by posting the new policy on this page.
                  </p>
                  <p className="text-sm text-gray-500">
                    Continued use of our service after changes constitutes acceptance of the updated policy.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-3xl shadow-xl border border-green-200 p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Compress Your Images Securely?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience the peace of mind that comes with 100% client-side processing.
                Your images never leave your device.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Start Secure Compression
                </Link>
                <Link
                  href="/about-webp"
                  className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg border border-gray-300 hover:border-gray-400 transform hover:scale-105"
                >
                  Learn More About Formats
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