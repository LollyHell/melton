import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import catalog from './views/catalog.vue'
import Product from './views/Product.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/catalog', component: catalog },
  { path: '/product/:id', component: Product } // :id динамический параметр для разных товаров
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router