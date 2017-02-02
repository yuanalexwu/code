var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');


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
		new Visualizer(),
		// 不打包moment本地化文件
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		// 分割第三方包
		new webpack.optimize.CommonsChunkPlugin({
			names: [ "vandor3", "vandor2", "vandor1" ],
			minChunks: Infinity
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': "'production'"
			}
		}),
		new webpack.optimize.DedupePlugin(),
		// 压缩js
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: true
			}
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		// 压缩生成html，引入入口文件，添加hash
		new HtmlWebpackPlugin({
			filename: '../index.php',
			template: './index.prod.tpl.php',
			hash: true,
			minify:{
				collapseWhitespace: true
			}
		})
	],
	module: {
		loaders: [
			// js
			{
				test: /\.js$/,
				loaders: [ 'babel' ],
				include: path.join(__dirname, 'client')
			},
			// CSS
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
			},
			{
				test: /\.styl$/,
				include: path.join(__dirname, 'client'),
				loader: 'style-loader!css-loader!stylus-loader'
			}
		]
	}
};
