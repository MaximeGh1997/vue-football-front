<template>
    <div class="container" id="editPage">
        <h1 class="mb-3 special-font">Ajout d'une image de profil</h1>
        <form @submit="submitPicture" name="registration" method="post">
            <div class="form-group">
                <label for="picture" class="required">Image de profil</label>
                <input type="file" id="file" ref="file" required="required" class="form-control" @change="handleFileUpload">
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
      token: this.$store.getters['authentication/decodeToken'],
      file: ''
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

      axios.post('http://localhost:8000/upload-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': 'http://localhost:8000/'
        }
      })
        .then(response => {
          console.log('SUCCESS')
        })
        .catch(response => {
          console.log('ERROR')
        })
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
