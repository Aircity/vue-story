import webpack from 'webpack'
import webpackConfig from './webpack.js'
import config from './config.js';

import webpackServer from 'webpack-dev-server'
import open from './lib/open'

import ProgressPlugin from 'webpack/lib/ProgressPlugin'

/* 
import fs from 'fs'
fs.writeFile("output.json",JSON.stringify(webpackConfig))
*/

const App = {};

App.config = webpackConfig;

App.startup = (getConfig) => {

	let webpackConfig = App.config;
			
	if(getConfig) {
		for(let [key, value] of getConfig) {
			config.set(key,value)
		}		
	}
  
  webpackConfig.performance = { hints: false };

	webpackConfig.entry.app.unshift(
		'webpack-dev-server/client?' + config.get("host_port"),
		'webpack/hot/dev-server'
	)
	
	webpackConfig.entry.preview.unshift(
		'webpack-dev-server/client/?' + config.get("host_port"),
		'webpack/hot/only-dev-server'
	)
	

	webpackConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	)	
	
	let compiler = webpack(webpackConfig);  
  compiler.apply(new ProgressPlugin())
  
	const Server = new webpackServer(compiler, {
		inline: true,
		hot: true,
		historyApiFallback: true,
		stats: {
			colors: true,
			chunks: false,
   		children: false		
		},
		proxy: {
			"*": config.get("host_port")
		}
	})

	let isStart = false;
    
	compiler.plugin("done", function (stats) {		
		if (stats.hasErrors()) {
			console.log("compiler errors")
			return;
		}
		if (isStart) {
			return;
		}
		Server.listen(config.get('port'), config.get('host'), function () {
			console.log('Server running at:', config.get("host_port"));
			isStart = true
		})
	});
} 

export default App;