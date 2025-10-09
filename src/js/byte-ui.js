/**
 * Byte UI - Modern JavaScript Framework
 * Consolidated, tree-shakeable, and perfore-optimized
 */

class ByteUI {
	constructor(options = {}) {
		this.options = {
			autoInit: true,
			components: ['all'],
			accessibility: true,
			animations: true,
			...options,
		};

		if (this.options.autoInit) {
			this.init();
		}
	}

	init() {
		this.initializeComponents();
		this.setupGlobalEventListeners();
		this.initializeAccessibility();

		if (this.options.animations && !this.prefersReducedMotion()) {
			this.initializeAnimations();
		}
	}

	// Component initialization with lazy loading
	async initializeComponents() {
		const components = this.options.components;

		if (components.includes('all') || components.includes('modal')) {
			await this.loadComponent('modal');
		}

		if (components.includes('all') || components.includes('dropdown')) {
			await this.loadComponent('dropdown');
		}

		// Add other components as needed
	}

	async loadComponent(name) {
		try {
			const module = await import(`./components/${name}.js`);
			module.default.init();
		} catch (error) {
			console.warn(`Failed to load component: ${name}`, error);
		}
	}

	// Performance-optimized event delegation
	setupGlobalEventListeners() {
		document.addEventListener('click', this.handleClick.bind(this), {
			passive: false,
		});
		document.addEventListener('keydown', this.handleKeydown.bind(this), {
			passive: true,
		});
	}

	handleClick(event) {
		const target = event.target.closest('[data-byte-action]');
		if (!target) return;

		const action = target.dataset.byteAction;
		const component = target.dataset.byteComponent;

		this.dispatchComponentAction(component, action, target, event);
	}

	handleKeydown(event) {
		// Handle global keyboard shortcuts
		if (event.key === 'Escape') {
			this.closeAllModals();
			this.closeAllDropdowns();
		}
	}

	// Accessibility helpers
	initializeAccessibility() {
		this.setupFocusManagement();
		this.setupAriaLiveRegions();
		this.setupSkipLinks();
	}

	setupFocusManagement() {
		// Trap focus in modals
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Tab') {
				const modal = document.querySelector('.modal.show');
				if (modal) {
					this.trapFocus(modal, e);
				}
			}
		});
	}

	trapFocus(container, event) {
		const focusableElements = container.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey && document.activeElement === firstElement) {
			lastElement.focus();
			event.preventDefault();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			firstElement.focus();
			event.preventDefault();
		}
	}

	// Performance utilities
	prefersReducedMotion() {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

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

	// Component action dispatcher
	dispatchComponentAction(component, action, element, event) {
		const handlers = {
			modal: this.handleModalAction.bind(this),
			dropdown: this.handleDropdownAction.bind(this),
			toast: this.handleToastAction.bind(this),
			// Add more component handlers
		};

		const handler = handlers[component];
		if (handler) {
			handler(action, element, event);
		}
	}

	// Modal handling
	handleModalAction(action, element, event) {
		const modalId = element.dataset.byteTarget;
		const modal = document.querySelector(modalId);

		if (!modal) return;

		switch (action) {
			case 'open':
				this.openModal(modal);
				break;
			case 'close':
				this.closeModal(modal);
				break;
		}
	}

	openModal(modal) {
		// Create backdrop
		const backdrop = document.createElement('div');
		backdrop.className = 'modal-backdrop fade';
		document.body.appendChild(backdrop);

		// Show modal
		modal.style.display = 'block';
		document.body.classList.add('modal-open');

		// Animate in
		requestAnimationFrame(() => {
			modal.classList.add('show');
			backdrop.classList.add('show');
		});

		// Focus management
		const firstFocusable = modal.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		if (firstFocusable) {
			firstFocusable.focus();
		}

		// Store previous focus
		modal._previousFocus = document.activeElement;
	}

	closeModal(modal) {
		const backdrop = document.querySelector('.modal-backdrop');

		modal.classList.remove('show');
		if (backdrop) backdrop.classList.remove('show');

		setTimeout(() => {
			modal.style.display = 'none';
			document.body.classList.remove('modal-open');
			if (backdrop) backdrop.remove();

			// Restore focus
			if (modal._previousFocus) {
				modal._previousFocus.focus();
			}
		}, 300);
	}

	closeAllModals() {
		document.querySelectorAll('.modal.show').forEach((modal) => {
			this.closeModal(modal);
		});
	}

	// Dropdown handling
	handleDropdownAction(action, element, event) {
		const dropdown = element.closest('.dropdown');
		const menu = dropdown?.querySelector('.dropdown-menu');

		if (!menu) return;

		switch (action) {
			case 'toggle':
				menu.classList.toggle('show');
				element.setAttribute('aria-expanded', menu.classList.contains('show'));
				break;
		}
	}

	closeAllDropdowns() {
		document.querySelectorAll('.dropdown-menu.show').forEach((menu) => {
			menu.classList.remove('show');
			const toggle = menu.previousElementSibling;
			if (toggle) toggle.setAttribute('aria-expanded', 'false');
		});
	}

	// Animation initialization
	initializeAnimations() {
		this.initScrollAnimations();
		this.initHoverEffects();
	}

	initScrollAnimations() {
		if (!('IntersectionObserver' in window)) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
					}
				});
			},
			{ threshold: 0.1 },
		);

		document.querySelectorAll('[data-animate]').forEach((el) => {
			observer.observe(el);
		});
	}

	initHoverEffects() {
		// Use CSS for hover effects, but add JS for complex interactions
		document.querySelectorAll('.btn, .card').forEach((element) => {
			element.addEventListener('mouseenter', () => {
				element.style.setProperty('--hover-scale', '1.02');
			});

			element.addEventListener('mouseleave', () => {
				element.style.removeProperty('--hover-scale');
			});
		});
	}
}

// Auto-initialize
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		window.ByteUI = new ByteUI();
	});
} else {
	window.ByteUI = new ByteUI();
}

export default ByteUI;
