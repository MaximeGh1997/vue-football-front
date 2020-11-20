<template>
<div>
  <div v-if="onProfile">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8 comment">
        <p class="font-italic">
          <span v-if="comment.author.id == decodeToken.decodeToken.id">Vous <span v-if="comment.rating">avez donné une note de {{comment.rating}}</span> sur {{comment.matchNbr.team1.name}} - {{comment.matchNbr.team2.name}}</span>
          <span v-else>@{{comment.author.username}} <span v-if="comment.rating">a donné une note de {{comment.rating}}</span> sur {{comment.matchNbr.team1.name}} - {{comment.matchNbr.team2.name}}</span>
        </p>
        <p class="content">{{comment.content}}</p>
        <p class="light-text font-italic date">
          {{comment.createdAt | formatDate}}
          <button v-if="comment.author.id == decodeToken.decodeToken.id" @click="deleteComment" class="delete-com light-text font-italic">Supprimer</button>
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="comment.author.id == decodeToken.decodeToken.id" class="row justify-content-start justify-content-md-center mt-2 mb-2">
    <div class="col-auto align-self-center text-center">
      <img :src="'http://symfoot.maxime-gh.com/uploads/'+ comment.author.picture" :alt="comment.author.username" class="avatar-medium">
    </div>
    <div class="col-6 comment" style="background-color: rgb(230, 230, 230);">
      <p class="font-italic">Vous <span v-if="comment.rating">avez donné une note de {{comment.rating}}</span></p>
      <p class="content">{{comment.content}}</p>
      <p class="light-text font-italic date">
        {{comment.createdAt | formatDate}}
        <button @click="deleteComment" class="delete-com light-text font-italic">Supprimer</button>
      </p>
    </div>
  </div>
  <div v-else class="row justify-content-end justify-content-md-center mt-2 mb-2">
    <div class="col-6 comment">
      <p class="font-italic">
        <router-link :to="{name: 'UserShow', params: { id:comment.author.id }}">
          @{{comment.author.username}}
        </router-link>
        <span v-if="comment.rating"> à donné une note de {{comment.rating}}</span>
      </p>
      <p class="content">{{comment.content}}</p>
      <p class="light-text font-italic date">{{comment.createdAt | formatDate}}</p>
    </div>
    <div class="col-auto align-self-center text-center">
        <img :src="'http://symfoot.maxime-gh.com/uploads/'+ comment.author.picture" :alt="comment.author.username" class="avatar-medium">
    </div>
  </div>
  </div>
</div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { mapGetters } from 'vuex'
import axios from 'axios'
import Vue from 'vue'

const token = window.localStorage.getItem('authToken')
var userId = null
if (token != null) {
  const jwtData = jwtDecode(token)
  userId = jwtData.id
}

export default {
  name: 'Comment',
  props: ['comment', 'onProfile'],
  data () {
    return {
      token: token,
      userId: userId
    }
  },
  computed: mapGetters('authentication', {
    decodeToken: 'decodeToken'
  }),
  methods: {
    deleteComment () {
      const commentData = new FormData()
      commentData.append('userId', this.userId)
      commentData.append('commentId', this.comment.id)

      if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
        axios.post('http://symfoot.maxime-gh.com/remove-comment', commentData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            if (this.onProfile === true) {
              this.$store.dispatch('comments/findByUser', { id: this.userId })
            } else {
              this.$store.dispatch('comments/findByMatch', { id: this.comment.matchNbr.id })
            }
            Vue.$toast.open({
              message: 'Votre commentaire a bien été supprimé !',
              type: 'success'
            })
          })
          .catch(error => {
            Vue.$toast.open({
              message: error.response.data,
              type: 'error'
            })
          })
      }
    }
  }
}
</script>

<style>
.delete-com {
  margin-left: 15px;
  color: red !important;
  transition: all .3s;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.delete-com:hover {
  color: rgb(202, 0, 0) !important;
}
</style>
