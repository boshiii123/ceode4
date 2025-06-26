import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from '../components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'WebP Compressor - Free Online WebP Image Compressor | CompressLab',
    template: '%s | CompressLab WebP Compressor'
  },
  description: 'Free WebP compressor by CompressLab. Best online WebP image compressor to compress WebP files, reduce WebP file size, and convert WebP to JPEG/PNG. Professional WebP compression tool.',
  keywords: [
    'webp compressor',
    'compressor webp',
    'compress webp',
    'webp image compressor',
    'online webp compressor',
    'webp file compressor',
    'compress webp online',
    'webp compression tool',
    'reduce webp file size',
    'webp to jpeg converter',
    'webp to png converter',
    'CompressLab',
    'free webp compressor'
  ],
  authors: [{ name: 'CompressLab' }],
  creator: 'CompressLab',
  publisher: 'CompressLab',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tinyimgtool.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'WebP Compressor - Free Online WebP Image Compressor | CompressLab',
    description: 'Free WebP compressor by CompressLab. Best online WebP image compressor to compress WebP files, reduce WebP file size, and convert WebP to JPEG/PNG.',
    url: 'https://tinyimgtool.com',
    siteName: 'CompressLab WebP Compressor',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'CompressLab - Free WebP Compressor Online',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebP Compressor - Free Online WebP Image Compressor | CompressLab',
    description: 'Free WebP compressor by CompressLab. Best online WebP image compressor to compress WebP files and reduce file size.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://tinyimgtool.com/#webapp",
        "name": "CompressLab WebP Compressor",
        "url": "https://tinyimgtool.com",
        "description": "Free online WebP compressor tool to compress WebP images, reduce file size, and convert between image formats",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web Browser",
        "permissions": "No upload required - 100% client-side processing",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "WebP image compression",
          "Format conversion (WebP, JPEG, PNG, AVIF)",
          "Batch processing up to 20 images",
          "Precise size control (100KB, 200KB, 300KB)",
          "Client-side processing for privacy"
        ],
        "screenshot": "https://tinyimgtool.com/og-image.svg"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://tinyimgtool.com/#software",
        "name": "CompressLab Image Compressor",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "permissions": "No server upload required",
        "downloadUrl": "https://tinyimgtool.com",
        "softwareVersion": "1.0.0",
        "releaseNotes": "Professional image compression with precise size control"
      },
      {
        "@type": "Organization",
        "@id": "https://tinyimgtool.com/#organization",
        "name": "CompressLab",
        "url": "https://tinyimgtool.com",
        "logo": "https://tinyimgtool.com/logo.svg",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": "https://tinyimgtool.com/#website",
        "name": "CompressLab - Free WebP Compressor",
        "url": "https://tinyimgtool.com",
        "publisher": {
          "@id": "https://tinyimgtool.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://tinyimgtool.com/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
} 