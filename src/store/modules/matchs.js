import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import httpClient from '@/services/httpClient'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'

const state = () => ({
  GroupMatchs: [],
  StageMatchs: [],
  Match: [],
  AllMatchs: [],
  LoadingMatchs: false
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
  },
  SAVE_ALLMATCHS (state, matchs) {
    state.AllMatchs = matchs
  },
  SHOW (state) {
    state.LoadingMatchs = true
    console.log(state.LoadingMatchs)
  },
  HIDE (state) {
    state.LoadingMatchs = false
    console.log(state.LoadingMatchs)
  }
}

const actions = {
  findByGroup ({ commit }, payload) {
    commit('SHOW')
    Vue.axios.get('groupes/' + payload.id + '/matchs')
      .then(response => {
        commit('SAVE_GROUP_MATCHS', response.data['hydra:member'])
        commit('HIDE')
      })
      .catch(error => console.log(error.response))
  },

  findByStage ({ commit }, payload) {
    commit('SHOW')
    Vue.axios.get('stages/' + payload.id + '/matchs')
      .then(response => {
        commit('SAVE_STAGE_MATCHS', response.data['hydra:member'])
        commit('HIDE')
      })
      .catch(error => console.log(error.response))
  },

  find ({ commit }, payload) {
    httpClient.get('http://localhost:8000/api/matchs/' + payload.id)
      .then(response => { commit('SAVE_MATCH', response) })
      .catch(error => console.log(error.response))
  },

  findAll ({ commit }, payload) {
    Vue.axios.get('matchs', {
      params: {

      }
    })
      .then(response => { commit('SAVE_ALLMATCHS', response.data['hydra:member']) })
      .catch(error => console.log(error.response))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
