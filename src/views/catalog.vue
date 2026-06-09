<template>
  <div class="catalog_wrapper">
    <div class="sidebar">
      <div v-for="category in categories" :key="category" class="category_item" @click="selectedCategory = category"
        :class="{ active: selectedCategory === category }">
        {{ category }}
      </div>

    </div>

    <!-- v-model это директива вью которая делает двустороннее связывание данных. он при выборе сортировки например сообщает данные в реактивную строку которая 
     что то меняет в js-->
    <main class="catalog_content">
      <div class="content_inner">
        <div class="filters_container">
          <div class="filter_group">
            <div class="filter_select_wrapper">
              <select v-model="sortBy" class="filter_select">
                <option value="default"> по умолчанию </option>
                <option value="popular">По популярности</option>
                <option value="price_asc">Сначала дешевле</option>
                <option value="price_desc">Сначала дороже</option>
              </select>
            </div>
            <div class="filter_select_wrapper">
              <select v-model="selectedColor" class="filter_select">
                <option :value="null">Все цвета</option>
                <option value="c2">Белый</option>
                <option value="c1">Бежевый</option>
                <option value="c4">Черный</option>
                <option value="c3">Шоколадный</option>
              </select>
            </div>

            <div class="filter_select_wrapper">
              <select v-model="selectedMaterial" class="filter_select">
                <option :value="null">Все материалы</option>
                <option value="cotton">Хлопок</option>
                <option value="wool">Шерсть</option>
                <option value="polyester">Полиэстер</option>
              </select>
            </div>
          </div>
          <input type="text" v-model="searchQuery" placeholder="Поиск..." class="search_input">
        </div>

        <div class="products_grid">
          <Product v-for="item in filteredProducts" :key="item.id" :product="item" />
        </div>
      </div>
    </main>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue';
import Product from '../components/Product.vue';

const products = ref([
  // Одежда (твои исходные товары)
  { id: 1, name: 'Костюм Spirit&Rich', price: 11700, imgSrc: '/photo/1.png', colors: ['c1', 'c2'], material: 'cotton', popularity: 340, category: 'Одежда' },
  { id: 2, name: 'Платье Soft', price: 4400, imgSrc: '/photo/2.png', colors: ['c3', 'c4'], material: 'polyester', popularity: 120, category: 'Одежда' },
  { id: 3, name: 'Свитер White Zip', price: 2100, imgSrc: '/photo/4.png', colors: ['c5', 'c6'], material: 'wool', popularity: 450, category: 'Одежда' },
  { id: 4, name: 'Куртка Base Black', price: 7800, imgSrc: '/photo/5.png', colors: ['c7', 'c8'], material: 'polyester', popularity: 89, category: 'Одежда' },
  { id: 5, name: 'Футболка Beige mood', price: 3500, imgSrc: '/photo/3.png', colors: ['c2', 'c9'], material: 'cotton', popularity: 600, category: 'Одежда' },
  { id: 6, name: 'Комплект Vanilla', price: 4900, imgSrc: '/photo/6.png', colors: ['c10', 'c11'], material: 'cotton', popularity: 210, category: 'Одежда' },
  { id: 7, name: 'Комплект Chocolate', price: 4900, imgSrc: '/photo/7.png', colors: ['c1', 'c2'], material: 'wool', popularity: 150, category: 'Одежда' },
  { id: 8, name: 'Джоггеры Chocolate', price: 6400, imgSrc: '/photo/8.png', colors: ['c12', 'c13'], material: 'cotton', popularity: 95, category: 'Одежда' },
  { id: 9, name: 'Куртка Warm Beige', price: 9000, imgSrc: '/photo/9.png', colors: ['c3', 'c4'], material: 'polyester', popularity: 310, category: 'Одежда' },
  
  // Тестовые товары для других категорий (чтобы сайдбар ожил)
  { id: 10, name: 'Кеды Сanvas Classic', price: 5500, imgSrc: '/photo/1.png', colors: ['c2'], material: 'cotton', popularity: 180, category: 'Обувь' },
  { id: 11, name: 'Кроссовки Run Fast', price: 8900, imgSrc: '/photo/5.png', colors: ['c4'], material: 'polyester', popularity: 250, category: 'Обувь' },
  { id: 12, name: 'Спортивный топ Fit', price: 2900, imgSrc: '/photo/3.png', colors: ['c1'], material: 'polyester', popularity: 140, category: 'Спорт' }
]);

const searchQuery = ref('');
const categories = ['Одежда', 'Обувь', 'Красота', 'Спорт'];
const selectedCategory = ref('Одежда'); //через ref они реактивные и при изменении перерисовываются
const selectedColor = ref(null); // Не забудь объявить эту переменную!
const selectedMaterial = ref(null);
const sortBy = ref('default');

const filteredProducts = computed(() => {  //ref хранит а компьютед следит за зависимостями. перезапускается сам и пересчитывает результат
  let result = [...products.value]; // ... это спред оператор расскладывает элементы массива внутри нового создавая копию

  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value);
  }

  // филтр по цвету
  if (selectedColor.value) {
    result = result.filter(p => p.colors.includes(selectedColor.value)); //инклюд = тру \ фолз ИНКЛЮД ЭТО ФУНКЦИЯ 
  }//=> стрелочная функция. укороченная версия функции

  if (selectedMaterial.value) {
    result = result.filter(p => p.material === selectedMaterial.value);
  }

  if (searchQuery.value) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }//фильтр по поиску

  // Сортировка чистых чисел
  if (sortBy.value === 'popular') {
    result.sort((a, b) => b.popularity - a.popularity); // От популярных к менее популярным
  } else if (sortBy.value === 'price_asc') {
    result.sort((a, b) => a.price - b.price); // От дешевых к дорогим
  } else if (sortBy.value === 'price_desc') {
    result.sort((a, b) => b.price - a.price); // От дорогих к дешевым
  }
  return result;
});


</script>

<style scoped>
.catalog_wrapper {
  display: flex;
  gap: 60px;
  padding: 40px;
  background-color: #fff;
}

.sidebar {
  width: 100px;
  flex-shrink: 0;
  /* запрет на сжатие*/
}


.category_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: none; /* чтоб линии не было*/
  cursor: pointer;
  color: #333;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path d='M1 3l4 4 4-4' stroke='%23333333' stroke-width='1.5' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position: right center; /* Встанет четко справа по центру */
  
  /* Делаем небольшой отступ справа, чтобы текст не упирался в стрелку, если категория длинная */
  padding-right: 20px; 
}


.catalog_content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin-top: 40px;
}

/* Ограничиваем ширину контента, чтобы поиск не улетал вправо */
.content_inner {
  max-width: 1200px;
  /* Установите ширину, соответствующую вашей сетке */
  width: 100%;
}

.category_item:hover,
.category_item.active {
  color: #584a40;
  /* Меняем цвет стрелочки на фирменный коричневый при наведении или клике */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path d='M1 3l4 4 4-4' stroke='%23584a40' stroke-width='1.5' fill='none'/></svg>");
}

.category_item.active {
  font-weight: bold;
}

.catalog_content {
  flex-grow: 1;
}

/* Обновленный контейнер для фильтров */
.filters_container {
  display: grid;
  /* Задаем ровно 3 колонки, как в сетке товаров */
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 30px;
  /* Важно: отступ должен совпадать с .products_grid */
  margin-bottom: 30px;
  width: 100%;
}

.filter_group {
  display: flex;
  /* Значение gap определяет расстояние между кнопками */
  gap: 50px;

  /* Дополнительно: если нужно, чтобы группа кнопок 
     не уезжала вправо, можно добавить align-items */
  align-items: center;
}

/* Обертка для красивого позиционирования стрелочки, если нужно */
.filter_select_wrapper {
  position: relative;
}

/* Стилизуем выпадающий список под твои круглые кнопки */
.filter_select {
  border: 1px solid #584a40;
  padding: 8px 30px 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  color: #584a40;
  background-color: white;
  font-size: 14px;
  outline: none;
  appearance: none;
  /* Убираем стандартную уродливую стрелку браузера */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path d='M1 3l4 4 4-4' stroke='%23584a40' stroke-width='1.5' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position: right 15px center;
  white-space: nowrap;
}

.filter_select:hover {
  background-color: #fcfbfa;
}

.search_input {
  border: 1px solid #584a40;
  padding: 8px 20px;
  border-radius: 20px;
  /* Поиск занимает 3-ю колонку */
  grid-column: 3;
  /* Прижимаем к правому краю, чтобы он был над 3-й карточкой */
  justify-self: end;
  margin-right: 40px;
  width: 100%;
  max-width: 260px;
  /* Чтобы не был слишком широким */
  box-sizing: border-box;
}


.products_grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}


@media screen and (max-width: 768px) {
  .catalog_wrapper {
    flex-direction: column;
    padding: 10px;
    gap: 15px;
  }

  /* Лента категорий под шапкой */
  .sidebar {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 5px;
    scrollbar-width: none;
  }
  
  .sidebar::-webkit-scrollbar {
    display: none;
  }

  .category_item {
    padding: 6px 0;
    padding-right: 12px;
    font-size: 15px;
    background-size: 8px;
    flex-shrink: 0;
  }

  .catalog_content {
    padding-left: 0;
    margin-top: 5px;
    width: 100%;
  }

  .content_inner {
    width: 100%;
  }

  /* Компактные фильтры в одну строку, чтобы не переносились */
  .filters_container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    width: 100%;
  }

  .filter_group {
    display: flex;
    flex-direction: row;
    gap: 4px;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }
  
  .filter_group::-webkit-scrollbar {
    display: none;
  }

  .filter_select_wrapper {
    flex: 1;
    min-width: 105px;
  }

  .filter_select {
    width: 100%;
    padding: 6px 20px 6px 10px;
    font-size: 11px;
    border-radius: 15px;
    background-position: right 8px center;
    background-size: 8px;
  }

  .search_input {
    padding: 6px 15px;
    font-size: 13px;
    border-radius: 15px;
    max-width: 100%;
    margin-right: 0;
  }

  /* Сетка: выстраиваем карточки строго по центру во всю ширину */
  .products_grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    align-items: center; /* Центрируем содержимое на любых экранах */
  }
}
</style>