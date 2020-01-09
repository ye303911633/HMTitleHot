import Vue from 'vue'
import Router from 'vue-router'
import '@/styles/reset.css'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    },
    {
      path: '/personal/:id',
      name: 'Personal',
      component: () => import('@/views/Personal')
    },
    {
      path: '/editprofile',
      name: 'Editprofile',
      component: () => import('@/views/Editprofile')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register')
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('@/views/Article')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/personal') === 0) {
    let token = localStorage.getItem('token')
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
