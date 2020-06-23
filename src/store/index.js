import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import teams from './modules/teams'
import comments from './modules/comments'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'

export default new Vuex.Store({
  modules: {
    teams,
    comments
  }
})
