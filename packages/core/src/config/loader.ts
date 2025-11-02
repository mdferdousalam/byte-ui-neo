/**
 * Configuration Loader
 * Loads and validates hikma.config.js
 */

import { resolve } from 'path';
import type { HikmaConfig } from '../types/config';

export class ConfigLoader {
  private configPath: string;

  constructor(configPath?: string) {
    this.configPath = configPath || resolve(process.cwd(), 'hikma.config.js');
  }

  /**
   * Load configuration file
   */
  async load(): Promise<HikmaConfig> {
    try {
      // Dynamic import for ESM support
      const config = await import(this.configPath);
      return this.validate(config.default || config);
    } catch (error) {
      console.warn('[HikmaUI] Config file not found, using defaults');
      return this.getDefaultConfig();
    }
  }

  /**
   * Validate configuration
   */
  private validate(config: Partial<HikmaConfig>): HikmaConfig {
    // Merge with defaults
    return {
      ...this.getDefaultConfig(),
      ...config,
      theme: {
        ...this.getDefaultConfig().theme,
        ...config.theme,
      },
    };
  }

  /**
   * Get default configuration
   */
  private getDefaultConfig(): HikmaConfig {
    return {
      content: [],
      darkMode: 'class',
      theme: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
        colors: {},
        spacing: {},
        fontFamily: {},
        fontSize: {},
        fontWeight: {},
        borderRadius: {},
        boxShadow: {},
        extend: {},
      },
      variants: {},
      plugins: [],
      presets: [],
      corePlugins: {},
      mode: 'jit',
      important: false,
      prefix: '',
      separator: ':',
      safelist: [],
      blocklist: [],
    };
  }
}
