<template>
  <div class="info-page">
    <h1>{{ currentDoc.title }}</h1>
    <div class="info-content">
      <div v-html="currentDoc.content"></div>
    </div>
    <a href="#" @click.prevent="goBack" class="back-link">&larr; Вернуться назад</a>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'; // Добавили useRouter

const route = useRoute();
const router = useRouter(); // Инициализируем роутер

// Функция возврата на предыдущую страницу
function goBack() {
  router.back();
}

// Рыба-текст для твоих документов
const docsData = {
  'delivery': {
    title: 'Условия доставки и возврата',
    content: '<p>Мы доставляем товары по всей России силами СДЭК и Почты России.</p><p>Срок возврата товара надлежащего качества составляет 14 дней с момента получения, если сохранен его товарный вид и этикетки.</p>'
  },
  'legal': {
    title: 'Правовая информация',
    content: '<p>Защита персональных данных и интеллектуальная собственность бренда MELTON.</p><p>Все материалы, текстовые и графические элементы сайта являются собственностью владельцев проекта.</p>'
  },
  'offer': {
    title: 'Договор оферты',
    content: '<p>Публичная оферта интернет-магазина MELTON.</p><p>Оплачивая заказ на нашем сайте, вы автоматически соглашаетесь с условиями продажи, обработки данных и правилами доставки, изложенными в данном документе.</p>'
  }
};

// Вычисляем, какой документ открыть на основе параметра из ссылки
const currentDoc = computed(() => {
  const slug = route.params.type;
  return docsData[slug] || { title: 'Документ не найден', content: '<p>Запрашиваемая страница не существует.</p>' };
});
</script>

<style scoped>
.info-page {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 40px;
  color: #584a40;
}
h1 {
  font-size: 32px;
  margin-bottom: 30px;
  font-weight: bold;
}
.info-content {
  font-size: 16px;
  line-height: 1.6;
  font-weight: 300;
  margin-bottom: 40px;
}
/* Стили для параграфов внутри v-html */
:deep(p) {
  margin-bottom: 15px;
}
.back-link {
  color: #584a40;
  text-decoration: none;
  border-bottom: 1px solid #584a40;
  cursor: pointer; /* Чтобы при наведении была рука */
}
</style>