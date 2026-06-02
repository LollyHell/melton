
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
  align-items: center; 
}
.center{
  display: flex;
  justify-content: center; /*выровн лого */

}
.left{
  display: flex;
  width: 50px;     
}
.left img{
  width: 50%;
  height: 70%;
}
.center img{
  width: 60%;
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

<style> 

@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');


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

.right {
  display: flex;
  gap: 20px;
  width: 50px;
}

.right img {
  width: 50%;
  height: 70%;
}
</style>