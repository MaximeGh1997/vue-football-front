<template>
<div>
  <div class="match-cover">
    <div class="container h-100 match-cont">
        <div class="row justify-content-center match-info">
            <p class="text-center light-text">{{match.stade.name}} - {{match.stade.city}} <br> <span v-if="match.groupName !== null">Groupe {{match.groupName.name}}</span>  <span v-else-if="match.stage !== null">{{match.stage.name}}</span></p>
        </div>
        <div class="row match-scoreboard justify-content-center">
            <div class="col-3 col-lg-2 align-self-center text-right d-none d-lg-block">{{match.team1.name}}</div>
            <div class="col-auto col-lg-2 align-self-center text-left"><img :src="match.team1.logo" alt="" class="logo-team"></div>
            <div class="col-auto col-lg-4 align-self-center text-center">
                <span v-if="match.isPlayed">
                  {{match.scoreT1}} - {{match.scoreT2}}
                </span>
                <div v-else id="date">
                  {{match.date.date | formatDate}}
                </div>
            </div>
            <div class="col-auto col-lg-2 align-self-center text-right"><img :src="match.team2.logo" alt="" class="logo-team"></div>
            <div class="col-3 col-lg-2 align-self-center text-left d-none d-lg-block">{{match.team2.name}}</div>
        </div>
    </div>
  </div>
  <div class="container mt-5 mb-5">
    <h3 class="special-font">Infos de base</h3>
    <div class="row mt-3 mb-5">
        <div class="col-8 offset-2">
            <div class="row" id="infos">
                <router-link :to="{name: 'TeamShow', params: { id:match.team1.id }}" class="col-md-4 align-self-center">
                    <div class="team-flag text-center">
                        <img :src="match.team1.logo" alt="">
                        <p class="special-font">{{match.team1.name}}</p>
                    </div>
                </router-link>
                <router-link :to="{name: 'TeamShow', params: { id:match.stade.id }}" class="col-md-4 align-self-center">
                    <div class="team-flag text-center">
                        <img :src="match.stade.cover" alt="">
                        <p class="special-font">{{match.stade.name}}</p>
                    </div>
                </router-link>
                <router-link :to="{name: 'TeamShow', params: { id:match.team2.id }}" class="col-md-4 align-self-center">
                    <div class="team-flag text-center">
                        <img :src="match.team2.logo" alt="">
                        <p class="special-font">{{match.team2.name}}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>

    <h3 class="special-font">Avis & commentaires</h3>
    <hr>
    <form v-if="token !== null" name="comment" method="post" @submit="createComment">
      <div v-if="match.isPlayed" class="rating" name="rating">
        <i @click="handleClick" v-for="i in 5" :key="i" :data-value="i" class="fa fa-star"></i>
      </div>
      <div id="comment">
        <div class="form-group">
          <textarea id="comment_content" v-model="content" placeholder="Echangez sur ce match !" class="form-control">
          </textarea>
          <button type="submit" class="btn btn-info mt-3">Envoyer</button>
        </div>
      </div>
      <hr>
    </form>
  <p v-if="match.isPlayed" class="special-font">Note globale: <strong>{{match.globalRating}}</strong></p>
  <Comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from '@/components/Comment.vue'
import jwtDecode from 'jwt-decode'

const token = window.localStorage.getItem('authToken')

export default {
  components: {
    Comment
  },
  data () {
    return {
      content: '',
      rating: null,
      token: token
    }
  },
  computed: mapState({
    comments: state => state.comments.MatchComments,
    match: state => state.matchs.Match
  }),
  created () {
    this.$store.dispatch('matchs/find', { id: this.$route.params.id })
    this.$store.dispatch('comments/findByMatch', { id: this.$route.params.id })
  },
  methods: {
    createComment (e) {
      e.preventDefault()

      const jwtData = jwtDecode(this.token)
      var authorId = jwtData.id

      this.$store.dispatch('comments/postComment', {
        content: this.content,
        rating: this.rating,
        matchNbr: '/api/matchs/' + this.match.id,
        author: '/api/users/' + authorId
      })
      const ratingBox = document.querySelectorAll('.rating')[0]
      ratingBox.classList.remove('active')
      this.content = ''
      this.rating = ''
    },
    handleClick (e) {
      const ratingBox = document.querySelectorAll('.rating')[0]
      const stars = ratingBox.querySelectorAll('i')

      this.rating = e.target.getAttribute('data-value')
      ratingBox.classList.add('active')
      stars.forEach(function (star, key) {
        star.classList.remove('active')
      })
      e.target.classList.add('active')
    }
  }
}
</script>
