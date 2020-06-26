<template>
  <div id="app">
      <div id="nav" class="navbar navbar-expand-md nav-front">
        <router-link to="/">
          <img class="navbar-brand logo" :src="logo" width="35" height="50" alt="">
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
         <li v-if="token !== null" class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" id="accountDropdownLink">
               <img :src="unknow" alt="avatar de" class="avatar-mini">
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="accountDropdownLink">
               <router-link class="dropdown-item" to="">Mon profil</router-link>
               <a v-if="roles.includes('ROLE_ADMIN')" href="http://www.symfoot.maxime-gh.com/admin/matchs" class="dropdown-item">Administration</a>
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
        <ul>
            <router-link class="nav-item nav-link" to="/">Accueil</router-link>
            <router-link class="nav-item nav-link" to="/teams">Equipes</router-link>
            <router-link class="nav-item nav-link" to="/stadiums">Stades</router-link>
            <router-link class="nav-item nav-link" to="/groups">Classements & Résultats</router-link>
            <router-link class="nav-item nav-link" to="/stages">Phase finale</router-link>
        </ul>
        <div v-if="token == null" id="links">
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
import authAPI from './services/authAPI'
import jwtDecode from 'jwt-decode'

const token = window.localStorage.getItem('authToken')
var roles = null
if (token != null) {
  const jwtData = jwtDecode(token)
  roles = jwtData.roles
}

export default {
  data () {
    return {
      token: token,
      roles: roles,
      logo: require('./assets/UEFA_Euro_2020_Logo_White.svg.png'),
      unknow: require('./assets/unknow.jpg')
    }
  },
  methods: {
    handleLogout () {
      authAPI.logout()
      this.$router.push({ path: '/login' })
    },
    openMenu () {
      const burger = document.querySelectorAll('nav .burger')[0]
      const nav = document.querySelectorAll('#nav-burger')[0]

      nav.classList.toggle('active')
      burger.classList.toggle('active')
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

.nav-front{
    background-image: url(./assets/body_background.jpg);
    box-shadow: 1px 1px 3px rgba(21, 78, 88, 0.7);
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

</style>
