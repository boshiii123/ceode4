import imageCompression from 'browser-image-compression'

interface CompressionOptions {
  targetKB: number
  maxWidth?: number
  maxHeight?: number
  outputFormat?: string
  onProgress?: (progress: number) => void
}

interface CompressionResult {
  file: File
  actualKB: number
  compressionRatio: number
  iterations: number
  success: boolean
}

export class StrictPrecisionCompressor {
  private static readonly SAFETY_MARGIN = 2 // 2KB安全边距
  private static readonly OPTIMAL_RANGE = 4 // 4KB最优范围
  private static readonly MAX_ITERATIONS = 20
  private static readonly TOLERANCE = 1 // 1KB容差

  /**
   * 严格压缩到指定大小，确保结果严格小于目标值
   * @param file 原始文件
   * @param options 压缩选项
   * @returns 压缩结果
   */
  static async compressToStrictSize(
    file: File,
    options: CompressionOptions
  ): Promise<CompressionResult> {
    const { targetKB, maxWidth = 1920, maxHeight = 1080, outputFormat, onProgress } = options

    const targetBytes = targetKB * 1024
    const safetyMargin = this.SAFETY_MARGIN * 1024
    const optimalRange = this.OPTIMAL_RANGE * 1024

    // 三层目标定义
    const hardLimit = targetBytes                         // 绝对不能超过 (100KB)
    const safeTarget = targetBytes - safetyMargin        // 安全目标 (98KB)
    const optimalTarget = targetBytes - optimalRange     // 最优目标 (96KB)

    console.log(`🎯 Strict compression target: ${targetKB}KB`)
    console.log(`📊 Compression boundaries: optimal=${(optimalTarget / 1024).toFixed(1)}KB, safe=${(safeTarget / 1024).toFixed(1)}KB, hard limit=${(hardLimit / 1024).toFixed(1)}KB`)

    try {
      const result = await this.iterativeCompress(file, {
        hardLimit,
        safeTarget,
        optimalTarget,
        maxWidth,
        maxHeight,
        outputFormat,
        onProgress
      })

      const actualKB = result.file.size / 1024
      const success = result.file.size < hardLimit

      console.log(`✅ Compression complete: ${actualKB.toFixed(2)}KB ${success ? '< ' + targetKB + 'KB ✓' : '>= ' + targetKB + 'KB ✗'}`)

      return {
        ...result,
        actualKB,
        success
      }
    } catch (error: any) {
      console.error('❌ Compression failed:', error)
      throw new Error(`Compression failed: ${error?.message || 'Unknown error'}`)
    }
  }

  /**
   * 迭代压缩算法 - 三段式精确控制
   */
  private static async iterativeCompress(
    file: File,
    targets: {
      hardLimit: number
      safeTarget: number
      optimalTarget: number
      maxWidth: number
      maxHeight: number
      outputFormat?: string
      onProgress?: (progress: number) => void
    }
  ): Promise<{ file: File; compressionRatio: number; iterations: number }> {

    const { hardLimit, safeTarget, optimalTarget, maxWidth, maxHeight, outputFormat, onProgress } = targets

    let bestResult = file
    let bestSize = file.size
    let iterations = 0

    // Stage 1: 粗调 - 快速逼近安全目标区间
    console.log('🔄 Stage 1: Coarse adjustment')
    const coarseResult = await this.coarseAdjustment(file, safeTarget, maxWidth, maxHeight, outputFormat, onProgress)

    if (coarseResult.size < hardLimit) {
      bestResult = coarseResult
      bestSize = coarseResult.size
      iterations += 5 // 粗调估算迭代次数
    }

    // Stage 2: 精调 - 二分查找最优质量
    if (bestSize > optimalTarget || bestSize >= hardLimit) {
      console.log('🎯 Stage 2: Fine adjustment')
      const fineResult = await this.fineAdjustment(
        file,
        bestSize < hardLimit ? bestResult : file,
        optimalTarget,
        hardLimit,
        maxWidth,
        maxHeight,
        outputFormat,
        onProgress
      )

      if (fineResult.size < hardLimit && fineResult.size < bestSize) {
        bestResult = fineResult.file
        bestSize = fineResult.size
        iterations += fineResult.iterations
      }
    }

    // Stage 3: 验证 - 确保严格小于目标
    if (bestSize >= hardLimit) {
      console.log('⚠️ Stage 3: Force compression')
      const forceResult = await this.forceCompress(file, hardLimit, onProgress)

      if (forceResult.size < hardLimit) {
        bestResult = forceResult
        bestSize = forceResult.size
        iterations += 3
      } else {
        throw new Error(`Unable to compress below ${hardLimit / 1024}KB, current size: ${bestSize / 1024}KB`)
      }
    }

    const compressionRatio = Math.round((1 - bestSize / file.size) * 100)

    return {
      file: bestResult,
      compressionRatio,
      iterations
    }
  }

  /**
   * Stage 1: 粗调阶段 - 快速逼近目标范围
   */
  private static async coarseAdjustment(
    file: File,
    targetBytes: number,
    maxWidth: number,
    maxHeight: number,
    outputFormat?: string,
    onProgress?: (progress: number) => void
  ): Promise<File> {

    const fileSizeMB = file.size / (1024 * 1024)
    const compressionNeeded = 1 - (targetBytes / file.size)

    // 智能初始参数计算
    let initialQuality = 0.8
    let maxDimension = Math.max(maxWidth, maxHeight)

    if (compressionNeeded > 0.95) {
      initialQuality = 0.15
      maxDimension = Math.min(800, maxDimension)
    } else if (compressionNeeded > 0.90) {
      initialQuality = 0.25
      maxDimension = Math.min(1000, maxDimension)
    } else if (compressionNeeded > 0.80) {
      initialQuality = 0.35
      maxDimension = Math.min(1200, maxDimension)
    } else if (compressionNeeded > 0.70) {
      initialQuality = 0.45
      maxDimension = Math.min(1400, maxDimension)
    } else if (compressionNeeded > 0.50) {
      initialQuality = 0.6
      maxDimension = Math.min(1600, maxDimension)
    }

    const compressOptions: any = {
      maxSizeMB: Math.max(0.1, targetBytes / (1024 * 1024)),
      initialQuality,
      maxWidthOrHeight: maxDimension,
      useWebWorker: true,
      onProgress: (progress: number) => {
        onProgress?.(progress * 0.3) // 粗调占30%进度
      }
    }

    // 如果指定了输出格式，添加格式转换
    if (outputFormat && outputFormat !== this.getFileFormat(file)) {
      compressOptions.fileType = `image/${outputFormat}`
    }

    return await imageCompression(file, compressOptions)
  }

  /**
   * Stage 2: 精调阶段 - 二分查找最优质量
   */
  private static async fineAdjustment(
    originalFile: File,
    baselineFile: File,
    optimalTarget: number,
    hardLimit: number,
    maxWidth: number,
    maxHeight: number,
    outputFormat?: string,
    onProgress?: (progress: number) => void
  ): Promise<{ file: File; size: number; iterations: number }> {

    let minQuality = 0.05
    let maxQuality = 0.8
    let bestFile = baselineFile
    let bestSize = baselineFile.size
    let iterations = 0

    const maxIterations = 12

    while (iterations < maxIterations && Math.abs(bestSize - optimalTarget) > this.TOLERANCE * 1024) {
      const currentQuality = (minQuality + maxQuality) / 2

      try {
        const compressOptions: any = {
          maxSizeMB: 50,
          initialQuality: currentQuality,
          maxWidthOrHeight: Math.max(maxWidth, maxHeight),
          useWebWorker: true,
          onProgress: (progress: number) => {
            const totalProgress = 30 + (iterations * 5) + (progress * 0.05)
            onProgress?.(Math.min(totalProgress, 80))
          }
        }

        if (outputFormat && outputFormat !== this.getFileFormat(originalFile)) {
          compressOptions.fileType = `image/${outputFormat}`
        }

        const result = await imageCompression(originalFile, compressOptions)

        if (result.size < hardLimit) {
          if (result.size > optimalTarget) {
            // 结果在安全范围内但大于最优目标，降低质量
            maxQuality = currentQuality
          } else {
            // 结果在最优范围内，尝试提高质量获得更好效果
            bestFile = result
            bestSize = result.size
            minQuality = currentQuality
          }
        } else {
          // 结果超过硬限制，必须降低质量
          maxQuality = currentQuality
        }

        iterations++
      } catch (error) {
        break
      }
    }

    return { file: bestFile, size: bestSize, iterations }
  }

  /**
   * Stage 3: 强制压缩 - 最后手段确保不超过硬限制
   */
  private static async forceCompress(
    file: File,
    hardLimit: number,
    onProgress?: (progress: number) => void
  ): Promise<File> {

    const attempts = [
      { quality: 0.1, dimension: 600 },
      { quality: 0.05, dimension: 400 },
      { quality: 0.02, dimension: 200 }
    ]

    for (let i = 0; i < attempts.length; i++) {
      const { quality, dimension } = attempts[i]

      try {
        const result = await imageCompression(file, {
          maxSizeMB: 50,
          initialQuality: quality,
          maxWidthOrHeight: dimension,
          useWebWorker: true,
          onProgress: (progress: number) => {
            const totalProgress = 80 + (i * 6) + (progress * 0.06)
            onProgress?.(Math.min(totalProgress, 99))
          }
        })

        if (result.size < hardLimit) {
          return result
        }
      } catch (error) {
        continue
      }
    }

    throw new Error('Force compression failed, unable to reach target size')
  }

  /**
   * 获取文件格式
   */
  private static getFileFormat(file: File): string {
    return file.type.split('/')[1] || 'unknown'
  }

  /**
   * 格式化文件大小显示
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
} 