import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Scale, FileText, Shield, Users, AlertTriangle, Globe, Settings, CheckCircle, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service - WebP Compressor Legal Terms | CompressLab',
  description: 'CompressLab WebP compressor terms of service. Legal terms and conditions for using our free online WebP image compression tool.',
  keywords: ['webp compressor terms', 'image compression terms', 'CompressLab legal', 'webp processing terms', 'online compressor agreement'],
}

export default function Terms() {
  return (
    <main>
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-xl shadow-blue-500/25">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Clear and fair terms for using our professional image compression tool.
            Understanding your rights and responsibilities when using our service.
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
            <FileText className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Key Terms Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Free to Use</h3>
            <p className="text-gray-600">Our image compression service is completely free for personal and commercial use.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Content Rights</h3>
            <p className="text-gray-600">You retain full ownership and rights to all images you process through our tool.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fair Use Policy</h3>
            <p className="text-gray-600">Use our service responsibly and in accordance with applicable laws and regulations.</p>
          </div>
        </div>

        {/* Detailed Terms */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-3">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Detailed Terms & Conditions</h2>
          </div>

          <div className="space-y-12">
            {/* Acceptance of Terms */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h3>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <p className="text-blue-700 mb-4">
                  By accessing and using our professional image compression tool, you accept and agree to be bound by the terms and provisions of this agreement.
                </p>
                <p className="text-blue-700">
                  If you do not agree to these terms, please do not use our service. Continued use of the service constitutes acceptance of any updates to these terms.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <Settings className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Description of Service</h3>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-800 mb-3">Core Features</h4>
                    <ul className="text-green-700 space-y-2">
                      <li>• Smart image compression with size targeting</li>
                      <li>• Format conversion (WebP, AVIF, JPEG, PNG)</li>
                      <li>• Batch processing up to 20 images</li>
                      <li>• Client-side processing for privacy</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 mb-3">Service Characteristics</h4>
                    <ul className="text-green-700 space-y-2">
                      <li>• 100% browser-based processing</li>
                      <li>• No server uploads or storage</li>
                      <li>• Free for personal and commercial use</li>
                      <li>• No registration required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">User Responsibilities</h3>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <p className="text-purple-700 mb-4">You agree to use our service responsibly and in accordance with the following guidelines:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Permitted Uses
                    </h4>
                    <ul className="text-purple-700 space-y-2">
                      <li>• Compress and optimize your own images</li>
                      <li>• Use for personal or commercial projects</li>
                      <li>• Process images you have rights to use</li>
                      <li>• Educational and research purposes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Prohibited Activities
                    </h4>
                    <ul className="text-purple-700 space-y-2">
                      <li>• Processing copyrighted content without permission</li>
                      <li>• Attempting to reverse engineer the service</li>
                      <li>• Using the service for illegal purposes</li>
                      <li>• Distributing malware or harmful content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Intellectual Property Rights</h3>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-orange-800 mb-3">Your Content</h4>
                    <p className="text-orange-700 mb-3">
                      You retain all rights, title, and ownership of your original images and any compressed versions created using our tool.
                    </p>
                    <p className="text-orange-700">
                      We do not claim any ownership rights to your content and do not store or access your images.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-800 mb-3">Our Service</h4>
                    <p className="text-orange-700 mb-3">
                      The image compression tool, website design, and related technology are our intellectual property and are protected by copyright and other laws.
                    </p>
                    <p className="text-orange-700">
                      You may not copy, modify, or distribute our service without permission.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center mr-3">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Limitation of Liability</h3>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-red-800 mb-3">&quot;As Is&quot; Service Provision</h4>
                  <p className="text-red-700">
                    Our service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied.
                    We make no guarantees about the accuracy, reliability, or availability of the service.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-semibold text-red-800 mb-2">We Are Not Liable For:</h5>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• Loss of data or images</li>
                      <li>• Service interruptions or downtime</li>
                      <li>• Damages from use of the service</li>
                      <li>• Third-party actions or content</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-semibold text-red-800 mb-2">Your Responsibility:</h5>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• Backup important images before processing</li>
                      <li>• Verify compression results meet your needs</li>
                      <li>• Use the service at your own risk</li>
                      <li>• Comply with applicable laws</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Service Availability */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Service Availability & Changes</h3>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-indigo-800 mb-3">Availability</h4>
                    <p className="text-indigo-700 mb-3">
                      We strive to maintain high availability but cannot guarantee uninterrupted service.
                      We may perform maintenance or updates that temporarily affect availability.
                    </p>
                    <p className="text-indigo-700">
                      Since processing happens in your browser, service availability depends on your device and internet connection.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-800 mb-3">Service Changes</h4>
                    <p className="text-indigo-700 mb-3">
                      We reserve the right to modify, enhance, or discontinue features of our service at any time.
                      We will provide reasonable notice of significant changes.
                    </p>
                    <p className="text-indigo-700">
                      New features and improvements will be added to enhance your experience.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy & Data */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Privacy & Data Handling</h3>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-emerald-800 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Client-Side Processing Guarantee
                  </h4>
                  <p className="text-emerald-700">
                    All image processing occurs entirely in your browser. Your images are never uploaded to our servers,
                    ensuring complete privacy and security of your content.
                  </p>
                </div>
                <p className="text-emerald-700 mb-4">
                  For detailed information about how we handle data and protect your privacy, please review our
                  <Link href="/privacy" className="font-semibold underline hover:text-emerald-800 transition-colors duration-200">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </section>

            {/* Governing Law & Disputes */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                  <Scale className="w-4 h-4 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Governing Law & Dispute Resolution</h3>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Applicable Law</h4>
                    <p className="text-gray-700">
                      These terms are governed by the laws of the jurisdiction where our service is operated.
                      Any legal disputes will be resolved in the appropriate courts of that jurisdiction.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Dispute Resolution</h4>
                    <p className="text-gray-700">
                      We encourage resolving any issues through direct communication.
                      If formal dispute resolution is necessary, it will be conducted according to applicable laws.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact & Updates */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                    Contact Information
                  </h3>
                  <p className="text-blue-700 mb-4">
                    If you have questions about these terms or need support with our service, please contact us:
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Contact Support
                  </Link>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Terms Updates
                  </h3>
                  <p className="text-blue-700 mb-4">
                    We may update these terms from time to time to reflect changes in our service or legal requirements.
                  </p>
                  <p className="text-sm text-blue-600">
                    Continued use of our service after changes constitutes acceptance of the updated terms.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl shadow-xl border border-blue-200 p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Compressing?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Now that you understand our terms, start using our professional image compression tool
                with confidence and complete privacy protection.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Free WebP Compressor
                </Link>
                <Link
                  href="/tutorial"
                  className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg border border-gray-300 hover:border-gray-400 transform hover:scale-105"
                >
                  WebP Tutorial
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