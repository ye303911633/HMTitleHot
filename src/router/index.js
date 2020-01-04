import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import '@/styles/reset.css'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/personal',
      name: 'Personal',
      component: () => import('@/views/Personal')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/personal') === 0) {
    let token = localStorage.getItem('Personal')
    if (token) {
      next()
    } else {
      next({name: 'Login'})
    }
  } else {
    next()
  }
})

export default router
