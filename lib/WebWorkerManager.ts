/**
 * Web Worker Manager - CompressLab V3.0 Phase 3
 * 后台处理图片压缩和转换任务，保持主线程响应性
 */

interface WorkerTask {
  id: string;
  type: 'compress' | 'convert';
  file: File;
  options: any;
  resolve: (result: any) => void;
  reject: (error: any) => void;
}

interface WorkerMessage {
  id: string;
  type: 'task' | 'progress' | 'complete' | 'error';
  data?: any;
  progress?: number;
  error?: string;
}

export class WebWorkerManager {
  private workers: Worker[] = [];
  private taskQueue: WorkerTask[] = [];
  private activeTasks: Map<string, WorkerTask> = new Map();
  private workerCount: number;
  private currentWorkerIndex = 0;

  constructor(workerCount: number = navigator.hardwareConcurrency || 4) {
    this.workerCount = Math.min(workerCount, 8); // 最多8个worker
    this.initializeWorkers();
  }

  private initializeWorkers(): void {
    console.log(`[WebWorkerManager] Initializing ${this.workerCount} workers`);

    for (let i = 0; i < this.workerCount; i++) {
      try {
        const worker = new Worker('/workers/image-processor.js');

        worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
          this.handleWorkerMessage(event.data);
        };

        worker.onerror = (error) => {
          console.error(`[WebWorkerManager] Worker ${i} error:`, error);
          this.handleWorkerError(error);
        };

        this.workers.push(worker);
      } catch (error) {
        console.error(`[WebWorkerManager] Failed to create worker ${i}:`, error);
      }
    }

    console.log(`[WebWorkerManager] Successfully initialized ${this.workers.length} workers`);
  }

  private handleWorkerMessage(message: WorkerMessage): void {
    const task = this.activeTasks.get(message.id);
    if (!task) {
      console.warn(`[WebWorkerManager] Received message for unknown task: ${message.id}`);
      return;
    }

    switch (message.type) {
      case 'progress':
        // 进度更新可以通过回调传递给UI
        if (message.progress !== undefined) {
          console.log(`[WebWorkerManager] Task ${message.id} progress: ${message.progress}%`);
        }
        break;

      case 'complete':
        console.log(`[WebWorkerManager] Task ${message.id} completed successfully`);
        this.activeTasks.delete(message.id);
        task.resolve(message.data);
        this.processNextTask();
        break;

      case 'error':
        console.error(`[WebWorkerManager] Task ${message.id} failed:`, message.error);
        this.activeTasks.delete(message.id);
        task.reject(new Error(message.error || 'Worker task failed'));
        this.processNextTask();
        break;
    }
  }

  private handleWorkerError(error: ErrorEvent): void {
    console.error('[WebWorkerManager] Worker error:', error);
    // 可以实现worker重启逻辑
  }

  private getNextWorker(): Worker | null {
    if (this.workers.length === 0) {
      console.error('[WebWorkerManager] No workers available');
      return null;
    }

    const worker = this.workers[this.currentWorkerIndex];
    this.currentWorkerIndex = (this.currentWorkerIndex + 1) % this.workers.length;
    return worker;
  }

  private processNextTask(): void {
    if (this.taskQueue.length === 0) {
      return;
    }

    const worker = this.getNextWorker();
    if (!worker) {
      console.error('[WebWorkerManager] No available worker for next task');
      return;
    }

    const task = this.taskQueue.shift()!;
    this.activeTasks.set(task.id, task);

    // 将文件转换为可传输的格式
    const fileData = {
      name: task.file.name,
      size: task.file.size,
      type: task.file.type,
      lastModified: task.file.lastModified
    };

    // 发送任务到worker
    worker.postMessage({
      id: task.id,
      type: task.type,
      fileData,
      options: task.options
    }, [task.file]); // 传输文件所有权

    console.log(`[WebWorkerManager] Dispatched task ${task.id} to worker`);
  }

  /**
   * 压缩图片任务
   */
  public compressImage(file: File, options: any): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const taskId = `compress_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const task: WorkerTask = {
        id: taskId,
        type: 'compress',
        file,
        options,
        resolve,
        reject
      };

      this.taskQueue.push(task);
      console.log(`[WebWorkerManager] Queued compression task: ${taskId}`);

      // 如果当前没有活跃任务，立即处理
      if (this.activeTasks.size < this.workers.length) {
        this.processNextTask();
      }
    });
  }

  /**
   * 格式转换任务
   */
  public convertFormat(file: File, targetFormat: string, options: any): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const taskId = `convert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const task: WorkerTask = {
        id: taskId,
        type: 'convert',
        file,
        options: { ...options, targetFormat },
        resolve,
        reject
      };

      this.taskQueue.push(task);
      console.log(`[WebWorkerManager] Queued conversion task: ${taskId}`);

      // 如果当前没有活跃任务，立即处理
      if (this.activeTasks.size < this.workers.length) {
        this.processNextTask();
      }
    });
  }

  /**
   * 批量处理任务
   */
  public async processBatch(tasks: Array<{ file: File, type: 'compress' | 'convert', options: any }>): Promise<Blob[]> {
    console.log(`[WebWorkerManager] Processing batch of ${tasks.length} tasks`);

    const promises = tasks.map(task => {
      if (task.type === 'compress') {
        return this.compressImage(task.file, task.options);
      } else {
        return this.convertFormat(task.file, task.options.targetFormat, task.options);
      }
    });

    try {
      const results = await Promise.all(promises);
      console.log(`[WebWorkerManager] Batch processing completed: ${results.length} results`);
      return results;
    } catch (error) {
      console.error('[WebWorkerManager] Batch processing failed:', error);
      throw error;
    }
  }

  /**
   * 获取队列状态
   */
  public getQueueStatus(): {
    queued: number;
    active: number;
    workers: number;
  } {
    return {
      queued: this.taskQueue.length,
      active: this.activeTasks.size,
      workers: this.workers.length
    };
  }

  /**
   * 清空队列
   */
  public clearQueue(): void {
    console.log(`[WebWorkerManager] Clearing queue: ${this.taskQueue.length} tasks cancelled`);

    // 拒绝所有排队的任务
    this.taskQueue.forEach(task => {
      task.reject(new Error('Task cancelled - queue cleared'));
    });

    this.taskQueue = [];
  }

  /**
   * 销毁所有workers
   */
  public destroy(): void {
    console.log('[WebWorkerManager] Destroying all workers');

    // 清空队列
    this.clearQueue();

    // 拒绝所有活跃任务
    this.activeTasks.forEach(task => {
      task.reject(new Error('Task cancelled - manager destroyed'));
    });
    this.activeTasks.clear();

    // 终止所有workers
    this.workers.forEach(worker => {
      worker.terminate();
    });
    this.workers = [];
  }

  /**
   * 检查Web Worker支持
   */
  public static isSupported(): boolean {
    return typeof Worker !== 'undefined';
  }

  /**
   * 获取推荐的worker数量
   */
  public static getRecommendedWorkerCount(): number {
    const cores = navigator.hardwareConcurrency || 4;
    return Math.min(Math.max(cores - 1, 2), 8); // 保留一个核心给主线程，最多8个worker
  }
}

// 单例模式
let workerManagerInstance: WebWorkerManager | null = null;

export function getWorkerManager(): WebWorkerManager {
  if (!workerManagerInstance) {
    if (!WebWorkerManager.isSupported()) {
      throw new Error('Web Workers are not supported in this environment');
    }

    const workerCount = WebWorkerManager.getRecommendedWorkerCount();
    workerManagerInstance = new WebWorkerManager(workerCount);

    console.log(`[WebWorkerManager] Created singleton instance with ${workerCount} workers`);
  }

  return workerManagerInstance;
}

export function destroyWorkerManager(): void {
  if (workerManagerInstance) {
    workerManagerInstance.destroy();
    workerManagerInstance = null;
    console.log('[WebWorkerManager] Singleton instance destroyed');
  }
} 