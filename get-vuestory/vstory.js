import path from 'path'
import program from 'commander'

import packageJson from './package.json'
import App from '../vue-story/server/factory.js'

program
  .version(packageJson.version)
  .option('-p, --port <n>', 'port', parseInt)
  .option('-m, --main <n>', 'main')
  .option('-l, --lib <n>','lib')

program
  .command('run')
  .description('You are gone,but never far.')
  .action(function (env, options) {

    let config = App.config;

    let mainFile = program.main || "story.js";
    let workspace = path.join(process.cwd(), mainFile);
    
    config.entry.app.unshift(
      `${workspace}`
    );
       
    let module = path.join(process.cwd(), "node_modules");     
    config.resolve.modules.push(
      `${module}`
    )    
    
    config.resolve.alias.storybook = process.cwd();

    const fnConfig = new Map();
    if(program.port) {
      fnConfig.set('host','localhost')
      fnConfig.set('port', program.port)
      fnConfig.set('host_port',
        `http://${fnConfig.get('host')}:${fnConfig.get('port')}`
      );
    } 
    
    if(program.lib) {
      let libFile = program.lib;
      let libSpace = path.join(process.cwd(), libFile);  
      config.entry.preview.unshift(
        `${libSpace}`
      );       
    }
    if(fnConfig.size>0) {
      App.startup(fnConfig);    
    }
    else {
      App.startup();
    }

  });

program.parse(process.argv);

