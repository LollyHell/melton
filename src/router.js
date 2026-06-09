import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import Catalog from './views/Catalog.vue'
import ProductDetail from './views/ProductDetail.vue'
import Favorites from './views/Favorites.vue'
import Cart from './views/Cart.vue'
// 1. Импортируем аккуратно, имя переменной пишем с большой буквы
import InfoView from './components/InfoView.vue'

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: HomeView 
  }, 
  { 
    path: '/catalog', 
    name: 'catalog',
    component: Catalog 
  },
  { 
    path: '/product/:id', 
    name: 'product-detail', 
    component: ProductDetail 
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/info/:type',
    name: 'info',
    component: InfoView
  }
]

const router = createRouter({
  history: createWebHistory(), // штмл 5 чтоб сайт не перезагружался и не было ссылок длинных с #
  routes,
  
  // ДОБАВИЛ ЭТОТ БЛОК ДЛЯ С К Р О Л Л А К С Е К Ц И Я М
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // Возвращаем селектор элемента (например, '#about_us') и включаем плавность
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // Если кликнули просто на обычную ссылку без хэша — скроллим в самый верх
    return { top: 0 }
  }
})

export default router // чтоб импортировать на стр