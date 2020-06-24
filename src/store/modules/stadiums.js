import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'

const state = () => ({
  stadiums: []
})

const mutations = {
  SAVE_STADIUMS (state, stadiums) {
    state.stadiums = stadiums
  }
}

const actions = {
  findStadiums ({ commit }) {
    Vue.axios.get('stades')
      .then(response => { commit('SAVE_STADIUMS', response.data['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  findStadium (context, payload) {
    return Vue.axios.get('stades/' + payload.id)
      .then(response => response.data)
      .catch(error => console.log(error.response))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
