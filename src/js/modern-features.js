/**
 * Modern JavaScript Features for Hikma UI
 * Advanced component patterns and modern web APIs
 */

class HikmaModernFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.initContainerQueries();
        this.initIntersectionObserver();
        this.initResizeObserver();
        this.initViewTransitions();
        this.initWebComponents();
        this.initModernAnimations();
        this.initAdvancedFeatures();
    }

    // 1. Container Queries Support
    initContainerQueries() {
        if (!CSS.supports('container-type: inline-size')) {
            console.warn('Container queries not supported, falling back to ResizeObserver');
            this.polyfillContainerQueries();
        }
    }

    polyfillContainerQueries() {
        const adaptiveCards = document.querySelectorAll('.adaptive-card');
        
        adaptiveCards.forEach(card => {
            const resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    const width = entry.contentRect.width;
                    const element = entry.target;
                    
                    element.classList.toggle('container-sm', width < 300);
                    element.classList.toggle('container-md', width >= 300 && width < 600);
                    element.classList.toggle('container-lg', width >= 600);
                });
            });
            
            resizeObserver.observe(card);
        });
    }

    // 2. Intersection Observer for Scroll Animations
    initIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // 3. ResizeObserver for Dynamic Components
    initResizeObserver() {
        if (!window.ResizeObserver) {
            console.warn('ResizeObserver not supported');
            return;
        }

        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const element = entry.target;
                const width = entry.contentRect.width;
                
                // Dynamic class assignment based on size
                element.classList.toggle('size-sm', width < 400);
                element.classList.toggle('size-md', width >= 400 && width < 800);
                element.classList.toggle('size-lg', width >= 800);
                
                // Custom event for size changes
                element.dispatchEvent(new CustomEvent('hikma:resize', {
                    detail: { width, height: entry.contentRect.height }
                }));
            });
        });

        document.querySelectorAll('.responsive-component').forEach(el => {
            resizeObserver.observe(el);
        });
    }

    // 4. View Transitions API
    initViewTransitions() {
        if (!document.startViewTransition) {
            console.warn('View Transitions API not supported');
            return;
        }

        // Enhanced page transitions
        document.addEventListener('click', async (e) => {
            const link = e.target.closest('a[data-view-transition]');
            if (!link) return;

            e.preventDefault();
            
            const transitionType = link.dataset.viewTransition;
            
            await document.startViewTransition(() => {
                this.navigateToPage(link.href, transitionType);
            });
        });
    }

    async navigateToPage(url, transitionType) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            
            // Update page content
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            
            // Update specific elements based on transition type
            if (transitionType === 'slide') {
                this.updateWithSlideTransition(newDoc);
            } else if (transitionType === 'fade') {
                this.updateWithFadeTransition(newDoc);
            } else {
                this.updateWithDefaultTransition(newDoc);
            }
            
            // Update URL
            history.pushState({}, '', url);
        } catch (error) {
            console.error('Navigation failed:', error);
        }
    }

    updateWithSlideTransition(newDoc) {
        const main = document.querySelector('main');
        const newMain = newDoc.querySelector('main');
        
        if (main && newMain) {
            main.style.viewTransitionName = 'slide-in';
            main.innerHTML = newMain.innerHTML;
        }
    }

    updateWithFadeTransition(newDoc) {
        const main = document.querySelector('main');
        const newMain = newDoc.querySelector('main');
        
        if (main && newMain) {
            main.style.viewTransitionName = 'fade-in';
            main.innerHTML = newMain.innerHTML;
        }
    }

    updateWithDefaultTransition(newDoc) {
        const main = document.querySelector('main');
        const newMain = newDoc.querySelector('main');
        
        if (main && newMain) {
            main.innerHTML = newMain.innerHTML;
        }
    }

    // 5. Web Components
    initWebComponents() {
        this.defineHikmaCard();
        this.defineHikmaButton();
        this.defineHikmaTooltip();
    }

    defineHikmaCard() {
        class HikmaCard extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                this.render();
                this.setupEventListeners();
            }

            render() {
                this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block;
                            background: var(--hikma-surface-color);
                            border: 1px solid var(--hikma-border-color-base);
                            border-radius: var(--hikma-border-radius);
                            padding: var(--hikma-spacing-md);
                            transition: var(--hikma-transition-base);
                        }
                        
                        :host(:hover) {
                            transform: translateY(-2px);
                            box-shadow: var(--hikma-shadow-lg);
                        }
                        
                        .card-header {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: var(--hikma-spacing-md);
                            padding-bottom: var(--hikma-spacing-sm);
                            border-bottom: 1px solid var(--hikma-border-color-light);
                        }
                        
                        .card-title {
                            margin: 0;
                            font-size: var(--hikma-font-size-lg);
                            font-weight: var(--hikma-font-weight-semibold);
                            color: var(--hikma-text-color-base);
                        }
                        
                        .card-content {
                            color: var(--hikma-text-color-muted);
                            line-height: 1.6;
                        }
                        
                        .card-actions {
                            display: flex;
                            gap: var(--hikma-spacing-sm);
                            margin-top: var(--hikma-spacing-md);
                            padding-top: var(--hikma-spacing-md);
                            border-top: 1px solid var(--hikma-border-color-light);
                        }
                    </style>
                    
                    <div class="card-header">
                        <h3 class="card-title">
                            <slot name="title"></slot>
                        </h3>
                        <slot name="header-actions"></slot>
                    </div>
                    
                    <div class="card-content">
                        <slot></slot>
                    </div>
                    
                    <div class="card-actions">
                        <slot name="actions"></slot>
                    </div>
                `;
            }

            setupEventListeners() {
                this.addEventListener('click', (e) => {
                    if (e.target.matches('[data-action]')) {
                        const action = e.target.dataset.action;
                        this.dispatchEvent(new CustomEvent('hikma:card:action', {
                            detail: { action, element: e.target }
                        }));
                    }
                });
            }
        }

        customElements.define('hikma-card', HikmaCard);
    }

    defineHikmaButton() {
        class HikmaButton extends HTMLElement {
            static get observedAttributes() {
                return ['variant', 'size', 'disabled', 'loading'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                this.render();
                this.setupEventListeners();
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (this.shadowRoot) {
                    this.updateButtonState();
                }
            }

            render() {
                this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: inline-block;
                        }
                        
                        button {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            gap: var(--hikma-spacing-xs);
                            background: var(--hikma-color-primary);
                            color: white;
                            border: 1px solid var(--hikma-color-primary);
                            border-radius: var(--hikma-border-radius);
                            padding: var(--hikma-spacing-sm) var(--hikma-spacing-md);
                            font-size: var(--hikma-font-size-base);
                            font-weight: var(--hikma-font-weight-medium);
                            cursor: pointer;
                            transition: var(--hikma-transition-base);
                            text-decoration: none;
                            
                            &:hover {
                                background: var(--hikma-color-primary-hover, var(--hikma-color-primary));
                                transform: translateY(-1px);
                                box-shadow: var(--hikma-shadow-sm);
                            }
                            
                            &:active {
                                transform: translateY(0);
                            }
                            
                            &:disabled {
                                opacity: 0.6;
                                cursor: not-allowed;
                                transform: none;
                            }
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
                        
                        :host([variant="secondary"]) button {
                            background: var(--hikma-color-secondary);
                            border-color: var(--hikma-color-secondary);
                        }
                        
                        :host([variant="outline"]) button {
                            background: transparent;
                            color: var(--hikma-color-primary);
                            border-color: var(--hikma-color-primary);
                        }
                        
                        :host([size="sm"]) button {
                            padding: var(--hikma-spacing-xs) var(--hikma-spacing-sm);
                            font-size: var(--hikma-font-size-sm);
                        }
                        
                        :host([size="lg"]) button {
                            padding: var(--hikma-spacing-md) var(--hikma-spacing-lg);
                            font-size: var(--hikma-font-size-lg);
                        }
                    </style>
                    
                    <button>
                        <div class="loading-spinner" style="display: none;"></div>
                        <slot></slot>
                    </button>
                `;
            }

            updateButtonState() {
                const button = this.shadowRoot.querySelector('button');
                const spinner = this.shadowRoot.querySelector('.loading-spinner');
                
                button.disabled = this.hasAttribute('disabled') || this.hasAttribute('loading');
                spinner.style.display = this.hasAttribute('loading') ? 'block' : 'none';
            }

            setupEventListeners() {
                this.shadowRoot.addEventListener('click', (e) => {
                    if (this.hasAttribute('disabled') || this.hasAttribute('loading')) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    
                    this.dispatchEvent(new CustomEvent('hikma:button:click', {
                        detail: { button: this }
                    }));
                });
            }
        }

        customElements.define('hikma-button', HikmaButton);
    }

    defineHikmaTooltip() {
        class HikmaTooltip extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                this.render();
                this.setupEventListeners();
            }

            render() {
                this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            position: relative;
                            display: inline-block;
                        }
                        
                        .tooltip {
                            position: absolute;
                            background: var(--hikma-surface-color);
                            color: var(--hikma-text-color-base);
                            border: 1px solid var(--hikma-border-color-base);
                            border-radius: var(--hikma-border-radius);
                            padding: var(--hikma-spacing-xs) var(--hikma-spacing-sm);
                            font-size: var(--hikma-font-size-sm);
                            white-space: nowrap;
                            z-index: 1000;
                            opacity: 0;
                            visibility: hidden;
                            transition: opacity 0.2s, visibility 0.2s;
                            pointer-events: none;
                            box-shadow: var(--hikma-shadow-md);
                        }
                        
                        .tooltip::before {
                            content: '';
                            position: absolute;
                            border: 4px solid transparent;
                        }
                        
                        .tooltip.show {
                            opacity: 1;
                            visibility: visible;
                        }
                        
                        /* Tooltip positions */
                        .tooltip.top {
                            bottom: 100%;
                            left: 50%;
                            transform: translateX(-50%);
                            margin-bottom: 8px;
                        }
                        
                        .tooltip.top::before {
                            top: 100%;
                            left: 50%;
                            transform: translateX(-50%);
                            border-top-color: var(--hikma-border-color-base);
                        }
                        
                        .tooltip.bottom {
                            top: 100%;
                            left: 50%;
                            transform: translateX(-50%);
                            margin-top: 8px;
                        }
                        
                        .tooltip.bottom::before {
                            bottom: 100%;
                            left: 50%;
                            transform: translateX(-50%);
                            border-bottom-color: var(--hikma-border-color-base);
                        }
                        
                        .tooltip.left {
                            right: 100%;
                            top: 50%;
                            transform: translateY(-50%);
                            margin-right: 8px;
                        }
                        
                        .tooltip.left::before {
                            left: 100%;
                            top: 50%;
                            transform: translateY(-50%);
                            border-left-color: var(--hikma-border-color-base);
                        }
                        
                        .tooltip.right {
                            left: 100%;
                            top: 50%;
                            transform: translateY(-50%);
                            margin-left: 8px;
                        }
                        
                        .tooltip.right::before {
                            right: 100%;
                            top: 50%;
                            transform: translateY(-50%);
                            border-right-color: var(--hikma-border-color-base);
                        }
                    </style>
                    
                    <slot></slot>
                    <div class="tooltip" role="tooltip">
                        <slot name="tooltip"></slot>
                    </div>
                `;
            }

            setupEventListeners() {
                const tooltip = this.shadowRoot.querySelector('.tooltip');
                const position = this.getAttribute('position') || 'top';
                
                tooltip.classList.add(position);
                
                this.addEventListener('mouseenter', () => {
                    tooltip.classList.add('show');
                });
                
                this.addEventListener('mouseleave', () => {
                    tooltip.classList.remove('show');
                });
                
                this.addEventListener('focus', () => {
                    tooltip.classList.add('show');
                });
                
                this.addEventListener('blur', () => {
                    tooltip.classList.remove('show');
                });
            }
        }

        customElements.define('hikma-tooltip', HikmaTooltip);
    }

    // 6. Modern Animations with Web Animations API
    initModernAnimations() {
        if (!Element.prototype.animate) {
            console.warn('Web Animations API not supported');
            return;
        }

        this.initMorphingButtons();
        this.initScrollAnimations();
        this.initParallaxEffects();
    }

    initMorphingButtons() {
        document.querySelectorAll('.morphing-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.05)' }
                ], {
                    duration: 200,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    fill: 'forwards'
                });
            });
            
            button.addEventListener('mouseleave', () => {
                button.animate([
                    { transform: 'scale(1.05)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 200,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    fill: 'forwards'
                });
            });
        });
    }

    initScrollAnimations() {
        // Modern scroll-driven animations
        if (CSS.supports('animation-timeline', 'scroll()')) {
            // Browser supports CSS scroll-driven animations
            return;
        }

        // Fallback for browsers without scroll-driven animations
        const animatedElements = document.querySelectorAll('[data-scroll-animation]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.dataset.scrollAnimation;
                    this.runScrollAnimation(entry.target, animation);
                }
            });
        }, { threshold: 0.2 });

        animatedElements.forEach(el => observer.observe(el));
    }

    runScrollAnimation(element, animationType) {
        const animations = {
            'fade-in': [
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            'slide-in-left': [
                { opacity: 0, transform: 'translateX(-50px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ],
            'slide-in-right': [
                { opacity: 0, transform: 'translateX(50px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ],
            'scale-in': [
                { opacity: 0, transform: 'scale(0.8)' },
                { opacity: 1, transform: 'scale(1)' }
            ]
        };

        if (animations[animationType]) {
            element.animate(animations[animationType], {
                duration: 600,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            });
        }
    }

    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        const handleScroll = () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        // Use requestAnimationFrame for smooth scrolling
        let ticking = false;
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
                setTimeout(() => ticking = false, 16);
            }
        };

        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }

    // 7. Advanced Features
    initAdvancedFeatures() {
        this.initColorSchemeDetection();
        this.initReducedMotionDetection();
        this.initPrefersContrastDetection();
        this.initConnectionTypeDetection();
        this.initMemoryMonitoring();
        this.initPerformanceMonitoring();
    }

    initColorSchemeDetection() {
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleColorSchemeChange = (e) => {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            
            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('hikma:color-scheme-change', {
                detail: { isDark: e.matches }
            }));
        };

        handleColorSchemeChange(colorSchemeQuery);
        colorSchemeQuery.addEventListener('change', handleColorSchemeChange);
    }

    initReducedMotionDetection() {
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleReducedMotionChange = (e) => {
            document.documentElement.setAttribute('data-reduced-motion', e.matches);
            
            if (e.matches) {
                // Disable animations
                document.documentElement.style.setProperty('--hikma-transition-base', 'none');
                document.documentElement.style.setProperty('--hikma-transition-fast', 'none');
            } else {
                // Enable animations
                document.documentElement.style.removeProperty('--hikma-transition-base');
                document.documentElement.style.removeProperty('--hikma-transition-fast');
            }
        };

        handleReducedMotionChange(reducedMotionQuery);
        reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    }

    initPrefersContrastDetection() {
        const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
        
        const handleContrastChange = (e) => {
            document.documentElement.setAttribute('data-high-contrast', e.matches);
        };

        handleContrastChange(highContrastQuery);
        highContrastQuery.addEventListener('change', handleContrastChange);
    }

    initConnectionTypeDetection() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            const updateConnectionInfo = () => {
                document.documentElement.setAttribute('data-connection-type', connection.effectiveType);
                document.documentElement.setAttribute('data-save-data', connection.saveData);
                
                // Adjust experience based on connection
                if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                    document.documentElement.classList.add('low-bandwidth');
                } else {
                    document.documentElement.classList.remove('low-bandwidth');
                }
            };

            updateConnectionInfo();
            connection.addEventListener('change', updateConnectionInfo);
        }
    }

    initMemoryMonitoring() {
        if ('memory' in performance) {
            const checkMemory = () => {
                const memory = performance.memory;
                const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
                const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
                
                document.documentElement.setAttribute('data-memory-usage', usedMB);
                
                // Adjust experience based on memory usage
                if (usedMB > 50) {
                    document.documentElement.classList.add('high-memory-usage');
                } else {
                    document.documentElement.classList.remove('high-memory-usage');
                }
            };

            checkMemory();
            setInterval(checkMemory, 30000); // Check every 30 seconds
        }
    }

    initPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            // Monitor Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                document.documentElement.setAttribute('data-lcp', Math.round(lastEntry.startTime));
            });

            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Monitor Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                
                document.documentElement.setAttribute('data-cls', clsValue.toFixed(4));
            });

            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }

    // Utility Methods
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    static getElementDimensions(element) {
        const rect = element.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom
        };
    }

    static supportsFeature(feature) {
        const features = {
            'container-queries': () => CSS.supports('container-type: inline-size'),
            'view-transitions': () => 'startViewTransition' in document,
            'scroll-driven-animations': () => CSS.supports('animation-timeline', 'scroll()'),
            'anchor-positioning': () => CSS.supports('anchor-name: --test'),
            'css-nesting': () => CSS.supports('selector(&)'),
            'cascade-layers': () => CSS.supports('@layer'),
            'css-grid': () => CSS.supports('display: grid'),
            'css-flexbox': () => CSS.supports('display: flex'),
            'css-custom-properties': () => CSS.supports('--test: 0'),
            'web-components': () => 'customElements' in window,
            'intersection-observer': () => 'IntersectionObserver' in window,
            'resize-observer': () => 'ResizeObserver' in window,
            'web-animations': () => 'animate' in Element.prototype
        };

        return features[feature] ? features[feature]() : false;
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.hikmaModernFeatures = new HikmaModernFeatures();
    });
} else {
    window.hikmaModernFeatures = new HikmaModernFeatures();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HikmaModernFeatures;
}