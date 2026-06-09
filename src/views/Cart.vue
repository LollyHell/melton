<template>
  <div class="cart-page">
    <h1>Моя корзина</h1>

    <div v-if="cartItems.length > 0" class="cart-container">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.imgSrc" :alt="item.name" class="item-img" />
          
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-meta">Размер: {{ item.size }} | Цвет: <span :class="['color-preview', item.color]"></span></p>
            <p class="item-price">{{ item.price }} р</p>
          </div>

          <div class="item-quantity">
            <button @click="decreaseQty(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQty(item)">+</button>
          </div>

          <button class="btn-delete" @click="removeItem(item)">×</button>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Итого</h2>
        <div class="summary-row">
          <span>Количество товаров:</span>
          <span>{{ totalItems }} шт.</span>
        </div>
        <div class="summary-row total">
          <span>Сумма к оплате:</span>
          <span>{{ totalPrice }} р</span>
        </div>
        <button class="btn-checkout" @click="checkout">Оформить заказ</button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Ваша корзина пуста :(</p>
      <router-link to="/catalog" class="back-link">Перейти в каталог</router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Создаем инстанс axios, чтобы постоянно не писать полный URL бекенда
const api = axios.create({
  // Собираем из твоего base_url и общей части путей (path)
  baseURL: 'http://localhost/clothes-store/api/v1', 
  
  // Примечание: Если твой бекенд запущен на порту (например, 8000), 
  // то пиши вот так: 'http://localhost:8000/clothes-store/api/v1'
  
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

const cartItems = ref([]);
const isLoading = ref(false);
const isError = ref(false);

// 1. Загрузка корзины с бекенда
const loadCart = async () => {
  isLoading.value = true;
  isError.value = false;
  try {
    const response = await api.get('/cart'); // Твой эндпоинт, например GET /api/cart
    cartItems.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке корзины:', error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadCart();
});

// 2. Изменение количества товара (Плюс)
const increaseQty = async (item) => {
  const oldQty = item.quantity;
  item.quantity++; // Оптимистичный апдейт (пользователь сразу видит изменения)
  
  try {
    // Отправляем на бек ID товара и новую дату (или обновляем через PUT/PATCH)
    await api.patch(`/cart/${item.id}`, { 
      quantity: item.quantity,
      size: item.size // Передаем размер, если ключ составной
    });
  } catch (error) {
    console.error('Не удалось обновить количество:', error);
    item.quantity = oldQty; // Если бек упал — возвращаем как было
  }
};

// 3. Изменение количества товара (Минус)
const decreaseQty = async (item) => {
  if (item.quantity > 1) {
    const oldQty = item.quantity;
    item.quantity--;
    
    try {
      await api.patch(`/cart/${item.id}`, { 
        quantity: item.quantity,
        size: item.size
      });
    } catch (error) {
      console.error('Не удалось обновить количество:', error);
      item.quantity = oldQty;
    }
  }
};

// 4. Полное удаление товара из корзины
const removeItem = async (targetItem) => {
  const oldCart = [...cartItems.value];
  // Сразу убираем из интерфейса
  cartItems.value = cartItems.value.filter(item => 
    !(item.id === targetItem.id && item.size === targetItem.size)
  );
  
  try {
    // Шлем DELETE запрос. Если на беке удаление завязано и на ID, и на размер:
    await api.delete(`/cart/${targetItem.id}`, {
      data: { size: targetItem.size }
    });
  } catch (error) {
    console.error('Не удалось удалить товар:', error);
    cartItems.value = oldCart; // Откатываем назад при ошибке
  }
};

/* СЧИТАЕМ ИТОГИ НА КЛИЕНТЕ (так быстрее, чем дергать бек ради математики) */
const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

// 5. Отправка заказа (Оформить заказ)
const checkout = async () => {
  try {
    const response = await api.post('/orders', {
      items: cartItems.value,
      total: totalPrice.value
    });
    alert('Заказ успешно оформлен!');
    cartItems.value = []; // Очищаем корзину после успешной покупки
  } catch (error) {
    console.error('Ошибка при оформлении заказа:', error);
    alert('Произошла ошибка при оформлении. Попробуйте позже.');
  }
};
</script>

<style scoped>
.cart-page {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

h1, h2 {
  color: #584a40;
}

.cart-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-top: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  position: relative;
}

.item-img {
  width: 80px;
  height: 100px;
  object-fit: cover;
}

.item-details {
  flex-grow: 1;
}

.item-details h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
}

.item-meta {
  color: #888;
  font-size: 14px;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.color-preview {
  width: 14px;
  height: 14px;
  display: inline-block;
  border: 1px solid #ccc;
}

/* Копируем цвета, чтобы они отображались в кружочках */
.c1 { background-color: #221417; }
.c2 { background-color: #FFFFFF; }
.c3 { background-color: #584A40; }

.item-price {
  font-weight: bold;
  margin: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-quantity button {
  width: 30px;
  height: 30px;
  border: 1px solid #584a40;
  background: none;
  cursor: pointer;
  border-radius: 4px;
}

.btn-delete {
  background: none;
  border: none;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 15px;
}

.btn-delete:hover {
  color: #e63946;
}

/* Стили для правого блока с чеком */
.cart-summary {
  background: #fcfbfa;
  padding: 30px;
  border-radius: 4px;
  height: fit-content;
  border: 1px solid #f0edea;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #555;
}

.summary-row.total {
  border-top: 1px solid #eee;
  padding-top: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #584a40;
}

.btn-checkout {
  width: 100%;
  padding: 12px;
  background: #584a40;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  transition: opacity 0.2s;
}

.btn-checkout:hover {
  opacity: 0.9;
}

.empty-cart {
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

/* ================= АДАПТИВ ДЛЯ МОБИЛОК ================= */

/* Для планшетов и мелких экранов (перестраиваем в одну колонку) */
@media screen and (max-width: 768px) {
  .cart-page {
    padding: 20px 15px; /* Уменьшаем огромные дефолтные паддинги */
  }

  .cart-container {
    grid-template-columns: 1fr; /* Больше никакого деления на 2 колонки сбоку */
    gap: 25px;
  }

  /* Блок с чеком теперь идет на всю ширину под товарами */
  .cart-summary {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
}

/* Жесткий фикс конкретно под узкие экраны (iPhone SE, гаджеты до 414px) */
@media screen and (max-width: 414px) {
  h1 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  /* Карточка товара на мелких экранах */
  .cart-item {
    flex-wrap: wrap; /* Разрешаем элементам падать на новую строку, если узко */
    gap: 12px;
    padding: 12px;
  }

  .item-img {
    width: 65px; /* Чуть уменьшаем картинку */
    height: 85px;
  }

  .item-details {
    /* Растягиваем детали, чтобы кнопки управления ушли под них или встали компактно */
    min-width: 140px; 
  }

  .item-details h3 {
    font-size: 15px;
  }

  /* Кнопки плюс-минус сдвигаем в правый нижний угол или аккуратно центрируем */
  .item-quantity {
    gap: 10px;
    margin-left: auto; /* Прижимает управление количеством вправо */
  }

  .item-quantity button {
    width: 26px;
    height: 26px;
  }

  /* Исправление ломающегося текста в чеке "Итого" */
  .cart-summary h2 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 15px;
  }

  .summary-row {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .summary-row.total {
    font-size: 16px; /* Уменьшаем размер шрифта, чтобы "Сумма к оплате" и цена не переносились уродливо */
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap; /* Запрещаем перенос строк внутри этой строки */
  }

  .summary-row.total span {
    white-space: normal; /* Разрешаем дефолт, но за счет flex-пространства всё влезет */
  }

  .btn-checkout {
    padding: 14px;
    font-size: 15px;
  }
}
</style>