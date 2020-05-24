const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
		],
	},
	plugins: [
		new WorkboxPlugin.InjectManifest({
			swSrc: './src/sw.js',
		}),
		new BrotliPlugin({
			asset: '[file].br',
			test: /\.(js)$/,
		}),
		new CopyPlugin({
			patterns: [{ from: 'src/robots.txt', to: 'robots.txt' }],
		}),
	],
};
