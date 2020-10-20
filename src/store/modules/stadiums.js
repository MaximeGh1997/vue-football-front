import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import httpClient from '@/services/httpClient'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://symfoot.maxime-gh.com/api/'

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
    httpClient.get('http://symfoot.maxime-gh.com/api/stades')
      .then(response => { commit('SAVE_STADIUMS', response['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  findStadium (context, payload) {
    return httpClient.get('http://symfoot.maxime-gh.com/api/stades/' + payload.id)
      .then(response => response)
      .catch(error => console.log(error.response))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
