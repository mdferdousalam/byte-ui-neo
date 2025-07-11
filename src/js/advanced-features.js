// Advanced JavaScript Features
// Modern web APIs, performance optimizations, and enhanced interactivity

// =============================================================================
// MODERN WEB APIs
// =============================================================================

class ByteAdvancedFeatures {
	constructor() {
		this.init();
	}

	init() {
		this.initViewTransitions();
		this.initIntersectionObserver();
		this.initResizeObserver();
		this.initContainerQueries();
		this.initPerformanceObserver();
		this.initColorScheme();
		this.initAdvancedAnimations();
		this.initKeyboardNavigation();
		this.initScrollAnimations();
	}

	// =============================================================================
	// VIEW TRANSITIONS API
	// =============================================================================

	initViewTransitions() {
		// Check if View Transitions API is supported
		if (!document.startViewTransition) {
			console.warn('View Transitions API not supported');
			return;
		}

		// Smooth page transitions
		document.addEventListener('click', (e) => {
			const link = e.target.closest('a[href]');
			if (link && link.origin === location.origin) {
				e.preventDefault();
				this.navigateWithTransition(link.href);
			}
		});

		// Modal transitions
		document.addEventListener('show.modal', (e) => {
			this.transitionModal(e.detail.modal, 'show');
		});

		document.addEventListener('hide.modal', (e) => {
			this.transitionModal(e.detail.modal, 'hide');
		});
	}

	async navigateWithTransition(href) {
		const transition = document.startViewTransition(() => {
			location.href = href;
		});

		try {
			await transition.finished;
		} catch (error) {
			console.error('View transition failed:', error);
		}
	}

	transitionModal(modal, action) {
		const transition = document.startViewTransition(() => {
			if (action === 'show') {
				modal.classList.add('show');
			} else {
				modal.classList.remove('show');
			}
		});

		transition.finished.catch(console.error);
	}

	// =============================================================================
	// INTERSECTION OBSERVER
	// =============================================================================

	initIntersectionObserver() {
		// Lazy loading images
		const imageObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target;
						img.src = img.dataset.src;
						img.classList.add('loaded');
						imageObserver.unobserve(img);
					}
				});
			},
			{ rootMargin: '50px' },
		);

		document.querySelectorAll('img[data-src]').forEach((img) => {
			imageObserver.observe(img);
		});

		// Animate elements on scroll
		const animateObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
						animateObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 },
		);

		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			animateObserver.observe(el);
		});

		// Infinite scroll
		const infiniteScrollObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.loadMoreContent();
				}
			});
		});

		const infiniteScrollTrigger = document.querySelector(
			'.infinite-scroll-trigger',
		);
		if (infiniteScrollTrigger) {
			infiniteScrollObserver.observe(infiniteScrollTrigger);
		}
	}

	// =============================================================================
	// RESIZE OBSERVER
	// =============================================================================

	initResizeObserver() {
		if (!window.ResizeObserver) {
			console.warn('ResizeObserver not supported');
			return;
		}

		// Responsive text sizing
		const textResizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const element = entry.target;
				const width = entry.contentRect.width;

				if (width < 300) {
					element.classList.add('text-sm');
					element.classList.remove('text-lg', 'text-xl');
				} else if (width < 500) {
					element.classList.add('text-lg');
					element.classList.remove('text-sm', 'text-xl');
				} else {
					element.classList.add('text-xl');
					element.classList.remove('text-sm', 'text-lg');
				}
			});
		});

		document.querySelectorAll('.responsive-text').forEach((el) => {
			textResizeObserver.observe(el);
		});

		// Responsive grid
		const gridResizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const element = entry.target;
				const width = entry.contentRect.width;
				const cols = Math.floor(width / 250);

				element.style.gridTemplateColumns = `repeat(${Math.max(1, cols)}, 1fr)`;
			});
		});

		document.querySelectorAll('.responsive-grid').forEach((el) => {
			gridResizeObserver.observe(el);
		});
	}

	// =============================================================================
	// CONTAINER QUERIES POLYFILL
	// =============================================================================

	initContainerQueries() {
		// Simple container queries polyfill for older browsers
		if (!CSS.supports('container-type: inline-size')) {
			this.polyfillContainerQueries();
		}
	}

	polyfillContainerQueries() {
		const containers = document.querySelectorAll('[data-container]');

		containers.forEach((container) => {
			const resizeObserver = new ResizeObserver((entries) => {
				entries.forEach((entry) => {
					const width = entry.contentRect.width;
					const element = entry.target;

					// Remove existing container classes
					element.classList.remove(
						'container-sm',
						'container-md',
						'container-lg',
					);

					// Add appropriate container class
					if (width >= 600) {
						element.classList.add('container-lg');
					} else if (width >= 400) {
						element.classList.add('container-md');
					} else {
						element.classList.add('container-sm');
					}
				});
			});

			resizeObserver.observe(container);
		});
	}

	// =============================================================================
	// PERFORMANCE OBSERVER
	// =============================================================================

	initPerformanceObserver() {
		if (!window.PerformanceObserver) {
			console.warn('PerformanceObserver not supported');
			return;
		}

		// Observe Core Web Vitals
		const observer = new PerformanceObserver((list) => {
			list.getEntries().forEach((entry) => {
				if (entry.entryType === 'largest-contentful-paint') {
					console.log('LCP:', entry.startTime);
				}

				if (entry.entryType === 'first-input') {
					console.log('FID:', entry.processingStart - entry.startTime);
				}

				if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
					console.log('CLS:', entry.value);
				}
			});
		});

		observer.observe({
			entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
		});
	}

	// =============================================================================
	// COLOR SCHEME MANAGEMENT
	// =============================================================================

	initColorScheme() {
		// Dark mode toggle
		const darkModeToggle = document.querySelector('[data-theme-toggle]');
		if (darkModeToggle) {
			darkModeToggle.addEventListener('click', () => {
				this.toggleDarkMode();
			});
		}

		// System color scheme detection
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', (e) => {
			if (!localStorage.getItem('theme')) {
				this.setColorScheme(e.matches ? 'dark' : 'light');
			}
		});

		// Initialize theme
		this.initializeTheme();
	}

	toggleDarkMode() {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

		this.setColorScheme(newTheme);
		localStorage.setItem('theme', newTheme);
	}

	setColorScheme(scheme) {
		document.documentElement.setAttribute('data-theme', scheme);

		// Update meta theme-color
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');
		if (metaThemeColor) {
			metaThemeColor.setAttribute(
				'content',
				scheme === 'dark' ? '#1e293b' : '#ffffff',
			);
		}
	}

	initializeTheme() {
		const savedTheme = localStorage.getItem('theme');
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light';

		this.setColorScheme(savedTheme || systemTheme);
	}

	// =============================================================================
	// ADVANCED ANIMATIONS
	// =============================================================================

	initAdvancedAnimations() {
		// Stagger animations
		this.initStaggerAnimations();

		// Parallax scrolling
		this.initParallaxScrolling();

		// Morphing animations
		this.initMorphingAnimations();
	}

	initStaggerAnimations() {
		const staggerGroups = document.querySelectorAll('[data-stagger]');

		staggerGroups.forEach((group) => {
			const children = group.children;
			const delay = parseInt(group.dataset.stagger) || 100;

			Array.from(children).forEach((child, index) => {
				child.style.animationDelay = `${index * delay}ms`;
			});
		});
	}

	initParallaxScrolling() {
		const parallaxElements = document.querySelectorAll('[data-parallax]');

		if (parallaxElements.length === 0) return;

		const handleScroll = () => {
			const scrolled = window.pageYOffset;

			parallaxElements.forEach((element) => {
				const rate = parseFloat(element.dataset.parallax) || 0.5;
				const yPos = -(scrolled * rate);
				element.style.transform = `translateY(${yPos}px)`;
			});
		};

		// Use requestAnimationFrame for better performance
		let ticking = false;

		window.addEventListener('scroll', () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		});
	}

	initMorphingAnimations() {
		const morphingElements = document.querySelectorAll('[data-morph]');

		morphingElements.forEach((element) => {
			element.addEventListener('click', () => {
				const targetSelector = element.dataset.morph;
				const targetElement = document.querySelector(targetSelector);

				if (targetElement) {
					this.morphElement(element, targetElement);
				}
			});
		});
	}

	morphElement(fromElement, toElement) {
		// Get bounding rectangles
		const fromRect = fromElement.getBoundingClientRect();
		const toRect = toElement.getBoundingClientRect();

		// Create morphing animation
		const morphing = fromElement.animate(
			[
				{
					transform: 'translate(0, 0) scale(1)',
					borderRadius: getComputedStyle(fromElement).borderRadius,
				},
				{
					transform: `translate(${toRect.left - fromRect.left}px, ${
						toRect.top - fromRect.top
					}px) scale(${toRect.width / fromRect.width})`,
					borderRadius: getComputedStyle(toElement).borderRadius,
				},
			],
			{
				duration: 300,
				easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		);

		morphing.addEventListener('finish', () => {
			// Show target element
			toElement.style.opacity = '1';
			fromElement.style.opacity = '0';
		});
	}

	// =============================================================================
	// KEYBOARD NAVIGATION
	// =============================================================================

	initKeyboardNavigation() {
		// Trap focus in modals
		this.initFocusTrap();

		// Keyboard shortcuts
		this.initKeyboardShortcuts();

		// Roving tabindex for component groups
		this.initRovingTabindex();
	}

	initFocusTrap() {
		const modals = document.querySelectorAll('.modal');

		modals.forEach((modal) => {
			modal.addEventListener('keydown', (e) => {
				if (e.key === 'Tab') {
					this.trapFocus(e, modal);
				}
			});
		});
	}

	trapFocus(event, container) {
		const focusableElements = container.querySelectorAll(
			'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
		);

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === firstElement) {
				lastElement.focus();
				event.preventDefault();
			}
		} else {
			if (document.activeElement === lastElement) {
				firstElement.focus();
				event.preventDefault();
			}
		}
	}

	initKeyboardShortcuts() {
		const shortcuts = {
			'ctrl+k': () => this.openSearch(),
			'ctrl+/': () => this.openHelp(),
			escape: () => this.closeActiveModal(),
			'ctrl+d': () => this.toggleDarkMode(),
		};

		document.addEventListener('keydown', (e) => {
			const key = this.getKeyCombo(e);
			if (shortcuts[key]) {
				e.preventDefault();
				shortcuts[key]();
			}
		});
	}

	getKeyCombo(event) {
		const keys = [];

		if (event.ctrlKey) keys.push('ctrl');
		if (event.shiftKey) keys.push('shift');
		if (event.altKey) keys.push('alt');
		if (event.metaKey) keys.push('meta');

		keys.push(event.key.toLowerCase());

		return keys.join('+');
	}

	initRovingTabindex() {
		const groups = document.querySelectorAll('[data-roving-tabindex]');

		groups.forEach((group) => {
			const items = group.querySelectorAll(
				'[role="tab"], [role="menuitem"], [role="option"]',
			);
			let currentIndex = 0;

			// Initialize tabindex
			items.forEach((item, index) => {
				item.tabIndex = index === 0 ? 0 : -1;
			});

			group.addEventListener('keydown', (e) => {
				const direction =
					e.key === 'ArrowRight' || e.key === 'ArrowDown'
						? 1
						: e.key === 'ArrowLeft' || e.key === 'ArrowUp'
						? -1
						: 0;

				if (direction !== 0) {
					e.preventDefault();

					items[currentIndex].tabIndex = -1;
					currentIndex =
						(currentIndex + direction + items.length) % items.length;
					items[currentIndex].tabIndex = 0;
					items[currentIndex].focus();
				}
			});
		});
	}

	// =============================================================================
	// SCROLL ANIMATIONS
	// =============================================================================

	initScrollAnimations() {
		// Smooth scroll behavior
		this.initSmoothScroll();

		// Scroll progress indicator
		this.initScrollProgress();

		// Scroll-triggered animations
		this.initScrollTriggeredAnimations();
	}

	initSmoothScroll() {
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', (e) => {
				e.preventDefault();

				const target = document.querySelector(anchor.getAttribute('href'));
				if (target) {
					target.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					});
				}
			});
		});
	}

	initScrollProgress() {
		const progressBar = document.querySelector('.scroll-progress');
		if (!progressBar) return;

		const updateProgress = () => {
			const scrolled = window.pageYOffset;
			const maxScroll = document.body.scrollHeight - window.innerHeight;
			const progress = (scrolled / maxScroll) * 100;

			progressBar.style.setProperty('--scroll-progress', `${progress}%`);
		};

		window.addEventListener('scroll', updateProgress);
		updateProgress();
	}

	initScrollTriggeredAnimations() {
		const elements = document.querySelectorAll('[data-scroll-animation]');

		elements.forEach((element) => {
			const animation = element.dataset.scrollAnimation;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							element.classList.add(`animate-${animation}`);
							observer.unobserve(element);
						}
					});
				},
				{ threshold: 0.1 },
			);

			observer.observe(element);
		});
	}

	// =============================================================================
	// UTILITY METHODS
	// =============================================================================

	openSearch() {
		const searchModal = document.querySelector('#searchModal');
		if (searchModal) {
			searchModal.classList.add('show');
			const searchInput = searchModal.querySelector('input[type="search"]');
			if (searchInput) {
				searchInput.focus();
			}
		}
	}

	openHelp() {
		const helpModal = document.querySelector('#helpModal');
		if (helpModal) {
			helpModal.classList.add('show');
		}
	}

	closeActiveModal() {
		const activeModal = document.querySelector('.modal.show');
		if (activeModal) {
			activeModal.classList.remove('show');
		}
	}

	loadMoreContent() {
		// Implement infinite scroll content loading
		console.log('Loading more content...');
	}
}

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
	new ByteAdvancedFeatures();
});

// Export for module usage
export default ByteAdvancedFeatures;
