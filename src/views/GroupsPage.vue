<template>
  <div class="ranking">
    <h1>Classements & Résultats</h1>
    <form class="form-group">
        <select class="custom-select" @change="onChangeGroup($event)">
            <option v-for="group in groups" :key="group.id" :value="group.id">Groupe {{group.name}}</option>
        </select>
    </form>
    <hr>
    <h1>Groupe {{groupActif.name}}</h1>
    <table class="table table-borderless">
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
                <td scope="row"><img src="" alt=""></td>
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      groups: [],
      groupActif: []
    }
  },
  created () {
    this.find()
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
    }
  }
}
</script>

<style>

</style>
