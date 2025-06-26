/**
 * Performance Monitor - CompressLab V3.0 Phase 3
 * 实时性能监控和分析系统
 */

// 简化版PerformanceMonitor - 暂时移除复杂类型以解决部署问题

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  category: 'compression' | 'conversion' | 'system' | 'user';
}

export class PerformanceMonitor {
  public recordMetric(_name: string, _value: number, _unit: string, _category: PerformanceMetric['category']): void {
    // 暂时禁用性能监控
  }

  public startTask(_taskId: string, _type: 'compress' | 'convert', _fileSize: number, _format: string): void {
    // 暂时禁用
  }

  public endTask(_taskId: string, _success: boolean, _error?: string): void {
    // 暂时禁用
  }

  public getPerformanceReport() {
    return {
      summary: {
        totalTasks: 0,
        successRate: 100,
        avgDuration: 0,
        avgCompressionRatio: 0,
        throughput: 0
      },
      recentMetrics: [],
      systemHealth: {
        memory: { used: 0, total: 0, percentage: 0 },
        performance: { fps: 60, responseTime: 0, throughput: 0 },
        status: 'excellent' as const
      }
    };
  }

  public clear(): void {
    // 暂时禁用
  }

  public destroy(): void {
    // 暂时禁用
  }
}

// 单例模式
let performanceMonitorInstance: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitorInstance) {
    performanceMonitorInstance = new PerformanceMonitor();
  }
  return performanceMonitorInstance;
}

export function destroyPerformanceMonitor(): void {
  performanceMonitorInstance = null;
}

// 简化的装饰器
export function monitorPerformance(_category: PerformanceMetric['category']) {
  return function (_target: any, _propertyName: string, descriptor: PropertyDescriptor) {
    return descriptor;
  };
} 