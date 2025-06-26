/**
 * Performance Monitor - CompressLab V3.0 Phase 3
 * 实时性能监控和分析系统
 */

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  category: 'compression' | 'conversion' | 'system' | 'user';
}

interface ProcessingStats {
  taskId: string;
  type: 'compress' | 'convert';
  fileSize: number;
  format: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  success: boolean;
  error?: string;
  metrics: {
    compressionRatio?: number;
    quality?: number;
    memoryUsage?: number;
    cpuUsage?: number;
  };
}

interface SystemMetrics {
  timestamp: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  performance: {
    fps: number;
    responseTime: number;
    throughput: number;
  };
  cache: {
    hitRate: number;
    size: number;
    entries: number;
  };
  workers: {
    active: number;
    queued: number;
    total: number;
  };
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private processingStats: ProcessingStats[] = [];
  private systemMetrics: SystemMetrics[] = [];
  private maxMetrics: number = 1000;
  private monitoringInterval: number | null = null;
  private isMonitoring: boolean = false;

  constructor() {
    console.log('[PerformanceMonitor] Initialized');
    this.startSystemMonitoring();
  }

  /**
   * 开始系统监控
   */
  private startSystemMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.monitoringInterval = window.setInterval(() => {
      this.collectSystemMetrics();
    }, 5000); // 每5秒收集一次系统指标

    console.log('[PerformanceMonitor] System monitoring started');
  }

  /**
   * 停止系统监控
   */
  private stopSystemMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
    console.log('[PerformanceMonitor] System monitoring stopped');
  }

  /**
   * 收集系统指标
   */
  private collectSystemMetrics(): void {
    const now = Date.now();

    // 内存使用情况
    const memoryInfo = this.getMemoryInfo();

    // 性能指标
    const performanceInfo = this.getPerformanceInfo();

    const systemMetric: SystemMetrics = {
      timestamp: now,
      memory: memoryInfo,
      performance: performanceInfo,
      cache: {
        hitRate: 0, // 需要从SmartCache获取
        size: 0,
        entries: 0
      },
      workers: {
        active: 0, // 需要从WebWorkerManager获取
        queued: 0,
        total: 0
      }
    };

    this.systemMetrics.push(systemMetric);

    // 限制系统指标数量
    if (this.systemMetrics.length > 100) {
      this.systemMetrics = this.systemMetrics.slice(-100);
    }
  }

  /**
   * 获取内存信息
   */
  private getMemoryInfo(): SystemMetrics['memory'] {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
      };
    }

    // 估算值
    return {
      used: 0,
      total: 0,
      percentage: 0
    };
  }

  /**
   * 获取性能信息
   */
  private getPerformanceInfo(): SystemMetrics['performance'] {
    return {
      fps: this.calculateFPS(),
      responseTime: this.calculateResponseTime(),
      throughput: this.calculateThroughput()
    };
  }

  /**
   * 计算FPS
   */
  private calculateFPS(): number {
    // 简单的FPS计算
    const now = performance.now();
    const recentMetrics = this.metrics.filter(m =>
      m.category === 'system' &&
      m.name === 'frame' &&
      now - m.timestamp < 1000
    );

    return recentMetrics.length;
  }

  /**
   * 计算响应时间
   */
  private calculateResponseTime(): number {
    const recentStats = this.processingStats.filter(s =>
      s.endTime && Date.now() - s.endTime < 60000 // 最近1分钟
    );

    if (recentStats.length === 0) return 0;

    const totalDuration = recentStats.reduce((sum, stat) => sum + (stat.duration || 0), 0);
    return totalDuration / recentStats.length;
  }

  /**
   * 计算吞吐量
   */
  private calculateThroughput(): number {
    const recentStats = this.processingStats.filter(s =>
      s.endTime && Date.now() - s.endTime < 60000 // 最近1分钟
    );

    return recentStats.length; // 每分钟处理的任务数
  }

  /**
   * 记录性能指标
   */
  public recordMetric(name: string, value: number, unit: string, category: PerformanceMetric['category']): void {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      category
    };

    this.metrics.push(metric);

    // 限制指标数量
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    console.log(`[PerformanceMonitor] Recorded ${category} metric: ${name} = ${value}${unit}`);
  }

  /**
   * 开始处理任务监控
   */
  public startTask(taskId: string, type: 'compress' | 'convert', fileSize: number, format: string): void {
    const stat: ProcessingStats = {
      taskId,
      type,
      fileSize,
      format,
      startTime: Date.now(),
      success: false,
      metrics: {}
    };

    this.processingStats.push(stat);
    console.log(`[PerformanceMonitor] Started monitoring task: ${taskId}`);
  }

  /**
   * 结束处理任务监控
   */
  public endTask(taskId: string, success: boolean, error?: string, metrics?: ProcessingStats['metrics']): void {
    const stat = this.processingStats.find(s => s.taskId === taskId);
    if (!stat) {
      console.warn(`[PerformanceMonitor] Task not found: ${taskId}`);
      return;
    }

    const now = Date.now();
    stat.endTime = now;
    stat.duration = now - stat.startTime;
    stat.success = success;
    stat.error = error;
    stat.metrics = { ...stat.metrics, ...metrics };

    // 记录相关指标
    this.recordMetric('task_duration', stat.duration, 'ms', stat.type === 'compress' ? 'compression' : 'conversion');
    this.recordMetric('file_size', stat.fileSize, 'bytes', 'system');

    if (stat.metrics.compressionRatio) {
      this.recordMetric('compression_ratio', stat.metrics.compressionRatio, '%', 'compression');
    }

    console.log(`[PerformanceMonitor] Completed task: ${taskId}, duration: ${stat.duration}ms, success: ${success}`);

    // 限制处理统计数量
    if (this.processingStats.length > 500) {
      this.processingStats = this.processingStats.slice(-500);
    }
  }

  /**
   * 获取性能报告
   */
  public getPerformanceReport(): {
    summary: {
      totalTasks: number;
      successRate: number;
      avgDuration: number;
      avgCompressionRatio: number;
      throughput: number;
    };
    recentMetrics: PerformanceMetric[];
    systemHealth: {
      memory: SystemMetrics['memory'];
      performance: SystemMetrics['performance'];
      status: 'excellent' | 'good' | 'warning' | 'critical';
    };
  } {
    const recentStats = this.processingStats.filter(s => s.endTime && Date.now() - s.endTime < 3600000); // 最近1小时
    const successfulStats = recentStats.filter(s => s.success);

    const summary = {
      totalTasks: recentStats.length,
      successRate: recentStats.length > 0 ? (successfulStats.length / recentStats.length) * 100 : 0,
      avgDuration: successfulStats.length > 0 ?
        successfulStats.reduce((sum, s) => sum + (s.duration || 0), 0) / successfulStats.length : 0,
      avgCompressionRatio: this.calculateAvgCompressionRatio(successfulStats),
      throughput: this.calculateThroughput()
    };

    const recentMetrics = this.metrics.slice(-50); // 最近50个指标

    const latestSystemMetric = this.systemMetrics[this.systemMetrics.length - 1];
    const systemHealth = {
      memory: latestSystemMetric?.memory || { used: 0, total: 0, percentage: 0 },
      performance: latestSystemMetric?.performance || { fps: 0, responseTime: 0, throughput: 0 },
      status: this.calculateSystemStatus(latestSystemMetric)
    };

    return {
      summary,
      recentMetrics,
      systemHealth
    };
  }

  /**
   * 计算平均压缩比
   */
  private calculateAvgCompressionRatio(stats: ProcessingStats[]): number {
    const compressionStats = stats.filter(s => s.metrics.compressionRatio);
    if (compressionStats.length === 0) return 0;

    return compressionStats.reduce((sum, s) => sum + (s.metrics.compressionRatio || 0), 0) / compressionStats.length;
  }

  /**
   * 计算系统健康状态
   */
  private calculateSystemStatus(metric?: SystemMetrics): 'excellent' | 'good' | 'warning' | 'critical' {
    if (!metric) return 'warning';

    const memoryUsage = metric.memory.percentage;
    const responseTime = metric.performance.responseTime;

    if (memoryUsage > 90 || responseTime > 5000) return 'critical';
    if (memoryUsage > 70 || responseTime > 2000) return 'warning';
    if (memoryUsage > 50 || responseTime > 1000) return 'good';
    return 'excellent';
  }

  /**
   * 获取性能趋势
   */
  public getPerformanceTrend(metric: string, timeRange: number = 3600000): PerformanceMetric[] {
    const now = Date.now();
    return this.metrics.filter(m =>
      m.name === metric &&
      now - m.timestamp < timeRange
    ).sort((a, b) => a.timestamp - b.timestamp);
  }

  /**
   * 获取任务统计
   */
  public getTaskStats(type?: 'compress' | 'convert'): {
    total: number;
    successful: number;
    failed: number;
    avgDuration: number;
    formats: { [key: string]: number };
  } {
    let stats = this.processingStats.filter(s => s.endTime);
    if (type) {
      stats = stats.filter(s => s.type === type);
    }

    const successful = stats.filter(s => s.success);
    const failed = stats.filter(s => !s.success);

    const formats: { [key: string]: number } = {};
    stats.forEach(s => {
      formats[s.format] = (formats[s.format] || 0) + 1;
    });

    return {
      total: stats.length,
      successful: successful.length,
      failed: failed.length,
      avgDuration: successful.length > 0 ?
        successful.reduce((sum, s) => sum + (s.duration || 0), 0) / successful.length : 0,
      formats
    };
  }

  /**
   * 导出性能数据
   */
  public exportData(): {
    metrics: PerformanceMetric[];
    processingStats: ProcessingStats[];
    systemMetrics: SystemMetrics[];
    report: ReturnType<typeof this.getPerformanceReport>;
  } {
    return {
      metrics: this.metrics,
      processingStats: this.processingStats,
      systemMetrics: this.systemMetrics,
      report: this.getPerformanceReport()
    };
  }

  /**
   * 清空性能数据
   */
  public clear(): void {
    this.metrics = [];
    this.processingStats = [];
    this.systemMetrics = [];
    console.log('[PerformanceMonitor] All performance data cleared');
  }

  /**
   * 销毁监控器
   */
  public destroy(): void {
    this.stopSystemMonitoring();
    this.clear();
    console.log('[PerformanceMonitor] Performance monitor destroyed');
  }

  /**
   * 获取实时性能指标
   */
  public getRealTimeMetrics(): {
    currentMemoryUsage: number;
    currentThroughput: number;
    currentResponseTime: number;
    activeTasks: number;
    queuedTasks: number;
  } {
    const latestSystemMetric = this.systemMetrics[this.systemMetrics.length - 1];
    const activeTasks = this.processingStats.filter(s => !s.endTime).length;

    return {
      currentMemoryUsage: latestSystemMetric?.memory.percentage || 0,
      currentThroughput: latestSystemMetric?.performance.throughput || 0,
      currentResponseTime: latestSystemMetric?.performance.responseTime || 0,
      activeTasks,
      queuedTasks: 0 // 需要从WebWorkerManager获取
    };
  }
}

// 单例模式
let performanceMonitorInstance: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitorInstance) {
    performanceMonitorInstance = new PerformanceMonitor();
    console.log('[PerformanceMonitor] Created singleton instance');
  }

  return performanceMonitorInstance;
}

export function destroyPerformanceMonitor(): void {
  if (performanceMonitorInstance) {
    performanceMonitorInstance.destroy();
    performanceMonitorInstance = null;
    console.log('[PerformanceMonitor] Singleton instance destroyed');
  }
}

// 性能监控装饰器
export function monitorPerformance(category: PerformanceMetric['category']) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (this: any, ...args: any[]) {
      const monitor = getPerformanceMonitor();
      const startTime = performance.now();

      try {
        const result = await method.apply(this, args);
        const duration = performance.now() - startTime;

        monitor.recordMetric(propertyName, duration, 'ms', category);

        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        monitor.recordMetric(`${propertyName}_error`, duration, 'ms', category);
        throw error;
      }
    };
  };
} 