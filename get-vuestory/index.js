'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

var _factory = require('../vue-story/server/factory.js');

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default.version).option('-p, --port <n>', 'port', parseInt).option('-m, --main <n>', 'main').option('-l, --lib <n>', 'lib');

_commander2.default.command('run').description('You are gone,but never far.').action(function (env, options) {

  var config = _factory2.default.config;

  var mainFile = _commander2.default.main || "story.js";
  var workspace = _path2.default.join(process.cwd(), mainFile);

  config.entry.app.unshift('' + workspace);

  var module = _path2.default.join(process.cwd(), "node_modules");
  config.resolve.modules.push('' + module);

  config.resolve.alias.storybook = process.cwd();

  var fnConfig = new Map();
  if (_commander2.default.port) {
    fnConfig.set('host', 'localhost');
    fnConfig.set('port', _commander2.default.port);
    fnConfig.set('host_port', 'http://' + fnConfig.get('host') + ':' + fnConfig.get('port'));
  }

  if (_commander2.default.lib) {
    var libFile = _commander2.default.lib;
    var libSpace = _path2.default.join(process.cwd(), libFile);
    config.entry.preview.unshift('' + libSpace);
  }
  if (fnConfig.size > 0) {
    _factory2.default.startup(fnConfig);
  } else {
    _factory2.default.startup();
  }
});

_commander2.default.parse(process.argv);
