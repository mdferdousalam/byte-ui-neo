# 🔧 JavaScript API Reference

Hikma UI provides a comprehensive JavaScript API for interactive components. All components are built with vanilla JavaScript and provide both automatic initialization and manual control.

## Global Object

All Hikma UI JavaScript functionality is available through the global `HikmaUI` object:

```javascript
// Access the global HikmaUI object
console.log(HikmaUI);

// Available methods and utilities
HikmaUI.adjustTextColorForContrast('#007bff', '#ffffff');
HikmaUI.init(); // Initialize all components
```

## Component APIs

### Modal API

#### Methods

```javascript
// Show modal
HikmaUI.Modal.show(modalId);

// Hide modal
HikmaUI.Modal.hide(modalId);

// Toggle modal
HikmaUI.Modal.toggle(modalId);

// Get modal instance
const modal = HikmaUI.Modal.getInstance(modalId);
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
HikmaUI.Modal.init('#myModal');

// Initialize all modals
HikmaUI.Modal.initAll();

// Create modal with options
const modal = new HikmaUI.Modal('#myModal', {
    backdrop: true,
    keyboard: true,
    focus: true
});
```

### Dropdown API

#### Methods

```javascript
// Show dropdown
HikmaUI.Dropdown.show(dropdownId);

// Hide dropdown
HikmaUI.Dropdown.hide(dropdownId);

// Toggle dropdown
HikmaUI.Dropdown.toggle(dropdownId);

// Get dropdown instance
const dropdown = HikmaUI.Dropdown.getInstance(dropdownId);
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
HikmaUI.Dropdown.init('.dropdown-toggle');

// Initialize all dropdowns
HikmaUI.Dropdown.initAll();

// Create dropdown with options
const dropdown = new HikmaUI.Dropdown('.dropdown-toggle', {
    boundary: 'viewport',
    offset: 10,
    flip: true
});
```

### Tabs API

#### Methods

```javascript
// Show tab
HikmaUI.Tabs.show(tabId);

// Get active tab
const activeTab = HikmaUI.Tabs.getActive(tabGroupId);

// Get tab instance
const tab = HikmaUI.Tabs.getInstance(tabId);
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
HikmaUI.Tabs.init('[data-bs-toggle="tab"]');

// Initialize all tabs
HikmaUI.Tabs.initAll();

// Create tab with options
const tab = new HikmaUI.Tabs('[data-bs-toggle="tab"]', {
    fade: true,
    keyboard: true
});
```

### Carousel API

#### Methods

```javascript
// Next slide
HikmaUI.Carousel.next(carouselId);

// Previous slide
HikmaUI.Carousel.prev(carouselId);

// Go to specific slide
HikmaUI.Carousel.goTo(carouselId, slideIndex);

// Start auto-sliding
HikmaUI.Carousel.start(carouselId);

// Stop auto-sliding
HikmaUI.Carousel.stop(carouselId);

// Get carousel instance
const carousel = HikmaUI.Carousel.getInstance(carouselId);
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
HikmaUI.Carousel.init('#myCarousel');

// Initialize all carousels
HikmaUI.Carousel.initAll();

// Create carousel with options
const carousel = new HikmaUI.Carousel('#myCarousel', {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
});
```

### Alert API

#### Methods

```javascript
// Close alert
HikmaUI.Alert.close(alertId);

// Get alert instance
const alert = HikmaUI.Alert.getInstance(alertId);
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
HikmaUI.Alert.initAll();

// Create alert with options
const alert = new HikmaUI.Alert('.alert-dismissible', {
    fade: true,
    duration: 150
});
```

### Toast API

#### Methods

```javascript
// Show toast
HikmaUI.Toast.show(toastId);

// Hide toast
HikmaUI.Toast.hide(toastId);

// Get toast instance
const toast = HikmaUI.Toast.getInstance(toastId);
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
HikmaUI.Toast.init('#myToast');

// Initialize all toasts
HikmaUI.Toast.initAll();

// Create toast with options
const toast = new HikmaUI.Toast('#myToast', {
    autohide: true,
    delay: 5000
});
```

### Form Validation API

#### Methods

```javascript
// Validate form
const isValid = HikmaUI.FormValidation.validate(formElement);

// Validate field
const isFieldValid = HikmaUI.FormValidation.validateField(fieldElement);

// Reset validation
HikmaUI.FormValidation.reset(formElement);

// Get validation errors
const errors = HikmaUI.FormValidation.getErrors(formElement);
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
HikmaUI.FormValidation.init('.needs-validation');

// Initialize all forms
HikmaUI.FormValidation.initAll();

// Create form validation with options
const validation = new HikmaUI.FormValidation('.needs-validation', {
    validateOnInput: true,
    validateOnBlur: true,
    showFeedback: true
});
```

## Utility Functions

### Contrast Checker

```javascript
// Adjust text color for contrast
const textColor = HikmaUI.adjustTextColorForContrast(
    '#007bff',      // background color
    '#ffffff',      // original text color
    4.5            // contrast ratio threshold (optional)
);

// Convert hex to RGB
const rgb = HikmaUI.hexToRgb('#007bff');
// Returns: { r: 0, g: 123, b: 255 }

// Get relative luminance
const luminance = HikmaUI.getRelativeLuminance({ r: 0, g: 123, b: 255 });

// Get contrast ratio
const ratio = HikmaUI.getContrastRatio(0.2, 0.8);
```

### Theme Utilities

```javascript
// Toggle dark mode
HikmaUI.Theme.toggleDarkMode();

// Set theme
HikmaUI.Theme.setTheme('dark'); // or 'light'

// Get current theme
const currentTheme = HikmaUI.Theme.getCurrentTheme();

// Save theme preference
HikmaUI.Theme.savePreference('dark');

// Load theme preference
HikmaUI.Theme.loadPreference();
```

## Configuration

### Global Configuration

```javascript
// Set global configuration
HikmaUI.config({
    prefix: 'hikma-',
    autoInit: true,
    debug: false,
    theme: 'light',
    breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400
    }
});
```

### Component-Specific Configuration

```javascript
// Configure modals globally
HikmaUI.Modal.config({
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
});

// Configure dropdowns globally
HikmaUI.Dropdown.config({
    boundary: 'viewport',
    offset: 10,
    flip: true,
    autoClose: true
});

// Configure carousels globally
HikmaUI.Carousel.config({
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
});
```

## Manual Initialization

### Initialize All Components

```javascript
// Initialize all components automatically
HikmaUI.init();

// Initialize specific component types
HikmaUI.init(['Modal', 'Dropdown', 'Tabs']);

// Initialize with options
HikmaUI.init({
    components: ['Modal', 'Dropdown'],
    autoInit: true,
    debug: true
});
```

### Individual Component Initialization

```javascript
// Initialize individual components
const modal = new HikmaUI.Modal('#myModal');
const dropdown = new HikmaUI.Dropdown('.dropdown-toggle');
const tabs = new HikmaUI.Tabs('[data-bs-toggle="tab"]');
const carousel = new HikmaUI.Carousel('#myCarousel');
const alert = new HikmaUI.Alert('.alert-dismissible');
const toast = new HikmaUI.Toast('#myToast');
```

## Event Management

### Custom Events

```javascript
// Dispatch custom events
HikmaUI.Events.dispatch('custom:event', {
    detail: { message: 'Hello from Hikma UI' }
});

// Listen to custom events
HikmaUI.Events.on('custom:event', (event) => {
    console.log(event.detail.message);
});

// Remove event listener
HikmaUI.Events.off('custom:event', handlerFunction);
```

### Event Delegation

```javascript
// Add delegated event listeners
HikmaUI.Events.delegate(document, 'click', '.btn', (event) => {
    console.log('Button clicked:', event.target);
});

// Remove delegated event listeners
HikmaUI.Events.undelegate(document, 'click', '.btn');
```

## Advanced Usage

### Custom Components

```javascript
// Create custom component
class CustomComponent extends HikmaUI.Component {
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
HikmaUI.register('CustomComponent', CustomComponent);
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
    }
};

// Register plugin
HikmaUI.use(MyPlugin);

// Use plugin
HikmaUI.MyPlugin.someMethod();
```

## Error Handling

### Global Error Handler

```javascript
// Set global error handler
HikmaUI.onError((error, component) => {
    console.error('Hikma UI Error:', error);
    console.error('Component:', component);
    
    // Send error to logging service
    // logError(error, component);
});
```

### Component-Specific Error Handling

```javascript
// Handle component errors
try {
    const modal = new HikmaUI.Modal('#nonExistentModal');
} catch (error) {
    console.error('Modal initialization failed:', error);
}

// Use safe initialization
const modal = HikmaUI.Modal.safe('#maybeModal');
if (modal) {
    modal.show();
}
```

## Performance Optimization

### Lazy Loading

```javascript
// Load components on demand
HikmaUI.lazy('Modal', () => {
    import('./components/modal.js').then(module => {
        HikmaUI.register('Modal', module.default);
    });
});

// Use lazy-loaded component
HikmaUI.whenReady('Modal', () => {
    const modal = new HikmaUI.Modal('#myModal');
});
```

### Debouncing and Throttling

```javascript
// Debounce function calls
const debouncedResize = HikmaUI.debounce(() => {
    // Handle resize
}, 300);

window.addEventListener('resize', debouncedResize);

// Throttle function calls
const throttledScroll = HikmaUI.throttle(() => {
    // Handle scroll
}, 100);

window.addEventListener('scroll', throttledScroll);
```

This comprehensive JavaScript API reference provides all the tools you need to work with Hikma UI components programmatically!