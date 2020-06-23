<template>
    <div class="team">
        <h1>{{team.name}}</h1>
    </div>
</template>

<script>
export default {
  data () {
    return {
      team: []
    }
  },
  created () {
    this.initTeam()
  },
  methods: {
    async initTeam () {
      try {
        const data = await this.$store.dispatch('teams/findTeam', { id: this.$route.params.id })
        this.team = data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
