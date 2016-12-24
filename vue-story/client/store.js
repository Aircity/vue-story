import Vue from 'vue';
import Vuex from 'vuex';
import path from 'path';

Vue.use(Vuex);

let state = {
	// 当前列表
	activeState: 0,
	// 过滤关键字
	filterKey: '',
	// 导航栏
	menu: []
};

const store = new Vuex.Store({
	state: state,
	mutations: {
		// 选择列表
		SELECT_ACTIVE(state, id) {
			state.activeState = id;
		},
		// 搜索
		Filter_Key(state, value) {
			state.filterKey = value;
		},
		// 设置导航栏
		SET_MENU(state, data) {
			state.menu.push(data);
			state.activeState = 0;
		}
	},
	actions: {
		// 选择列表		
		selectActive(context, value) {
			context.commit('SELECT_ACTIVE', value)
		},
		// 搜索		
		search(context, content) {
			context.commit('Filter_Key', content)
		}
	}
});

export default store;