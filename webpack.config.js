'use strict';

const webpack = require('webpack');

module.exports = (env = {}) => {

	const isProduction = env.production === true;

	return {
		context: __dirname,
		entry: './src/base.js',
		output: {
			path: __dirname + '/dist',
			filename: 'bundle.js',
			libraryTarget: 'var',
			library: 'dolphin'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/, 
					loader: "style-loader!css-loader"
				}
			]
		},
		plugins: isProduction ? [new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true
			}
		})] : [],
		watch: !isProduction,
		devtool: isProduction ? false : 'eval',
		stats: {
			colors: true,
			version: false,
			hash: false,
			timings: true,
			assets: isProduction,
			chunks: isProduction
		}
	}
}
