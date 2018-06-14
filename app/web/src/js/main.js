import { BASE_DIR } from '../constants.yml'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
