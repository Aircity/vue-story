import Vue from 'vue'
import App from '!!vue-loader!./App'
import store from 'store.js'

new Vue({		
  el: '#app',
	store,
  render: h => h(App)
})
