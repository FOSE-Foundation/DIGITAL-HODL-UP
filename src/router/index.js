import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: () => import('../views/gameBoard.vue')
    },
    {
      path: '/end',
      name: 'end',
      component: () => import('../views/end.vue')
    }
  ]
})

export default router
