'use strict';

exports.__esModule = true;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require('./webpack.js');

var _webpack4 = _interopRequireDefault(_webpack3);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _open = require('./lib/open');

var _open2 = _interopRequireDefault(_open);

var _ProgressPlugin = require('webpack/lib/ProgressPlugin');

var _ProgressPlugin2 = _interopRequireDefault(_ProgressPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
import fs from 'fs'
fs.writeFile("output.json",JSON.stringify(webpackConfig))
*/

var App = {};

App.config = _webpack4.default;

App.startup = function (getConfig) {

	var webpackConfig = App.config;

	if (getConfig) {
		for (var _iterator = getConfig, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref;

			if (_isArray) {
				if (_i >= _iterator.length) break;
				_ref = _iterator[_i++];
			} else {
				_i = _iterator.next();
				if (_i.done) break;
				_ref = _i.value;
			}

			var _ref2 = _ref,
			    key = _ref2[0],
			    value = _ref2[1];

			_config2.default.set(key, value);
		}
	}

	webpackConfig.performance = { hints: false };

	webpackConfig.entry.app.unshift('webpack-dev-server/client?' + _config2.default.get("host_port"), 'webpack/hot/dev-server');

	webpackConfig.entry.preview.unshift('webpack-dev-server/client/?' + _config2.default.get("host_port"), 'webpack/hot/only-dev-server');

	webpackConfig.plugins.push(new _webpack2.default.HotModuleReplacementPlugin());

	var compiler = (0, _webpack2.default)(webpackConfig);
	compiler.apply(new _ProgressPlugin2.default());

	var Server = new _webpackDevServer2.default(compiler, {
		inline: true,
		hot: true,
		historyApiFallback: true,
		stats: {
			colors: true,
			chunks: false,
			children: false
		},
		proxy: {
			"*": _config2.default.get("host_port")
		}
	});

	var isStart = false;

	compiler.plugin("done", function (stats) {
		if (stats.hasErrors()) {
			console.log("compiler errors");
			return;
		}
		if (isStart) {
			return;
		}
		Server.listen(_config2.default.get('port'), _config2.default.get('host'), function () {
			console.log('Server running at:', _config2.default.get("host_port"));
			isStart = true;
		});
	});
};

exports.default = App;