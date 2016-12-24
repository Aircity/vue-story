'use strict';

exports.__esModule = true;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseConfig = {
	context: _path2.default.resolve(__dirname, '../client'),
	entry: {
		vendor: _config2.default.get('vendor_dependencies'),
		app: ['manager/main.js'],
		preview: ['preview/main.js']
	},
	output: {
		path: '/',
		chunkFilename: "[name].chunk.js",
		filename: '[name].bundle.js'
	},
	resolve: {
		modules: [_path2.default.resolve(__dirname, '../node_modules'), _path2.default.resolve(__dirname, '../client')],
		descriptionFiles: ['package.json'],
		mainFiles: ['index', 'main'],
		extensions: ['.js', '.vulture'],
		alias: {
			// runtime-only
			'vue': 'vue/dist/vue',
			'template-loader': _path2.default.resolve(__dirname, '../package/template-loader')
		}
	},
	module: {
		rules: [{
			test: /\.vue/,
			use: ["vue-lancer-loader"],
			exclude: /node_modules/
		}, {
			test: /\.vulture$/,
			use: ["vue-loader"],
			exclude: /node_modules/
		}, {
			test: /\.html$/,
			use: ["raw-loader"],
			exclude: /node_modules/
		}, {
			test: /\.js$/,
			use: [{
				loader: "babel-loader"
			}],
			exclude: [/node_modules/]
		}, {
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		}, {
			test: /\.less$/,
			use: ["style-loader", "css-loader", "less-loader"]
		}, {
			test: /\.json$/,
			use: ["json-loader"]
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			use: ["url-loader"],
			query: {
				limit: 9600
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: ["url-loader"],
			query: {
				limit: 9600
			}
		}]
	},
	plugins: [new _webpack2.default.NamedModulesPlugin(), new _webpack2.default.ProvidePlugin({
		"Vue": "vue"
	}), new _htmlWebpackPlugin2.default({
		template: '../server/lib/index.html',
		chunks: ['app'],
		filename: 'index.html',
		inject: true,
		favicon: '../server/lib/logo.png'
	}), new _htmlWebpackPlugin2.default({
		template: '../server/lib/index.html',
		chunks: ['preview'],
		filename: 'preview.html',
		inject: true,
		favicon: '../server/lib/logo.png'
	})]
};

exports.default = baseConfig;