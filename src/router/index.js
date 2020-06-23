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
    name: 'Team',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamShow.vue')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import(/* webpackChunkName: "about" */ '../views/GroupsPage.vue')
  },
  {
    path: '/matchs/:id',
    name: 'MatchShow',
    component: () => import(/* webpackChunkName: "about" */ '../views/MatchShow.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
