<template>
    <div class="match">
        <p>{{match.id}}</p>
        <h3>{{match.team1.name}} - {{match.team2.name}}</h3>

        <form name="comment" method="post" @submit="createComment">
          <div class="rating" name="rating">
            <i @click="handleClick" v-for="i in 5" :key="i" :data-value="i" class="fa fa-star"></i>
          </div>
          <div id="comment">
            <div class="form-group">
              <textarea id="comment_content" v-model="content" placeholder="Echangez sur ce match !" class="form-control">
              </textarea>
              <button type="submit" class="btn btn-info">Envoyer</button>
            </div>
          </div>
        </form>

        <p class="special-font">Note globale: <strong>{{match.globalRating}}</strong></p>
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from '@/components/Comment.vue'
import jwtDecode from 'jwt-decode'

export default {
  components: {
    Comment
  },
  data () {
    return {
      content: '',
      rating: null
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

      const token = window.localStorage.getItem('authToken')
      const jwtData = jwtDecode(token)
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
