import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Den from '../components/Den.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/den',
      name: 'den',
      component: Den
    },
    {
      path: '/error/404',
      name: 'error.404',
      component: NotFound
    },
    {
      path: '*',
      redirect: { name: 'error.404' }
    }
  ]
})
