<template>
  <div class="stades">
    <div v-for="stadium in stadiums" :key="stadium.id" class="stade">
      <router-link :to="{name: 'StadiumShow', params: { id:stadium.id }}"><h3>{{stadium.name}}</h3></router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    stadiums: state => state.stadiums.stadiums
  }),
  created () {
    this.$store.dispatch('stadiums/findStadiums')
  },
  methods: {
  }
}
</script>
