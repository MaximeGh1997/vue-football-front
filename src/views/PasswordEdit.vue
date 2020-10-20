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
            <div id="button-box">
              <button type="submit" class="btn btn-warning">Modifier mon mot de passe</button>
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
import { mapGetters } from 'vuex'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Vue from 'vue'

export default {
  components: {
    Loading
  },
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      passwordConfirm: '',
      token: this.$store.getters['authentication/decodeToken'],
      isLoading: false
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
        Vue.$toast.open({
          message: 'Vous n\'avez pas correctement confirmé votre nouveau mot de passe !',
          type: 'error'
        })
        this.oldPassword = ''
        this.newPassword = ''
        this.passwordConfirm = ''
        return
      }
      this.isLoading = true
      axios.post('http://symfoot.maxime-gh.com/password-edit', passwordData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response)
          this.isLoading = false
          this.$router.push({ path: '/profile/show' })
          Vue.$toast.open({
            message: 'Votre mot de passe a bien été modifié !',
            type: 'success'
          })
        })
        .catch(error => {
          this.isLoading = false
          Vue.$toast.open({
            message: error.response.data,
            type: 'error'
          })
          this.oldPassword = ''
          this.newPassword = ''
          this.passwordConfirm = ''
        })
    }
  }
}
</script>

<style lang="scss">
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
