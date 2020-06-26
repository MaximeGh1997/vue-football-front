<template>
  <div class="container mb-5">
    <h1 class="special-font mt-5">Classements & Résultats</h1>
    <p>Sélectionnez un groupe</p>
    <form class="form-group">
        <select class="custom-select form-control" @change="onChangeGroup($event)">
            <option v-for="group in groups" :key="group.id" :value="group.id">Groupe {{group.name}}</option>
        </select>
    </form>
    <hr class="mt-3 mb-3">
    <h1 class="special-font">Groupe {{groupActif.name}}</h1>
    <table class="table table-borderless mb-5">
        <thead>
            <tr>
                <th scope="col" class="border-0"></th>
                <th scope="col" class="border-0"></th>
                <th scope="col" class="border-0"></th>
                <th scope="col" class="border-0">MJ</th>
                <th scope="col" class="border-0">V</th>
                <th scope="col" class="border-0">N</th>
                <th scope="col" class="border-0">D</th>
                <th scope="col" class="border-0">Pts</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="team in groupActif.teams" :key="team.id">
                <td scope="row"><img :src="team.logo" alt="" class="logo-team-admin"></td>
                <td>{{team.name}}</td>
                <td></td>
                <td>{{team.matchsPlayed}}</td>
                <td>{{team.groupWins}}</td>
                <td>{{team.groupDraws}}</td>
                <td>{{team.groupDefeats}}</td>
                <td>{{team.points}}</td>
            </tr>
        </tbody>
    </table>
    <h1 class="special-font mb-3">Les matchs</h1>
    <MatchPreview v-for="match in matchs" :key="match.id" :match="match"/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import MatchPreview from '@/components/MatchPreview.vue'

export default {
  components: {
    MatchPreview
  },
  data () {
    return {
      groups: [],
      groupActif: []
    }
  },
  computed: mapState({
    matchs: state => state.matchs.GroupMatchs
  }),
  created () {
    this.find()
    this.$store.dispatch('matchs/findByGroup', { id: 1 })
  },
  methods: {
    find () {
      axios.get('http://localhost:8000/api/groups')
        .then(response => {
          this.groups = response.data['hydra:member']
          this.groupActif = this.groups[0]
        })
        .catch(error => console.log(error.response))
    },
    onChangeGroup (event) {
      const pos = event.target.value - 1
      this.groupActif = this.groups[pos]
      this.$store.dispatch('matchs/findByGroup', { id: event.target.value })
    }
  }
}
</script>

<style>

</style>
