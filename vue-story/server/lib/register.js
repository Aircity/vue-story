"use strict";

require('babel-register')({
	"presets": [["es2015"]]
});

var App = require('../factory.js').default;

App.startup();