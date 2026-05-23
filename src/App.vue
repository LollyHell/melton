<template>
  <header>
    <div class = "left">
      <img src="/photo/radix-icons_hamburger-menu.png" alt="меню">
    </div>
    <div class = "center">
      <img src="/photo/logo.png" alt="логотип">
    </div>
    <div class = "right">
      <img src = "/photo/Vector.png" alt = "избранное">
      <img src = "/photo/Group.png" alt = "моя корзина">
    </div>


  </header>


<RouterView />
</template>


<style scoped>
header{
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Чтобы бургер и лого были строго на одной линии по вертикали */
  padding: 0 70px;     /* Добавь отступы по бокам, чтобы бургер не лип к самому краю экрана */
}
.center{
  display: flex;
  justify-content: center; /*выровн лого */

}
.left{
  display: flex;
  width: 50px;         /* Даем левому блоку фиксированное место */
}
.left img{
  width: 50%;
  height: 70%;
}
.center img{
  width: 50%;
  height: auto;

}

.right{
  display: flex;
  gap : 20px;
  width: 50px;
}
.right img{
  width: 50%;
  height: 70%;
}



</style>