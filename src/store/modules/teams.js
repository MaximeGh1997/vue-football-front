import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import httpClient from '@/services/httpClient'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const state = () => ({
  teams: [],
  team: null
})

const mutations = {
  SAVE_TEAMS (state, teams) {
    state.teams = teams
  },
  SAVE_TEAM (state, team) {
    state.team = team
  }
}

const actions = {
  findTeams ({ commit }) {
    httpClient.get('http://127.0.0.1:8000/api/teams')
      .then(response => { commit('SAVE_TEAMS', response['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  findTeam ({ commit }, payload) {
    return httpClient.get('http://127.0.0.1:8000/api/teams/' + payload.id)
      .then(response => { commit('SAVE_TEAM', response) })
      .catch(error => console.log(error.response))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
