var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
	entry: {
		vander1: [ 'whatwg-fetch' ],
		vander2: [ 'react', 'redux', 'redux-thunk', 'react-router', 'react-router-redux' ],
		vander3: [ 'moment' ],
		bundle: './client/reduxstagram'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: 'dist/',
		chunkFilename: '[name].chunk.js?v=[chunkhash:18]'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': "'dev'"
			}
		}),
		// 不打包moment本地化文件
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.optimize.CommonsChunkPlugin({
			names: [ "vandor3", "vandor2", "vandor1" ],
			minChunks: Infinity
		}),
		new HtmlWebpackPlugin({
			filename: '../index.php',
			template: './index.dev.tpl.php',
			hash: true,
			minify:{
				collapseWhitespace: true
			}
		}),
		new ImageminPlugin()
	],
	module: {
		loaders: [
			// js
			{
				test: /\.js$/,
				loaders: [ 'babel' ],
				include: path.join(__dirname, 'client')
			}
		]
	}
};
