<template>
<div class="container h-100 pt-5">
    <div class="container-fluid w-50 login-bloc">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <div v-if="token == null">
          <h3 class="h3 mb-3 font-weight-normal text-center">Connectez-vous</h3>
        <form @submit="postLogin">
            <div className="form-group">
                <label htmlFor="usersame">Nom d'utilisateur</label>
                <input
                    v-model="username"
                    type="text"
                    placeholder="Nom d'utilisateur"
                    name="username"
                    id="username"
                    className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                    v-model="password"
                    type="password"
                    placeholder="Mot de passe"
                    id="password"
                    name="password"
                    className="form-control"/>
            </div>
            <div className="form-group">
                <button
                className="btn btn-success">
                Connexion
                </button>
            </div>
        </form>
        </div>
        <div v-else>
          <p>Vous êtes déjà connecter, <a href="" @click="handleLogout">Se déconnecter</a></p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import authAPI from '../services/authAPI'

const token = window.localStorage.getItem('authToken')

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null,
      token: token
    }
  },
  methods: {
    postLogin (e) {
      e.preventDefault()
      axios.post('http://localhost:8000/api/login_check', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          if (response.status === 200) {
            this.$router.push({ path: '/' })
          }
          return response.data.token
        })
        .then(token => {
          window.localStorage.setItem('authToken', token)
          axios.defaults.headers.Authorization = 'Bearer ' + token
          console.log(token)
          return true
        })
        .catch(error => {
          console.log(error)
          if (error) {
            this.error = 'Nom d\'utilisateur ou mot de passe incorrect !'
          }
        })
    },

    handleLogout () {
      authAPI.logout()
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
