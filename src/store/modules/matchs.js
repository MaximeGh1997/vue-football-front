import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'

const state = () => ({
  GroupMatchs: [],
  StageMatchs: [],
  Match: []
})

const mutations = {
  SAVE_GROUP_MATCHS (state, matchs) {
    state.GroupMatchs = matchs
  },
  SAVE_STAGE_MATCHS (state, matchs) {
    state.StageMatchs = matchs
  },
  SAVE_MATCH (state, match) {
    state.Match = match
  }
}

const actions = {
  findByGroup ({ commit }, payload) {
    Vue.axios.get('groupes/' + payload.id + '/matchs')
      .then(response => { commit('SAVE_GROUP_MATCHS', response.data['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  findByStage ({ commit }, payload) {
    Vue.axios.get('stages/' + payload.id + '/matchs')
      .then(response => { commit('SAVE_STAGE_MATCHS', response.data['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  find ({ commit }, payload) {
    Vue.axios.get('matchs/' + payload.id)
      .then(response => { commit('SAVE_MATCH', response.data) })
      .catch(error => console.log(error.response))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
