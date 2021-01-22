import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const state = () => ({
  MatchComments: [],
  UserComments: [],
  PostLoader: false
})

const mutations = {
  SAVE_MATCH_COMMENTS (state, comments) {
    state.MatchComments = comments
  },
  ADD_MATCH_COMMENTS (state, id) {
    Vue.axios.get('matchs/' + id + '/comments')
      .then(response => {
        state.MatchComments = response.data['hydra:member']
      })
  },
  SAVE_USER_COMMENTS (state, comments) {
    state.UserComments = comments
  },
  SHOW (state) {
    state.PostLoader = true
  },
  HIDE (state) {
    state.PostLoader = false
  }
}

const actions = {
  findByMatch ({ commit }, payload) {
    Vue.axios.get('matchs/' + payload.id + '/comments')
      .then(response => { commit('SAVE_MATCH_COMMENTS', response.data['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  findByUser ({ commit }, payload) {
    Vue.axios.get('users/' + payload.id + '/comments')
      .then(response => { commit('SAVE_USER_COMMENTS', response.data['hydra:member']) })
      .catch(error => console.log(error.response))
  },

  postComment ({ commit }, payload) {
    commit('SHOW')
    Vue.axios.post('comments', {
      content: payload.content,
      rating: payload.rating,
      author: '/api/users/' + payload.authorId,
      matchNbr: '/api/matchs/' + payload.matchId
    })
      .then(response => {
        commit('ADD_MATCH_COMMENTS', payload.matchId)
        commit('HIDE')
      })
      .catch(error => {
        commit('HIDE')
        Vue.$toast.open({
          message: error.response.data.violations[0].message,
          type: 'error'
        })
      })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
