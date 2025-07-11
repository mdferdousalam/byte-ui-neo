// Advanced Components JavaScript
// Enhanced functionality for new components

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all advanced components
    initializeAdvancedForms();
    initializeDataVisualization();
    initializeLayoutComponents();
    initializeInteractiveComponents();
    initializeUtilityComponents();
});

// Advanced Forms
function initializeAdvancedForms() {
    // File Upload with drag and drop
    handleFileUpload();
    
    // Range Sliders
    handleRangeSliders();
    
    // Search Input
    handleSearchInput();
    
    // Floating Labels
    handleFloatingLabels();
    
    // Switch Toggles
    handleSwitchToggles();
}

function handleFileUpload() {
    document.querySelectorAll('.file-upload').forEach(fileUpload => {
        const input = fileUpload.querySelector('.file-upload__input');
        const label = fileUpload.querySelector('.file-upload__label');
        const textEl = fileUpload.querySelector('.file-upload__text');
        
        // Handle file selection
        input.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                const fileName = files.length === 1 ? files[0].name : `${files.length} files selected`;
                textEl.textContent = fileName;
                textEl.classList.add('has-file');
            } else {
                textEl.textContent = 'Choose file or drag here';
                textEl.classList.remove('has-file');
            }
        });
        
        // Handle drag and drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            label.addEventListener(eventName, () => fileUpload.classList.add('file-upload--drag-over'), false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, () => fileUpload.classList.remove('file-upload--drag-over'), false);
        });
        
        label.addEventListener('drop', handleDrop, false);
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            input.files = files;
            
            const event = new Event('change', { bubbles: true });
            input.dispatchEvent(event);
        }
    });
}

function handleRangeSliders() {
    document.querySelectorAll('.range-slider').forEach(slider => {
        const input = slider.querySelector('.range-slider__input');
        const track = slider.querySelector('.range-slider__track');
        
        if (input && track) {
            updateSliderTrack(input, track);
            
            input.addEventListener('input', () => {
                updateSliderTrack(input, track);
            });
        }
    });
    
    function updateSliderTrack(input, track) {
        const value = (input.value - input.min) / (input.max - input.min) * 100;
        track.style.width = `${value}%`;
    }
}

function handleSearchInput() {
    document.querySelectorAll('.search-input').forEach(searchInput => {
        const input = searchInput.querySelector('.search-input__field');
        const clearBtn = searchInput.querySelector('.search-input__clear');
        
        if (input && clearBtn) {
            input.addEventListener('input', () => {
                clearBtn.style.display = input.value ? 'flex' : 'none';
            });
            
            clearBtn.addEventListener('click', () => {
                input.value = '';
                clearBtn.style.display = 'none';
                input.focus();
            });
        }
    });
}

function handleFloatingLabels() {
    document.querySelectorAll('.floating-label').forEach(container => {
        const input = container.querySelector('.floating-label__input');
        const label = container.querySelector('.floating-label__label');
        
        if (input && label) {
            // Check initial state
            checkFloatingLabel(input, label);
            
            input.addEventListener('focus', () => {
                label.classList.add('floating');
            });
            
            input.addEventListener('blur', () => {
                checkFloatingLabel(input, label);
            });
            
            input.addEventListener('input', () => {
                checkFloatingLabel(input, label);
            });
        }
    });
    
    function checkFloatingLabel(input, label) {
        if (input.value || input.matches(':focus')) {
            label.classList.add('floating');
        } else {
            label.classList.remove('floating');
        }
    }
}

function handleSwitchToggles() {
    document.querySelectorAll('.switch__input').forEach(input => {
        input.addEventListener('change', () => {
            const event = new CustomEvent('switchToggle', {
                detail: { checked: input.checked, value: input.value }
            });
            input.dispatchEvent(event);
        });
    });
}

// Data Visualization
function initializeDataVisualization() {
    // Progress Bars
    handleProgressBars();
    
    // Circular Progress
    handleCircularProgress();
    
    // Stats Cards
    handleStatsCards();
    
    // Donut Charts
    handleDonutCharts();
}

function handleProgressBars() {
    document.querySelectorAll('.progress').forEach(progressBar => {
        const bar = progressBar.querySelector('.progress__bar');
        const targetWidth = bar.getAttribute('data-width') || bar.style.width;
        
        if (targetWidth) {
            // Animate progress bar
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        }
    });
}

function handleCircularProgress() {
    document.querySelectorAll('.progress-circle').forEach(circle => {
        const value = circle.getAttribute('data-value') || 0;
        circle.style.setProperty('--progress-value', `${value}%`);
        
        // Animate the progress
        let currentValue = 0;
        const increment = value / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= value) {
                currentValue = value;
                clearInterval(timer);
            }
            circle.style.setProperty('--progress-value', `${currentValue}%`);
        }, 20);
    });
}

function handleStatsCards() {
    document.querySelectorAll('.stats-card').forEach(card => {
        const valueEl = card.querySelector('.stats-card__value');
        const targetValue = valueEl.getAttribute('data-value') || valueEl.textContent;
        
        if (targetValue && !isNaN(targetValue)) {
            animateNumber(valueEl, 0, parseInt(targetValue), 1000);
        }
    });
    
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const difference = end - start;
        
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (difference * progress));
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
}

function handleDonutCharts() {
    document.querySelectorAll('.donut-chart').forEach(chart => {
        const foreground = chart.querySelector('.donut-chart__foreground');
        const value = chart.getAttribute('data-value') || 0;
        const radius = 90;
        const circumference = 2 * Math.PI * radius;
        
        foreground.style.strokeDasharray = circumference;
        foreground.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            const offset = circumference - (value / 100 * circumference);
            foreground.style.strokeDashoffset = offset;
        }, 100);
    });
}

// Layout Components
function initializeLayoutComponents() {
    // Sidebar
    handleSidebar();
    
    // Accordion
    handleAccordion();
    
    // Timeline
    handleTimeline();
}

function handleSidebar() {
    // Sidebar toggle
    document.querySelectorAll('[data-sidebar-toggle]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-sidebar-toggle');
            const sidebar = document.getElementById(targetId);
            const overlay = document.querySelector('.sidebar-overlay');
            
            if (sidebar) {
                sidebar.classList.toggle('show');
                if (overlay) {
                    overlay.classList.toggle('show');
                }
            }
        });
    });
    
    // Sidebar overlay click
    document.querySelectorAll('.sidebar-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            document.querySelectorAll('.sidebar.show').forEach(sidebar => {
                sidebar.classList.remove('show');
            });
            overlay.classList.remove('show');
        });
    });
    
    // Collapsible sidebar
    document.querySelectorAll('.sidebar--collapsible').forEach(sidebar => {
        const toggleBtn = sidebar.querySelector('[data-sidebar-collapse]');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('expanded');
            });
        }
    });
}

function handleAccordion() {
    document.querySelectorAll('.accordion').forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion__header');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.closest('.accordion__item');
                const content = item.querySelector('.accordion__content');
                const icon = header.querySelector('.accordion__icon');
                
                // Close other items if not multi-expand
                if (!accordion.hasAttribute('data-multi-expand')) {
                    accordion.querySelectorAll('.accordion__item').forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherContent = otherItem.querySelector('.accordion__content');
                            const otherHeader = otherItem.querySelector('.accordion__header');
                            const otherIcon = otherHeader.querySelector('.accordion__icon');
                            
                            otherContent.classList.remove('show');
                            otherHeader.classList.remove('active');
                            if (otherIcon) otherIcon.classList.remove('rotated');
                        }
                    });
                }
                
                // Toggle current item
                content.classList.toggle('show');
                header.classList.toggle('active');
                if (icon) icon.classList.toggle('rotated');
            });
        });
    });
}

function handleTimeline() {
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline__item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Interactive Components
function initializeInteractiveComponents() {
    // Tooltip
    handleTooltips();
    
    // Popover
    handlePopovers();
    
    // Offcanvas
    handleOffcanvas();
    
    // Image Gallery
    handleImageGallery();
    
    // Lightbox
    handleLightbox();
}

function handleTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(trigger => {
        const text = trigger.getAttribute('data-tooltip');
        const placement = trigger.getAttribute('data-tooltip-placement') || 'top';
        
        let tooltip;
        
        trigger.addEventListener('mouseenter', () => {
            tooltip = createTooltip(text, placement);
            document.body.appendChild(tooltip);
            positionTooltip(trigger, tooltip, placement);
            
            setTimeout(() => {
                tooltip.classList.add('show');
            }, 10);
        });
        
        trigger.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            }
        });
    });
    
    function createTooltip(text, placement) {
        const tooltip = document.createElement('div');
        tooltip.className = `tooltip tooltip--${placement}`;
        tooltip.innerHTML = `
            <div class="tooltip__arrow"></div>
            <div class="tooltip__inner">${text}</div>
        `;
        return tooltip;
    }
    
    function positionTooltip(trigger, tooltip, placement) {
        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch (placement) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - 10;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = triggerRect.bottom + 10;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left - tooltipRect.width - 10;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + 10;
                break;
        }
        
        tooltip.style.top = `${top + window.scrollY}px`;
        tooltip.style.left = `${left + window.scrollX}px`;
    }
}

function handlePopovers() {
    document.querySelectorAll('[data-popover]').forEach(trigger => {
        const content = trigger.getAttribute('data-popover');
        const title = trigger.getAttribute('data-popover-title');
        const placement = trigger.getAttribute('data-popover-placement') || 'top';
        
        let popover;
        
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (popover) {
                popover.remove();
                popover = null;
                return;
            }
            
            popover = createPopover(content, title, placement);
            document.body.appendChild(popover);
            positionPopover(trigger, popover, placement);
            
            // Close on outside click
            setTimeout(() => {
                document.addEventListener('click', handleOutsideClick);
            }, 10);
        });
        
        function handleOutsideClick(e) {
            if (popover && !popover.contains(e.target) && !trigger.contains(e.target)) {
                popover.remove();
                popover = null;
                document.removeEventListener('click', handleOutsideClick);
            }
        }
    });
    
    function createPopover(content, title, placement) {
        const popover = document.createElement('div');
        popover.className = `popover popover--${placement}`;
        popover.innerHTML = `
            <div class="popover__arrow"></div>
            ${title ? `<div class="popover__header">${title}</div>` : ''}
            <div class="popover__body">${content}</div>
        `;
        return popover;
    }
    
    function positionPopover(trigger, popover, placement) {
        const triggerRect = trigger.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();
        
        let top, left;
        
        switch (placement) {
            case 'top':
                top = triggerRect.top - popoverRect.height - 10;
                left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
                break;
            case 'bottom':
                top = triggerRect.bottom + 10;
                left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
                left = triggerRect.left - popoverRect.width - 10;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
                left = triggerRect.right + 10;
                break;
        }
        
        popover.style.top = `${top + window.scrollY}px`;
        popover.style.left = `${left + window.scrollX}px`;
    }
}

function handleOffcanvas() {
    document.querySelectorAll('[data-offcanvas-toggle]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-offcanvas-toggle');
            const offcanvas = document.getElementById(targetId);
            
            if (offcanvas) {
                toggleOffcanvas(offcanvas);
            }
        });
    });
    
    function toggleOffcanvas(offcanvas) {
        const backdrop = offcanvas.querySelector('.offcanvas__backdrop') || createBackdrop();
        
        if (offcanvas.classList.contains('show')) {
            // Hide
            offcanvas.classList.remove('show');
            backdrop.classList.remove('show');
            setTimeout(() => {
                backdrop.remove();
            }, 300);
        } else {
            // Show
            document.body.appendChild(backdrop);
            offcanvas.classList.add('show');
            backdrop.classList.add('show');
            
            // Close on backdrop click
            backdrop.addEventListener('click', () => {
                toggleOffcanvas(offcanvas);
            });
        }
    }
    
    function createBackdrop() {
        const backdrop = document.createElement('div');
        backdrop.className = 'offcanvas__backdrop fade';
        return backdrop;
    }
}

function handleImageGallery() {
    document.querySelectorAll('.image-gallery').forEach(gallery => {
        const items = gallery.querySelectorAll('.image-gallery__item');
        
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const images = Array.from(items).map(item => item.querySelector('img').src);
                openLightbox(images, index);
            });
        });
    });
}

function handleLightbox() {
    // This will be called by image gallery
    window.openLightbox = function(images, currentIndex = 0) {
        const lightbox = createLightbox(images, currentIndex);
        document.body.appendChild(lightbox);
        
        setTimeout(() => {
            lightbox.classList.add('show');
        }, 10);
    };
    
    function createLightbox(images, currentIndex) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox__content">
                <button class="lightbox__close">&times;</button>
                <img src="${images[currentIndex]}" alt="">
                ${images.length > 1 ? `
                    <button class="lightbox__nav lightbox__nav--prev">&#8249;</button>
                    <button class="lightbox__nav lightbox__nav--next">&#8250;</button>
                ` : ''}
            </div>
        `;
        
        const img = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox__close');
        const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
        const nextBtn = lightbox.querySelector('.lightbox__nav--next');
        
        let current = currentIndex;
        
        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navigation
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                current = (current - 1 + images.length) % images.length;
                img.src = images[current];
            });
            
            nextBtn.addEventListener('click', () => {
                current = (current + 1) % images.length;
                img.src = images[current];
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function keyHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', keyHandler);
            } else if (e.key === 'ArrowLeft' && images.length > 1) {
                current = (current - 1 + images.length) % images.length;
                img.src = images[current];
            } else if (e.key === 'ArrowRight' && images.length > 1) {
                current = (current + 1) % images.length;
                img.src = images[current];
            }
        });
        
        return lightbox;
    }
}

// Utility Components
function initializeUtilityComponents() {
    // Loading overlays
    handleLoadingOverlays();
    
    // Skeleton screens
    handleSkeletonScreens();
    
    // Notification badges
    handleNotificationBadges();
    
    // Status indicators
    handleStatusIndicators();
}

function handleLoadingOverlays() {
    window.showLoadingOverlay = function(text = 'Loading...') {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-overlay__content">
                <div class="loading">
                    <div class="loading__spinner"></div>
                </div>
                <div class="loading__text">${text}</div>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    };
    
    window.hideLoadingOverlay = function(overlay) {
        if (overlay && overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    };
}

function handleSkeletonScreens() {
    // Auto-replace skeleton screens with actual content
    document.querySelectorAll('[data-skeleton-replace]').forEach(skeleton => {
        const delay = parseInt(skeleton.getAttribute('data-skeleton-delay')) || 2000;
        const content = skeleton.getAttribute('data-skeleton-content') || 'Content loaded!';
        
        setTimeout(() => {
            skeleton.innerHTML = content;
            skeleton.classList.remove('skeleton');
        }, delay);
    });
}

function handleNotificationBadges() {
    window.updateNotificationBadge = function(badgeId, count) {
        const badge = document.getElementById(badgeId);
        if (badge) {
            const countEl = badge.querySelector('.notification-badge__count');
            if (countEl) {
                countEl.textContent = count;
                countEl.style.display = count > 0 ? 'block' : 'none';
            }
        }
    };
}

function handleStatusIndicators() {
    // Auto-update status indicators
    document.querySelectorAll('[data-status-auto]').forEach(indicator => {
        const url = indicator.getAttribute('data-status-url');
        const interval = parseInt(indicator.getAttribute('data-status-interval')) || 30000;
        
        if (url) {
            setInterval(() => {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        updateStatusIndicator(indicator, data.status);
                    })
                    .catch(() => {
                        updateStatusIndicator(indicator, 'offline');
                    });
            }, interval);
        }
    });
    
    function updateStatusIndicator(indicator, status) {
        const dot = indicator.querySelector('.status__indicator');
        const text = indicator.querySelector('.status__text');
        
        if (dot) {
            dot.className = `status__indicator status__indicator--${status}`;
        }
        
        if (text) {
            text.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        }
    }
}

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAdvancedForms,
        initializeDataVisualization,
        initializeLayoutComponents,
        initializeInteractiveComponents,
        initializeUtilityComponents
    };
}