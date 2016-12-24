const config = new Map();

config.set('host','localhost')
config.set('port', 3000)

config.set('host_port',
  `http://${config.get('host')}:${config.get('port')}`
);

config.set('vendor_dependencies', [
  'vue',
	'vuex'
]);
			
export default config