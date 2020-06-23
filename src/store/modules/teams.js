import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'

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
    Vue.axios.get('teams')
      .then(response => { commit('SAVE_TEAMS', response.data['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  findTeam (context, payload) {
    return Vue.axios.get('teams/' + payload.id)
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
