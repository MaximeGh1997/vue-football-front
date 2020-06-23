<template>
  <div class="teams">
    <div v-for="team in teams" :key="team.id" class="team">
      <router-link :to="{name: 'Team', params: { id:team.id }}"><h3>{{team.name}}</h3></router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    teams: state => state.teams.teams
  }),
  created () {
    this.$store.dispatch('teams/findTeams')
  },
  methods: {
  }
}
</script>
