'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Share2, Twitter, Facebook, Linkedin, MessageCircle, Link, Check } from 'lucide-react'

interface ShareButtonsProps {
  url?: string
  title?: string
  description?: string
  className?: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Free WebP Compressor Online | CompressLab',
  description = 'Compress WebP images online, convert to JPG/PNG/AVIF. Batch process up to 20 files. No upload required, 100% free WebP tool.',
  className = ''
}) => {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const shareData = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    description: encodeURIComponent(description)
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${shareData.url}&text=${shareData.title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareData.url}`,
    whatsapp: `https://wa.me/?text=${shareData.title}%20${shareData.url}`
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleShare = (platform: string) => {
    if (platform === 'native' && typeof navigator !== 'undefined' && 'share' in navigator) {
      navigator.share({
        title: title,
        text: description,
        url: url,
      })
    } else if (platform === 'copy') {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
      }
    } else {
      if (typeof window !== 'undefined') {
        window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400')
      }
    }
    setIsOpen(false) // Close dropdown after sharing
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Share trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Share2 className="w-4 h-4" />
        <span className="font-medium">Share</span>
      </button>

      {/* Share options panel */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 min-w-[280px]">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Share to</h3>
            <p className="text-xs text-gray-500">Choose your preferred platform</p>
          </div>

          <div className="space-y-2">
            {/* Twitter share */}
            <button
              onClick={() => handleShare('twitter')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">Twitter</div>
                <div className="text-xs text-gray-500">Share on Twitter</div>
              </div>
            </button>

            {/* Facebook share */}
            <button
              onClick={() => handleShare('facebook')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">Facebook</div>
                <div className="text-xs text-gray-500">Share on Facebook</div>
              </div>
            </button>

            {/* LinkedIn share */}
            <button
              onClick={() => handleShare('linkedin')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">LinkedIn</div>
                <div className="text-xs text-gray-500">Share on LinkedIn</div>
              </div>
            </button>

            {/* WhatsApp share */}
            <button
              onClick={() => handleShare('whatsapp')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">WhatsApp</div>
                <div className="text-xs text-gray-500">Share on WhatsApp</div>
              </div>
            </button>

            {/* Copy link */}
            <button
              onClick={() => handleShare('copy')}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                {copied ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Link className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">
                  {copied ? 'Copied!' : 'Copy Link'}
                </div>
                <div className="text-xs text-gray-500">
                  {copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
                </div>
              </div>
            </button>

            {/* Native share (mobile) */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={() => handleShare('native')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">More Options</div>
                  <div className="text-xs text-gray-500">Use system share menu</div>
                </div>
              </button>
            )}
          </div>

          {/* Footer tip */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Help us spread the word about CompressLab
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShareButtons 