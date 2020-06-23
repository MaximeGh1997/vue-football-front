import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import teams from './modules/teams'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'

export default new Vuex.Store({
  modules: {
    teams
  }
})
