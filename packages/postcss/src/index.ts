/**
 * PostCSS Plugin for HikmaUI
 */

import type { Plugin } from 'postcss';
import { JITCompiler } from '@hikmaui/core';
import { ConfigLoader } from '@hikmaui/core';

export interface HikmaUIPluginOptions {
  config?: string;
  mode?: 'development' | 'production';
  watch?: boolean;
}

const hikmaui = (options: HikmaUIPluginOptions = {}): Plugin => {
  return {
    postcssPlugin: 'hikmaui',

    async Once(root, { result }) {
      // Load configuration
      const configLoader = new ConfigLoader(options.config);
      const config = await configLoader.load();

      // Initialize JIT compiler
      const compiler = new JITCompiler({
        config,
        mode: options.mode || (process.env.NODE_ENV === 'production' ? 'production' : 'development'),
        watch: options.watch !== false && options.mode === 'development',
      });

      // Scan content and compile
      const css = await compiler.compile();

      // Replace @hikmaui directive with compiled CSS
      root.walkAtRules('hikmaui', (atRule) => {
        atRule.replaceWith(css);
      });

      // Also handle @tailwind for migration compatibility
      root.walkAtRules('tailwind', (atRule) => {
        if (atRule.params === 'utilities' || atRule.params === 'components') {
          atRule.replaceWith(css);
        }
      });

      // Log stats in development
      if (options.mode === 'development') {
        const stats = compiler.getStats();
        console.log('[HikmaUI] Compiled:', stats);
      }
    },
  };
};

hikmaui.postcss = true;

export default hikmaui;
