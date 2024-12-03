import { createRouter, createWebHistory } from 'vue-router'
import ingredientRoutes from './ingredientRoutes'
import orderRoutes from './orderRoutes'
import userRoutes from './userRoutes'
import product_categoryRoutes from './product_categoryRoutes'
import productRoutes from './productRoutes'
import supplierRoutes from './supplierRoutes'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    ...ingredientRoutes,
    ...orderRoutes
  ],
})

export default router
