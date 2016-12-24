import store from './client/store.js'
import urlToRequest from './url.js'
// import Factory from './server-startup/factory.js'

let count = 0;
function getId() {
	count += 1;
	return count + "";
}

function has(obj, propName) {
	return Object.prototype.hasOwnProperty.call(obj, propName)
}

const Story = (typename) => {
		const api = {}
		let list = [];
		api.add = options => {
			if(has(options,"name")&&has(options,"link")) {
				options.id = getId();
				options.link = urlToRequest(options.link);
				list.push(options);
			}
			return api;
		}

		let data = {
			name: typename,
			active: false,
			children: list
		}
		store.commit('SET_MENU',data)
		return api;
}


// Story.Factory = Factory

export default Story;
