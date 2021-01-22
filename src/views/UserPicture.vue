<template>
    <div class="container" id="editPage">
        <h1 class="mb-3 special-font">Ajout d'une image de profil</h1>
        <form @submit="submitPicture" name="registration" method="post">
            <div class="form-group">
                <label for="picture" class="required">Image de profil</label>
                <input type="file" id="file" ref="file" required="required" class="form-control" @change="handleFileUpload">
            </div>
            <div id="button-box">
              <button type="submit" class="btn btn-info">Ajouter une image de profil</button>
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
import Vue from 'vue'

export default {
  components: {
    Loading
  },
  data () {
    return {
      token: this.$store.getters['authentication/decodeToken'],
      file: '',
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
    } else {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      console.log(this.file)
    },
    submitPicture (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('userId', this.token.decodeToken.id)

      this.isLoading = true
      axios.post('http://127.0.0.1:8000/upload-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          this.isLoading = false
          this.$router.push({ path: '/profile/show' })
        })
        .catch(error => {
          this.isLoading = false
          this.file = ''
          Vue.$toast.open({
            message: error.response.data.violations[0].message,
            type: 'error'
          })
        })
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
