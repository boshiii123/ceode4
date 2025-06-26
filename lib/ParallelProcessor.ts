/**
 * Parallel Processor - CompressLab V3.0 Phase 3
 * 并行处理器，优化批量图片处理性能
 */

import { getWorkerManager } from './WebWorkerManager';
import { getSmartCache } from './SmartCache';
import { getPerformanceMonitor } from './PerformanceMonitor';

interface ProcessingTask {
  id: string;
  file: File;
  type: 'compress' | 'convert';
  options: any;
  priority: number;
  dependencies?: string[];
  retryCount: number;
  maxRetries: number;
}

interface ProcessingResult {
  taskId: string;
  success: boolean;
  data?: Blob;
  error?: string;
  duration: number;
  fromCache: boolean;
}

interface BatchProcessingOptions {
  maxConcurrency: number;
  enableCache: boolean;
  enableRetry: boolean;
  maxRetries: number;
  priorityBased: boolean;
  progressCallback?: (progress: number, completed: number, total: number) => void;
}

export class ParallelProcessor {
  private activeTasks: Map<string, ProcessingTask> = new Map();
  private completedTasks: Map<string, ProcessingResult> = new Map();
  private taskQueue: ProcessingTask[] = [];
  private isProcessing: boolean = false;
  private maxConcurrency: number;

  constructor(maxConcurrency?: number) {
    this.maxConcurrency = maxConcurrency || this.getOptimalConcurrency();
    console.log(`[ParallelProcessor] Initialized with max concurrency: ${this.maxConcurrency}`);
  }

  /**
   * 获取最优并发数
   */
  private getOptimalConcurrency(): number {
    const cores = navigator.hardwareConcurrency || 4;
    const memoryGB = this.getAvailableMemory();

    // 基于CPU核心数和内存情况计算最优并发数
    let concurrency = Math.min(cores, 8);

    // 如果内存较少，减少并发数
    if (memoryGB < 4) {
      concurrency = Math.min(concurrency, 2);
    } else if (memoryGB < 8) {
      concurrency = Math.min(concurrency, 4);
    }

    console.log(`[ParallelProcessor] Calculated optimal concurrency: ${concurrency} (cores: ${cores}, memory: ${memoryGB}GB)`);
    return concurrency;
  }

  /**
   * 获取可用内存 (GB)
   */
  private getAvailableMemory(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return memory.totalJSHeapSize / 1024 / 1024 / 1024;
    }
    return 8; // 默认假设8GB
  }

  /**
   * 添加处理任务
   */
  public addTask(
    file: File,
    type: 'compress' | 'convert',
    options: any,
    priority: number = 0,
    dependencies?: string[]
  ): string {
    const taskId = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const task: ProcessingTask = {
      id: taskId,
      file,
      type,
      options,
      priority,
      dependencies: dependencies || [],
      retryCount: 0,
      maxRetries: 3
    };

    this.taskQueue.push(task);
    console.log(`[ParallelProcessor] Added task: ${taskId}, type: ${type}, priority: ${priority}`);

    return taskId;
  }

  /**
   * 批量添加任务
   */
  public addBatchTasks(
    tasks: Array<{
      file: File;
      type: 'compress' | 'convert';
      options: any;
      priority?: number;
    }>
  ): string[] {
    const taskIds: string[] = [];

    tasks.forEach(task => {
      const taskId = this.addTask(
        task.file,
        task.type,
        task.options,
        task.priority || 0
      );
      taskIds.push(taskId);
    });

    console.log(`[ParallelProcessor] Added batch of ${tasks.length} tasks`);
    return taskIds;
  }

  /**
   * 开始批量处理
   */
  public async processBatch(options: Partial<BatchProcessingOptions> = {}): Promise<Map<string, ProcessingResult>> {
    const processingOptions: BatchProcessingOptions = {
      maxConcurrency: options.maxConcurrency || this.maxConcurrency,
      enableCache: options.enableCache !== false,
      enableRetry: options.enableRetry !== false,
      maxRetries: options.maxRetries || 3,
      priorityBased: options.priorityBased !== false,
      progressCallback: options.progressCallback
    };

    console.log(`[ParallelProcessor] Starting batch processing with options:`, processingOptions);

    if (this.isProcessing) {
      throw new Error('Batch processing is already in progress');
    }

    this.isProcessing = true;
    this.completedTasks.clear();

    try {
      await this.executeBatchProcessing(processingOptions);
      console.log(`[ParallelProcessor] Batch processing completed: ${this.completedTasks.size} tasks`);
      return new Map(this.completedTasks);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * 执行批量处理
   */
  private async executeBatchProcessing(options: BatchProcessingOptions): Promise<void> {
    const totalTasks = this.taskQueue.length;
    let completedCount = 0;

    // 按优先级排序任务
    if (options.priorityBased) {
      this.taskQueue.sort((a, b) => b.priority - a.priority);
    }

    while (this.taskQueue.length > 0 || this.activeTasks.size > 0) {
      // 启动新任务直到达到并发限制
      while (
        this.activeTasks.size < options.maxConcurrency &&
        this.taskQueue.length > 0
      ) {
        const task = this.getNextAvailableTask();
        if (task) {
          this.startTask(task, options);
        } else {
          break; // 没有可执行的任务（可能在等待依赖）
        }
      }

      // 等待至少一个任务完成
      if (this.activeTasks.size > 0) {
        await this.waitForTaskCompletion();
        completedCount = this.completedTasks.size;

        // 调用进度回调
        if (options.progressCallback) {
          const progress = (completedCount / totalTasks) * 100;
          options.progressCallback(progress, completedCount, totalTasks);
        }
      }
    }
  }

  /**
   * 获取下一个可执行的任务
   */
  private getNextAvailableTask(): ProcessingTask | null {
    for (let i = 0; i < this.taskQueue.length; i++) {
      const task = this.taskQueue[i];

      // 检查依赖是否已完成
      if (this.areDependenciesSatisfied(task)) {
        return this.taskQueue.splice(i, 1)[0];
      }
    }

    return null;
  }

  /**
   * 检查任务依赖是否满足
   */
  private areDependenciesSatisfied(task: ProcessingTask): boolean {
    if (!task.dependencies || task.dependencies.length === 0) {
      return true;
    }

    return task.dependencies.every(depId => {
      const result = this.completedTasks.get(depId);
      return result && result.success;
    });
  }

  /**
   * 启动单个任务
   */
  private async startTask(task: ProcessingTask, options: BatchProcessingOptions): Promise<void> {
    this.activeTasks.set(task.id, task);

    // 启动性能监控
    const monitor = getPerformanceMonitor();
    monitor.startTask(task.id, task.type, task.file.size, task.file.type);

    // 异步处理任务
    this.processTask(task, options).then(result => {
      this.activeTasks.delete(task.id);
      this.completedTasks.set(task.id, result);

      // 结束性能监控
      monitor.endTask(task.id, result.success, result.error);
    }).catch(error => {
      console.error(`[ParallelProcessor] Unexpected error in task ${task.id}:`, error);
      this.activeTasks.delete(task.id);
      this.completedTasks.set(task.id, {
        taskId: task.id,
        success: false,
        error: error.message,
        duration: 0,
        fromCache: false
      });
    });
  }

  /**
   * 处理单个任务
   */
  private async processTask(task: ProcessingTask, options: BatchProcessingOptions): Promise<ProcessingResult> {
    const startTime = Date.now();

    try {
      // 检查缓存
      if (options.enableCache) {
        const cache = getSmartCache();
        const cachedResult = cache.get(task.file, task.options);

        if (cachedResult) {
          console.log(`[ParallelProcessor] Cache hit for task: ${task.id}`);
          return {
            taskId: task.id,
            success: true,
            data: cachedResult.data,
            duration: Date.now() - startTime,
            fromCache: true
          };
        }
      }

      // 执行实际处理
      const result = await this.executeTask(task);

      // 缓存结果
      if (options.enableCache && result.data) {
        const cache = getSmartCache();
        cache.set(task.file, task.options, result.data, {
          originalSize: task.file.size,
          format: task.file.type
        });
      }

      return {
        taskId: task.id,
        success: true,
        data: result.data,
        duration: Date.now() - startTime,
        fromCache: false
      };

    } catch (error) {
      console.error(`[ParallelProcessor] Task ${task.id} failed:`, error);

      // 重试逻辑
      if (options.enableRetry && task.retryCount < task.maxRetries) {
        task.retryCount++;
        console.log(`[ParallelProcessor] Retrying task ${task.id} (attempt ${task.retryCount}/${task.maxRetries})`);

        // 添加延迟重试
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, task.retryCount) * 1000));

        return this.processTask(task, options);
      }

      return {
        taskId: task.id,
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime,
        fromCache: false
      };
    }
  }

  /**
   * 执行具体任务
   */
  private async executeTask(task: ProcessingTask): Promise<{ data: Blob }> {
    const workerManager = getWorkerManager();

    if (task.type === 'compress') {
      const result = await workerManager.compressImage(task.file, task.options);
      return { data: result };
    } else {
      const result = await workerManager.convertFormat(
        task.file,
        task.options.targetFormat,
        task.options
      );
      return { data: result };
    }
  }

  /**
   * 等待任务完成
   */
  private async waitForTaskCompletion(): Promise<void> {
    return new Promise(resolve => {
      const checkCompletion = () => {
        if (this.activeTasks.size === 0) {
          resolve();
        } else {
          setTimeout(checkCompletion, 100);
        }
      };
      checkCompletion();
    });
  }

  /**
   * 获取处理状态
   */
  public getProcessingStatus(): {
    isProcessing: boolean;
    activeTasks: number;
    queuedTasks: number;
    completedTasks: number;
    successRate: number;
  } {
    const completed = Array.from(this.completedTasks.values());
    const successful = completed.filter(r => r.success).length;

    return {
      isProcessing: this.isProcessing,
      activeTasks: this.activeTasks.size,
      queuedTasks: this.taskQueue.length,
      completedTasks: completed.length,
      successRate: completed.length > 0 ? (successful / completed.length) * 100 : 0
    };
  }

  /**
   * 获取任务结果
   */
  public getTaskResult(taskId: string): ProcessingResult | null {
    return this.completedTasks.get(taskId) || null;
  }

  /**
   * 获取所有结果
   */
  public getAllResults(): ProcessingResult[] {
    return Array.from(this.completedTasks.values());
  }

  /**
   * 取消处理
   */
  public cancel(): void {
    console.log('[ParallelProcessor] Cancelling batch processing');

    this.isProcessing = false;
    this.taskQueue = [];

    // 清理活跃任务
    this.activeTasks.clear();

    console.log('[ParallelProcessor] Batch processing cancelled');
  }

  /**
   * 清理资源
   */
  public clear(): void {
    this.cancel();
    this.completedTasks.clear();
    console.log('[ParallelProcessor] Cleared all tasks and results');
  }

  /**
   * 获取性能统计
   */
  public getPerformanceStats(): {
    totalTasks: number;
    successfulTasks: number;
    failedTasks: number;
    avgDuration: number;
    cacheHitRate: number;
    totalDataProcessed: number;
  } {
    const results = Array.from(this.completedTasks.values());
    const successful = results.filter(r => r.success);
    const fromCache = results.filter(r => r.fromCache);

    const totalDataProcessed = successful.reduce((sum, result) => {
      return sum + (result.data?.size || 0);
    }, 0);

    return {
      totalTasks: results.length,
      successfulTasks: successful.length,
      failedTasks: results.length - successful.length,
      avgDuration: successful.length > 0 ?
        successful.reduce((sum, r) => sum + r.duration, 0) / successful.length : 0,
      cacheHitRate: results.length > 0 ? (fromCache.length / results.length) * 100 : 0,
      totalDataProcessed
    };
  }

  /**
   * 智能批量处理 - 自动优化参数
   */
  public async smartBatchProcess(
    files: File[],
    baseOptions: any,
    progressCallback?: (progress: number) => void
  ): Promise<Map<string, ProcessingResult>> {
    console.log(`[ParallelProcessor] Starting smart batch processing for ${files.length} files`);

    // 分析文件特征
    const fileAnalysis = this.analyzeFiles(files);

    // 根据文件特征调整处理策略
    const optimizedOptions = this.optimizeProcessingOptions(fileAnalysis, baseOptions);

    // 添加任务
    const taskIds: string[] = [];
    files.forEach((file, index) => {
      const taskId = this.addTask(
        file,
        baseOptions.type || 'compress',
        optimizedOptions,
        this.calculatePriority(file, fileAnalysis)
      );
      taskIds.push(taskId);
    });

    // 执行批量处理
    return this.processBatch({
      ...optimizedOptions,
      progressCallback: progressCallback ?
        (progress, completed, total) => progressCallback(progress) : undefined
    });
  }

  /**
   * 分析文件特征
   */
  private analyzeFiles(files: File[]): {
    totalSize: number;
    avgSize: number;
    formats: { [key: string]: number };
    largeFiles: number;
    complexity: 'low' | 'medium' | 'high';
  } {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const avgSize = totalSize / files.length;

    const formats: { [key: string]: number } = {};
    files.forEach(file => {
      const format = file.type || 'unknown';
      formats[format] = (formats[format] || 0) + 1;
    });

    const largeFiles = files.filter(file => file.size > 10 * 1024 * 1024).length; // >10MB

    let complexity: 'low' | 'medium' | 'high' = 'low';
    if (largeFiles > files.length * 0.3 || avgSize > 5 * 1024 * 1024) {
      complexity = 'high';
    } else if (largeFiles > 0 || avgSize > 1024 * 1024) {
      complexity = 'medium';
    }

    return {
      totalSize,
      avgSize,
      formats,
      largeFiles,
      complexity
    };
  }

  /**
   * 优化处理选项
   */
  private optimizeProcessingOptions(analysis: any, baseOptions: any): BatchProcessingOptions {
    let maxConcurrency = this.maxConcurrency;

    // 根据复杂度调整并发数
    switch (analysis.complexity) {
      case 'high':
        maxConcurrency = Math.max(1, Math.floor(this.maxConcurrency / 2));
        break;
      case 'medium':
        maxConcurrency = Math.max(2, Math.floor(this.maxConcurrency * 0.75));
        break;
      default:
        maxConcurrency = this.maxConcurrency;
    }

    return {
      maxConcurrency,
      enableCache: true,
      enableRetry: true,
      maxRetries: analysis.complexity === 'high' ? 2 : 3,
      priorityBased: true
    };
  }

  /**
   * 计算任务优先级
   */
  private calculatePriority(file: File, analysis: any): number {
    let priority = 0;

    // 小文件优先处理
    if (file.size < analysis.avgSize) {
      priority += 10;
    }

    // 常见格式优先处理
    if (file.type.includes('jpeg') || file.type.includes('png')) {
      priority += 5;
    }

    return priority;
  }
}

// 单例模式
let parallelProcessorInstance: ParallelProcessor | null = null;

export function getParallelProcessor(): ParallelProcessor {
  if (!parallelProcessorInstance) {
    parallelProcessorInstance = new ParallelProcessor();
    console.log('[ParallelProcessor] Created singleton instance');
  }

  return parallelProcessorInstance;
}

export function destroyParallelProcessor(): void {
  if (parallelProcessorInstance) {
    parallelProcessorInstance.clear();
    parallelProcessorInstance = null;
    console.log('[ParallelProcessor] Singleton instance destroyed');
  }
} 