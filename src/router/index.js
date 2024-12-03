import { createRouter, createWebHistory } from 'vue-router'
import ingredientRoutes from './ingredientRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    ...ingredientRoutes
  ],
})

export default router
