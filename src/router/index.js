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
    },
    {
      path: '/attention',
      name: 'Attention',
      component: () => import('@/views/Attention')
    },
    {
      path: '/collect',
      name: 'Collect',
      component: () => import('@/views/Collect')
    },
    {
      path: '/comment/:id',
      name: 'Comment',
      component: () => import('@/views/Comment')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/Search')
    },
    {
      path: '/tabs',
      name: 'Tabs',
      component: () => import('@/views/Tabs')
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
