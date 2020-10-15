<template>
    <div class="container register">
        <h1 class="mb-3 special-font">Inscription sur SymFoot</h1>
        <form @submit="registration" name="registration" method="post">
            <div class="form-group">
                <label for="regsitration_firstname" class="required">Prénom</label>
                <input v-model="firstname" type="text" id="registration_firstname" required="required" placeholder="Votre prénom" class="form-control">
            </div>
            <div class="form-group">
                <label for="regsitration_lastname" class="required">Nom</label>
                <input v-model="lastname" type="text" id="registration_lastname" required="required" placeholder="Votre nom" class="form-control">
            </div>
            <div class="form-group">
                <label for="regsitration_username" class="required">Nom d'utilisateur</label>
                <input v-model="username" type="text" id="registration_username" required="required" placeholder="Votre nom d'utilisateur" class="form-control">
            </div>
            <div class="form-group">
                <label for="regsitration_email" class="required">Email</label>
                <input v-model="email" type="email" id="registration_email" required="required" placeholder="Votre adresse email" class="form-control">
            </div>
            <div class="form-group">
                <label for="regsitration_password" class="required">Mot de passe</label>
                <input v-model="password" type="password" id="registration_password" required="required" placeholder="Votre mot de passe" class="form-control">
            </div>
            <div class="form-group">
                <label for="regsitration_passwordConfirm" class="required">Confirmation du mot de passe</label>
                <input v-model="passwordConfirm" type="password" id="registration_passwordConfirm" required="required" placeholder="Confirmation du mot de passe" class="form-control">
                <div v-if="error" class="alert alert-danger">{{error}}</div>
            </div>
            <!--<div class="form-group">
              <label for="registration_picture">Image de profil (jpg,png,gif)</label>
              <div class="custom-file">
                <input v-on:change="handleFileUpload()" type="file" id="registration_picture" ref="file" class="custom-file-input" accept="image/png, image/jpeg, image/gif">
                <label for="registration_picture" class="custom-file-label"></label>
              </div>
            </div>-->
            <div id="button-box">
              <button type="submit" class="btn btn-info">Confirmez l'inscription</button>
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
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Loading
  },
  data () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      file: '',
      error: null,
      isLoading: false
    }
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      console.log(this.file.name)
    },
    registration (e) {
      e.preventDefault()
      if (this.password !== this.passwordConfirm) {
        this.error = 'Vous n\'avez pas correctement confirmé votre mot de passe'
        console.log(this.error)
        return
      }
      try {
        this.isLoading = true
        axios.post('http://localhost:8000/api/users', {
          firstName: this.firstname,
          lastName: this.lastname,
          username: this.username,
          email: this.email,
          password: this.password
        })
          .then(response => {
            if (response.status === 201) {
              this.isLoading = false
              this.$router.push({ path: '/login' })
            }
            this.firstname = ''
            this.lastname = ''
            this.username = ''
            this.email = ''
            this.password = ''
          })
      } catch ({ response }) {
        console.log(response.data)
      }
    }
  }
}
</script>

<style lang="scss">
#button-box {
  width: 230px;
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
