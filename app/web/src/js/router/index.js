import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import NotFound from '@/components/NotFound'

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
