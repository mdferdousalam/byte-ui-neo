const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');

const PATHS = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist'),
	root: __dirname,
};

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';

	return {
		mode: isProduction ? 'production' : 'development',
		entry: {
			'hikma-ui': './src/main.scss',
			'hikma-ui-js': './src/js/contrast-checker.js',
		},
		output: {
			filename: isProduction ? '[name].min.js' : '[name].js',
			path: PATHS.dist,
			clean: true,
			publicPath: '/dist/',
			library: {
				type: 'window',
				name: 'HikmaUI',
			},
			iife: true,
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [require('autoprefixer')],
								},
							},
						},
						'sass-loader',
					],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: isProduction ? '[name].min.css' : '[name].css',
			}),
			...(isProduction
				? [
						new PurgeCSSPlugin({
							paths: glob.sync(
								[
									path.join(PATHS.root, 'index.html'),
									`${PATHS.src}/**/*.html`,
									`${PATHS.src}/**/*.js`,
									`${PATHS.src}/**/*.jsx`,
									`${PATHS.src}/**/*.ts`,
									`${PATHS.src}/**/*.tsx`,
									`${PATHS.src}/**/*.vue`,
								],
								{ nodir: true },
							),
							defaultExtractor: (content) =>
								content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
							// যদি Tailwind ব্যবহার করেন, তাহলে defaultExtractor: content => content.match(/[\w-:/]+(?<!:)/g) || [],
							safelist: {
								standard: ['js-auto-contrast', 'section', 'btn'], // ক্লাসগুলি Whitelist করুন
								deep: [/^section-/, /^btn--/], // প্যাটার্ন ম্যাচিং
								greedy: [],
								keyframes: false,
								variables: false,
							},
						}),
				  ]
				: []),
		],
		optimization: {
			minimizer: [new CssMinimizerPlugin()],
		},
		devtool: isProduction ? 'source-map' : 'eval-source-map',

		devServer: {
			static: {
				directory: PATHS.root,
				publicPath: '/',
			},
			compress: true,
			port: 9000,
			open: true,
			hot: true,
		},
	};
};
