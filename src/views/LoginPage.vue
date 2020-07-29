<template>
<div class="container login-cont pt-5">
    <div class="container-fluid w-50" id="login-content">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <div v-if="!loggedIn">
          <h3 class="h3 mb-3 font-weight-normal text-center">Connectez-vous</h3>
        <form @submit="login">
            <div class="form-group">
                <label htmlFor="usersame">Nom d'utilisateur</label>
                <input
                    v-model="username"
                    type="text"
                    placeholder="Nom d'utilisateur"
                    name="username"
                    id="username"
                    class="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                    v-model="password"
                    type="password"
                    placeholder="Mot de passe"
                    id="password"
                    name="password"
                    class="form-control"/>
            </div>
            <div class="form-group text-center">
                <button
                class="mt-3 btn btn-success">
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  computed: mapGetters('authentication', {
    loggedIn: 'loggedIn'
  }),
  methods: {
    login (e) {
      e.preventDefault()
      this.$store.dispatch('authentication/retrieveToken', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          this.$router.push({ path: '/' })
        })
    },

    handleLogout () {
      this.$store.dispatch('authentication/destroyToken')
    }
  }
}
</script>

<style>
.login-cont{
  min-height: 80vh;
}
#login-content{
  padding-top: 10vh;
}
</style>
