import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'

const state = () => ({
  MatchComments: [],
  UserComments: []
})

const mutations = {
  SAVE_MATCH_COMMENTS (state, comments) {
    state.MatchComments = comments
  },
  ADD_MATCH_COMMENTS (state, id) {
    console.log(id)
    Vue.axios.get('matchs/' + id + '/comments')
      .then(response => { state.MatchComments = response.data['hydra:member'] })
  },
  SAVE_USER_COMMENTS (state, comments) {
    state.UserComments = comments
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
    Vue.axios.post('comments', {
      content: payload.content,
      rating: payload.rating,
      author: '/api/users/' + payload.authorId,
      matchNbr: '/api/matchs/' + payload.matchId
    })
      .then(response => { commit('ADD_MATCH_COMMENTS', payload.matchId) })
      .catch(error => console.log(error.response))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
