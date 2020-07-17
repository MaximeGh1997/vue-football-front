<template>
  <div id="app">
      <div id="nav" class="navbar navbar-expand-md nav-front">
        <router-link to="/" class="navbar-brand logo">
          <img :src="logo" width="35" height="40" alt="">
        </router-link>
        <div @click="openMenu" class="burger mr-auto d-block d-md-none">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="collapse navbar-collapse d-none d-md-block">
          <router-link class="nav-item nav-link" to="/">Accueil</router-link>
          <router-link class="nav-item nav-link" to="/teams">Equipes</router-link>
          <router-link class="nav-item nav-link" to="/stadiums">Stades</router-link>
          <router-link class="nav-item nav-link" to="/groups">Classements & Résultats</router-link>
          <router-link class="nav-item nav-link" to="/stages">Phase finale</router-link>
        </div>
        <ul class="nav ml-auto">
         <li v-if="loggedIn" class="nav-item dropdown">
            <a @click="openDropMenu" href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" id="accountDropdownLink">
               <img :src="unknow" alt="avatar de" class="avatar-mini">
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="accountDropdownLink">
               <router-link class="dropdown-item" to="">Mon profil</router-link>
               <a v-if="decodeToken.decodeToken.roles.includes('ROLE_ADMIN')" href="http://www.symfoot.maxime-gh.com/admin/matchs" class="dropdown-item">Administration</a>
               <div class="dropdown-divider"></div>
               <a href="" class="dropdown-item" @click="handleLogout">Déconnexion</a>
            </div>
         </li>
          <div v-else class="collapse navbar-collapse d-none d-md-block">
            <router-link class="nav-item nav-link" to="/register">S'inscrire</router-link>
            <router-link class="nav-item nav-link" to="/login">Se connecter</router-link>
          </div>
        </ul>
      </div>

      <div id="nav-burger">
        <i @click="openMenu" class="fas fa-times fa-4x close"></i>
        <ul>
            <router-link class="nav-item nav-link" to="/">Accueil</router-link>
            <router-link class="nav-item nav-link" to="/teams">Equipes</router-link>
            <router-link class="nav-item nav-link" to="/stadiums">Stades</router-link>
            <router-link class="nav-item nav-link" to="/groups">Classements & Résultats</router-link>
            <router-link class="nav-item nav-link" to="/stages">Phase finale</router-link>
        </ul>
        <div v-if="!loggedIn" id="links">
            <router-link class="nav-item nav-link" to="/register">S'inscrire</router-link>
            <router-link class="nav-item nav-link" to="/login">Se connecter</router-link>
        </div>
      </div>

    <transition name="slide-fade" mode="out-in">
      <router-view/>
    </transition>

    <footer class="page-footer font-small pt-4 w-100 footer-front">

      <div class="container text-center text-md-left">
        <div class="row">
          <div class="col-md-6 mt-md-0 mt-3">
            <h5 class="text-uppercase">UEFA EURO 2020</h5>
            <p>Découvrez, analysez, partagez sur les plus belles rencontres européennes</p>

          </div>
          <hr class="clearfix w-100 d-md-none pb-3">
          <div class="col-md-3 mb-md-0 mb-3">
            <h5 class="text-uppercase">MENU</h5>

            <ul class="list-unstyled">
              <li>
                <router-link class="nav-item nav-link" to="/">Accueil</router-link>
              </li>
              <li>
                <router-link class="nav-item nav-link" to="/teams">Equipes</router-link>
              </li>
              <li>
                <router-link class="nav-item nav-link" to="/stadiums">Stades</router-link>
              </li>
              <li>
                <router-link class="nav-item nav-link" to="/groups">Classements & Résultats</router-link>
              </li>
            </ul>

          </div>
          <div class="col-md-3 mb-md-0 mb-3">
            <h5 class="text-uppercase">INFOS</h5>

            <ul class="list-unstyled">
              <li>
                <a href="#!">Billets</a>
              </li>
              <li>
                <a href="#!">Boutique</a>
              </li>
              <li>
                <a href="#!">Guide de l'événement</a>
              </li>
              <li>
                <a href="#!">UEFA.com</a>
              </li>
            </ul>

          </div>
        </div>
      </div>
      <div class="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="#"> Maxime Gh</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      logo: require('./assets/UEFA_Euro_2020_Logo_White.svg.png'),
      unknow: require('./assets/unknow.jpg')
    }
  },
  computed: mapGetters('authentication', {
    loggedIn: 'loggedIn',
    decodeToken: 'decodeToken'
  }),
  methods: {
    handleLogout () {
      this.$store.dispatch('authentication/destroyToken')
      this.$router.push({ path: '/login' })
    },
    openMenu () {
      const burger = document.querySelectorAll('nav .burger')[0]
      const nav = document.querySelectorAll('#nav-burger')[0]

      nav.classList.toggle('active')
      burger.classList.toggle('active')
    },
    openDropMenu () {
      const dropMenu = document.querySelectorAll('.dropdown-menu')[0]
      dropMenu.classList.toggle('active')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav a.router-link-exact-active {
  color: rgba(16, 76, 87, 0.753);
  text-shadow: none;
}

.dropdown-menu{
    background-image: url(./assets/body_background.jpg);
    height: auto;
}

.dropdown-menu.active{
  display: block;
}

.nav-front{
    background-image: url(./assets/body_background.jpg);
    box-shadow: 1px 1px 3px rgba(21, 78, 88, 0.7);
}

.burger{
    width: 35px;
    height: 30px;
    cursor: pointer;
    position:relative;
    left: -35px;
}

.burger:hover span{
    background-color: rgb(21, 85, 97);
}

.burger.active:hover span{
    background-color: rgb(255, 98, 98);
}

.burger span{
    width: 100%;
    height: 5px;
    background-color: white;
    margin-bottom: 8px;
    display: block;
    transition: all 0.3s;
}

.burger.active span:nth-child(1){
    margin-bottom: 0px;
    margin-top: 15px;
    transform: rotate(45deg);
}

.burger.active span:nth-child(2){
    display: none;
}

.burger.active span:nth-child(3){
    margin-bottom: 0px;
    margin-top: -5px;
    transform: rotate(-45deg);
}

.close{
  cursor: pointer;
  position: absolute;
  left: 40px;
  margin-top: 15px;
  color: rgb(209, 39, 39);
  transition: color 0.2s;
}

.close:hover{
  color: rgb(146, 8, 8);
}

#nav-burger{
    width: 100%;
    height: 100%;
    background-image: url(./assets/body_background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    z-index: 1000;
    transition: all 0.5s;
    top:-100%;
}

#nav-burger.active{
    top:0%;
}

#nav-burger ul{
    width: 100%;
    height: auto;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
}

#nav-burger ul a{
    font-family: 'Ubuntu', sans-serif;
    color: white;
    font-size: 24px;
    text-align: center;
    width: auto;
    transition: all 0.4s;
    text-shadow: 1px 1px 1px rgba(16, 76, 87, 0.753);
}

#nav-burger ul a:hover{
    color:  rgb(21, 85, 97);
    text-shadow: none;
}

#nav-burger #links{
    min-width: 250px;
    height: auto;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}

#nav-burger #links a{
    font-family: 'Ubuntu', sans-serif;
    color: white;
    font-size: 18px;
    text-align: center;
    width: auto;
    transition: all 0.4s;
    text-shadow: 1px 1px 1px rgba(16, 76, 87, 0.753);
    float:left;
}

#nav-burger #links a:hover{
    color:  rgb(21, 85, 97);
    text-shadow: none;
}

.footer-front{
    background-image: url(./assets/body_background.jpg);
    font-family: 'Ubuntu', sans-serif;
    color: white;
    text-shadow: 1px 1px 1px rgba(16, 76, 87, 0.753);
}

.slide-fade-enter-active{
  transition: all .2s ease;
}

.slide-fade-leave-active{
  transition: all .2s ease-out;
}

.slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(80px);
        opacity: 0;
  }

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

@media all and (max-width: 1000px) {
    .nav-front a{
        font-size: 14px;
    }

    .nav-back{
        line-height: 0px;
    }
}

@media all and (max-width: 768px) {
    .logo{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .nav-front{
        box-shadow: none;
    }
}

</style>
