<template>
  <header>
    <div class="left">
      <img src="/photo/radix-icons_hamburger-menu.png" alt="меню" @click="toggleMenu">
    </div>
    <div class="center">
      <img src="/photo/logo.png" alt="логотип" @click="goHome">
    </div>
    <div class="right">
      <router-link to="/favorites" class="header_btn header_btn--fav">
        <img src="/photo/Vector.png" alt="избранное" class="header_icon">
      </router-link>
      
      <router-link to="/cart" class="header_btn header_btn--cart">
        <img src="/photo/Group.png" alt="моя корзина" class="header_icon">
      </router-link>
    </div>
  </header>

  <div class="menu_popup" :class="{ show: isMenuOpen }">
    <div class="menu_bg" @click="closeMenu"></div>
    <div class="menu_content">
      <div class="menu_cross" @click="closeMenu">×</div>
      <nav class="menu_nav">
        <router-link to="/" @click="closeMenu">Главная</router-link>
        <router-link :to="{ path: '/', hash: '#about_us' }" @click="closeMenu">О нас</router-link>
        <router-link to="/catalog" @click="closeMenu">Каталог</router-link>
        <router-link :to="{ path: '/', hash: '#contact_section' }" @click="closeMenu">Связаться с нами</router-link>
      </nav>
    </div>
  </div>

  <RouterView />

  <footer class="footer">
    <div class="footer_container">
      <div class="footer_brand">
        <div class="logo_footer">
          <img src="/photo/logo.png" alt="логотип">
        </div>
        <div class="footer_socials">
          <div class="tg">
            <img src="/photo/tg.png" alt="телеграм">
          </div>
          <div class="ig">
            <img src="/photo/ig.png" alt="инстаграм">
          </div>
          <div class="pt">
            <img src="/photo/mdi_pinterest.png" alt="пинтерест">
          </div>
        </div>
      </div>

      <div class="footer_links">
        <div class="footer_column">
          <router-link to="/">Главная</router-link>
          <router-link :to="{ path: '/', hash: '#about_us' }">О нас</router-link>
          <router-link to="/catalog">Каталог</router-link>
          <router-link :to="{ path: '/', hash: '#contact_section' }">Связаться с нами</router-link>
        </div>
        
        <div class="footer_column">
          <span class="footer_title">Покупателям</span>
          <router-link to="/info/delivery">Условия доставки и возврата</router-link>
          <router-link to="/info/legal">Правовая информация</router-link>
          <router-link to="/info/offer">Договор оферты</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

provide('isMenuOpen', isMenuOpen)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function closeMenu() {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

function goHome() {
  router.push('/')
}
</script>

<style scoped>
header {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center; 
}

.center {
  display: flex;
  justify-content: center;
}

.left {
  display: flex;
  width: 50px;     
}

.left img {
  width: 50%;
  height: 70%;
  cursor: pointer;
}

.left img:hover {
  opacity: 0.7;
}

.center img {
  width: 60%;
  height: auto;
  cursor: pointer;
}

/* Контейнер для иконок */
/* Контейнер для кнопок в шапке */
.right {
  display: flex;
  gap: 20px;
  align-items: center;
}

/* Общий класс для ссылок-кнопок, чтобы флексили ровно по центру */
.header_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
}

/* Конкретный размер под рамку сердечка */
.header_btn--fav {
  width: 32px;
}

/* Конкретный размер под рамку сумки */
.header_btn--cart {
  width: 38px;
}

/* Сами картинки внутри кнопок */
.header_icon {
  width: 100%;
  height: auto;
  object-fit: contain;
  cursor: pointer;
  transition: opacity 0.2s;
}

.header_icon:hover {
  opacity: 0.7;
}

/* Настройки для сумки-корзины (делаем её покрупнее, например 38px) */
.cart_icon_main {
  width: 38px;
  height: auto;
  cursor: pointer;
  object-fit: contain;
}

/* Пробиваем любые ограничения для контейнера */
.link_fav {
  width: 32px !important;
  height: 32px !important;
  display: flex !important;
}


/* Общие правила для картинок внутри правого блока, чтобы они не ломались */
.right img {
  width: 70%;
  height: auto;
  cursor: pointer;
  transition: opacity 0.2s;
  object-fit: contain;
}

.right img:hover {
  opacity: 0.7;
}
/* Задаем фиксированный аккуратный размер для иконок */
.header_icon_link {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}


/* меню всплывает по центру */
/* Находим .menu_popup и обновляем */
.menu_popup {
  position: fixed !important; /* Принудительно fixed независимо от роутера */
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;    /* На всю ширину вьюпорта */
  height: 100vh !important;   /* На всю высоту вьюпорта */
  z-index: 99999 !important;  /* Поднимаем на самый верхний слой на сайте */
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}

/* Находим .menu_content и обновляем */
.menu_content {
  position: relative !important;
  background: #fff;
  padding: 60px 50px;
  min-width: 300px;
  z-index: 100000 !important; /* Контент меню строго над подложкой */
}

.menu_popup.show {
  opacity: 1;
  visibility: visible;
}

.menu_bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.menu_content {
  position: relative;
  background: #fff;
  padding: 60px 50px;
  min-width: 300px;
  z-index: 1001;
}

.menu_cross {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 32px;
  cursor: pointer;
  color: #584a40;
  line-height: 1;
}

.menu_cross:hover {
  opacity: 0.7;
}

.menu_nav {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.menu_nav a {
  text-decoration: none;
  color: #333;
  font-size: 20px;
  transition: color 0.2s;
}

.menu_nav a:hover {
  color: #584a40;
}

.menu_nav a.router-link-active {
  color: #584a40;
  font-weight: bold;
}
</style>

<style> 
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
html {
  scroll-behavior: smooth;
}

* {
  font-family: 'Roboto Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding: 0 70px;     
}

.center {
  display: flex;
  justify-content: center; 
}

.left {
  display: flex;
  width: 50px;         
}

.left img {
  width: 50%;
  height: 70%;
}

.center img {
  width: 60%;
  height: auto;
}

/* УДАЛИЛ ОТСЮДА СТАРЫЙ БЛОК .right И .right img, КОТОРЫЙ ВСЁ ЛОМАЛ */

.footer {
  width: 100%;
  padding: 60px 0;
  margin-top: 100px;
}

.footer_container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 70px;
  box-sizing: border-box;
}

.footer_brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logo_footer img {
  width: 60%;
  height: auto;
}

.footer_socials {
  display: flex;
  gap: 20px;
}

.tg, .ig, .pt {
  width: 48px; 
  height: 48px; 
  display: flex;
  justify-content: center; 
  align-items: center;   
}

.footer_links {
  display: flex;
  gap: 80px;
}

.footer_column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer_column a {
  color: #584a40;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.2s;
}

.footer_column a:hover {
  opacity: 0.7;
}

.footer_title {
  font-weight: bold;
  color: #584a40;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  header {
    margin-top: 20px;
    padding: 0 20px;
    position: relative; /* Фиксируем контекст шапки */
    z-index: 10;
  }

  /* Бургер-меню (левая часть) */
  .left {
    width: 40px;
    display: flex;
    align-items: center;
  }
  
  .left img {
    width: 30px; 
    height: 30px;
    object-fit: contain; /* Чтобы картинка бургера не сплющивалась */
  }
  
  /* ... остальные твои мобильные стили для .center, .right и футера ... */
}
@media screen and (max-width: 768px) {



  /* Логотип (центр) */
  .center img {
    width: 100px; /* Уменьшаем логотип, чтобы он не был гигантским */
  }

  /* Кнопки избранного и корзины (правая часть) */
  .right {
    gap: 15px;
  }
  
  .header_btn {
    width: 28px !important; /* Принудительно задаем размер контейнеру */
  }

  .header_icon {
    width: 24px; /* Размер иконки внутри */
    height: 24px;
  }
}

  /* 1. Футер целиком: меняем направление на колонку */
  .footer_container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 0 20px;
  }

  /* 2. Логотип и соцсети (общий блок бренда) */
  .footer_brand {
    align-items: center;
    gap: 30px;
  }

  /* Соцсети меньше и ниже */
  .footer_socials {
    display: flex;
    gap: 45px;
  }

  .logo_footer{
    display: flex;
    justify-content: center;
  }
  /* 3. Ссылки: выстраиваем вертикально */
  .footer_links {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 100%;
    
  }

  .footer_column {
    align-items: center; /* Текст по центру */
    gap: 10px;
  }

  /* Дополнительно: чтобы соцсети были СОВСЕМ внизу под всем */
  .footer_brand {
    order: 2;
  }
  .footer_links {
    order: 1;
  }
  .footer_column a {
  font-size: 18px;
}
  

</style>