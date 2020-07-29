<template>
    <div class="container" id="editPage">
        <h1 class="mb-3 special-font">Modification du profil</h1>
        <form @submit="updateProfile" name="registration" method="post">
            <div class="form-group">
                <label for="regsitration_firstname" class="required">Prénom</label>
                <input v-model="user.firstname" type="text" id="registration_firstname" required="required" placeholder="Votre prénom" class="form-control">
            </div>
            <div class="form-group">
                <label for="regsitration_lastname" class="required">Nom</label>
                <input v-model="user.lastname" type="text" id="registration_lastname" required="required" placeholder="Votre nom" class="form-control">
            </div>
            <div class="form-group">
                <label for="regsitration_email" class="required">Email</label>
                <input v-model="user.email" type="email" id="registration_email" required="required" placeholder="Votre adresse email" class="form-control">
            </div>
            <button type="submit" class="btn btn-warning">Enregistrer les modifications</button>
        </form>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      token: this.$store.getters['authentication/decodeToken']
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.user
    }),
    ...mapGetters('authentication', {
      loggedIn: 'loggedIn',
      decodeToken: 'decodeToken'
    })
  },
  created () {
    if (this.$store.getters['authentication/loggedIn']) {
      this.$store.dispatch('users/findUser', { id: this.token.decodeToken.id })
    } else {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    updateProfile (e) {
      e.preventDefault()
      try {
        axios.put('http://localhost:8000/api/users/' + this.user.id, {
          firstName: this.user.firstname,
          lastName: this.user.lastname,
          email: this.user.email
        })
          .then(response => {
            if (response.status === 200) {
              this.$router.push({ path: '/users/' + this.user.id })
            }
          })
      } catch ({ response }) {
        console.log(response.data)
      }
    }
  }
}
</script>

<style>
#editPage{
    min-height: 80vh;
    padding-top: 10vh;
}
</style>
