export interface FormatInfo {
  format: string
  mimeType: string
  extension: string
  isSupported: boolean
  category: 'raster' | 'vector' | 'raw' | 'design'
  compression: 'lossy' | 'lossless' | 'both'
  features: string[]
}

export class FormatDetector {
  // 支持的格式映射表
  private static readonly FORMAT_SIGNATURES: Record<string, {
    signature: number[]
    offset: number
    format: string
    mimeType: string
    category: 'raster' | 'vector' | 'raw' | 'design'
    compression: 'lossy' | 'lossless' | 'both'
    features: string[]
  }> = {
      // 常见格式
      jpeg: {
        signature: [0xFF, 0xD8, 0xFF],
        offset: 0,
        format: 'jpeg',
        mimeType: 'image/jpeg',
        category: 'raster',
        compression: 'lossy',
        features: ['small-size', 'wide-support']
      },
      png: {
        signature: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
        offset: 0,
        format: 'png',
        mimeType: 'image/png',
        category: 'raster',
        compression: 'lossless',
        features: ['transparency', 'animation']
      },
      webp: {
        signature: [0x52, 0x49, 0x46, 0x46], // RIFF
        offset: 0,
        format: 'webp',
        mimeType: 'image/webp',
        category: 'raster',
        compression: 'both',
        features: ['modern', 'small-size', 'animation', 'transparency']
      },
      gif: {
        signature: [0x47, 0x49, 0x46, 0x38], // GIF8
        offset: 0,
        format: 'gif',
        mimeType: 'image/gif',
        category: 'raster',
        compression: 'lossless',
        features: ['animation', 'transparency', 'legacy']
      },
      bmp: {
        signature: [0x42, 0x4D], // BM
        offset: 0,
        format: 'bmp',
        mimeType: 'image/bmp',
        category: 'raster',
        compression: 'lossless',
        features: ['uncompressed', 'large-size']
      },
      tiff: {
        signature: [0x49, 0x49, 0x2A, 0x00], // Little endian TIFF
        offset: 0,
        format: 'tiff',
        mimeType: 'image/tiff',
        category: 'raster',
        compression: 'both',
        features: ['professional', 'multi-page', 'metadata']
      },

      // 现代格式
      avif: {
        signature: [0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66], // ftyp avif
        offset: 4,
        format: 'avif',
        mimeType: 'image/avif',
        category: 'raster',
        compression: 'both',
        features: ['modern', 'ultra-small', 'hdr']
      },
      heif: {
        signature: [0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63], // ftyp heic
        offset: 4,
        format: 'heif',
        mimeType: 'image/heif',
        category: 'raster',
        compression: 'lossy',
        features: ['apple', 'small-size', 'hdr']
      },

      // 矢量格式
      svg: {
        signature: [0x3C, 0x73, 0x76, 0x67], // <svg
        offset: 0,
        format: 'svg',
        mimeType: 'image/svg+xml',
        category: 'vector',
        compression: 'lossless',
        features: ['scalable', 'small-size', 'web']
      },

      // 设计格式
      psd: {
        signature: [0x38, 0x42, 0x50, 0x53], // 8BPS
        offset: 0,
        format: 'psd',
        mimeType: 'image/vnd.adobe.photoshop',
        category: 'design',
        compression: 'lossless',
        features: ['layers', 'professional', 'large-size']
      },

      // RAW格式 (部分常见的)
      cr2: {
        signature: [0x49, 0x49, 0x2A, 0x00], // Canon RAW v2
        offset: 0,
        format: 'cr2',
        mimeType: 'image/x-canon-cr2',
        category: 'raw',
        compression: 'lossless',
        features: ['professional', 'unprocessed', 'large-size']
      },
      dng: {
        signature: [0x49, 0x49, 0x2A, 0x00], // Adobe DNG
        offset: 0,
        format: 'dng',
        mimeType: 'image/x-adobe-dng',
        category: 'raw',
        compression: 'lossless',
        features: ['adobe', 'professional', 'standard']
      }
    }

  // 支持的输入格式列表
  static readonly SUPPORTED_INPUT_FORMATS = [
    'jpeg', 'jpg', 'png', 'webp', 'avif', 'heif', 'heic',
    'gif', 'bmp', 'tiff', 'svg', 'psd', 'raw', 'dng', 'cr2'
  ]

  // 支持的输出格式列表
  static readonly SUPPORTED_OUTPUT_FORMATS = [
    'jpeg', 'png', 'webp', 'avif', 'bmp', 'gif', 'tiff'
  ]

  /**
   * 智能检测文件格式
   * @param file 文件对象
   * @returns 格式信息
   */
  static async detectAdvancedFormat(file: File): Promise<FormatInfo> {
    try {
      // 首先尝试从文件扩展名和MIME类型获取信息
      const basicFormat = this.getBasicFormat(file)

      // 读取文件头进行二进制检测
      const binaryFormat = await this.detectBinaryFormat(file)

      // 选择更可靠的检测结果
      const detectedFormat = binaryFormat || basicFormat

      const formatInfo = this.FORMAT_SIGNATURES[detectedFormat]

      if (formatInfo) {
        return {
          format: formatInfo.format,
          mimeType: formatInfo.mimeType,
          extension: this.getExtension(formatInfo.format),
          isSupported: this.SUPPORTED_INPUT_FORMATS.includes(formatInfo.format),
          category: formatInfo.category,
          compression: formatInfo.compression,
          features: formatInfo.features
        }
      }

      // 回退到基本格式
      return {
        format: detectedFormat,
        mimeType: file.type || 'application/octet-stream',
        extension: this.getExtension(detectedFormat),
        isSupported: this.SUPPORTED_INPUT_FORMATS.includes(detectedFormat),
        category: 'raster',
        compression: 'lossy',
        features: []
      }

    } catch (error: any) {
      console.warn('Format detection failed:', error)

      // 错误时回退到文件类型
      const fallbackFormat = this.getBasicFormat(file)
      return {
        format: fallbackFormat,
        mimeType: file.type || 'application/octet-stream',
        extension: this.getExtension(fallbackFormat),
        isSupported: this.SUPPORTED_INPUT_FORMATS.includes(fallbackFormat),
        category: 'raster',
        compression: 'lossy',
        features: []
      }
    }
  }

  /**
   * 从文件名和MIME类型获取基本格式
   */
  private static getBasicFormat(file: File): string {
    // 从MIME类型获取
    if (file.type) {
      const mimeFormat = file.type.split('/')[1]
      if (mimeFormat) {
        // 处理特殊MIME类型
        const formatMap: Record<string, string> = {
          'jpeg': 'jpeg',
          'jpg': 'jpeg',
          'png': 'png',
          'webp': 'webp',
          'avif': 'avif',
          'heif': 'heif',
          'heic': 'heif',
          'gif': 'gif',
          'bmp': 'bmp',
          'tiff': 'tiff',
          'svg+xml': 'svg',
          'vnd.adobe.photoshop': 'psd',
          'x-canon-cr2': 'cr2',
          'x-adobe-dng': 'dng'
        }

        if (formatMap[mimeFormat]) {
          return formatMap[mimeFormat]
        }
      }
    }

    // 从文件扩展名获取
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (extension) {
      const extMap: Record<string, string> = {
        'jpg': 'jpeg',
        'jpeg': 'jpeg',
        'png': 'png',
        'webp': 'webp',
        'avif': 'avif',
        'heif': 'heif',
        'heic': 'heif',
        'gif': 'gif',
        'bmp': 'bmp',
        'tiff': 'tiff',
        'tif': 'tiff',
        'svg': 'svg',
        'psd': 'psd',
        'raw': 'raw',
        'cr2': 'cr2',
        'dng': 'dng'
      }

      if (extMap[extension]) {
        return extMap[extension]
      }
    }

    return 'unknown'
  }

  /**
   * 通过二进制签名检测格式
   */
  private static async detectBinaryFormat(file: File): Promise<string | null> {
    try {
      // 读取文件前64字节进行签名检测
      const buffer = await this.readFileBuffer(file, 64)
      const uint8Array = new Uint8Array(buffer)

      // 检查所有已知的格式签名
      for (const [formatName, info] of Object.entries(this.FORMAT_SIGNATURES)) {
        if (this.matchesSignature(uint8Array, info.signature, info.offset)) {
          // 特殊处理WebP (需要额外验证)
          if (formatName === 'webp') {
            if (this.verifyWebP(uint8Array)) {
              return 'webp'
            }
          }
          // 特殊处理HEIF/AVIF (需要检查ftyp box)
          else if (formatName === 'avif' || formatName === 'heif') {
            const detectedFormat = this.detectHeifFamily(uint8Array)
            if (detectedFormat) {
              return detectedFormat
            }
          }
          // 特殊处理TIFF/CR2/DNG (共享相同签名)
          else if (['tiff', 'cr2', 'dng'].includes(formatName)) {
            const tiffFormat = this.detectTiffFamily(uint8Array)
            if (tiffFormat) {
              return tiffFormat
            }
          }
          else {
            return formatName
          }
        }
      }

      return null
    } catch (error: any) {
      console.warn('Binary format detection failed:', error)
      return null
    }
  }

  /**
   * 读取文件缓冲区
   */
  private static readFileBuffer(file: File, bytes: number): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = () => reject(reader.error)
      reader.readAsArrayBuffer(file.slice(0, bytes))
    })
  }

  /**
   * 检查二进制签名匹配
   */
  private static matchesSignature(data: Uint8Array, signature: number[], offset: number): boolean {
    if (data.length < offset + signature.length) {
      return false
    }

    for (let i = 0; i < signature.length; i++) {
      if (data[offset + i] !== signature[i]) {
        return false
      }
    }

    return true
  }

  /**
   * 验证WebP格式
   */
  private static verifyWebP(data: Uint8Array): boolean {
    // RIFF....WEBP
    return data.length >= 12 &&
      data[8] === 0x57 && // W
      data[9] === 0x45 && // E
      data[10] === 0x42 && // B
      data[11] === 0x50   // P
  }

  /**
   * 检测HEIF家族格式
   */
  private static detectHeifFamily(data: Uint8Array): string | null {
    if (data.length < 12) return null

    // 检查ftyp box
    const ftypArray = Array.from(data.slice(4, 8))
    const ftypString = String.fromCharCode(...ftypArray)
    if (ftypString !== 'ftyp') return null

    // 检查brand
    const brandArray = Array.from(data.slice(8, 12))
    const brand = String.fromCharCode(...brandArray)

    if (['avif', 'avis'].includes(brand)) {
      return 'avif'
    } else if (['heic', 'heix', 'hevc', 'hevx'].includes(brand)) {
      return 'heif'
    }

    return null
  }

  /**
   * 检测TIFF家族格式
   */
  private static detectTiffFamily(data: Uint8Array): string | null {
    if (data.length < 8) return null

    // 检查TIFF magic number
    const isLittleEndian = data[0] === 0x49 && data[1] === 0x49
    const isBigEndian = data[0] === 0x4D && data[1] === 0x4D

    if (!isLittleEndian && !isBigEndian) return null

    // 检查版本号
    const version = isLittleEndian ?
      (data[2] | (data[3] << 8)) :
      (data[3] | (data[2] << 8))

    if (version === 42) {
      // 可能是TIFF或CR2，需要进一步检测
      // 简单启发式：CR2文件通常较大且有特定的IFD结构
      return 'tiff' // 默认返回tiff，实际应用中可以进一步细化
    }

    return null
  }

  /**
   * 获取文件扩展名
   */
  private static getExtension(format: string): string {
    const extensionMap: Record<string, string> = {
      'jpeg': 'jpg',
      'png': 'png',
      'webp': 'webp',
      'avif': 'avif',
      'heif': 'heic',
      'gif': 'gif',
      'bmp': 'bmp',
      'tiff': 'tiff',
      'svg': 'svg',
      'psd': 'psd',
      'raw': 'raw',
      'cr2': 'cr2',
      'dng': 'dng'
    }

    return extensionMap[format] || format
  }

  /**
   * 获取支持的输出格式（基于输入格式）
   */
  static getSupportedOutputFormats(inputFormat: string): string[] {
    // 基础输出格式
    const baseFormats = ['jpeg', 'png', 'webp']

    // 根据输入格式添加额外选项
    switch (inputFormat) {
      case 'avif':
        return [...baseFormats, 'avif']
      case 'bmp':
        return [...baseFormats, 'bmp']
      case 'gif':
        return [...baseFormats, 'gif']
      case 'tiff':
        return [...baseFormats, 'tiff']
      default:
        return baseFormats
    }
  }

  /**
   * 检查格式是否支持压缩
   */
  static supportsCompression(format: string): boolean {
    return this.SUPPORTED_INPUT_FORMATS.includes(format) && format !== 'svg'
  }

  /**
   * 检查格式是否支持转换
   */
  static supportsConversion(inputFormat: string, outputFormat: string): boolean {
    return this.SUPPORTED_INPUT_FORMATS.includes(inputFormat) &&
      this.SUPPORTED_OUTPUT_FORMATS.includes(outputFormat)
  }

  /**
   * 获取格式详细信息
   */
  static getFormatInfo(format: string): FormatInfo | null {
    const info = this.FORMAT_SIGNATURES[format]
    if (!info) return null

    return {
      format: info.format,
      mimeType: info.mimeType,
      extension: this.getExtension(info.format),
      isSupported: this.SUPPORTED_INPUT_FORMATS.includes(info.format),
      category: info.category,
      compression: info.compression,
      features: info.features
    }
  }
} 