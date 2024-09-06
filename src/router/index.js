import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import SignUpView from '../views/SignView.vue'
// import TodosView from '../views/TodosView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/SignView.vue'),
      children: [
        {
          path: '',
          name: 'singin',
          component: () => import('../views/sign/SignInView.vue')
        },
        {
          path: '/singup',
          name: 'singup',
          component: () => import('../views/sign/SignUpView.vue')
        }
      ]
    },
    {
      path: '/Todos',
      name: 'Todos',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TodosView.vue')
    },
    // {
    //   path: '/sign',
    //   name: 'sing',
    //   component: () => import('../views/SignView.vue'),
    //   children: [
    //     {
    //       path: 'singin',
    //       name: 'singin',
    //       component: () => import('../views/sign/SignInView.vue')
    //     },
    //     {
    //       path: 'singup',
    //       name: 'singup',
    //       component: () => import('../views/sign/SignUpView.vue')
    //     }
    //   ]
    // }
  ]
})

export default router
