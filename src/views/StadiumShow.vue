<template>
    <div class="stadium">
        <h1>{{stadium.name}}</h1>
    </div>
</template>

<script>
export default {
  data () {
    return {
      stadium: []
    }
  },
  created () {
    this.initStadium()
  },
  methods: {
    async initStadium () {
      try {
        const data = await this.$store.dispatch('stadiums/findStadium', { id: this.$route.params.id })
        this.stadium = data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
