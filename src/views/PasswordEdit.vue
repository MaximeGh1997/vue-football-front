<template>
    <div class="container pt-5" id="editPage">
        <h1 class="mb-3 special-font">Modification du mot de passe</h1>
        <form @submit="updatePassword" name="update" method="post">
            <div class="form-group">
                <label class="required">Ancien mot de passe</label>
                <input v-model="oldPassword" type="password" id="update_oldPassword" required="required" placeholder="Votre ancien mot de passe" class="form-control">
            </div>
            <div class="form-group">
                <label class="required">Nouveau mot de passe</label>
                <input v-model="newPassword" type="password" id="update_newPassword" required="required" placeholder="Votre nouveau mot de passe" class="form-control">
            </div>
            <div class="form-group">
                <label class="required">Confirmation nouveau mot de passe</label>
                <input v-model="passwordConfirm" type="password" id="update_passwordConfirm" required="required" placeholder="Confirmez votre nouveau mot de passe" class="form-control">
            </div>
            <button type="submit" class="btn btn-warning">Modifier mon mot de passe</button>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      passwordConfirm: '',
      token: this.$store.getters['authentication/decodeToken'],
      error: null
    }
  },
  computed: {
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
    updatePassword (e) {
      e.preventDefault()

      const passwordData = new FormData()
      passwordData.append('oldPassword', this.oldPassword)
      passwordData.append('newPassword', this.newPassword)
      passwordData.append('userId', this.token.decodeToken.id)

      if (this.newPassword !== this.passwordConfirm) {
        this.error = 'Vous n\'avez pas correctement confirmé votre nouveau mot de passe'
        console.log(this.error)
        return
      }
      axios.post('http://localhost:8000/password-edit', passwordData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          this.$router.push({ path: '/profile/show' })
        })
        .catch(error => {
          this.error = error.data
          console.log(this.error)
        })
    }
  }
}
</script>

<style>

</style>
