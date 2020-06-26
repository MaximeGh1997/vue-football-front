<template>
  <div class="w-100 pb-5" id="stades-show">
        <div class="col-10 offset-1">
            <h1 class="special-font mt-5 mb-3">Les stades hôtes</h1>
            <hr class="mb-5">
            <div class="row">
                <div v-for="stadium in stadiums" :key="stadium.id" class="team col-6 col-sm-3 col-md-2 text-center mt-3 mb-3">
                    <router-link :to="{name: 'StadiumShow', params: { id:stadium.id }}" class="text-center special-font">
                        <img src="../assets/stadium-icon.png" alt="" class="logo-stade mb-2"><br>
                        {{stadium.name}}
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
    stadiums: state => state.stadiums.stadiums
  }),
  created () {
    this.$store.dispatch('stadiums/findStadiums')
  },
  methods: {
  }
}
</script>
