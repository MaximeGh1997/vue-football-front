import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwtDecode from 'jwt-decode'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://localhost:8000/api/'

const state = () => ({
  token: window.localStorage.getItem('authToken') || null
})

const getters = {
  loggedIn: (state) => {
    return state.token !== null
  },
  decodeToken: (state) => {
    if (state.token !== null) {
      const jwtData = jwtDecode(state.token)
      return {
        decodeToken: jwtData
      }
    } else {
      return {
        decodeToken: false
      }
    }
  }
}

const mutations = {
  RETRIEVE_TOKEN (state, token) {
    state.token = token
  },
  DESTROY_TOKEN (state) {
    state.token = null
  }
}

const actions = {
  retrieveToken (context, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios.post('login_check', {
        username: payload.username,
        password: payload.password
      })
        .then(response => {
          const token = response.data.token
          window.localStorage.setItem('authToken', token)
          axios.defaults.headers.Authorization = 'Bearer ' + token
          context.commit('RETRIEVE_TOKEN', token)
          resolve(response)
        })
        .catch(error => {
          Vue.$toast.open({
            message: 'Nom d\'utilisateur ou mot de passe incorrect !',
            type: 'error'
          })
          reject(error)
        })
    })
  },

  destroyToken (context) {
    window.localStorage.removeItem('authToken')
    delete axios.defaults.headers.Authorization
    context.commit('DESTROY_TOKEN')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
