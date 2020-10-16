<template>
    <div>
        <div class="team-cover mb-5">
        <img :src="stadium.cover" alt="">
    </div>
        <div class="row" id="rowStadiumShow">
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

<style>
#rowStadiumShow {
  margin-right: 0px;
}

#stades-show{
    min-height: 100vh;
}

.logo-stade{
    width: 90px;
    height: 90px;
    object-fit: contain;
}

.stade-icon img{
    width: 300px;
    height: 300px;
    object-fit: contain;
}

.info-stade{
    margin-top: 30px;
    margin-bottom: 30px;
}

.info-stade ul{
    list-style:none;
}

.info-stade ul li{
    text-align: center;
    line-height: 50px;
    font-size: 18px;
}

/** STADES SHOW **/
@media all and (max-width: 1000px) {
    .team-title{
        font-size: 4em;
    }
  }

  @media all and (max-width: 500px) {
    .team-title{
        font-size: 2.5em;
    }
  }
</style>
