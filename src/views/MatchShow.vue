<template>
    <div class="match">
        <p>{{match.id}}</p>
        <h3>{{match.team1.name}} - {{match.team2.name}}</h3>
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
      match: []
    }
  },
  computed: mapState({
    comments: state => state.comments.MatchComments
  }),
  created () {
    this.find()
    this.$store.dispatch('comments/findByMatch', { id: 136 })
  },
  methods: {
    find () {
      axios.get('http://localhost:8000/api/matchs/' + 136)
        .then(response => {
          this.match = response.data
        })
        .catch(error => console.log(error.response))
    }
  }
}
</script>
