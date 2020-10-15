import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import authAPI from './services/authAPI'
import setupInterceptors from './services/httpInterceptors'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

Vue.config.productionTip = false

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
})

Vue.use(VueToast)

authAPI.setup()
authAPI.isAuthenticated()

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    setupInterceptors(store)
  }
}).$mount('#app')
