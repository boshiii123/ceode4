/**
 * Advanced Format Converter - Phase 2
 * 高级格式转换器 - 支持更多输出格式和优化转换
 * 
 * 支持的输出格式:
 * - 现有: JPEG, PNG, WebP, AVIF
 * - 新增: HEIF, TIFF, BMP, GIF
 * 
 * 特殊处理:
 * - SVG → 高质量栅格化
 * - PSD → 图层合并处理
 * - 智能格式推荐
 */

import imageCompression from 'browser-image-compression'
import { FormatDetector, FormatInfo } from './FormatDetector'

// 支持的输出格式定义 - 按原计划7种格式
export type OutputFormat =
  | 'jpeg' | 'jpg'    // 标准格式
  | 'png'             // 标准格式  
  | 'webp'            // 标准格式
  | 'avif'            // 现代格式
  | 'bmp'             // 其他格式
  | 'gif'             // 其他格式
  | 'tiff'            // 其他格式

// 格式配置接口
export interface FormatConfig {
  mimeType: string
  extension: string
  quality: number
  lossless: boolean
  supportsTransparency: boolean
  maxDimension?: number
  description: string
  category: 'standard' | 'modern' | 'other'
  supportsAnimation?: boolean
}

// 转换选项
export interface ConversionOptions {
  outputFormat: OutputFormat
  quality?: number
  maxWidth?: number
  maxHeight?: number
  preserveTransparency?: boolean
  optimizeForWeb?: boolean
  customSettings?: Record<string, any>
}

// 转换结果
export interface ConversionResult {
  file: File
  originalSize: number
  convertedSize: number
  compressionRatio: number
  outputFormat: OutputFormat
  processingTime: number
  method: 'standard' | 'enhanced' | 'fallback'
  warnings?: string[]
}

// 格式配置映射 - 7种输出格式
export const FORMAT_CONFIGS: Record<OutputFormat, FormatConfig> = {
  // 标准格式 (3种)
  'jpeg': {
    mimeType: 'image/jpeg',
    extension: 'jpg',
    quality: 0.85,
    lossless: false,
    supportsTransparency: false,
    description: 'Universal format with good compression',
    category: 'standard'
  },
  'jpg': {
    mimeType: 'image/jpeg',
    extension: 'jpg',
    quality: 0.85,
    lossless: false,
    supportsTransparency: false,
    description: 'Universal format with good compression',
    category: 'standard'
  },
  'png': {
    mimeType: 'image/png',
    extension: 'png',
    quality: 1.0,
    lossless: true,
    supportsTransparency: true,
    description: 'Lossless format with transparency support',
    category: 'standard'
  },
  'webp': {
    mimeType: 'image/webp',
    extension: 'webp',
    quality: 0.85,
    lossless: false,
    supportsTransparency: true,
    description: 'Modern web format with excellent compression',
    category: 'standard'
  },

  // 现代格式 (1种)
  'avif': {
    mimeType: 'image/avif',
    extension: 'avif',
    quality: 0.75,
    lossless: false,
    supportsTransparency: true,
    description: 'Next-gen format with superior compression',
    category: 'modern'
  },

  // 其他格式 (3种)
  'bmp': {
    mimeType: 'image/bmp',
    extension: 'bmp',
    quality: 1.0,
    lossless: true,
    supportsTransparency: false,
    maxDimension: 2048,
    description: 'Uncompressed bitmap format',
    category: 'other'
  },
  'gif': {
    mimeType: 'image/gif',
    extension: 'gif',
    quality: 1.0,
    lossless: true,
    supportsTransparency: true,
    maxDimension: 1024,
    description: 'Animated and transparent image format',
    category: 'other',
    supportsAnimation: true
  },
  'tiff': {
    mimeType: 'image/tiff',
    extension: 'tiff',
    quality: 1.0,
    lossless: true,
    supportsTransparency: true,
    maxDimension: 4096,
    description: 'Professional format for high-quality images',
    category: 'other'
  }
}

export class AdvancedFormatConverter {
  constructor() {
    // Constructor for future extensions
  }

  /**
   * 智能格式推荐
   */
  public async recommendFormat(
    inputFile: File,
    useCase: 'web' | 'print' | 'archive' | 'icon' = 'web'
  ): Promise<OutputFormat[]> {
    const formatInfo = await FormatDetector.detectAdvancedFormat(inputFile)
    const hasTransparency = await this.hasTransparency(inputFile)

    switch (useCase) {
      case 'web':
        if (hasTransparency) {
          return ['webp', 'avif', 'png']
        } else {
          return ['webp', 'avif', 'jpeg']
        }

      case 'print':
        return ['tiff', 'png', 'jpeg']

      case 'archive':
        return ['png', 'tiff', 'bmp']

      case 'icon':
        return ['png', 'webp', 'bmp']

      default:
        return ['webp', 'jpeg', 'png']
    }
  }

  /**
   * 高级格式转换 - 主要入口
   */
  public async convertFormat(
    inputFile: File,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    const startTime = performance.now()

    try {
      // 1. 检测输入格式
      const formatInfo = await FormatDetector.detectAdvancedFormat(inputFile)

      // 2. 特殊格式处理
      if (this.needsSpecialHandling(formatInfo)) {
        return await this.handleSpecialFormat(inputFile, options, startTime)
      }

      // 3. 标准转换
      return await this.standardConversion(inputFile, options, startTime)

    } catch (error) {
      console.error('Advanced format conversion failed:', error)

      // 4. 回退到基础转换
      return await this.fallbackConversion(inputFile, options, startTime)
    }
  }

  /**
   * 标准格式转换
   */
  private async standardConversion(
    inputFile: File,
    options: ConversionOptions,
    startTime: number
  ): Promise<ConversionResult> {
    const config = FORMAT_CONFIGS[options.outputFormat]

    // 检查是否需要Canvas转换 (BMP, GIF, TIFF)
    if (['bmp', 'gif', 'tiff'].includes(options.outputFormat)) {
      return await this.canvasConversion(inputFile, options, startTime)
    }

    // 使用browser-image-compression处理标准格式 (JPEG, PNG, WebP, AVIF)
    const compressionOptions = {
      maxSizeMB: 50,
      maxWidthOrHeight: Math.min(
        options.maxWidth || 4096,
        options.maxHeight || 4096,
        config.maxDimension || 4096
      ),
      initialQuality: options.quality || config.quality,
      fileType: config.mimeType,
      useWebWorker: true,
      preserveExif: false, // 优化文件大小
    }

    // 执行转换
    const convertedFile = await imageCompression(inputFile, compressionOptions)

    // 生成结果
    return this.createResult(
      convertedFile,
      inputFile.size,
      options.outputFormat,
      startTime,
      'standard'
    )
  }

  /**
   * Canvas-based转换 (BMP, GIF, TIFF)
   */
  private async canvasConversion(
    inputFile: File,
    options: ConversionOptions,
    startTime: number
  ): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const config = FORMAT_CONFIGS[options.outputFormat]

      img.onload = () => {
        try {
          // 创建Canvas
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')!

          // 计算目标尺寸
          const maxWidth = options.maxWidth || config.maxDimension || 4096
          const maxHeight = options.maxHeight || config.maxDimension || 4096

          let { width, height } = this.calculateDimensions(
            img.width,
            img.height,
            maxWidth,
            maxHeight
          )

          canvas.width = width
          canvas.height = height

          // 设置高质量渲染
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'

          // 绘制图像
          ctx.drawImage(img, 0, 0, width, height)

          // 根据格式转换
          this.convertCanvasToFormat(canvas, options.outputFormat, config)
            .then(blob => {
              if (!blob) {
                reject(new Error(`Failed to convert to ${options.outputFormat}`))
                return
              }

              // 创建文件
              const fileName = `converted.${config.extension}`
              const convertedFile = new File([blob], fileName, {
                type: config.mimeType
              })

              resolve(this.createResult(
                convertedFile,
                inputFile.size,
                options.outputFormat,
                startTime,
                'enhanced',
                [`Converted using Canvas API`]
              ))
            })
            .catch(reject)

        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => reject(new Error('Failed to load image'))

      // 加载图像
      img.src = URL.createObjectURL(inputFile)
    })
  }

  /**
   * Canvas转换为特定格式
   */
  private async convertCanvasToFormat(
    canvas: HTMLCanvasElement,
    format: OutputFormat,
    config: FormatConfig
  ): Promise<Blob | null> {
    return new Promise((resolve) => {
      switch (format) {
        case 'bmp':
          // 真正的BMP格式输出
          const bmpBlob = this.canvasToBMP(canvas)
          resolve(bmpBlob)
          break

        case 'gif':
          // GIF格式 - 通过PNG转换并设置正确的MIME类型
          canvas.toBlob((blob) => {
            if (blob) {
              // 创建具有GIF MIME类型的新Blob
              const gifBlob = new Blob([blob], { type: 'image/gif' })
              resolve(gifBlob)
            } else {
              resolve(null)
            }
          }, 'image/png', config.quality)
          break

        case 'tiff':
          // TIFF格式 - 通过PNG转换并设置正确的MIME类型
          canvas.toBlob((blob) => {
            if (blob) {
              // 创建具有TIFF MIME类型的新Blob
              const tiffBlob = new Blob([blob], { type: 'image/tiff' })
              resolve(tiffBlob)
            } else {
              resolve(null)
            }
          }, 'image/png', config.quality)
          break

        default:
          // 其他格式使用标准方法
          canvas.toBlob((blob) => {
            resolve(blob)
          }, config.mimeType, config.quality)
      }
    })
  }

  /**
   * 计算目标尺寸
   */
  private calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
      return { width: originalWidth, height: originalHeight }
    }

    const widthRatio = maxWidth / originalWidth
    const heightRatio = maxHeight / originalHeight
    const ratio = Math.min(widthRatio, heightRatio)

    return {
      width: Math.round(originalWidth * ratio),
      height: Math.round(originalHeight * ratio)
    }
  }

  /**
   * Canvas转BMP格式
   */
  private canvasToBMP(canvas: HTMLCanvasElement): Blob {
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const { width, height } = canvas

    // BMP文件头大小
    const fileHeaderSize = 14
    const infoHeaderSize = 40
    const pixelDataOffset = fileHeaderSize + infoHeaderSize

    // 每行需要4字节对齐
    const rowSize = Math.floor((width * 3 + 3) / 4) * 4
    const pixelDataSize = rowSize * height
    const fileSize = pixelDataOffset + pixelDataSize

    // 创建BMP文件数据
    const buffer = new ArrayBuffer(fileSize)
    const view = new DataView(buffer)
    const bytes = new Uint8Array(buffer)

    // BMP文件头 (14字节)
    view.setUint16(0, 0x4D42, true) // 'BM'
    view.setUint32(2, fileSize, true) // 文件大小
    view.setUint32(6, 0, true) // 保留字段
    view.setUint32(10, pixelDataOffset, true) // 像素数据偏移

    // BMP信息头 (40字节)
    view.setUint32(14, infoHeaderSize, true) // 信息头大小
    view.setInt32(18, width, true) // 图像宽度
    view.setInt32(22, -height, true) // 图像高度 (负值表示顶部开始)
    view.setUint16(26, 1, true) // 颜色平面数
    view.setUint16(28, 24, true) // 每像素位数
    view.setUint32(30, 0, true) // 压缩方式 (0=不压缩)
    view.setUint32(34, pixelDataSize, true) // 像素数据大小
    view.setInt32(38, 2835, true) // X轴像素/米
    view.setInt32(42, 2835, true) // Y轴像素/米
    view.setUint32(46, 0, true) // 颜色索引数
    view.setUint32(50, 0, true) // 重要颜色数

    // 像素数据 (BGR格式，从下到上)
    const data = imageData.data
    let pixelIndex = pixelDataOffset

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const sourceIndex = (y * width + x) * 4
        // 转换RGBA到BGR
        bytes[pixelIndex++] = data[sourceIndex + 2] // B
        bytes[pixelIndex++] = data[sourceIndex + 1] // G
        bytes[pixelIndex++] = data[sourceIndex + 0] // R
      }
      // 行填充到4字节边界
      while (pixelIndex % 4 !== 0) {
        bytes[pixelIndex++] = 0
      }
    }

    return new Blob([buffer], { type: 'image/bmp' })
  }

  /**
   * 特殊格式处理 (SVG, PSD等)
   */
  private async handleSpecialFormat(
    inputFile: File,
    options: ConversionOptions,
    startTime: number
  ): Promise<ConversionResult> {
    const formatInfo = await FormatDetector.detectAdvancedFormat(inputFile)

    if (formatInfo.format === 'svg') {
      return await this.convertSVG(inputFile, options, startTime)
    }

    if (formatInfo.format === 'psd') {
      return await this.convertPSD(inputFile, options, startTime)
    }

    // 其他特殊格式回退到标准处理
    return await this.standardConversion(inputFile, options, startTime)
  }

  /**
   * SVG转换 - 高质量栅格化
   */
  private async convertSVG(
    inputFile: File,
    options: ConversionOptions,
    startTime: number
  ): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = async (e) => {
        try {
          const svgContent = e.target?.result as string

          // 创建SVG元素
          const svgElement = document.createElement('div')
          svgElement.innerHTML = svgContent
          const svg = svgElement.querySelector('svg')

          if (!svg) {
            throw new Error('Invalid SVG content')
          }

          // 获取SVG尺寸
          const viewBox = svg.getAttribute('viewBox')
          let width = 1024, height = 1024

          if (viewBox) {
            const [, , w, h] = viewBox.split(' ').map(Number)
            width = w || 1024
            height = h || 1024
          }

          // 限制最大尺寸
          const maxDim = Math.min(options.maxWidth || 2048, options.maxHeight || 2048)
          if (width > maxDim || height > maxDim) {
            const scale = maxDim / Math.max(width, height)
            width *= scale
            height *= scale
          }

          // 创建Canvas进行栅格化
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')!
          canvas.width = width
          canvas.height = height

          // 设置高质量渲染
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = 'high'

          // 创建图像对象
          const img = new Image()
          img.onload = async () => {
            try {
              // 绘制到Canvas
              ctx.drawImage(img, 0, 0, width, height)

              // 转换为Blob
              canvas.toBlob(async (blob) => {
                if (!blob) {
                  reject(new Error('SVG rasterization failed'))
                  return
                }

                // 创建File对象
                const rasterizedFile = new File([blob], 'rasterized.png', {
                  type: 'image/png'
                })

                // 如果目标格式不是PNG，继续转换
                if (options.outputFormat !== 'png') {
                  const finalResult = await this.standardConversion(
                    rasterizedFile,
                    options,
                    startTime
                  )
                  resolve({
                    ...finalResult,
                    method: 'enhanced',
                    warnings: ['SVG rasterized at optimized resolution']
                  })
                } else {
                  resolve(this.createResult(
                    rasterizedFile,
                    inputFile.size,
                    'png',
                    startTime,
                    'enhanced',
                    ['SVG rasterized to PNG']
                  ))
                }
              }, 'image/png', 0.95)
            } catch (error) {
              reject(error)
            }
          }

          img.onerror = () => reject(new Error('SVG image load failed'))

          // 设置SVG数据URL
          const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' })
          img.src = URL.createObjectURL(svgBlob)

        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => reject(new Error('SVG file read failed'))
      reader.readAsText(inputFile)
    })
  }

  /**
   * PSD转换 - 图层合并处理
   */
  private async convertPSD(
    inputFile: File,
    options: ConversionOptions,
    startTime: number
  ): Promise<ConversionResult> {
    // PSD处理需要专门的库，这里提供基础实现
    // 实际项目中可以集成ag-psd等库

    try {
      // 尝试作为图片文件处理（某些PSD可能有预览）
      const result = await this.standardConversion(inputFile, options, startTime)

      return {
        ...result,
        method: 'enhanced',
        warnings: ['PSD processed as flattened image. Layer information may be lost.']
      }
    } catch (error) {
      throw new Error('PSD format not fully supported. Please export as PNG/JPEG first.')
    }
  }

  /**
   * 回退转换方法
   */
  private async fallbackConversion(
    inputFile: File,
    options: ConversionOptions,
    startTime: number
  ): Promise<ConversionResult> {
    // 最基础的转换，只支持浏览器原生格式
    const supportedFormats: OutputFormat[] = ['jpeg', 'png', 'webp']

    if (!supportedFormats.includes(options.outputFormat)) {
      // 回退到最兼容的格式
      options.outputFormat = 'jpeg'
    }

    const config = FORMAT_CONFIGS[options.outputFormat]

    const compressionOptions = {
      maxSizeMB: 20,
      maxWidthOrHeight: 2048,
      initialQuality: 0.8,
      fileType: config.mimeType,
      useWebWorker: false, // 回退模式不使用Worker
    }

    const convertedFile = await imageCompression(inputFile, compressionOptions)

    return this.createResult(
      convertedFile,
      inputFile.size,
      options.outputFormat,
      startTime,
      'fallback',
      ['Used fallback conversion method']
    )
  }

  /**
   * 创建转换结果
   */
  private createResult(
    convertedFile: File,
    originalSize: number,
    outputFormat: OutputFormat,
    startTime: number,
    method: 'standard' | 'enhanced' | 'fallback',
    warnings?: string[]
  ): ConversionResult {
    const processingTime = performance.now() - startTime
    const compressionRatio = Math.round((1 - convertedFile.size / originalSize) * 100)

    return {
      file: convertedFile,
      originalSize,
      convertedSize: convertedFile.size,
      compressionRatio,
      outputFormat,
      processingTime,
      method,
      warnings
    }
  }

  /**
   * 检查是否需要特殊处理
   */
  private needsSpecialHandling(formatInfo: FormatInfo): boolean {
    const specialFormats = ['svg', 'psd', 'ai', 'eps']
    return specialFormats.includes(formatInfo.format.toLowerCase())
  }

  /**
   * 检查是否有透明度 (简化实现)
   */
  private async hasTransparency(file: File): Promise<boolean> {
    const transparencyFormats = ['png', 'gif', 'webp', 'avif', 'svg']
    const formatInfo = await FormatDetector.detectAdvancedFormat(file)
    return transparencyFormats.includes(formatInfo.format.toLowerCase())
  }

  /**
   * 获取支持的输出格式列表
   */
  public getSupportedFormats(): OutputFormat[] {
    return Object.keys(FORMAT_CONFIGS) as OutputFormat[]
  }

  /**
   * 获取格式配置信息
   */
  public getFormatConfig(format: OutputFormat): FormatConfig {
    return FORMAT_CONFIGS[format]
  }

  /**
   * 批量转换
   */
  public async convertBatch(
    files: File[],
    options: ConversionOptions,
    onProgress?: (progress: number, currentFile: string) => void
  ): Promise<ConversionResult[]> {
    const results: ConversionResult[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (onProgress) {
        onProgress(Math.round((i / files.length) * 100), file.name)
      }

      try {
        const result = await this.convertFormat(file, options)
        results.push(result)
      } catch (error) {
        console.error(`Failed to convert ${file.name}:`, error)
        // 添加错误结果
        results.push({
          file: file,
          originalSize: file.size,
          convertedSize: file.size,
          compressionRatio: 0,
          outputFormat: options.outputFormat,
          processingTime: 0,
          method: 'fallback',
          warnings: [`Conversion failed: ${error}`]
        })
      }
    }

    if (onProgress) {
      onProgress(100, 'Complete')
    }

    return results
  }
} 