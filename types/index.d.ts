/**
 * Byte UI Framework TypeScript Definitions
 * Modern CSS Framework with TypeScript Support
 */

declare module 'byte-ui' {
  // Core Types
  export type ByteVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  export type ByteSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  export type ByteBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  export type ByteSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  export type ByteDisplay = 'none' | 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid';
  export type ByteTextAlign = 'start' | 'center' | 'end' | 'justify';
  export type ByteFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
  export type ByteJustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  export type ByteAlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  
  // Theme Configuration
  export interface ByteThemeConfig {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      danger: string;
      warning: string;
      info: string;
      light: string;
      dark: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    typography: {
      fontFamily: string;
      fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      lineHeight: {
        tight: string;
        normal: string;
        loose: string;
      };
    };
    borderRadius: {
      none: string;
      sm: string;
      base: string;
      lg: string;
      full: string;
    };
    shadows: {
      sm: string;
      base: string;
      lg: string;
    };
  }

  // Component Options
  export interface ButtonOptions {
    variant?: ByteVariant;
    size?: ByteSize;
    outline?: boolean;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    rounded?: boolean;
  }

  export interface ModalOptions {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
    centered?: boolean;
    scrollable?: boolean;
    backdrop?: boolean | 'static';
    keyboard?: boolean;
    focus?: boolean;
    animation?: boolean;
  }

  export interface TooltipOptions {
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
    trigger?: 'hover' | 'click' | 'focus' | 'manual';
    delay?: number | { show: number; hide: number };
    offset?: [number, number];
    animation?: boolean;
    html?: boolean;
  }

  export interface DropdownOptions {
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
    trigger?: 'hover' | 'click' | 'focus';
    offset?: [number, number];
    autoClose?: boolean | 'outside' | 'inside';
    boundary?: 'viewport' | 'window' | Element;
  }

  export interface CarouselOptions {
    interval?: number;
    wrap?: boolean;
    pause?: 'hover' | false;
    keyboard?: boolean;
    ride?: 'carousel' | false;
    touch?: boolean;
  }

  export interface ToastOptions {
    variant?: ByteVariant;
    position?: 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
    delay?: number;
    autohide?: boolean;
    animation?: boolean;
    html?: boolean;
  }

  export interface AlertOptions {
    variant?: ByteVariant;
    dismissible?: boolean;
    fade?: boolean;
    closeButton?: boolean;
  }

  export interface FormValidationOptions {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    email?: boolean;
    url?: boolean;
    number?: boolean;
    min?: number;
    max?: number;
    step?: number;
    custom?: (value: any) => boolean | string;
  }

  export interface FormFieldOptions {
    label?: string;
    placeholder?: string;
    helpText?: string;
    size?: ByteSize;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    validation?: FormValidationOptions;
    floating?: boolean;
  }

  // Component Classes
  export class ByteModal {
    constructor(element: Element, options?: ModalOptions);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): ByteModal | null;
  }

  export class ByteTooltip {
    constructor(element: Element, options?: TooltipOptions);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): ByteTooltip | null;
  }

  export class ByteDropdown {
    constructor(element: Element, options?: DropdownOptions);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): ByteDropdown | null;
  }

  export class ByteCarousel {
    constructor(element: Element, options?: CarouselOptions);
    cycle(): void;
    pause(): void;
    prev(): void;
    next(): void;
    nextWhenVisible(): void;
    to(index: number): void;
    dispose(): void;
    static getInstance(element: Element): ByteCarousel | null;
  }

  export class ByteToast {
    constructor(element: Element, options?: ToastOptions);
    show(): void;
    hide(): void;
    dispose(): void;
    static getInstance(element: Element): ByteToast | null;
  }

  export class ByteAlert {
    constructor(element: Element, options?: AlertOptions);
    close(): void;
    dispose(): void;
    static getInstance(element: Element): ByteAlert | null;
  }

  export class ByteCollapse {
    constructor(element: Element, options?: { toggle?: boolean });
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): ByteCollapse | null;
  }

  export class ByteTab {
    constructor(element: Element);
    show(): void;
    dispose(): void;
    static getInstance(element: Element): ByteTab | null;
  }

  export class ByteOffcanvas {
    constructor(element: Element, options?: { backdrop?: boolean | 'static'; keyboard?: boolean; scroll?: boolean });
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): ByteOffcanvas | null;
  }

  // Utility Functions
  export class ByteUtils {
    static debounce(func: Function, wait: number): Function;
    static throttle(func: Function, limit: number): Function;
    static getElementOffset(element: Element): { top: number; left: number };
    static getElementDimensions(element: Element): { width: number; height: number };
    static isVisible(element: Element): boolean;
    static addClass(element: Element, className: string): void;
    static removeClass(element: Element, className: string): void;
    static toggleClass(element: Element, className: string): void;
    static hasClass(element: Element, className: string): boolean;
    static getBreakpoint(): ByteBreakpoint;
    static isMobile(): boolean;
    static isTablet(): boolean;
    static isDesktop(): boolean;
  }

  // Theme Management
  export class ByteTheme {
    static setTheme(config: Partial<ByteThemeConfig>): void;
    static getTheme(): ByteThemeConfig;
    static toggleDarkMode(): void;
    static setDarkMode(enabled: boolean): void;
    static isDarkMode(): boolean;
    static setColorScheme(scheme: 'light' | 'dark' | 'auto'): void;
    static getColorScheme(): 'light' | 'dark' | 'auto';
  }

  // Form Validation
  export class ByteValidator {
    static validateField(element: HTMLInputElement, options?: FormValidationOptions): { valid: boolean; message?: string };
    static validateForm(form: HTMLFormElement): { valid: boolean; errors: { [key: string]: string } };
    static addValidator(name: string, validator: (value: any, options?: any) => boolean | string): void;
    static removeValidator(name: string): void;
  }

  // Event System
  export interface ByteEventMap {
    'byte.modal.show': CustomEvent<{ modal: ByteModal }>;
    'byte.modal.shown': CustomEvent<{ modal: ByteModal }>;
    'byte.modal.hide': CustomEvent<{ modal: ByteModal }>;
    'byte.modal.hidden': CustomEvent<{ modal: ByteModal }>;
    'byte.tooltip.show': CustomEvent<{ tooltip: ByteTooltip }>;
    'byte.tooltip.shown': CustomEvent<{ tooltip: ByteTooltip }>;
    'byte.tooltip.hide': CustomEvent<{ tooltip: ByteTooltip }>;
    'byte.tooltip.hidden': CustomEvent<{ tooltip: ByteTooltip }>;
    'byte.dropdown.show': CustomEvent<{ dropdown: ByteDropdown }>;
    'byte.dropdown.shown': CustomEvent<{ dropdown: ByteDropdown }>;
    'byte.dropdown.hide': CustomEvent<{ dropdown: ByteDropdown }>;
    'byte.dropdown.hidden': CustomEvent<{ dropdown: ByteDropdown }>;
    'byte.carousel.slide': CustomEvent<{ carousel: ByteCarousel; from: number; to: number }>;
    'byte.carousel.slid': CustomEvent<{ carousel: ByteCarousel; from: number; to: number }>;
    'byte.toast.show': CustomEvent<{ toast: ByteToast }>;
    'byte.toast.shown': CustomEvent<{ toast: ByteToast }>;
    'byte.toast.hide': CustomEvent<{ toast: ByteToast }>;
    'byte.toast.hidden': CustomEvent<{ toast: ByteToast }>;
    'byte.alert.close': CustomEvent<{ alert: ByteAlert }>;
    'byte.alert.closed': CustomEvent<{ alert: ByteAlert }>;
    'byte.theme.changed': CustomEvent<{ theme: 'light' | 'dark' }>;
    'byte.form.validate': CustomEvent<{ form: HTMLFormElement; valid: boolean }>;
    'byte.form.field.validate': CustomEvent<{ field: HTMLInputElement; valid: boolean; message?: string }>;
  }

  // Main Byte Class
  export class Byte {
    static version: string;
    static theme: typeof ByteTheme;
    static utils: typeof ByteUtils;
    static validator: typeof ByteValidator;
    
    static Modal: typeof ByteModal;
    static Tooltip: typeof ByteTooltip;
    static Dropdown: typeof ByteDropdown;
    static Carousel: typeof ByteCarousel;
    static Toast: typeof ByteToast;
    static Alert: typeof ByteAlert;
    static Collapse: typeof ByteCollapse;
    static Tab: typeof ByteTab;
    static Offcanvas: typeof ByteOffcanvas;
    
    static init(): void;
    static dispose(): void;
    static getVersion(): string;
  }

  // Default export
  export default Byte;
}

// Global declarations
declare global {
  interface Window {
    Byte: typeof import('byte-ui').Byte;
  }
  
  interface HTMLElement {
    addEventListener<K extends keyof import('byte-ui').ByteEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: import('byte-ui').ByteEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof import('byte-ui').ByteEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: import('byte-ui').ByteEventMap[K]) => any,
      options?: boolean | EventListenerOptions
    ): void;
  }
}