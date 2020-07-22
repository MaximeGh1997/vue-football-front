import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'

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
    Vue.axios.get('users/' + payload.id)
      .then(response => { commit('SAVE_USER', response.data) })
      .catch(error => console.log(error.response))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
