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
    <h1 class="group-title special-font">Groupe {{groupActif.name}}</h1>
    <table class="table mb-5 group-table" :class="{ 'group-table--visible': isLoading }">
        <div class="loadingGroup" :class="{ 'loadingGroup--visible': isLoading }">
          <loading
            :active="isLoading"
            loader=dots
            :is-full-page=false
            color="#1ba2b8"
            :height=40
            :width=40
            :opacity=0.5
          >
          </loading>
        </div>
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
                <td class="special-font">{{team.name}}</td>
                <td></td>
                <td class="special-font">{{team.matchsPlayed}}</td>
                <td class="special-font">{{team.groupWins}}</td>
                <td class="special-font">{{team.groupDraws}}</td>
                <td class="special-font">{{team.groupDefeats}}</td>
                <td class="special-font">{{team.points}}</td>
            </tr>
        </tbody>
    </table>
    <h1 class="special-font mb-3">Les matchs</h1>
    <div class="box">
      <TableLoader :visible="loadingMatchs"/>
      <MatchPreview v-for="match in matchs" :key="match.id" :match="match"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import MatchPreview from '@/components/MatchPreview.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import TableLoader from '@/components/TableLoader.vue'

export default {
  components: {
    MatchPreview,
    Loading,
    TableLoader
  },
  data () {
    return {
      groups: [],
      groupActif: [],
      isLoading: false
    }
  },
  computed: mapState({
    matchs: state => state.matchs.GroupMatchs,
    loadingMatchs: state => state.matchs.LoadingMatchs
  }),
  created () {
    this.find()
    this.$store.dispatch('matchs/findByGroup', { id: 1 })
  },
  methods: {
    find () {
      this.isLoading = true
      axios.get('http://localhost:8000/api/groups')
        .then(response => {
          this.groups = response.data['hydra:member']
          this.groupActif = this.groups[0]
          this.isLoading = false
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

<style lang="scss">
.group-table {
  position: relative;
  &--visible {
    position: relative;
  }
}

.loadingGroup {
  width: 100%;
  height: 100%;
  position: absolute;
}

.box {
  position: relative;
  width: 100%;
  min-height: 800px;
}
</style>
