<template>
  <div class="home-slider">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
        <div class="carousel-item">
        <img src="../assets/2355696-49012690-2560-1440.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>EURO, les meilleurs buteurs par pays</h5>
            <p>Les meilleurs buteurs de chaque pays ayant disputé au moins une phase finale de l'EURO....</p>
        </div>
        </div>
        <div class="carousel-item">
        <img src="../assets/Euro-2020-le-calendrier-complet-et-toutes-les-infos.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>Le calendrier des matches de l'UEFA EURO 2020</h5>
            <p>L'UEFA EURO 2020 se jouera du 11 juin au 11 juillet 2021...</p>
        </div>
        </div>
        <div class="carousel-item active">
        <img src="../assets/lilian_thuram_claude_makelele_france_.jpeg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>EURO : le joueur le plus âgé par équipe</h5>
            <p>Quel est le joueur le plus âgé à avoir défendu sa sélection nationale à l'EURO ?...</p>
        </div>
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
    </div>

    <div class="container">
    <h3 class="mt-5 mb-3 special-font">Prochaines rencontres</h3>
        <div v-if="nextsMatchs.length < 1" class="row match-card mt-5 mb-5">
            <h4 class="col-12 align-self-center text-center special-font">Il n'y a aucun match à venir</h4>
        </div>
        <div v-else class="row justify-content-center mt-2 mb-5">
          <div v-for="match in nextsMatchs" :key="match.id" class="col-xl-3 mt-2 match-card justify-content-center text-center">
              <p class="light-text text-center">{{match.stade.name}} <br> <span v-if="match.groupName"> Groupe {{match.groupName.name}}</span> <span v-else>{{match.stage.name}}</span></p>
              <div class="row scoreboard justify-content-center"><img :src="match.team1.logo" alt=""> <div class="light-text text-center" style="font-size: 15px;">{{match.date.date | formatDate }} </div> <img :src="match.team2.logo" alt=""></div>
              <router-link :to="{name: 'MatchShow', params: { id:match.id }}" class="btn btn-outline-info mt-4">Voir plus</router-link>
          </div>
        </div>

    <h3 class="mt-5 mb-3 special-font">Derniers résultats</h3>
        <div v-if="lastsResults.length < 1" class="row match-card mt-5 mb-5">
            <h4 class="col-12 align-self-center text-center special-font">Aucun match n'a encore été joué</h4>
        </div>
        <div v-else class="row justify-content-center mt-2 mb-5">
          <div v-for="match in lastsResults" :key="match.id" class="col-xl-3 mt-2 match-card justify-content-center text-center">
            <p class="light-text text-center">{{match.date.date | formatDate }} <br> {{match.stade.name}} <br><span v-if="match.groupName"> Groupe {{match.groupName.name}}</span> <span v-else>{{match.stage.name}}</span></p>
            <div class="row scoreboard justify-content-center"><img :src="match.team1.logo" alt=""> <div class="score">{{match.scoreT1}} - {{match.scoreT2}}</div> <img :src="match.team2.logo" alt=""></div>
            <router-link :to="{name: 'MatchShow', params: { id:match.id }}" class="btn btn-outline-info">Voir plus</router-link>
          </div>
        </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
    }
  },
  computed: mapState({
    nextsMatchs: state => state.matchs.NextsMatchs,
    lastsResults: state => state.matchs.LastsResults
  }),
  created () {
    this.$store.dispatch('matchs/findNextsMatchs')
    this.$store.dispatch('matchs/findLastsResults')
  }
}
</script>

<style>
.presentation {
  width: 100%;
  height: 350px;
  padding: 30px;
  font-style: italic;
  text-align: center;
  font-size: 18px;
}
</style>
