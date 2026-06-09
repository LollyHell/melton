<template>
  <div class="main_ph">
    <div class="slider-wrapper">
      <button class="arrow arrow-left" @click="prevSlide">&larr;</button>
      <img :src="images[currentIdx]" alt="главное фото">

      <button class="arrow arrow-right" @click="nextSlide">&rarr;</button>
      <div class="dots-container">
        <span v-for="(img, idx) in images" :key="idx" class="dot" :class="{ active: idx == currentIdx }"
          @click="currentIdx = idx"></span>
      </div>
    </div>
  </div>

  <div id="about_us" class="about_us" >
    <div class="stroke">
      <img src="/photo/stroke.png" alt="О нас">
      <div class="text_overlay">
        <div class="headind_ab_us">О БРЕНДЕ</div>
        <div class="description_ab_us">
          <p>Основная цель бренда одежды MELTON — создавать базовую, качественную и стильную
            одежду за доступную цену.</p>

          <p>Бренд транслирует эстетику основательницы Сони Мельтон. Один из самых важных элементов концепции бренда —
            это
            цвет изделий. Все изделия выполнены в теплой бежево-коричневой палитреи идеально сочетаются друг с другом,
            создавая красивый и удобный повседневный гардероб. </p>

          <p>MELTON — это одежда для девушек, которые хотят выглядеть эффектно и привлекательно, но при этом чувствовать
            себя максимально комфортно. </p>

          <p>Огромное внимание основательница бренда уделяет качеству ткани, чтобы она была мягкая, приятная к телу
            и в то же время сохраняла свой первоначальный вид после множества стирок.</p>

          Также не менее значимым приоритетом является посадка изделий. Для нас очень важно, чтобы каждая вещь
          не сдавливала кожу, красиво подчеркивала фигуру и была крайне комфортна.
        </div>

      </div>
    </div>
    <div class="women_block">
      <img src="/photo/shade.png" alt="Тень" class="img_shade">
      <img src="/photo/women.png" alt="Девушка" class="img_girl">
    </div>
  </div>
  <section class="popular">
    <div class="popular_container">
      <div class="popular_header">
        <h2 class="sect_pop">Популярное</h2>
        <div class="header_center">
          <h2 class="sect_desc">Весна/Лето</h2>

        </div>
        <div class="header_right">
          <router-link to="/catalog" class="catalog_link">В каталог &rarr;</router-link>

        </div>
      </div>

      <div class="products_grid">

        <div class="product_card">
          <div class="img_wrapper">
            <img src="/photo/1.png" alt="Костюм Spirit&Rich" class="product_img">
            <div class="color_palette">
              <span class="color_dot black"></span>
              <span class="color_dot white"></span>
            </div>
          </div>

          <div class="product_info">
            <span class="product_name">Костюм Spirit&Rich</span>
            <span class="product_price">11 700 р</span>
          </div>

          <div class="product_actions">
            <button class="btn btn_more">Подробнее</button>
            <button class="btn btn_cart">В корзину</button>
          </div>
        </div>

        <div class="product_card">

          <div class="img_wrapper">
            <img src="/photo/2.png" alt="Платье Soft" class="product_img">
            <div class="color_palette">
              <span class="color_dot yellow"></span>
              <span class="color_dot gray"></span>
            </div>
          </div>
          <div class="product_info">
            <span class="product_name">Платье Soft</span>
            <span class="product_price">4 400 р</span>
          </div>
          <div class="product_actions">
            <button class="btn btn_more">Подробнее</button>
            <button class="btn btn_cart">В корзину</button>
          </div>
        </div>

        <div class="product_card">
          <div class="img_wrapper">
            <img src="/photo/3.png" alt="Футболка Beige mood" class="product_img">
            <div class="color_palette">
              <span class="color_dot white"></span>
              <span class="color_dot gray"></span>
            </div>
          </div>
          <div class="product_info">
            <span class="product_name">Футболка Beige mood</span>
            <span class="product_price">3 500 р</span>
          </div>
          <div class="product_actions">
            <button class="btn btn_more">Подробнее</button>
            <button class="btn btn_cart">В корзину</button>
          </div>
        </div>

      </div>
    </div>
  </section>

  <section id="contact_section" class="contact_section">
    <h2 class="contact_title">Связаться с нами</h2>
    <!-- @submit — ловит клик по кнопке отправки нажатие Enter -->
    <!-- .prevent — это сокращение во Vue для event.preventDefault(). -->
    <!-- Оно блокирует перезагрузку страницы, чтобы сайт работал быстро и без дёрганий -->
    <form class="contact_form" @submit.prevent="Submit">
      <div class="all_form">
        <div class="form_grid">
          <div class="form_group">
            <label for="firstName">Имя*</label>
            <input type="text" id="firstName" v-model="firstName" required class="form_input">
          </div>
          <div class="form_group">
            <label for="lastName">Фамилия</label>
            <input type="text" id="lastName" v-model="lastName" class="form_input">
          </div>

          <div class="form_group">
            <label for="email">Email*</label>
            <input type="email" id="email" v-model="email" required class="form_input">
          </div>

          <div class="form_group">
            <label for="phone">Номер телефона</label>
            <input type="tel" id="phone" v-model="phone" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              class="form_input">
          </div>

        </div>

        <div class="form_group message_group">
          <label for="message">Напишите нам сообщение тут:</label>
          <textarea id="message" v-model="message" rows="6" class="form_textarea"></textarea>
        </div>
      </div>

      <div class="form_agreement">
        <p>Нажимая кнопку, вы даете согласие на обработку ваших персональных данных.</p>
        <a href="#" class="policy_link">Политика конфиденциальности</a>
      </div>

      <div class="form_actions">
        <button type="submit" class="btn_submit">Связаться с нами</button>
      </div>
    </form>
  </section>
</template>

<!-- /* key - директива позволяет точно знать к какому элементу обращается -->
<!-- двоеточие- логика JS*/ -->
<script setup>//не нужно писать переменную и ретернать в штмл
import { ref } from 'vue' //функция превращает переменные в реактивные для изменения на сайте

// --- ЛОГИКА СЛАЙДЕРА ---
const images = ref([
  '/photo/main_photo.png',
  '/photo/main_photo.png',
  '/photo/main_photo.png',
])

const currentIdx = ref(0)

function nextSlide() {
  if (currentIdx.value < images.value.length - 1) { //возвращает в первую точку
    currentIdx.value++
  } else {
    currentIdx.value = 0
  }
}

function prevSlide() {
  if (currentIdx.value > 0) {
    currentIdx.value--
  } else {
    currentIdx.value = images.value.length - 1
  }
}

// --- ЛОГИКА ДЛЯ РАБОТЫ С БЭКЕНДОМ ---

// Создаем реактивные переменные для полей формы
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')

// Функция отправки формы
async function Submit() {
  // На всякий случай заменяем base_url на адрес хостинга, если локально бэк не запущен
  const url = 'https://sites.creatrix-digital.ru/clothes-store/api/v1/contacts'
  
  // Собираем объект в точном соответствии с тем, что требует твой Postman
  const formData = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    phone: phone.value,
    message: message.value
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      alert('Сообщение успешно отправлено на бэкенд!')
      // Очищаем форму после успешной отправки
      firstName.value = ''
      lastName.value = ''
      email.value = ''
      phone.value = ''
      message.value = ''
    } else {
      alert('Ошибка при отправке: ' + response.statusText)
    }
  } catch (error) {
    console.error('Ошибка сети:', error)
    alert('Не удалось связаться с сервером')
  }
}
</script>

<!-- /* & знак старта спец кода larr left arrow ;- знак финиша спец кода*/ -->
<style scoped>
.main_ph {
  display: flex;
  margin-top: 50px;
  width: 100%;
}

.slider-wrapper {
  position: relative;
  /* Чтобы абсолютные стрелки не улетали за пределы фото */
  width: 100%;
}

.main_ph img {
  width: 100%;
  height: auto;
  display: block;
  /*img- строчно-блочной тег. браузер думает что это буква и оставляет зазор без block */
}

/* стили стрелок */
.arrow {
  position: absolute;
  /*стрелки летают над фото*/
  top: 50%;
  /* Выравниваем ровно по центру высоты картинки */
  transform: translateY(-50%);
  /*так как стрелка круглая чтоб отцентровать с учетом радиуса - 50% т.е. 20px */
  background-color: #efeded;
  /* Полупрозрачный белый фон */
  color: #584a40;
  border: none;
  border-radius: 50%;
  /* Делаем круглыми */
  width: 40px;
  /* Размеры круга */
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 5;
  /* Чтобы стрелки были поверх фото */
  transition: background-color 0.2s;
  font-size: 28px;
}

.arrow:hover {
  background-color: rgba(255, 255, 255, 0.9);
  /* При наведении кружки становятся ярче */
}

/* Двигаем стрелки к левому и правому краю картинки с небольшим отступом */
.arrow-left {
  left: 20px;
}

.arrow-right {
  right: 20px;
}

/* Контейнер для точек */
.dots-container {
  position: absolute;
  bottom: 20px;
  /* Прижимаем к низу картинки */
  left: 50%;
  /* Центрируем по горизонтали */
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  /* Расстояние между точками */
  z-index: 5;
  /* то что выше чем картинка */
}

/* Сами круглые точки */
.dot {
  width: 8px;
  height: 8px;
  background-color: #755c4b;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dot.active {
  background-color: #6e5545;
}

.about_us {
  margin-top: 150px;
  display: flex;
  margin-left: 100px;
  align-items: center;
  gap: 40px;
  padding: 0 50px;
  /*отступы внутри 0 - отступ сверху и снизу 50 -слева справа */
  width: calc(100% - 150px);
  box-sizing: border-box;
  /* паддинг 0 50 не расширяет блок больше экрана а забирает внутри эти 100%*/
}

.headind_ab_us {
  color: #584a40;
  font-size: 42px;
  font-weight: bold;
}

.description_ab_us {
  color: #584a40;
  font-size: 18px;
  font-weight: 280;
}

.text_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 40px 50px;
  box-sizing: border-box;
  /* Чтобы паддинги не увеличивали размер блока */
}

.stroke {
  position: relative;
  max-width: 60%;
  /*если оставить 120% то дочки строк и вумен блок  эбаут_ас изза display flex будут сжимать себя изза границ экрана */
}

.stroke img {
  width: 120%;
  height: auto;
  display: block;
  resize: vertical;
}

.women_block {
  position: relative;
  /* относительное позиционирование */
  width: 80%;
  max-width: 676px;
  /* не факт что нужно*/
  z-index: 10;
  margin-left: -80px;
  top: -100px;
}

.img_girl {
  position: absolute;
  /*для всех остальных элементов этот блок становится невидимкой.*/
  top: 0;
  left: -20px;
  top: 20px;
  width: 80%;
  z-index: 5;
}

.img_shade {
  top: 0;
  left: 0;
  width: 80%;
}

.popular_container {
  max-width: 1240px;
  /* 3 карточки по 400px + 2 отступа по 20px */
  margin: 0 auto;
  /* Центрируем весь блок на странице */
  padding: 0 20px;
  /* Небольшие отступы по краям */
  box-sizing: border-box;
}

.popular_header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Популярное слева, ссылка справа */
  max-width: 1200px;
  /* совпадает с products_grid */
  margin: 90px auto 40px;
  /* центрируем + отступ до карточек */
  padding: 0;
  box-sizing: border-box;
}

.catalog_link {
  text-decoration: none;
  color: #584a40;
  font-size: 15px;
  font-weight: 450;
  margin-top: 15px;
}

.sect_pop {
  margin: 0;
  font-size: 50px;
  font-weight: 400;
  color: #584a40;
  /* Оно остается в потоке слева */
}

.header_center {
  position: absolute;
  /* 
     Расчет позиции: 
     Карточка 1 (400) + Отступ (20) + Карточка 2 (400) + Половина отступа (10) = 830px.
     830px от общей ширины 1240px — это примерно 67%.
     Это ставит центр текста ровно между 2-й и 3-й карточкой.
  */
  left: 67%;
  top: 0;
  transform: translateX(-50%);
  /* Сдвигаем на 50% ширины самого текста, чтобы центрировать */

  display: flex;
  align-items: center;
  gap: 20px;
  /* Расстояние между текстом и ссылкой */
  white-space: nowrap;
  /* Запрещаем перенос текста */
}

.header_right {
  transform: translateX(-50%);
}

.sect_desc {
  margin: 0;
  font-size: 50px;
  font-weight: 400;
  color: #584a40;
}

.img_wrapper {
  position: relative;
  width: 100%;
  height: auto;
}

.color_palette {
  position: absolute;
  bottom: 1vw;
  right: 3.5vw;
  display: flex;
  gap: 8px;
  z-index: 2;
}

.color_dot {
  width: 16px;
  height: 16px;
  display: inline-block;
  cursor: pointer;
}

.white {
  background-color: #ffffff;
}

.gray {
  background-color: #a8a8a8;
}

.black {
  background-color: #231f20;
}

.yellow {
  background-color: #DAB88A;
}

.products_grid {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.product_card {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.product_img {
  width: 90%;
  height: auto;
  display: block;
}

.product_actions {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 90%;
}

.product_info {
  display: flex;
  box-sizing: border-box;
  width: 90%;
  justify-content: space-between;
}

.product_price {
  font-weight: bold;
}

.btn_more {
  height: 47px;
  color: #584a40;
  font-size: 15px;
  border: 1px solid #584a40;
  background: none;
}

.btn_cart {
  height: 47px;
  color: #fff;
  font-size: 15px;
  border: none;
  background-color: #584a40;
}

.contact_section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.contact_title {
  color: #584a40;
  margin-top: 60px;
  text-align: center;
  font-size: 60px;
  font-weight: 400;
}

.contact_form {
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.form_grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 160px;
  width: 100%;
  box-sizing: border-box;
}

.form_group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.message_group {
  margin-top: 50px;
  width: 100%;
}

.form_textarea {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  margin-left: 0;
  border: 1.75px solid #584a40;
  height: 200px; 
  min-height: 200px;
}

.form_input {
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1.75px solid #584a40; 
  border-left: 1.75px solid #584a40;
  border-right: 1.75px solid #584a40;
}

/*.all_form {
  display: flex;
  flex-direction: column;
  width: 100%; нах не надо
  box-sizing: border-box;
}*/

.policy_link {
  color: #584a40;
}

.form_agreement {
  color: #584a40;
}

.form_actions {
  display: flex;
  justify-content: center;
  width: 100%;     
}

.btn_submit {
  margin-top: 40px;
  width: 30%;
  height: 47px;
  color: #584a40;
  font-size: 15px;
  border: 1.75px solid #584a40;
  background: none;
  font-weight: 500;
  font-size: 16px;
}


/* --- ПОДГОНКА ТЕКСТА ДЛЯ МОНИТОРОВ ОТ 1440px ДО 1920px --- */
@media screen and (min-width: 1440px) {
  /* Увеличиваем заголовок "О БРЕНДЕ" */
  .headind_ab_us {
    font-size: 48px; /* Было 42px */
    margin-bottom: 24px; /* Делаем красивый отступ до абзацев */
  }

  /* Делаем основной текст крупнее и читабельнее */
  .description_ab_us {
    font-size: 21px; /* Было 18px */
    line-height: 1.55; /* Добавляем воздуха между строками, чтобы текст не слипался */
  }

  /* Корректируем отступы внутри рамки, чтобы увеличенный текст идеально помещался */
  .text_overlay {
    padding: 55px 65px; /* Чуть увеличили, чтобы рамка дышала */
  }
}


/* --- СТАБИЛЬНЫЙ МЕДИА-ЗАПРОС ДЛЯ МОБИЛОК (ДО 768px) --- */
@media screen and (max-width: 768px) {
  .about_us {
    flex-direction: column; /* Элементы строго друг под другом */
    margin-top: 40px;
    margin-left: 0; /* Сбрасываем десктопный отступ */
    padding: 0 20px;
    width: 100%;
    gap: 20px;
    box-sizing: border-box;
    align-items: center;
  }

  /* Контейнер рамки */
  .stroke {
    max-width: 100%;
    width: 100%;
    position: relative;
    border: 1.5px solid #584a40; /* Делаем аккуратную адаптивную рамку вместо картинки */
    border-radius: 20px; /* Скругляем углы */
  }

  /* Скрываем саму картинку stroke.png на мобилках, чтобы она не сплющивала текст */
  .stroke > img {
    display: none;
  }

  /* Текст теперь внутри рамки распределяется свободно и сам растягивает блок по высоте */
  .text_overlay {
    position: relative; /* Выводим из абсолютного позиционирования! */
    padding: 25px 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .headind_ab_us {
    font-size: 26px;
    text-align: center;
    margin-bottom: 15px;
  }

  .description_ab_us {
    font-size: 15px;
    line-height: 1.45;
  }

  /* Блок с девушкой — делаем его компактным и независимым ниже текста */
  .women_block {
    width: 100%;
    max-width: 290px; /* Ограничиваем максимальную ширину, чтобы фотка не была огромной */
    margin-left: 0; /* Убираем минусовые маргины */
    top: 0; /* Сбрасываем уезжание вверх */
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* Тень плавно ложится под девушку */
  .img_shade {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Девушка накладывается ровно сверху на тень */
  .img_girl {
    position: absolute;
    top: 15px; /* Небольшое смещение для эффекта объема */
    left: -15px;
    width: 100%;
    height: auto;
    z-index: 5;
  }

  /* --- ОСТАЛЬНЫЕ БЛОКИ (ПОПУЛЯРНОЕ И ФОРМА) --- */
  .popular_header {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin: 50px auto 25px;
  }

  .sect_pop, .sect_desc {
    font-size: 30px;
    text-align: center;
  }

  .header_center {
    position: static;
    transform: none;
    flex-direction: column;
  }

  .header_right {
    transform: none;
  }

  .products_grid {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .product_card {
    width: 100%;
    max-width: 290px;
  }

  .product_img, .product_actions, .product_info {
    width: 100%;
  }

  .contact_title {
    font-size: 32px;
    margin-top: 40px;
  }

  .form_grid {
    grid-template-columns: 1fr; /* Поля формы встают в одну колонку */
    gap: 20px;
  }

  .form_textarea {
    height: 140px;
    min-height: 140px;
  }

  .btn_submit {
    width: 100%;
    max-width: 290px;
  }
}
</style>