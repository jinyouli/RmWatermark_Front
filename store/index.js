import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // vue的插件机制

// Vuex.Store 构造器选项
const store = new Vuex.Store({
	// 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
	state: {
		// 用户信息
		$config: {
			bannerid: "",
			chapinid: "",
			jiliid: "",
			videoid: "",
			ispc: "",
			openad: "",
			notice: ""
		}
	},
	mutations: {
		upConfig(state, n) {
			state.$config.bannerid = n.bannerid
			state.$config.chapinid = n.chapinid
			state.$config.jiliid = n.jiliid
			state.$config.videoid = n.videoid
			state.$config.ispc = n.ispc
			state.$config.openad = n.openad
			state.$config.notice = n.notice
		}
	}
})

export default store