import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Den from '@/components/Den'
import God from '@/components/God'
import NotFound from '@/components/NotFound'

Vue.use(Router)
Vue.mixin(God)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
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
