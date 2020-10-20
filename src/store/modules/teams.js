import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import httpClient from '@/services/httpClient'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://symfoot.maxime-gh.com/api/'

const state = () => ({
  teams: []
})

const mutations = {
  SAVE_TEAMS (state, teams) {
    state.teams = teams
  }
}

const actions = {
  findTeams ({ commit }) {
    httpClient.get('http://symfoot.maxime-gh.com/api/teams')
      .then(response => { commit('SAVE_TEAMS', response['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  findTeam (context, payload) {
    return httpClient.get('http://symfoot.maxime-gh.com/api/teams/' + payload.id)
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
