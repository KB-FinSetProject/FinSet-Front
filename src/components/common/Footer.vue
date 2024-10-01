<template>
  <div>

    <footer class="footer fixed-bottom">

      <hr style="margin-top: 0%;">
      <ul class="nav justify-content-between">
        <li class="nav-item">
          <router-link to="/" class="nav-link px-2 text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-house icon-large"></i>
            <span>Home</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/shop" class="nav-link px-2 text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-bag-shopping icon-large"></i>
            <span>금융상품</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/wish" class="nav-link px-2 text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-star icon-large"></i>
            <span>관심</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dict" class="nav-link px-2 text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-book-bookmark icon-large"></i>
            <span>사전</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/auth" class="nav-link px-2 text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-user icon-large"></i>
            <span>마이페이지</span>
          </router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style scoped>

.footer {
  width: 100vw; 
  background-color: #f8f9fa; 
  padding-bottom: 5px;
}

.nav {
  display: flex;
  justify-content: space-between;
  width: 100%; 
  max-width: 1200px; 
  margin: 0 auto; 
  padding-left: 15px; 
  padding-right: 15px; 
}

.icon-large {
  font-size: 1.5rem;
}
</style>
