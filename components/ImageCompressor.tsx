'use client'

import { useState, useCallback, useEffect } from 'react'
import imageCompression from 'browser-image-compression'
import { Download, Upload, X, Settings, Zap, RefreshCw, RotateCcw, CheckCircle, FileImage, Info, Sliders, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageProcessorV2, ProcessResult } from '../lib/ImageProcessorV2'
import { FormatDetector, FormatInfo } from '../lib/FormatDetector'

interface CompressedImage {
  file: File
  originalFile: File
  compressedFile: File
  compressedPreview: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
  preview: string
  originalFormat: string
  finalFormat: string
  operation: 'compress' | 'convert'
  settings: {
    quality: number
    targetFormat?: string
    quickCompressSize?: number
    maxWidth: number
    maxHeight: number
  }
  initialCompressedState?: {
    file: File
    preview: string
    size: number
    format: string
    compressionRatio: number
  }
  isConverting?: boolean
  // 新增字段 - V2引擎支持
  formatInfo?: FormatInfo
  processingTime?: number
  iterations?: number
  v2Processing?: boolean
}

const ImageCompressor = () => {
  const [images, setImages] = useState<CompressedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [maxHeight, setMaxHeight] = useState(1080)
  const [activeTab, setActiveTab] = useState<'compress' | 'convert'>('compress')
  const [targetFormat, setTargetFormat] = useState<'webp' | 'jpeg' | 'png' | 'avif'>('webp')
  const [conversionMode, setConversionMode] = useState<'lossy' | 'lossless'>('lossy')
  const [processingProgress, setProcessingProgress] = useState(0)
  const [convertingImageIndex, setConvertingImageIndex] = useState<number | null>(null)
  const [compressingImageIndex, setCompressingImageIndex] = useState<number | null>(null)
  const [selectedQuickSize, setSelectedQuickSize] = useState<number | null>(null)
  const [currentFileName, setCurrentFileName] = useState('')
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)
  const [uploadWarning, setUploadWarning] = useState('')
  const maxImages = 20

  const getFileFormat = (file: File): string => {
    return file.type.split('/')[1] || 'unknown'
  }

  const getFinalExtension = (format: string): string => {
    return format === 'jpeg' ? 'jpg' : format
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getOperationBadge = (image: CompressedImage) => {
    if (image.operation === 'compress') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
          <Zap className="w-3 h-3 mr-1" />
          Compressed
          {image.settings.quickCompressSize && ` to ${image.settings.quickCompressSize}KB`}
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
          <RefreshCw className="w-3 h-3 mr-1" />
          Converted to {image.settings.targetFormat?.toUpperCase()}
        </span>
      )
    }
  }

  const getFormatColor = (format: string) => {
    const colors = {
      webp: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      avif: 'bg-purple-50 text-purple-700 border-purple-200',
      jpeg: 'bg-orange-50 text-orange-700 border-orange-200',
      jpg: 'bg-orange-50 text-orange-700 border-orange-200',
      png: 'bg-blue-50 text-blue-700 border-blue-200',
      gif: 'bg-pink-50 text-pink-700 border-pink-200',
      bmp: 'bg-gray-50 text-gray-700 border-gray-200',
      tiff: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    }
    return colors[format.toLowerCase() as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  const handleFileInput = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // 检查数量限制
    const remainingSlots = maxImages - images.length

    if (remainingSlots <= 0) {
      setUploadWarning('Maximum 20 images reached. Please remove some images first.')
      event.target.value = '' // 重置文件输入
      return
    }

    let filesToProcess = files
    if (files.length > remainingSlots) {
      filesToProcess = files.slice(0, remainingSlots)
      setUploadWarning(`Only ${remainingSlots} more images allowed. ${files.length - remainingSlots} images were ignored.`)
    } else {
      setUploadWarning('')
    }

    setIsProcessing(true)
    setProcessingProgress(0)
    setTotalFiles(filesToProcess.length)

    const newImages: CompressedImage[] = []

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i]
      setCurrentFileName(file.name)
      setCurrentFileIndex(i + 1)

      try {
        // Create preview
        const preview = URL.createObjectURL(file)

        // 使用新的格式检测器
        const formatInfo = await FormatDetector.detectAdvancedFormat(file)
        const originalFormat = formatInfo.format

        console.log(`📁 Format detected: ${originalFormat} (${formatInfo.category})`)

        // 检查格式支持
        if (!formatInfo.isSupported) {
          console.warn(`⚠️ Unsupported format: ${originalFormat}`)
          continue // 跳过不支持的格式
        }

        // 使用V2引擎进行初始压缩
        let compressedFile: File
        let initialCompressionRatio: number

        try {
          const result = await ImageProcessorV2.processImage(file, {
            operation: 'compress',
            maxWidth,
            maxHeight,
            onProgress: (progress: number) => {
              const totalProgress = ((i + progress / 100) / filesToProcess.length) * 100
              setProcessingProgress(Math.round(totalProgress))
            }
          })

          compressedFile = result.file
          initialCompressionRatio = result.compressionRatio

          console.log(`✅ V2 engine processing successful: ${formatInfo.format} → ${(result.processedSize / 1024).toFixed(1)}KB`)

        } catch (v2Error) {
          console.warn(`⚠️ V2 engine failed, falling back to legacy method:`, v2Error)

          // 回退到传统压缩方法
          const fileSizeMB = file.size / (1024 * 1024)

          if (fileSizeMB > 5) {
            // Large files: aggressive compression
            compressedFile = await imageCompression(file, {
              maxSizeMB: 1,
              maxWidthOrHeight: 1600,
              useWebWorker: true,
              initialQuality: 0.6,
              onProgress: (progress: number) => {
                const totalProgress = ((i + progress / 100) / filesToProcess.length) * 100
                setProcessingProgress(Math.round(totalProgress))
              },
            })
          } else if (fileSizeMB > 2) {
            // Medium files: moderate compression
            compressedFile = await imageCompression(file, {
              maxSizeMB: 0.8,
              maxWidthOrHeight: Math.max(maxWidth, maxHeight),
              useWebWorker: true,
              initialQuality: 0.7,
              onProgress: (progress: number) => {
                const totalProgress = ((i + progress / 100) / filesToProcess.length) * 100
                setProcessingProgress(Math.round(totalProgress))
              },
            })
          } else {
            // Small files: light compression
            compressedFile = await imageCompression(file, {
              maxSizeMB: 10,
              maxWidthOrHeight: Math.max(maxWidth, maxHeight),
              useWebWorker: true,
              initialQuality: 0.8, // Fixed quality for small files
              onProgress: (progress: number) => {
                const totalProgress = ((i + progress / 100) / filesToProcess.length) * 100
                setProcessingProgress(Math.round(totalProgress))
              },
            })
          }

          initialCompressionRatio = Math.round((1 - compressedFile.size / file.size) * 100)
        }

        const compressedPreview = URL.createObjectURL(compressedFile)

        const imageData: CompressedImage = {
          file: compressedFile,
          originalFile: file,
          compressedFile,
          compressedPreview,
          originalSize: file.size,
          compressedSize: compressedFile.size,
          compressionRatio: initialCompressionRatio,
          preview,
          originalFormat,
          finalFormat: originalFormat,
          operation: 'compress',
          settings: {
            quality: 80, // Fixed quality value
            maxWidth,
            maxHeight,
          },
          initialCompressedState: {
            file: compressedFile,
            preview: compressedPreview,
            size: compressedFile.size,
            format: originalFormat,
            compressionRatio: initialCompressionRatio
          },
          // V2新增字段
          formatInfo,
          v2Processing: true
        }

        newImages.push(imageData)
      } catch (error: any) {
        console.error(`Processing file ${file.name} failed:`, error)
        // Error processing file - skip this file
      }
    }

    setImages(prev => [...prev, ...newImages])
    setIsProcessing(false)
    setProcessingProgress(0)
    setCurrentFileName('')
    setCurrentFileIndex(0)
    setTotalFiles(0)

    // Reset file input
    event.target.value = ''
  }, [maxWidth, maxHeight, images.length, maxImages])

  // 自动清理警告信息
  useEffect(() => {
    if (uploadWarning && images.length < maxImages) {
      const timer = setTimeout(() => setUploadWarning(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [images.length, uploadWarning, maxImages])

  const quickCompress = async (targetSizeKB: number) => {
    if (images.length === 0) return

    setSelectedQuickSize(targetSizeKB)
    setIsProcessing(true)
    setProcessingProgress(0)

    console.log(`🎯 Starting batch quick compression to ${targetSizeKB}KB`)

    try {
      // 准备文件列表
      const filesToProcess = images.map(img => img.originalFile)

      // 使用新的V2引擎进行批量处理
      const results = await ImageProcessorV2.quickCompressBatch(
        filesToProcess,
        targetSizeKB,
        (current, total, fileName) => {
          setCurrentFileName(fileName)
          setCurrentFileIndex(current)
          setTotalFiles(total)
          setCompressingImageIndex(current - 1)
          setProcessingProgress(Math.round((current / total) * 100))
        }
      )

      // 处理结果并更新状态
      const updatedImages = images.map((imageData, index) => {
        const result = results[index]

        if (result.success) {
          // 清理旧的预览
          if (imageData.compressedPreview && imageData.compressedPreview !== imageData.preview) {
            URL.revokeObjectURL(imageData.compressedPreview)
          }

          const compressedPreview = URL.createObjectURL(result.file)

          return {
            ...imageData,
            file: result.file,
            compressedFile: result.file,
            compressedPreview,
            compressedSize: result.processedSize,
            compressionRatio: result.compressionRatio,
            operation: 'compress' as const,
            settings: {
              ...imageData.settings,
              quickCompressSize: targetSizeKB,
            },
            // V2新增字段
            formatInfo: result.formatInfo,
            processingTime: result.processingTime,
            iterations: result.iterations,
            v2Processing: true
          }
        } else {
          // 处理失败，保持原文件
          console.error(`Compression of ${imageData.originalFile.name} failed`)
          return {
            ...imageData,
            operation: 'compress' as const,
            settings: {
              ...imageData.settings,
              quickCompressSize: targetSizeKB,
            }
          }
        }
      })

      setImages(updatedImages)

      // 统计结果
      const successCount = results.filter(r => r.success).length
      const failCount = results.length - successCount

      if (successCount === results.length) {
        console.log(`✅ All ${successCount} images compressed successfully`)
        // 这里可以添加成功通知
      } else {
        console.warn(`⚠️ ${successCount} successful, ${failCount} failed`)
        // 这里可以添加部分失败通知
      }

    } catch (error: any) {
      console.error('❌ Batch compression failed:', error)
      // 这里可以添加错误通知
    } finally {
      setIsProcessing(false)
      setProcessingProgress(0)
      setCompressingImageIndex(null)
      setCurrentFileName('')
      setCurrentFileIndex(0)
      setTotalFiles(0)
    }
  }

  // 备用方法：如果V2引擎失败，回退到原始方法
  const quickCompressLegacy = async (targetSizeKB: number) => {
    if (images.length === 0) return

    setSelectedQuickSize(targetSizeKB)
    setIsProcessing(true)
    setProcessingProgress(0)

    const updatedImages = [...images]

    for (let i = 0; i < updatedImages.length; i++) {
      setCompressingImageIndex(i)
      const imageData = updatedImages[i]

      try {
        const targetSizeBytes = targetSizeKB * 1024
        let bestResult = imageData.originalFile
        let bestSize = imageData.originalFile.size

        // Smart compression prediction based on original file size and target
        const originalSizeKB = imageData.originalFile.size / 1024
        const compressionNeeded = 1 - (targetSizeBytes / imageData.originalFile.size)

        // Advanced parameter calculation based on compression ratio needed
        let initialQuality = 0.8
        let maxDimension = Math.max(maxWidth, maxHeight)

        // Intelligent quality prediction based on target compression ratio
        if (compressionNeeded > 0.95) { // Need >95% compression (very aggressive)
          initialQuality = 0.15
          maxDimension = Math.min(800, maxDimension)
        } else if (compressionNeeded > 0.90) { // Need >90% compression
          initialQuality = 0.25
          maxDimension = Math.min(1000, maxDimension)
        } else if (compressionNeeded > 0.80) { // Need >80% compression
          initialQuality = 0.35
          maxDimension = Math.min(1200, maxDimension)
        } else if (compressionNeeded > 0.70) { // Need >70% compression
          initialQuality = 0.45
          maxDimension = Math.min(1400, maxDimension)
        } else if (compressionNeeded > 0.50) { // Need >50% compression
          initialQuality = 0.6
          maxDimension = Math.min(1600, maxDimension)
        } else { // Light compression needed
          initialQuality = 0.8
        }

        // Target compression parameters calculated

        // Step 1: Strict binary search for optimal quality (MUST NOT EXCEED TARGET)
        let minQuality = 0.05
        let maxQuality = initialQuality
        let attempts = 0
        const maxAttempts = 12 // Increased attempts for better precision

        setProcessingProgress(Math.round((i / images.length) * 100))

        while (attempts < maxAttempts && bestSize > targetSizeBytes) {
          const currentQuality = (minQuality + maxQuality) / 2

          try {
            const result = await imageCompression(imageData.originalFile, {
              maxSizeMB: 50,
              initialQuality: currentQuality,
              maxWidthOrHeight: maxDimension,
              useWebWorker: true,
              onProgress: (progress: number) => {
                const totalProgress = ((i + (attempts * 0.06) + progress * 0.06 / 100) / images.length) * 100
                setProcessingProgress(Math.round(totalProgress))
              },
            })

            // Compression attempt completed

            if (result.size <= targetSizeBytes) {
              // Result meets requirement, try higher quality for better result
              bestResult = result
              bestSize = result.size
              minQuality = currentQuality
            } else {
              // Result exceeds target, must lower quality
              maxQuality = currentQuality
            }

            attempts++
          } catch (error) {
            // Compression attempt failed
            break
          }
        }

        // Step 2: Dimension reduction if still over target
        if (bestSize > targetSizeBytes) {
          // Still over target, trying dimension reduction

          let dimensionAttempts = 0
          let currentDimension = maxDimension

          while (dimensionAttempts < 5 && bestSize > targetSizeBytes && currentDimension > 200) {
            currentDimension = Math.max(200, Math.round(currentDimension * 0.8))

            try {
              const result = await imageCompression(imageData.originalFile, {
                maxSizeMB: 50,
                initialQuality: 0.3,
                maxWidthOrHeight: currentDimension,
                useWebWorker: true,
                onProgress: (progress: number) => {
                  const totalProgress = ((i + 0.7 + (dimensionAttempts * 0.05) + progress * 0.05 / 100) / images.length) * 100
                  setProcessingProgress(Math.round(totalProgress))
                },
              })

              // Dimension reduction attempt completed

              if (result.size <= targetSizeBytes) {
                bestResult = result
                bestSize = result.size
                break
              }

              dimensionAttempts++
            } catch (error) {
              // Dimension reduction failed
              break
            }
          }
        }

        // Step 3: Final aggressive compression if still over target
        if (bestSize > targetSizeBytes) {
          // Final aggressive compression attempt

          let finalAttempts = 0
          let finalQuality = 0.1

          while (finalAttempts < 3 && bestSize > targetSizeBytes && finalQuality > 0.02) {
            try {
              const result = await imageCompression(imageData.originalFile, {
                maxSizeMB: 50,
                initialQuality: finalQuality,
                maxWidthOrHeight: Math.max(150, Math.round(maxDimension * 0.4)),
                useWebWorker: true,
                onProgress: (progress: number) => {
                  const totalProgress = ((i + 0.9 + (finalAttempts * 0.03) + progress * 0.03 / 100) / images.length) * 100
                  setProcessingProgress(Math.round(totalProgress))
                },
              })

              // Final compression attempt completed

              if (result.size <= targetSizeBytes) {
                bestResult = result
                bestSize = result.size
                break
              }

              finalQuality *= 0.7
              finalAttempts++
            } catch (error) {
              // Final aggressive compression failed
              break
            }
          }
        }

        // Final verification - CRITICAL: Must not exceed target
        // Final verification completed
        // Note: If bestSize > targetSizeBytes, compression target not fully achieved

        // Clean up old preview if it exists
        if (imageData.compressedPreview && imageData.compressedPreview !== imageData.preview) {
          URL.revokeObjectURL(imageData.compressedPreview)
        }

        const compressedPreview = URL.createObjectURL(bestResult)
        const finalCompressionRatio = Math.round((1 - bestResult.size / imageData.originalSize) * 100)

        updatedImages[i] = {
          ...imageData,
          file: bestResult,
          compressedFile: bestResult,
          compressedPreview,
          compressedSize: bestResult.size,
          compressionRatio: finalCompressionRatio,
          operation: 'compress',
          settings: {
            ...imageData.settings,
            quickCompressSize: targetSizeKB,
          }
        }

        // 立即更新单个图片状态
        setImages(prev => prev.map((img, idx) =>
          idx === i ? updatedImages[i] : img
        ))

      } catch (error) {
        // Error compressing image - keep original file on error
        updatedImages[i] = {
          ...imageData,
          operation: 'compress',
          settings: {
            ...imageData.settings,
            quickCompressSize: targetSizeKB,
          }
        }

        // 立即更新错误状态
        setImages(prev => prev.map((img, idx) =>
          idx === i ? updatedImages[i] : img
        ))
      }

      // Update progress for completed image
      const totalProgress = ((i + 1) / images.length) * 100
      setProcessingProgress(Math.round(totalProgress))
    }

    // 不再需要最后的批量更新，因为已经实时更新了
    setCompressingImageIndex(null)
    setIsProcessing(false)
    setProcessingProgress(0)

    // Clear any lingering conversion states
    setConvertingImageIndex(null)

    setTimeout(() => setSelectedQuickSize(null), 2000)
  }

  const convertAllImages = async (newFormat: 'webp' | 'jpeg' | 'png' | 'avif') => {
    if (images.length === 0) return

    setIsProcessing(true)
    setProcessingProgress(0)

    const updatedImages = [...images]

    for (let i = 0; i < updatedImages.length; i++) {
      setConvertingImageIndex(i)
      const imageData = updatedImages[i]

      try {
        const sourceFile = conversionMode === 'lossless' ? imageData.originalFile : imageData.compressedFile

        const options = {
          maxSizeMB: 10,
          maxWidthOrHeight: Math.max(maxWidth, maxHeight),
          useWebWorker: true,
          initialQuality: 0.9,
          fileType: `image/${newFormat}`,
          onProgress: (progress: number) => {
            const totalProgress = ((i + progress / 100) / images.length) * 100
            setProcessingProgress(Math.round(totalProgress))
          },
        }

        const convertedFile = await imageCompression(sourceFile, options)
        const convertedPreview = URL.createObjectURL(convertedFile)
        const convertedCompressionRatio = Math.round((1 - convertedFile.size / imageData.originalSize) * 100)

        updatedImages[i] = {
          ...imageData,
          file: convertedFile,
          compressedFile: convertedFile,
          compressedPreview: convertedPreview,
          compressedSize: convertedFile.size,
          compressionRatio: convertedCompressionRatio,
          finalFormat: newFormat,
          operation: 'convert',
          settings: {
            ...imageData.settings,
            targetFormat: newFormat,
          }
        }

        // 立即更新单个图片状态
        setImages(prev => prev.map((img, idx) =>
          idx === i ? updatedImages[i] : img
        ))

      } catch (error) {
        // Error converting image - update error state immediately
        setImages(prev => prev.map((img, idx) =>
          idx === i ? { ...img, isConverting: false } : img
        ))
      }
    }

    // 不再需要最后的批量更新，因为已经实时更新了
    setConvertingImageIndex(null)
    setIsProcessing(false)
    setProcessingProgress(0)
  }

  const downloadImage = (image: CompressedImage) => {
    const link = document.createElement('a')
    link.href = image.compressedPreview
    const extension = getFinalExtension(image.finalFormat)
    const baseName = image.originalFile.name.replace(/\.[^/.]+$/, '')
    link.download = `${baseName}_compressed.${extension}`
    link.click()
  }

  const downloadAll = () => {
    images.forEach((image, index) => {
      setTimeout(() => downloadImage(image), index * 100)
    })
  }

  const clearAll = () => {
    images.forEach(image => {
      URL.revokeObjectURL(image.preview)
      URL.revokeObjectURL(image.compressedPreview)
    })
    setImages([])
    setUploadWarning('') // 清理警告信息
  }

  const removeImage = (index: number) => {
    const image = images[index]
    URL.revokeObjectURL(image.preview)
    URL.revokeObjectURL(image.compressedPreview)
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const convertSingleImage = async (imageIndex: number, newFormat: 'webp' | 'jpeg' | 'png' | 'avif') => {
    // 设置转换状态 - 使用函数式更新
    setImages(prev => prev.map((img, idx) =>
      idx === imageIndex ? { ...img, isConverting: true } : img
    ))

    try {
      const imageData = images[imageIndex]
      // 快速转换按钮始终基于压缩后的图片进行有损转换
      const sourceFile = imageData.compressedFile

      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        useWebWorker: true,
        initialQuality: 0.85, // 使用较高质量进行快速转换
        fileType: `image/${newFormat}`,
      }

      const convertedFile = await imageCompression(sourceFile, options)
      const convertedPreview = URL.createObjectURL(convertedFile)
      const convertedCompressionRatio = Math.round((1 - convertedFile.size / imageData.originalSize) * 100)

      // 完成转换 - 使用函数式更新
      setImages(prev => prev.map((img, idx) =>
        idx === imageIndex ? {
          ...img,
          file: convertedFile,
          compressedFile: convertedFile,
          compressedPreview: convertedPreview,
          compressedSize: convertedFile.size,
          compressionRatio: convertedCompressionRatio,
          finalFormat: newFormat,
          operation: 'convert',
          settings: {
            ...img.settings,
            targetFormat: newFormat,
          },
          isConverting: false
        } : img
      ))
    } catch (error) {
      // Error converting image - restore original state
      setImages(prev => prev.map((img, idx) =>
        idx === imageIndex ? { ...img, isConverting: false } : img
      ))
    }
  }

  const resetImage = (imageIndex: number) => {
    const updatedImages = [...images]
    const imageData = updatedImages[imageIndex]

    if (imageData.initialCompressedState) {
      // 清理当前预览URL（如果不同于初始状态的预览）
      if (imageData.compressedPreview && imageData.compressedPreview !== imageData.initialCompressedState.preview) {
        URL.revokeObjectURL(imageData.compressedPreview)
      }

      // 创建新的预览URL以确保显示正确
      const resetPreview = URL.createObjectURL(imageData.initialCompressedState.file)

      updatedImages[imageIndex] = {
        ...imageData,
        file: imageData.initialCompressedState.file,
        compressedFile: imageData.initialCompressedState.file,
        compressedPreview: resetPreview,
        compressedSize: imageData.initialCompressedState.size,
        finalFormat: imageData.initialCompressedState.format,
        compressionRatio: imageData.initialCompressedState.compressionRatio,
        operation: 'compress',
        settings: {
          ...imageData.settings,
          targetFormat: undefined,
          quickCompressSize: undefined,
        },
        isConverting: false
      }

      setImages(updatedImages)
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-12">
        {/* Simplified Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Start Compressing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your images and choose your compression settings
          </p>
        </div>

        {/* Mobile Quick Actions Bar - Fixed at top on mobile */}
        <div className="lg:hidden mb-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 sticky top-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-500" />
              Quick Compress
            </h3>
            {isProcessing && compressingImageIndex !== null && (
              <div className="flex items-center text-xs text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2"></div>
                Processing...
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[100, 200, 300].map((size) => (
              <button
                key={size}
                onClick={() => quickCompress(size)}
                disabled={images.length === 0 || isProcessing}
                className={`py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${selectedQuickSize === size
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
              >
                {size}KB
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Tap to compress all images to target size
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Panel - Improved Design */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 sticky top-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-3">
                  <Sliders className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Tools
                </h3>
              </div>

              {/* Improved Tab Navigation */}
              <div className="mb-8">
                <div className="flex p-1 bg-gray-100 rounded-2xl">
                  <button
                    onClick={() => setActiveTab('compress')}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'compress'
                      ? 'bg-white text-blue-600 shadow-lg shadow-blue-500/10'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <div className="flex items-center justify-center">
                      <Zap className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Compress</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('convert')}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'convert'
                      ? 'bg-white text-green-600 shadow-lg shadow-green-500/10'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <div className="flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Convert</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Compress Tab Content */}
                {activeTab === 'compress' && (
                  <div className="space-y-6">
                    {/* Quick Compress Buttons */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-blue-500" />
                          Quick Compress
                        </label>
                        {isProcessing && compressingImageIndex !== null && (
                          <div className="flex items-center text-xs text-blue-600">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2"></div>
                            Processing...
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[100, 200, 300].map((size) => (
                          <button
                            key={size}
                            onClick={() => quickCompress(size)}
                            disabled={images.length === 0 || isProcessing}
                            className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${selectedQuickSize === size
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            {size}KB
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3 text-center">
                        One-click compression to target size
                      </p>
                    </div>

                    {/* Dimension Settings */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                          <Settings className="w-4 h-4 mr-2 text-blue-500" />
                          Image Dimensions
                        </label>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-xs text-blue-700 flex items-center mb-1">
                          <span className="mr-1">💡</span>
                          Limits image size for web optimization
                        </p>
                        <p className="text-xs text-blue-600">
                          ✅ Used by: Initial compression & format conversion
                        </p>
                        <p className="text-xs text-gray-500">
                          ❌ Not used by: Quick compress (uses smart sizing)
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Max Width: {maxWidth}px
                          </label>
                          <input
                            type="range"
                            min="100"
                            max="4000"
                            step="100"
                            value={maxWidth}
                            onChange={(e) => setMaxWidth(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Max Height: {maxHeight}px
                          </label>
                          <input
                            type="range"
                            min="100"
                            max="4000"
                            step="100"
                            value={maxHeight}
                            onChange={(e) => setMaxHeight(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Convert Tab Content */}
                {activeTab === 'convert' && (
                  <div className="space-y-6">
                    {/* Conversion Mode */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2 text-green-500" />
                        Conversion Mode
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-300">
                          <input
                            type="radio"
                            name="conversionMode"
                            value="lossy"
                            checked={conversionMode === 'lossy'}
                            onChange={(e) => {
                              setConversionMode(e.target.value as 'lossy')
                              if (images.length > 0) {
                                convertAllImages(targetFormat)
                              }
                            }}
                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="text-sm font-medium text-gray-900">🔥 Lossy</div>
                            <div className="text-xs text-gray-500">Smaller file size</div>
                          </div>
                        </label>
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-300">
                          <input
                            type="radio"
                            name="conversionMode"
                            value="lossless"
                            checked={conversionMode === 'lossless'}
                            onChange={(e) => {
                              setConversionMode(e.target.value as 'lossless')
                              if (images.length > 0) {
                                convertAllImages(targetFormat)
                              }
                            }}
                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="text-sm font-medium text-gray-900">💎 Lossless</div>
                            <div className="text-xs text-gray-500">Higher quality</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Target Format Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-gray-700">
                          Target Format
                        </label>
                        {isProcessing && convertingImageIndex !== null && (
                          <div className="flex items-center text-xs text-green-600">
                            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse mr-2"></div>
                            Converting...
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {['webp', 'jpeg', 'png', 'avif'].map((format) => (
                          <button
                            key={format}
                            onClick={() => {
                              const newFormat = format as 'webp' | 'jpeg' | 'png' | 'avif'
                              setTargetFormat(newFormat)
                              if (images.length > 0) {
                                convertAllImages(newFormat)
                              }
                            }}
                            disabled={isProcessing}
                            className={`py-3 px-2 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${targetFormat === format
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            {format.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Convert All Button */}
                    <button
                      onClick={() => convertAllImages(targetFormat)}
                      disabled={images.length === 0 || isProcessing}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-[1.02] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Convert All to {targetFormat.toUpperCase()}
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                {images.length > 0 && (
                  <div className="space-y-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={downloadAll}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-[1.02] flex items-center justify-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download All ({images.length})
                    </button>
                    <button
                      onClick={clearAll}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 font-semibold py-3 px-4 rounded-xl transition-all duration-200 border border-gray-300 hover:border-gray-400 flex items-center justify-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Upload Area with Integrated Progress */}
            <div className="mb-6">
              <div
                className={`p-8 text-center border-2 border-solid rounded-3xl backdrop-blur-sm shadow-xl transition-all duration-300 ${isProcessing
                  ? 'border-blue-400 bg-blue-50/50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 bg-white/70'
                  }`}
              >
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    {isProcessing ? (
                      <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {isProcessing ? 'Processing Images...' : 'Upload Your Images'}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {isProcessing
                      ? `Processing ${currentFileName} (${currentFileIndex}/${totalFiles})`
                      : 'Drag and drop your images here, or click to browse'
                    }
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Maximum 20 images • Current: {images.length}/20
                  </p>
                  {uploadWarning && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-700 flex items-center">
                        <span className="mr-2">⚠️</span>
                        {uploadWarning}
                      </p>
                    </div>
                  )}

                  {/* Progress Bar */}
                  {isProcessing && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-600">Progress</span>
                        <span className="text-sm font-bold text-blue-600">{processingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out rounded-full"
                          style={{ width: `${processingProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <input
                    type="file"
                    multiple
                    accept="image/*,.avif,.heif,.heic,.psd,.cr2,.dng,.raw,.tiff,.tif"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                    disabled={isProcessing || images.length >= maxImages}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`inline-flex items-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer ${isProcessing || images.length >= maxImages
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed transform-none'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-blue-500/25'
                      }`}
                  >
                    <FileImage className="w-4 h-4 mr-2" />
                    {isProcessing ? 'Processing...' : images.length >= maxImages ? 'Maximum Reached' : 'Choose Files'}
                  </label>
                  <p className="text-sm text-gray-500 mt-3">
                    Supports: JPG, PNG, GIF, WebP, AVIF, HEIF, BMP, TIFF, SVG, PSD, RAW, DNG, CR2
                  </p>
                </div>
              </div>
            </div>

            {/* Results List - Clean & Compact */}
            {images.length > 0 && (
              <>
                {/* Mobile Horizontal Scroll View - Optimized */}
                <div className="lg:hidden relative">
                  {/* Navigation Arrows - Only show when there are multiple images */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => {
                          const container = document.getElementById('mobile-image-container');
                          if (container) {
                            container.scrollBy({ left: -336, behavior: 'smooth' });
                            // Update index after scroll animation
                            setTimeout(() => {
                              const scrollLeft = container.scrollLeft;
                              const cardWidth = 336; // card width + gap
                              const currentIndex = Math.round(scrollLeft / cardWidth) + 1;
                              const indexElement = document.getElementById('current-image-index');
                              if (indexElement) {
                                indexElement.textContent = Math.min(Math.max(currentIndex, 1), images.length).toString();
                              }
                            }, 300);
                          }
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 shadow-lg transition-all duration-200 border border-gray-200"
                        title="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => {
                          const container = document.getElementById('mobile-image-container');
                          if (container) {
                            container.scrollBy({ left: 336, behavior: 'smooth' });
                            // Update index after scroll animation
                            setTimeout(() => {
                              const scrollLeft = container.scrollLeft;
                              const cardWidth = 336; // card width + gap
                              const currentIndex = Math.round(scrollLeft / cardWidth) + 1;
                              const indexElement = document.getElementById('current-image-index');
                              if (indexElement) {
                                indexElement.textContent = Math.min(Math.max(currentIndex, 1), images.length).toString();
                              }
                            }, 300);
                          }
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 shadow-lg transition-all duration-200 border border-gray-200"
                        title="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter with Current Position */}
                  {images.length > 1 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
                      <span id="current-image-index">1</span> / {images.length}
                    </div>
                  )}

                  <div
                    id="mobile-image-container"
                    className="flex space-x-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide"
                    onScroll={(e) => {
                      // Calculate current visible image index based on scroll position
                      const container = e.target as HTMLElement;
                      const scrollLeft = container.scrollLeft;
                      const cardWidth = 336; // card width (320) + gap (16)
                      const currentIndex = Math.round(scrollLeft / cardWidth) + 1;
                      const indexElement = document.getElementById('current-image-index');
                      if (indexElement) {
                        indexElement.textContent = Math.min(Math.max(currentIndex, 1), images.length).toString();
                      }
                    }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-xl flex-shrink-0 w-80 snap-center ${convertingImageIndex === index || image.isConverting ? 'ring-2 ring-green-400 shadow-green-100' : ''
                          } ${compressingImageIndex === index ? 'ring-2 ring-blue-400 shadow-blue-100' : ''}`}
                      >
                        <div className="p-4">
                          <div className="flex flex-col space-y-4">
                            {/* Image Preview - Medium size for mobile */}
                            <div className="relative w-full h-40 flex-shrink-0">
                              <div className="w-full h-full relative overflow-hidden bg-gray-100 rounded-xl shadow-sm">
                                {(convertingImageIndex === index || compressingImageIndex === index || image.isConverting) && (
                                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                                    {(convertingImageIndex === index || image.isConverting) && (
                                      <RefreshCw className="w-5 h-5 animate-spin text-green-400" />
                                    )}
                                    {compressingImageIndex === index && (
                                      <Zap className="w-5 h-5 animate-spin text-blue-400" />
                                    )}
                                  </div>
                                )}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={image.compressedPreview}
                                  alt={`Compressed ${image.originalFile.name}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            </div>

                            {/* File Info - Mobile optimized */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-medium text-gray-900 truncate flex-1 mr-2">
                                  {image.originalFile.name}
                                </h3>
                                {/* Status Badge */}
                                {compressingImageIndex === index ? (
                                  <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    <Zap className="w-3 h-3 mr-1 animate-spin" />
                                    Compressing
                                  </div>
                                ) : (convertingImageIndex === index || image.isConverting) ? (
                                  <div className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                                    Converting
                                  </div>
                                ) : image.operation === 'convert' ? (
                                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Converted
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Compressed
                                  </div>
                                )}
                              </div>

                              <div className="space-y-2 text-xs text-gray-600 mb-4">
                                <div className="flex items-center justify-center space-x-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${getFormatColor(image.originalFormat)}`}>
                                    {image.originalFormat.toUpperCase()}
                                  </span>
                                  <span className="text-gray-400">→</span>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${getFormatColor(image.finalFormat)}`}>
                                    {image.finalFormat.toUpperCase()}
                                  </span>
                                </div>
                                <div className="text-center">
                                  <div className="text-gray-500 mb-1">Size: {formatFileSize(image.originalSize)} → {formatFileSize(image.compressedSize)}</div>
                                </div>
                                <div className="text-green-600 font-bold text-center text-sm bg-green-50 py-2 px-3 rounded-lg">
                                  {image.compressionRatio}% space saved
                                </div>
                              </div>

                              {/* Format Conversion Buttons - Larger for mobile */}
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  {['webp', 'jpeg', 'png', 'avif'].map((format) => (
                                    <button
                                      key={format}
                                      onClick={() => convertSingleImage(index, format as 'webp' | 'jpeg' | 'png' | 'avif')}
                                      disabled={image.isConverting || isProcessing}
                                      className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${image.finalFormat === format
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                      {format.toUpperCase()}
                                    </button>
                                  ))}
                                </div>

                                {/* Action Buttons - Larger for mobile */}
                                <div className="grid grid-cols-3 gap-2">
                                  <button
                                    onClick={() => resetImage(index)}
                                    disabled={image.isConverting || isProcessing}
                                    className="flex items-center justify-center px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 hover:border-gray-400"
                                    title="Reset to original"
                                  >
                                    <RotateCcw className="w-4 h-4 mr-1" />
                                    <span className="text-xs font-medium">Reset</span>
                                  </button>

                                  <button
                                    onClick={() => downloadImage(image)}
                                    className="flex items-center justify-center px-3 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 shadow-md"
                                    title="Download image"
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    <span className="text-xs font-medium">Download</span>
                                  </button>

                                  <button
                                    onClick={() => removeImage(index)}
                                    className="flex items-center justify-center px-3 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md"
                                    title="Remove image"
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    <span className="text-xs font-medium">Remove</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Vertical List */}
                <div className="hidden lg:block space-y-3">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-xl ${convertingImageIndex === index || image.isConverting ? 'ring-2 ring-green-400 shadow-green-100' : ''
                        } ${compressingImageIndex === index ? 'ring-2 ring-blue-400 shadow-blue-100' : ''}`}
                    >
                      <div className="p-5">
                        <div className="flex items-center gap-4">
                          {/* Image Preview - Professional Size */}
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <div className="w-full h-full relative overflow-hidden bg-gray-100 rounded-xl shadow-sm">
                              {(convertingImageIndex === index || compressingImageIndex === index || image.isConverting) && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                                  {(convertingImageIndex === index || image.isConverting) && (
                                    <RefreshCw className="w-4 h-4 animate-spin text-green-400" />
                                  )}
                                  {compressingImageIndex === index && (
                                    <Zap className="w-4 h-4 animate-spin text-blue-400" />
                                  )}
                                </div>
                              )}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={image.compressedPreview}
                                alt={`Compressed ${image.originalFile.name}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* File Info - Compact */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-2">
                              <h3 className="text-sm font-medium text-gray-900 truncate mr-3">
                                {image.originalFile.name}
                              </h3>
                              {/* Dynamic Status Display */}
                              {compressingImageIndex === index ? (
                                <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                  <Zap className="w-3 h-3 mr-1 animate-spin" />
                                  Compressing...
                                </div>
                              ) : (convertingImageIndex === index || image.isConverting) ? (
                                <div className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                                  Converting...
                                </div>
                              ) : image.operation === 'convert' ? (
                                <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  ✅ Converted to {image.finalFormat.toUpperCase()}
                                </div>
                              ) : (
                                <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  ✅ Compressed
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getFormatColor(image.originalFormat)}`}>
                                  {image.originalFormat.toUpperCase()}
                                </span>
                                <span>→</span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getFormatColor(image.finalFormat)}`}>
                                  {image.finalFormat.toUpperCase()}
                                </span>
                              </div>
                              <div>{formatFileSize(image.originalSize)} → {formatFileSize(image.compressedSize)}</div>
                              <div className="text-green-600 font-medium">{image.compressionRatio}% saved</div>
                            </div>

                            {/* Format Conversion Buttons - Professional */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-2">
                                {['webp', 'jpeg', 'png', 'avif'].map((format) => (
                                  <button
                                    key={format}
                                    onClick={() => convertSingleImage(index, format as 'webp' | 'jpeg' | 'png' | 'avif')}
                                    disabled={image.isConverting || isProcessing}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${image.finalFormat === format
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 hover:border-gray-400'
                                      }`}
                                  >
                                    {image.isConverting && format === image.finalFormat ? (
                                      <div className="flex items-center">
                                        <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                                        <span className="text-xs">Converting</span>
                                      </div>
                                    ) : (
                                      format.toUpperCase()
                                    )}
                                  </button>
                                ))}
                              </div>

                              {/* Action Buttons - Professional */}
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => resetImage(index)}
                                  disabled={image.isConverting || isProcessing}
                                  className="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 hover:border-gray-400"
                                  title="Reset to original compressed state"
                                >
                                  <RotateCcw className="w-3 h-3 mr-1" />
                                  <span className="text-xs font-medium">Reset</span>
                                </button>

                                <button
                                  onClick={() => downloadImage(image)}
                                  className="flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 shadow-md"
                                  title="Download compressed image"
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  <span className="text-xs font-medium">Download</span>
                                </button>

                                <button
                                  onClick={() => removeImage(index)}
                                  className="flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md"
                                  title="Remove from list"
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  <span className="text-xs font-medium">Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Empty State */}
            {images.length === 0 && !isProcessing && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileImage className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Compress</h3>
                <p className="text-gray-600 mb-6">
                  Upload images to start compressing and converting
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-gray-700">Precise Size Control</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-gray-700">Format Conversion</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm border">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-gray-700">Batch Processing</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCompressor 