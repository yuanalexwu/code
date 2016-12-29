/**
 * Created by jack on 2016/12/1.
 */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: {
		bundle: ['./src/main']
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
		publicPath: '/cat/dist/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': "'dev'"
			}
		}),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: './index.dev.html',
			hash: true
		})
	],
	module: {
		loaders: [
			// js
			{
				test: /\.js$/,
				loaders: [ 'babel' ],
				include: path.join(__dirname, 'src')
			},
			// CSS
			{
				test: /\.sass$/,
				loader: 'style!css!postcss!sass',
				include: path.join(__dirname, 'src/css')
			},
			//文件
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
				loader: 'file-loader?name=[name]-[hash].[ext]'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	postcss: [ autoprefixer({ browsers: [ '>0%' ] }) ]
};

