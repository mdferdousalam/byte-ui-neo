/**
 * Adaptive Button Component
 * Revolutionary button that adapts to context, device capabilities, and usage patterns
 */

class AdaptiveButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		// Performance monitoring
		this.performanceMetrics = {
			renderTime: 0,
			interactionCount: 0,
			lastInteraction: null,
		};

		// Device capabilities detection
		this.deviceCapabilities = this.detectDeviceCapabilities();

		// Usage analytics
		this.usagePattern = {
			clickFrequency: 0,
			averageHoldTime: 0,
			preferredSize: 'medium',
		};
	}

	static get observedAttributes() {
		return ['variant', 'size', 'adaptive', 'performance-mode', 'context'];
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
		this.initializeAdaptiveFeatures();
		this.startPerformanceMonitoring();
	}

	disconnectedCallback() {
		this.cleanup();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (this.shadowRoot && oldValue !== newValue) {
			this.handleAttributeChange(name, newValue);
		}
	}

	//ce capabilities detection
	detectDeviceCapabilities() {
		const capabilities = {
			isLowEnd: false,
			supportsHover: false,
			prefersReducedMotion: false,
			connectionSpeed: 'fast',
			memoryLevel: 'high',
		};

		// Check for low-end device indicators
		if (navigator.hardwareConcurrency <= 2) {
			capabilities.isLowEnd = true;
		}

		// Check hover capability
		capabilities.supportsHover = window.matchMedia('(hover: hover)').matches;

		// Check motion preferences
		capabilities.prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		// Check connection speed
		if (navigator.connection) {
			const connection = navigator.connection;
			if (
				connection.effectiveType === 'slow-2g' ||
				connection.effectiveType === '2g'
			) {
				capabilities.connectionSpeed = 'slow';
			} else if (connection.effectiveType === '3g') {
				capabilities.connectionSpeed = 'medium';
			}
		}

		// Check memory level
		if (navigator.deviceMemory && navigator.deviceMemory <= 2) {
			capabilities.memoryLevel = 'low';
		} else if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
			capabilities.memoryLevel = 'medium';
		}

		return capabilities;
	}

	// Adaptive rendering based on context and capabilities
	render() {
		const startTime = performance.now();

		const variant = this.getAttribute('variant') || 'primary';
		const size = this.getAdaptiveSize();
		const isAdaptive = this.hasAttribute('adaptive');
		const performanceMode =
			this.hasAttribute('performance-mode') || this.deviceCapabilities.isLowEnd;

		this.shadowRoot.innerHTML = `
      <style>
        ${this.getAdaptiveStyles(variant, size, performanceMode)}
      </style>

      <button
        class="adaptive-btn adaptive-btn--${variant} adaptive-btn--${size}"
        part="button"
        ${this.getAccessibilityAttributes()}
      >
        ${this.getLoadingSpinner()}
        <span class="btn-content" part="content">
          <slot></slot>
        </span>
        ${this.getAdaptiveIndicators()}
      </button>
    `;

		this.performanceMetrics.renderTime = performance.now() - startTime;

		if (isAdaptive) {
			this.optimizeBasedOnMetrics();
		}
	}

	// Intelligent size adaptation
	getAdaptiveSize() {
		const baseSize = this.getAttribute('size') || 'medium';
		const context = this.getAttribute('context');

		// Adapt based on context
		if (context === 'mobile-nav') return 'small';
		if (context === 'hero-cta') return 'large';
		if (context === 'form-inline') return 'small';

		// Adapt based on container size (if container queries supported)
		if (CSS.supports('container-type: inline-size')) {
			return baseSize; // Let CSS handle it
		}

		// Fallback: adapt based on viewport
		const viewportWidth = window.innerWidth;
		if (viewportWidth < 480 && baseSize === 'large') return 'medium';
		if (viewportWidth < 320 && baseSize === 'medium') return 'small';

		return baseSize;
	}

	// Performance-optimized styles
	getAdaptiveStyles(variant, size, performanceMode) {
		const baseStyles = `
      :host {
        display: inline-block;
        --btn-transition: ${
					performanceMode ? 'none' : '0.2s cubic-bezier(0.4, 0, 0.2, 1)'
				};
        --btn-shadow: ${
					performanceMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.12)'
				};
      }

      .adaptive-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        border: 1px solid transparent;
        border-radius: 0.375rem;
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;

        transition: var(--btn-transition);
        box-shadow: var(--btn-shadow);

        /* Accessibility */
        min-height: 44px;
        min-width: 44px;

        /* Performance optimizations */
        ${performanceMode ? '' : 'will-change: transform, box-shadow;'}
        ${performanceMode ? '' : 'transform: translateZ(0);'}
      }

      /* Size variants */
      .adaptive-btn--small {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        min-height: 36px;
      }

      .adaptive-btn--medium {
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }

      .adaptive-btn--large {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
        min-height: 52px;
      }

      /* Variant styles */
      ${this.getVariantStyles(variant, performanceMode)}

      /* Adaptive features */
      ${this.getAdaptiveFeatureStyles(performanceMode)}

      /* Accessibility enhancements */
      .adaptive-btn:focus-visible {
        outline: 2px solid var(--focus-color, #3b82f6);
        outline-offset: 2px;
      }

      /* High contrast mode */
      @media (prefers-contrast: high) {
        .adaptive-btn {
          border: 2px solid currentColor;
        }
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .adaptive-btn {
          transition: none;
        }
      }

      /* Container queries for adaptive sizing */
      @container (max-width: 200px) {
        .adaptive-btn {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          min-height: 32px;
        }
      }
    `;

		return baseStyles;
	}

	getVariantStyles(variant, performanceMode) {
		const variants = {
			primary: `
        .adaptive-btn--primary {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .adaptive-btn--primary:hover:not(:disabled) {
          background: #2563eb;
          ${performanceMode ? '' : 'transform: translateY(-1px);'}
          ${
						performanceMode
							? ''
							: 'box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);'
					}
        }
      `,
			secondary: `
        .adaptive-btn--secondary {
          background: transparent;
          color: #3b82f6;
          border-color: #3b82f6;
        }

        .adaptive-btn--secondary:hover:not(:disabled) {
          background: #3b82f6;
          color: white;
        }
      `,
			ghost: `
        .adaptive-btn--ghost {
          background: transparent;
          color: #374151;
          border-color: transparent;
        }

        .adaptive-btn--ghost:hover:not(:disabled) {
          background: #f3f4f6;
        }
      `,
		};

		return variants[variant] || variants.primary;
	}

	getAdaptiveFeatureStyles(performanceMode) {
		if (performanceMode) return '';

		return `
      /* Micro-interactions */
      .adaptive-btn:active {
        transform: translateY(0);
        transition-duration: 0.1s;
      }

      /* Loading state */
      .adaptive-btn.loading {
        pointer-events: none;
        opacity: 0.7;
      }

      .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Adaptive indicators */
      .adaptive-indicator {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 6px;
        height: 6px;
        background: #10b981;
        border-radius: 50%;
        opacity: 0.8;
      }
    `;
	}

	getAccessibilityAttributes() {
		const attrs = [];

		if (this.hasAttribute('loading')) {
			attrs.push('aria-busy="true"');
		}

		if (this.hasAttribute('disabled')) {
			attrs.push('disabled');
			attrs.push('aria-disabled="true"');
		}

		return attrs.join(' ');
	}

	getLoadingSpinner() {
		if (!this.hasAttribute('loading')) return '';

		return `
      <div class="loading-spinner" aria-hidden="true"></div>
    `;
	}

	getAdaptiveIndicators() {
		if (!this.hasAttribute('adaptive') || this.deviceCapabilities.isLowEnd)
			return '';

		return `
      <div class="adaptive-indicator"
           title="Adaptive component - optimizing for your device"
           aria-hidden="true">
      </div>
    `;
	}

	// Event listeners and interactions
	setupEventListeners() {
		const button = this.shadowRoot.querySelector('.adaptive-btn');

		button.addEventListener('click', this.handleClick.bind(this));
		button.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
		button.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
		button.addEventListener('focus', this.handleFocus.bind(this));
		button.addEventListener('blur', this.handleBlur.bind(this));

		// Touch events for mobile optimization
		if ('ontouchstart' in window) {
			button.addEventListener('touchstart', this.handleTouchStart.bind(this), {
				passive: true,
			});
			button.addEventListener('touchend', this.handleTouchEnd.bind(this), {
				passive: true,
			});
		}
	}

	handleClick(event) {
		this.performanceMetrics.interactionCount++;
		this.performanceMetrics.lastInteraction = Date.now();

		// Dispatch custom event with analytics
		this.dispatchEvent(
			new CustomEvent('adaptive:click', {
				detail: {
					variant: this.getAttribute('variant'),
					size: this.getAdaptiveSize(),
					performanceMetrics: this.performanceMetrics,
					deviceCapabilities: this.deviceCapabilities,
				},
				bubbles: true,
			}),
		);

		// Update usage patterns
		this.updateUsagePattern('click');
	}

	handleMouseEnter(event) {
		if (!this.deviceCapabilities.supportsHover) return;

		this.classList.add('hover');
	}

	handleMouseLeave(event) {
		this.classList.remove('hover');
	}

	handleFocus(event) {
		this.classList.add('focused');
	}

	handleBlur(event) {
		this.classList.remove('focused');
	}

	handleTouchStart(event) {
		this.touchStartTime = Date.now();
	}

	handleTouchEnd(event) {
		if (this.touchStartTime) {
			const holdTime = Date.now() - this.touchStartTime;
			this.updateUsagePattern('touch', { holdTime });
		}
	}

	// Adaptive features
	initializeAdaptiveFeatures() {
		if (!this.hasAttribute('adaptive')) return;

		// Monitor container size changes
		if (window.ResizeObserver) {
			this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
			this.resizeObserver.observe(this);
		}

		// Monitor performance
		this.performanceObserver = new PerformanceObserver(
			this.handlePerformanceEntries.bind(this),
		);
		this.performanceObserver.observe({ entryTypes: ['measure', 'navigation'] });

		// Adapt to system changes
		this.setupSystemAdaptation();
	}

	handleResize(entries) {
		const entry = entries[0];
		const width = entry.contentRect.width;

		// Adapt size based on available space
		if (width < 100 && !this.hasAttribute('size')) {
			this.setAttribute('size', 'small');
		} else if (width > 200 && this.getAttribute('size') === 'small') {
			this.removeAttribute('size');
		}
	}

	handlePerformanceEntries(list) {
		const entries = list.getEntries();

		entries.forEach((entry) => {
			if (entry.duration > 16) {
				// Slower than 60fps
				this.enablePerformanceMode();
			}
		});
	}

	setupSystemAdaptation() {
		// Adapt to connection changes
		if (navigator.connection) {
			navigator.connection.addEventListener('change', () => {
				this.deviceCapabilities = this.detectDeviceCapabilities();
				this.adaptToCapabilities();
			});
		}

		// Adapt to memory pressure
		if ('memory' in performance) {
			setInterval(() => {
				const memory = performance.memory;
				const usedMB = memory.usedJSHeapSize / 1048576;

				if (usedMB > 50) {
					// High memory usage
					this.enablePerformanceMode();
				}
			}, 30000);
		}
	}

	// Performance optimization
	enablePerformanceMode() {
		if (this.hasAttribute('performance-mode')) return;

		this.setAttribute('performance-mode', '');
		this.render(); // Re-render with performance optimizations
	}

	optimizeBasedOnMetrics() {
		const { renderTime, interactionCount } = this.performanceMetrics;

		// If rendering is slow, enable performance mode
		if (renderTime > 16) {
			this.enablePerformanceMode();
		}

		// If frequently used, preload hover states
		if (interactionCount > 10) {
			this.preloadHoverStates();
		}
	}

	preloadHoverStates() {
		// Preload hover styles for better perceived performance
		const style = document.createElement('style');
		style.textContent = `
      adaptive-button:hover .adaptive-btn {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `;
		document.head.appendChild(style);
	}

	// Usage analytics
	updateUsagePattern(action, data = {}) {
		switch (action) {
			case 'click':
				this.usagePattern.clickFrequency++;
				break;
			case 'touch':
				if (data.holdTime) {
					this.usagePattern.averageHoldTime =
						(this.usagePattern.averageHoldTime + data.holdTime) / 2;
				}
				break;
		}

		// Adapt based on usage patterns
		this.adaptToUsagePattern();
	}

	adaptToUsagePattern() {
		const { clickFrequency, averageHoldTime } = this.usagePattern;

		// If frequently clicked, optimize for speed
		if (clickFrequency > 20) {
			this.enablePerformanceMode();
		}

		// If long hold times, user might have difficulty
		if (averageHoldTime > 500) {
			this.setAttribute('size', 'large'); // Make it easier to tap
		}
	}

	// Performance monitoring
	startPerformanceMonitoring() {
		if (!this.hasAttribute('adaptive')) return;

		// Monitor Core Web Vitals impact
		this.monitorWebVitals();

		// Monitor interaction responsiveness
		this.monitorInteractionLatency();
	}

	monitorWebVitals() {
		// Monitor LCP impact
		new PerformanceObserver((list) => {
			const entries = list.getEntries();
			const lastEntry = entries[entries.length - 1];

			if (lastEntry.startTime > 2500) {
				// Poor LCP
				this.enablePerformanceMode();
			}
		}).observe({ entryTypes: ['largest-contentful-paint'] });

		// Monitor CLS impact
		new PerformanceObserver((list) => {
			let clsValue = 0;

			for (const entry of list.getEntries()) {
				if (!entry.hadRecentInput) {
					clsValue += entry.value;
				}
			}

			if (clsValue > 0.1) {
				// Poor CLS
				this.enablePerformanceMode();
			}
		}).observe({ entryTypes: ['layout-shift'] });
	}

	monitorInteractionLatency() {
		let interactionStart = 0;

		this.addEventListener('pointerdown', () => {
			interactionStart = performance.now();
		});

		this.addEventListener('click', () => {
			const latency = performance.now() - interactionStart;

			if (latency > 100) {
				// Poor interaction responsiveness
				this.enablePerformanceMode();
			}
		});
	}

	// Attribute change handling
	handleAttributeChange(name, value) {
		switch (name) {
			case 'variant':
			case 'size':
				this.render();
				break;
			case 'adaptive':
				if (value !== null) {
					this.initializeAdaptiveFeatures();
				} else {
					this.cleanup();
				}
				break;
			case 'performance-mode':
				this.render();
				break;
		}
	}

	// Cleanup
	cleanup() {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}

		if (this.performanceObserver) {
			this.performanceObserver.disconnect();
		}
	}

	// Utility methods
	adaptToCapabilities() {
		if (this.deviceCapabilities.isLowEnd) {
			this.enablePerformanceMode();
		}

		if (!this.deviceCapabilities.supportsHover) {
			this.setAttribute('touch-optimized', '');
		}

		if (this.deviceCapabilities.prefersReducedMotion) {
			this.setAttribute('reduced-motion', '');
		}
	}
}

// Register the custom element
customElements.define('adaptive-button', AdaptiveButton);

// Export for module usage
export default AdaptiveButton;
