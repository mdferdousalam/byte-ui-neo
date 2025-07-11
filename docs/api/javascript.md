# 🔧 JavaScript API Reference

Byte UI provides a comprehensive JavaScript API for interactive components. All components are built with vanilla JavaScript and provide both automatic initialization and manual control.

## Global Object

All Byte UI JavaScript functionality is available through the global `ByteUI` object:

```javascript
// Access the global ByteUI object
console.log(ByteUI);

// Available methods and utilities
ByteUI.adjustTextColorForContrast('#007bff', '#ffffff');
ByteUI.init(); // Initialize all components
```

## Component APIs

### Modal API

#### Methods

```javascript
// Show modal
ByteUI.Modal.show(modalId);

// Hide modal
ByteUI.Modal.hide(modalId);

// Toggle modal
ByteUI.Modal.toggle(modalId);

// Get modal instance
const modal = ByteUI.Modal.getInstance(modalId);
```

#### Events

```javascript
// Listen to modal events
document.addEventListener('modal:show', (event) => {
	console.log('Modal shown:', event.detail.modalId);
});

document.addEventListener('modal:hide', (event) => {
	console.log('Modal hidden:', event.detail.modalId);
});

document.addEventListener('modal:shown', (event) => {
	console.log('Modal show transition completed:', event.detail.modalId);
});

document.addEventListener('modal:hidden', (event) => {
	console.log('Modal hide transition completed:', event.detail.modalId);
});
```

#### Manual Initialization

```javascript
// Initialize specific modal
ByteUI.Modal.init('#myModal');

// Initialize all modals
ByteUI.Modal.initAll();

// Create modal with options
const modal = new ByteUI.Modal('#myModal', {
	backdrop: true,
	keyboard: true,
	focus: true,
});
```

### Dropdown API

#### Methods

```javascript
// Show dropdown
ByteUI.Dropdown.show(dropdownId);

// Hide dropdown
ByteUI.Dropdown.hide(dropdownId);

// Toggle dropdown
ByteUI.Dropdown.toggle(dropdownId);

// Get dropdown instance
const dropdown = ByteUI.Dropdown.getInstance(dropdownId);
```

#### Events

```javascript
// Listen to dropdown events
document.addEventListener('dropdown:show', (event) => {
	console.log('Dropdown shown:', event.detail.dropdownId);
});

document.addEventListener('dropdown:hide', (event) => {
	console.log('Dropdown hidden:', event.detail.dropdownId);
});
```

#### Manual Initialization

```javascript
// Initialize specific dropdown
ByteUI.Dropdown.init('.dropdown-toggle');

// Initialize all dropdowns
ByteUI.Dropdown.initAll();

// Create dropdown with options
const dropdown = new ByteUI.Dropdown('.dropdown-toggle', {
	boundary: 'viewport',
	offset: 10,
	flip: true,
});
```

### Tabs API

#### Methods

```javascript
// Show tab
ByteUI.Tabs.show(tabId);

// Get active tab
const activeTab = ByteUI.Tabs.getActive(tabGroupId);

// Get tab instance
const tab = ByteUI.Tabs.getInstance(tabId);
```

#### Events

```javascript
// Listen to tab events
document.addEventListener('tab:show', (event) => {
	console.log('Tab shown:', event.detail.tabId);
});

document.addEventListener('tab:hide', (event) => {
	console.log('Tab hidden:', event.detail.tabId);
});

document.addEventListener('tab:shown', (event) => {
	console.log('Tab show transition completed:', event.detail.tabId);
});

document.addEventListener('tab:hidden', (event) => {
	console.log('Tab hide transition completed:', event.detail.tabId);
});
```

#### Manual Initialization

```javascript
// Initialize specific tab group
ByteUI.Tabs.init('[data-bs-toggle="tab"]');

// Initialize all tabs
ByteUI.Tabs.initAll();

// Create tab with options
const tab = new ByteUI.Tabs('[data-bs-toggle="tab"]', {
	fade: true,
	keyboard: true,
});
```

### Carousel API

#### Methods

```javascript
// Next slide
ByteUI.Carousel.next(carouselId);

// Previous slide
ByteUI.Carousel.prev(carouselId);

// Go to specific slide
ByteUI.Carousel.goTo(carouselId, slideIndex);

// Start auto-sliding
ByteUI.Carousel.start(carouselId);

// Stop auto-sliding
ByteUI.Carousel.stop(carouselId);

// Get carousel instance
const carousel = ByteUI.Carousel.getInstance(carouselId);
```

#### Events

```javascript
// Listen to carousel events
document.addEventListener('carousel:slide', (event) => {
	console.log('Carousel sliding:', event.detail);
});

document.addEventListener('carousel:slid', (event) => {
	console.log('Carousel slide completed:', event.detail);
});
```

#### Manual Initialization

```javascript
// Initialize specific carousel
ByteUI.Carousel.init('#myCarousel');

// Initialize all carousels
ByteUI.Carousel.initAll();

// Create carousel with options
const carousel = new ByteUI.Carousel('#myCarousel', {
	interval: 5000,
	pause: 'hover',
	wrap: true,
	keyboard: true,
});
```

### Alert API

#### Methods

```javascript
// Close alert
ByteUI.Alert.close(alertId);

// Get alert instance
const alert = ByteUI.Alert.getInstance(alertId);
```

#### Events

```javascript
// Listen to alert events
document.addEventListener('alert:close', (event) => {
	console.log('Alert closing:', event.detail.alertId);
});

document.addEventListener('alert:closed', (event) => {
	console.log('Alert closed:', event.detail.alertId);
});
```

#### Manual Initialization

```javascript
// Initialize all alerts
ByteUI.Alert.initAll();

// Create alert with options
const alert = new ByteUI.Alert('.alert-dismissible', {
	fade: true,
	duration: 150,
});
```

### Toast API

#### Methods

```javascript
// Show toast
ByteUI.Toast.show(toastId);

// Hide toast
ByteUI.Toast.hide(toastId);

// Get toast instance
const toast = ByteUI.Toast.getInstance(toastId);
```

#### Events

```javascript
// Listen to toast events
document.addEventListener('toast:show', (event) => {
	console.log('Toast shown:', event.detail.toastId);
});

document.addEventListener('toast:hide', (event) => {
	console.log('Toast hidden:', event.detail.toastId);
});

document.addEventListener('toast:shown', (event) => {
	console.log('Toast show transition completed:', event.detail.toastId);
});

document.addEventListener('toast:hidden', (event) => {
	console.log('Toast hide transition completed:', event.detail.toastId);
});
```

#### Manual Initialization

```javascript
// Initialize specific toast
ByteUI.Toast.init('#myToast');

// Initialize all toasts
ByteUI.Toast.initAll();

// Create toast with options
const toast = new ByteUI.Toast('#myToast', {
	autohide: true,
	delay: 5000,
});
```

### Form Validation API

#### Methods

```javascript
// Validate form
const isValid = ByteUI.FormValidation.validate(formElement);

// Validate field
const isFieldValid = ByteUI.FormValidation.validateField(fieldElement);

// Reset validation
ByteUI.FormValidation.reset(formElement);

// Get validation errors
const errors = ByteUI.FormValidation.getErrors(formElement);
```

#### Events

```javascript
// Listen to validation events
document.addEventListener('form:validate', (event) => {
	console.log('Form validation:', event.detail);
});

document.addEventListener('form:valid', (event) => {
	console.log('Form is valid:', event.detail);
});

document.addEventListener('form:invalid', (event) => {
	console.log('Form is invalid:', event.detail);
});

document.addEventListener('field:validate', (event) => {
	console.log('Field validation:', event.detail);
});
```

#### Manual Initialization

```javascript
// Initialize form validation
ByteUI.FormValidation.init('.needs-validation');

// Initialize all forms
ByteUI.FormValidation.initAll();

// Create form validation with options
const validation = new ByteUI.FormValidation('.needs-validation', {
	validateOnInput: true,
	validateOnBlur: true,
	showFeedback: true,
});
```

## Utility Functions

### Contrast Checker

```javascript
// Adjust text color for contrast
const textColor = ByteUI.adjustTextColorForContrast(
	'#007bff', // background color
	'#ffffff', // original text color
	4.5, // contrast ratio threshold (optional)
);

// Convert hex to RGB
const rgb = ByteUI.hexToRgb('#007bff');
// Returns: { r: 0, g: 123, b: 255 }

// Get relative luminance
const luminance = ByteUI.getRelativeLuminance({ r: 0, g: 123, b: 255 });

// Get contrast ratio
const ratio = ByteUI.getContrastRatio(0.2, 0.8);
```

### Theme Utilities

```javascript
// Toggle dark mode
ByteUI.Theme.toggleDarkMode();

// Set theme
ByteUI.Theme.setTheme('dark'); // or 'light'

// Get current theme
const currentTheme = ByteUI.Theme.getCurrentTheme();

// Save theme preference
ByteUI.Theme.savePreference('dark');

// Load theme preference
ByteUI.Theme.loadPreference();
```

## Configuration

### Global Configuration

```javascript
// Set global configuration
ByteUI.config({
	prefix: 'byte-',
	autoInit: true,
	debug: false,
	theme: 'light',
	breakpoints: {
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200,
		xxl: 1400,
	},
});
```

### Component-Specific Configuration

```javascript
// Configure modals globally
ByteUI.Modal.config({
	backdrop: true,
	keyboard: true,
	focus: true,
	show: true,
});

// Configure dropdowns globally
ByteUI.Dropdown.config({
	boundary: 'viewport',
	offset: 10,
	flip: true,
	autoClose: true,
});

// Configure carousels globally
ByteUI.Carousel.config({
	interval: 5000,
	pause: 'hover',
	wrap: true,
	keyboard: true,
});
```

## Manual Initialization

### Initialize All Components

```javascript
// Initialize all components automatically
ByteUI.init();

// Initialize specific component types
ByteUI.init(['Modal', 'Dropdown', 'Tabs']);

// Initialize with options
ByteUI.init({
	components: ['Modal', 'Dropdown'],
	autoInit: true,
	debug: true,
});
```

### Individual Component Initialization

```javascript
// Initialize individual components
const modal = new ByteUI.Modal('#myModal');
const dropdown = new ByteUI.Dropdown('.dropdown-toggle');
const tabs = new ByteUI.Tabs('[data-bs-toggle="tab"]');
const carousel = new ByteUI.Carousel('#myCarousel');
const alert = new ByteUI.Alert('.alert-dismissible');
const toast = new ByteUI.Toast('#myToast');
```

## Event Management

### Custom Events

```javascript
// Dispatch custom events
ByteUI.Events.dispatch('custom:event', {
	detail: { message: 'Hello from Byte UI' },
});

// Listen to custom events
ByteUI.Events.on('custom:event', (event) => {
	console.log(event.detail.message);
});

// Remove event listener
ByteUI.Events.off('custom:event', handlerFunction);
```

### Event Delegation

```javascript
// Add delegated event listeners
ByteUI.Events.delegate(document, 'click', '.btn', (event) => {
	console.log('Button clicked:', event.target);
});

// Remove delegated event listeners
ByteUI.Events.undelegate(document, 'click', '.btn');
```

## Advanced Usage

### Custom Components

```javascript
// Create custom component
class CustomComponent extends ByteUI.Component {
	constructor(element, options = {}) {
		super(element, options);
		this.init();
	}

	init() {
		this.element.addEventListener('click', this.handleClick.bind(this));
	}

	handleClick(event) {
		this.dispatch('custom:click', { element: this.element });
	}

	destroy() {
		this.element.removeEventListener('click', this.handleClick);
		super.destroy();
	}
}

// Register custom component
ByteUI.register('CustomComponent', CustomComponent);
```

### Plugin System

```javascript
// Create plugin
const MyPlugin = {
	name: 'MyPlugin',
	version: '1.0.0',

	init() {
		console.log('MyPlugin initialized');
	},

	destroy() {
		console.log('MyPlugin destroyed');
	},
};

// Register plugin
ByteUI.use(MyPlugin);

// Use plugin
ByteUI.MyPlugin.someMethod();
```

## Error Handling

### Global Error Handler

```javascript
// Set global error handler
ByteUI.onError((error, component) => {
	console.error('Byte UI Error:', error);
	console.error('Component:', component);

	// Send error to logging service
	// logError(error, component);
});
```

### Component-Specific Error Handling

```javascript
// Handle component errors
try {
	const modal = new ByteUI.Modal('#nonExistentModal');
} catch (error) {
	console.error('Modal initialization failed:', error);
}

// Use safe initialization
const modal = ByteUI.Modal.safe('#maybeModal');
if (modal) {
	modal.show();
}
```

## Performance Optimization

### Lazy Loading

```javascript
// Load components on demand
ByteUI.lazy('Modal', () => {
	import('./components/modal.js').then((module) => {
		ByteUI.register('Modal', module.default);
	});
});

// Use lazy-loaded component
ByteUI.whenReady('Modal', () => {
	const modal = new ByteUI.Modal('#myModal');
});
```

### Debouncing and Throttling

```javascript
// Debounce function calls
const debouncedResize = ByteUI.debounce(() => {
	// Handle resize
}, 300);

window.addEventListener('resize', debouncedResize);

// Throttle function calls
const throttledScroll = ByteUI.throttle(() => {
	// Handle scroll
}, 100);

window.addEventListener('scroll', throttledScroll);
```

This comprehensive JavaScript API reference provides all the tools you need to work with Byte UI components programmatically!
