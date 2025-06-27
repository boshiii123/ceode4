import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from '../components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Compressor WebP Online Free - Reduce File Size | CompressLab',
    template: '%s | CompressLab WebP Compressor'
  },
  description: 'Convert WebP to JPG, PNG, AVIF instantly. Batch process up to 20 images. No upload required, 100% browser-based WebP optimization tool.',
  keywords: [
    'webp compressor',
    'compressor webp',
    'compress webp online',
    'webp compression tool',
    'compress webp',
    'webp image compressor',
    'online webp compressor',
    'webp file compressor',
    'reduce webp file size',
    'webp optimizer',
    'webp to avif converter',
    'webp to jpeg converter',
    'webp to png converter',
    'webp to jpg',
    'jpg to webp',
    'batch webp compressor',
    'optimize webp images',
    'free webp compressor',
    'CompressLab'
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
    title: 'Free WebP Compressor - Reduce WebP File Size Online',
    description: 'Compress WebP images online, convert WebP to JPG/PNG/AVIF. Fast batch processing, no upload required. Free WebP optimization tool.',
    url: 'https://tinyimgtool.com',
    siteName: 'CompressLab WebP Compressor',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'CompressLab - Best Free WebP Compressor Online',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free WebP Compressor - Convert & Compress WebP Online',
    description: 'Compress WebP images, convert to JPG/PNG/AVIF. Batch process up to 20 files. No upload, 100% free WebP tool.',
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
  // Enhanced Structured Data for Smart Compression SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://tinyimgtool.com/#webapp",
        "name": "CompressLab WebP Compressor",
        "url": "https://tinyimgtool.com",
        "description": "Free WebP compressor online. Compress WebP images, reduce file size, and convert WebP to JPG, PNG, AVIF, and other formats",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web Browser",
        "permissions": "No upload required - 100% client-side processing",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Free WebP compression online",
          "Reduce WebP file size (100KB, 200KB, 300KB)",
          "Convert WebP to JPG, PNG, AVIF, BMP, GIF, TIFF",
          "Batch compress up to 20 WebP images",
          "No upload required - client-side processing",
          "WebP optimizer with compression analytics",
          "Online WebP compressor tool"
        ],
        "screenshot": "https://tinyimgtool.com/og-image.svg",
        "softwareVersion": "2.0.0",
        "releaseNotes": "Free WebP compressor with batch processing and 7-format conversion support"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://tinyimgtool.com/#software",
        "name": "CompressLab WebP Compressor",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "permissions": "No server upload required",
        "downloadUrl": "https://tinyimgtool.com",
        "softwareVersion": "2.0.0",
        "releaseNotes": "Free online WebP compressor with batch processing and format conversion",
        "keywords": "webp compressor, compress webp online, webp to jpg, webp optimizer, format conversion"
      },
      {
        "@type": "Organization",
        "@id": "https://tinyimgtool.com/#organization",
        "name": "CompressLab",
        "url": "https://tinyimgtool.com",
        "logo": "https://tinyimgtool.com/logo.svg",
        "description": "Leading free WebP compression tool for online image optimization",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": "https://tinyimgtool.com/#website",
        "name": "CompressLab - Free WebP Compressor & Converter Online",
        "url": "https://tinyimgtool.com",
        "publisher": {
          "@id": "https://tinyimgtool.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://tinyimgtool.com/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "about": {
          "@type": "Thing",
          "name": "WebP Compression Technology",
          "description": "Free WebP compression and format conversion online"
        }
      },
      {
        "@type": "TechArticle",
        "@id": "https://tinyimgtool.com/#article",
        "headline": "Free WebP Compression Online",
        "description": "Learn how to compress WebP images online, reduce file size, and convert WebP to other formats",
        "keywords": ["webp compressor", "compress webp online", "webp to jpg", "webp optimizer", "image compression"],
        "author": {
          "@id": "https://tinyimgtool.com/#organization"
        },
        "publisher": {
          "@id": "https://tinyimgtool.com/#organization"
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

        {/* Enhanced SEO Meta Tags for WebP Compressor */}
        <meta name="subject" content="Free WebP Compressor Online Tool" />
        <meta name="language" content="EN" />
        <meta name="category" content="Technology, Image Compression, WebP Tools" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="target" content="all" />
        <meta name="audience" content="Developers, Designers, Content Creators" />

        {/* WebP Specific Meta Tags */}
        <meta name="application-name" content="CompressLab WebP Compressor" />
        <meta name="msapplication-tooltip" content="Free WebP Compressor - Compress & Convert WebP Online" />
        <meta name="msapplication-task" content="name=Compress WebP;action-uri=/;icon-uri=/favicon.svg" />

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