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
  NextsMatchs: [],
  LastsResults: [],
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
  SAVE_NEXTS_MATCHS (state, matchs) {
    state.NextsMatchs = matchs.slice(0, 3)
  },
  SAVE_LASTS_RESULTS (state, matchs) {
    state.LastsResults = matchs.slice(0, 3)
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

  findNextsMatchs ({ commit }) {
    let currentDate = new Date()
    currentDate = currentDate.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    currentDate = currentDate.replace(/\//g, '-')
    console.log(currentDate)

    Vue.axios.get('matchs?date.date[after]=' + currentDate + '&order[date.date]=asc&exists[isPlayed]=false')
      .then(response => { commit('SAVE_NEXTS_MATCHS', response.data['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  findLastsResults ({ commit }) {
    let currentDate = new Date()
    currentDate = currentDate.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    currentDate = currentDate.replace(/\//g, '-')

    Vue.axios.get('matchs?date.date[before]=' + currentDate + '&order[date.date]=desc&isPlayed=true')
      .then(response => { commit('SAVE_LASTS_RESULTS', response.data['hydra:member']) })
      .catch(error => console.log(error.response))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
