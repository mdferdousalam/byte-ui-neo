import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import hikmaui from '@hikmaui/vite';

export default defineConfig({
  plugins: [
    react(),
    hikmaui({
      config: './hikma.config.js',
      mode: 'development',
      watch: true
    })
  ],
  server: {
    port: 3000,
    open: true
  }
});
