<template>
    <div class="container" id="editPage">
        <h1 class="mb-3 special-font">Ajout d'une image de profil</h1>
        <form @submit="updateProfile" name="registration" method="post">
            <div class="form-group">
                <label for="picture" class="required">Image de profil</label>
                <input type="text" id="registration_firstname" required="required" placeholder="Votre prénom" class="form-control">
            </div>
            <button type="submit" class="btn btn-info">Ajouter une image de profil</button>
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
