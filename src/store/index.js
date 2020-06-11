import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import story from './modules/story'
import getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
		user,
        story
    },
    state: {
    },
    mutations: {
    },
    actions: {
    },
    getters
})

