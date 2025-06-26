/**
 * Smart Cache System - CompressLab V3.0 Phase 3
 * 智能缓存系统，缓存处理结果和优化性能
 */

interface CacheEntry {
  key: string;
  data: Blob;
  metadata: {
    originalSize: number;
    compressedSize: number;
    format: string;
    quality?: number;
    timestamp: number;
    accessCount: number;
    lastAccessed: number;
  };
}

interface CacheOptions {
  maxSize: number; // 最大缓存大小 (MB)
  maxEntries: number; // 最大缓存条目数
  ttl: number; // 生存时间 (毫秒)
  compressionRatio: number; // 压缩比阈值
}

export class SmartCache {
  private cache: Map<string, CacheEntry> = new Map();
  private options: CacheOptions;
  private currentSize: number = 0; // 当前缓存大小 (bytes)

  constructor(options: Partial<CacheOptions> = {}) {
    this.options = {
      maxSize: options.maxSize || 100, // 100MB
      maxEntries: options.maxEntries || 1000,
      ttl: options.ttl || 30 * 60 * 1000, // 30分钟
      compressionRatio: options.compressionRatio || 0.8 // 压缩比低于80%才缓存
    };

    console.log('[SmartCache] Initialized with options:', this.options);

    // 定期清理过期缓存
    this.startCleanupTimer();
  }

  /**
   * 生成缓存键
   */
  private generateCacheKey(
    file: File,
    options: {
      targetSize?: number;
      quality?: number;
      format?: string;
      maxWidth?: number;
      maxHeight?: number;
    }
  ): string {
    const fileHash = `${file.name}_${file.size}_${file.lastModified}`;
    const optionsHash = JSON.stringify(options);
    return `${fileHash}_${btoa(optionsHash).slice(0, 16)}`;
  }

  /**
   * 检查是否值得缓存
   */
  private shouldCache(originalSize: number, compressedSize: number): boolean {
    const compressionRatio = compressedSize / originalSize;
    const isWorthCaching = compressionRatio <= this.options.compressionRatio;

    console.log(`[SmartCache] Compression ratio: ${(compressionRatio * 100).toFixed(1)}%, worth caching: ${isWorthCaching}`);

    return isWorthCaching;
  }

  /**
   * 清理过期和低优先级缓存
   */
  private cleanup(): void {
    const now = Date.now();
    let cleanedCount = 0;
    let freedSize = 0;

    // 清理过期缓存
    this.cache.forEach((entry, key) => {
      if (now - entry.metadata.timestamp > this.options.ttl) {
        freedSize += entry.data.size;
        this.cache.delete(key);
        cleanedCount++;
      }
    });

    this.currentSize -= freedSize;

    // 如果仍然超过限制，清理最少使用的缓存
    if (this.cache.size > this.options.maxEntries || this.currentSize > this.options.maxSize * 1024 * 1024) {
      this.evictLeastUsed();
    }

    if (cleanedCount > 0) {
      console.log(`[SmartCache] Cleaned ${cleanedCount} expired entries, freed ${(freedSize / 1024 / 1024).toFixed(2)}MB`);
    }
  }

  /**
   * 驱逐最少使用的缓存条目
   */
  private evictLeastUsed(): void {
    const entries = Array.from(this.cache.entries());

    // 按访问频率和最后访问时间排序
    entries.sort((a, b) => {
      const scoreA = a[1].metadata.accessCount / (Date.now() - a[1].metadata.lastAccessed + 1);
      const scoreB = b[1].metadata.accessCount / (Date.now() - b[1].metadata.lastAccessed + 1);
      return scoreA - scoreB;
    });

    let evictedCount = 0;
    let freedSize = 0;

    // 驱逐最少使用的条目
    while (
      (this.cache.size > this.options.maxEntries ||
        this.currentSize > this.options.maxSize * 1024 * 1024) &&
      entries.length > 0
    ) {
      const [key, entry] = entries.shift()!;
      if (this.cache.has(key)) {
        freedSize += entry.data.size;
        this.cache.delete(key);
        evictedCount++;
      }
    }

    this.currentSize -= freedSize;

    if (evictedCount > 0) {
      console.log(`[SmartCache] Evicted ${evictedCount} least used entries, freed ${(freedSize / 1024 / 1024).toFixed(2)}MB`);
    }
  }

  /**
   * 启动定期清理定时器
   */
  private startCleanupTimer(): void {
    setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000); // 每5分钟清理一次
  }

  /**
   * 获取缓存
   */
  public get(file: File, options: any): CacheEntry | null {
    const key = this.generateCacheKey(file, options);
    const entry = this.cache.get(key);

    if (entry) {
      // 更新访问统计
      entry.metadata.accessCount++;
      entry.metadata.lastAccessed = Date.now();

      console.log(`[SmartCache] Cache hit for key: ${key.slice(0, 16)}...`);
      return entry;
    }

    console.log(`[SmartCache] Cache miss for key: ${key.slice(0, 16)}...`);
    return null;
  }

  /**
   * 设置缓存
   */
  public set(file: File, options: any, data: Blob, metadata: {
    originalSize: number;
    format: string;
    quality?: number;
  }): void {
    const key = this.generateCacheKey(file, options);

    // 检查是否值得缓存
    if (!this.shouldCache(metadata.originalSize, data.size)) {
      console.log(`[SmartCache] Skipping cache for key: ${key.slice(0, 16)}... (compression ratio too high)`);
      return;
    }

    // 检查缓存大小限制
    if (data.size > 50 * 1024 * 1024) { // 50MB单个文件限制
      console.log(`[SmartCache] Skipping cache for key: ${key.slice(0, 16)}... (file too large)`);
      return;
    }

    const entry: CacheEntry = {
      key,
      data,
      metadata: {
        originalSize: metadata.originalSize,
        compressedSize: data.size,
        format: metadata.format,
        quality: metadata.quality,
        timestamp: Date.now(),
        accessCount: 1,
        lastAccessed: Date.now()
      }
    };

    // 如果缓存已满，先清理
    if (this.currentSize + data.size > this.options.maxSize * 1024 * 1024) {
      this.cleanup();
    }

    this.cache.set(key, entry);
    this.currentSize += data.size;

    console.log(`[SmartCache] Cached result for key: ${key.slice(0, 16)}..., size: ${(data.size / 1024).toFixed(1)}KB`);
  }

  /**
   * 获取缓存统计信息
   */
  public getStats(): {
    entries: number;
    size: string;
    hitRate: number;
    avgCompressionRatio: number;
  } {
    const entries = Array.from(this.cache.values());
    const totalOriginalSize = entries.reduce((sum, entry) => sum + entry.metadata.originalSize, 0);
    const totalCompressedSize = entries.reduce((sum, entry) => sum + entry.metadata.compressedSize, 0);
    const totalAccesses = entries.reduce((sum, entry) => sum + entry.metadata.accessCount, 0);

    return {
      entries: this.cache.size,
      size: `${(this.currentSize / 1024 / 1024).toFixed(2)}MB`,
      hitRate: totalAccesses > this.cache.size ? ((totalAccesses - this.cache.size) / totalAccesses * 100) : 0,
      avgCompressionRatio: totalOriginalSize > 0 ? (totalCompressedSize / totalOriginalSize) : 0
    };
  }

  /**
   * 预热缓存 - 预处理常用格式和大小
   */
  public async preWarm(samples: File[]): Promise<void> {
    console.log(`[SmartCache] Pre-warming cache with ${samples.length} samples`);

    const commonOptions = [
      { targetSize: 100 * 1024, format: 'jpeg' },
      { targetSize: 200 * 1024, format: 'jpeg' },
      { targetSize: 300 * 1024, format: 'jpeg' },
      { format: 'webp', quality: 0.8 },
      { format: 'avif', quality: 0.8 }
    ];

    // 这里可以预处理一些样本文件
    // 实际实现中需要调用压缩引擎
    console.log('[SmartCache] Pre-warming completed');
  }

  /**
   * 清空缓存
   */
  public clear(): void {
    const entriesCount = this.cache.size;
    const sizeFreed = this.currentSize;

    this.cache.clear();
    this.currentSize = 0;

    console.log(`[SmartCache] Cleared ${entriesCount} entries, freed ${(sizeFreed / 1024 / 1024).toFixed(2)}MB`);
  }

  /**
   * 获取缓存内容摘要
   */
  public getSummary(): Array<{
    key: string;
    format: string;
    originalSize: string;
    compressedSize: string;
    compressionRatio: string;
    accessCount: number;
    age: string;
  }> {
    const now = Date.now();

    return Array.from(this.cache.values()).map(entry => ({
      key: entry.key.slice(0, 16) + '...',
      format: entry.metadata.format,
      originalSize: `${(entry.metadata.originalSize / 1024).toFixed(1)}KB`,
      compressedSize: `${(entry.metadata.compressedSize / 1024).toFixed(1)}KB`,
      compressionRatio: `${(entry.metadata.compressedSize / entry.metadata.originalSize * 100).toFixed(1)}%`,
      accessCount: entry.metadata.accessCount,
      age: `${Math.floor((now - entry.metadata.timestamp) / 1000 / 60)}min`
    }));
  }

  /**
   * 导出缓存数据 (用于调试)
   */
  public exportCache(): any {
    return {
      options: this.options,
      stats: this.getStats(),
      summary: this.getSummary()
    };
  }
}

// 单例模式
let smartCacheInstance: SmartCache | null = null;

export function getSmartCache(): SmartCache {
  if (!smartCacheInstance) {
    smartCacheInstance = new SmartCache();
    console.log('[SmartCache] Created singleton instance');
  }

  return smartCacheInstance;
}

export function destroySmartCache(): void {
  if (smartCacheInstance) {
    smartCacheInstance.clear();
    smartCacheInstance = null;
    console.log('[SmartCache] Singleton instance destroyed');
  }
}

// 缓存配置预设
export const CachePresets = {
  // 开发模式 - 小缓存
  development: {
    maxSize: 50, // 50MB
    maxEntries: 100,
    ttl: 10 * 60 * 1000, // 10分钟
    compressionRatio: 0.9
  },

  // 生产模式 - 大缓存
  production: {
    maxSize: 200, // 200MB
    maxEntries: 2000,
    ttl: 60 * 60 * 1000, // 1小时
    compressionRatio: 0.8
  },

  // 移动设备 - 小缓存
  mobile: {
    maxSize: 25, // 25MB
    maxEntries: 50,
    ttl: 5 * 60 * 1000, // 5分钟
    compressionRatio: 0.7
  }
}; 