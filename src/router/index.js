import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/teams',
    name: 'Teams',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamsPage.vue')
  },
  {
    path: '/teams/:id',
    name: 'TeamShow',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamShow.vue')
  },
  {
    path: '/stadiums',
    name: 'Stadiums',
    component: () => import(/* webpackChunkName: "about" */ '../views/StadiumsPage.vue')
  },
  {
    path: '/stadiums/:id',
    name: 'StadiumShow',
    component: () => import(/* webpackChunkName: "about" */ '../views/StadiumShow.vue')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import(/* webpackChunkName: "about" */ '../views/GroupsPage.vue')
  },
  {
    path: '/stages',
    name: 'Stages',
    component: () => import(/* webpackChunkName: "about" */ '../views/StagesPage.vue')
  },
  {
    path: '/matchs/:id',
    name: 'MatchShow',
    component: () => import(/* webpackChunkName: "about" */ '../views/MatchShow.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
