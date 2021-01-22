<template>
  <div class="container pt-5 mb-5">
    <h1 class="special-font mb-3">Phase finale</h1>
    <form class="form-group">
        <select class="custom-select form-control" @change="onChangeStage($event)">
            <option v-for="stage in stages" :key="stage.id" :value="stage.id">{{stage.name}}</option>
        </select>
    </form>
    <hr class="mb-3">

    <h1 class="special-font">Les matchs</h1>
    <div class="box">
      <TableLoader :visible="loadingMatchs"/>
      <div v-if="matchs.length < 1" class="row mt-5 mb-5">
            <h4 class="col-12 align-self-center text-center special-font">Cette phase n'a pas encore commencé</h4>
      </div>
      <MatchPreview v-for="match in matchs" :key="match.id" :match="match"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import MatchPreview from '@/components/MatchPreview.vue'
import TableLoader from '@/components/TableLoader.vue'

export default {
  components: {
    MatchPreview,
    TableLoader
  },
  data () {
    return {
      stages: [],
      stageActif: []
    }
  },
  computed: mapState({
    matchs: state => state.matchs.StageMatchs,
    loadingMatchs: state => state.matchs.LoadingMatchs
  }),
  created () {
    this.find()
    this.$store.dispatch('matchs/findByStage', { id: 1 })
  },
  methods: {
    find () {
      axios.get('http://127.0.0.1:8000/api/stages')
        .then(response => {
          this.stages = response.data['hydra:member']
          this.stageActif = this.stages[0]
        })
        .catch(error => console.log(error.response))
    },
    onChangeStage (event) {
      const pos = event.target.value - 1
      this.stageActif = this.stages[pos]
      this.$store.dispatch('matchs/findByStage', { id: event.target.value })
    }
  }
}
</script>

<style>
.box {
  position: relative;
  width: 100%;
  min-height: 800px;
}
</style>
