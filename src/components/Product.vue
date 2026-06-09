<template>
  <div class="product_card">
    <div class="img_wrapper">
      <img :src="product.imgSrc" :alt="шмотка" class="product_img">
      <div class="color_palette">
        <!-- из каталога взял src="product.imgSrc-->
        <span 
          v-for="color in product.colors" 
          :key="color" 
          :class="['color_pal', color]"
        ></span>
        <!--key это уникальный идентификатор паллеток на карточке. если поменять порядок он не потеряет карточку-->
        <!--и массив классов [базовый класс, динамич класс, который стили ставит]-->
        <!--двоеточние==параметр делает строку команду JS, тут JS-массив/ v-bind-директива динамич привязки атрибутом html -->
      </div>
      
    </div>

    <div class="product_info">
      <span class="product_name">{{ product.name }}</span>
      <p class="product_price">{{ product.price.toLocaleString('ru-RU') }} р</p>
    </div>

    <div class="product_actions">
  <!-- Оберни кнопку в router-link -->
  <router-link :to="{ name: 'product-detail', params: { id: product.id } }">
    <button class="btn btn_more">Подробнее</button>
  </router-link>
  
  <button class="btn btn_cart">В корзину</button> <!--btn это Блок Элемент Модификатор отвечает за все кнопки-->
</div>
  </div>
</template>

<script setup>
// Принимаем объект товара из родительского компонента
//макрос или функция который передает входные параметры для компонента.. макрос- функц которая выполн на этапе сборки
defineProps({ 
  product: Object
});
</script>

<style scoped>

.product_card {
  width: 100%;
  display: flex;
  flex-direction: column;

}


.img_wrapper {
  position: relative;
  width: 100%;
}

.product_img {
  width: 90%;
  height: auto;
  display: block;
}

.color_palette {
  position: absolute;
  bottom: 1vw;
  right: 3.5vw;
  display: flex;
  gap: 8px;
  z-index: 2;
}

.color_pal {
  width: 16px;
  height: 16px;
  display: inline-block;
  cursor: pointer;
}

.c1 { background-color: #221417; }
.c2 { background-color: #FFFFFF; border: 1px solid #ccc; }
.c3 { background-color: #584A40; }
.c4 { background-color: #DAB88A; }
.c5 { background-color: #DAE1D9; }
.c6 { background-color: #565150; }
.c7 { background-color: #2E2F3B; }
.c8 { background-color: #670303; }
.c9 { background-color: #B9B9B9; }
.c10 { background-color: #EBEAE3; }
.c11 { background-color: #83695D; }
.c12 { background-color: #291B1B; }
.c13 { background-color: #A28E74; }

.product_info {
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: baseline; /* Выравнивает текст названия и цены строго по одной нижней линии */
}

.product_price { font-weight: bold; }

.product_actions {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 90%;
}

.btn { height: 47px; font-size: 15px; cursor: pointer; border: none; }
.btn_more { color: #584a40; border: 1px solid #584a40; background: none; }
.btn_cart { color: #fff; background-color: #584a40; }
/* 1. Убираем любые дефолтные стили ссылок для нашего router-link */
.product_actions a {     
  text-decoration: none;
}

.btn { 
  width: 100%;          
}


@media screen and (max-width: 768px) {
  .color_palette {
  bottom: 3%;
  right: 4%;
}

}
@media screen and (max-width: 768px) {
  /* 1. Главный контейнер карточки */
  .product_card {
    width: 100% !important;
    max-width: 420px;       /* Ограничиваем ширину, чтобы на лопатах не растягивало в бесконечность */
    margin: 0 auto !important; /* Центрируем карточку на экране Самсунга/Айфона */
    padding: 10px;
    box-sizing: border-box;
  }

  /* 2. Обёртка картинки и сама картинка */
  .img_wrapper {
    width: 100% !important; /* На мобилках картинка встает во всю ширину карточки */
  }

  .product_img {
    width: 100% !important; /* Убираем 90%, делаем на 100% ширины */
    height: auto;
  }

 
  /* 4. Блок информации (Название и Цена) */
  .product_info {
    width: 100% !important;  /* Растягиваем на 100% */
    margin-top: 12px;
    margin-bottom: 12px;
    flex-direction: row;     /* Строго в одну строчку */
    justify-content: space-between;
    align-items: flex-start; /* Если название длинное, цена останется сверху */
    gap: 15px;
  }

  .product_name {
    font-size: 16px;
    line-height: 1.3;
    color: #333;
  }

  .product_price {
    font-size: 16px;
    white-space: nowrap;     /* Цена "11 700 р" больше никогда не развалится на две строки */
  }

  /* 5. Кнопки «Подробнее» и «В корзину» */
  .product_actions {
    display: flex !important;
    flex-direction: row !important; /* Выстраиваем кнопки в один ряд на мобилках */
    gap: 10px !important;           /* Расстояние между ними */
    width: 100% !important;         /* Кнопки занимают всю ширину карточки */
  }

  /* router-link обёртка для кнопки "Подробнее" */
  .product_actions a {
    flex: 1 !important;             /* Даем ссылке занять ровно половину ширины */
    display: block;
  }

  .btn {
    width: 100% !important;
    height: 40px !important;       
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;          
  }

  .btn_cart {
    flex: 1 !important;             /* Кнопка корзины занимает вторую половину ширины */
  }
}
</style>