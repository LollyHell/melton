<template>
  <div class="product-page" v-if="product">
    <div class="gallery">
  <div class="thumbnails">
    <img 
      v-for="(img, index) in galleryImages" 
      :key="index" 
      :src="img" 
      class="thumb" 
      @click="currentIndex = index" 
    />
  </div>
  <div class="main-image">
  <button class="arrow left" @click="prevImage">&larr;</button>
  <img :src="galleryImages[currentIndex]" :alt="product.name" />
  
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    :class="['fav_icon', { 'is-active': isFavorite }]" 
    @click="toggleFavorite"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>

  <button class="arrow right" @click="nextImage">&rarr;</button>
</div>
</div>

    <div class="product-details">
      <h1 class="prod_name">{{ product.name }}</h1>
      <p class="article">Артикул: KWB124SS</p>
      <p class="price">{{ product.price }} р</p>

      <div class="options">
        <p>Цвет</p>
        <div class="colors">
          <span v-for="color in product.colors" :key="color" :class="['color-cube', color]"></span>
        </div>

        <p>Размер</p>
        <div class="sizes">
          <button 
            v-for="size in ['XS', 'S', 'M', 'L', 'XL']" 
            :key="size" 
            :class="['size-btn', { active: selectedSize === size }]"
            @click="selectedSize = size"
          >
            {{ size }}
          </button>
        </div>
      </div>

      <p class="description">
        Удлиненная куртка из мягкого текстиля. Ткань приятная на ощупь,
        идеально подходит для повседневной носки.
      </p>

      <button 
        :class="['btn-cart', { 'btn-cart--added': isAdded }]" 
        @click="addToCart"
      >
        {{ isAdded ? 'Добавлено!' : 'В корзину' }}
      </button>
    </div>
  </div>

  <div v-else class="loading">
    Товар не найден...
  </div>
</template>

<style scoped>
.product-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
  max-width: 1100px;
  margin: 0 auto;
}

/* ГЛАВНОЕ: Фиксация галереи */
.gallery {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.main-image {
  position: relative;
  /* Теперь стрелки будут привязаны к этому блоку */
  flex-grow: 1;
}

.main-image img {
  width: 100%;
  display: block;
}

/* Новые стили для SVG-сердечка */
.fav_icon {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 5;
  
  /* Изначальное состояние: белая обводка, прозрачное внутри */
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  
  /* Плавный переход цвета при клике */
  transition: fill 0.3s ease, stroke 0.3s ease, transform 0.1s ease;
}

/* Эффект легкого уменьшения при клике (акцент на нажатие) */
.fav_icon:active {
  transform: scale(0.9);
}

/* Состояние, когда добавили в избранное (активный класс .is-active) */
.fav_icon.is-active {
  fill: #e63946;   /* Красивый сочный красный цвет заливки */
  stroke: #e63946; /* Обводка становится тоже красной */
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 50%;
  z-index: 10;
  color: #584a40;
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}


.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.thumb {
  width: 120px;
  height: 140px;
  cursor: pointer;
  object-fit: cover;
}

.product-details {
  display: flex;
  flex-direction: column;
}

.product-details {
  gap: 10px;
}

.prod_name {
  font-size: 30px;
  font-weight: 480;
  margin: 0;
}

.article {
  color: #888;
  font-size: 14px;
  margin: 0;
}

.price {
  font-weight: bold;
  font-size: 24px;
  margin: 0;
}

.description {
  font-size: 18px;
  font-weight: 300;
  margin: 10px 0;
}

.sizes {
  display: flex;
  gap: 10px;
}

.size-btn {
  padding: 8px 16px;
  border: 1.9px solid #584A40;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

/* Стили для выбранного размера */
.size-btn.active {
  background-color: #584A40;
  color: #fff;
}

/* Плавный переход для смены цвета и текста */
.btn-cart {
  width: 70%;
  padding: 12px;
  background: #584a40;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Стили, которые добавятся, когда товар залетит в корзину */
.btn-cart--added {
  background-color: #83695D; /* Меняем цвет на более мягкий/светлый */
  color: #fff;
}

.color-cube {
  width: 24px;
  height: 24px;
  display: inline-block;
  margin-right: 10px;
  border: 1px solid #eee;
}

.c1 {
  background-color: #221417;
}

.c2 {
  background-color: #FFFFFF;
  border: 1px solid #ccc;
}

.c3 {
  background-color: #584A40;
}

.c4 {
  background-color: #DAB88A;
}

.c5 {
  background-color: #DAE1D9;
}

.c6 {
  background-color: #565150;
}

.c7 {
  background-color: #2E2F3B;
}

.c8 {
  background-color: #670303;
}

.c9 {
  background-color: #B9B9B9;
}

.c10 {
  background-color: #EBEAE3;
}

.c11 {
  background-color: #83695D;
}

.c12 {
  background-color: #291B1B;
}

.c13 {
  background-color: #A28E74;
}

/* ==========================================
   АДАПТИВ ДЛЯ СТРАНИЦЫ ТОВАРА (ДО 768px)
   ========================================== */
@media screen and (max-width: 768px) {
  /* 1. Сбрасываем сетку в одну колонку */
  .product-page {
    display: flex !important;
    flex-direction: column !important;
    gap: 25px !important;
    padding: 15px !important;
    max-width: 100% !important;
  }

  /* 2. Перестраиваем галерею */
  .gallery {
    flex-direction: column-reverse !important; /* Текстовая инфа или миниатюры уйдут вниз, если нужно */
    gap: 10px !important;
    width: 100% !important;
  }

  /* Скрываем вертикальный ряд миниатюр на мобилках, чтобы не сжимал главную картинку.
     Пользователь всё равно может листать стрелочками! */
  .thumbnails {
    display: none !important;
  }

  /* Главный контейнер картинки во всю ширину */
  .main-image {
    width: 100% !important;
    position: relative;
  }

  .main-image img {
    width: 100% !important;
    height: auto !important;
    border-radius: 12px; /* Делаем красивое скругление как в каталоге */
    object-fit: cover;
  }

  /* Подправляем позиционирование стрелочек и сердечка */
  .arrow {
    width: 36px !important;
    height: 36px !important;
    font-size: 16px !important;
  }
  
  .fav_icon {
    top: 12px !important;
    right: 12px !important;
    width: 24px !important;
    height: 24px !important;
  }

  /* 3. Блок с информацией о товаре */
  .product-details {
    width: 100% !important;
    gap: 12px !important;
    padding: 0 5px;
  }

  .prod_name {
    font-size: 24px !important; /* Уменьшаем гигантский шрифт, чтобы влезал */
    font-weight: 500 !important;
    line-height: 1.2;
  }

  .article {
    font-size: 13px !important;
  }

  .price {
    font-size: 22px !important;
    margin-top: 2px !important;
  }

  /* Блоки выбора параметров */
  .options p {
    font-size: 14px !important;
    margin-bottom: 6px !important;
    margin-top: 10px !important;
  }

  .colors {
    display: flex;
    gap: 4px;
  }

  .color-cube {
    width: 22px !important;
    height: 22px !important;
    border-radius: 4px;
  }

  /* Кнопки размеров делаем чуть компактнее */
  .sizes {
    flex-wrap: wrap; /* Если размеров много, они аккуратно перенесутся */
    gap: 8px !important;
  }

  .size-btn {
    padding: 6px 12px !important;
    font-size: 13px !important;
    border-radius: 6px !important;
  }

  .description {
    font-size: 15px !important;
    line-height: 1.4 !important;
    font-weight: 400 !important;
    color: #444;
    margin: 15px 0 !important;
  }

  /* 4. Кнопка «В корзину» */
  .btn-cart {
    width: 100% !important; /* На мобилках кнопка должна быть на всю ширину экрана */
    height: 46px !important;
    font-size: 15px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-top: 5px;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref(null);
const currentIndex = ref(0);
const galleryImages = ref([]);
// Тот же массив, что в каталоге
const products = [
  { id: 1, name: 'Костюм Spirit&Rich', price: '11 700', imgSrc: '/photo/1.png', colors: ['c1', 'c2'] },
  { id: 2, name: 'Платье Soft', price: '4 400', imgSrc: '/photo/2.png', colors: ['c3', 'c4'] },
  { id: 3, name: 'Свитер White Zip', price: '2 100', imgSrc: '/photo/4.png', colors: ['c5', 'c6'] },
  { id: 4, name: 'Куртка Base Black', price: '7 800', imgSrc: '/photo/5.png', colors: ['c7', 'c8'] },
  { id: 5, name: 'Футболка Beige mood', price: '3 500', imgSrc: '/photo/3.png', colors: ['c2', 'c9'] },
  { id: 6, name: 'Комплект Vanilla', price: '4 900', imgSrc: '/photo/6.png', colors: ['c10', 'c11'] },
  { id: 7, name: 'Комплект Chocolate', price: '4 900', imgSrc: '/photo/7.png', colors: ['c1', 'c2'] },
  { id: 8, name: 'Джоггеры Chocolate', price: '6 400', imgSrc: '/photo/8.png', colors: ['c12', 'c13'] },
  { id: 9, name: 'Куртка Warm Beige', price: '9 000', imgSrc: '/photo/9.png', colors: ['c3', 'c4'] },
];


onMounted(() => { //функция которая выполн после загрузки страницы ОТКРЫВАЕТСЯ КАРТОЧКА ТОВАРА
  // Находим товар, ID которого совпадает с ID в адресной строке
  const id = parseInt(route.params.id); //парсинт конвертирует строку в число
  const found = products.find(p => p.id === id);
  product.value = found;

  // Инициализируем галерею (например, 3 картинки)
  galleryImages.value = [found.imgSrc, found.imgSrc, found.imgSrc];
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  // Если ID текущего товара есть в этом массиве — подсвечиваем сердечко красным
  isFavorite.value = favorites.includes(id);
});

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % galleryImages.value.length;
};

// Переменная состояния: false — не в избранном, true — в избранном
const isFavorite = ref(false);

// Функция переключения состояния
const toggleFavorite = () => {
  const id = parseInt(route.params.id);
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (isFavorite.value) {
    // Если уже в избранном — удаляем из массива памяти
    favorites = favorites.filter(favId => favId !== id);
    isFavorite.value = false;
  } else {
    // Если товара нет в избранном — добавляем его ID
    favorites.push(id);
    isFavorite.value = true;
  }

  // Сохраняем обновленный массив обратно в localStorage в виде строки
  localStorage.setItem('favorites', JSON.stringify(favorites));
};


// Переменная для анимации кнопки корзины
const isAdded = ref(false);

const selectedSize = ref('M');

const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // 1. ИЩЕМ ДУБЛИКАТ: Теперь проверяем И совпадение ID, И совпадение размера!
  const existingItem = cart.find(item => item.id === product.value.id && item.size === selectedSize.value);

  if (existingItem) {
    // Если совпал и товар, и размер — просто увеличиваем количество
    existingItem.quantity += 1;
  } else {
    // Если такого размера ещё нет — создаём новую отдельную карточку
    cart.push({
      id: product.value.id,
      name: product.value.name,
      price: parseInt(product.value.price.replace(/\s/g, '')),
      imgSrc: product.value.imgSrc,
      color: product.value.colors[0],
      size: selectedSize.value, // 2. ПЕРЕДАЕМ ПЕРЕМЕННУЮ: Вместо жесткой 'M' берем выбранный размер
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  // --- АНИМАЦИЯ КНОПКИ ВМЕСТО АЛЕРТА ---
  isAdded.value = true;

  setTimeout(() => {
    isAdded.value = false;
  }, 1500);
};


</script>

