import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
} 