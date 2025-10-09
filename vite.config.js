import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: {
				'byte-ui': resolve(__dirname, 'src/main.scss'),
				'byte-ui-js': resolve(__dirname, 'src/js/byte-ui.js'),
			},
			formats: ['es', 'umd'],
			fileName: (format, entryName) =>
				`${entryName}.${format === 'es' ? 'esm' : format}.js`,
		},
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name.endsWith('.css')) {
						return 'byte-ui.min.css';
					}
					return assetInfo.name;
				},
			},
		},
		cssCodeSplit: false,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "src/core/variables" as *;`,
			},
		},
	},
	server: {
		port: 9000,
		open: true,
	},
});
