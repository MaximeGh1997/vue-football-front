<template>
    <div>
        <div class="team-cover mb-5">
        <img :src="stadium.cover" alt="">
    </div>
        <div class="row">
            <div class="text-center col-md-4 offset-1 stade-icon">
                <img src="../assets/stadium-icon.png" alt="">
            </div>
            <div class="text-center col-md-6 align-self-center">
                <h1 class="special-font team-title">{{stadium.name}}</h1>
            </div>
        </div>
            <div class="col-auto justify-content-center info-stade">
                <ul>
                    <li>Ville: <em>{{stadium.city}}</em></li>
                    <li>Capacité: <em>{{stadium.capacity}} places</em></li>
                    <li>Hôte du groupe <em>{{stadium.groups.name}}</em></li>
                </ul>
            </div>
        <div class="container">
        <div class="row text-center justify-content-center team-desc">
            <nl2br tag="p" :text="stadium.description"/>
        </div>
    </div>
    </div>
</template>

<script>
import Nl2br from 'vue-nl2br'

export default {
  data () {
    return {
      stadium: []
    }
  },
  components: {
    Nl2br
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
