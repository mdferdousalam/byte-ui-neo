/**
 * Performance Monitor - Real-time performance tracking and optimization
 * Monitors Core Web Vitals and automatically optimizes components
 */

class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      enableAutoOptimization: true,
      budgets: {
        lcp: 2500,    // Largest Contentful Paint (ms)
        fid: 100,     // First Input Delay (ms)
        cls: 0.1,     // Cumulative Layout Shift
        fcp: 1800,    // First Contentful Paint (ms)
        ttfb: 600     // Time to First Byte (ms)
      },
      reportingEndpoint: null,
      enableConsoleReporting: true,
      ...options
    };

    this.metrics = {
      lcp: null,
      fid: null,
      cls: 0,
      fcp: null,
      ttfb: null
    };

    this.observers = new Map();
    this.optimizations = new Set();

    this.init();
  }

  init() {
    // Initialize performance observers
    this.initLCPObserver();
    this.initFIDObserver();
    this.initCLSObserver();
    this.initFCPObserver();
    this.initTTFBObserver();

    // Monitor component performance
    this.initComponentMonitoring();

    // Set up automatic optimization
    if (this.options.enableAutoOptimization) {
      this.initAutoOptimization();
    }

    // Report initial metrics
    this.scheduleReport();
  }

  // Core Web Vitals Observers
  initLCPObserver() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      this.metrics.lcp = lastEntry.startTime;
      this.checkBudget('lcp', lastEntry.startTime);

      this.dispatchMetricEvent('lcp', lastEntry.startTime);
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', observer);
    } catch (e) {
      console.warn('LCP observer not supported');
    }
  }

  initFIDObserver() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        this.metrics.fid = entry.processingStart - entry.startTime;
        this.checkBudget('fid', this.metrics.fid);

        this.dispatchMetricEvent('fid', this.metrics.fid);
      });
    });

    try {
      observer.observe({ entryTypes: ['first-input'];
      this.observers.set('fid', observer);
    } catch (e) {
      console.warn('FID observer not supported');
    }
  }

  initCLSObserver() {
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries = [];

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          if (sessionValue &&
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            this.metrics.cls = clsValue;
            this.checkBudget('cls', clsValue);

            this.dispatchMetricEvent('cls', clsValue);
          }
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', observer);
    } catch (e) {
      console.warn('CLS observer not supported');
    }
  }

  initFCPObserver() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
          this.checkBudget('fcp', entry.startTime);

          this.dispatchMetricEvent('fcp', entry.startTime);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['paint'] });
      this.observers.set('fcp', observer);
    } catch (e) {
      console.warn('FCP observer not supported');
    }
  }

  initTTFBObserver() {
    // TTFB from Navigation Timing API
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0];
        this.metrics.ttfb = entry.responseStart - entry.requestStart;
        this.checkBudget('ttfb', this.metrics.ttfb);

        this.dispatchMetricEvent('ttfb', this.metrics.ttfb);
      }
    }
  }

  // Component Performance Monitoring
  initComponentMonitoring() {
    // Monitor component render times
    this.monitorComponentRenders();

    // Monitor interaction latency
    this.monitorInteractionLatency();

    // Monitor memory usage
    this.monitorMemoryUsage();
  }

  monitorComponentRenders() {
    // Use MutationObserver to track DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.trackComponentRender(node);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.set('component-renders', observer);
  }

  trackComponentRender(element) {
    const startTime = performance.now();

    // Use requestAnimationFrame to measure render completion
    requestAnimationFrame(() => {
      const renderTime = performance.now() - startTime;

      // Track slow renders
      if (renderTime > 16) { // Slower than 60fps
        this.reportSlowRender(element, renderTime);
      }

      // Add performance data attribute
      element.setAttribute('data-render-time', renderTime.toFixed(2));
    });
  }

  monitorInteractionLatency() {
    let interactionStart = 0;

    // Track pointer events
    document.addEventListener('pointerdown', () => {
      interactionStart = performance.now();
    }, { passive: true });

    document.addEventListener('click', () => {
      if (interactionStart) {
        const latency = performance.now() - interactionStart;

        if (latency > 100) { // Poor interaction responsiveness
          this.reportSlowInteraction(latency);
        }

        interactionStart = 0;
      }
    }, { passive: true });
  }

  monitorMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const usedMB = memory.usedJSHeapSize / 1048576;
        const totalMB = memory.totalJSHeapSize / 1048576;

        // Check for memory pressure
        if (usedMB > 50 || (usedMB / totalMB) > 0.8) {
          this.reportMemoryPressure(usedMB, totalMB);
        }
      }, 30000); // Check every 30 seconds
    }
  }

  // Budget Checking and Optimization
  checkBudget(metric, value) {
    const budget = this.options.budgets[metric];
    if (!budget) return;

    const isOverBudget = value > budget;

    if (isOverBudget && this.options.enableAutoOptimization) {
      this.triggerOptimization(metric, value, budget);
    }

    // Report budget violation
    if (isOverBudget && this.options.enableConsoleReporting) {
      console.warn(`Performance budget exceeded for ${metric.toUpperCase()}: ${value} > ${budget}`);
    }
  }

  triggerOptimization(metric, value, budget) {
    const optimizationKey = `${metric}-optimization`;

    // Prevent duplicate optimizations
    if (this.optimizations.has(optimizationKey)) return;
    this.optimizations.add(optimizationKey);

    switch (metric) {
      case 'lcp':
        this.optimizeLCP();
        break;
      case 'fid':
        this.optimizeFID();
        break;
      case 'cls':
        this.optimizeCLS();
        break;
      case 'fcp':
        this.optimizeFCP();
        break;
    }

    // Dispatch optimization event
    this.dispatchEvent('performance:optimization-triggered', {
      metric,
      value,
      budget,
      optimization: optimizationKey
    });
  }

  // Optimization Strategies
  optimizeLCP() {
    // Enable performance mode for components
    document.documentElement.classList.add('performance-mode');

    // Preload critical resources
    this.preloadCriticalResources();

    // Optimize images
    this.optimizeImages();
  }

  optimizeFID() {
    // Break up long tasks
    this.breakUpLongTasks();

    // Defer non-critical JavaScript
    this.deferNonCriticalJS();

    // Use web workers for heavy computations
    this.offloadToWebWorkers();
  }

  optimizeCLS() {
    // Add size attributes to images
    this.addImageDimensions();

    // Reserve space for dynamic content
    this.reserveSpaceForDynamicContent();

    // Optimize font loading
    this.optimizeFontLoading();
  }

  optimizeFCP() {
    // Inline critical CSS
    this.inlineCriticalCSS();

    // Remove render-blocking resources
    this.removeRenderBlockingResources();

    // Optimize server response time
    this.optimizeServerResponse();
  }

  // Optimization Implementation Methods
  preloadCriticalResources() {
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[data-critical]');
    criticalImages.forEach(img => {
      if (!img.src && img.dataset.src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.dataset.src;
        document.head.appendChild(link);
      }
    });
  }

  optimizeImages() {
    const images = document.querySelectorAll('img:not([data-optimized])');
    images.forEach(img => {
      // Add loading="lazy" for non-critical images
      if (!img.hasAttribute('data-critical')) {
        img.loading = 'lazy';
      }

      // Add decoding="async"
      img.decoding = 'async';

      img.setAttribute('data-optimized', 'true');
    });
  }

  addImageDimensions() {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      // Use aspect-ratio CSS property as fallback
      if (!img.style.aspectRatio) {
        img.style.aspectRatio = '16/9'; // Default aspect ratio
      }
    });
  }

  deferNonCriticalJS() {
    const scripts = document.querySelectorAll('script:not([data-critical])');
    scripts.forEach(script => {
      if (!script.defer && !script.async) {
        script.defer = true;
      }
    });
  }

  // Reporting
  reportSlowRender(element, renderTime) {
    this.dispatchEvent('performance:slow-render', {
      element: element.tagName.toLowerCase(),
      renderTime,
      threshold: 16
    });
  }

  reportSlowInteraction(latency) {
    this.dispatchEvent('performance:slow-interaction', {
      latency,
      threshold: 100
    });
  }

  reportMemoryPressure(usedMB, totalMB) {
    this.dispatchEvent('performance:memory-pressure', {
      usedMB,
      totalMB,
      percentage: (usedMB / totalMB) * 100
    });
  }

  scheduleReport() {
    // Report metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.generateReport();
      }, 1000);
    });
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      url: window.location.href,
      metrics: { ...this.metrics },
      budgets: this.options.budgets,
      violations: this.getBudgetViolations(),
      optimizations: Array.from(this.optimizations),
      deviceInfo: this.getDeviceInfo()
    };

    if (this.options.enableConsoleReporting) {
      console.group('🚀 Byte UI Performance Report');
      console.table(this.metrics);
      console.log('Budget Violations:', report.violations);
      console.log('Applied Optimizations:', report.optimizations);
      console.groupEnd();
    }

    // Send to reporting endpoint
    if (this.options.reportingEndpoint) {
      this.sendReport(report);
    }

    // Dispatch report event
    this.dispatchEvent('performance:report-generated', report);

    return report;
  }

  getBudgetViolations() {
    const violations = [];

    Object.keys(this.options.budgets).forEach(metric => {
      const value = this.metrics[metric];
      const budget = this.options.budgets[metric];

      if (value !== null && value > budget) {
        violations.push({
          metric,
          value,
          budget,
          excess: value - budget
        });
      }
    });

    return violations;
  }

  getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null
    };
  }

  sendReport(report) {
    fetch(this.options.reportingEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    }).catch(error => {
      console.warn('Failed to send performance report:', error);
    });
  }

  // Event System
  dispatchEvent(type, detail) {
    document.dispatchEvent(new CustomEvent(type, { detail }));
  }

  dispatchMetricEvent(metric, value) {
    this.dispatchEvent(`performance:${metric}`, { metric, value });
  }

  // Public API
  getMetrics() {
    return { ...this.metrics };
  }

  getBudgets() {
    return { ...this.options.budgets };
  }

  setBudget(metric, value) {
    this.options.budgets[metric] = value;
  }

  enableOptimization(metric) {
    this.triggerOptimization(metric, this.metrics[metric], this.options.budgets[metric]);
  }

  cleanup() {
    this.observers.forEach(observer => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    });
    this.observers.clear();
  }

  // Static methods
  static create(options) {
    return new PerformanceMonitor(options);
  }

  static getGlobalInstance() {
    if (!window.ByteUIPerformanceMonitor) {
      window.ByteUIPerformanceMonitor = new PerformanceMonitor();
    }
    return window.ByteUIPerformanceMonitor;
  }
}

// Auto-initialize global instance
if (typeof window !== 'undefined') {
  window.PerformanceMonitor = PerformanceMonitor;

  // Auto-start monitoring
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.ByteUIPerformanceMonitor) {
      window.ByteUIPerformanceMonitor = new PerformanceMonitor();
    }
  });
}

export default PerformanceMonitor;
