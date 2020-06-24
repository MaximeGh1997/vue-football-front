<template>
<div class="container h-100 pt-5">
    <div class="container-fluid w-50 login-bloc">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
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
</div>
</template>

<script>
import authAPI from '../services/authAPI'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async postLogin (e) {
      e.preventDefault()
      try {
        authAPI.authenticate({
          username: this.username,
          password: this.password
        })
        this.error = null
        this.username = ''
        this.password = ''
      } catch (error) {
        this.error = 'Aucun compte ne possède cette adresse e-mail ou les informations ne correspondent pas'
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
