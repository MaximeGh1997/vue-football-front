<template>
<div>
  <div class="team-cover mb-5">
        <img :src="team.cover" alt="">
    </div>
    <div class="container">
        <div class="row">
            <div class="text-center mb-3 col-md-6 team-flag">
                <img :src="team.logo" alt="">
            </div>
            <div class="text-center col-md-6 align-self-center">
                <h1 class="special-font team-title">{{team.name}}</h1>
            </div>
        </div>
        <div class="row team-desc">
            <nl2br tag="p" :text="team.description"/>
        </div>
    </div>
</div>
</template>

<script>
import Nl2br from 'vue-nl2br'
import { mapState } from 'vuex'

export default {
  computed: mapState({
    team: state => state.teams.team
  }),
  components: {
    Nl2br
  },
  created () {
    this.$store.dispatch('teams/findTeam', { id: this.$route.params.id })
  }
}
</script>
