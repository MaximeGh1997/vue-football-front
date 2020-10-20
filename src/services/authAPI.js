import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwtDecode from 'jwt-decode'

Vue.use(VueAxios, axios)

function logout () {
  window.localStorage.removeItem('authToken')
  delete axios.defaults.headers.Authorization
}

function authenticate (payload) {
  return Vue.axios.post('http://symfoot.maxime-gh.com/api/login_check', {
    username: payload.username,
    password: payload.password
  })
    .then(response => response.data.token)
    .then(token => {
      window.localStorage.setItem('authToken', token)
      axios.defaults.headers.Authorization = 'Bearer ' + token
      console.log(token)
      return true
    })
    .catch(error => console.log(error))
}

function setup () {
  const token = window.localStorage.getItem('authToken')
  if (token) {
    const jwtData = jwtDecode(token)
    if ((jwtData.exp * 1000) > new Date().getTime()) {
      axios.defaults.headers.Authorization = 'Bearer ' + token
    }
  }
}

function isAuthenticated () {
  const token = window.localStorage.getItem('authToken')
  if (token) {
    const jwtData = jwtDecode(token)
    if ((jwtData.exp * 1000) > new Date().getTime()) {
      return true
    }
    return false // token expiré
  }
  return false // pas de token
}

export default {
  authenticate,
  setup,
  isAuthenticated,
  logout
}
