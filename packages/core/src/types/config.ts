export interface HikmaConfig {
  content: string[];
  darkMode?: 'class' | 'media' | false;
  theme?: ThemeConfig;
  variants?: Record<string, any>;
  plugins?: any[];
  presets?: any[];
  corePlugins?: Record<string, boolean>;
  mode?: 'jit' | 'aot';
  important?: boolean | string;
  prefix?: string;
  separator?: string;
  safelist?: (string | RegExp)[];
  blocklist?: (string | RegExp)[];
}

export interface ThemeConfig {
  screens?: Record<string, string>;
  colors?: Record<string, any>;
  spacing?: Record<string | number, string>;
  fontFamily?: Record<string, string[]>;
  fontSize?: Record<string, string | [string, { lineHeight: string }]>;
  fontWeight?: Record<string, string>;
  borderRadius?: Record<string, string>;
  boxShadow?: Record<string, string>;
  zIndex?: Record<string | number, string>;
  opacity?: Record<string | number, string>;
  extend?: Partial<ThemeConfig>;
}
