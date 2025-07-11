// Utility functions (if any, e.g., for toggling classes)
// This file will contain all the JavaScript for Hikma UI interactive components.

// Import advanced components
import './advanced-components.js';

document.addEventListener('DOMContentLoaded', () => {
	console.log('Hikma UI JavaScript loaded!');

	// 1. Navbar Toggler
	handleNavbarToggle();

	// 2. Modals
	handleModals();

	// 3. Dropdowns
	handleDropdowns();

	// 4. Tabs/Pills
	handleTabsAndPills();

	// 5. Alerts
	handleAlerts();

	// 6. Toasts
	handleToasts();

	// 7. Carousel
	handleCarousel();

	// 8. Form Validation
	handleFormValidation();
});

// --- Component-specific JavaScript Functions ---

// 1. Navbar Toggler
function handleNavbarToggle() {
	const toggler = document.querySelector('.navbar-toggler');
	const collapseTarget = document.querySelector(toggler?.dataset.bsTarget);

	if (toggler && collapseTarget) {
		toggler.addEventListener('click', () => {
			collapseTarget.classList.toggle('show');
			toggler.setAttribute(
				'aria-expanded',
				collapseTarget.classList.contains('show'),
			);
		});
	}
}

// 2. Modals
function handleModals() {
	document.querySelectorAll('[data-bs-toggle="modal"]').forEach((trigger) => {
		const modalId = trigger.dataset.bsTarget;
		const modal = document.querySelector(modalId);
		
		if (!modal) {
			console.warn('Modal not found:', modalId);
			return;
		}

		// Open Modal
		trigger.addEventListener('click', (event) => {
			event.preventDefault();
			
			// Create backdrop if it doesn't exist
			let backdrop = document.querySelector('.modal-backdrop');
			if (!backdrop) {
				backdrop = document.createElement('div');
				backdrop.classList.add('modal-backdrop', 'fade');
				document.body.appendChild(backdrop);
			}

			modal.style.display = 'block';
			document.body.classList.add('modal-open');
			
			// Force reflow for animation
			modal.offsetHeight;
			
			setTimeout(() => {
				modal.classList.add('show');
				backdrop.classList.add('show');
			}, 10);

			// Close Modal function
			const closeModal = () => {
				modal.classList.remove('show');
				backdrop.classList.remove('show');
				document.body.classList.remove('modal-open');
				
				setTimeout(() => {
					modal.style.display = 'none';
					if (backdrop && backdrop.parentNode) {
						backdrop.parentNode.removeChild(backdrop);
					}
				}, 300);
			};

			// Close by button inside modal
			modal.querySelectorAll('[data-bs-dismiss="modal"]').forEach((closeBtn) => {
				closeBtn.addEventListener('click', closeModal);
			});

			// Close by clicking outside (backdrop)
			backdrop.addEventListener('click', closeModal);

			// Close by ESC key
			const escapeHandler = (e) => {
				if (e.key === 'Escape' && modal.classList.contains('show')) {
					closeModal();
					document.removeEventListener('keydown', escapeHandler);
				}
			};
			document.addEventListener('keydown', escapeHandler);
		});
	});
}

// 3. Dropdowns
function handleDropdowns() {
	document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
		const dropdownMenu = toggle.nextElementSibling; // Assuming menu is direct sibling

		if (!dropdownMenu || !dropdownMenu.classList.contains('dropdown-menu')) {
			console.warn(
				'Dropdown menu not found or incorrect structure for:',
				toggle,
			);
			return;
		}

		const toggleDropdown = () => {
			dropdownMenu.classList.toggle('show');
			toggle.setAttribute(
				'aria-expanded',
				dropdownMenu.classList.contains('show'),
			);
		};

		toggle.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent document click from closing immediately
			toggleDropdown();
		});

		// Close dropdown when clicking outside
		document.addEventListener('click', (event) => {
			if (
				!toggle.contains(event.target) &&
				!dropdownMenu.contains(event.target)
			) {
				if (dropdownMenu.classList.contains('show')) {
					dropdownMenu.classList.remove('show');
					toggle.setAttribute('aria-expanded', 'false');
				}
			}
		});

		// Close on ESC key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && dropdownMenu.classList.contains('show')) {
				dropdownMenu.classList.remove('show');
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
	});
}

// 4. Tabs / Pills
function handleTabsAndPills() {
	document
		.querySelectorAll('[data-bs-toggle="tab"], [data-bs-toggle="pill"]')
		.forEach((tabTrigger) => {
			tabTrigger.addEventListener('click', function (event) {
				event.preventDefault(); // Prevent default anchor link behavior

				const targetId = this.dataset.bsTarget;
				const targetPane = document.querySelector(targetId);
				const parentNav = this.closest('.nav');

				if (!targetPane || !parentNav) return;

				// Deactivate current active tab/pill and pane
				parentNav.querySelectorAll('.nav-link.active').forEach((activeLink) => {
					activeLink.classList.remove('active');
					activeLink.setAttribute('aria-selected', 'false');
				});
				parentNav.nextElementSibling
					.querySelectorAll('.tab-pane.show.active')
					.forEach((activePane) => {
						activePane.classList.remove('show', 'active');
					});

				// Activate new tab/pill and pane
				this.classList.add('active');
				this.setAttribute('aria-selected', 'true');
				targetPane.classList.add('show', 'active');
			});
		});
}

// 5. Alerts
function handleAlerts() {
	document.querySelectorAll('[data-bs-dismiss="alert"]').forEach((closeBtn) => {
		const alert = closeBtn.closest('.alert');
		if (alert) {
			closeBtn.addEventListener('click', () => {
				alert.classList.add('fade'); // Add fade class for transition
				alert.classList.remove('show'); // Start fade out
				setTimeout(() => {
					alert.remove(); // Remove from DOM after fade out
				}, 150); // Match CSS transition duration for alerts
			});
		}
	});
}

// 6. Toasts
function handleToasts() {
	const liveToastBtn = document.getElementById('liveToastBtn');
	const liveToast = document.getElementById('liveToast');

	if (liveToastBtn && liveToast) {
		liveToastBtn.addEventListener('click', () => {
			liveToast.classList.add('showing'); // For fade-in transition
			setTimeout(() => {
				liveToast.classList.remove('showing');
				liveToast.classList.add('show'); // Make visible
			}, 10); // Small delay for transition to kick in

			// Auto-hide after 5 seconds (example)
			setTimeout(() => {
				liveToast.classList.remove('show'); // Start fade out
				liveToast.classList.add('hide'); // For better transition control
				setTimeout(() => {
					liveToast.classList.remove('hide'); // Reset for next show
					// Optionally, you might want to remove it from DOM or change display to none
					// liveToast.style.display = 'none'; // Or manage via JS
				}, 300); // Match CSS transition duration
			}, 5000); // Auto-hide after 5 seconds
		});

		// Manual close for toast
		liveToast.querySelector('.btn-close')?.addEventListener('click', () => {
			liveToast.classList.remove('show');
			liveToast.classList.add('hide');
			setTimeout(() => {
				liveToast.classList.remove('hide');
			}, 300);
		});
	}
}

// 7. Carousel (Basic functionality)
function handleCarousel() {
	document.querySelectorAll('.carousel.slide').forEach((carouselElement) => {
		let currentIndex = 0;
		const carouselItems = carouselElement.querySelectorAll('.carousel-item');
		const totalItems = carouselItems.length;
		const intervalTime = 5000; // 5 seconds for auto-slide
		let slideInterval;

		const goToSlide = (index) => {
			if (index < 0) index = totalItems - 1;
			if (index >= totalItems) index = 0;

			// Remove active from current item
			carouselItems[currentIndex].classList.remove('active');

			// Determine direction for animation
			const oldIndex = currentIndex;
			currentIndex = index;

			carouselItems[currentIndex].classList.add('active');

			// Reset interval
			clearInterval(slideInterval);
			startAutoSlide();
		};

		const nextSlide = () => goToSlide(currentIndex + 1);
		const prevSlide = () => goToSlide(currentIndex - 1);

		// Add event listeners for controls
		carouselElement
			.querySelector('.carousel-control-next')
			?.addEventListener('click', nextSlide);
		carouselElement
			.querySelector('.carousel-control-prev')
			?.addEventListener('click', prevSlide);

		// Add event listeners for indicators
		carouselElement
			.querySelectorAll('.carousel-indicators li')
			.forEach((indicator, index) => {
				indicator.addEventListener('click', () => goToSlide(index));
			});

		// Auto slide functionality
		const startAutoSlide = () => {
			slideInterval = setInterval(nextSlide, intervalTime);
		};

		// Pause on hover
		carouselElement.addEventListener('mouseenter', () =>
			clearInterval(slideInterval),
		);
		carouselElement.addEventListener('mouseleave', startAutoSlide);

		// Initial start
		startAutoSlide();
		// Ensure first slide is active initially if not already
		if (!carouselItems[0].classList.contains('active')) {
			carouselItems[0].classList.add('active');
		}
	});
}


// 8. Form Validation
function handleFormValidation() {
    // Select all forms that need validation (e.g., add 'needs-validation' class to them)
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) { // Browser's built-in validation check
                event.preventDefault();
                event.stopPropagation();
            }

            // Add 'was-validated' class to the form to show validation feedback
            form.classList.add('was-validated');

            // Manually check each input for custom feedback
            form.querySelectorAll('.form-control, .form-check-input').forEach(input => {
                if (input.type !== 'submit') { // Exclude submit buttons
                    if (input.checkValidity()) {
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                    } else {
                        input.classList.remove('is-valid');
                        input.classList.add('is-invalid');
                    }
                }
            });
        }, false);
    });

    // Optional: Real-time validation on input change (less common for full forms, but useful)
    document.querySelectorAll('.form-control[required], .form-check-input[required]').forEach(input => {
        input.addEventListener('input', () => {
            if (input.closest('.was-validated')) { // Only validate in real-time if form was already attempted
                if (input.checkValidity()) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                } else {
                    input.classList.remove('is-valid');
                    input.classList.add('is-invalid');
                }
            }
        });
    });
}
