import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import httpClient from '@/services/httpClient'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://symfoot.maxime-gh.com/api/'

const state = () => ({
  user: null
})

const mutations = {
  SAVE_USER (state, user) {
    state.user = user
  }
}

const actions = {
  findUser ({ commit }, payload) {
    httpClient.get('http://symfoot.maxime-gh.com/api/users/' + payload.id)
      .then(response => { commit('SAVE_USER', response) })
      .catch(error => console.log(error.response))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
