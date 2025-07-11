/**
 * Hikma UI Framework TypeScript Definitions
 * Modern CSS Framework with TypeScript Support
 */

declare module 'hikma-ui' {
  // Core Types
  export type HikmaVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  export type HikmaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  export type HikmaBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  export type HikmaSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  export type HikmaDisplay = 'none' | 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid';
  export type HikmaTextAlign = 'start' | 'center' | 'end' | 'justify';
  export type HikmaFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
  export type HikmaJustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  export type HikmaAlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  
  // Theme Configuration
  export interface HikmaThemeConfig {
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
    variant?: HikmaVariant;
    size?: HikmaSize;
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
    variant?: HikmaVariant;
    position?: 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
    delay?: number;
    autohide?: boolean;
    animation?: boolean;
    html?: boolean;
  }

  export interface AlertOptions {
    variant?: HikmaVariant;
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
    size?: HikmaSize;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    validation?: FormValidationOptions;
    floating?: boolean;
  }

  // Component Classes
  export class HikmaModal {
    constructor(element: Element, options?: ModalOptions);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): HikmaModal | null;
  }

  export class HikmaTooltip {
    constructor(element: Element, options?: TooltipOptions);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): HikmaTooltip | null;
  }

  export class HikmaDropdown {
    constructor(element: Element, options?: DropdownOptions);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): HikmaDropdown | null;
  }

  export class HikmaCarousel {
    constructor(element: Element, options?: CarouselOptions);
    cycle(): void;
    pause(): void;
    prev(): void;
    next(): void;
    nextWhenVisible(): void;
    to(index: number): void;
    dispose(): void;
    static getInstance(element: Element): HikmaCarousel | null;
  }

  export class HikmaToast {
    constructor(element: Element, options?: ToastOptions);
    show(): void;
    hide(): void;
    dispose(): void;
    static getInstance(element: Element): HikmaToast | null;
  }

  export class HikmaAlert {
    constructor(element: Element, options?: AlertOptions);
    close(): void;
    dispose(): void;
    static getInstance(element: Element): HikmaAlert | null;
  }

  export class HikmaCollapse {
    constructor(element: Element, options?: { toggle?: boolean });
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): HikmaCollapse | null;
  }

  export class HikmaTab {
    constructor(element: Element);
    show(): void;
    dispose(): void;
    static getInstance(element: Element): HikmaTab | null;
  }

  export class HikmaOffcanvas {
    constructor(element: Element, options?: { backdrop?: boolean | 'static'; keyboard?: boolean; scroll?: boolean });
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
    static getInstance(element: Element): HikmaOffcanvas | null;
  }

  // Utility Functions
  export class HikmaUtils {
    static debounce(func: Function, wait: number): Function;
    static throttle(func: Function, limit: number): Function;
    static getElementOffset(element: Element): { top: number; left: number };
    static getElementDimensions(element: Element): { width: number; height: number };
    static isVisible(element: Element): boolean;
    static addClass(element: Element, className: string): void;
    static removeClass(element: Element, className: string): void;
    static toggleClass(element: Element, className: string): void;
    static hasClass(element: Element, className: string): boolean;
    static getBreakpoint(): HikmaBreakpoint;
    static isMobile(): boolean;
    static isTablet(): boolean;
    static isDesktop(): boolean;
  }

  // Theme Management
  export class HikmaTheme {
    static setTheme(config: Partial<HikmaThemeConfig>): void;
    static getTheme(): HikmaThemeConfig;
    static toggleDarkMode(): void;
    static setDarkMode(enabled: boolean): void;
    static isDarkMode(): boolean;
    static setColorScheme(scheme: 'light' | 'dark' | 'auto'): void;
    static getColorScheme(): 'light' | 'dark' | 'auto';
  }

  // Form Validation
  export class HikmaValidator {
    static validateField(element: HTMLInputElement, options?: FormValidationOptions): { valid: boolean; message?: string };
    static validateForm(form: HTMLFormElement): { valid: boolean; errors: { [key: string]: string } };
    static addValidator(name: string, validator: (value: any, options?: any) => boolean | string): void;
    static removeValidator(name: string): void;
  }

  // Event System
  export interface HikmaEventMap {
    'hikma.modal.show': CustomEvent<{ modal: HikmaModal }>;
    'hikma.modal.shown': CustomEvent<{ modal: HikmaModal }>;
    'hikma.modal.hide': CustomEvent<{ modal: HikmaModal }>;
    'hikma.modal.hidden': CustomEvent<{ modal: HikmaModal }>;
    'hikma.tooltip.show': CustomEvent<{ tooltip: HikmaTooltip }>;
    'hikma.tooltip.shown': CustomEvent<{ tooltip: HikmaTooltip }>;
    'hikma.tooltip.hide': CustomEvent<{ tooltip: HikmaTooltip }>;
    'hikma.tooltip.hidden': CustomEvent<{ tooltip: HikmaTooltip }>;
    'hikma.dropdown.show': CustomEvent<{ dropdown: HikmaDropdown }>;
    'hikma.dropdown.shown': CustomEvent<{ dropdown: HikmaDropdown }>;
    'hikma.dropdown.hide': CustomEvent<{ dropdown: HikmaDropdown }>;
    'hikma.dropdown.hidden': CustomEvent<{ dropdown: HikmaDropdown }>;
    'hikma.carousel.slide': CustomEvent<{ carousel: HikmaCarousel; from: number; to: number }>;
    'hikma.carousel.slid': CustomEvent<{ carousel: HikmaCarousel; from: number; to: number }>;
    'hikma.toast.show': CustomEvent<{ toast: HikmaToast }>;
    'hikma.toast.shown': CustomEvent<{ toast: HikmaToast }>;
    'hikma.toast.hide': CustomEvent<{ toast: HikmaToast }>;
    'hikma.toast.hidden': CustomEvent<{ toast: HikmaToast }>;
    'hikma.alert.close': CustomEvent<{ alert: HikmaAlert }>;
    'hikma.alert.closed': CustomEvent<{ alert: HikmaAlert }>;
    'hikma.theme.changed': CustomEvent<{ theme: 'light' | 'dark' }>;
    'hikma.form.validate': CustomEvent<{ form: HTMLFormElement; valid: boolean }>;
    'hikma.form.field.validate': CustomEvent<{ field: HTMLInputElement; valid: boolean; message?: string }>;
  }

  // Main Hikma Class
  export class Hikma {
    static version: string;
    static theme: typeof HikmaTheme;
    static utils: typeof HikmaUtils;
    static validator: typeof HikmaValidator;
    
    static Modal: typeof HikmaModal;
    static Tooltip: typeof HikmaTooltip;
    static Dropdown: typeof HikmaDropdown;
    static Carousel: typeof HikmaCarousel;
    static Toast: typeof HikmaToast;
    static Alert: typeof HikmaAlert;
    static Collapse: typeof HikmaCollapse;
    static Tab: typeof HikmaTab;
    static Offcanvas: typeof HikmaOffcanvas;
    
    static init(): void;
    static dispose(): void;
    static getVersion(): string;
  }

  // Default export
  export default Hikma;
}

// Global declarations
declare global {
  interface Window {
    Hikma: typeof import('hikma-ui').Hikma;
  }
  
  interface HTMLElement {
    addEventListener<K extends keyof import('hikma-ui').HikmaEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: import('hikma-ui').HikmaEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof import('hikma-ui').HikmaEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: import('hikma-ui').HikmaEventMap[K]) => any,
      options?: boolean | EventListenerOptions
    ): void;
  }
}