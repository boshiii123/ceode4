'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Copy } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [copySuccess, setCopySuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build email content
    const subject = `[Professional Image Compressor] ${formData.subject || 'Contact Inquiry'}`
    const body = `
From: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This email was sent from Professional Image Compressor contact form
Website: http://localhost:3001
    `.trim()

    // Open default email client
    const mailtoLink = `mailto:support@tinyimgtool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('support@tinyimgtool.com')
      setCopySuccess('Email address copied!')
      setTimeout(() => setCopySuccess(''), 2000)
    } catch (err) {
      setCopySuccess('Copy failed, please copy manually')
      setTimeout(() => setCopySuccess(''), 2000)
    }
  }

  return (
    <main>
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions, feedback, or need support? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-3">
                      For technical support and general inquiries
                    </p>
                    <div className="flex items-center space-x-2">
                      <a
                        href="mailto:support@tinyimgtool.com"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        support@tinyimgtool.com
                      </a>
                      <button
                        onClick={copyEmail}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy email address"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    {copySuccess && (
                      <p className="text-sm text-green-600 mt-1">{copySuccess}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback</h3>
                    <p className="text-gray-600 mb-2">
                      Share your thoughts and suggestions
                    </p>
                    <a
                      href="mailto:support@tinyimgtool.com?subject=[Professional Image Compressor] Feedback"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Send feedback email
                    </a>
                  </div>
                </div>


              </div>
            </div>

            {/* FAQ Section */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Is my data safe?
                  </h3>
                  <p className="text-gray-600">
                    Yes! All image processing happens in your browser. Your images never leave your device or get uploaded to our servers.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What image formats are supported?
                  </h3>
                  <p className="text-gray-600 mb-2">
                    We support JPG, PNG, GIF, BMP, TIFF, WebP, AVIF and other common image formats with conversion between them.
                  </p>
                  <Link href="/about-webp" className="text-sm text-green-600 hover:text-green-700 font-medium">
                    Learn about image formats →
                  </Link>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Is the service free?
                  </h3>
                  <p className="text-gray-600">
                    Yes, our image compression tool is completely free to use with no limitations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How do I get the best compression results?
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Use the quick compress feature for precise size control, or adjust the max width and height settings as needed.
                  </p>
                  <Link href="/tutorial" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View complete tutorial →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Tell us how we can help..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Open Email Client
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">How to send email?</p>
                  <ol className="list-decimal list-inside space-y-1 text-blue-700">
                    <li>Fill out the form above</li>
                    <li>Click &quot;Open Email Client&quot; button</li>
                    <li>Your default email app will open</li>
                    <li>Email content will be pre-filled, just send it</li>
                  </ol>
                  <p className="mt-2">
                    No email client? Send directly to:
                    <button
                      onClick={copyEmail}
                      className="ml-1 text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      support@tinyimgtool.com
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="mt-16 text-center">
          <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Quick Response Time
            </h2>
            <p className="text-gray-600 mb-4">
              We typically respond to all inquiries within 24 hours during business days.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Email:</span> Within 24 hours
              </div>
              <div>
                <span className="font-semibold">GitHub Issues:</span> Within 48 hours
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 