'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function Analytics() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // 确保组件已挂载且在客户端
    if (mounted && typeof window !== 'undefined') {
      // 避免重复加载
      if (typeof window.gtag === 'function') return

      // 加载gtag脚本
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DPRB9HN0ED'
      document.head.appendChild(script)

      // 初始化gtag
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }

      window.gtag('js', new Date())
      window.gtag('config', 'G-DPRB9HN0ED')
    }
  }, [mounted])

  // 在服务端渲染和客户端首次渲染时都返回null
  if (!mounted) return null

  return null // 此组件不渲染任何内容
} 