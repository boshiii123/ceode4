import { StrictPrecisionCompressor } from './StrictPrecisionCompressor'
import { FormatDetector, FormatInfo } from './FormatDetector'

export interface ProcessOptions {
  operation: 'compress' | 'convert'
  targetKB?: number
  outputFormat?: string
  quality?: number
  maxWidth?: number
  maxHeight?: number
  onProgress?: (progress: number) => void
}

export interface ProcessResult {
  file: File
  originalSize: number
  processedSize: number
  compressionRatio: number
  formatInfo: FormatInfo
  iterations?: number
  success: boolean
  processingTime: number
}

export class ImageProcessorV2 {
  /**
   * 处理图片 - 支持压缩和转换
   */
  static async processImage(
    file: File,
    options: ProcessOptions
  ): Promise<ProcessResult> {
    const startTime = Date.now()

    console.log(`🚀 Starting image processing: ${file.name} (${(file.size / 1024).toFixed(1)}KB)`)

    try {
      // 1. 检测格式
      const formatInfo = await FormatDetector.detectAdvancedFormat(file)
      console.log(`📋 Format detected: ${formatInfo.format} (${formatInfo.category})`)

      // 2. 验证操作可行性
      this.validateOperation(formatInfo, options)

      // 3. 执行处理
      let result: File
      let iterations = 0

      if (options.operation === 'compress') {
        if (options.targetKB) {
          // 精确压缩到目标大小
          const compressResult = await StrictPrecisionCompressor.compressToStrictSize(file, {
            targetKB: options.targetKB,
            maxWidth: options.maxWidth,
            maxHeight: options.maxHeight,
            outputFormat: options.outputFormat,
            onProgress: options.onProgress
          })

          result = compressResult.file
          iterations = compressResult.iterations

          if (!compressResult.success) {
            console.warn(`⚠️ Failed to strictly meet ${options.targetKB}KB target`)
          }
        } else {
          // 普通压缩
          result = await this.performStandardCompression(file, options)
        }
      } else {
        // 格式转换
        result = await this.performFormatConversion(file, options)
      }

      // 4. 计算结果
      const processedSize = result.size
      const compressionRatio = Math.round((1 - processedSize / file.size) * 100)
      const processingTime = Date.now() - startTime

      const success = options.operation === 'compress' && options.targetKB ?
        processedSize < (options.targetKB * 1024) :
        true

      console.log(`✅ Processing complete: ${(processedSize / 1024).toFixed(1)}KB, compression ${compressionRatio}%, time ${processingTime}ms`)

      return {
        file: result,
        originalSize: file.size,
        processedSize,
        compressionRatio,
        formatInfo,
        iterations,
        success,
        processingTime
      }

    } catch (error: any) {
      console.error('❌ Image processing failed:', error)
      throw new Error(`Image processing failed: ${error?.message || 'Unknown error'}`)
    }
  }

  /**
   * 验证操作的可行性
   */
  private static validateOperation(formatInfo: FormatInfo, options: ProcessOptions): void {
    if (!formatInfo.isSupported) {
      throw new Error(`Unsupported format: ${formatInfo.format}`)
    }

    if (options.operation === 'compress') {
      if (!FormatDetector.supportsCompression(formatInfo.format)) {
        throw new Error(`Format ${formatInfo.format} does not support compression`)
      }
    }

    if (options.operation === 'convert' && options.outputFormat) {
      if (!FormatDetector.supportsConversion(formatInfo.format, options.outputFormat)) {
        throw new Error(`Conversion from ${formatInfo.format} to ${options.outputFormat} is not supported`)
      }
    }
  }

  /**
   * 执行标准压缩（非精确大小）
   */
  private static async performStandardCompression(
    file: File,
    options: ProcessOptions
  ): Promise<File> {
    // 使用原有的 browser-image-compression，但增强参数计算
    const imageCompression = (await import('browser-image-compression')).default

    const fileSizeMB = file.size / (1024 * 1024)

    // 智能参数计算
    let compressOptions: any = {
      maxSizeMB: Math.max(0.1, fileSizeMB * 0.7), // 减少30%
      initialQuality: options.quality ? options.quality / 100 : 0.8,
      maxWidthOrHeight: Math.max(options.maxWidth || 1920, options.maxHeight || 1080),
      useWebWorker: true,
      onProgress: options.onProgress
    }

    // 根据文件大小调整策略
    if (fileSizeMB > 10) {
      compressOptions.maxSizeMB = 2
      compressOptions.initialQuality = 0.6
      compressOptions.maxWidthOrHeight = 1600
    } else if (fileSizeMB > 5) {
      compressOptions.maxSizeMB = 1
      compressOptions.initialQuality = 0.7
      compressOptions.maxWidthOrHeight = 1800
    }

    // 输出格式处理
    if (options.outputFormat && options.outputFormat !== this.getFileFormat(file)) {
      compressOptions.fileType = `image/${options.outputFormat}`
    }

    return await imageCompression(file, compressOptions)
  }

  /**
   * 执行格式转换
   */
  private static async performFormatConversion(
    file: File,
    options: ProcessOptions
  ): Promise<File> {
    if (!options.outputFormat) {
      throw new Error('Conversion operation requires output format to be specified')
    }

    const imageCompression = (await import('browser-image-compression')).default

    // 转换参数
    const convertOptions: any = {
      maxSizeMB: 50, // 保持原有质量
      initialQuality: options.quality ? options.quality / 100 : 0.9,
      maxWidthOrHeight: Math.max(options.maxWidth || 1920, options.maxHeight || 1080),
      useWebWorker: true,
      fileType: `image/${options.outputFormat}`,
      onProgress: options.onProgress
    }

    return await imageCompression(file, convertOptions)
  }

  /**
   * 批量处理图片
   */
  static async processBatch(
    files: File[],
    options: ProcessOptions,
    onProgress?: (current: number, total: number, fileName: string) => void
  ): Promise<ProcessResult[]> {
    const results: ProcessResult[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      onProgress?.(i + 1, files.length, file.name)

      try {
        const result = await this.processImage(file, {
          ...options,
          onProgress: (progress: number) => {
            // 单个文件的进度反馈
            const totalProgress = ((i + progress / 100) / files.length) * 100
            onProgress?.(i + 1, files.length, `${file.name} (${progress.toFixed(0)}%)`)
          }
        })

        results.push(result)
      } catch (error: any) {
        console.error(`Processing ${file.name} failed:`, error)

        // 添加失败结果
        results.push({
          file,
          originalSize: file.size,
          processedSize: file.size,
          compressionRatio: 0,
          formatInfo: {
            format: 'unknown',
            mimeType: file.type,
            extension: 'unknown',
            isSupported: false,
            category: 'raster',
            compression: 'lossy',
            features: []
          },
          success: false,
          processingTime: 0
        })
      }
    }

    return results
  }

  /**
   * 快速压缩到指定大小（批量）
   */
  static async quickCompressBatch(
    files: File[],
    targetKB: number,
    onProgress?: (current: number, total: number, fileName: string) => void
  ): Promise<ProcessResult[]> {
    console.log(`🎯 Batch quick compression to ${targetKB}KB`)

    return await this.processBatch(files, {
      operation: 'compress',
      targetKB
    }, onProgress)
  }

  /**
   * 获取文件格式
   */
  private static getFileFormat(file: File): string {
    return file.type.split('/')[1] || 'unknown'
  }

  /**
   * 格式化文件大小
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  /**
   * 获取压缩建议
   */
  static getCompressionSuggestion(
    file: File,
    formatInfo: FormatInfo
  ): {
    recommendedTargetKB: number[]
    suggestedOutputFormat: string
    compressionTips: string[]
  } {
    const fileSizeKB = file.size / 1024

    // 推荐目标大小
    let recommendedTargetKB: number[] = []
    if (fileSizeKB > 1000) {
      recommendedTargetKB = [100, 200, 300]
    } else if (fileSizeKB > 500) {
      recommendedTargetKB = [100, 200]
    } else if (fileSizeKB > 200) {
      recommendedTargetKB = [100]
    } else {
      recommendedTargetKB = [Math.floor(fileSizeKB * 0.7)]
    }

    // 推荐输出格式
    let suggestedOutputFormat = 'webp' // 默认推荐WebP
    if (formatInfo.format === 'avif') {
      suggestedOutputFormat = 'avif' // AVIF保持原格式
    } else if (formatInfo.features.includes('transparency')) {
      suggestedOutputFormat = 'png' // 有透明度的保持PNG
    }

    // 压缩建议
    const compressionTips: string[] = []
    if (formatInfo.format === 'bmp') {
      compressionTips.push('BMP格式文件通常很大，建议转换为现代格式')
    }
    if (formatInfo.format === 'png' && fileSizeKB > 500) {
      compressionTips.push('大尺寸PNG建议转换为WebP或AVIF格式')
    }
    if (formatInfo.category === 'raw') {
      compressionTips.push('RAW格式需要先转换为标准格式再压缩')
    }
    if (formatInfo.features.includes('animation')) {
      compressionTips.push('动画文件压缩时会保留第一帧')
    }

    return {
      recommendedTargetKB,
      suggestedOutputFormat,
      compressionTips
    }
  }
}
