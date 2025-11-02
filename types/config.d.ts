/**
 * HikmaUI Configuration Types
 * Type definitions for hikma.config.js
 */

export interface HikmaConfig {
  /** Content paths for JIT compiler to scan */
  content: string[];

  /** Dark mode strategy */
  darkMode?: 'class' | 'media' | false;

  /** Theme configuration */
  theme?: ThemeConfig;

  /** Variant configuration */
  variants?: VariantConfig;

  /** Plugins to extend functionality */
  plugins?: Plugin[];

  /** Preset configurations to inherit from */
  presets?: Preset[];

  /** Core plugins configuration */
  corePlugins?: CorePluginsConfig;

  /** JIT or AOT compilation mode */
  mode?: 'jit' | 'aot';

  /** Important selector prefix */
  important?: boolean | string;

  /** Prefix for all utility classes */
  prefix?: string;

  /** Separator for variants (default: ':') */
  separator?: string;

  /** Classes to always include */
  safelist?: (string | RegExp)[];

  /** Classes to never include */
  blocklist?: (string | RegExp)[];
}

export interface ThemeConfig {
  /** Responsive breakpoints */
  screens?: Record<string, string>;

  /** Color palette */
  colors?: ColorConfig;

  /** Spacing scale */
  spacing?: Record<string | number, string>;

  /** Font families */
  fontFamily?: Record<string, string[]>;

  /** Font sizes with optional line-height */
  fontSize?: Record<string, string | [string, { lineHeight: string }]>;

  /** Font weights */
  fontWeight?: Record<string, string>;

  /** Border radius values */
  borderRadius?: Record<string, string>;

  /** Box shadow values */
  boxShadow?: Record<string, string>;

  /** Z-index scale */
  zIndex?: Record<string | number, string>;

  /** Opacity scale */
  opacity?: Record<string | number, string>;

  /** Transition properties */
  transitionProperty?: Record<string, string>;

  /** Transition durations */
  transitionDuration?: Record<string | number, string>;

  /** Transition timing functions */
  transitionTimingFunction?: Record<string, string>;

  /** Animation presets */
  animation?: Record<string, string>;

  /** Keyframe definitions */
  keyframes?: Record<string, KeyframeConfig>;

  /** Extend default theme */
  extend?: Partial<Omit<ThemeConfig, 'extend'>>;
}

export interface ColorConfig {
  transparent?: string;
  current?: string;
  primary?: ColorScale;
  secondary?: ColorScale;
  success?: ColorScale;
  danger?: ColorScale;
  warning?: ColorScale;
  info?: ColorScale;
  gray?: ColorScale;
  white?: string;
  black?: string;
  [key: string]: string | ColorScale | undefined;
}

export interface ColorScale {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  [key: number]: string | undefined;
}

export interface KeyframeConfig {
  [step: string]: Record<string, string>;
}

export interface VariantConfig {
  extend?: Record<string, string[]>;
}

export interface Plugin {
  (options?: any): void;
}

export interface Preset {
  theme?: Partial<ThemeConfig>;
  plugins?: Plugin[];
  variants?: VariantConfig;
}

export interface CorePluginsConfig {
  preflight?: boolean;
  container?: boolean;
  accessibility?: boolean;
  appearance?: boolean;
  backgroundAttachment?: boolean;
  backgroundClip?: boolean;
  backgroundColor?: boolean;
  backgroundImage?: boolean;
  backgroundOpacity?: boolean;
  backgroundPosition?: boolean;
  backgroundRepeat?: boolean;
  backgroundSize?: boolean;
  borderCollapse?: boolean;
  borderColor?: boolean;
  borderOpacity?: boolean;
  borderRadius?: boolean;
  borderStyle?: boolean;
  borderWidth?: boolean;
  boxShadow?: boolean;
  boxSizing?: boolean;
  cursor?: boolean;
  display?: boolean;
  divideColor?: boolean;
  divideOpacity?: boolean;
  divideStyle?: boolean;
  divideWidth?: boolean;
  fill?: boolean;
  flex?: boolean;
  flexDirection?: boolean;
  flexGrow?: boolean;
  flexShrink?: boolean;
  flexWrap?: boolean;
  float?: boolean;
  clear?: boolean;
  fontFamily?: boolean;
  fontSize?: boolean;
  fontSmoothing?: boolean;
  fontStyle?: boolean;
  fontVariantNumeric?: boolean;
  fontWeight?: boolean;
  gap?: boolean;
  gradientColorStops?: boolean;
  gridAutoColumns?: boolean;
  gridAutoFlow?: boolean;
  gridAutoRows?: boolean;
  gridColumn?: boolean;
  gridColumnEnd?: boolean;
  gridColumnStart?: boolean;
  gridRow?: boolean;
  gridRowEnd?: boolean;
  gridRowStart?: boolean;
  gridTemplateColumns?: boolean;
  gridTemplateRows?: boolean;
  height?: boolean;
  inset?: boolean;
  justifyContent?: boolean;
  justifyItems?: boolean;
  justifySelf?: boolean;
  letterSpacing?: boolean;
  lineHeight?: boolean;
  listStylePosition?: boolean;
  listStyleType?: boolean;
  margin?: boolean;
  maxHeight?: boolean;
  maxWidth?: boolean;
  minHeight?: boolean;
  minWidth?: boolean;
  objectFit?: boolean;
  objectPosition?: boolean;
  opacity?: boolean;
  order?: boolean;
  outline?: boolean;
  overflow?: boolean;
  overscrollBehavior?: boolean;
  padding?: boolean;
  placeContent?: boolean;
  placeItems?: boolean;
  placeSelf?: boolean;
  pointerEvents?: boolean;
  position?: boolean;
  resize?: boolean;
  ringColor?: boolean;
  ringOffsetColor?: boolean;
  ringOffsetWidth?: boolean;
  ringOpacity?: boolean;
  ringWidth?: boolean;
  rotate?: boolean;
  scale?: boolean;
  skew?: boolean;
  space?: boolean;
  stroke?: boolean;
  strokeWidth?: boolean;
  tableLayout?: boolean;
  textAlign?: boolean;
  textColor?: boolean;
  textDecoration?: boolean;
  textOpacity?: boolean;
  textOverflow?: boolean;
  textTransform?: boolean;
  transform?: boolean;
  transformOrigin?: boolean;
  transitionDelay?: boolean;
  transitionDuration?: boolean;
  transitionProperty?: boolean;
  transitionTimingFunction?: boolean;
  translate?: boolean;
  userSelect?: boolean;
  verticalAlign?: boolean;
  visibility?: boolean;
  whitespace?: boolean;
  width?: boolean;
  wordBreak?: boolean;
  zIndex?: boolean;
}
