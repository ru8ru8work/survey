import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Front',
      name: 'Front',
      component: () => import('../views/Front.vue')
    },
    {
      path: '/Front/Answer',
      name: 'FrontAnswer',
      component: () => import('../views/FrontAnswer.vue')
    },
    {
      path: '/Back',
      name: 'Back',
      component: () => import('../views/Back.vue')
    },
    {
      path: '/Back/Create',
      name: 'BackCreate',
      component: () => import('../views/BackCreate.vue')
    },
  ]
})

export default router
