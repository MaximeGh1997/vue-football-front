<template>
<div class="container register min-vh-100">
    <div class="row align-items-center">
        <div class="col-md-2 text-center">
            <img :src="'http://127.0.0.1:8000/uploads/'+ user.picture" :alt="user.username" class="avatar mb-3">
        </div>
        <div class="col-md-10 text-center text-md-left">
            <h1 style="overflow: hidden;">{{user.firstname}} {{user.lastname}}</h1>
            <p class="font-italic">@{{user.username}} - {{user.email}}</p>
        </div>
        <div class="col-lg-10 offset-lg-2">
            <div class="mt-3 text-center text-md-left">
                <router-link class="btn btn-info d-block d-md-inline-block mr-2 mb-2" to="/profile/edit">Modifier mon profil</router-link>
                <router-link class="btn btn-warning d-block d-md-inline-block mr-2 mb-2" to="/profile/edit-password">Modifier mon mot de passe</router-link>
                <router-link class="btn btn-info d-block d-md-inline-block mr-2 mb-2" to="/profile/picture">Ajouter une image de profil</router-link>
                <button @click="removePicture" class="btn btn-danger d-block d-md-inline-block mr-2 mb-2">Supprimer mon image de profil</button>
            </div>
        </div>
    </div>
    <h3 class="special-font mt-5">Mes commentaires</h3>
    <hr class="mb-3">
    <Comment v-for="comment in showComments" :key="comment.id" :comment="comment" :onProfile="true"/>
    <div class="my-4">
    <ul class="pagination pagination-md justify-content-center text-center">
        <li class="page-item" :class="page === 1 ? 'disabled' : ''">
          <a class="page-link" @click="prevPage">Précédent</a>
        </li>
        <li class="page-link" style="background-color: inherit">
            {{ page }} sur {{ lastPage }}
        </li>
        <li class="page-item" :class="page === lastPage ? 'disabled' : ''">
          <a class="page-link" @click="nextPage">Suivant</a>
        </li>
    </ul>
 </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Comment from '@/components/Comment.vue'
import axios from 'axios'
import Vue from 'vue'

export default {
  components: {
    Comment
  },
  data () {
    return {
      page: 1,
      loading: false,
      perPage: 10,
      token: this.$store.getters['authentication/decodeToken']
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.user,
      comments: state => state.comments.UserComments
    }),
    ...mapGetters('authentication', {
      decodeToken: 'decodeToken'
    }),
    showComments () {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage
      return this.comments.slice(start, end)
    },
    lastPage () {
      const length = this.comments.length
      const lastPage = length / this.perPage
      return Math.ceil(lastPage)
    }
  },
  created () {
    if (this.$store.getters['authentication/loggedIn']) {
      this.$store.dispatch('users/findUser', { id: this.token.decodeToken.id })
      this.$store.dispatch('comments/findByUser', { id: this.token.decodeToken.id })
    } else {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    prevPage () {
      this.loading = true
      this.page--
      window.scrollTo({ top: 300, behavior: 'smooth' })
    },
    nextPage () {
      this.loading = true
      this.page++
      window.scrollTo({ top: 300, behavior: 'smooth' })
    },
    removePicture () {
      const userData = new FormData()
      userData.append('userId', this.token.decodeToken.id)

      if (confirm('Êtes-vous sûr de vouloir supprimer votre image de profil ?')) {
        axios.post('http://localhost:8000/remove-picture', userData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            this.$store.dispatch('users/findUser', { id: this.token.decodeToken.id })
            Vue.$toast.open({
              message: 'Votre image de profil a bien été supprimée !',
              type: 'success'
            })
          })
          .catch(response => {
            console.log('ERROR')
          })
      }
    }
  }
}
</script>

<style>
a:hover {
 cursor: pointer;
}

.page-link {
  color: #0084a4
}
</style>
