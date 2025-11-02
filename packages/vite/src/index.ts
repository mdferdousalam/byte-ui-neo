/**
 * Vite Plugin for HikmaUI
 */

import type { Plugin } from 'vite';
import hikmaui from '@hikmaui/postcss';

export interface HikmaUIViteOptions {
  config?: string;
}

function hikmaUIVite(options: HikmaUIViteOptions = {}): Plugin {
  return {
    name: 'vite-plugin-hikmaui',

    config(config) {
      // Add PostCSS plugin
      return {
        css: {
          postcss: {
            plugins: [
              hikmaui({
                config: options.config,
                mode: config.mode === 'production' ? 'production' : 'development',
                watch: config.mode !== 'production',
              }),
            ],
          },
        },
      };
    },

    configResolved(resolvedConfig) {
      // Log HikmaUI initialization
      console.log('[HikmaUI] Vite plugin loaded');
    },
  };
}

// Named and default exports
export { hikmaUIVite };
export default hikmaUIVite;
