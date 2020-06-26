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
        <img src="../assets/916fbf2f97c9c2fd3c1f.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>UEFA EURO 2020, prêt pour le départ !</h5>
            <p>Tout est prêt pour le grand départ de l'UEFA EURO 2020...</p>
        </div>
        </div>
        <div class="carousel-item">
        <img src="../assets/1471090.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>Exclu : Iniesta raconte ses finales européennes</h5>
            <p>Alors qu'il fête ses 36 ans, Andrés Iniesta revient en exclusivité pour UEFA.com...</p>
        </div>
        </div>
        <div class="carousel-item active">
        <img src="../assets/2720308-56228190-2560-1440.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>Classiques de l'EURO : Allemagne - Pays-Bas 2019</h5>
            <p>Revivez cette confrontation des éliminatoires européens de 2019...</p>
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
    <div class="presentation special-font">
      <p class="align-self-center">L'UEFA EURO 2020 est une compétition de football internationale rassemblant les meilleures nations européennes</p>
      <p class="align-self-center">Découvrez les équipes engagées, stades, résultats et classements et échangez avec d'autres passionnés sur les plus belles rencontres de football européennes !</p>
    </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
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
