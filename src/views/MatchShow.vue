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
            <div class="col-4 col-lg-4 align-self-center text-center">
                <div v-if="match.isPlayed">
                  {{match.scoreT1}} - {{match.scoreT2}}
                </div>
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
                <router-link :to="{name: 'StadiumShow', params: { id:match.stade.id }}" class="col-md-4 align-self-center">
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
    <form v-if="loggedIn" name="comment" method="post" @submit="createComment">
      <div v-if="match.isPlayed" class="rating" name="rating">
        <i @click="handleClick" v-for="i in 5" :key="i" :data-value="i" class="fa fa-star"></i>
      </div>
      <div id="comment">
        <div class="form-group">
          <textarea id="comment_content" v-model="content" placeholder="Echangez sur ce match !" class="form-control" required>
          </textarea>
          <div id="button-box">
            <button type="submit" class="btn btn-info mt-3">Envoyer</button>
            <div class="post-loader" :class="{ 'post-loader--visible': postLoading }">
              <loading
                :active="postLoading"
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
        </div>
      </div>
      <hr>
    </form>
  <p v-if="match.isPlayed" class="special-font">Note globale: <strong>{{match.globalRating}}</strong></p>
  <Comment v-for="comment in showComments" :key="comment.id" :comment="comment"/>
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
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Comment from '@/components/Comment.vue'
import httpClient from '@/services/httpClient'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Comment,
    Loading
  },
  data () {
    return {
      match: [],
      content: '',
      rating: null,
      token: this.$store.getters['authentication/decodeToken'],
      page: 1,
      loading: false,
      perPage: 10,
      Loading
    }
  },
  computed: {
    ...mapState({
      comments: state => state.comments.MatchComments,
      postLoading: state => state.comments.PostLoader
    }),
    ...mapGetters('authentication', {
      loggedIn: 'loggedIn',
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
    this.fetchMatch()
    this.$store.dispatch('comments/findByMatch', { id: this.$route.params.id })
  },
  methods: {
    fetchMatch () {
      httpClient.get('http://127.0.0.1:8000/api/matchs/' + this.$route.params.id)
        .then(response => {
          this.match = response
        })
        .catch(error => console.log(error.response))
    },
    createComment (e) {
      e.preventDefault()
      this.$store.dispatch('comments/postComment', {
        content: this.content,
        rating: this.rating,
        authorId: this.token.decodeToken.id,
        matchId: this.match.id
      })
      if (this.match.isPlayed) {
        const ratingBox = document.querySelectorAll('.rating')[0]
        ratingBox.classList.remove('active')
      }
      this.content = ''
      this.rating = null
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
    },
    prevPage () {
      this.loading = true
      this.page--
      window.scrollTo({ top: 1000, behavior: 'smooth' })
    },
    nextPage () {
      this.loading = true
      this.page++
      window.scrollTo({ top: 1000, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss">
.match-cover{
    height: 400px;
    background-image: url(../assets/match-background2.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

a:hover {
 cursor: pointer;
}

.page-link {
  color: #0084a4
}

#button-box {
  width: 130px;
}

.post-loader {
  display: none;
  width: 30px;
  min-height: 35px;
  float: right;
  position: relative;
  margin-top: 20px;
  &--visible {
    display: block;
  }
}
</style>
