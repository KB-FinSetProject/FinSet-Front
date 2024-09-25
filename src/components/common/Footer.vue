<template>
  <div>
    <footer class="footer py-3 my-4">
      <hr>
      <ul class="nav justify-content-between pb-3 mb-1">
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
/* 푸터를 화면 전체로 확장 */
.footer {
  width: 100vw; /* 화면 전체의 가로 너비를 100%로 설정 */
  background-color: #f8f9fa; /* 배경색 설정 */
  padding: 20px 0; /* 적절한 여백을 추가 */
}

/* 기본적인 body와 html의 margin과 padding을 제거 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

/* 각 아이템 간의 간격 균등하게 설정 */
.nav {
  display: flex;
  justify-content: space-between;
  width: 100%; /* ul의 너비를 100%로 설정 */
  max-width: 1200px; /* 필요시 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  padding-left: 15px; /* 왼쪽 공백 */
  padding-right: 15px; /* 오른쪽 공백 */
}

.border-bottom {
  margin-bottom: 0;
}

.icon-large {
  font-size: 1.5rem; /* 원하는 크기로 조정 */
}
</style>
