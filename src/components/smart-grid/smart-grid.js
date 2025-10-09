/**
 * Smart Grid Component
 * Intelligent grid system that adapts to content and performance
 */

class SmartGrid extends HTMLElement {
  constructor() {
    super();
    this.resizeObserver = null;
    this.intersectionObserver = null;
    this.performanceMetrics = {
      renderTime: 0,
      itemCount: 0,
      isLargeGrid: false
    };
  }

  connectedCallback() {
    this.initializeGrid();
    this.setupObservers();
    this.optimizePerformance();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  initializeGrid() {
    const startTime = performance.now();

    // Add smart grid classes
    this.classList.add('smart-grid');

    // Detect grid variant
    const variant = this.getAttribute('variant');
    if (variant) {
      this.classList.add(`smart-grid--${variant}`);
    }

    // Set up container queries
    this.style.containerType = 'inline-size';

    // Count items and optimize for large grids
    const itemCount = this.children.length;
    this.performanceMetrics.itemCount = itemCount;

    if (itemCount > 50) {
      this.performanceMetrics.isLargeGrid = true;
      this.setAttribute('data-large', '');
      this.optimizeForLargeGrid();
    }

    // Add grid item classes to children
    Array.from(this.children).forEach((child, index) => {
      child.classList.add('grid-item');
      child.setAttribute('data-grid-index', index);
    });

    this.performanceMetrics.renderTime = performance.now() - startTime;

    // Dispatch initialization event
    this.dispatchEvent(new CustomEvent('smart-grid:initialized', {
      detail: {
        itemCount,
        renderTime: this.performanceMetrics.renderTime,
        variant
      }
    }));
  }

  setupObservers() {
    // Resize observer for adaptive behavior
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
      this.resizeObserver.observe(this);
    }

    // Intersection observer for performance optimization
    if (window.IntersectionObserver && this.performanceMetrics.isLargeGrid) {
      this.intersectionObserver = new IntersectionObserver(
        this.handleIntersection.bind(this),
        { rootMargin: '50px' }
      );

      Array.from(this.children).forEach(child => {
        this.intersectionObserver.observe(child);
      });
    }
  }

  handleResize(entries) {
    const entry = entries[0];
    const width = entry.contentRect.width;

    // Adaptive column count based on container width
    this.updateColumnCount(width);

    // Dispatch resize event
    this.dispatchEvent(new CustomEvent('smart-grid:resize', {
      detail: { width, height: entry.contentRect.height }
    }));
  }

  updateColumnCount(width) {
    const minColumnWidth = parseInt(
      getComputedStyle(this).getPropertyValue(umn-width') || '250px'
    );

    const gap = parseInt(
      getComputedStyle(this).getPropertyValue('--grid-gap') || '1rem'
    );

    // Calculate optimal column count
    const availableWidth = width - gap;
    const columnCount = Math.floor(availableWidth / (minColumnWidth + gap));

    // Update CSS custom property
    this.style.setProperty('--calculated-columns', Math.max(1, columnCount));

    // Add responsive classes
    this.classList.toggle('grid-single-column', columnCount === 1);
    this.classList.toggle('grid-multi-column', columnCount > 1);
    this.classList.toggle('grid-many-columns', columnCount > 3);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      const item = entry.target;

      if (entry.isIntersecting) {
        // Item is visible - ensure it's fully rendered
        item.classList.add('grid-item--visible');
        this.loadItemContent(item);
      } else {
        // Item is not visible - optimize for performance
        item.classList.remove('grid-item--visible');
        this.unloadItemContent(item);
      }
    });
  }

  loadItemContent(item) {
    // Load lazy content if needed
    const lazyImages = item.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });

    // Enable animations
    item.style.willChange = 'transform, opacity';
  }

  unloadItemContent(item) {
    // Disable animations for performance
    item.style.willChange = 'auto';
  }

  optimizePerformance() {
    // Use CSS containment for better performance
    this.style.contain = 'layout style paint';

    // Enable content-visibility for large grids
    if (this.performanceMetrics.isLargeGrid) {
      this.style.contentVisibility = 'auto';
      this.style.containIntrinsicSize = '300px';
    }

    // Debounce resize handling
    this.debouncedResize = this.debounce(this.handleResize.bind(this), 100);
  }

  optimizeForLargeGrid() {
    // Virtual scrolling for very large grids
    if (this.performanceMetrics.itemCount > 100) {
      this.enableVirtualScrolling();
    }

    // Batch DOM updates
    this.batchDOMUpdates = true;

    // Use requestAnimationFrame for smooth updates
    this.useRAF = true;
  }

  enableVirtualScrolling() {
    // Simple virtual scrolling implementation
    const itemHeight = 300; // Estimated item height
    const containerHeight = this.offsetHeight;
    const visibleItems = Math.ceil(containerHeight / itemHeight) + 2; // Buffer

    let startIndex = 0;

    const updateVisibleItems = () => {
      const scrollTop = this.scrollTop || 0;
      const newStartIndex = Math.floor(scrollTop / itemHeight);

      if (newStartIndex !== startIndex) {
        startIndex = newStartIndex;
        this.renderVisibleItems(startIndex, visibleItems);
      }
    };

    // Throttled scroll handler
    this.addEventListener('scroll', this.throttle(updateVisibleItems, 16));
  }

  renderVisibleItems(startIndex, count) {
    const items = Array.from(this.children);

    items.forEach((item, index) => {
      const isVisible = index >= startIndex && index < startIndex + count;
      item.style.display = isVisible ? '' : 'none';
    });
  }

  // Adaptive methods
  adaptToContent() {
    // Analyze content and adjust grid accordingly
    const items = Array.from(this.children);
    const hasImages = items.some(item => item.querySelector('img'));
    const hasLongText = items.some(item => {
      const text = item.textContent || '';
      return text.length > 200;
    });

    if (hasImages) {
      this.classList.add('grid-has-images');
      this.style.setProperty('--min-column-width', '300px');
    }

    if (hasLongText) {
      this.classList.add('grid-has-long-text');
      this.style.setProperty('--min-column-width', '350px');
    }
  }

  adaptToDevice() {
    // Adapt based on device capabilities
    const isLowEnd = navigator.hardwareConcurrency <= 2;
    const isSlowConnection = navigator.connection?.effectiveType === '2g';

    if (isLowEnd || isSlowConnection) {
      this.enablePerformanceMode();
    }

    // Touch device optimizations
    if ('ontouchstart' in window) {
      this.classList.add('grid-touch-device');
      this.style.setProperty('--grid-gap', '1.5rem'); // Larger gaps for touch
    }
  }

  enablePerformanceMode() {
    this.classList.add('grid-performance-mode');

    // Disable expensive features
    this.style.willChange = 'auto';
    this.style.transform = 'none';

    // Reduce animation complexity
    Array.from(this.children).forEach(child => {
      child.style.transition = 'none';
    });
  }

  // Utility methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Public API methods
  addItem(element, index = -1) {
    element.classList.add('grid-item');

    if (index === -1) {
      this.appendChild(element);
    } else {
      const referenceNode = this.children[index];
      this.insertBefore(element, referenceNode);
    }

    // Update metrics
    this.performanceMetrics.itemCount++;

    // Re-observe if using intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.observe(element);
    }

    // Dispatch event
    this.dispatchEvent(new CustomEvent('smart-grid:item-added', {
      detail: { element, index }
    }));
  }

  removeItem(element) {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(element);
    }

    element.remove();
    this.performanceMetrics.itemCount--;

    this.dispatchEvent(new CustomEvent('smart-grid:item-removed', {
      detail: { element }
    }));
  }

  refresh() {
    // Re-initialize grid
    this.cleanup();
    this.initializeGrid();
    this.setupObservers();
  }

  cleanup() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  // Static methods
  static create(options = {}) {
    const grid = document.createElement('smart-grid');

    if (options.variant) {
      grid.setAttribute('variant', options.variant);
    }

    if (options.items) {
      options.items.forEach(item => grid.appendChild(item));
    }

    return grid;
  }
}

// Register custom element
customElements.define('smart-grid', SmartGrid);

// Export for module usage
export default SmartGrid;
