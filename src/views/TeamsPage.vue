<template>
  <div class="w-100 pt-5 pb-5">
        <div class="col-10 offset-1">
            <h1 class="special-font mt-5 mb-3">Les équipes qualifiées</h1>
            <hr class="mb-5">
            <div class="row">
                <div v-for="team in teams" :key="team.id" class="team col-6 col-sm-3 col-md-2 text-center mt-3 mb-3">
                    <router-link :to="{name: 'TeamShow', params: { id:team.id }}" class="text-center special-font">
                        <img :src="team.logo" alt="" class="logo-team mb-2"><br>
                        {{team.name}}
                    </router-link>
                </div>
            </div>
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
