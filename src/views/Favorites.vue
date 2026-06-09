<template>
  <div class="favorites-page">
    <h1>Избранное</h1>
    
    <div v-if="favoriteProducts.length > 0" class="products_grid">
      <Product v-for="item in favoriteProducts" :key="item.id" :product="item" />
    </div>
    
    <div v-else class="empty-favorites">
      <p>В избранном пока ничего нет :(</p>
      <router-link to="/" class="back-link">Вернуться в каталог</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Product from '../components/Product.vue'; // Проверь путь до своего компонента карточки!

// Тот же самый глобальный массив товаров (имитация базы данных)
const products = [
  { id: 1, name: 'Костюм Spirit&Rich', price: 11700, imgSrc: '/photo/1.png', colors: ['c1', 'c2'] },
  { id: 2, name: 'Платье Soft', price: 4400, imgSrc: '/photo/2.png', colors: ['c3', 'c4'] },
  { id: 3, name: 'Свитер White Zip', price: 2100, imgSrc: '/photo/4.png', colors: ['c5', 'c6'] },
  { id: 4, name: 'Куртка Base Black', price: 7800, imgSrc: '/photo/5.png', colors: ['c7', 'c8'] },
  { id: 5, name: 'Футболка Beige mood', price: 3500, imgSrc: '/photo/3.png', colors: ['c2', 'c9'] },
  { id: 6, name: 'Комплект Vanilla', price: 4900, imgSrc: '/photo/6.png', colors: ['c10', 'c11'] },
  { id: 7, name: 'Комплект Chocolate', price: 4900, imgSrc: '/photo/7.png', colors: ['c1', 'c2'] },
  { id: 8, name: 'Джоггеры Chocolate', price: 6400, imgSrc: '/photo/8.png', colors: ['c12', 'c13'] },
  { id: 9, name: 'Куртка Warm Beige', price: 9000, imgSrc: '/photo/9.png', colors: ['c3', 'c4'] },
];

const favoriteProducts = ref([]);

onMounted(() => {
  // 1. Достаем массив ID лайкнутых товаров из памяти браузера
  const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  // 2. Фильтруем наш общий массив: оставляем только те товары, чьи ID есть в списке избранного
  favoriteProducts.value = products.filter(p => favoriteIds.includes(p.id));
});
</script>

<style scoped>
.favorites-page {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #584a40;
  margin-bottom: 30px;
}

/* Используем твою же проверенную сетку из каталога */
.products_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.empty-favorites {
  text-align: center;
  margin-top: 80px;
  font-size: 18px;
  color: #888;
}

.back-link {
  display: inline-block;
  margin-top: 15px;
  color: #584a40;
  text-decoration: none;
  border-bottom: 1px solid #584a40;
}
</style>