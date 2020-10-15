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
            <div id="button-box">
              <button type="submit" class="btn btn-warning">Enregistrer les modifications</button>
              <div class="post-loader" :class="{ 'post-loader--visible': isLoading }">
              <loading
                :active="isLoading"
                loader=dots
                :is-full-page=false
                color="#1ba2b8"
                :height=25
                :width=25
                :opacity=0
              >
              </loading>
            </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Loading
  },
  data () {
    return {
      token: this.$store.getters['authentication/decodeToken'],
      isLoading: false
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
        this.isLoading = true
        axios.put('http://localhost:8000/api/users/' + this.user.id, {
          firstName: this.user.firstname,
          lastName: this.user.lastname,
          email: this.user.email,
          picture: 'http://127.0.0.1:8000/uploads/' + this.user.picture
        })
          .then(response => {
            if (response.status === 200) {
              this.isLoading = false
              this.$router.push({ path: '/profile/show' })
            }
          })
      } catch ({ response }) {
        console.log(response.data)
      }
    }
  }
}
</script>

<style lang="scss">
#editPage{
    min-height: 80vh;
    padding-top: 10vh;
}

#button-box {
  width: 280px;
}

.post-loader {
  display: none;
  width: 30px;
  min-height: 35px;
  float: right;
  position: relative;
  margin-top: 5px;
  &--visible {
    display: block;
  }
}
</style>
