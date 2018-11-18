import Vue from 'vue'
import Router from 'vue-router'

import Home from '../page/OutGame.vue'
import Den from '../page/InGame.vue'
import NotFound from '../page/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Den
    },
    {
      path: '/den/:level',
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
