<template>
    <div class="match">
        <p>{{match.id}}</p>
        <h3>{{match.team1.name}} - {{match.team2.name}}</h3>

        <form name="comment" method="post" @submit="createComment">
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
import axios from 'axios'
import { mapState } from 'vuex'
import Comment from '@/components/Comment.vue'

export default {
  components: {
    Comment
  },
  data () {
    return {
      match: [],
      content: ''
    }
  },
  computed: mapState({
    comments: state => state.comments.MatchComments
  }),
  created () {
    this.find()
    this.$store.dispatch('comments/findByMatch', { id: this.$route.params.id })
  },
  methods: {
    find () {
      axios.get('http://localhost:8000/api/matchs/' + this.$route.params.id)
        .then(response => {
          this.match = response.data
        })
        .catch(error => console.log(error.response))
    },
    createComment (e) {
      e.preventDefault()
      console.log(this.content)

      this.$store.dispatch('comments/postComment', {
        content: this.content,
        matchId: this.match,
        authorId: 1
      })
      this.content = ''
    }
  }
}
</script>
